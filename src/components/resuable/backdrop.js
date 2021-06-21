import React, { useEffect } from 'react';
import classes from '../../styles/modules/backdrop.module.scss';

const SimpleBackdrop = (props) => {

    useEffect(() => {
        const body = document.querySelector('body');
        body.classList.add('js__stop-overflow');

        return () => {
            body.classList.remove('js__stop-overflow');
        }
    }, [])

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