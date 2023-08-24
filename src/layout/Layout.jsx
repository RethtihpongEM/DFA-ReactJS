import React, {useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {NavBar} from "../components/NavBar";
import {Header} from "../components/Header"
import {AboveHead} from "../components/AboveHead";

export const Layout = () => {
  // const [isSelected, setIsSelected] = useState("1");

  return (
    <div className="min-h-screen flex flex-col overflow-auto">
      <NavBar/>
      <main className="
          min-[1880px]:px-96
          lg:px-16
          md:px-6 md:pb-2 px-6 mt-48">
        <Outlet/>
      </main>
      {/*<AboveHead/>*/}
    </div>
  );
};
