import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/User.js";

const router = express.Router();

router.post("/register", async (req,res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    if(user){
        return res.json({message: "User already exists"});
    }
    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = new UserModel({ username,password: hashedPassword });
    await newUser.save();   //creating the user
    res.json({message: "User Registered Successfully"});
});

router.post("/login", async(req,res) => {
    const {username, password} = req.body;
    const user = await UserModel.findOne({username});
    if(!user){
        return res.json({message: "User doesn't exist!"});
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.json({message: "username or password is incorrect! "});
    }
    //logging in with the correct information
    const token = jwt.sign({id: user._id},"secret");
    res.json({token, userID: user._id});
});





export {router as userRouter};

//middleware

export const verifyToken = (req,res,next) =>{
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token,"secret", (err) =>{
            if(err) return res.sendStatus(403);//user not authorized
            next();
        });
    }
    else{
        res.sendStatus(401);//user not verified
    }
}