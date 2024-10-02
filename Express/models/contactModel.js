const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    name:{
        type :String,
        required :[true, "Please add your name"]
    },
    email:{
        type :String,
        required :[true, "Please add your email"]
    },
    phone:{
        type :Number,
        required :[true, "Please add your number"]
    }
},{
    timestamps :true,
})

module.exports = mongoose.model("Contact", contactSchema);