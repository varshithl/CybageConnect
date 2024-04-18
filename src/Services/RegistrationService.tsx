import axios from "axios"

export const Register=async(fullName:string,userName:string,userPassword: string,email:string,mobileNumber: Number)=>{
    try {
        const userData = {
          fullName,
          userName,
          userPassword,
          email,
          mobileNumber
        };
        const response=await axios.post(
          'https://localhost:7184/api/CybageConnect/Register',
          JSON.stringify(userData),
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        return response.data;
      } catch (error) {
        console.error('Error registering user:', error);
        throw error;
      }
}