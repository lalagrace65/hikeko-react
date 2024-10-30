//UserContext is para sa name besides the user icon pag successful login

import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);    // Store the user info here
    const [ready, setReady] = useState(false); // Track if data is fetched

    useEffect(() => {
        // Fetch the user profile from the server when the component mounts
        const fetchUserProfile = async () => {
            try {
                const { data } = await axios.get('http://localhost:4000/profile', { withCredentials: true });
                setUser(data); // Store user data if available
            } catch (err) {
                setUser(null); // Set user to null if not authenticated
            } finally {
                setReady(true); // Indicate that loading is complete
            }
        };

        fetchUserProfile();
    }, []);  // Run this only once on component mount

    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    );
}

