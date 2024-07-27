const mongoose = require('mongoose')

const Schema = mongoose.Schema

const roomSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
});


module.exports = mongoose.model('Room', roomSchema);