import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoom, getRoomStatus, getRoomError, selectRoom } from '../redux/room';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Room = ({ movie }) => {
    const { price } = movie;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const room = useSelector(selectRoom);
    const roomStatus = useSelector(getRoomStatus);
    const error = useSelector(getRoomError);

    const [selected, setSelected] = useState(0);
    const [total, setTotal] = useState(price);

    useEffect(() => {
        if (roomStatus === 'idle') {
            dispatch(fetchRoom());
        }
    }, [roomStatus, dispatch]);

    useEffect(() => {
        setTotal(selected * price);
    }, [selected, price]);

    const handleSeatClick = () => {
        setSelected(prevSelected => prevSelected + 1);
    };

    const handleBuyTicket = () => {
        try {
            if (selected > 0) {
                
                toast(`Ticket Purchased! Selected ${selected} seats`);

                setSelected(0);
                setTotal(price);
                navigate('/')
            } else {
                toast.error("Please select at least one seat.");
            }
        } catch (error) {
            toast.error("Failed to purchase ticket");
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
                    <div key={index} style={{ textAlign: 'center' }} className='room-icon' onClick={handleSeatClick}>
                        <EventSeatIcon style={{ fontSize: 70 }} color="blue" />
                        <p>{`${seat.number}`}</p>
                    </div>
                ))}
            </div>
            <div>
                <button className='pricebutton' onClick={handleBuyTicket}>
                    {total} Zloty
                </button>
            </div>
        </div>
    );
};

export default Room;
