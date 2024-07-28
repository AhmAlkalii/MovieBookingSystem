const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
    seatsBooked: {
        type: Number,
        default: 0
    }
})


module.exports = mongoose.model('Schedule', ScheduleSchema)
