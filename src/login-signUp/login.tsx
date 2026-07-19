import { useState, useContext } from 'react';
import { UserContext } from '../context/userContext';
import  {useNavigate } from 'react-router';
import './log.css';
const API_URL = import.meta.env.VITE_API_URL;

function Login() {
    const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { setUser} = useContext(UserContext);

	async function submitLogin(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		
		const response = await fetch(`${API_URL}auth/login`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		});

		const data = await response.json();
		if (!response.ok) {
			alert(data.message);
			
			return;
		}

		setUser(data.user);
        
		navigate('/');
	}

	return (
		<div className="login">
			<h1>Login</h1>
			<form onSubmit={submitLogin}>
				<label htmlFor="email">Email:</label>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label htmlFor="password">Password:</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">Login</button>
			</form>
		</div>
	);
}

export default Login;
