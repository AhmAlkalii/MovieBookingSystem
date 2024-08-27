const User = require('../models/userModel')
const Guest = require('../models/guestModel')
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken')


//generate the token
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn:'2d'})
}


//get all users
const getUsers = async(req,res)=>{
    const users = await User.find({}).sort({password:-1})

    res.status(200).json(users)
}

//getGuests
const getGuests = async(req,res)=>{
    const guest = await Guest.find({}).sort({email:-1})

    res.status(200).json(guest)
}

//single user
const singleUser =  async(req, res) => {
    const { id } = req.params

    const user = await User.findById({_id: id})

    res.status(200).json(user)
}


//sign up
const UserSignup = async(req, res) =>{
    const {firstname, lastname, number, email, password} = req.body

    try{
        const user =  await User.signup(firstname, lastname, number, email, password)

        const token = createToken(user._id)

        const theid = user._id
        res.status(200).json({theid,email, token})

    } catch(error){
        res.status(400).json({error: error.message})
    }
} 

const EditUser = async (req, res) => {
    try {
        const { id } = req.params;

        let updateData = { ...req.body };

        if (req.body.password) {
            if (!validator.isStrongPassword(req.body.password)) {
                throw new Error('Password needs to be stronger');
            }
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(req.body.password, salt);
            updateData.password = hash;
        }

        const changes = await User.findByIdAndUpdate(
            { _id: id },
            { $set: updateData },
            { new: true }
        );

        res.status(200).json(changes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const Userlogin = async(req,res) => {
    const {email, password} = req.body

    try{
        const user = await User.login(email,password)

        const token = createToken(user._id)
        const theid = user._id

        res.status(200).json({theid,email, token})
    } catch(error){
        res.status(400).json({error: error.message})
    }
}


const Guestlogin = async(req,res) => {
    const {email} = req.body

    try{
        const guest = await Guest.login(email)

        const token = createToken(guest._id)

        res.status(200).json({email, token})
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

const DeleteUser = async(req, res) => {
    const {id} = req.params

    try {
        const user = await User.findByIdAndDelete({_id: id})

        res.status(204).json(user)
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getUsers,
    getGuests,
    singleUser,
    UserSignup,
    Userlogin,
    Guestlogin,
    EditUser,
    DeleteUser
}