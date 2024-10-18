import axios, { AxiosHeaders } from "axios";
import { ACCESS_TOKEN } from "@/constants";

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_SERVER
});

const onRequest = (config) => {
    try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            const mHeaders = AxiosHeaders.from({
                Authorization: `Bearer ${token}`,
            })

            if (mHeaders) {
                config.headers = mHeaders
            }
        }
    } catch (error) { 
        console.log(error);
    }

    return config
}

api.interceptors.request.use(onRequest)

api.interceptors.response.use(
    (response) => {
        return response.data
    },

    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
        }
        return Promise.reject(error)
    }

)

const login = (data) => api.post('/api/v1/auth/signin', data);
const signup = (data) => api.post('/api/v1/auth/signup', data);
const getPlaidToken = () => api.post('/api/v1/auth/get_plaid_token');
const getHistory = () => api.post('/api/v1/chat/get_history');
const sendUserMessage = (data) => api.post('/api/v1/chat/add_history', data);
const createPlaidLinkToken = () => api.post('api/v1/plaid/create_link_token');
const exchangePublicToken = (data) => api.post('api/v1/plaid/exchange_public_token', data);
export const apis = {
    login,
    signup,
    getPlaidToken,
    getHistory,
    sendUserMessage,
    createPlaidLinkToken,
    exchangePublicToken
}