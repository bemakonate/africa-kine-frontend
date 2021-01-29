import React, { useState, useEffect } from 'react'
import ProductModal from '../resuable/productModal';
import { connect } from 'react-redux';
import * as layoutActions from '../../store/layout/actions';
import Link from 'next/link';
import FlashMessage from '../resuable/flashMessage';
import styled from 'styled-components';

const mq = (breakpoint, children) => {
    switch (breakpoint) {
        case 'med':
            return `
            @media screen and (min-width:700px){
                ${children}
            }
            `;
        default:
            return null;

    }
}

const Layout = (props) => {
    const { isProductModalOpen, productModalProps, closeProductModal } = props;

    return (
        <GlobalStyles>
            <LayoutStyles>
                <>
                    {(props.flashMessage && props.flashMessage.open) && <FlashMessage />}
                    {isProductModalOpen ? <ProductModal {...productModalProps} close={closeProductModal} /> : null}
                    <nav>
                        <ul>
                            <li><Link href="/"><a>Home</a></Link></li>
                            <li><Link href="/menu"><a>Menu</a></Link></li>
                        </ul>
                    </nav>
                    {props.children}

                </>
            </LayoutStyles>
        </GlobalStyles>
    )
}

const GlobalStyles = styled.div`
.container{
    padding:0 1rem;
}

@media screen and (min-width:700px){
    .container{
        width:90%;
        margin:0 auto;
    }
}

@media screen and (min-width:1000px){
    .container{
        width:85%;
    }
}
`;

const LayoutStyles = styled.div``;

const mapStateToProps = state => {
    return {
        isProductModalOpen: state.layout.isProductModalOpen,
        productModalProps: state.layout.productModalData.props,
        flashMessage: state.layout.flashMessage,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeProductModal: () => dispatch(layoutActions.closeProductModal()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
