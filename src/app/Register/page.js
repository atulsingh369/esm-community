import { MdAttachEmail } from "react-icons/md";
import { FaServicestack } from "react-icons/fa";
import { GiField } from "react-icons/gi";
import Link from "next/link";

const RegisterForm = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="w-1/2">
          <form className="form">
            <p id="heading">Register</p>

            <div className="field">
              <MdAttachEmail className="input-icon" />
              <input
                autocomplete="off"
                placeholder="Email"
                className="input-field"
                type="text"
              />
            </div>
            <div className="field">
              <svg
                className="input-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
              </svg>
              <input
                placeholder="Create Password"
                className="input-field"
                type="password"
              />
            </div>
            <div className="field">
              <svg
                className="input-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
              </svg>
              <input
                placeholder="Re-type Password"
                className="input-field"
                type="password"
              />
            </div>
            <div className="btn">
              <button className="button2">
                <Link href="/Register/Details">Sign Up</Link>
              </button>
            </div>
            <button className="button3">Clear All</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
