import React, { useState, useEffect } from 'react';
import MenuProducts from './menuProducts';
import classes from "../../../styles/modules/menuCategory.module.scss";
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from "react-icons/io";

const MenuCategory = (props) => {
    const category = props.category;

    const [subCategoryId, setSubCategoryId] = useState(null);
    const [displayContent, setDisplayContent] = useState(true);
    const foundSubCategory = category.subCategories.find(subCategory => subCategoryId === subCategory.id);
    let subCategoryProductsJSX = null;

    useEffect(() => { !subCategoryId && setSubCategoryId('all') }, [subCategoryId])


    if (foundSubCategory) {
        subCategoryProductsJSX = <MenuProducts products={foundSubCategory.products} orderingMode={props.orderingMode} />
    }
    else if (subCategoryId === 'all') {
        subCategoryProductsJSX = <MenuProducts products={category.products} orderingMode={props.orderingMode} />
    }
    else {
        subCategoryProductsJSX = "This subcategory doesn't exist"
    }


    const categoryContentJSX = (
        <React.Fragment>
            <ul className={classes.subCategoryBtns}>
                <li
                    onClick={() => setSubCategoryId('all')}
                    className={`${classes.subCategoryBtn} ${subCategoryId === 'all' ? `${classes.subCategoryBtnActive}` : null}`}
                >Default</li>
                {category.subCategories.map((subCategory, index) => (
                    (subCategory.title && subCategory.products.length > 0) && <li
                        key={index}
                        className={`${classes.subCategoryBtn} ${subCategoryId === subCategory.id ? `${classes.subCategoryBtnActive}` : null}`}
                        onClick={() => setSubCategoryId(subCategory.id)}>
                        {subCategory.title}
                    </li>
                ))}
            </ul>
            <div className={classes.productContainer}>
                {subCategoryProductsJSX}
            </div>
        </React.Fragment>
    )

    return (
        <div className={classes.category} id={`category-${category.id}`}>
            <header className={classes.categoryHeader}>
                <div>
                    <h2 className={classes.categoryTitle}>{category.title}</h2>
                    <span>{category.tagline}</span>
                </div>
                {displayContent ?
                    <IoIosArrowDropdownCircle className={classes.categoryCollapse} onClick={() => setDisplayContent(!displayContent)} /> :
                    <IoIosArrowDropupCircle className={classes.categoryCollapse} onClick={() => setDisplayContent(!displayContent)} />
                }

            </header>
            {displayContent && categoryContentJSX}
            {!displayContent && <p className={classes.hiddenContentLabel}>Drop down to view more the items</p>}
        </div>
    )

}


export default MenuCategory;