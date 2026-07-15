import { createContext, useState, useEffect } from 'react';
const API_URL = import.meta.env.VITE_API_URL;

interface UserContextType {
	user: any | null;

	authReady: boolean;
	setUser: (user: any | null) => void;

	authFetch: (url: string, options?: RequestInit) => Promise<Response>;
}

export const UserContext = createContext<UserContextType>({
	user: null,

	authReady: false,
	setUser: () => {},

	authFetch: async () => {
		throw new Error('authFetch not initialized');
	},
});

interface ProviderProps {
	children: React.ReactNode;
}

export function UserProvider({ children }: ProviderProps) {
	const [authReady, setAuthReady] = useState(false);

	const [user, setUser] = useState<any | null>(null);

	async function authFetch(url: string, options: RequestInit = {}) {
		const response = await fetch(url, {
			...options,
			headers: {
				...(options.headers || {}),
			},
            credentials: 'include',
		});
 if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server error: ${response.status}`);
    }
		return response;
	}

	useEffect(() => {
		async function validateToken() {
			try {
				const response = await authFetch(`${API_URL}auth/me`);

				if (!response.ok) {
					setUser(null);
					return;
				}

				const data = await response.json();
				setUser(data.user);
			} catch (error) {
				console.error(error);
				setUser(null);
			} finally {
				setAuthReady(true);
			}
		}

		validateToken();
	}, []);

	return (
		<UserContext.Provider value={{ user, authReady, setUser, authFetch }}>
			{children}
		</UserContext.Provider>
	);
}
