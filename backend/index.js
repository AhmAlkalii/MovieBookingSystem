const express =  require('express');  
require('dotenv').config();
const mongoose = require('mongoose'); 
const movieRoutes = require('./routes/movies');
const ticketRoutes = require('./routes/tickets');
const pathMethod = require('./middleware/middleware')
<<<<<<< HEAD
const UserRoutes = require('./routes/user')
const ScheduleRoute = require('./routes/schedule')

const bodyParser = require('body-parser')


const app = express(); 


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
=======
const app = express(); 

app.use(express.json());  

app.use('/movies',movieRoutes);
app.use('/tickets',ticketRoutes);
>>>>>>> 1bf82a55fadde6a199f212074a47a3ab6605a922


mongoose.connect(process.env.Mongo_URI).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server is Listening on`, process.env.PORT, 'And Connect to MongoDB' )
    })
}   
).catch((error)=>{
    console.log(error);
})

app.use('/api/user', UserRoutes)
app.use('/movies',movieRoute);
app.use('/api/schedule', ScheduleRoute)