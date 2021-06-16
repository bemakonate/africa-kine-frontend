import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WorkingHours from './workingHours';
import BusinessInfo from './businessInfo';


const BusinessDetails = (props) => {
    const [businessDetails, setBusinessDetails] = useState({
        info: null,
        hours: null,
    });


    useEffect(() => {
        const run = async () => {
            const res = await Promise.all([
                axios.get('http://localhost:1337/business-info'),
                axios.get('http://localhost:1337/restaurant-settings/business'),
            ]);

            const businessInfoData = res[0].data;
            const businessHoursData = res[1].data.business.hours;
            setBusinessDetails({
                info: businessInfoData,
                hours: businessHoursData,
            })
        }

        run();

    }, [])


    let businessDetailsJSX = null;

    if (businessDetails.info && businessDetails.hours) {
        const businessInfo = businessDetails.info;
        const businessHours = businessDetails.hours;

        businessDetailsJSX = (

            <div className="business-info-group">
                <div className={props.infoClass}>
                    <BusinessInfo businessInfo={businessInfo} />
                </div>


                <div className="business-info__hours">
                    <h3 className="business-info__hours-title">Hours</h3>
                    <WorkingHours businessHours={businessHours} />
                </div>
            </div>


        )
    }
    return businessDetailsJSX;
}




export default BusinessDetails;
