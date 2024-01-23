import mongoose, { mongo } from "mongoose";
//defining how our data will look like 
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true,}
});

export const UserModel = mongoose.model("users", UserSchema);