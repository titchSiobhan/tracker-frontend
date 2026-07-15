import { Link, useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "./context/userContext";
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
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
              
                <li>
                    <Link to="/invoice">Invoice</Link>
                </li>
                <li>
                    <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                    <p onClick={handleLogout}>Logout</p>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;