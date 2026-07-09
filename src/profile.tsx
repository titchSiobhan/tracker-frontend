import { useContext, useState } from "react";
import { UserContext } from "./context/userContext";
import Navbar from "./navbar";
import { Link } from "react-router";


function Profile() {
    const { user } = useContext(UserContext);
    const [settings, setSettings] = useState(false);
    function settingsToggle() {
        setSettings(prev => !prev);
    }

    return (
        <>
            
            {user && (
                <>
                 <h1> Hi {user.firstName} {user.lastName} </h1>
                {user.company && (
                    <>
                    <p>Company: {user.company}</p>
                
                {user.role && (
                    <>
                    <p>Role: {user.role}</p>
                    </>
                )}
              
                </>
                )}
            </>)
            } 
            <Navbar />

            {user && (
                <>
                <button onClick={settingsToggle}>Settings</button>
                {settings && (
                    <>
                    <Link to="/tasks">Edit Tasks</Link>
                    </>
                )}
                </>
            )}
        </>
    )
}

export default Profile