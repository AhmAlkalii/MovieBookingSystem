const express =  require('express');  
require('dotenv').config();
const mongoose = require('mongoose'); 
const movieRoutes = require('./routes/movies');
const ticketRoutes = require('./routes/tickets');
const pathMethod = require('./middleware/middleware')
const UserRoutes = require('./routes/user')
const ScheduleRoute = require('./routes/schedule')
const RoomRoutes = require('./routes/rooms')
const cors = require('cors')
const bodyParser = require('body-parser')


const app = express(); 

app.use(cors())
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

app.use('/api/user', UserRoutes);
app.use('/api/schedule', ScheduleRoute);
app.use('/movies',movieRoutes);
app.use('/tickets',ticketRoutes);
app.use('/rooms',RoomRoutes);