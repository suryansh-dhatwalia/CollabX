import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../config/axios.js";

export default function Project() {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { projectId } = useParams();

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

  if (loading) {
    return <div>Loading project...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!project) {
    return <div>Project not found.</div>;
  }

  return (
    <>
      <h1 className="text-white">{project.name}</h1>
      <p className="text-white">{project.description}</p>
    </>
  );
} 