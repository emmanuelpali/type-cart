import { ReactElement, createContext, useState } from "react"

export type ProductType = {
    sku: string,
    name: string,
    price: number,
}

// products should be fetched from a data source
const initState: ProductType[] = [
    {
        "sku": "item0001",
        "name": "730",
        "price": 530
    },
    {
        "sku": "item0002",
        "name": "760",
        "price": 630
    },
    {
        "sku": "item0003",
        "name": "790",
        "price": 930
    }
]

export type UseProductsContextType  = { products: ProductType[]}

const InitContextState: UseProductsContextType = { products: [] }

export const ProductsContext = createContext<UseProductsContextType>(InitContextState)

type ChildrenType = { children?: ReactElement | ReactElement[] }

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
    const [products, _setProducts] = useState<ProductType[]>(initState)
    return (
        <ProductsContext.Provider value={{ products }}>
            {children}
        </ProductsContext.Provider>
    )
}