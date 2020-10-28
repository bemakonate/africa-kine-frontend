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
                newSideProducts.push({
                    seq: i,
                    data: null,
                })
            }
            setSideProducts(newSideProducts);
        }

        //if props.qty is leass than sideProducts length
        else {
            //Keep the sideOrdeers state that is within the props.qty length
            const preserveSeqs = range(1, props.qty);
            const newSideProducts = sideProducts.filter(sideOrder => preserveSeqs.includes(sideOrder.seq));
            setSideProducts(newSideProducts);
        }

    }, [props.qty])

    const getSelectedSideProduct = ({ seq, data }) => {
        //updated side orders state here
        const newSideProducts = [...sideProducts].map(sideProduct => {
            if (sideProduct.seq === seq) {
                return {
                    ...sideProduct,
                    data,
                }
            }
            return sideProduct
        })

        setSideProducts(newSideProducts);
    }



    return sideProducts.map(sideProduct => {
        const sideProductSeq = sideProduct.seq;
        return (
            <SideProductOption
                key={sideProductSeq}
                seq={sideProductSeq}
                sideProducts={props.sideProducts}
                selectedSideProduct={sideProduct.data}
                getSelectedSideProduct={(data) => getSelectedSideProduct({ seq: sideProductSeq, data })}
            />
        )
    })
}

export default SideProductOptions;