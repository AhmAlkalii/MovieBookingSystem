const { get } = require('mongoose');
const Ticket = require('../models/tickets'); 

const create = async(req,res) => {
    try{
        const {scheduleID, seatNumber, price} = req.body; 
        const ticket = await Ticket.create({scheduleID, seatNumber, price}); 
        if(!ticket){
            return res.status(404).json({error:'Failed to create ticket'})
        }
        res.status(200).json(ticket)
    }catch(err){
        res.json({error:err.message})
    }
}

const remove = async(req,res) => {
    try{
        const {id} = req.params; 
        const ticket = await Ticket.findByIdAndDelete(id); 
        if(!ticket){
            return res.status(404).json({error : 'Ticket does not exist'});
        }
        res.status(200).json(ticket);
    }catch(err){
        res.json({error:err.message})
    }
}

const update = async(req,res) => {
    try{
        const {id} = req.params; 
        const data = req.body; 
        const ticket = await Ticket.findByIdAndUpdate(data); 
        if(!ticket){
            return res.json(404).json({error:'Could not update ticket'});
        } 
        res.status(200).json(ticket);
    }catch(err){
        res.json({error:err.message})
    }
} 

const getAll = async(req,res) => {
    try{
        const tickets = await Ticket.find({}); 
        if(tickets.length == 0){
            return res.status(200).json('There are no tickets')
        } 
        res.status(200).json(tickets)
    }catch(err){
        res.json({error:err.message})
    }
} 

const single = async(req,res) => {
    try{
        const {id} = req.params; 
        const ticket = await Ticket.findById(id); 
        if(!ticket){
            return res.status(404).json('Could not find ticket');
        }
        res.status(200).json(ticket);
    }catch(err){
        res.json({error:err.message})
    }
} 

module.exports = {create,remove,update,getAll,single};