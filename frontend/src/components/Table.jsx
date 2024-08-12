import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTime, setSelectedDay, selectSelectedTime, selectSelectedDay } from '../redux/table'; 

const times = ['10:00 AM', '2:00 PM', '4:00 PM', '7:00 PM'];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const mschedule = [
    {
        name : 'Monday',
        rtime : ['10:00 AM','12:00 PM', '2:00 PM', '4:00 PM', '7:00 PM'] 
    },
    {
        name : 'Tuesday',
        rtime : ['6:00 AM','12:00 PM', '2:00 PM', '8:00 PM', '10:00 PM'] 
    },
    {
        name : 'Wednesday',
        rtime : ['6:00 AM','8:00 AM','10:00 AM', '12:00 PM', '4:00 PM'] 
    },
    {
        name : 'Thursday',
        rtime : ['7:00 AM','10:00 AM', '3:00 PM', '6:00 PM', '10:00 PM'] 
    },
    {
        name : 'Friday',
        rtime : ['3:00 AM','8:00 AM', '1:00 PM', '3:00 PM', '8:00 PM'] 
    },
    {
        name : 'Saturday',
        rtime : ['1:00 AM','10:00 AM', '1:00 PM', '3:30 PM', '9:50 PM'] 
    },
    {
        name : 'Sunday',
        rtime : ['4:00 AM','9:00 AM', '2:50 PM', '6:40 PM', '9:00 PM'] 
    }
]




const SelectionTable = () => {
    const dispatch = useDispatch();
    const selectedTime = useSelector(selectSelectedTime);
    const selectedDay = useSelector(selectSelectedDay);

    const Timediv = () => {
        const selectedSchedule = mschedule.find(schedule => schedule.name === selectedDay);
    
        return (
            <>
            <div className='heading'>
                <h2>Select a Time</h2>
            </div> 
            <div className='options-container'>
                {selectedSchedule ? (
                    selectedSchedule.rtime.map((time, index) => (
                        <div
                            key={index}
                            className={`option-item ${selectedTime === time ? 'selected' : ''}`}
                            onClick={() => handleTimeSelect(time)}
                        >
                            {time}
                        </div>
                    ))
                ) : (
                    <p>No times available for the selected day.</p>
                )}
            </div>
            </>
        );
    };
    

    const handleTimeSelect = (time) => {
        dispatch(setSelectedTime(time));
    };

    const handleDaySelect = (day) => {
        dispatch(setSelectedDay(day));
    };

    return (
        <div className='selection-table'>

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

            { selectedDay && <Timediv/> }

        </div>
    );
};

export default SelectionTable;
