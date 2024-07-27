const express = require('express')
const {getUsers,getGuests,singleUser,UserSignup,Userlogin,Guestlogin} = require('../controller/userController')

const router = express.Router()

//get Users
router.get('/users', getUsers)
//get Guests
router.get('/guests', getGuests)
//single User
router.get('/:id',singleUser)
//Signup
router.post('/signup', UserSignup)
//FrequentUser Login
router.post('/login',Userlogin)
//Guest Login
router.post('/guestlogin',Guestlogin)


module.exports = router