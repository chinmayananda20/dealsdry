import React from "react";
import logo from "./Images/logo.png";
import Navbar from "./Navbar";
import jwt from "jsonwebtoken";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const CreateEmployee = () => {
  const [userid, setuserid] = useState(null);
  const [username, setusername] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select an option");
  const [gender, setGender] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [file, setFile] = useState(null);
  const [emp_name, setemp_name] = useState(null);
  const [emp_email, setemp_email] = useState(null);
  const [emp_number, setemp_number] = useState(null);
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.type;
      if (fileType === "image/png" || fileType === "image/jpeg") {
        setFile(selectedFile);
      } else {
        alert("Please upload a PNG or JPG file.");
        setFile(null);
      }
    }
  };
  const handleChange = (event) => {
    setGender(event.target.value);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt.decode(token);
      setuserid(decodedToken.user.id);
      setusername(decodedToken.user.name);
    }
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedCourses((prev) => [...prev, value]);
    } else {
      setSelectedCourses((prev) => prev.filter((course) => course !== value));
    }
  };
  const handleOnChange = (e) => {
    if (e.target.id === "name") {
      setemp_name(e.target.value);
    } else if (e.target.id === "email") {
      setemp_email(e.target.value);
    } else if (e.target.id === "number") {
      setemp_number(e.target.value);
    }
  };
  const handleSubmit = async () => {
    if (selectedCourses.length === 0) {
      toast.error("Choose Course", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const formData = new FormData();
    formData.append("emp_name", emp_name);
    formData.append("emp_number", emp_number);
    formData.append("emp_email", emp_email);
    formData.append("selectedCourses", JSON.stringify(selectedCourses));
    formData.append(
      "selectedOption",
      selectedOption === "Select an option" ? null : selectedOption
    );
    formData.append("gender", gender);
    formData.append("file", file);

    try {
      let response = await fetch("https://dealsdry-d2x7.onrender.com/api/addEmployee", {
        method: "POST",
        body: formData,
      });

      const res = await response.json();
      if ("success" in res) {
        toast.success("Employee Added Successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setemp_email("");
        setFile(null);
        setSelectedCourses([]);
        setSelectedOption("Select an option");
        setemp_name("");
        setemp_number("");
        setGender("");
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

  return (
    <div>
      <div className="shadow-lg flex items-center">
        <img src={logo} className="w-16 m-3" alt="" />
      </div>
      <div className="flex flex-col items-center">
        <Navbar active={"employeeList"} username={username} />
        <div className=" shadow-lg p-10 px-16  rounded-lg mt-5 flex flex-col ">
          <p className="font-medium  text-xl text-center">Create Employee</p>
          <div className="flex mt-5 mb-3 items-center flex-col md:flex-row">
            <p>Name:</p>
            <input
              onChange={handleOnChange}
              id="name"
              value={emp_name}
              type="text"
              className="border rounded mx-5 px-3 py-1"
              placeholder="Enter Employee Name"
            />
          </div>
          <div className="flex my-3 items-center flex-col md:flex-row">
            <p>Email:</p>
            <input
              onChange={handleOnChange}
              id="email"
              value={emp_email}
              type="text"
              className="border rounded mx-5 px-3 py-1"
              placeholder="Enter Employee Email"
            />
          </div>
          <div className="flex my-3 items-center flex-col md:flex-row">
            <p>Mobile Number:</p>
            <input
              onChange={handleOnChange}
              value={emp_number}
              id="number"
              type="text"
              className="border rounded mx-5 px-3 py-1"
              placeholder="XXX-XXX-XXXX"
            />
          </div>
          <div className="flex my-3 items-center flex-col md:flex-row">
            <p>Designation:</p>
            <div className="relative inline-block text-left mx-5">
              <div>
                <button
                  onClick={toggleDropdown}
                  className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                >
                  {selectedOption}
                  <svg
                    className="ml-2 -mr-1 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.707l3.72-3.475a.75.75 0 111.04 1.086l-4 3.75a.75.75 0 01-1.04 0l-4-3.75a.75.75 0 01.02-1.056z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    {["HR", "Manager", "Sales"].map((option) => (
                      <button
                        key={option}
                        onClick={() => handleOptionClick(option)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex my-3 items-center flex-col md:flex-row">
            <p>Gender:</p>
            <div className="mx-5">
              <label className="mr-4">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={handleChange}
                  className="mr-1"
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={handleChange}
                  className="mr-1"
                />
                Female
              </label>
            </div>
          </div>
          <div className="flex my-3 items-center flex-col md:flex-row">
            <p>Course:</p>
            <div className="mx-3">
              <div className="flex space-x-5">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="MCA"
                    onChange={handleCheckboxChange}
                    checked={selectedCourses.includes("MCA")}
                    className="mr-2"
                  />
                  MCA
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="BCA"
                    onChange={handleCheckboxChange}
                    checked={selectedCourses.includes("BCA")}
                    className="mr-2"
                  />
                  BCA
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="BSC"
                    onChange={handleCheckboxChange}
                    checked={selectedCourses.includes("BSC")}
                    className="mr-2"
                  />
                  BSC
                </label>
              </div>
            </div>
          </div>
          <div className="flex my-3 items-center flex-col md:flex-row">
            <p>Image:</p>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
              className="mx-5"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 w-full m-auto text-white  px-2 py-2 rounded-xl hover:bg-blue-400"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployee;
