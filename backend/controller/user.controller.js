import * as userService from "../services/user.service.js";
import { validationResult } from "express-validator";
import User from "../model/userModel.js";
import redisClient from "../services/redis.service.js";




export const createUserController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await userService.createUser(req.body);
    const token = user.generateJWT();
    delete user._doc.password;
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).send(err.message);
  }
};





export const loginController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      res.status(401).json({
        errors: "Invalid Credentials",
      });
    }
    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
      return res.status(401).json({ errors: "Invalid Password" });
    }
    const token = await user.generateJWT();
    delete user._doc.password;
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).send(err.message);
  }
};




export const profileController = async (req, res) => {
  res.status(200).json({
    user: req.user,
  });
};





export const logOutController = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    redisClient.set(token, "logout", "EX", 60 * 60 * 24);
    res.status(200).json({ message: "Logout Successfully" });
  } catch (err) {
    res.status(401).json(err.message);
  }
};


export const getAllUsers = async(req, res)=>{
  
    try{
        const userId = req.user.id;
        const users = await userService.getAllUsers({userId});
        return res.status(200).json({users});
    }
    catch(err){
      res.status(400).json(err.message);
    }
}