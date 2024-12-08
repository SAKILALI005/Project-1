const Listing=require("../models/listing");


module.exports.index=async(req,res)=>{
    let alldata=await Listing.find();
    res.render("./listings/index",{alldata});
};
module.exports.showRoute=async (req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id)
        .populate({
            path:"reviews",
            populate:{
                path:"author",
            },
        })
        .populate("owner");
    if(!listing){
        req.flash("error","This List doesn't exists");
      return  res.redirect("/");
    }
    res.render("./listings/show",{listing});
};
module.exports.newListForm=(req,res)=>{
    res.render("./listings/new");
};
module.exports.newToHome=async(req,res,next)=>{
    const url=req.file.path;
    const filename=req.file.filename;
    const newListing=new Listing(req.body.listing);
    newListing.owner=req.user._id;
    newListing.image={url,filename};
    await newListing.save();
    req.flash("success","New List Created");
    res.redirect("/");
};
module.exports.editListForm=async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    let originalImage=listing.image.url;
    originalImage=originalImage.replace("/upload","/upload/h_150,w_200");
    res.render("./listings/edit",{listing,originalImage});
};
module.exports.editToShow=async(req,res)=>{
    let {id}=req.params;
    const updateListing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file!=="undefined"){
        const url=req.file.path;
        const filename=req.file.filename;
        updateListing.image={url,filename};
        await updateListing.save();
    }
    req.flash("success","List Updated!");
    res.redirect(`/listings/${id}`);
};
module.exports.deleteRoute=async(req,res)=>{
    let {id}=req.params;
    let deleteListing =await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    req.flash("success","List Deleted");
    res.redirect("/");
};