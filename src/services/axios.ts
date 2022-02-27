import axios from "axios";
import { parseCookies } from "nookies";

export function getAPIClient(ctx?: any) {
    
    const { 'formsbcw.token': token } = parseCookies(ctx);

    const api = axios.create({
        baseURL: 'http://localhost:3030'
    });

    if(token) {
        api.defaults.headers.common['Authorization'] = token;
    }

    return api;
}