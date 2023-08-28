import React from "react";
import { useMyStatsContext } from "../../App";
import axios from "axios";

interface UserProfileProps {
  name: string;
  profilePicture: string;
  setIsModalOpen: Function;
}

const AdminProfile: React.FC<UserProfileProps> = ({
  name,
  profilePicture,
  setIsModalOpen,
}) => {
  const { setStatsData } = useMyStatsContext();
  const showModal = () => {
    setIsModalOpen(true);
    fetchData();
  };

  const fetchData = async () => {
    const userData = JSON.parse(`${localStorage.getItem("isLoggedIn")}`);
    const token = userData.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const result = await axios.get(
      `http://localhost:5000/v1/data/statistics/admin`,
      config
    );
    const apiResult = result.data;
    if (apiResult.status === true) {
      setStatsData(apiResult.records);
      return;
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
      </div>
      <div className="flex m-4">
        <img
          src={profilePicture}
          alt="Profile"
          className="w-10 h-10 rounded-full mr-3"
        />
        <span className="text-xl font-semibold">{name}</span>
      </div>
    </div>
  );
};

export default AdminProfile;
