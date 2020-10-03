import SideOrder from './sideOrder';
import { useState, useEffect } from 'react';
import { range } from '../../../../constants/helpers';

const SideOrders = (props) => {
    const sideOrderNums = range(1, props.qty);

    const [sideOrders, setSideOrders] = useState([]);

    useEffect(() => {
        if (props.getSelectedSideOrders) {
            props.getSelectedSideOrders(sideOrders);
        }
    }, [sideOrders])

    //Create the side order object for each quantity
    useEffect(() => {
        //if props.qty is greater than sideOrders length
        if (props.qty > sideOrders.length) {
            //Create a new sideOrders state
            const newSideOrders = [...sideOrders];
            for (const i of range(sideOrders.length + 1, props.qty)) {
                //create a new sideOrder
                newSideOrders.push({
                    seq: i,
                    data: null,
                })
            }
            setSideOrders(newSideOrders);
        }

        //if props.qty is leass than sideOrders length
        else {
            //Keep the sideOrdeers state that is within the props.qty length
            const preserveSeqs = range(1, props.qty);
            const newSideOrders = sideOrders.filter(sideOrder => preserveSeqs.includes(sideOrder.seq));
            setSideOrders(newSideOrders);
        }

    }, [props.qty])

    const getSelectedSideOrder = ({ seq, data }) => {
        //updated side orders state here
        const newSideOrders = [...sideOrders].map(sideOrder => {
            if (sideOrder.seq === seq) {
                return {
                    ...sideOrder,
                    data,
                }
            }
            return sideOrder
        })

        setSideOrders(newSideOrders);
    }


    return sideOrderNums.map(sideOrderSeq => {
        return (
            <SideOrder
                key={sideOrderSeq}
                seq={sideOrderSeq}
                sideOrderItems={props.sideOrderItems}
                getSelectedSideOrder={(data) => getSelectedSideOrder({ seq: sideOrderSeq, data })}
            />
        )
    })
}

export default SideOrders;