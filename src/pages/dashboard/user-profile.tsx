import React from "react";
import "firebase/auth";
import "react-toastify/dist/ReactToastify.css";
import { logout } from "../admin-dashboard";

const UserProfile: React.FC = () => {
  let userData = null;

  if (localStorage.getItem("isLoggedIn")) {
    userData = JSON.parse(`${localStorage.getItem("isLoggedIn")}`).user;
  }

  return (
    <div className="flex justify-between w-[100%] bg-slate-50 mb-4">
      <div>
        <button
          className="p-2 m-2 bg-blue-700 rounded-lg text-white font-bold"
          onClick={logout}
        >
          Logout
        </button>
      </div>
      <div className="flex m-4">
        <img
          src={`${
            userData && userData.profile ? userData.profile : "/profile.jpeg"
          }`}
          alt="Profile"
          className="w-10 h-10 rounded-full mr-3"
        />
        <span className="text-xl font-semibold">{`${
          userData && userData.name ? userData.name : ""
        }`}</span>
      </div>
    </div>
  );
};

export default UserProfile;
