import { ReactElement } from "react"
import { ReduceActionType, ReducerAction } from "../context/CartProvider"
import { ProductType } from "../context/ProductsProvider"

type PropsType = {
    product: ProductType,
    dispatch: React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS: ReduceActionType,
    inCart: boolean,
}
const Product = ({ product, dispatch, REDUCER_ACTIONS, inCart }: PropsType): ReactElement => {

    const img: string = new URL(`../images/${product.name}.jpg`, import.meta.url).href
    console.log(img);
    
    const onAddToCart = () => dispatch({type: REDUCER_ACTIONS.ADD, payload: { ...product, qty: 1}})

    const itemInCart = inCart ? ' -> Item in Cart' : null

    const content = 
    <section className="product">
        <h3>{product.name}</h3>
        <img src={img} alt={product.name} className="product_img" />
        <p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'CAD'}).format(product.price)}
        {itemInCart}</p>
        <button onClick={onAddToCart}>Add to Cart</button>
    </section>
  return content
}

export default Product