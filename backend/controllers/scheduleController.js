const Room = require('../models/roomModel')
const Schedule = require('../models/scheduleModel')

//helper functions
const getRandomRoom = async() => {
    try{
        const rooms = await Room.find(); 
        if (rooms.length === 0) {
            throw new Error('No rooms available');
        }
        const randomIndex = Math.floor(Math.random() * rooms.length);
        return rooms[randomIndex];
    } catch (error) {
        console.error('Error getting random room:', error);
        throw error;
    }
}

const createSchedule = async(movie_id, date, time) => {
    try {
        const randomRoom = await getRandomRoom();
        const schedule = new Schedule({
            movie_id,
            room_id: randomRoom._id,
            date,
            time
        });

        const savedSchedule = await schedule.save();
        return savedSchedule;
    } catch (error) {
        console.error('Error creating schedule:', error);
        throw error;
    }
}




//Route functions
const getSchedule = async(req,res) => {
    const schedule = await Schedule.find({}).sort({seatsBooked: -1})

    res.status(200).json(schedule)
}


//single schedule
const singleSchedule =  async(req, res) => {
    const { id } = req.params

    const schedule = await Schedule.findById({_id: id})

    res.status(200).json(schedule)
}


const NewSchedule = async(req,res) => {
    const {movie_id, date, time} = req.body

    try {
        const schedule = await createSchedule(movie_id, date, time);
        res.status(201).json({ schedule });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getSchedule,
    singleSchedule,
    NewSchedule
}