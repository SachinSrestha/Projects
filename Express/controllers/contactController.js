const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

const getContact = asyncHandler(async (req,res)=>{
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

const getContactById = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("No contacts found");
    }
    res.status(200).json(contact);
});

const createContact = asyncHandler(async(req,res)=>{
    console.log("The requested body is :", req.body);
    const {name,email,phone}=req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("Fill All the fields");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
    });
    res.status(201).json(contact);
});

const updateContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("No contacts found");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );

    res.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("No contacts found");
    }
    res.status(200).json(contact);
});

module.exports ={getContact, createContact,getContactById,updateContact,deleteContact};