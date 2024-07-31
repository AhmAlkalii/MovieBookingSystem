const mongoose = require('mongoose'); 

const schema = mongoose.Schema; 

const movieSchema = new schema({
    poster : {
        type : String,
        require : true
    }, 
    trailer : {
        type : String, 
        // require : true
    }, 
    price:{
        type: String,
        require: true
    },
    name : {
        type : String,
        require : true
    }, 
    description : {
        type : String,
        require : true
    }
},{timestamps : true}) 

module.exports =  mongoose.model('Movies',movieSchema ) ;