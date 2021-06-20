import React from 'react'
import { formatPhoneNum } from '../../../constants/helpers';
import classes from '../../../styles/modules/businessInfo.module.scss';

const businessInfo = ({ businessInfo, labelClass, detailClass }) => {

    const labelClasses = [classes.Label, labelClass && labelClass].join(' ');
    const detailClasses = [classes.Detail, detailClass && detailClass].join(' ');
    return (
        <div className={classes.Details}>
            <div className={classes.Row}>
                <h4 className={labelClasses}>Address</h4>
                <p className={detailClasses}>{businessInfo.location}</p>
            </div>

            <div className={classes.Row}>
                <h4 className={labelClasses}>Email</h4>
                <p className={detailClasses}>{businessInfo.email}</p>
            </div>

            <div className={classes.Row}>
                <h4 className={labelClasses}>Phone</h4>
                <p className={detailClasses}>{formatPhoneNum(businessInfo.phone)}</p>
            </div>


            {businessInfo.phone2 && <div className={classes.Row}>
                <h4 className={labelClasses}>Phone 2</h4>
                <p className={detailClasses}>{formatPhoneNum(businessInfo.phone2)}</p>
            </div>}
        </div>
    )
}

export default businessInfo
