const express = require('express')
const {getSchedule,singleSchedule,NewSchedule} = require('../controllers/scheduleController')
const requireAuth = require('../middleware/requireAuth')


const router =  express.Router()


// Authentication for all workout routes
router.use(requireAuth)


router.get('/',getSchedule)
router.get('/:id',singleSchedule)
router.post('/create', NewSchedule)


module.exports = router