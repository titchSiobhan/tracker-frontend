import { Link, useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import "./navbar.css"
const API_URL = import.meta.env.VITE_API_URL
function Navbar() {
    const { setUser, } = useContext(UserContext);
const navigate = useNavigate();
   async function handleLogout() {
        const response = await fetch(`${API_URL}auth/logout`, { credentials: 'include' });
        const data = await response.json();
        setUser(null);
        console.log(data);
        navigate('/');
        
    }
    return (
        <>
        <nav>
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
                <li className="logout Link" onClick={handleLogout}>
                    <p >Logout</p>
                </li>
            </ul>
        </nav>
        </>
    );
}

export default Navbar;