import React, { useState, useEffect } from 'react';
import * as layoutActions from '../../../store/layout/actions';
import { connect } from 'react-redux';
import styled from 'styled-components';

const FlashMessage = (props) => {
    const data = props.flashMessage;

    if (data.isTemporary) {
        const timeoutMs = data.visibilityTime || 5000;
        setTimeout(() => props.closeFlashMessage(), timeoutMs);
    }
    return (
        <Wrapper>
            <div className="flash-message">
                {!data.isTemporary && <span onClick={() => props.closeFlashMessage()}>XX</span>}
                {data.content}
            </div>

        </Wrapper>
    )
}


const Wrapper = styled.div`
.flash-message{
    position:fixed;
    top:10px;
    left:25%;
    z-index:150;
    width:50%;
    padding:10px;
    background:white;
    border:1px solid black;
    border-radius:5px;
}
`;
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