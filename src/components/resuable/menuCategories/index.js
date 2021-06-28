import React from 'react';
import MenuCategory from './menuCategory';

const MenuCategories = (props) => {
    const sortedCategories = props.categories.sort((c1, c2) => c1.id - c2.id);
    return sortedCategories.map(category => {
        return <MenuCategory category={category} orderingMode={props.orderingMode} key={category.id} />
    })
}





export default MenuCategories;