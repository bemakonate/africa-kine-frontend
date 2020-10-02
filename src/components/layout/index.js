import React from 'react'
import Modal from '../resuable/productModal';
import { connect } from 'react-redux';
import * as layoutActions from '../../store/layout/actions';

const Layout = (props) => {

    const { isProductModalOpen, productModalItem, closeProductModal } = props;

    return (
        <>
            {/* <nav>Navbar</nav> */}
            {isProductModalOpen ? <Modal product={productModalItem} close={closeProductModal} /> : null}
            {props.children}
            {/* <footer>Footer</footer> */}
        </>
    )
}

const mapStateToProps = state => {
    return {
        isProductModalOpen: state.layout.isProductModalOpen,
        productModalItem: state.layout.productModalItem,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeProductModal: () => dispatch(layoutActions.closeProductModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
