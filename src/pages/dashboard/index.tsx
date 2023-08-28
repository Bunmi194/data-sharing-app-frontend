import React, { useEffect, useState } from "react";
import DataForm from "./data-form";
import ListData from "./data-list";
import { useMyDataContext } from "../../App";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "firebase/auth";
import { logout } from "../admin-dashboard";

const Index: React.FC = () => {
  const [userData, setUserData] = useState<any>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isLoggedIn, setIsLoggedIn } = useMyDataContext();

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);
  const fetchData = async () => {
    const userData = JSON.parse(`${localStorage.getItem("isLoggedIn")}`);
    try {
      if (userData && userData.token) {
        const token = userData.token;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        };
        const result = await axios.get(
          `http://localhost:5000/v1/data/${userData.user.id}`,
          config
        );
        const apiResult = result.data;
        if (apiResult.status === true) {
          setUserData(apiResult.records);
          return;
        }
      }
    } catch (error) {
      logout();
    }
  };
  return (
    <div className="">
      <div className="flex">
        <DataForm />
        <ListData userData={userData} />
      </div>
    </div>
  );
};

export default Index;
