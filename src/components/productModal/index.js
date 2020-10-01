import React from 'react'

const productModal = (props) => {
    if (!props.product) {
        return <p>product must be passed</p>
    }

    const { name, description, price } = props.product;
    return (
        <div className="modal">
            <header>
                <h2>{name}</h2>
                <span>Available Now</span>
                <div>${price}</div>
            </header>

            <p>{description}</p>

            <div>
                <p>Quantity: </p>
                <div>
                    <button>-</button>
                    <input type="number" />
                    <button>+</button>
                </div>
            </div>

            <div className="side-order-container">
                <p>Side Order(1)</p>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                </ul>
            </div>

            <div className="special-request">
                <p>Special Request:</p>
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>


            <div className="modal-order-subtotal">
                <p>Order Subtotal:</p>
                <p>$0.00</p>
            </div>

            <button>Add To Cart</button>
            <style jsx>{`
        .modal{
            border:1px solid black;
            padding:10px;
        }
         `} </style>
        </div>
    )
}

export default productModal
