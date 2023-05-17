"use client";
import { useState, useEffect } from "react";
const Navbar = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "forest"
  );

  const toggleTheme = (e) => {
    if (e.target.checked) {
      setTheme("light");
    } else {
      setTheme("forest");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  return (
    <>
      <div className="upper-bar flex flex-row items-center justify-between p-2 border-b-4 border-[#FF671F] ">
        <div className="bar-start-content ">
          <a className="text-sm font-bold hover:underline cursor-pointer">
            Home
          </a>
        </div>
        <div className="bar-end-content flex items-center gap-3 divide-x divide-double">
          <a className="text-sm font-bold hover:underline cursor-pointer">
            Skip To Main Content
          </a>
          <div className="flex ">
            <div className="flex gap-3 pl-1">
              <a>a-</a>
              <a>A</a>
              <a>A+</a>
            </div>
            <div className="toggle-switch scale-50 flex items-start">
              <label className="switch-label">
                <input
                  type="checkbox"
                  className="checkbox"
                  onChange={toggleTheme}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
          <div className="pl-1">
            <select className="outline-none p-1 rounded-md">
              <option value="0">English</option>
              <option value="1">Hindi</option>
            </select>
          </div>
        </div>
      </div>
      <div className="middle-bar bg-middle-bar bg-contain h-32 ">
        <div></div>
      </div>
      <div className="bottom-bar flex justify-evenly items-center py-1 bg-white  border-b-4 border-[#FF671F] ">
        <a
          href=""
          className="btn bg-white border-none text-black font-semibold text-lg hover:bg-[#046A38] hover:text-white hover:font-normal"
        >
          Home
        </a>
        <a
          href=""
          className="btn bg-white border-none text-black font-semibold text-lg hover:bg-[#046A38] hover:text-white hover:font-normal"
        >
          About Us
        </a>
        <a
          href=""
          className="btn bg-white border-none text-black font-semibold text-lg hover:bg-[#046A38] hover:text-white hover:font-normal"
        >
          How We Are
        </a>
        <a
          href=""
          className="btn bg-white border-none text-black font-semibold text-lg hover:bg-[#046A38] hover:text-white hover:font-normal"
        >
          Gallery
        </a>
        <a
          href=""
          className="btn bg-white border-none text-black font-semibold text-lg hover:bg-[#046A38] hover:text-white hover:font-normal"
        >
          Log In
        </a>
        <a
          href=""
          className="btn bg-white border-none text-black font-semibold text-lg hover:bg-[#046A38] hover:text-white hover:font-normal"
        >
          Sign Up
        </a>
      </div>
    </>
  );
};

export default Navbar;
