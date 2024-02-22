'use client'
import React, { createContext, useState } from 'react';

// Define the initial state as undefined or null
const initialState = {
    data: undefined,
    setState: (newState: any) => { },
};

// Create the context
const AuthorizationContext = createContext(initialState);

// Create a provider component that wraps your app
const AuthorizationProvider = ({ children }: { children: React.ReactNode }) => {
    // Use the useState hook to manage the state
    const [data, setData] = useState<any>(initialState.data);

    // Define the setter function
    const setState = (newState: any) => {
        setData(newState);
    };

    // Provide the state and setter function to the children components
    return (
        <AuthorizationContext.Provider value={{ data, setState }}>
            {children}
        </AuthorizationContext.Provider>
    );
};

// Export the context and provider
export { AuthorizationContext, AuthorizationProvider };
