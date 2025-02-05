import './Navbar.css'
import {Link, Outlet} from "react-router-dom"
const Navbar = () => {
  return (
    <div>
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/viewproducts">View Products</Link></li>
                <li><Link to="/addproducts">Add Products</Link></li>
            </ul>
        </nav>
      <Outlet/>
    </div>
  )
}

export default Navbar
