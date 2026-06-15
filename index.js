const express=require('express');
const dotenv=require('dotenv');
const cors = require("cors");
const connectDB=require('./config/db');
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user.route");
dotenv.config();

connectDB();

const app=express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.send("HireHub running")
});
app.use("/api/v1/user", userRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});