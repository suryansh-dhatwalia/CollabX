import projectModel from "../model/projectModel.js";
import {
  createProject,
  getProjects,
  addUsersToProject,
  showProject
} from "../services/project.service.js";

import { validationResult } from "express-validator";




export const createProjectController = async (req, res) => {
  const err = validationResult(req);

  if (!err.isEmpty()) {
    res.status(400).json({ error: err.array() });
  }

  try {
    const { name } = req.body;
    const userId = req.user.id;
    const newProject = await createProject({
      name,
      userId,
    });
    res.status(200).json(newProject);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
};




export const getAllProjects = async (req, res) => {
  try {
    const allProjects = await getProjects({
      userId: req.user.id,
    });
  
    return res.status(200).json({
      projects: allProjects,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};





export const addUserToProject = async (req, res) => {
  const err = validationResult(req);

  if (!err.isEmpty()) {
    res.status(400).json({ error: err.array() });
  }
  try {
    const { projectId, users } = req.body;
    const userId = req.user.id;
    const project = await addUsersToProject({
      projectId,
      users,
      userId,
    });
    return res.status(200).json({ project });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};




export const getProject = async(req,res)=>{
    const{ projectId } = req.params;
    const userId  = req.user.id;



    try{

      const project = await showProject({projectId,userId});
      res.status(200).json({project});
    }
    catch(err){
      res.status(400).json({error:err.message})
    }
    
    
}
