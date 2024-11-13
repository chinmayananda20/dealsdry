import React, { useState, useEffect } from "react";
import logo from "./Images/logo.png";
import Navbar from "./Navbar";
import jwt from "jsonwebtoken";
import { Link } from "react-router-dom";
import { FaSortAmountDown } from "react-icons/fa";
import { toast } from "react-toastify";

const EmployeeList = () => {
  const [userid, setuserid] = useState(null);
  const [username, setusername] = useState(null);
  const [Employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(10);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setsearchTerm] = useState("");
  const [FilteredEmployees, setFilteredEmployees] = useState([]);
  const handleSort = (option) => {
    const sortedEmployees = [...Employees];

    switch (option) {
      case "Id":
        sortedEmployees.sort((a, b) => {
          if (a._id < b._id) return -1;
          if (a._id > b._id) return 1;
          return 0;
        });
        break;
      case "Name":
        sortedEmployees.sort((a, b) => {
          const nameA = a.f_Name || "";
          const nameB = b.f_Name || "";
          return nameA.localeCompare(nameB);
        });
        break;
      case "Email":
        sortedEmployees.sort((a, b) => {
          const emailA = a.f_Email || "";
          const emailB = b.f_Email || "";
          return emailA.localeCompare(emailB);
        });
        break;
      case "Date":
        sortedEmployees.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        break;
      default:
        return;
    }

    setEmployees(sortedEmployees);
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = FilteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const totalPages = Math.ceil(Employees.length / employeesPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const removeEmployeeById = async (id) => {
    try {
      setFilteredEmployees‎((prevEmployees) =>
        prevEmployees.filter((employee) => employee._id !== id)
      );
      let response = await fetch("https://dealsdry-d2x7.onrender.com/api/deleteEmployee", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      });
      const res = await response.json();
      if ("success" in res) {
        toast.success("Deleted Successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(res.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error("Error!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt.decode(token);
      setuserid(decodedToken.user.id);
      setusername(decodedToken.user.name);
    }
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      let response = await fetch("https://dealsdry-d2x7.onrender.com/api/getEmployees", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch employees.");
      const res = await response.json();
      setEmployees(res);
      setFilteredEmployees(res);
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredEmployees(Employees);
    } else {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      const filteredList = Employees.filter(
        (emp) =>
          emp.f_Name.toLowerCase().includes(lowercasedSearchTerm) ||
          emp.f_Email.toLowerCase().includes(lowercasedSearchTerm) ||
          emp._id.toLowerCase().includes(lowercasedSearchTerm)
      );
      setFilteredEmployees(filteredList);
    }
  };
  return (
    <div>
      <div className="shadow-lg flex items-center">
        <img src={logo} className="w-16 m-3" alt="Logo" />
      </div>
      <div className="flex flex-col items-center">
        <Navbar active={"employeeList"} username={username} />
        <div className="w-[90%] mt-5 flex justify-end items-center">
          <p className="font-medium text-lg mx-10">
            Total Count : {Employees.length}
          </p>
          <Link to="/createEmployee">
            <button className="bg-blue-600 text-white mx-10 px-4 py-2 rounded-xl hover:bg-blue-400">
              Create Employee
            </button>
          </Link>
        </div>
        <div className="bg-blue-600 w-[90%] text-white mt-2 p-2">
          <div className="flex justify-end items-center">
            <div className="relative">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                Sort
                <FaSortAmountDown className="text-lg mx-2" />
              </div>

              {showDropdown && (
                <div className="absolute top-full mt-2 w-40 bg-white border rounded shadow-lg z-10">
                  <ul>
                    {["Name", "Email", "Id", "Date"].map((option) => (
                      <li
                        key={option}
                        className="px-4 py-2 text-black hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          handleSort(option);
                          setShowDropdown(false);
                        }}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="mx-5 ">
              <button
                onClick={handleSearch}
                className="bg-white text-black px-2 my-2 md:mx-2 hover:bg-gray-300 rounded-lg border border-black"
              >
                Search
              </button>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setsearchTerm(e.target.value)}
                className="rounded text-black"
                placeholder="Enter Search Keyword"
              />
            </div>
          </div>
        </div>
        <div className="grid hidden md:grid bg-white text-black w-[90%] grid-cols-10 relative border border-gray-300">
          {[
            "Unique Id",
            "Image",
            "Name",
            "Email",
            "Mobile Number",
            "Designation",
            "Gender",
            "Course",
            "Created Date",
            "Action",
          ].map((attribute, index) => (
            <div
              key={index}
              style={{ gridRowStart: 1, gridColumnStart: index + 1 }}
              className="bg-blue-600 h-14 flex items-center justify-center font-semibold text-white text-center border border-gray-400"
            >
              {attribute}
            </div>
          ))}
          {currentEmployees.map((emp, i_index) => (
            <>
              <div
                style={{ gridRowStart: i_index + 2, gridColumnStart: 1 }}
                className="w-full p-3 border border-gray-300 break-words"
              >
                {emp._id}
              </div>
              <div
                style={{ gridRowStart: i_index + 2, gridColumnStart: 2 }}
                className="w-full p-3 flex justify-center border border-gray-300"
              >
                <img
                  src={`http://localhost:5000/uploads/${emp.f_Image}`}
                  alt="Employee"
                  className="w-10 h-10 object-cover rounded-full"
                />
              </div>
              <div
                style={{ gridRowStart: i_index + 2, gridColumnStart: 3 }}
                className="w-full p-3 border border-gray-300 break-words"
              >
                {emp.f_Name}
              </div>
              <div
                style={{ gridRowStart: i_index + 2, gridColumnStart: 4 }}
                className="w-full p-3 border border-gray-300 break-words"
              >
                {emp.f_Email}
              </div>
              <div
                style={{ gridRowStart: i_index + 2, gridColumnStart: 5 }}
                className="w-full p-3 border border-gray-300 break-words"
              >
                {emp.f_Mobile}
              </div>
              <div
                style={{ gridRowStart: i_index + 2, gridColumnStart: 6 }}
                className="w-full p-3 border border-gray-300 break-words"
              >
                {emp.f_Designation}
              </div>
              <div
                style={{ gridRowStart: i_index + 2, gridColumnStart: 7 }}
                className="w-full p-3 border border-gray-300 break-words"
              >
                {emp.f_gender}
              </div>
              <div
                style={{ gridRowStart: i_index + 2, gridColumnStart: 8 }}
                className="w-full p-3 border border-gray-300 break-words"
              >
                {emp.f_course}
              </div>
              <div
                style={{ gridRowStart: i_index + 2, gridColumnStart: 9 }}
                className="w-full p-3 border border-gray-300 break-words"
              >
                {new Date(emp.createdAt).toLocaleDateString()}
              </div>
              <div
                style={{ gridRowStart: i_index + 2, gridColumnStart: 10 }}
                className="w-full p-3 border border-gray-300 text-center"
              >
                <Link to={`/EmployeeEdit/${emp._id}`}>
                  <button className="bg-blue-600 text-white px-3 m-2 py-1 rounded hover:bg-blue-700">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => removeEmployeeById(emp._id)}
                  className="bg-red-500 text-white px-3 m-2  py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </>
          ))}
        </div>
        {currentEmployees.map((employee) => {
          return (
            <div className="grid md:hidden w-[90%] grid-cols-2 grid-rows-10 m-5">
              {[
                "Unique Id",
                "Image",
                "Name",
                "Email",
                "Mobile Number",
                "Designation",
                "Gender",
                "Course",
                "Created Date",
                "Action",
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-2 bg-blue-600 text-white "
                  style={{ gridRowStart: index + 1, gridColumnStart: 1 }}
                >
                  {item}
                </div>
              ))}
              <div
                className="p-2 bg-white text-black border flex-wrap break-words "
                style={{ gridRowStart: 1, gridColumnStart: 2 }}
              >
                {employee._id}
              </div>
              <div
                className="p-2 bg-white text-black border flex justify-center items-center flex-wrap break-words "
                style={{ gridRowStart: 2, gridColumnStart: 2 }}
              >
                <img
                  src={`http://localhost:5000/uploads/${employee.f_Image}`}
                  alt="Employee"
                  className="w-16 h-16  object-cover rounded-full"
                />
              </div>
              <div
                className="p-2 bg-white text-black border flex-wrap break-words "
                style={{ gridRowStart: 3, gridColumnStart: 2 }}
              >
                {employee.f_Name}
              </div>
              <div
                className="p-2 bg-white text-black border flex-wrap break-words "
                style={{ gridRowStart: 4, gridColumnStart: 2 }}
              >
                {employee.f_Email}
              </div>
              <div
                className="p-2 bg-white text-black border flex-wrap break-words "
                style={{ gridRowStart: 5, gridColumnStart: 2 }}
              >
                {employee.f_Mobile}
              </div>
              <div
                className="p-2 bg-white text-black border flex-wrap break-words "
                style={{ gridRowStart: 6, gridColumnStart: 2 }}
              >
                {employee.f_Designation}
              </div>
              <div
                className="p-2 bg-white text-black border flex-wrap break-words "
                style={{ gridRowStart: 7, gridColumnStart: 2 }}
              >
                {employee.f_gender}
              </div>
              <div
                className="p-2 bg-white text-black border flex-wrap break-words "
                style={{ gridRowStart: 8, gridColumnStart: 2 }}
              >
                {employee.f_course}
              </div>
              <div
                className="p-2 bg-white text-black border flex-wrap break-words "
                style={{ gridRowStart: 9, gridColumnStart: 2 }}
              >
                {new Date(employee.createdAt).toLocaleDateString()}
              </div>
              <div
                className="p-2 bg-white text-black border flex-wrap break-words flex "
                style={{ gridRowStart: 10, gridColumnStart: 2 }}
              >
                <Link to={`/EmployeeEdit/${employee._id}`}>
                  <button className="bg-blue-600 text-white px-3 m-2 py-1 rounded hover:bg-blue-700">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => removeEmployeeById(employee._id)}
                  className="bg-red-500 text-white px-3 m-2  py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handleClick(index + 1)}
              className={`px-3 py-1 mx-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
