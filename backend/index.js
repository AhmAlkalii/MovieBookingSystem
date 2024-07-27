const express =  require('express');  
require('dotenv').config();
const mongoose = require('mongoose'); 
const movieRoute = require('./routes/movies');
const pathMethod = require('./middleware/middleware')
const app = express(); 
app.use(express.json());  

app.use('/movies',movieRoute);


mongoose.connect(process.env.Mongo_URI).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('running')
    })
}   
).catch((error)=>{
    console.log(error);
})
