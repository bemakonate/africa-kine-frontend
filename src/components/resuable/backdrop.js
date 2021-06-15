import React from 'react';
import classes from '../../styles/modules/backdrop.module.scss';

const SimpleBackdrop = (props) => {

    return (
        <div>
            <div className={classes.backdrop} onClick={props.handleClose}></div>
            <div className={classes.backdropContent} onClick={props.handleClose}>
                {props.children}
            </div>

        </div>

    );
}


export default SimpleBackdrop;