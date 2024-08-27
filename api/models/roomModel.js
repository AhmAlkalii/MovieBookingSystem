const mongoose = require('mongoose')

const Schema = mongoose.Schema

const seatSchema = new Schema({
    row: { type: String, required: true },
    number: { type: Number, required: true }
}, { _id: false }); 

const roomSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    available_seats: [seatSchema]
});


module.exports = mongoose.model('Room', roomSchema);