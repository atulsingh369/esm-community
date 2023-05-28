import React from "react";

import Link from "next/link";

const Photo = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="w-1/2">
          <form className="form">
            <p id="heading">Upload Your Photo</p>

            <div className="flex flex-col justify-evenly items-center  border-4 border-dashed border-white  file-input ">
              <div>
                <input type="file" />
              </div>
            </div>

            <div className="btn mb-2">
              <button className="button2">
                <Link href="/">Submit</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Photo;
