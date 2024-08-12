import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSchedule, getScheduleError, getScheduleStatus, selectAllSchedule } from '../redux/schedule';
import { useAuthContext } from '../hooks/useAuthContext'



const Schedule = () => {
    const dispatch = useDispatch();
    const schedule = useSelector(selectAllSchedule);
    const scheduleStatus = useSelector(getScheduleStatus);
    const error = useSelector(getScheduleError);
    const { user } = useAuthContext();

    useEffect(() => {
        if (user && scheduleStatus === 'idle') {
            dispatch(fetchSchedule(user.token));
        }

        const intervalId = setInterval(() => {
            if (user) {
                dispatch(fetchSchedule(user.token));
            }
        }, 1000);

        return () => clearInterval(intervalId);
        
    }, [scheduleStatus, user , dispatch]);

    // if (scheduleStatus === 'loading') {
    //     return <div>Loading...</div>;
    // }

    if (scheduleStatus === 'failed') {
        return <div>Error: {error}</div>;
    }

    if (!schedule || schedule.length === 0) {
        return <div>No schedule available</div>;
    }

    return (
        <div className='cardWrap'>
            {schedule.map((s) => (
                <div className="cardContainer" key={s._id}>
                    <div className="card cardLeft">
                        <h1>Startup <span>Cinema</span></h1>
                        <div className='title'>
                            <h2>{s.movie_name}</h2>
                            <span>movie</span>
                        </div>
                        <div className="name">
                            <h2>{s.room_name}</h2>
                            <span>room name</span>
                        </div>
                        <div className="seat">
                            <h2>
                                {s.seatsBooked.map((seat, index) => (
                                    <span key={index}>{`Row: ${seat.row}, No: ${seat.number}; `}</span>
                                ))}
                            </h2>
                            <span>seat</span>
                        </div>
                        <div className="time">
                            <h2>{s.time}</h2>
                            <span>time</span>
                        </div>
                    </div>
                    <div className="card cardRight">
                        <div className="eye"></div>
                        <div className="number">
                            <h3>
                                {s.seatsBooked.map((seat, index) => (
                                    <span key={index}>{seat.number}</span>
                                ))}
                            </h3>
                            <span>seat</span>
                        </div>
                        <div className="barcode"></div>
                    </div>
                </div>
            ))}
        </div>      
    );
};

export default Schedule;
