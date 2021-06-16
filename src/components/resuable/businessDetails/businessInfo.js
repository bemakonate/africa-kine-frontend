import React from 'react'
import { formatPhoneNum } from '../../../constants/helpers';
import classes from '../../../styles/modules/businessInfo.module.scss';

const businessInfo = ({ businessInfo }) => {
    return (
        <div className={classes.Details}>
            <div className={classes.Row}>
                <h4 className={classes.Label}>Address</h4>
                <p className={classes.Detail}>{businessInfo.location}</p>
            </div>

            <div className={classes.Row}>
                <h4 className={classes.Label}>Email</h4>
                <p className={classes.Detail}>{businessInfo.email}</p>
            </div>

            <div className={classes.Row}>
                <h4 className={classes.Label}>Phone</h4>
                <p className={classes.Detail}>{formatPhoneNum(businessInfo.phone)}</p>
            </div>

            {businessInfo.phone2 !== null && <div className={classes.Row}>
                <h4 className={classes.Label}>Phone 2</h4>
                <p className={classes.Detail}>{formatPhoneNum(businessInfo.phone2)}</p>
            </div>}
        </div>
    )
}

export default businessInfo
