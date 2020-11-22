import SideProductOption from './sideProductOption';
import { useState, useEffect } from 'react';
import { range } from '../../../../constants/helpers';

const SideProductOptions = (props) => {

    const [sideProducts, setSideProducts] = useState(props.selectedSideProducts || []);

    useEffect(() => {
        if (props.getSelectedSideProducts) {
            props.getSelectedSideProducts(sideProducts);
        }
    }, [sideProducts])

    //Create the side order object for each quantity
    useEffect(() => {
        //if props.qty is greater than sideProducts length
        if (props.qty > sideProducts.length) {
            //Create a new sideProducts state
            const newSideProducts = [...sideProducts];
            for (const i of range(sideProducts.length + 1, props.qty)) {
                //create a new sideOrder
                newSideProducts.push(null);
            }
            setSideProducts(newSideProducts);
        }

        //if props.qty is leass than sideProducts length
        else {
            //Keep the sideOrdeers state that is within the props.qty length
            const newSideProducts = sideProducts.slice(0, props.qty);
            setSideProducts(newSideProducts);
        }

    }, [props.qty])

    const getSelectedSideProduct = ({ seq, data }) => {
        //updated side orders state here
        const newSideProducts = [...sideProducts].map((sideProduct, index) => {
            if (seq === index) {
                return data
            }
            return sideProduct
        })

        setSideProducts(newSideProducts);
    }



    return sideProducts.map((sideProduct, index) => {
        return (
            <SideProductOption
                key={index}
                seq={index + 1}
                sideProducts={props.sideProducts}
                selectedSideProduct={sideProduct}
                getSelectedSideProduct={(data) => getSelectedSideProduct({ seq: index, data })}
            />
        )
    })
}

export default SideProductOptions;