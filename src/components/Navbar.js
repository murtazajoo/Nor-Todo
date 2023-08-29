import React from "react";
import { TbLogicNor } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Avatar, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { getUser } from "../features/user/userSlice";

function Navbar() {
  const user = useSelector(getUser);
  const supabase = useSupabaseClient();

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <nav className="flex mb-5 flex-col-reverse sm:flex-row justify-between items-center px-5 py-3 bg-slate-950">
      <ul className="flex gap-10 uppercase  justify-evenly items-center flex-wrap">
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
        </li>{" "}
        <li>
          <NavLink
            className={"p-1 px-3 rounded border border-transparent"}
            to="/publictodo"
          >
            Explore
          </NavLink>
        </li>
        {user && (
          <>
            {" "}
            <li>
              <NavLink
                className={"p-1 px-3 rounded border border-transparent"}
                to="/mytodo"
              >
                My-Todos
              </NavLink>
            </li>
            <li>
              <button className="uppercase" onClick={logout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
      {user && user ? (
        <Box className="flex justify-center items-start gap-3">
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
          <li className="underline">
            <NavLink to="auth/signup">Sign Up</NavLink>
          </li>
          <li className="bg-slate-800 p-1 px-2 rounded">
            {" "}
            <NavLink to="auth/signin">Sign In</NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
