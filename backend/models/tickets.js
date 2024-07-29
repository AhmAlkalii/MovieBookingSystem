const mongoose = require('mongoose'); 

const schema = mongoose.Schema; 

const ticketSchema = new schema({
    scheduleID: {
        type: schema.Types.ObjectId,
        ref: 'schedules'
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

module.exports = mongoose.model('Tickets',ticketSchema);