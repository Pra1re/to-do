import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { authcontext } from "../provider/authprovider";

const Navbar = () => {
  const { user, logout } = useContext(authcontext);

  return (
    <div className="navbar bg-base-100 py-4">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <Link to="/"><li><a>Home</a></li></Link>
            <Link to="/manual"><li><a>Manual</a></li></Link>
          </ul>
        </div>
        <a className="btn btn-ghost text-3xl" style={{ fontFamily: "'Dancing Script', cursive" }}>
  Statics
</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-bold">
          <Link to="/"><li><a>Home</a></li></Link>
          <Link to="/manual"><li><a>Manual</a></li></Link>
        </ul>
      </div>
      <div className="navbar-end">
        {user && user?.email ? (
          <div className="flex gap-4 items-center">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="User Profile"
                className="profile-image w-[45px] h-[45px] rounded-full"
                title={user.displayName || "User"}
              />
            ) : (
              <img
                src="https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?t=st=1732190846~exp=1732194446~hmac=e4e798fc5a86fd86e11e7656b577f205a3e8b4e7d88bb7e3bb38eabc140af082&w=740"
                alt="Default User"
                className="profile-image w-[45px] h-[45px] rounded-full"
                title="User"
              />
            )}
            <button className="btn btn-primary btn-sm" onClick={logout}>Logout</button>
          </div>
        ) : (
          <div className="flex gap-2">

          <Link className="btn btn-primary btn-sm w-[80px]" to="/login">Login</Link>
          <Link className="btn btn-primary btn-sm w-[80px]" to="/register">Register</Link></div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
