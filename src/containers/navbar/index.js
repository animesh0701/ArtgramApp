import React, { useContext, useState } from "react";
import { SignInBtn } from "../../components";
import { UserContext } from "../../contexts/user";
import "./style.css";

export const Navbar = () => {
  const [user, setUser] = useContext(UserContext).user;

  return (
    <div className="navbar">
      <p className="brand">ARTGRAM</p>
      {user ? (
        <div className="navbar__right">
          <img className="navicon" src={user.photoURL} alt="" />
          <button
            onClick={() => {
              setUser(null);
            }}
            className="navbar__logout"
          >
            LOG OUT
          </button>
        </div>
      ) : (
        <SignInBtn />
      )}
    </div>
  );
};
