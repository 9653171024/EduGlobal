// import required modules
const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const cors=require('cors');


dotenv.config();

// initialize express app--server
const app=express();

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    console.log("App is running..");
})
// default route of server

app.listen(3000,()=>{
    console.log("Server is listening on port 3000");
});