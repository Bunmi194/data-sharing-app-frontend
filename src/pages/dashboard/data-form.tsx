import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "../login";
import { logout } from "../admin-dashboard";

const DataForm: React.FC<any> = () => {
  const [companyName, setCompanyName] = useState("");
  const [numberOfUsers, setNumberOfUsers] = useState("");
  const [numberOfProducts, setNumberOfProducts] = useState("");
  const [percentage, setPercentage] = useState("0");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    
    if (!companyName || !numberOfUsers || !numberOfProducts || !percentage) {
      return toast.error("Please fill all fields", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    try {
      const userData = JSON.parse(`${localStorage.getItem("isLoggedIn")}`);
      const body = {
        userId: userData.user.id,
        companyName,
        numberOfUsers,
        numberOfProducts,
        percentage,
      };
      const token = userData.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
      const result = await axios.post(
        "http://localhost:5000/v1/data",
        body,
        config
      );
      const apiResult = result.data;
      if (apiResult.status === true) {
        toast.success("Data added successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        window.location.reload();
        return;
      }
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    const setPercentageValue = () => {
      if (
        numberOfProducts &&
        numberOfUsers &&
        Number(numberOfProducts) !== 0 &&
        Number(numberOfUsers) !== 0
      ) {
        const percentageValue =
          (Number(numberOfProducts) / Number(numberOfUsers)) * 100;
        if (percentageValue) {
          setPercentage(percentageValue.toFixed(2));
        } else {
          setPercentage("0");
        }
      } else {
        setPercentage("0");
      }
    };
    setPercentageValue();
  }, [numberOfUsers, numberOfProducts, setPercentage]);

  return (
    <div className="flex justify-center items-center w-[40%] h-[100vh] bg-slate-500 pl-0 ml-0">
      <form className="w-full m-10 p-10 bg-slate-300" onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block mb-1 font-semibold">Company Name</label>
          <input
            type="text"
            value={companyName}
            className="w-full p-2 border rounded"
            placeholder="Enter company name"
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-semibold">Number of Users</label>
          <input
            type="text"
            value={numberOfUsers}
            className="w-full p-2 border rounded"
            placeholder="Enter number of users"
            onChange={(e) => setNumberOfUsers(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-semibold">Number of Products</label>
          <input
            type="text"
            value={numberOfProducts}
            className="w-full p-2 border rounded"
            placeholder="Enter number of products"
            onChange={(e) => setNumberOfProducts(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-semibold">Percentage</label>
          <input
            type="readonly"
            value={`${percentage}%`}
            className="w-full p-2 border rounded"
            readOnly
          />
        </div>
        <button
          type="submit"
          className="w-full my-2 py-2 px-3 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Submit Data
        </button>
      </form>
    </div>
  );
};

export default DataForm;
