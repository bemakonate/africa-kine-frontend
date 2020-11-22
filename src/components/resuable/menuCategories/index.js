import React from 'react';
import MenuCategory from './menuCategory';


const MenuCategories = (props) => {
    return props.categories.map(category => {
        return <MenuCategory category={category} orderingMode={props.orderingMode} />
    })
}


export default MenuCategories;