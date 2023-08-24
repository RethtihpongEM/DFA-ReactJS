import React, { useContext, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import { UtilContext } from '../context/UtilContext';
import {Header} from "./Header.jsx";

export const NavBar = () => {
  const {navBarSelect, setNavBarSelect} = useContext(UtilContext);
  const navigate = useNavigate();

  const navLinks = [
    {title: "Construct FA", to: "/AutomataMidterm/"},
    {title: "Classify FA", to: "/AutomataMidterm/classify"},
    {title: "Validate String", to: "/AutomataMidterm/validate"},
    // {title: "Convert from NFA to DFA", to: "/"},
    {title: "Minimize DFA", to: "/AutomataMidterm/minimized"},
  ]

  return (
    <nav
      className={`fixed w-full z-50`}
    >
      <div className={'min-[1880px]:px-96\n        lg:px-16\n        md:px-6 px-6 bg-blue-500 p-4 flex items-center justify-start list-none gap-x-5 text-white'}>
        {navLinks.map((li, key) => (
          <Link to={li.to} onClick={() => {
            setNavBarSelect(li.title);

          }} key={key} className={`${li.title === navBarSelect && 'bg-white p-2 rounded-md text-black'}`}>
            {li.title}
          </Link>
        ))}
      </div>
      <Header/>

    </nav>
  )
}