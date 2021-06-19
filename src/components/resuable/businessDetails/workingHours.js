import React from 'react';
import moment from 'moment';
import classes from "../../../styles/modules/workingHoursContainer.module.scss";

const WorkingHours = ({ businessHours }) => {

    if (!businessHours) {
        return null;
    }

    //Business Hours JSX
    const openHours = JSON.parse(businessHours.open);
    const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
    const businessHoursJSX = [];

    for (const prop in openHours) {
        const dayHours = openHours[prop];
        let dayHoursJSX = <li className="day-hours-list_item">closed</li>;

        if (dayHours) {
            const dayHoursArr = [];
            for (let i = 0; i < dayHours.length; i += 2) {
                dayHoursArr.push(
                    <li className="day-hours-list_item" key={i}>
                        {moment(dayHours[i], "HH:mm").format('hh:mm a')} - {moment(dayHours[i + 1], "HH:mm").format('hh:mm a')}
                    </li>
                );
            }
            dayHoursJSX = dayHoursArr;
        }


        businessHoursJSX.push((
            <li className={classes.weekHoursDayRow} key={prop}>
                <span className={classes.daySlotsLabel}>{days[prop]}</span>
                <ul className={classes.daySlotsRows}> {dayHoursJSX}</ul>
            </li>
        ))

    }

    return (
        <div className={classes.workingHoursContainer}>
            <ul className={classes.weekHours}>
                {businessHoursJSX}
            </ul>
        </div>

    )
}

export default WorkingHours;