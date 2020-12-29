import React from 'react';
import { conenct } from 'react-redux'
import styled from 'styled-components';


const SimpleBackdrop = (props) => {

    return (
        <Wrapper>
            <div className="backdrop" onClick={props.handleClose}></div>
            <div className="backdrop-content">
                {props.children}
            </div>

        </Wrapper>

    );
}


const Wrapper = styled.div`
.backdrop{
    z-index:100;
    background:rgb(0,0,0, .5);
    position:fixed;
    height:100%;
    width:100%;
    top:0;
    left:0;
}

.backdrop-content{
    position:absolute;
    z-index:100;
}
`



export default SimpleBackdrop;