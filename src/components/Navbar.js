import React from "react";
import { TbLogicNor } from "react-icons/tb";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-5 py-3 bg-slate-950">
      <ul className="flex gap-10 uppercase  justify-between items-center">
        <li>
          <TbLogicNor size={30} />
        </li>
        <li>
          <NavLink
            className={"p-1 px-3 rounded border border-transparent"}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <NavLink
          className={"p-1 px-3 rounded border border-transparent"}
          to="/mytodo"
        >
          My-Todos
        </NavLink>
        <li></li>
      </ul>
      <ul className="flex gap-5  justify-between items-center">
        <li className="underline">
          <NavLink to="signup">Sign Up</NavLink>
        </li>
        <li className="bg-slate-800 p-1 px-2 rounded">
          {" "}
          <NavLink to="auth/signin">Sign In</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
