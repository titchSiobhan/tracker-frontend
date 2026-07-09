import { createContext, useState, useEffect } from 'react';
const API_URL = import.meta.env.VITE_API_URL;

interface UserContextType {
	user: any | null;
	token: string | null;
	authReady: boolean;
	setUser: (user: any | null) => void;
	setToken: (token: string | null) => void;
	authFetch: (url: string, options?: RequestInit) => Promise<Response>;
}

export const UserContext = createContext<UserContextType>({
	user: null,
	token: null,
	authReady: false,
	setUser: () => {},
	setToken: () => {},
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
	const [token, setToken] = useState<string | null>(
		localStorage.getItem('token'),
	);

	async function authFetch(url: string, options: RequestInit = {}) {
   

    const config: RequestInit = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    const response = await fetch(url, {
        ...options,
        headers: {
            ...config.headers,
            ...(options.headers || {}),
        },
    });

    if (response.status === 401) {
        localStorage.removeItem("token");
        
        setUser(null);
        setToken(null);
        throw new Error("Unauthenticated");
    }

    return response;
}


	useEffect(() => {
    async function validateToken() {
        if (!token) {
            setAuthReady(true);
            return;
        }

        try {
            const response = await authFetch(`${API_URL}auth/me`);
            const data = await response.json();
            setUser(data.user);
        } catch (error) {
            console.error("Error validating token", error);
            localStorage.removeItem("token");
            setUser(null);
            setToken(null);
        } finally {
            setAuthReady(true);
        }
    }

    validateToken();
}, [token]);


	return (
		<UserContext.Provider
			value={{ user, token, authReady, setUser, setToken, authFetch }}
		>
			{children}
		</UserContext.Provider>
	);
}
