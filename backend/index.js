const express =  require('express');  
require('dotenv').config();
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser')
const UserRoutes = require('./routes/user')


const app = express(); 


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))



mongoose.connect(process.env.Mongo_URI).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server is Listening on`, process.env.PORT, 'And Connect to MongoDB' )
    })
}   
).catch((error)=>{
    console.log(error);
})

app.use('/api/user', UserRoutes)

