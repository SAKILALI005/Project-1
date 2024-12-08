require('dotenv').config();

const express=require("express");
const app=express();
const path=require("path");
const mongoose=require("mongoose");
const methodOverride=require("method-override");
const engine=require("ejs-mate");
const ExpressError=require("./utils/customError.js");
const listings=require("./routes/listings.js");
const review=require("./routes/review.js");
const login=require("./routes/login.js");
const cookieParser = require('cookie-parser');
const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");

app.use(cookieParser("secretcode"));
app.use(flash());
app.use(session(
    {
        secret:"secret-code",
        resave:false, 
        saveUninitialized:true,
        cookie:{
            expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
            maxAge:1000 * 60 * 60 * 24 * 3,
            httpOnly:true,
        },
        
    })); 
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set("views", path.resolve("./views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine("ejs",engine);
app.use(express.static(path.resolve("./public")));
main()
      .then(res=>console.log("Connect to DB"))
      .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
}
// app.get("/fest",(req,res)=>{
//     res.send("server works");
// })
// app.get("/requstCount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count=1;
//     }
//     res.send(`you visit this web ${req.session.count} times`);
// })
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})

// app.get("/demouser",async (req,res)=>{
//     try{
//     let RanUser=new Login({
//         email:"Sakil123@gmail.in",
//         username:"Sakil321"
       
//     });
//     let registeredUser=await Login.register(RanUser,"HelloWorld");
//     res.send(registeredUser);
// } catch (err) {
//     console.error(err); // Log the error for debugging
//     res.status(500).send("An error occurred while registering the user.");
// }
// })

app.use("",listings);
app.use("/listings/:id/review",review);
app.use("",login);
//Cookies
app.get("/cookies",(req,res)=>{
    res.cookie("Thailand","samali",{signed: true});
    console.dir(req.signedCookies);
    res.send(" IN COOKIES");
})

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Someting Went Wrong"));
});
app.use((err,req,res,next)=>{
    let {message="Invalid Input!"}=err;
    res.render("errorAlert",{message});
    
});


app.listen(8080,(req,res)=>{
    console.log("Server running at 8080 port")
});