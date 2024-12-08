const express=require("express");
const review=express.Router({mergeParams: true});
const Review=require("../models/review.js");
const {reviewSchema}=require("../schemavalidation.js");
const wrapasync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/customError.js");
const Listing=require("../models/listing.js");
const {isLoggedIn, isReviewAuthor}=require("../loginMiddleware.js")

const reviewController=require("../controllers/review.js");

const reviewValidation=(req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if (error) {
        return next(new ExpressError(400,error));
    }else{
        next();
    }
};
Listing.findByIdAndDelete
// Review Post Route
review.post("/",isLoggedIn,reviewValidation,wrapasync(reviewController.createReview));
//Review Delete Route
review.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapasync(reviewController.deletereview));

module.exports=review;