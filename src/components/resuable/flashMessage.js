import React from 'react';
import * as layoutActions from '../../store/layout/actions';
import { connect } from 'react-redux';
import classes from '../../styles/modules/backdrop.module.scss';

const FlashMessage = (props) => {
    const data = props.flashMessage;

    if (data.isTemporary) {
        const timeoutMs = data.visibilityTime || 5000;
        setTimeout(() => props.closeFlashMessage(), timeoutMs);
    }
    return (
        <Wrapper>
            <div className={classes.FlashMessage}>
                {!data.isTemporary && <span onClick={() => props.closeFlashMessage()}>XX</span>}
                {data.content}
            </div>

        </Wrapper>
    )
}



const mapStateToProps = state => {
    return {
        flashMessage: state.layout.flashMessage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeFlashMessage: () => dispatch(layoutActions.closeFlashMessage())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FlashMessage);