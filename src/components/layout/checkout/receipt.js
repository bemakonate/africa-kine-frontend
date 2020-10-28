

const Receipt = ({ styleClass, serverSummary }) => {
    return (
        <article className={`summary ${styleClass ? styleClass : ''}`}>
            <div className="checkout__text-container">
                <div className="checkout-subtotal-container">
                    <div className="receipt-row">
                        <p className="receipt-row-label">Subtotal:</p>
                        <p className="receipt-row-detail">{serverSummary.subtotal}</p>
                    </div>

                    <div className="receipt-row">
                        <p className="receipt-row-label">Estimated Tax:</p>
                        <p className="receipt-row-detail">{serverSummary.taxes}</p>
                    </div>
                    <div className="line"></div>

                    <div className="receipt-total">
                        <p className="receipt-total-label">Total:</p>
                        <p className="receipt-total-price">
                            {serverSummary.total}
                        </p>
                    </div>
                </div>
            </div>
            <style jsx>{`
            .receipt-row,
            .receipt-total{
                display:flex;
            }
    
            `}</style>
        </article>

    )
}

export default Receipt
