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
    console.log(data);
    setCompany(data.company);
}
    async function getCompany() {
    const response = await authFetch(`${API_URL}company/${user.company.id}`);
    const data = await response.json();
    console.log(data);
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
                    <button className="upload-logo" onClick={LogoToggle}>Upload Logo</button>{uploadLogoToggle && (
                        <form encType="multipart/form-data" onSubmit={uploadLogo}>
                            <input type="file" name="image" accept="image/*"/>
                            <button type="submit">Upload</button>
                        </form>
                    )}
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