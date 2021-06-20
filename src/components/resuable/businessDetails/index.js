import React, { useState, useEffect } from 'react';
import WorkingHours from './workingHours';
import BusinessInfo from './businessInfo';
import { connect } from 'react-redux';


const BusinessDetails = ({ businessData, ...props }) => {
    let businessDetailsJSX = null;

    if (businessData) {
        businessDetailsJSX = (

            <div className="business-info-group">
                <div className={props.infoClass}>
                    <BusinessInfo
                        businessInfo={businessData}
                        labelClass={props.infoLabelClass}
                        detailClass={props.infoDetailClass} />
                </div>


                <div className="business-info__hours">
                    <h3 className="business-info__hours-title">Hours</h3>
                    <WorkingHours businessHours={businessData.hours} dayLabelClass={props.hoursDayLabelClass} />
                </div>
            </div>


        )
    }
    return businessDetailsJSX;
}



const mapStateToProps = state => {
    return {
        businessData: state.layout.businessData,
    }
}
export default connect(mapStateToProps)(BusinessDetails);
