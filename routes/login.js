const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport=require("passport");
const{saveRedirectUrl}=require("../loginMiddleware.js");


router.get("/signup",(req,res)=>{
        res.render("./signUp/signUp.ejs");
    });
router.post("/signup",wrapAsync( async(req,res,next)=>{
    try{
        let{username,email,password}=req.body;
        let NewUser=new User({email,username});
        const newRegister=await User.register(NewUser,password);
        console.log(newRegister);
        req.login(newRegister,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to AirBNB Website");
            return res.redirect("/");
    })}catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}));
router.get("/login",(req,res)=>{
    res.render("./signUp/login");
});
router.post("/login",saveRedirectUrl,
    passport.authenticate('local', { failureRedirect: '/login',failureFlash : true }),async(req,res)=>{
    req.flash("success","Login Successful 🙂 ");
    let RedirectUrl=res.locals.RedirectUrl || "/";
    return res.redirect(RedirectUrl);
})
router.get("/logout",(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success"," You are Logged Out 😞");
        res.redirect("/");
    });

})

module.exports=router;