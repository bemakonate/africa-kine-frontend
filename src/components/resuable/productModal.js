import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as layoutActions from '../../store/layout/actions';
import Backdrop from './backdrop';
import axios from 'axios';
import Spinner from './spinner';
import classes from '../../styles/modules/productModal.module.scss'
import { IoCloseCircle } from 'react-icons/io5';


const productModal = (props) => {

    if (!props.productId) {
        return <p>productId prop must be passed</p>
    }


    const [loadingProduct, setLoadingProduct] = useState(true);
    const [loadingProductFailed, setLoadingProductFailed] = useState(false);
    const [product, setProduct] = useState(null);


    useEffect(() => {
        const run = async () => {
            setLoadingProduct(true);
            const product = await getProduct(props.productId);

            if (product) {
                setProduct(product);
                setLoadingProductFailed(false);
                setLoadingProduct(false);
            } else {
                setLoadingProductFailed(true);
                setLoadingProduct(false);
            }
        }
        run();
    }, [])




    const getProduct = async (productId) => {
        try {
            const res = await axios.get(`http://localhost:1337/restaurant-settings/products/${productId}`);
            return res.data;
        } catch (err) {
            console.log(err);
            return null;
        }
    }




    let modalContentJSX = null;
    if (!loadingProduct && !loadingProductFailed) {
        const { name, description, price, sideProducts, categories } = product;

        const menuContentJSX = (
            <React.Fragment>
                <IoCloseCircle className={classes.CloseModal} onClick={props.close} />

                <header className={classes.Header}>
                    <div>
                        <h2 className={classes.HeaderTitle}>{name}</h2>
                        <span className={classes.ProductPrice}>${price}</span>
                    </div>
                </header>

                <main className={classes.Main}>
                    <div>
                        <p className={classes.ProductDescription}>{description}</p>
                    </div>

                    <div>
                        <h4 className={classes.SideOrdersTitle}>Side Orders</h4>
                        <ul className={classes.SideOrders}>
                            {sideProducts.map(sideProduct => {
                                const extraCost = sideProduct.additionalCost > 0 && <span>+${sideProduct.additionalCost}</span>
                                return <li className={classes.SideOrderItem} key={sideProduct.id}>{sideProduct.name} {extraCost}</li>
                            })}
                        </ul>
                    </div>

                    <div>
                        <h4 className={classes.CategoriesListTitle}>Categories</h4>
                        <ul className={classes.CategoriesList}>
                            {categories.map((category, index) => {
                                return <li className={classes.CategoryListItem} key={index}>{category.title}</li>
                            })}
                        </ul>
                    </div>


                </main>

            </React.Fragment>);


        modalContentJSX = menuContentJSX;
    } else {
        modalContentJSX = <p>Failed getting product</p>
    }



    return (
        <Backdrop open handleClose={props.close}>
            <div className={classes.ProductModal}>
                {loadingProduct && <Spinner color="black" />}
                {modalContentJSX}
            </div>
        </Backdrop>
    )
}



const mapDispatchToProps = dispatch => {
    return {
        closeProductModal: () => dispatch(layoutActions.closeProductModal()),
    }
}

export default connect(null, mapDispatchToProps)(productModal)
