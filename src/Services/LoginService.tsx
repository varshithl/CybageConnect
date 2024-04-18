import axios from "axios";
export const LoginUser = async (userName: string, userPassword: string) => {
    try {
        const response = await axios.post(
            'https://localhost:7184/api/CybageConnect/Login',
            JSON.stringify({ userName, userPassword }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};