const mongoose = require('mongoose'); 

const schema = mongoose.Schema; 

const ticketSchema = new schema({
    scheduleID: {
        type : String, 
        ref : 'schedule'
    }, 
    seatNumber: {
        type : Number, 
        require : true
    }, 
    status: {
        type : String, 
        require : true
    }
},{timestamps:true}); 

module.exports = mongoose.model('tickets',ticketSchema);