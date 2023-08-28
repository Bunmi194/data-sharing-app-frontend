import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { logout } from "./index";

const UserProfile: React.FC<any> = ({ users, userId }) => {
  const [image, setImage] = useState<File | null>(null);
  const [ name, setName ] = useState<string>("");

  const uploadPhoto = async () => {
    const userData = JSON.parse(`${localStorage.getItem("isLoggedIn")}`);
    const token = userData.token;
    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("id", userId);

      try {
        const response = await axios.post(
          "http://localhost:5000/v1/user/edit",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.status === true) {
          toast.success("Photo updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000);
          return;
        }
        return toast.error("Photo upload failed. Please try again later.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        toast.error("Photo upload failed. Please try again later.", {
          position: toast.POSITION.TOP_RIGHT,
        });
        logout();
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log("image", e.target.files);
      setImage(e.target.files[0]);
      setName(e.target.files[0].name);
    }
  };

  return (
    <div className="flex flex-col justify-start items-center text-white w-[20%] bg-slate-500">
      <div className="mt-10 w-full border-b">
        <h1 className="font-bold text-center">User Profile</h1>
      </div>
      <div className="">
        <img
          src={`${
            users &&
            userId &&
            users.find((user: any) => user.id === userId).profile
              ? users.find((user: any) => user.id === userId).profile
              : "/profile.jpeg"
          }`}
          alt="profile"
          className="w-[100px] h-[100px] rounded-full m-4"
        />
      </div>
      <div className="text-center">
        <p>
          Name:{" "}
          {users && userId
            ? users.find((user: any) => user.id === userId).name
            : ""}{" "}
        </p>
        <p>
          Email:{" "}
          {users && userId
            ? users.find((user: any) => user.id === userId).email
            : ""}
        </p>
      </div>
      <div>
        <label
          htmlFor="profilepic"
          className="block w-full bg-blue-800 my-12 p-3 font-bold rounded-lg cursor-pointer"
        >
          Choose Photo
        </label>
        <p className="pt-0 font-bold text-red-900 text-center border border-white">{name}</p>
        <input
          id="profilepic"
          type="file"
          className="hidden"
          accept="image/jpg, image/jpeg, image/png"
          onChange={handleChange}
        />
        <button
          onClick={uploadPhoto}
          className="bg-blue-900 font-bold cursor-pointer rounded-lg my-12 p-3 w-full block"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
