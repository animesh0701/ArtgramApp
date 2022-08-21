import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/user";
import { SignInWithGoogle } from "../../services/auth";
import "./style.css";

export const SignInBtn = () => {
  const [user, setUser] = useContext(UserContext).user;

  const signInBtnClick = async () => {
    let userBySignIn = await SignInWithGoogle();
    if (userBySignIn) setUser(userBySignIn);
  };

  return (
    <div className="signInBtn" onClick={signInBtnClick}>
      <p>SIGN IN WITH GOOGLE</p>
    </div>
  );
};
