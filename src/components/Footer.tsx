const Footer = () => {
    const year: number = new Date().getFullYear()

const pageContent = (
    <p className="">Emmanuel &copy; {year}</p>
)
  return (
    <footer className="footer">
        {pageContent}
    </footer>
  )
}

export default Footer