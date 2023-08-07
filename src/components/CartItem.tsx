import React, { ChangeEvent, ReactElement, memo } from 'react'
import { CartItemType, ReduceActionType, ReducerAction } from '../context/CartProvider'

type PropsType = {
    item: CartItemType,
    dispatch: React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS: ReduceActionType,

}

const CartItem = ({ item, dispatch, REDUCER_ACTIONS}: PropsType) => {

    const img: string = new URL(`../images/${item.name}.jpg`, import.meta.url).href

    const lineTotal: number = (item.qty * item.price)

    const highestQuantity: number = 20 > item.qty ? 20 : item.qty

    const optionsValues: number[] = [ ...Array(highestQuantity).keys()]
    .map(i => i + 1)

    const options: ReactElement[] = optionsValues.map(val => <option key={`opt${val}`} value={val}>{val}</option>)

    const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({
            type: REDUCER_ACTIONS.QUANTITY,
            payload: { ...item, qty: Number(e.target.value)}
        })
    }

    const onRemoveFromCart = () => dispatch({
        type: REDUCER_ACTIONS.REMOVE,
        payload: item,
    })

    const content = 
    <li className="cart_item">
        <img src={img} alt={item.name} className="cart_img" />
        <div className="" aria-label='Item Name'>{item.name}</div>
        <div className="" aria-label='Price per item'>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'CAD'}).format(item.price)}</div>
        <label htmlFor="itemQty" className='offscreen'>
            Item Quantity
        </label>
        <select 
            name="itemQty" 
            id="itemQty" 
            className="cart_select"
            value={item.qty}
            aria-label='Item Quantity'
            onChange={onChangeQty}
            >
            {options}
        </select>
        <div className="cart_item-subtotal" aria-label='Line Item Subtotal'>
        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'CAD'}).format(lineTotal)}
        </div>
        <button
        className='cart_button'
        aria-label="Remove Item From Cart"
        onClick={onRemoveFromCart}>X</button>
    </li>

  return content
}

function areEqual({ item: prevItem }:PropsType, { item: nextItem }: PropsType) {
    return Object.keys(prevItem).every(key => {
        return prevItem[key as keyof CartItemType] === nextItem[key as keyof CartItemType]
    })
}

const MemoizedCartLineItem = memo<typeof CartItem>(CartItem, areEqual)
export default MemoizedCartLineItem