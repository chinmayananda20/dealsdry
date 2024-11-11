import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged out successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <div className="w-[90%] flex flex-col md:flex-row border-b-2 border-blue-600 my-5 shadow-lg rounded h-full md:h-[50px] justify-between">
      <div className="nav flex flex-col md:flex-row mx-16 h-full items-center">
        <Link to="/">
          <p
            className={`cursor-pointer mx-5 text-xl font-medium ${
              props.active === "Home" ? "text-blue-600" : "hover:text-blue-600"
            }`}
          >
            Home
          </p>
        </Link>
        {props.username && (
          <Link to="/employeeList">
            <p
              className={`cursor-pointer mx-5 text-xl font-medium ${
                props.active === "employeeList"
                  ? "text-blue-600"
                  : "hover:text-blue-600"
              }`}
            >
              Employee List
            </p>
          </Link>
        )}
        {!props.username && (
          <Link to="/login">
            <p
              className={`cursor-pointer mx-5 text-xl font-medium ${
                props.active === "employeeList"
                  ? "text-blue-600"
                  : "hover:text-blue-600"
              }`}
            >
              Employee List
            </p>
          </Link>
        )}
      </div>
      <div className="flex mx-16 flex-col md:flex-row h-full items-center">
        {props.username && (
          <p className=" mx-5  text-xl font-medium">{props.username}</p>
        )}
        {props.username && (
          <p
            onClick={logout}
            className="cursor-pointer mx-5 hover:text-blue-600 text-xl font-medium"
          >
            Logout
          </p>
        )}
        <Link to="/login">
          {!props.username && (
            <p className="cursor-pointer mx-5 hover:text-blue-600 text-xl font-medium">
              Login
            </p>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
