import { Button } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

function Landing() {
  return (
    <div className="flex max-w-[1440px] m-auto uppercase font-display  relative z-10 justify-center items-center w-full min-h-[90vh]  after:content-[''] after:absolute after:bg-sky-600 after:animate- after:w-full after:h-16 after:rounded-full after:z-[-1] after:blur-3xl  ">
      <div className="flex flex-col justify-center ">
        {" "}
        <h1 className="text-8xl ">NOR Gate ToDo</h1>
        <p className="text-xl mb-5 leading-9 -tracking-tighter  ">
          best place to make a todo
        </p>
        <Button variant="outlined" className="w-60">
          <NavLink to="/mytodo">Get Started</NavLink>
        </Button>
      </div>
      <div className="w-1/2">
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
