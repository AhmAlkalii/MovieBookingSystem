const Room = require('../models/roomModel'); 

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
}

const getRoom = async (req, res) => {
    try {
        const randomRoom = await getRandomRoom();
        res.status(200).json({ randomRoom });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getRoom }; 
