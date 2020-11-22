import React from 'react'
import ProductModal from '../resuable/productModal';
import { connect } from 'react-redux';
import * as layoutActions from '../../store/layout/actions';
import Link from 'next/link';

const Layout = (props) => {

    const { isProductModalOpen, productModalProps, closeProductModal } = props;

    return (
        <>
            <nav>
                <ul>
                    <li><Link href="/"><a>Home</a></Link></li>
                    <li><Link href="/menu"><a>Menu</a></Link></li>
                    <li><Link href="/ordering"><a>Order Online</a></Link></li>
                </ul>
            </nav>
            {isProductModalOpen ? <ProductModal {...productModalProps} close={closeProductModal} /> : null}
            {props.children}
            {/* <footer>Footer</footer> */}
        </>
    )
}

const mapStateToProps = state => {
    return {
        isProductModalOpen: state.layout.isProductModalOpen,
        productModalProps: state.layout.productModalData.props,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeProductModal: () => dispatch(layoutActions.closeProductModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
