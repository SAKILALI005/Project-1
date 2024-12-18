const mongoose=require("mongoose");
const Review=require("./review.js");
const Login=require("./user.js");
const listingschema= new mongoose.Schema({
    title:{
       type:String,
        required:true},
    description:{
        type:String,
        required:true}, 
    image: {
        url: String,
        filename: String, 
        },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review"
        }
    ],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});
listingschema.post("findOneAndDelete",async(listing)=>{
    if(listing){
           await Review.deleteMany({_id:{$in : listing.reviews}});
    }
})
const Listing=mongoose.model("Listing",listingschema);
module.exports=Listing;