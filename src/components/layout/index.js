import React from 'react'

const Layout = (props) => {
    const Modal = () => {
        return (
            <div className="modal">
                <header>
                    <h2>Product Name</h2>
                    <span>Available Now</span>
                    <div>$0.00</div>
                </header>

                <p>Quantity: </p>
                <div>
                    <button>-</button>
                    <input type="number" />
                    <button>+</button>
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


    return (
        <>
            {/* <nav>Navbar</nav> */}
            <Modal />
            {props.children}
            {/* <footer>Footer</footer> */}
        </>
    )
}

export default Layout
