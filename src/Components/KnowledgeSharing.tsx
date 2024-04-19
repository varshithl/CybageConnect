import { useEffect, useState } from "react";
import { Blog } from "../Models/Blog";
import { Project } from "../Models/ProjectInsight";
import { Article } from "../Models/Article";
import img from '../img/no_profile_pic.jpg';
import BlogImg from '../img/Blog.jpg';
import './KnowledgeSharing.css'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import { addArticles, addBlogs, addProjectInsights, deleteArticle, deleteBlog, deleteProjectInsight, getArticleById, getArticles, getBlogById, getBlogs, getProjectInsightById, getProjects, updateArticles, updateBlogs, updateProjectInsights } from "../Services/KnowledgeSharingServices";
import { AuthorInfo, AuthorName, Card, Container, Content, Header, Title } from "./articles";
import { Avatar, Button, Typography } from "@mui/material";
import { Description, Details, InfoLabel, ProjectCard, ProjectContainer, UserInfo, UserSection } from "./project";

import { BlogAuthorAvatar, BlogAuthorInfo, BlogContainer, BlogContent, BlogFeaturedImage, BlogPostCard, BlogTitle } from "./blogs";

export function KnowledgeSharing({ username, share }: { username: string, share: string }) {
    const [articles, setArticles] = useState<Article[]>([])
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [projects, setProjects] = useState<Project[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [postDetails, setPostDetails] = useState(false);
    const [articleTitle, setArticleTitle] = useState('');
    const [content, setContent] = useState('');
    const [blogTitle,setBlogTitle]=useState('');
    const [blogContent,setBlogContent]=useState('');
    const [addData, setAddData] = useState<string>('');
    const [updateArticle, setUpdateArticle] = useState<Article>({ articleId: 0, userId: 0, userName: '', articleTitle: '', publishedDate: '', likes: 0, comments: '', content: '' });
    const [updateBlog, setUpdateBlog] = useState<Blog>({ blogId: 0, userId: 0, userName: '', blogTitle: '', publishedDateOfBlog: '', likes: 0, comments: '', content: '' });
    const [updateProjectInsight, setUpdateProjectInsight] = useState<Project>({ projectInsightId: 0, userId: 0, userName: '', projectTitle: '', publishedDateOfProjectInsight: '', likes: 0, comments: '', projectDescription: '', duration: '', tools: '' });
    const [addProjectInsight, setAddProjectInsight] = useState<Project>({ projectInsightId: 0, userId: 0, userName: '', projectTitle: '', publishedDateOfProjectInsight: '', likes: 0, comments: '', projectDescription: '', duration: '', tools: '' });

    function NewArticle(newPostData: string) {
        setAddData(newPostData);
        setShowForm(true);
    }

    async function AddPosttoDb() {
        if (addData === "Article") {
            if (content.length !== 0 && articleTitle.length !== 0) {
                const response = await addArticles(username, articleTitle, content);
                if (response === true) {
                    ArticlesOfUser();
                    setShowForm(false);
                }
                setArticleTitle('');
                setContent('');
            } else {
                alert("Fields must be not empty");
            }
        }
        else if (addData === "Blog") {
            if (blogTitle.length !== 0 && blogContent.length !== 0) {
                const response = await addBlogs(username, blogTitle,blogContent);
                if (response === true) {
                    Blogs();
                    setBlogTitle('');
                    setBlogContent('');
                    setShowForm(false);
                }
            } else {
                alert("Fields must be not empty");
            }
        }
        else if (addData === "Project Insight") {
            if (addProjectInsight.projectTitle.length !== 0 && addProjectInsight.duration.length !== 0 && addProjectInsight.tools.length !== 0 && addProjectInsight.projectDescription.length !== 0) {
                const response = await addProjectInsights(username, addProjectInsight.projectTitle, addProjectInsight.projectDescription, addProjectInsight.duration, addProjectInsight.tools);
                if (response === true) {
                    Projects();
                    setShowForm(false);
                }
                setAddProjectInsight({ projectInsightId: 0, userId: 0, userName: '', projectTitle: '', publishedDateOfProjectInsight: '', likes: 0, comments: '', projectDescription: '', duration: '', tools: '' });
            } else {
                alert("Fields must be not empty");
            }
        }
    }

    async function UpdatePostDetails(id: number, post: string) {
        if (post === "Article") {
            const response = await getArticleById(id);
            setUpdateArticle(response);
            setPostDetails(true);
            setAddData(post);
        } else if (post === "Blog") {
            const response = await getBlogById(id);
            setUpdateBlog(response);
            setPostDetails(true);
            setAddData(post);
        } else if (post === "Project Insights") {
            const response = await getProjectInsightById(id);
            setUpdateProjectInsight(response);
            setPostDetails(true);
            setAddData(post);
        }
    }

    async function SaveChangesOfPost(post: string) {
        if (post === "Article") {
            const response = await updateArticles(updateArticle.articleId, updateArticle.articleTitle, updateArticle.content);
            if (response === true) {
                setPostDetails(false);
                ArticlesOfUser();
            }

        } else if (post === "Blog") {
            const response = await updateBlogs(updateBlog.blogId, updateBlog.blogTitle, updateBlog.content);
            if (response === true) {
                setPostDetails(false);
                Blogs();
            }
        } else if (post === "Project Insights") {
            const response = await updateProjectInsights(updateProjectInsight.projectInsightId, updateProjectInsight.projectTitle, updateProjectInsight.projectDescription, updateProjectInsight.duration, updateProjectInsight.tools);
            if (response === true) {
                setPostDetails(false)
                Projects()
            }
        }
    }

    async function deleteData(id: number, post: string) {
        if (post === "Article") {
            const response = await deleteArticle(id);
            Swal.fire({
                icon: 'success',
                title: 'Deleted', // You might need to adjust this based on the response from your API
                showConfirmButton: false,
                timer: 1500 // Automatically close after 1.5 seconds
              });
            if (response.data === true) {
                setArticles(articles.filter(blog => blog.articleId !== id));
            }
        } else if (post === "Blog") {
            const response = await deleteBlog(id);
            Swal.fire({
                icon: 'success',
                title: 'Deleted', // You might need to adjust this based on the response from your API
                showConfirmButton: false,
                timer: 1500 // Automatically close after 1.5 seconds
              });
            if (response === true) {
                setBlogs(blogs.filter(blog => blog.blogId !== id));
            }
        } else if (post === "Project Insights") {
            const response = await deleteProjectInsight(id);
            Swal.fire({
                icon: 'success',
                title: 'Deleted', // You might need to adjust this based on the response from your API
                showConfirmButton: false,
                timer: 1500 // Automatically close after 1.5 seconds
              });
            if (response === true) {
                setProjects(projects.filter(blog => blog.projectInsightId !== id));
            }
        }
    }

    useEffect(() => {

        if (share === 'Articles') {
            ArticlesOfUser();
        }
        if (share === 'Blogs') {
            Blogs();
        }
        if (share === 'Project Insights') {
            Projects();
        }
    });

    async function ArticlesOfUser() {
        try {
            const response = await getArticles(username);
            setArticles(response);

        } catch (error) {
            console.error("Error fetching articles:", error);
        }
    }
    async function Blogs() {
        try {
            const response = await getBlogs(username);
            setBlogs(response);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    }
    async function Projects() {
        try {
            const response = await getProjects(username);
            setProjects(response);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    }
    return (
        <>{share === "Articles" && ((articles.length > 0) ?
            <>
                <div id="MyPosts"><h3>Articles</h3><Button variant="contained" color="success" onClick={() => NewArticle("Article")} startIcon={<AddIcon />}> Article</Button></div>
                <center>
                    <Container>
                        {articles.map((blog) => (
                            <>
                                <Card>
                                    <Header>
                                        <Avatar src={img} sx={{ width: 40, height: 40, marginRight: 12 }} />
                                        <div>
                                            <AuthorInfo>
                                                <AuthorName>{blog.userName}</AuthorName>
                                                <span>·</span>
                                                <span>Published on {blog.publishedDate}</span>
                                                <Button variant="contained" color="primary" onClick={() => UpdatePostDetails(blog.articleId, "Article")} startIcon={<EditIcon />}>Edit</Button>
                                                &nbsp;&nbsp;&nbsp;
                                                <Button variant="contained" color="error" onClick={() => deleteData(blog.articleId, "Article")} startIcon={<DeleteIcon />}>Delete</Button>
                                            </AuthorInfo>

                                        </div>
                                    </Header>
                                    <Title>{blog.articleTitle}</Title>
                                    <Content>
                                        <p>
                                            {blog.content}
                                        </p>
                                        <br/>
                                        <div>
                                        <label><b>Likes:</b></label>{blog.likes}<br/>
                                        <label><b>Comments:</b></label>{blog.comments}<br/>
                                        </div>
                                    </Content>
                                    
                                </Card></>
                        ))}
                    </Container>
                </center>
            </> : <div id="MyPosts"><h1>No Articles Found</h1><Button variant="contained" color="success" onClick={() => NewArticle("Article")} startIcon={<AddIcon />}>Article</Button></div>
        )}

            {share === "Blogs" && ((blogs.length > 0) ?
                <>
                    <div id="MyPosts"><h1>Blogs</h1><Button variant="contained" color="success" onClick={() => NewArticle("Blog")} startIcon={<AddIcon />}>Blog</Button></div>

                   
                        <BlogContainer>
                            {blogs.map((blog) => (
                                <BlogPostCard>
                                    <div style={{position:"absolute",marginLeft:"750px",marginTop:"10px"}}>
                                            <Button variant="contained" color="primary" onClick={() => UpdatePostDetails(blog.blogId, "Blog")} startIcon={<EditIcon />}>Edit</Button>&nbsp;&nbsp;&nbsp;
                                            <Button variant="contained" color="error" onClick={() => deleteData(blog.blogId, "Blog")} startIcon={<DeleteIcon />}>Delete</Button>
                                        </div>
                                    <BlogFeaturedImage src={BlogImg} alt="Featured" />
                                    <div>
                                        <center><BlogTitle variant="h1">{blog.blogTitle}</BlogTitle></center>
                                        <BlogContent variant="body1">
                                            {blog.content}
                                        </BlogContent>
                                        <BlogAuthorInfo>
                                            <BlogAuthorAvatar src={img} />
                                            <div>
                                                <Typography variant="subtitle1"><b>{blog.userName}</b></Typography>
                                                <Typography variant="subtitle2">Published on {blog.publishedDateOfBlog}</Typography>
                                            </div>
                                        </BlogAuthorInfo>
                                        <br/>
                                        <div className="reaction">
                                        <label><b>Likes:</b></label>{blog.likes}<br/>
                                        <label><b>Comments</b></label>{blog.comments}<br/>
                                        </div>
                                    </div>
                                </BlogPostCard>
                            ))}
                        </BlogContainer>
                    {/* <div className="card" id="cardbody">
                            {blogs.map((blog) => (
                                <div key={blog.blogId} className="card" id="cards">
                                    <div id="cardPublish">
                                        <div>
                                            <label id="cardinside">Published Date:</label><br />
                                            <p className="card-text" id="cardinside">{blog.publishedDateOfBlog}</p>
                                        </div>
                                        <button id="edit" className="btn btn-primary" onClick={() => UpdatePostDetails(blog.blogId, "Blog")}><i className="bi bi-pencil-square"></i></button>
                                        <button id="delete" className="btn btn-danger" onClick={() => deleteData(blog.blogId, "Blog")}><i className="bi bi-trash"></i></button>
                                    </div>
                                    <img src={img} className="card-img-top" alt="..." id="cardImg" />
                                    <div className="card-body">
                                        <h5 className="card-title">{blog.blog}</h5>
                                    </div>
                                </div>
                            ))}
                        </div> */}

                </> : <div id="MyPosts"><h1>No Blogs Found</h1><Button variant="contained" color="success" onClick={() => NewArticle("Blog")} startIcon={<AddIcon />}> Blog</Button></div>
            )}
            {share === "Project Insights" && ((projects.length > 0) ?
                <>
                    <div id="MyPosts"><h1>Project Insights</h1><Button variant="contained" color="success" onClick={() => NewArticle("Project Insight")} startIcon={<AddIcon />}> ProjectInsight</Button></div>
                    <ProjectContainer>{projects.map((project) => (
                        <ProjectCard>
                            <Button variant="contained" className="crud" color="primary" onClick={() => UpdatePostDetails(project.projectInsightId, "Project Insights")} startIcon={<EditIcon />}
                            >Edit</Button>&nbsp;&nbsp;&nbsp;
                            <Button variant="contained" className="crud" color="error" onClick={() => deleteData(project.projectInsightId, "Project Insights")} startIcon={<DeleteIcon />}>
                                Delete</Button>
                            <UserSection>
                                <Avatar src={img} sx={{ width: 80, height: 80, marginRight: 20 }} />
                                <UserInfo>
                                    <Typography variant="h6">{project.userName}</Typography>
                                    <Typography variant="subtitle1" color="textSecondary">UI/UX Designer</Typography>
                                </UserInfo>
                            </UserSection>
                            <Title >{project.projectTitle}</Title>
                            <Description variant="body1">
                                {project.projectDescription}
                            </Description>
                            <Details>
                                <InfoLabel>Tools/Technologies Used:</InfoLabel>
                                <Typography variant="body1">{project.tools}</Typography>
                            </Details>
                            <Details>
                                <InfoLabel>Duration:</InfoLabel>
                                <Typography variant="body1">{project.duration}</Typography>
                            </Details>
                            <Details>
                                <InfoLabel>Likes:</InfoLabel>
                                <Typography variant="body1">{project.likes}</Typography>
                            </Details>
                            <Details>
                                <InfoLabel>Comments:</InfoLabel>
                                <Typography variant="body1">{project.comments}</Typography>
                            </Details>
                            <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '20px' }}>
                            </div>
                        </ProjectCard>
                    ))}
                    </ProjectContainer>

                </> : <div id="MyPosts"><h1>No Project Insights Found</h1><Button variant="contained" color="success" onClick={() => NewArticle("Project Insight")} startIcon={<AddIcon />}>ProjectInsight</Button></div>
            )}
            {showForm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add {addData}</h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowForm(false)}></button>
                        </div>
                        <form className="modal-body">
                            {(addData === "Article") ?
                                <><input type="text" placeholder="Article Title" value={articleTitle} onChange={e => setArticleTitle(e.target.value)} required />
                                    <br />
                                    <textarea id="content" placeholder="Content" value={content} onChange={e => setContent(e.target.value)} required /><br />
                                </>
                                : (addData === "Blog") ?
                                    <>
                                        <input type="text" placeholder="Enter your Blog" value={blogTitle} onChange={e => setBlogTitle(e.target.value)} required />
                                        <br />
                                        <textarea id="content" placeholder="Content" value={blogContent} onChange={e => setBlogContent(e.target.value)} required /><br />
                                    </>
                                    :
                                    <>
                                        <input type="text" placeholder="Enter your Project Insights" value={addProjectInsight.projectTitle} onChange={e => setAddProjectInsight({ ...addProjectInsight, projectTitle: e.target.value })} required />
                                        <br />
                                        <textarea id="content" placeholder="Enter Project Description"
                                            value={addProjectInsight.projectDescription}
                                            onChange={e => setAddProjectInsight({ ...addProjectInsight, projectDescription: e.target.value })}
                                            required />
                                        <br />
                                        <input
                                            type="text"
                                            placeholder="Enter Technologies/tools used"
                                            value={addProjectInsight.tools}
                                            onChange={e => setAddProjectInsight({ ...addProjectInsight, tools: e.target.value })}
                                            required
                                        /><br />
                                        <input
                                            type="text"
                                            placeholder="duration(In Months)"
                                            value={addProjectInsight.duration}
                                            onChange={e => setAddProjectInsight({ ...addProjectInsight, duration: e.target.value })}
                                            required
                                        />
                                        <br />
                                    </>
                            }
                            <button type="button" className="btn btn-primary" onClick={() => AddPosttoDb()}>Post</button>
                        </form>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )
            }
            {postDetails && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit {addData}</h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={() => setPostDetails(false)}></button>
                        </div>
                        <form className="modal-body">
                            {(addData === "Article") ? (
                                <><input
                                    type="text"
                                    placeholder="Enter your article"
                                    value={updateArticle.articleTitle}
                                    onChange={e => setUpdateArticle(prevState => ({ ...prevState, articleTitle: e.target.value }))}
                                    required
                                /><br /><textarea id="content"
                                    placeholder="Enter your article"
                                    value={updateArticle.content}
                                    onChange={e => setUpdateArticle(prevState => ({ ...prevState, content: e.target.value }))}
                                    required
                                    /><button type="button" className="btn btn-primary" onClick={() => SaveChangesOfPost(addData)}>Save changes</button></>
                            ) : (addData === "Blog") ? (
                                <><input
                                    type="text"
                                    placeholder="Enter your Blog"
                                    value={updateBlog.blogTitle}
                                    onChange={e => setUpdateBlog(prevState => ({ ...prevState, blogTitle: e.target.value }))}
                                    required
                                /><br /><textarea id="content"
                                    placeholder="Enter your Blog"
                                    value={updateBlog.content}
                                    onChange={e => setUpdateBlog(prevState => ({ ...prevState, content: e.target.value }))}
                                    required
                                    /><button type="button" className="btn btn-primary" onClick={() => SaveChangesOfPost(addData)}>Save changes</button></>
                            ) : (
                                <><input
                                    type="text"
                                    placeholder="Enter your Project Insights"
                                    value={updateProjectInsight.projectTitle}
                                    onChange={e => setUpdateProjectInsight(prevState => ({ ...prevState, projectInsight: e.target.value }))}
                                    required
                                /><br />
                                    <textarea id="content" placeholder="Enter Project Description"
                                        value={updateProjectInsight.projectDescription}
                                        onChange={e => setUpdateProjectInsight(prevState => ({ ...prevState, projectDescription: e.target.value }))}
                                        required />
                                    <br />
                                    <input
                                        type="text"
                                        placeholder="Enter Technologies/tools used"
                                        value={updateProjectInsight.tools}
                                        onChange={e => setUpdateProjectInsight(prevState => ({ ...prevState, tools: e.target.value }))}
                                        required
                                    /><br />
                                    <input
                                        type="text"
                                        placeholder="duration(In Months)"
                                        value={updateProjectInsight.duration}
                                        onChange={e => setUpdateProjectInsight(prevState => ({ ...prevState, duration: e.target.value }))}
                                        required
                                    />
                                    <br />
                                    <button type="button" className="btn btn-primary" onClick={() => SaveChangesOfPost(addData)}>Save changes</button></>
                            )}
                        </form>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setPostDetails(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )
            }</>
    )
}