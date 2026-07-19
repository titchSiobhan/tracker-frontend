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
   const [uploadLogoToggle, setUploadLogoToggle] = useState(false);


   
   
    function settingsToggle() {
        setSettings(prev => !prev);
    }
function LogoToggle() {
    setUploadLogoToggle(prev => !prev);
}

async function uploadLogo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch(`${API_URL}company/upload/${user.company.id}`, {
        method: 'PUT',
        credentials: 'include',
        body: formData
    })
    const data = await response.json();
    
    setCompany(data.company);
}
    async function getCompany() {
        
            
    const response = await authFetch(`${API_URL}company/${user.company.id}`);
    const data = await response.json();
   
    setCompany(data);

}


type Company = {
  id: string
  companyName: string
  email: string
  phoneNumber: string
  sortCode?: string
  accountNumber?: string
  accountName?: string
  companyImageLarge?: string
}


    useEffect(() => {
        getCompany();
    }, [])


    return (
        <>
            
            {user ? (
                <div className="profile">
                 <h1> Hi {user.firstName} {user.lastName} </h1>
               {company && (
  <>
    <h2>Company: {user?.company?.companyName}</h2>
    <h2>Email: {user?.company?.email}</h2>
    <h2>Phone Number: {user?.company?.phoneNumber}</h2>
  </>
)}


               {user && (
                <>
                <button onClick={settingsToggle}>Settings</button>
                {settings && (
                    <div className="settings">
                    <Link to="/tasks" className="settings-btn">Edit Tasks</Link>
                    <CompanySettings />
                    <button className="upload-logo settings-btn" onClick={LogoToggle}>Upload Logo</button>{uploadLogoToggle && (
                        <form encType="multipart/form-data" onSubmit={uploadLogo}>
                            <input type="file" name="image" accept="image/*"/>
                            <button type="submit" className="settings-btn" >Upload</button>
                        </form>
                    )}
                    
                    
                    </div>
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