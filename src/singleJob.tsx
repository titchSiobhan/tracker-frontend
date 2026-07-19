import Navbar from "./components/navbar";
import {useState, useContext, useEffect} from "react";
const API_URL = import.meta.env.VITE_API_URL
import { UserContext } from "./context/userContext";
import { format } from "date-fns";
import { useNavigate } from "react-router";

function SingleJobPage() {
const [job, setJob] = useState({} as any);
const { authFetch } = useContext(UserContext);
const [invoices, setInvoices] = useState([]);
const navigate = useNavigate();



    async function getJob(id: string) {
        const response = await authFetch(`${API_URL}job/${id}`);

        const data = await response.json();
        
        setJob(data);
    }

    async function jobInvoices(id: string) {
        const response = await authFetch(`${API_URL}job/invoice/${id}`);
        const data = await response.json();
        
         setInvoices(data.invoices);
    }

    useEffect(() => {
        getJob(window.location.pathname.split('/')[2]);
        jobInvoices(window.location.pathname.split('/')[2]);
    }, [])

 function goToInvoice(id: string) {
        navigate(`/invoice/${id}`);
    }

    return (
        <>
        <Navbar />
        
<div className="jobs-client">
    <div className="back">
			<button onClick={() => navigate(-1)}>Back</button>
		</div>
        <div className="job">
            <h2>{job.name}</h2>
            <p>{job.street}</p>
            <p>{job.town}</p>
            <p>{job.postcode}</p>
        </div>

        <div className="invoices">
            <h2>Invoices</h2>
         { invoices?.length > 0 ?
            invoices?.map((invoice: any) => (
                <div key={invoice.invoice.id} className="invoice-list">
                    <p onClick={() => goToInvoice(invoice.invoice.id)}>{format(invoice.invoice.invoiceNumber, 'yy/MM/dd/hh/mm').split('/').join('')}</p>
                </div>  
            )) : <p>No Invoices</p>
         }
        </div>
       </div>

        </>
    )
}

export default SingleJobPage