import React, { useState } from 'react'
import ProductModal from '../resuable/productModal';
import { connect } from 'react-redux';
import * as layoutActions from '../../store/layout/actions';
import * as asyncActions from '../../store/asyncActions';
import * as orderActions from '../../store/order/actions';
import Link from 'next/link';
import PickUpModal from './selectPickUpTime';
import { useRouter } from 'next/router';
import CartComponent from './cart/index';
import CartFooter from './cart/cart-footer';


const Layout = (props) => {
    const router = useRouter();

    const { isProductModalOpen, productModalProps, closeProductModal, isGatewayValid } = props;

    const pageRoute = router.route;
    const orderingRoutes = ['/ordering', '/ordering/menu']
    const showPickUpModal = (!isGatewayValid || props.isUserRescheduling) && orderingRoutes.includes(pageRoute);
    return (
        <>
            <nav>
                <ul>
                    <li><Link href="/"><a>Home</a></Link></li>
                    <li><Link href="/menu"><a>Menu</a></Link></li>
                    <li><Link href="/ordering"><a>Ordering</a></Link></li>
                </ul>
            </nav>

            {isProductModalOpen ? <ProductModal {...productModalProps} close={closeProductModal} /> : null}
            {showPickUpModal ? <PickUpModal /> : null}
            {props.isCartComponentOpen && <CartComponent closeCartModal={() => props.updateIsCartComponentOpen(false)} />}
            {(!props.isCartComponentOpen && pageRoute === '/ordering/menu') && <CartFooter setShowCart={props.updateIsCartComponentOpen} />}

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
        isCartComponentOpen: state.layout.isCartComponentOpen,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeProductModal: () => dispatch(layoutActions.closeProductModal()),
        updateIsCartComponentOpen: (data) => dispatch(layoutActions.updateIsCartComponentOpen(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
