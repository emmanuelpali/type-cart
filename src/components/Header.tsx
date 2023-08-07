
type PropsType = {
    viewCart: boolean,
    setViewCart: React.Dispatch<React.SetStateAction<boolean>>,
}

const Header = ({ viewCart, setViewCart } : PropsType) => {
    const button = viewCart ? <button onClick={() => setViewCart(false)}>Shop</button>
    : <button onClick={() => setViewCart(true)}>Cart</button>
    const content = (
        <header className="header">
            <div className="header_title-bar">
                <h1>The Store</h1>
            </div>
            <div className="">
                {button}
            </div>
        </header>
    )

  return content
}

export default Header