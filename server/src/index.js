import express from "express";//API
import cors from 'cors';    //set up rules between comm between front and beckend
import mongoose from 'mongoose';//to send comm and queries to our DB

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3001, () => console.log("Server started"));
