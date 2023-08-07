import { useState } from "react"
import useCart from "../hooks/useCart"
import CartItem from "./CartItem"

const Cart = () => {
    const [confirm, setConfirm] = useState<boolean>(false) 
    const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart} = useCart()

    const onSubmitOrder = () => {
        dispatch({ type: REDUCER_ACTIONS.SUBMIT})
        setConfirm(true)
    }

    const pageContent = confirm 
    ? <h2>Thank you for your order.</h2> 
    :   <>
            <ul className="cart">
                {cart.map(item => {
                    return (
                        <CartItem
                            key={item.sku}
                            item={item}
                            dispatch={dispatch}
                            REDUCER_ACTIONS={REDUCER_ACTIONS}
                        />
                    )
                })}
            </ul>
            <div className="cart_total">
                <p>Total Items: {totalItems}</p>
                <p>Total Price: {totalPrice}</p>
                <button className="cart_submit" disabled={!totalItems} onClick={onSubmitOrder}>
                    Place Order
                </button>
            </div>
        </>

        const content = 
        <main className="main">
            {pageContent}
        </main>
  return content
}

export default Cart