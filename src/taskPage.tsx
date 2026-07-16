import Navbar from "./components/navbar";
import { useState, useContext, useEffect  } from "react";
const API_URL = import.meta.env.VITE_API_URL
import { useNavigate } from "react-router";
import { UserContext } from "./context/userContext";

function TaskPage() {
const [createTaskToggle, setCreateTaskToggle] = useState(false);
const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const [category, setCategory] = useState('');
const [pricePerUnit, setPricePerUnit] = useState('');
const { authFetch } = useContext(UserContext);
const [tasks, setTasks] = useState<Task[]>([]);
const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
const navigate = useNavigate();

function toggleCreateTask() {
    setCreateTaskToggle(prev => !prev);
}
type Task = {
    
    title: string;
    description: string;
    category: string;
    pricePerUnit: number;
}


// function toggleEditTask() {
//     setEditTaskToggle(prev => !prev);
// }
    async function createTask(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const task: Task = {
            title,
            description,
            category,
            pricePerUnit: Number(pricePerUnit),
        }
       

    const response = await authFetch(`${API_URL}task/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        const data = await response.json();
        console.log(data)
        setTasks([...tasks, data]);
      toggleCreateTask();
       getTasks();

    }


    async function  getTasks() {
        const response = await authFetch(`${API_URL}task`);
        const data = await response.json();
       
        setTasks(data);
       
    }

  
    async function submitEditTask(id: string, e: React.FormEvent<HTMLFormElement>) {
     e.preventDefault();
        const task: Task = {
            title,
            description,
            category,
            pricePerUnit: Number(pricePerUnit),
        }
        const response = await authFetch(`${API_URL}task/edit/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        const data = await response.json();
       console.log(data)
      
           getTasks();
    setEditingTaskId(null);
    }

    async function deleteTask(id: string) {
        const ok = window.confirm('Are you sure you want to delete this task?');
        if (!ok) return;
        if (ok) {
        const response = await authFetch(`${API_URL}task/delete/${id}`, {
            method: 'DELETE',
        })
        const data = await response.json();
        console.log(data)
        getTasks();
        return
    }
    }

    useEffect(() => {
        getTasks();
    }, [])
    
    return (
        <>
            <Navbar />
            <div className="back">
			<button onClick={() => navigate(-1)}>Back</button>
		</div>
            <div className="task-create">
            <button onClick={toggleCreateTask}>Create Task</button>

            {createTaskToggle && (
                <div>
                    <form onSubmit={createTask}>
                    <input type="text" placeholder="Task Name" name="title" onChange={(e) => {
                        setTitle(e.target.value);
                    }}/>
                    <input type="text" placeholder="Task Description" name="description" onChange={(e) =>  {
                        setDescription(e.target.value);
                    }}/>
                    <input type="text" placeholder="Category" name="category" onChange={(e) => {
                        setCategory(e.target.value)
                    }} />
                    <input type="number"
    step="0.01"  placeholder="Price" name="pricePerUnit" onChange={(e) => {setPricePerUnit(e.target.value)}} />
                    <button type="submit">Create Task</button>
                    </form>
                </div>
            )}

            <div>
                {tasks.map((task: any) => (
                    <div key={task.id}>
                        <h1>{task.title}</h1>
                        <p>{task.description}</p>
                        <p>{task.category}</p>
                        <p>£{task.pricePerUnit}</p>
                        <button onClick={() => {
        setEditingTaskId(task.id);
        setTitle(task.title);
        setDescription(task.description);
        setCategory(task.category);
        setPricePerUnit(String(task.pricePerUnit));
    }}>Edit Task</button>
        <button onClick={() => deleteTask(task.id)}>Delete Task</button>
                        { editingTaskId === task.id &&
                            <form onSubmit={(e) => submitEditTask(task.id, e)}>
                <input type="text" value={title} name="title" onChange={(e) => {
                    setTitle(e.target.value);
                }}/>
                <input type="text" value={description} name="description" onChange={(e) =>  {
                    setDescription(e.target.value);
                }}/>
                <input type="text" value={category} name="category" onChange={(e) => {
                    setCategory(e.target.value)
                }} />
                <input type="number"
    step="0.01"  value={pricePerUnit}  onChange={(e) => {setPricePerUnit(e.target.value)}} />
                <button type="submit">Edit Task</button>
               
                </form>
                        }
                    </div>
                ))}
            </div>
            
            </div>
        </>
    )
}

export default TaskPage
