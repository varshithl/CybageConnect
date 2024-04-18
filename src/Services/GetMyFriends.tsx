import axios from "axios";
export const GetMyFriends = async (userName: string) => {
    try {
        const response = await axios.get(`https://localhost:7184/api/CybageConnect/MyFriends?username=${userName}`, {
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

export const DeleteConnectionOfFriend = async (userName: string,id:number) => {
    try {
        const response = await axios.delete(`https://localhost:7184/api/CybageConnect/DeleteConnection?username=${userName}&FriendId=${id}`, {
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