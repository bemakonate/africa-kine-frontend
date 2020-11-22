import React, { useState, useEffect } from 'react';
import MenuProducts from './menuProducts';

const MenuCategory = (props) => {
    const category = props.category;

    const [subCategoryId, setSubCategoryId] = useState(null);
    const [displayContent, setDisplayContent] = useState(true);
    const foundSubCategory = category.subCategories.find(subCategory => subCategoryId === subCategory.id);
    let subCategoryProductsJSX = null;

    useEffect(() => {
        if (!subCategoryId) {
            setSubCategoryId('all')
        }
    }, [subCategoryId])


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
        <>
            <p>---{category.description}----</p>
            <ul>
                <li onClick={() => setSubCategoryId('all')}>All Category Products</li>
                {category.subCategories.map((subCategory) => (
                    <li onClick={() => setSubCategoryId(subCategory.id)}>{subCategory.title}</li>
                ))}
            </ul>
            <div>
                {subCategoryProductsJSX}
            </div>
        </>
    )
    return (
        <article key={category.id}>
            <h2>{category.title}</h2>
            <button onClick={() => setDisplayContent(!displayContent)}>+</button>
            {displayContent && categoryContentJSX}

        </article>
    )

}

export default MenuCategory;