import React, { createContext, useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Index from "./pages/dashboard/index";
import Admin from "./pages/admin-dashboard/index";
import { ToastContainer } from "react-toastify";
import "./App.css";

interface ContextProps {
  isLoggedIn: string;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<string>>;
}
interface StatsProps {
  statsData: string;
  setStatsData: React.Dispatch<React.SetStateAction<string>>;
}

const DataContext = createContext<ContextProps | undefined>(undefined);
const StatsContext = createContext<StatsProps | undefined>(undefined);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") || "false"
  );
  const [statsData, setStatsData] = useState(
    localStorage.getItem("stats") || ""
  );

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);
  return (
    <>
      <ToastContainer />
      <DataContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <StatsContext.Provider value={{ statsData, setStatsData }}>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/register" element={<Signup />}></Route>
            <Route path="/dashboard" element={<Index />}></Route>
            <Route path="/admin-dashboard" element={<Admin />}></Route>
          </Routes>
        </StatsContext.Provider>
      </DataContext.Provider>
    </>
  );
}

export const useMyDataContext = (): ContextProps => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useMyDataContext must be use within a provider");
  }
  return context;
};

export const useMyStatsContext = (): StatsProps => {
  const context = useContext(StatsContext);
  if (!context) {
    throw new Error("useMyStatsContext must be use within a provider");
  }
  return context;
};
export default App;
