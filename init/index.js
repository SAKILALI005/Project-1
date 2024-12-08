const mongoose = require("mongoose");
const path = require("path");
const initdata = require("./data");
const Listing = require("../models/listing.js");

async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
        console.log("Connected to DB");
        await initdb(); // Call initdb after connecting
    } catch (err) {
        console.error("Error connecting to DB:", err);
    }
}

const initdb = async () => {
    try {
        await Listing.deleteMany({});
        initdata.data=initdata.data.map((obj)=>({...obj, owner:"674483dd9a130f0328bf9537"}));
        await Listing.insertMany(initdata.data);
        console.log("Database initialized with sample data.");
    } catch (error) {
        console.error("Error initializing database:", error);
    }
};

main();
