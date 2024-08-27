const Movie = require('../models/movies'); 


const getAll = async(req,res) => {
    try{
        const movie = await Movie.find({}); 
        if(movie.length == 0 ){
            return res.status(200).json(movie)
        } 
        res.status(200).json(movie)
    }catch(err){
        res.json({error : err.message})
    }
} 

const singleMovie = async(req,res) => {
    try{
        const {id} = req.params; 
        const movie = await Movie.findById(id); 
        if(!movie){
            return res.status(404).json({error:'Could not find movie'})
        } 
        res.status(200).json(movie)
    }catch(err){
        res.json({error : err.message})
    }
} 

const create = async(req,res) => {
    try{
        console.log(req.files)
        const {trailer,price, name,description} = req.body; 
        // const movie = await Movie.create({poster:req.file,trailer,name,description}); 
        // if(!movie){
        //     return res.json({error:'Failed to create movie'})
        // } 
        // res.status(200).json(movie)
    }catch(err){
        res.json({error: err.message})
    }
} 

const remove = async(req,res) => {
    try{
        const {id} = req.params; 
        const movie = await Movie.findByIdAndDelete(id); 
        if(!movie){
            return res.status(404).json({error:'Movie does not exist'})
        } 
        res.status(200).json(movie)
    }catch(err){
        res.json({error:err.message})
    }
} 

const update = async(req,res) => {
    try{
        const data = req.body; 
        const {id} = req.params;
        console.log(req.files)
        if(req.files){
            if(req.files.length == 2){
                const movie = await Movie.findByIdAndUpdate(id,{poster : `${req.files.poster[0].filename}`,trailer : `${req.files.trailer[0].filename}`});
                if(!movie){
                    return res.status(404).json({error:'Could not update movie poster'})
                } 
                const updatedMovie = await Movie.findById(id)
                return res.json(updatedMovie)
            }else if(req.files.poster){
                const movie = await Movie.findByIdAndUpdate(id,{poster : `${req.files.poster[0].filename}`});
                if(!movie){
                    return res.status(404).json({error:'Could not update movie poster'})
                } 
                const updatedMovie = await Movie.findById(id)
                return res.json(updatedMovie)
            }else{
                const movie = await Movie.findByIdAndUpdate(id,{trailer : `${req.files.trailer[0].filename}`});
                if(!movie){
                    return res.status(404).json({error:'Could not update movie trailer'})
                } 
                const updatedMovie = await Movie.findById(id)
                return res.json(updatedMovie)
            }
        } 
        const movie = await Movie.findByIdAndUpdate(id,data); 
        if(!movie){
            return res.status(404).json('Could not update movie')
        }  
        const updatedMovie = await Movie.findById(id)
        res.status(200).json(updatedMovie)
    }catch(err){
        res.json({error : err.message})
    }
} 

module.exports = {getAll,singleMovie,create,remove,update}