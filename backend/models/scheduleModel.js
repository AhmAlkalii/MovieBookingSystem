const mongoose = require('mongoose')
const Schema = mongoose.Schema

const seatSchema = new Schema({
    row: { type: String, required: true },
    number: { type: Number, required: true }
}, { _id: false });


const ScheduleSchema= ({
    movie_id : {
        type: Schema.Types.ObjectId,
        ref: 'movies'
    },
    room_id : {
        type: Schema.Types.ObjectId,
        ref: 'Room'
    },
    date : {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    seatsBooked: [seatSchema]
})


module.exports = mongoose.model('Schedule', ScheduleSchema)
