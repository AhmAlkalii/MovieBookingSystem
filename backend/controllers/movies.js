const Movie = require('../models/movies'); 


const getAll = (req,res) => {
    try{
        res.json('Get all movies')
    }catch(err){
        res.json({error : err.message})
    }
} 

const singleMovie = (req,res) => {
    try{
        res.json('Get single movie')
    }catch(err){
        res.json({error : err.message})
    }
} 

const create = (req,res) => {
    try{
        res.json('Create a movie')
    }catch(err){
        res.json({error: err.message})
    }
} 

const remove = (req,res) => {
    try{
        res.json('delete a movie')
    }catch(err){
        res.json({error:err.message})
    }
} 

const update = (req,res) => {
    try{
        res.json('Update a movie')
    }catch(err){
        res.json({error : err.message})
    }
} 

module.exports = {getAll,singleMovie,create,remove,update}