const express = require('express')
const {getSchedule,singleSchedule,NewSchedule} = require('../controllers/scheduleController')


const router =  express.Router()

router.get('/',getSchedule)
router.get('/:id',singleSchedule)
router.post('/create', NewSchedule)


module.exports = router