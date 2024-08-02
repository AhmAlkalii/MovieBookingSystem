import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchSchedule, getScheduleError, getScheduleStatus, selectAllSchedule } from '../redux/schedule';
import { useDispatch, useSelector } from 'react-redux';

const Schedule = () => {
    const dispatch = useDispatch();
    const schedule = useSelector(selectAllSchedule);
    const scheduleStatus = useSelector(getScheduleStatus);
    const error = useSelector(getScheduleError);

    useEffect(() => {
        if (scheduleStatus === 'idle') {
            dispatch(fetchSchedule());
        }
    }, [scheduleStatus, dispatch]);

    if (scheduleStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (scheduleStatus === 'failed') {
        return <div>Error: {error}</div>;
    }

    if (!schedule) {
        return <div>No schedule available</div>;
    }

    return (
        <div className="ticket">
            {schedule.map((s) => (
                <div className="ticket-details" key={s._id}>
                    <h4>{s.movie_name}</h4>
                    <h4>{s.room_name}</h4>
                    <p><strong>Date: </strong>{s.date}</p>
                    <p><strong>Time: </strong>{s.time}</p>
                    <p><strong>Seats Booked: </strong>
                        {s.seatsBooked.map((seat, index) => (
                            <span key={index}>{`Row: ${seat.row}, Number: ${seat.number}; `}</span>
                        ))}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Schedule;
