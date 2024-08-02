import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTime, setSelectedDay, selectSelectedTime, selectSelectedDay } from '../redux/table'; 

const times = ['10:00 AM', '2:00 PM', '4:00 PM', '7:00 PM'];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const SelectionTable = () => {
    const dispatch = useDispatch();
    const selectedTime = useSelector(selectSelectedTime);
    const selectedDay = useSelector(selectSelectedDay);

    const handleTimeSelect = (time) => {
        dispatch(setSelectedTime(time));
    };

    const handleDaySelect = (day) => {
        dispatch(setSelectedDay(day));
    };

    return (
        <div className='selection-table'>
            <div className='heading'>
                <h2>Select a Time</h2>
            </div>
            <div className='options-container'>
                {times.map((time, index) => (
                    <div
                        key={index}
                        className={`option-item ${selectedTime === time ? 'selected' : ''}`}
                        onClick={() => handleTimeSelect(time)}
                    >
                        {time}
                    </div>
                ))}
            </div>

            <div className='heading'>
                <h2>Select a Day</h2>
            </div>
            
            <div className='options-container'>
                {days.map((day, index) => (
                    <div
                        key={index}
                        className={`option-item ${selectedDay === day ? 'selected' : ''}`}
                        onClick={() => handleDaySelect(day)}
                    >
                        {day}
                    </div>
                ))}
            </div>

            <div>
                <div className='heading'>
                    <h3>Selected Time: {selectedTime}</h3>
                </div>
                <div className='heading'>
                    <h3>Selected Day: {selectedDay}</h3>
                </div>
            </div>
        </div>
    );
};

export default SelectionTable;
