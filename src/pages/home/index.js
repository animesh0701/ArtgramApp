import React from "react";
import { SignInBtn } from "../../components";
import { CreatePost, Feed, Navbar } from "../../containers";
import "./style.css";

export const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <CreatePost />
      <Feed />
    </div>
  );
};
