import { Link, useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "./context/userContext";
function Navbar() {
    const { setUser, } = useContext(UserContext);
const navigate = useNavigate();
    function handleLogout() {
        localStorage.removeItem('token');
        navigate('/'); 
       
        setUser(null);
        
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