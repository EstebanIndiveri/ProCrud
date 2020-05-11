import React from 'react'
import {Link} from 'react-router-dom'
const Header = () => {
    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
            <div className="container">
                <h1 className="navbar-brand"><Link to={'/'} className="navbar-brand">REDUX LIST</Link></h1>
            </div>
            <Link 
            to={"/productos/nuevo"}
            className="btn btn-secondary nuevo-post d-block d-md-inline-block"
            >Agregar Producto &#43;</Link>
        </nav>
     );
}
 
export default Header;