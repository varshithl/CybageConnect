import axios from "axios";
export const GetUserDetails = async (userName: string) => {
    try {
        const response = await axios.get(`https://localhost:7184/api/CybageConnect/GetDetails?UserName=${userName}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization':'bearer '+localStorage.getItem('token')
            }
          }
        );
        return response.data;
    } catch (error) {
        console.error('Error in:', error);
        throw error;
    }
};


export const UpdateUserDetails = async (fullName:string,userName:string,userPassword: string,email:string,mobileNumber: number) => {
    try {
        var UserData = {
        fullName,
        userName,
        userPassword,
        email,
        mobileNumber
      };

      const response = await axios.put('https://localhost:7184/api/CybageConnect/EditDetails', JSON.stringify(UserData), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization':'bearer '+localStorage.getItem('token')
        }
      });
      return response;
    } catch (error) {
        console.error('Error in :', error);
        throw error;
    }
};