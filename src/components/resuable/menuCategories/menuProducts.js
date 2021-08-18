import React from 'react';
import classes from '../../../styles/modules/menuProducts.module.scss';
import MenuProduct from "./menuProduct";

const MenuProducts = (props) => {
    return (
        <div className={classes.products}>
            {props.products.map(product => <MenuProduct key={product.id} product={product} />)}
        </div>
    )
};


export default MenuProducts;