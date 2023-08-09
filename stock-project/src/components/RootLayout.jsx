import { Link, Outlet } from "react-router-dom";
import '../styles/root-layout.css'

export default function RootLayout() {
  return (
  <>
    <header>
      <nav>
        <Link style={{color: "white"}} to='/'>REACT STOCK</Link>
        <div className="linksNav">
          <Link to="/">Início</Link>
          <Link to='/items'>Items</Link>
        </div>
      </nav>
    </header>

    <main>
      <Outlet />
    </main>

<hr />
    <footer>
      <p>Feito com React e React Router!</p>
    </footer>
  </>
  )
}
