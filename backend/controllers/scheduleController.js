const Room = require('../models/roomModel');
const Schedule = require('../models/scheduleModel');

const getRoom = async () => {
    try {
        const room = await Room.findOne();
        if (!room) {
            throw new Error('No room found');
        }
        return room;
    } catch (error) {
        console.error('Error getting room:', error);
        throw error;
    }
};

const createSchedule = async (movie_id, movie_name, room_name, date, time, user_id, seatsBooked) => {
    try {
        const room = await getRoom();
        const availableSeats = room.available_seats;

        // Ensure seatsBooked is an array
        if (!Array.isArray(seatsBooked)) {
            throw new Error('Invalid seatsBooked format');
        }

        // Check if all booked seats exist in the available seats
        const seatsExist = seatsBooked.every(seat =>
            availableSeats.some(
                availableSeat => availableSeat.row === seat.row && availableSeat.number === seat.number
            )
        );

        if (!seatsExist) {
            throw new Error('Some of the booked seats do not exist');
        }

        // Find existing schedules for the same movie in the same room
        const existingSchedules = await Schedule.find({
            movie_id: movie_id,
            room_id: room._id,
            date: date,
            time: time
        });

        // Check for seat conflicts
        for (const schedule of existingSchedules) {
            for (const seat of seatsBooked) {
                const seatAlreadyBooked = schedule.seatsBooked.some(
                    bookedSeat => bookedSeat.row === seat.row && bookedSeat.number === seat.number
                );
                if (seatAlreadyBooked) {
                    throw new Error(`Seat ${seat.row}${seat.number} is already booked for this movie.`);
                }
            }
        }

        const newSchedule = new Schedule({
            movie_id,
            room_id: room._id,
            movie_name,
            room_name,
            date,
            time,
            user_id,
            seatsBooked
        });

        const savedSchedule = await newSchedule.save();
        return savedSchedule;
    } catch (error) {
        console.error('Error creating schedule:', error);
        throw error;
    }
};

// Route functions
const getSchedule = async (req, res) => {
    const user_id = req.user._id;

    try {
        const schedule = await Schedule.find({ user_id }).sort({ date: -1, time: -1 });
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
    const user_id = req.user._id;
    try {
        const schedule = await createSchedule(movie_id, movie_name, room_name, date, time, user_id, seatsBooked);
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
