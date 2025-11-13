import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../config/axios.js";
import GroupChat from "../components/chatPage/GroupChat.jsx";
import AddUserModal from "../components/chatPage/AddUserModal.jsx";

export default function Project() {
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;
      try {
        setLoading(true);
        const { data } = await axios.get(`/project/get-project/${projectId}`);
        setProject(data.project);
       
        
        setError(null);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Failed to load project.");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);
  

  useEffect(() => {
    setIsModalVisible(isModalOpen);
  }, [isModalOpen]);
  
  
  if (loading)
    return <div className="text-gray-300 p-6 flex  justify-center">Loading project...</div>;
  if (error) return <div className="text-red-500 p-6">Error: {error}</div>;
  if (!project)
    return <div className="text-gray-400 p-6">Project not found.</div>;
  
  const fullName = `${project.userArray[0].firstname} ${project.userArray[0].lastname}`;
  return (
    <div className="flex h-screen bg-black">
      <GroupChat setIsModalOpen={setIsModalOpen} projectName={project.project.name} fullName={fullName} />
      <div className="flex-1 bg-black" />
      <AddUserModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isModalVisible={isModalVisible}
        projectId={projectId}
        existingUserIds={project.project.users}
      />
    </div>
  );
}