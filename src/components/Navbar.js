import React, { useEffect, useState } from "react";
import { TbLogicNor } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Avatar, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { getUser } from "../features/user/userSlice";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AppInstall from "./AppInstall";

function Navbar() {
  const user = useSelector(getUser);
  const supabase = useSupabaseClient();
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [menuOpen]);

  return (
    <nav className="flex mb-5 w-full  sm:flex-row justify-between items-center px-5 py-3 bg-slate-950">
      <p className="block sm:hidden">
        <TbLogicNor size={30} />
      </p>
      <ul
        className={` flex-col flex ${
          menuOpen ? "-translate-x-0 " : "  translate-x-full  "
        }transform    duration-200 bg-slate-950  absolute w-[70vw] top-0 right-0 bottom-0 border
       z-20 sm:flex items-end text-xl px-10 sm:-translate-x-0 sm:relative sm:w-full justify-start pt-[20vh] sm:border-transparent max-w-[600px] sm:flex-row gap-10 uppercase sm:justify-evenly sm:bg-transparent sm:p-0 sm:text-sm sm:items-center flex-wrap`}
      >
        <li className="hidden sm:block">
          <TbLogicNor size={30} />
        </li>
        <button
          onClick={toggleMenu}
          className="sm:hidden absolute top-5 right-5"
        >
          <button>
            <ClearOutlinedIcon />
          </button>
        </button>
        <li className="sm:hidden bg-slate-800 p-1 px-2 rounded">
          {" "}
          <NavLink to="auth/signin">Sign In</NavLink>
        </li>
        <li>
          <NavLink
            onClick={toggleMenu}
            className={"p-1 px-3 rounded border border-transparent"}
            to="/"
          >
            Home
          </NavLink>
        </li>{" "}
        <li>
          <NavLink
            onClick={toggleMenu}
            className={"p-1 px-3 rounded border border-transparent"}
            to="/explore"
          >
            Explore
          </NavLink>
        </li>
        {user && (
          <>
            <li>
              <button className="uppercase" onClick={logout}>
                Logout
              </button>
            </li>
          </>
        )}{" "}
        <li>
          <NavLink
            onClick={toggleMenu}
            className={"p-1 px-3 rounded border border-transparent"}
            to="/about"
          >
            About
          </NavLink>
        </li>
        <li className="sm:hidden">
          <AppInstall />
        </li>
      </ul>
      {user && user ? (
        <Box className="flex justify-end sm:justify-center  items-start gap-3">
          <div className="text-right">
            <p>{user.user_metadata.name}</p>
            <p className="text-sm text-slate-600">{user.user_metadata.email}</p>
          </div>
          <Avatar
            alt={user.user_metadata.name}
            src={user.user_metadata.avatar_url}
          />
        </Box>
      ) : (
        <ul className="flex gap-5  justify-between items-center">
          <li className="bg-slate-800 p-1 px-2 rounded">
            {" "}
            <NavLink to="auth/signin">Sign In</NavLink>
          </li>
        </ul>
      )}

      <div className="block sm:hidden">
        <button onClick={toggleMenu}>
          <MenuOutlinedIcon />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
