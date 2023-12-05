import { LoginResponse } from '@/app/interfaces/login.interface';
import axios from 'axios';

export const LoginUser = async (credentials: { email: string, password: string }) => {
    const apiUrl = 'http://83.222.8.129:13069/user/login';
    const requestData = {
        user_email: credentials.email,
        user_password: credentials.password,
    };

    try {
        const response = await axios.post(apiUrl, requestData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            const data: LoginResponse = response.data;
            return data;
        } else {
            console.error('Ошибка входа:', response.data);
            throw new Error('Ошибка входа');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        throw error;
    }
};