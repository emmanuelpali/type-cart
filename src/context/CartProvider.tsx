import { createContext, useMemo, useReducer, ReactElement } from "react"

export type CartItemType = {
    sku: string,
    name: string,
    price: number,
    qty: number,
}

type CartStateType = { cart: CartItemType[]}

const initCartState: CartStateType = { cart: []}

const REDUCER_ACTION_TYPE = {
    ADD: "ADD",
    REMOVE: "REMOVE",
    QUANTITY: "QUANTITY",
    SUBMIT: "SUBMIT",
}

export type ReduceActionType = typeof REDUCER_ACTION_TYPE

export type ReducerAction = {
    type: string,
    payload?: CartItemType,
}

const reducer = (state: CartStateType, action: ReducerAction): CartStateType => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.ADD: {
            if(!action.payload) {
                throw new Error('action.payload missing in ADD action')
            }
            const { sku, name, price } = action.payload
            const filteredCart: CartItemType[] = state.cart.filter(item => item.sku !== sku )
            const itemExists: CartItemType | undefined = state.cart.find(item => item.sku === sku )
            const qty: number = itemExists ? itemExists.qty + 1 : 1
            return { ...state, cart: [...filteredCart, { sku, name, price, qty}]}
        }
        case REDUCER_ACTION_TYPE.REMOVE: {
            if(!action.payload) {
                throw new Error('action.payload missing in REMOVE action')
            }
            const { sku } = action.payload
            const filteredCart: CartItemType[] = state.cart.filter(item => item.sku !== sku )
            return { ...state, cart: [ ...filteredCart ]}
        }
        case REDUCER_ACTION_TYPE.QUANTITY: {
            if(!action.payload) {
                throw new Error('action.payload missing in QUANTITY action')
            }
            const { sku, qty } = action.payload

            const itemExists: CartItemType | undefined = state.cart.find(item => item.sku === sku )
            if(!itemExists){
                throw new Error('Item must exist in order to update quantity')
            }
            const updatedItem: CartItemType = { ...itemExists, qty }

            const filteredCart: CartItemType[] = state.cart.filter(item => item.sku !== sku )

            return { ...state, cart: [...filteredCart, updatedItem]}
        }
        case REDUCER_ACTION_TYPE.SUBMIT: {
            return { ...state, cart: []}
        }    
        default:
            throw new Error('Unidentified cart reducer action type')
    }
}

const useCartContext = (initCartState: CartStateType) => {
    const [ state, dispatch ] = useReducer(reducer, initCartState) 

    const REDUCER_ACTIONS = useMemo(() => {
        return REDUCER_ACTION_TYPE
    }, [])

    const totalItems: number = state.cart.reduce((previousValue, cartItem) => {
        return previousValue + cartItem.qty
    }, 0)

    const totalPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'CAD'}).format(
        state.cart.reduce((previousVal, cartItem) => {
            return previousVal + (cartItem.qty * cartItem.price)
        }, 0)
    )

    const cart = state.cart.sort((a,b) => {
        const itemA = Number(a.sku.slice(-4))
        const itemB = Number(b.sku.slice(-4))
        return itemA - itemB
    })

    return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart }
}

export type useCartContextType = ReturnType<typeof useCartContext>

const initialCartContextState: useCartContextType = {
    dispatch: () => { },
    REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
    totalItems: 0,
    totalPrice: '',
    cart: []
}

export const CartContext = createContext<useCartContextType>(initialCartContextState)

type ChildrenType = { children?: ReactElement | ReactElement[] }

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
    return (
        <CartContext.Provider value={ useCartContext(initCartState) }>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider