const mongoose=require("mongoose");

const reviewschema= new mongoose.Schema({
    Comment:String,
    Rating:{
        type:Number,
        min:1,
        max:5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});

const Review=mongoose.model("Review",reviewschema);
module.exports=Review;