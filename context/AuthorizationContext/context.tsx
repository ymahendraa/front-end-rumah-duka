'use client'
import useFetcher from '@/hooks/useFetcher';
import { useSession } from 'next-auth/react';
import React, { createContext } from 'react';
import useSWR from 'swr';

// Define the initial state as undefined or null
const initialState = {
    data: undefined,
};

// Create the context
const AuthorizationContext = createContext(initialState);

// Create a provider component that wraps your app
const AuthorizationProvider = React.memo(({ children }: { children: React.ReactNode }) => {
    // get session data
    const { data: session } = useSession()

    // fetcher function
    const fetcher = useFetcher(session)

    // useSWR hook to fetch data
    const { data } = useSWR(session ? 'http://localhost:3000/api/redis' : null,
        fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    // Provide the state and setter function to the children components
    return (
        <AuthorizationContext.Provider value={data}>
            {children}
        </AuthorizationContext.Provider>
    );
});

// Export the context and provider
export { AuthorizationContext, AuthorizationProvider };
