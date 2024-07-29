const express =  require('express');  
require('dotenv').config();
const mongoose = require('mongoose'); 
const movieRoutes = require('./routes/movies');
const ticketRoutes = require('./routes/tickets');
const pathMethod = require('./middleware/middleware')
const app = express(); 

app.use(express.json());  

app.use('/movies',movieRoutes);
app.use('/tickets',ticketRoutes);


mongoose.connect(process.env.Mongo_URI).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('running')
    })
}   
).catch((error)=>{
    console.log(error);
})
