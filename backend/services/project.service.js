import Project from "../model/projectModel.js";
import mongoose from "mongoose";
import projectModel from "../model/projectModel.js";
import userModel from "../model/userModel.js";





export const createProject = async ({ name, userId }) => {
  if (!name) {
    throw new Error("Name is required");
  }

  if (!userId) {
    throw new Error("UserId is required");
  }
  let Project;
  try {
    Project = await projectModel.create({
      name,
      users: [userId],
    });
  } catch (err) {
    if (err.code === 11000) {
      throw new Error("Project Name Already Exist");
    }
  }

  return Project;
};







export const getProjects = async ({ userId }) => {
  if (!userId) {
    throw new Error("No User Found");
  }
  const allProjects = await projectModel.find({
    users: userId,
  }).populate('users','firstname lastname');
  
  return {allProjects };
};





export const addUsersToProject = async ({ projectId, users, userId }) => {
  if (!projectId) {
    throw new Error("projectId is required");
  }

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid projectId");
  }

  if (!users) {
    throw new Error("users are required");
  }

  if (
    !Array.isArray(users) ||
    users.some((userId) => !mongoose.Types.ObjectId.isValid(userId))
  ) {
    throw new Error("Invalid userId(s) in users array");
  }

  if (!userId) {
    throw new Error("userId is required");
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid userId");
  }
  const project = await projectModel.findOne({
    _id: projectId,
    users: userId,
  });
  if (!project) {
    throw new Error("User does not belong to this project");
  }
  const updatedProject = await projectModel.findOneAndUpdate(
    {
      _id: projectId,
    },
    {
      $addToSet: {
        users: {
          $each: users,
        },
      },
    },
    {
      new: true,
    }
  );
  return updatedProject;
};



export const showProject = async({ projectId }) =>{
  console.log(projectId);
  if(!projectId){
    throw new Error("No Project Found")
  }
  if(!mongoose.Types.ObjectId.isValid(projectId)){
    throw new Error("Invalid ProjectId")
  }
    const project = await projectModel.findOne({
        _id:projectId
    })
    return project;
}

