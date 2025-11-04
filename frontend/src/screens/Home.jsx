import React, { useContext } from "react";
import { UserContext } from "../context/user.context";
import { BackgroundBeamsDemo } from "../components/homePage/BackgroundBeamsDemo";





export default function Home(){
    const user = useContext(UserContext);
    return(
        
       
        <>
        <BackgroundBeamsDemo />
        </>
      
    )
}