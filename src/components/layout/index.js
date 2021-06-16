import React from 'react'
import ProductModal from '../resuable/productModal';
import { connect } from 'react-redux';
import * as layoutActions from '../../store/layout/actions';
import Navigation from './navigation';
import FlashMessage from '../resuable/flashMessage';
import Footer from './footer';


const Layout = (props) => {
    const { isProductModalOpen, productModalProps, closeProductModal } = props;

    return (
        <div className="layout">
            <Navigation />
            {(props.flashMessage && props.flashMessage.open) && <FlashMessage />}
            {isProductModalOpen ? <ProductModal {...productModalProps} close={closeProductModal} /> : null}
            {props.children}
            <Footer />
        </div>
    )
}



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
