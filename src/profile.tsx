import { useContext, useState, useEffect } from "react";
import { UserContext } from "./context/userContext";
import Navbar from "./components/navbar";
import { Link } from "react-router";
import CompanySettings from "./companySetting";
const API_URL = import.meta.env.VITE_API_URL;
import './profile.css'


function Profile() {
    const { user, authFetch } = useContext(UserContext);
    const [settings, setSettings] = useState(false);
   const [company, setCompany] = useState<Company[]>([]);


   
    function settingsToggle() {
        setSettings(prev => !prev);
    }

    async function getCompany() {
    const response = await authFetch(`${API_URL}company`);
    const data = await response.json();
    console.log(data);
    setCompany(data);

}
type Company = {
  companyName: string
  email: string
  phoneNumber: string
  sortCode?: string
  accountNumber?: string
  accountName?: string
}


    useEffect(() => {
        getCompany();
    }, [])
console.log(company, 'company')

    return (
        <>
            
            {user ? (
                <div className="profile">
                 <h1> Hi {user.firstName} {user.lastName} </h1>
               {company.length > 0 && (
  <>
    <h2>Company: {company[0].companyName}</h2>
    <h2>Email: {company[0].email}</h2>
    <h2>Phone Number: {company[0].phoneNumber}</h2>
  </>
)}


               {user && (
                <>
                <button onClick={settingsToggle}>Settings</button>
                {settings && (
                    <>
                    <Link to="/tasks">Edit Tasks</Link>
                    <CompanySettings />
                    </>
                )}
                </>
            )}
            </div>
            ) : <p>Loading...</p>


            } 
            <Navbar />

            
        </>
    )
}

export default Profile