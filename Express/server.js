const path = require("path");
const dotenv = require("dotenv").config();
const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");

connectDb();
const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use("/api/contacts", require("./routes/contactroute"));
app.use(errorHandler);

app.listen(PORT , () =>{
    console.log(`Listening the server on port ${PORT}`);
})