import React from "react";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import logo from "./Images/logo.png";
import Navbar from "../components/Navbar";
const Home = () => {
  const [userid, setuserid] = useState(null);
  const [username, setusername] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt.decode(token);
      setuserid(decodedToken.user.id);
      setusername(decodedToken.user.name);
    }
  }, []);

  return (
    <div>
      <div className="shadow-lg flex items-center">
        <img src={logo} className="w-16 m-3" alt="" />
      </div>
      <div className="flex flex-col items-center">
        <Navbar username={username} active={"Home"} />
        <p className="text-blue-600 md:text-6xl text-2xl text-center mt-24">
          Welcome {username}
        </p>
        <marquee className="mt-10 md:w-[80%] w-full text-xl">
          Hope you're having a great day! Here's a quick overview of your
          platform's performance today
        </marquee>
      </div>
    </div>
  );
};

export default Home;
