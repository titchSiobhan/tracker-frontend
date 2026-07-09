import { useState, useContext, useEffect  } from "react";
const API_URL = import.meta.env.VITE_API_URL
import { UserContext } from "./context/userContext";


function CreateInvoicePage() {
const { authFetch } = useContext(UserContext);
type Task = {
    id: string;
    title: string;
    description: string;
    category: string;
    pricePerUnit: number;
}
const [tasks, setTasks] = useState<Task[]>([]);
const [basket, setBasket] = useState<Task[]>([]);
const [selectedCategory, setSelectedCategory] = useState('');

// type Invoice = {
//     id: string;
//    invoiceNumber: string;
//     date: Date;
//     tasks: Task[];
// }
     async function  getTasks() {
        const response = await authFetch(`${API_URL}task`);
        const data = await response.json();
       
        setTasks(data);
    }

    useEffect(() => {
        getTasks();
    }, []);
    console.log(basket)
    const total = basket.reduce((sum, task) => sum + Number(task.pricePerUnit), 0).toFixed(2);


const filteredTasks = tasks.filter((task: Task) => {
    if (selectedCategory === '') return true; // show all
    return task.category === selectedCategory;
});

async function submitInvoice() {
    if (basket.length === 0) {
        alert('Please add at least one task to the basket.');
        return;
    }
     const taskIds = basket.map((task: Task) => task.id);
    const response = await authFetch(`${API_URL}invoice/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ taskIds })
    })
    const data = await response.json();
    console.log(data);
    
}


const categories = [...new Set(tasks.map((task => task.category)))];
    return(
        <>
        <div className="filter">
            <select value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="" >All</option>
                {categories.map(cat => (
        <option key={cat} value={cat}>{cat}</option>
    ))}
            </select>

        </div>
        <div className="invoice">
       
        <p>Total: {total}</p>

        <button onClick={submitInvoice}>Submit</button>
        </div>
  
        {filteredTasks.map((task: any) => (
            <div key={task.id}>
                <p>{task.title}</p>
              
                <p>{task.category}</p>
                <p>{task.pricePerUnit} </p>
                <button onClick={() => setBasket([...basket, task])}>Add to basket</button>
                {basket.some(b => b.id === task.id) && (<>
                    <button onClick={() => setBasket(basket.filter(b => b.id !== task.id))}>Remove from basket</button>

                    <button onClick={() => {const index = basket.findIndex(b => b.id === task.id);
                        if (index !== -1) {
                            const newBasket = [...basket];
                            newBasket.splice(index, 1);
                            setBasket(newBasket);
                        }
                    }}>-</button>

                <p>Quantity: {basket.filter(b => b.id === task.id).length}

                    <button onClick={() => {setBasket([...basket, task])}}>+</button>
                </p>
                </>
                )}
            </div>
        ))}

        </>
    )

}

export default CreateInvoicePage