import React from "react";
import { useMyStatsContext } from "../../App";
import axios from "axios";
import "firebase/auth";
import "react-toastify/dist/ReactToastify.css";
import { logout } from "./index";

interface UserProfileProps {
  name: string;
  profilePicture: string;
  setIsModalOpen: Function;
}

const AdminProfile: React.FC<UserProfileProps> = ({ name, setIsModalOpen }) => {
  const { setStatsData } = useMyStatsContext();
  const showModal = () => {
    setIsModalOpen(true);
    fetchData();
  };

  const userData = JSON.parse(`${localStorage.getItem("isLoggedIn")}`);
  const fetchData = async () => {
    try {
      const token = userData.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/v1/data/statistics/admin`,
        config
      );
      const apiResult = result.data;
      if (apiResult.status === true) {
        setStatsData(apiResult.records);
        return;
      }
    } catch (error) {
      logout();
    }
  };

  return (
    <div className="flex justify-between w-[100%] bg-slate-50 mb-4">
      <div className="m-4">
        <button
          className="bg-green-700 rounded-lg p-2 text-white font-bold"
          onClick={showModal}
        >
          Compare Data
        </button>
        <button
          className="p-2 m-2 bg-blue-700 rounded-lg text-white font-bold"
          onClick={logout}
        >
          Logout
        </button>
      </div>
      <div className="flex m-4">
        <img
          src="/profile.jpeg"
          alt="Profile"
          className="w-10 h-10 rounded-full mr-3"
        />
        <span className="text-xl font-semibold">
          {userData && userData.user ? userData.user.name : ""}
        </span>
      </div>
    </div>
  );
};

export default AdminProfile;
