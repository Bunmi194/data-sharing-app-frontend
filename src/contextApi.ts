import { createContext } from "react";
export const DataContext = createContext({
    isLoggedIn: false,
    setIsLoggedIn: ()=>{},
    data: {},
    setData: ()=>{}
});