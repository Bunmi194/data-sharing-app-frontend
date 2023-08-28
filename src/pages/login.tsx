import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "../auth/firebase";
// import app from "../auth/firebase";
import { initializeApp } from "firebase/app";
import { useMyDataContext } from "../App";
import "react-toastify/dist/ReactToastify.css";

initializeApp(firebaseConfig);

const auth = getAuth();

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isLoggedIn, setIsLoggedIn } = useMyDataContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error(`Please enter email and password`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);

      const token = await auth.currentUser?.getIdToken();
      const body = {
        email,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
      const result = await axios.post(
        "http://localhost:5000/v1/user/login",
        body,
        config
      );
      const apiResult = result.data;
      if (apiResult.status === true) {
        setIsLoggedIn(JSON.stringify(apiResult));
        toast.success("Login successful", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/dashboard");
        return;
      }
    } catch (error) {
      toast.error(`Error: ${error}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="w-full max-w-sm py-12 px-8 bg-white rounded shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-6 text-2xl font-semibold">Login</h2>
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
          className="w-full py-2 text-white bg-[#F4A340] rounded-sm hover:bg-blue-600"
        >
          Login
        </button>
        <p className="p-2">
          Don't have an account?{" "}
          <Link to="/register">
            <span className="text-blue-600">Register</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
