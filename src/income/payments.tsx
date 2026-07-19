import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/userContext";
import "./payments.css"
import Navbar from "../components/navbar";

const API_URL = import.meta.env.VITE_API_URL;

// @ts-ignore
import html2pdf from 'html2pdf.js/dist/html2pdf.bundle.js';



function Payments() {
    const { authFetch } = useContext(UserContext);
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');


    function downloadPDF() {
            const element = document.getElementById('invoice-list');
            if (!element) return;
    
            html2pdf()
                .from(element)
                .set({
                    margin: 10,
                    filename: `Invoices ${startDate} to ${endDate}.pdf`,
                    html2canvas: { scale: 2, useCORS: true },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
                })
                .save();
        }
    type Invoice = {
        id: string;
        invoiceNumber: string;
        dateCreated: string;
        jobs: {
            job: {
                name: string;
            }
        }[]
        tasks: {
           task: {
               title: string
               id: string;
               pricePerUnit: number
           };
           quantity: number

        }[]
    }
    async function getInvoices() {
        const response = await authFetch(`${API_URL}invoice`);
        const data = await response.json();
        
        setInvoices(data);
    }

    useEffect(() => {
        getInvoices();
    }, [])



const filteredInvoices = invoices.filter((invoice) => {
    const isoDate = invoice.dateCreated.slice(0, 10).split('/').reverse().join('-');
const invoiceDate = new Date(isoDate);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    return (!start || invoiceDate >= start) &&
           (!end || invoiceDate <= end);
});

const total = filteredInvoices.reduce(
    (acc, invoice) =>
        acc +
        invoice.tasks.reduce(
            (acc, task) =>
                acc + task.task.pricePerUnit * task.quantity,
            0
        ),
    0
);


if (invoices.length === 0) return (<>
<Navbar />
<h2>there are no invoices</h2>
</>)
   return (
     <>

      <Navbar /> 

<div className="invoice-filter">
     <div className="date-filter">
     <input type="date" onChange={(e) => setStartDate(e.target.value)} />
     <input type="date" onChange={(e) => setEndDate(e.target.value)} />
    
     </div>
     
     <button onClick={downloadPDF}>Download PDF</button>
     <div id="invoice-list">
         { startDate && endDate ?
         <>
         <p>Dates between {startDate.split('-').reverse().join('-')} and {endDate.split('-').reverse().join('-')}</p>
         
         </>
         : null}

         
 <h2>Total: £{total}</h2>
     <div className="invoice-section">
   {filteredInvoices.map((invoice) => (
    <div key={invoice.id} className="invoice-list">
        <p>{invoice.invoiceNumber}</p>
        <p>{invoice.dateCreated.slice(0, 10).split('-').reverse().join('-')}</p>
        <p>{invoice.jobs[0]?.job.name}</p>
        <p>
            Subtotal: £
            {invoice.tasks.reduce(
                (acc, task) =>
                    acc + task.task.pricePerUnit * task.quantity,
                0
            )}
        </p>
    </div>
))}


    
    </div>
    </div>
    </div>
     </>
   )
}

export default Payments