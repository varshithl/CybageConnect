import axios from "axios";
import { UserConnetions } from "../Models/UserConnections";
import { Article } from "../Models/Article";
import { Blog } from "../Models/Blog";
import { Project } from "../Models/ProjectInsight";

export const search = async () => {
    try {
        const response=await axios.get(`https://localhost:7184/api/CybageConnect/SearchForUser`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const friendArticles = async (username:string) => {
    try {
        const response=await axios.get(`https://localhost:7184/api/CybageConnect/FriendsArticles?username=${username}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization':'bearer '+localStorage.getItem('token')
      }
    });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const friendBlogs = async (username:string) => {
    try {
        const response=await axios.get(`https://localhost:7184/api/CybageConnect/FriendsBlogs?username=${username}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization':'bearer '+localStorage.getItem('token')
      }
    });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};


export const friendProjectInsights = async (username:string) => {
    try {
        const response=await axios.get(`https://localhost:7184/api/CybageConnect/FriendsProjectInsights?username=${username}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization':'bearer '+localStorage.getItem('token')
            }
          });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};
export interface FriendConnection {
    friendName: string;
    connectionStatus: number;
  }
  
  export const AboutConnection = async (username: string, friendName: UserConnetions[]) => {
      try {
          const data: FriendConnection[] = [];
          for (const friend of friendName) {
              const response = await axios.get(`https://localhost:7184/api/CybageConnect/EnableConnection?username=${username}&friendName=${friend.userName}`, {
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization':'bearer '+localStorage.getItem('token')
                  }
              });
              data.push({
                  friendName: friend.userName,
                  connectionStatus: response.data
              });
          }
          return data;
      } catch (error) {
          console.error('Error logging in:', error);
          throw error;
      }
  };
  export const sendRequestToFriend = async (username:string,friendName:string) => {
    try {
        const response=await axios.post(`https://localhost:7184/api/CybageConnect/SendRequest?fromUser=${username}&toUser=${friendName}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization':'bearer '+localStorage.getItem('token')
            }
          });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};




export interface LikeStatus {
    Id: number;
    connectionStatus: number;
  }
  
  export const Like = async (Articles:Article[],username: string) => {
      try {
          const data: LikeStatus[] = [];
          for (const article of Articles) {
              const response = await axios.get(`https://localhost:7184/api/CybageConnect/knowLikes?ArticleId=${article.articleId}&BlogId=0&ProjectInsightsId=0&UserName=${username}`, {
                  headers: {
                      'Content-Type': 'application/json'
                  }
              });
              data.push({
                    Id: article.articleId,
                  connectionStatus: response.data
              });
          }
          return data;
      } catch (error) {
          console.error('Error logging in:', error);
          throw error;
      }
  };
  export const LikeBlogs = async (Blogs:Blog[],username: string) => {
    try {
        const data: LikeStatus[] = [];
        for (const blog of Blogs) {
            const response = await axios.get(`https://localhost:7184/api/CybageConnect/knowLikes?ArticleId=0&BlogId=${blog.blogId}&ProjectInsightsId=0&UserName=${username}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            data.push({
                  Id: blog.blogId,
                connectionStatus: response.data
            });
        }
        return data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};
export const Likeprojects = async (Projects:Project[],username: string) => {
    try {
        const data: LikeStatus[] = [];
        for (const project of Projects) {
            const response = await axios.get(`https://localhost:7184/api/CybageConnect/knowLikes?ArticleId=0&BlogId=0&ProjectInsightsId=${project.projectInsightId}&UserName=${username}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            data.push({
                  Id: project.projectInsightId,
                connectionStatus: response.data
            });
        }
        return data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const LiketoPost = async (ArticleId:number,BlogId:number,ProjectId:number,username:string) => {
    try {
        const response=await axios.post(`https://localhost:7184/api/CybageConnect/LikeThePost?ArticleId=${ArticleId}&BlogId=${BlogId}&ProjectInsightsId=${ProjectId}&UserName=${username}`, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};
  
export const UnLiketoPost = async (ArticleId:number,BlogId:number,ProjectId:number,username:string) => {
    try {
        const response=await axios.post(`https://localhost:7184/api/CybageConnect/UnlikePost?ArticleId=${ArticleId}&BlogId=${BlogId}&ProjectInsightsId=${ProjectId}&UserName=${username}`, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const LikeList = async (ArticleId:number,BlogId:number,ProjectId:number) => {
    try {
        const response=await axios.get(`https://localhost:7184/api/CybageConnect/LikeList?ArticleId=${ArticleId}&BlogId=${BlogId}&ProjectInsightsId=${ProjectId}`, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};


export const CommenttoPost = async (ArticleId:number,BlogId:number,ProjectId:number,username:string,comment:string) => {
    try {
        const response=await axios.post(`https://localhost:7184/api/CybageConnect/CommentThePost?ArticleId=${ArticleId}&BlogId=${BlogId}&ProjectInsightsId=${ProjectId}&UserName=${username}&comment=${comment}`, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};
export const CommentList = async (ArticleId:number,BlogId:number,ProjectId:number) => {
    try {
        const response=await axios.get(`https://localhost:7184/api/CybageConnect/CommentList?ArticleId=${ArticleId}&BlogId=${BlogId}&ProjectInsightsId=${ProjectId}`, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
        return response.data;
    } catch (error) {
        console.error('Error :', error);
        throw error;
    }
};

export const deleteCommentOfPost = async (Id:number,username:string) => {
    try {
        const response=await axios.delete(`https://localhost:7184/api/CybageConnect/DeleteCommentThePost?id=${Id}&username=${username}`, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
        return response.data;
    } catch (error) {
        console.error('Error :', error);
        throw error;
    }
};
