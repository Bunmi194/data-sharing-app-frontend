import React from "react";

const UserProfile: React.FC = () => {
  const userData = JSON.parse(`${localStorage.getItem("isLoggedIn")}`).user;
  return (
    <div className="flex justify-between w-[100%] bg-slate-50 mb-4">
      <div></div>
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
