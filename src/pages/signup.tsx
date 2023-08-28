import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: any) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return toast.error("Please enter your name, email and password.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    const body = {
      email,
      name,
      password,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    try {
      const result = await axios.post(
        "http://localhost:5000/v1/user/register",
        body,
        config
      );
      const apiResult = result.data;
      if (apiResult.status === true) {
        toast.success("Sign up successful. Please login", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/");
        return;
      }
      return toast.error(`Error: ${apiResult.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      return toast.error(`Error: ${error}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="w-full max-w-sm p-6 bg-white rounded shadow-md"
        onSubmit={handleSignup}
      >
        <h2 className="mb-6 text-2xl font-semibold">Sign Up</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded-sm"
            placeholder="Enter your name..."
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded-sm"
            placeholder="Enter your email..."
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded-sm"
            placeholder="Enter your password..."
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 text-white bg-[#F4A340] rounded-sm hover:bg-green-600"
        >
          Sign Up
        </button>

        <p className="p-2">
          Already have an account?{" "}
          <Link to="/">
            <span className="text-blue-600">Login</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
