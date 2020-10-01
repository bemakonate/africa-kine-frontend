import React from 'react'
import Modal from '../productModal';
import { connect } from 'react-redux';

const Layout = (props) => {

    const { isProductModalOpen, productModalItem } = props;

    return (
        <>
            {/* <nav>Navbar</nav> */}
            {isProductModalOpen ? <Modal product={productModalItem} /> : null}
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

export default connect(mapStateToProps)(Layout)
