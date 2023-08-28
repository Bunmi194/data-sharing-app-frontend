import React, { useEffect, useState } from "react";
import DataForm from "./data-form";
import ListData from "./data-list";
import { useMyDataContext } from "../../App";
import axios from "axios";

const Index: React.FC = () => {
  const [userData, setUserData] = useState([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isLoggedIn, setIsLoggedIn } = useMyDataContext();

  useEffect(() => {
    if (userData) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
      `http://localhost:5000/v1/data/${userData.user.id}`,
      config
    );
    const apiResult = result.data;
    if (apiResult.status === true) {
      setUserData(apiResult.records);
      return;
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
