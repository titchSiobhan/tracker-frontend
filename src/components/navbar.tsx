import { Link, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import "./navbar.css"
const API_URL = import.meta.env.VITE_API_URL
function Navbar() {
    const [menuToggle, setMenuToggle] = useState(false);
    const { setUser, } = useContext(UserContext);
const navigate = useNavigate();
   async function handleLogout() {
        const response = await fetch(`${API_URL}auth/logout`, { credentials: 'include' });
        const data = await response.json();
        setUser(null);
        console.log(data);
        navigate('/');
        
    }

    function toggleMenu() {
        setMenuToggle(prev => !prev);
    }
    return (
        <>{}
        <nav className={menuToggle ? 'active' : ''}>
            <ul>
                <li className="Link">
                    <Link to="/">Home</Link>
                </li>
                <li className="Link">
                    <Link to="/profile">Profile</Link>
                </li>
              
                <li className="Link">
                    <Link to="/invoice">Invoice</Link>
                </li>
                <li className="Link">
                    <Link to="/jobs">Clients</Link>
                </li>
                <li className="Link">
                    <Link to="/payments">Income</Link>
                </li>
                <li className="logout Link" onClick={handleLogout}>
                    <p >Logout</p>
                </li>
            </ul>
        </nav>

        <div className="menu" onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <line x1="3" y1="12" x2="21" y2="12"></line>
  <line x1="3" y1="6" x2="21" y2="6"></line>
  <line x1="3" y1="18" x2="21" y2="18"></line>
</svg>

            </div>
        </>
    );
}

export default Navbar;