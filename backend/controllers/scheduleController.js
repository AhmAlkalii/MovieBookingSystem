const Room = require('../models/roomModel');
const Schedule = require('../models/scheduleModel');

// Helper functions
const getRandomRoom = async () => {
    try {
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
};

const createSchedule = async (movie_id, movie_name, room_name, date, time, seatsBooked) => {
    try {
        const randomRoom = await getRandomRoom();
        const availableSeats = randomRoom.available_seats;

        // Ensure seatsBooked is an array
        if (!Array.isArray(seatsBooked)) {
            throw new Error('Invalid seatsBooked format');
        }

        const seatsExist = seatsBooked.every(seat =>
            availableSeats.some(
                availableSeat => availableSeat.row === seat.row && availableSeat.number === seat.number
            )
        );

        if (!seatsExist) {
            throw new Error('Some of the booked seats do not exist');
        }

        const schedule = new Schedule({
            movie_id,
            room_id: randomRoom._id,
            movie_name,
            room_name,
            date,
            time,
            seatsBooked
        });

        const savedSchedule = await schedule.save();
        return savedSchedule;
    } catch (error) {
        console.error('Error creating schedule:', error);
        throw error;
    }
};

// Route functions
const getSchedule = async (req, res) => {
    try {
        const schedule = await Schedule.find({}).sort({ date: 1, time: 1 });
        res.status(200).json(schedule);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const singleSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const schedule = await Schedule.findById(id);
        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }
        res.status(200).json(schedule);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const NewSchedule = async (req, res) => {
    const { movie_id, movie_name, room_name, date, time, seatsBooked } = req.body;

    try {
        const schedule = await createSchedule(movie_id, movie_name, room_name, date, time, seatsBooked);
        res.status(201).json({ schedule });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getSchedule,
    singleSchedule,
    NewSchedule
};
