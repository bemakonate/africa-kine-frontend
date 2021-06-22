import React from 'react'
import Backdrop from './backdrop';
import Spinner from './spinner';
import classes from '../../styles/modules/loadingBackdrop.module.scss';

const loadingBackdrop = () => {
    return (
        <Backdrop>
            <div className={classes.LoadingBackdropContainer}>
                <Spinner />
                <p className={classes.LoadingBackdropText}>Loading your page</p>
            </div>

        </Backdrop>
    )
}

export default loadingBackdrop
