import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoom, getRoomStatus, getRoomError, selectRoom } from '../redux/room';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { createSchedule } from '../redux/schedule';
import {selectSelectedTime, selectSelectedDay, resetSelection } from '../redux/table'; 
import { useAuthContext } from '../hooks/useAuthContext'
import SelectionTable from './Table';

const Room = ({ movie }) => {
    const { _id, price, name } = movie;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const room = useSelector(selectRoom);
    const roomStatus = useSelector(getRoomStatus);
    const error = useSelector(getRoomError);
    const { user } = useAuthContext();

    const selectedTime = useSelector(selectSelectedTime);
    const selectedDay = useSelector(selectSelectedDay);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [total, setTotal] = useState(price);

    useEffect(() => {
        if (roomStatus === 'idle') {
            dispatch(fetchRoom());
        }
    }, [roomStatus, dispatch]);

    useEffect(() => {
        setTotal(selectedSeats.length * price); 
    }, [selectedSeats, price]);

    const handleSeatClick = (row, seatNumber) => {
        setSelectedSeats(prevSeats => {
            const seatIndex = prevSeats.findIndex(seat => seat.row === row && seat.number === seatNumber);

            if (seatIndex > -1) {
                return prevSeats.filter((_, index) => index !== seatIndex);
            } else {
                return [...prevSeats, { row, number: seatNumber }];
            }
        });
    };

    const handleBuyTicket = () => {
        if (selectedSeats.length > 0 && selectedTime && selectedDay) {
            const scheduleInfo = {
                movie_id: _id,
                movie_name: name,
                room_name: room.name,
                date: selectedDay,
                time: selectedTime,
                seatsBooked: selectedSeats
            };
    
            if (user && user.token) {
                dispatch(createSchedule({ scheduleData: scheduleInfo, token: user.token }))
                    .unwrap()
                    .then(response => {
                        console.log('Schedule created:', response);
                        toast.success('Schedule created and tickets booked successfully!');
                        setSelectedSeats([]);
                        setTotal(price);
                        dispatch(resetSelection());
                        navigate(`/schedule`);
                    })
                    .catch(error => {
                        console.error('Error creating schedule:', error);
                        toast.error('Failed to create schedule');
                    });
            } else {
                toast.error("User authentication is missing. Please log in.");
            }
        } else {
            toast.error("Please select at least one seat, a time, and a day.");
        }
    };    

    if (roomStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (roomStatus === 'failed') {
        return <div>Error: {error}</div>;
    }

    if (!room) {
        return <div>No room data available</div>;
    }

    return (
        <div className='Room'>
            <div className='heading'>
                <h1>{room.name}</h1>
            </div>
            <div className='room-box'>
                {room.available_seats.map((seat, index) => (
                    <div 
                        key={index} 
                        style={{ textAlign: 'center' }} 
                        className='room-icon' 
                        onClick={() => handleSeatClick(seat.row, seat.number)} 
                    >
                        <EventSeatIcon 
                            style={{ fontSize: 70 }} 
                            color={selectedSeats.some(s => s.row === seat.row && s.number === seat.number) ? "primary" : "inherit"} 
                        />
                        <p>{`${seat.number}`}</p>
                    </div>
                ))}
            </div>
            
            <SelectionTable/>

            <div>
                <button className='pricebutton' onClick={handleBuyTicket}>
                    {total} Zloty
                </button>
            </div>
        </div>
    );
};

export default Room;
