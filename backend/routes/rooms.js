const express = require('express')
const {getRoom} = require('../controllers/roomsController')

const router = express.Router()

router.get('/', getRoom)


module.exports = router