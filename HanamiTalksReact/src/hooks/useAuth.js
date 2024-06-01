import { useEffect } from "react";
import axiosClient from "../config/axios";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

export const useAuth = ({middleware, url}) => {

    const token = localStorage.getItem('AUTH_TOKEN');
    const navigate = useNavigate();

    const { data: user, error, mutate } = useSWR('/api/users', async () => {
        return axiosClient('/api/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.data)
        .catch(error => {
            throw new Error(error?.response?.data?.errors);
        });
    });

    const login = async (existingUserData, setErrors) => {
        try {
            const response = await axiosClient.post(
                "api/login",
                existingUserData
            );
            localStorage.setItem("AUTH_TOKEN", response.data.access_token);
            setErrors([]);
            await mutate();
        } catch (error) {
            //console.log(error);
            setErrors(["Incorrect username or password"]);
        }

    }

    const register = async (newUserData, setErrors) => {
        try {
            const response = await axiosClient.post(
                "api/register",
                newUserData
            );
            console.log(response.data.access_token);
            localStorage.setItem("AUTH_TOKEN", response.data.access_token);
            setErrors([]);
        } catch (error) {
            console.log(error);
            setErrors(Object.values(error.response.data.errors));
        }
    }

    const logout = async () => {
        try{
            await axiosClient.get('/api/logout', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            navigate('/');
            localStorage.removeItem('AUTH_TOKEN');
            await mutate(null, false);
        }catch(error){
            throw new Error(error?.response?.data?.errors);
        }
    }

    useEffect(() => {
        if (middleware === 'guest' && url && user) {
            navigate(url, { replace: true });
        } else if (middleware === 'auth' && !user) {
            navigate('/auth/loginRegister', { replace: true });
        }
    }, [user, error]);

    return{
        login, register, logout, user, error
    }
}