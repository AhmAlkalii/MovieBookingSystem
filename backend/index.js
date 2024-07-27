const express =  require('express');  
require('dotenv').config();
const mongoose = require('mongoose'); 

const app = express(); 
app.use(express.json()); 

mongoose.connect(process.env.Mongo_URI).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('running')
    })
}   
).catch((error)=>{
    console.log(error);
})
