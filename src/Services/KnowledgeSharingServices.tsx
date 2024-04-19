import axios from "axios";


export const getArticles = async (userName: string) => {
    try {
        const response = await axios.get(`https://localhost:7184/api/CybageConnect/Article?UserName=${userName}`, {
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
export const getBlogs = async (userName: string) => {
    try {
        const response = await axios.get(`https://localhost:7184/api/CybageConnect/Blog?UserName=${userName}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'bearer '+localStorage.getItem('token')
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};
export const getProjects = async (userName: string) => {
    try {
        const response = await axios.get(`https://localhost:7184/api/CybageConnect/ProjectInsight?UserName=${userName}`, {
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







export const deleteArticle = async (id:number) => {
    try {
        const response = await axios.delete(`https://localhost:7184/api/CybageConnect/ArticleDelete?id=${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'bearer '+localStorage.getItem('token')
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};
export const deleteBlog = async (id:number) => {
    try {
        const response = await axios.delete(`https://localhost:7184/api/CybageConnect/BlogDelete?id=${id}`, {
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
export const deleteProjectInsight = async (id:number) => {
    try {
        const response = await axios.delete(`https://localhost:7184/api/CybageConnect/ProjectInsightsDelete?id=${id}`, {
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






export const getArticleById = async (id:number) => {
    try {
        const response = await axios.get(`https://localhost:7184/api/CybageConnect/GetArticleById?articleId=${id}`, {
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
export const getBlogById = async (id:number) => {
    try {
        const response = await axios.get(`https://localhost:7184/api/CybageConnect/GetBlogById?blogId=${id}`, {
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
export const getProjectInsightById = async (id:number) => {
    try {
        const response = await axios.get(`https://localhost:7184/api/CybageConnect/GetProjectInsightsById?projectInsightId=${id}`, {
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






export const updateArticles=async(articleId: Number,articleTitle:string,content:string)=>{
    try {
        var data1 = {
            articleId,
            articleTitle,
            content
        };
        axios.put('https://localhost:7184/api/CybageConnect/EditArticle', JSON.stringify(data1), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'bearer '+localStorage.getItem('token')
            }
        });
        return true;
      } catch (error) {
        console.error('Error registering user:', error);
        throw error;
      }
}

export const updateBlogs=async(blogId: Number,blogTitle:string,content:string)=>{
    try {
        var data1 = {
            blogId,
            blogTitle,
            content,
        };
        axios.put('https://localhost:7184/api/CybageConnect/EditBlog', JSON.stringify(data1), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':'bearer '+localStorage.getItem('token')
                }
            });
        return true;
      } catch (error) {
        console.error('Error registering user:', error);
        throw error;
      }
}
export const updateProjectInsights=async(projectInsightId: Number,projectTitle:string,projectDescription:string,duration:string,tools:string)=>{
    try {var data1 = {
        projectInsightId ,
        projectTitle,
        projectDescription,
        duration,
        tools
    };
    axios.put('https://localhost:7184/api/CybageConnect/EditProjectInsight', JSON.stringify(data1), {
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'bearer '+localStorage.getItem('token')
        }
    });
        return true;
      } catch (error) {
        console.error('Error registering user:', error);
        throw error;
      }
}




export const addArticles=async(userName: string,articleTitle:string,content:string)=>{
    try {
        var UserData = {
            userName,
            articleTitle,content
        };
        await axios.post('https://localhost:7184/api/CybageConnect/AddArticle', JSON.stringify(UserData), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'bearer '+localStorage.getItem('token')
            }
        });
        return true;
      } catch (error) {
        console.error('Error registering user:', error);
        throw error;
      }
}

export const addBlogs=async(userName: string,blogTitle:string,content:string)=>{
    try {
        var data1 = {
            userName,
            blogTitle,
            content,
        };
        await axios.post('https://localhost:7184/api/CybageConnect/AddBlog', JSON.stringify(data1), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':'bearer '+localStorage.getItem('token')
                }
            });
        return true;
      } catch (error) {
        console.error('Error registering user:', error);
        throw error;
      }
}
export const addProjectInsights=async(userName: string,projectTitle:string,projectDescription:string,duration:string,tools:string)=>{
    try {
        var data1 = {
        userName,
        projectTitle,
        projectDescription,
        duration,
        tools,
    };
    await axios.post('https://localhost:7184/api/CybageConnect/AddProject', JSON.stringify(data1), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':'bearer '+localStorage.getItem('token')
                }
            });
        return true;
      } catch (error) {
        console.error('Error registering user:', error);
        throw error;
      }
}