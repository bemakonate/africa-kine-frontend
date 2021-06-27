import React from 'react';
import * as asyncActions from '../../../store/asyncActions'
import { connect } from 'react-redux';
import classes from '../../../styles/modules/menuProducts.module.scss';
import { shortenText } from '../../../constants/helpers';
import Image from 'next/image';

const MenuProduct = ({ product, openProductModal }) => {
    const menuProductClasses = [classes.product];


    if (!product.image) {
        menuProductClasses.push(classes.noImgProduct);
    }
    return (
        <div
            className={menuProductClasses.join(' ')}
            key={product.id}
            onClick={() => openProductModal({ props: { productId: product.id } })}>
            <div className={classes.productText}>
                <p className={classes.productTitle}>{shortenText(product.name, 20)}</p>
                <p className={classes.productDescription}>{shortenText(product.description, 100)}</p>

            </div>

            {product.price > 0 && <p className={classes.productPrice}> ${product.price}</p>}

            {product.image && <div className={classes.productImgContainer}>
                <div className={classes.productImgOverlay}></div>
                <Image className={classes.productImg} src={product.image.formats.thumbnail.url} alt="" layout="fill" />
            </div>}

        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        openProductModal: (data) => dispatch(asyncActions.openProductModal(data)),
    }
}

export default connect(null, mapDispatchToProps)(MenuProduct)