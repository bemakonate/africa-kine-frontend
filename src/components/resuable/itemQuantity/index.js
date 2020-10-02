import { useState, useEffect } from 'react';

const ItemQuantity = (props) => {
    const [itemQuantity, setItemQuantity] = useState(props.defaultNum || 0);

    //Make sure to reset the value when the props change
    useEffect(() => {
        const newQty = validateQty(props.defaultNum);
        setItemQuantity(newQty);
    }, [])


    //Pass the quantity value to parent component
    useEffect(() => {
        const run = async () => {
            const newQty = validateQty(itemQuantity);
            await setItemQuantity(newQty);

            if (props.getQuantity) {
                props.getQuantity(itemQuantity);
            }
        }

        run();

    }, [itemQuantity]);


    //Determine the amount of items the person is allowed to purchase
    const validateQty = (num) => {
        if (num <= 1 || !num) {
            return 1;
        }

        if (props.max && (num >= props.max)) {
            return props.max;
        }

        return num;
    }


    const subtractQuantity = () => setItemQuantity(itemQuantity - 1);
    const addQuantity = () => setItemQuantity(itemQuantity + 1);


    return (
        <div >
            <button onClick={subtractQuantity}>-</button>
            <input type="text" name="quantity" value={itemQuantity} min="1" pattern="[0-9]*" disabled />
            <button onClick={addQuantity}>+</button>
        </div>
    )

    // return (
    //     <div className={`${classes.ItemQuantity} ${props.styleClass ? props.styleClass : ''}  ${props.expand ? classes.Expand : ''}`}>
    //         <button className={classes.ChangeBtn} onClick={subtractQuantity}>-</button>
    //         <input type="text" name="quantity" value={itemQuantity} min="1" className={classes.ItemNum} pattern="[0-9]*" disabled />
    //         <button className={classes.ChangeBtn} onClick={addQuantity}>+</button>
    //     </div>
    // )
}

export default ItemQuantity
