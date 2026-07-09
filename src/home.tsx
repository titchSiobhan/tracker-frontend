import {useContext } from "react";
import { UserContext } from "./context/userContext"
import Navbar from "./navbar";

import SignUp from "./signUp";  
import Login from "./login";

function Home() {
   
    const { user, token, authReady } = useContext(UserContext);
if (!authReady) return <p>Loading...</p>;
    if (!token) return( <><Login />
    <SignUp />
    </>);

    return (
        <div>
            {!user && (
                <>
                <SignUp />
            <Login />
                </>
            )}
            {user && (
                <>
                <Navbar />
                </>
            )}
            
        </div>
    );
}



export default Home;