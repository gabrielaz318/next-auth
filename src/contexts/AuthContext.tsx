import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from "next/router";

import { api } from "../services/api";

interface IProvide {
    children: ReactNode;
}

interface IAuthContext {
    isAuthenticated: boolean;
    user: IUser | null;
    signIn: (data: ISignInData) => Promise<unknown | void>;
    signOut: () => Promise<void>;
}

interface ISignInData {
    email: string;
    password: string;
}

interface IUser {
    name: string;
    email: string;
}

const AuthContext = createContext({} as IAuthContext);

export function AuthProvider({ children }: IProvide) {
    const [user, setUser] = useState<IUser | null>(null);

    const isAuthenticated = !!user;

    async function signIn({ email, password }: ISignInData) {
        let errorRequest
        try {
            const { data: { token, user }, status } = await api.post('/login', { email, password })

            setCookie(undefined, 'formsbcw.token', token, {
                maxAge: 60 * 60 * 1 // 1 hour
            })

            api.defaults.headers.common['Authorization'] = token;

            setUser(user)
            
            Router.push('/dashboard');

        } catch (error) {
            errorRequest = error
        }

        return errorRequest
    }

    async function signOut() {
        destroyCookie(undefined, 'formsbcw.token');
        Router.replace('/');
    }

    async function recoverDataUser() {
        const { data: { user } } = await api.get('/me')

        setUser(user)
    }

    useEffect(() => {
        const { 'formsbcw.token': token } = parseCookies();

        if(token) {
            recoverDataUser()
        }
    },[])

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            user,
            signIn,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);