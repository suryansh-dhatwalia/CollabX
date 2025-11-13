import { useState, useContext } from "react";
import React from "react";
import { UserContext } from "../../context/user.context.jsx";
import axios from "../../config/axios.js";
import { BackgroundBeams } from "./background-beams.jsx";
import { ExpandableCardDemo } from "../card/ExpandableCardDemo.jsx";
import NavBar from "../navbar/NavBar.jsx";

export function BackgroundBeamsDemo() {
  const { user } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [projectName, setprojectName] = useState("");
  const [refresh, setRefresh] = useState(false); 

  function createProject(e) {
    e.preventDefault();
    axios
      .post("/project/create", {
        name: projectName,
      })
      .then((res) => {
        console.log(res);
        setShowModal(false);
        setprojectName("");
        setRefresh(prev => !prev); 
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    
    <div className="min-h-screen w-full bg-neutral-950 relative antialiased">
      
      <NavBar 
      showModal={showModal}
        setShowModal={setShowModal}
        projectName={projectName}
        setprojectName={setprojectName}
        createProject={createProject}/>
      <ExpandableCardDemo 
      refresh={refresh}/>
    </div>
  );
}