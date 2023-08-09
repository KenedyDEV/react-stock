import { Link, Outlet, useLocation } from "react-router-dom";
import '../styles/stock-layout.css'


export default function StockLayout(){
    const { pathname } = useLocation()
    console.log(pathname)

  return (
    <div>
      <h1 className="titleStock">Stock Items</h1>
      <div className="navigator">
        <Link className={pathname == "/items" || pathname == "/items/" ? "effectNav" : ""} to='/items/'>Todos os itens</Link>
        <Link className={pathname == "/items/createItem" ? "effectNav" : ""} to='/items/createItem'>Novo item</Link>
      </div>
      <section className="contentOutlet">
        <Outlet/>
      </section>
  
    </div>

  )
}