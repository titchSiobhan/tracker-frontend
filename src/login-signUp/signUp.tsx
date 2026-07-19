import { useState } from "react";
const  API_URL = import.meta.env.VITE_API_URL
import './log.css'

function SignUp() {
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');

   async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
try {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        alert("All fields are required");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    const response = await fetch(`${API_URL}auth/sign-up`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            password, confirmPassword
        })
        

    });

    const data = await response.json();

    if (!response.ok) {
        alert(data.error || "Signup failed");
        return;
    }

    alert("Signup successful!");
   
} catch (error) {
    console.error('error', error);
    alert("An error occurred during signup.");
}
   
}

    return (
        <div className="signup-container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUp}>
               
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" required onChange={(e) => setFirstName(e.target.value)} />
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" required onChange={(e) => setLastName(e.target.value)} />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required onChange={(e) => setConfirmPassword(e.target.value)} />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp