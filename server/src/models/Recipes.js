import mongoose from "mongoose";
//defining how our data will look like 
const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    ingredients: [{type: String, required: true}],
    instructions: {type: String, required: true},
    imageUrl: {type: String, required: true},
    cookingTime: {type: Number, required: true},
    culture : {type: String, required: true},
    userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true},

});

export const RecipeModel = mongoose.model("recipes", RecipeSchema);