const express=require("express");
const errorHandler = require("./middlewares/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv=require("dotenv").config()
const cors=require('cors');

connectDb();
const app=express();
app.use(cors());
const port=process.env.PORT||3000;
app.use(express.json())

app.use("/api/contacts",require("./routes/contactRoutes"))
app.use("/api/user",require("./routes/userRoutes"))
app.use(errorHandler)
app.listen(port,()=>{
      console.log(`port is running on ${port}`)
})