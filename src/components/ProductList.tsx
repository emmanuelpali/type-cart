import { ReactElement } from 'react'
import useCart from '../hooks/useCart'
import useProducts from '../hooks/useProducts'
import Product from './Product'

const ProductList = () => {
    const { dispatch, REDUCER_ACTIONS, cart } = useCart()
    const { products } = useProducts()

    let pageContent: ReactElement | ReactElement[] = <p>...Loading</p>

    if(products?.length) {
        pageContent = products.map(prod => {
            const inCart: boolean = cart.some(item => item.sku === prod.sku)

            return (
                <Product 
                    key={prod.sku}
                    product={prod}
                    dispatch={dispatch}
                    REDUCER_ACTIONS={REDUCER_ACTIONS}
                    inCart={inCart}
                    />
            )
        })
    }

    const content = (
        <main className="main">
            {pageContent}
        </main>
    )

  return content
}

export default ProductList