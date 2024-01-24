import express from "express";//API
import cors from "cors";    //set up rules between comm between front and beckend
import mongoose from "mongoose";//to send comm and queries to our DB
import {userRouter} from "./routes/users.js";
import {recipesRouter} from "./routes/recipes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);   //write endpoints asoociated with authentication for testing
app.use("/recipes", recipesRouter);

mongoose.connect("");

app.listen(3001, () => console.log("Server started"));
