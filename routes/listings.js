const express=require("express");
const router=express.Router();
const {listingSchema}=require("../schemavalidation.js");
const wrapasync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/customError.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner}=require("../loginMiddleware.js");


const listingController=require("../controllers/listings.js");

const {storage}=require("../cloudConfig.js");
const multer  = require('multer');
const upload = multer({ storage});

const Validation=(req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if (error) {
       
        return next(new ExpressError(400,error));
    }else{
        next();
    }
};

//Home route
router.get("/",wrapasync(listingController.index));
//Show Details
router.get("/listings/:id",wrapasync(listingController.showRoute));
//New route
router.get("/listing/new", isLoggedIn,wrapasync(listingController.newListForm));
//New route -> Home route
router.post("/listings", isLoggedIn,upload.single("listing[image]"),Validation,wrapasync(listingController.newToHome));
//New update route
router.get("/listings/:id/edit",isLoggedIn,isOwner,wrapasync(listingController.editListForm));
//Update -> Show details
router.put("/listings/:id",isLoggedIn,isOwner,upload.single("listing[image]"),Validation,wrapasync(listingController.editToShow));
//delete route
router.delete("/listings/:id", isLoggedIn,isOwner,wrapasync(listingController.deleteRoute));
module.exports=router;