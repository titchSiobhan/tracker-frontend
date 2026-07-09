import { useState, useContext } from 'react';
import { UserContext } from './context/userContext';
import  {useNavigate } from 'react-router';

const API_URL = import.meta.env.VITE_API_URL;

function Login() {
    const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { setUser, setToken } = useContext(UserContext);

	async function submitLogin(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		console.log('data sending...');
		const response = await fetch(`${API_URL}auth/login`, {
			method: 'POST',
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
			console.log(data.message);
			return;
		}

		if (!data.token) {
			alert('Login succeeded but no token was returned.');
			return;
		}

        localStorage.setItem('token', data.token);
        setToken(data.token);
		setUser(data.user);
        
		navigate('/profile');
	}

	return (
		<>
			<h1>Login</h1>
			<form onSubmit={submitLogin}>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">Login</button>
			</form>
		</>
	);
}

export default Login;
