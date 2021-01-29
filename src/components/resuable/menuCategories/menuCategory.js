import React, { useState, useEffect } from 'react';
import MenuProducts from './menuProducts';
import styled from 'styled-components';

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
        <>
            <ul className="subCategoryBtns">
                <li
                    onClick={() => setSubCategoryId('all')}
                    className={`subCategoryBtn ${subCategoryId === 'all' ? 'subCategoryBtn--active' : null}`}
                >Default</li>
                {category.subCategories.map((subCategory) => (
                    <li
                        className={`subCategoryBtn ${subCategoryId === subCategory.id ? 'subCategoryBtn--active' : null}`}
                        onClick={() => setSubCategoryId(subCategory.id)}>
                        {subCategory.title}
                    </li>
                ))}
            </ul>
            <div className="products-container">
                {subCategoryProductsJSX}
            </div>
        </>
    )
    return (
        <MenuCategoryStyles>
            <div className="category">
                <header className="category-header">
                    <div>
                        <h2>{category.title}</h2>
                        <span>{category.tagline}</span>
                    </div>
                    <button className="category-collapse" onClick={() => setDisplayContent(!displayContent)}>+</button>
                </header>


                {displayContent && categoryContentJSX}

            </div>
        </MenuCategoryStyles>
    )

}

const MenuCategoryStyles = styled.article`
    .category{
        margin-bottom:50px;
    }
    
    .category-header{
        /* display: grid;
        grid-template-columns: 1fr auto;
        align-items: end; */
        display:flex;
        align-items:flex-end;
    }

    .category-collapse{
        margin-left:30px;
    }
    .subCategoryBtns{
        list-style: none;
        padding-left: 0;
        display:flex;
        flex-wrap:wrap;
    }

    .subCategoryBtn{
        padding: 5px 20px;
        margin-right:5px;
        margin-bottom: 8px;
        background:gray;
        border-radius: 20px;
        font-size: 14px;
        color:white;
      
    }

    .subCategoryBtn--active{
        background: blue;
        color:white;
    }

    .products-container{
        width:95%;
        margin:0 auto;
    }
`;


export default MenuCategory;