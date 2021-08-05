import React from 'react';
import * as asyncActions from '../../../store/asyncActions'
import { connect } from 'react-redux';
import classes from '../../../styles/modules/menuProducts.module.scss';
import { shortenText, schemaDataHiddenInputs } from '../../../constants/helpers';
import Image from '../../../components/resuable/image';

const MenuProduct = ({ product, openProductModal }) => {
    const menuProductClasses = [classes.product];

    const productScope = { itemscope: 'null', itemprop: 'hasMenuItem', itemtype: "https://schema.org/MenuItem" }
    const productSchemaData = [
        { itemprop: 'name', content: product.name },
        { itemprop: 'description', content: product.description },
        { itemprop: 'image', content: product.image ? product.image.url : null }
    ];
    const offerScope = { itemprop: 'offers', itemScope: 'null', itemType: "https://schema.org/Offer" }
    const offerSchemaData = [{ itemprop: 'priceCurrency', content: 'USD' }, { itemprop: 'price', content: product.price.toFixed(2) }]



    if (!product.image) {
        menuProductClasses.push(classes.noImgProduct);
    }

    return (
        <div key={product.id} className={menuProductClasses.join(' ')} {...productScope}
            onClick={() => openProductModal({ props: { productId: product.id } })}>
            {schemaDataHiddenInputs(productSchemaData)}
            <div className={classes.productText}>
                <p className={classes.productTitle}>{shortenText(product.name, 20)}</p>
                <p className={classes.productDescription}>{shortenText(product.description, 100)}</p>
            </div>

            {product.price > 0 && <p className={classes.productPrice} {...offerScope}>
                <span>${product.price}</span>
                {schemaDataHiddenInputs(offerSchemaData)}
            </p>}

            {product.image && <div className={classes.productImgContainer}>
                <div className={classes.productImgOverlay}></div>
                <Image className={classes.productImg} src={product.image.formats.thumbnail.url} alt={product.name} layout="fill" />
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