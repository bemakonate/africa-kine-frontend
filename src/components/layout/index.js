import React, { useState, useEffect } from 'react'
import ProductModal from '../resuable/productModal';
import { connect } from 'react-redux';
import * as layoutActions from '../../store/layout/actions';
import * as asyncActions from '../../store/asyncActions';
import * as orderActions from '../../store/order/actions';
import Link from 'next/link';
import PickUpModal from './selectPickUpTime';
import { useRouter } from 'next/router';
import FlashMessage from '../resuable/flashMessage';


const Layout = (props) => {
    const router = useRouter();

    const { isProductModalOpen, productModalProps, closeProductModal, isGatewayValid } = props;

    const pageRoute = router.route;
    const orderingRoutes = ['/ordering', '/ordering/menu', '/ordering/cart']
    const showPickUpModal = props.pickUpModal.open && orderingRoutes.includes(pageRoute);


    return (
        <>
            {(props.flashMessage && props.flashMessage.open) && <FlashMessage />}
            <nav>
                <ul>
                    <li><Link href="/"><a>Home</a></Link></li>
                    <li><Link href="/menu"><a>Menu</a></Link></li>
                    <li><Link href="/ordering"><a>Ordering</a></Link></li>
                </ul>
            </nav>

            {isProductModalOpen ? <ProductModal {...productModalProps} close={closeProductModal} /> : null}
            {showPickUpModal ? <PickUpModal /> : null}


            {props.children}

        </>
    )
}

const mapStateToProps = state => {
    return {
        isProductModalOpen: state.layout.isProductModalOpen,
        productModalProps: state.layout.productModalData.props,
        isGatewayValid: state.order.isGatewayValid,
        isUserRescheduling: state.order.isUserRescheduling,
        flashMessage: state.layout.flashMessage,
        pickUpModal: state.layout.pickUpModal
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeProductModal: () => dispatch(layoutActions.closeProductModal()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
