import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUser } from "../../features/user/userSlice";

function Landing() {
  const user = useSelector(getUser);
  return (
    <div className="flex flex-col-reverse  sm:flex-row max-w-[1440px] m-auto uppercase font-display  relative z-10 justify-center items-center w-full min-h-[90vh]  after:content-[''] after:absolute after:bg-sky-600 after:animate- after:w-full after:h-16 after:rounded-full after:z-[-1] after:blur-3xl  ">
      <div className="flex flex-col justify-center  ">
        {" "}
        <h1 className=" text-4xl sm:text-8xl ">NOR ToDo</h1>
        <p className="text-md sm:text-xl mb-5 leading-9 -tracking-tighter  ">
          best place to make a todo
        </p>
        <Button variant="outlined" className="w-60">
          <NavLink to={user ? "mytodo" : "auth/signin"}>Get Started</NavLink>
        </Button>
      </div>
      <div className="w-full sm:w-1/2">
        <img
          className=" object-cover rounded-full"
          src="https://cdn.pixabay.com/photo/2016/06/20/22/24/robot-1470108_1280.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default Landing;
