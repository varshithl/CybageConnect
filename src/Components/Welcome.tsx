import 'react-toastify/dist/ReactToastify.css';
import './Welcome.css';
import img from '../img/no_profile_pic.jpg';
import BlogImg from '../img/Blog.jpg';
import cybage from '../img/Logo.png';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './form.css';
import { Article } from '../Models/Article';
import { Blog } from '../Models/Blog';
import { Project } from '../Models/ProjectInsight';
import { UserConnetions } from '../Models/UserConnections';
import { DashBoard } from './DashBoard';
import { Networking } from './Networking';
import { KnowledgeSharing } from './KnowledgeSharing';
import { Notification } from './Notification';
import { AboutConnection, CommentList, CommenttoPost, FriendConnection, Like, LikeBlogs, LikeList, LikeStatus, Likeprojects, LiketoPost, UnLiketoPost, deleteCommentOfPost, friendArticles, friendBlogs, friendProjectInsights, search, sendRequestToFriend } from '../Services/WelcomeService';
import React from 'react';
import { ListOfLikes } from '../Models/ListOfLikes';
import { ListOfComments } from '../Models/ListOfComments';
import { AuthorInfo, AuthorName, Card, Container, Content, Header, Title } from './articles';
import { Description, Details, InfoLabel, ProjectCard, ProjectContainer, UserInfo, UserSection } from "./project";
import { Avatar, Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { BlogAuthorAvatar, BlogAuthorInfo, BlogContainer, BlogContent, BlogFeaturedImage, BlogPostCard, BlogTitle } from "./blogs";
import Swal from 'sweetalert2';

interface Props {
  username: any
}

function Welcome({ username }: Props) {
  const [data, setData] = useState<string>('');
  const [demoData,setDemoData]=useState<string>('');
  const [displaydiv, setDisplayDiv] = useState('');
  const [homeStats, setHomestats] = useState(false);
  const [likedData, setLikedData] = useState<LikeStatus[]>([]);
  const [friendsArticles, setFriendsArticles] = useState<Article[]>([])
  const [friendsBlogs, setFriendsBlogs] = useState<Blog[]>([])
  const [friendsProjects, setFriendsProjects] = useState<Project[]>([]);
  const [userSearch, setUserSearch] = useState<string>('');
  const [showAllFriends, setShowAllFriends] = useState(false);
  const [searchForFriends, setSearchForFriends] = useState<UserConnetions[]>([]);
  const [allUsers, setAllUsers] = useState<UserConnetions[]>([]);
  const [connectionWithFriend, setConnectionWithFriend] = useState<FriendConnection[]>([]);
  const [showList, setShowList] = useState(false);
  const [list, setList] = useState<ListOfLikes[]>([]);
  const [showCommentList, setShowCommentList] = useState(false);
  const [commentList, setCommentList] = useState<ListOfComments[]>([]);
  const [comment, setComment] = useState('');
  const [commentAid, setCommentAid] = useState<number>(0);
  const [commentBid, setCommentBid] = useState<number>(0);
  const [commentPid, setCommentPid] = useState<number>(0);
  const [commentForm, setCommentForm] = useState(false);
  const [userPostData, setUserPostData] = useState<string>('');
  const navigate = useNavigate();

  // const username: string = localStorage.getItem('name') === null ? '' : localStorage.getItem('name')


  useEffect(() => {
   HomeData();
    console.log("reached here!!")
    if (username === '' || username === null) {
      navigate('/')
    }
  },[])


  async function SearchForUser(value: string) {
    const response = await search();
    setAllUsers(response);
    const result = response.filter((users: { userName: string }) => {
      return users.userName.toLowerCase().includes(value);
    });
    const response2 = await AboutConnection(username, result);
    setConnectionWithFriend(response2);
    setSearchForFriends(result);

    console.log(connectionWithFriend);
    setShowAllFriends(true);
  }

  function SearchFunction(value: string) {
    setDisplayDiv('');
    setHomestats(false);
    setUserSearch(value);
    setUserPostData('');
    if (value.trim() === "") {
      setConnectionWithFriend([]);
      setSearchForFriends([]);
    } else {
      SearchForUser(value);
    }
    console.log(searchForFriends);
  }

  async function sendRequest(friendname: string) {
    const response = await sendRequestToFriend(username, friendname);
    setConnectionWithFriend(prevConnections => {
      const friendIndex = prevConnections.findIndex(friend => friend.friendName === friendname);

      // If the friend is found, update the connection status to "Pending" (status = 2)
      if (friendIndex !== -1) {
        const updatedConnections = [...prevConnections];
        updatedConnections[friendIndex].connectionStatus = 2;
        return updatedConnections;
      } else {
        // If the friend is not found, add them to the array with status "Pending"
        return [...prevConnections, { friendName: friendname, connectionStatus: 2 }];
      }
    });
  }


  function UserLogout() {
    localStorage.removeItem('name')
    localStorage.removeItem('token')
    if (username.length > 0)
      navigate('/')
  }

  //home
  function HomeData() {
    setDisplayDiv("Home");
    setShowAllFriends(false);
    userFriendsArticles();
  }

  async function userFriendsArticles() {
    const response = await friendArticles(username);
    setUserPostData("Article");
    const response2 = await Like(response, username);
    setLikedData(response2);
    setFriendsArticles(response);
  }
  async function userFriendsBlogs() {
    const response = await friendBlogs(username);
    setUserPostData("Blog");
    const response2 = await LikeBlogs(response, username);
    setLikedData(response2);
    setFriendsBlogs(response);
  }
  async function userFriendsProjects() {

    const response = await friendProjectInsights(username);
    setUserPostData("Project Insight");
    const response2 = await Likeprojects(response, username);
    setLikedData(response2);
    setFriendsProjects(response);
  }


  async function Likeposts(Aid: number, Bid: number, Pid: number, user: string) {
    const response = await LiketoPost(Aid, Bid, Pid, user);
    if (Aid != 0) {
      userFriendsArticles();
    }
    if (Bid != 0) {
      userFriendsBlogs();
    }
    if (Pid != 0) {
      userFriendsProjects();
    }
  }
  async function unLikePosts(Aid: number, Bid: number, Pid: number, user: string) {
    const response = await UnLiketoPost(Aid, Bid, Pid, user);
    if (Aid != 0) {
      userFriendsArticles();
    }
    if (Bid != 0) {
      userFriendsBlogs();
    }
    if (Pid != 0) {
      userFriendsProjects();
    }
  }

  async function LikesList(Aid: number, Bid: number, Pid: number) {
    const response = await LikeList(Aid, Bid, Pid);
    setShowList(true);
    setList(response);
  }


  function createComment(Aid: number, Bid: number, Pid: number) {
    setCommentAid(Aid);
    setCommentBid(Bid);
    setCommentPid(Pid);
    setCommentForm(true);
  }
  async function Commentposts(Aid: number, Bid: number, Pid: number, comment: string) {
    if (comment.length != 0) {
      const response = await CommenttoPost(Aid, Bid, Pid, username, comment);
      setCommentForm(false);
      if (Aid != 0) {
        userFriendsArticles();
      }
      if (Bid != 0) {
        userFriendsBlogs();
      }
      if (Pid != 0) {
        userFriendsProjects();
      }
      setComment('');
    }
    else {
      alert("Enter the Comment");
    }
  }
  async function CommentsList(Aid: number, Bid: number, Pid: number) {
    const response = await CommentList(Aid, Bid, Pid);
    setShowCommentList(true);
    if (Aid != 0) {
      setDemoData("Arcticle");
    }
    if (Bid != 0) {
      setDemoData("Blog");
    }
    if (Pid != 0) {
      setDemoData("Project");
    }
    setCommentList(response);
  }
  async function deleteComment(id:number) {
    const response=await deleteCommentOfPost(id,username);
    if(response==="Comment deleted successfully"){
      Swal.fire({
        icon: 'success',
        title: response, // You might need to adjust this based on the response from your API
        showConfirmButton: false,
        timer: 1500 // Automatically close after 1.5 seconds
      });
    }
    else{
      Swal.fire({
        icon: 'error',
        title: response, // You might need to adjust this based on the response from your API
        showConfirmButton: false,
        timer: 1500 // Automatically close after 1.5 seconds
      });
    }
    setShowCommentList(false);
    if(demoData==="Arcticle"){
      userFriendsArticles();
      }
      if (demoData==="Blog") {
        userFriendsBlogs();
      }
      if (demoData==="Project") {
        userFriendsProjects();
      }
    setUserPostData(userPostData);
  }




  function Divs(value: string) {
    if (value === "Dash") {
      setUserPostData('');
      setShowAllFriends(false);
      setDisplayDiv(value);
    }
    if (value === "MyFriends") {
      setUserPostData('');
      setShowAllFriends(false);
      setDisplayDiv(value);
    }
  }

  function Gotos(value: string) {
    setUserPostData('');
    setShowAllFriends(false);
    setDisplayDiv("KnowledgeSharing");
    setData(value);
  }


  return (
    <>
      <header>
        <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse border-right">
          <div className="position-sticky">
            <div className="list-group list-group-flush" id="forsidebar">
              <a id="point" onClick={() => HomeData()} className="list-group-item list-group-item-action py-2 ripple"
              ><i className="fas fa-lock fa-fw me-3"></i><span>Home</span></a
              >
              <a
                onClick={() => Divs("Dash")}
                id="point"
                className="list-group-item list-group-item-action py-2 ripple"
                aria-current="true"
              >
                <i className="fas fa-tachometer-alt fa-fw me-3"></i><span>Main dashboard</span>
              </a>
              <a id="point" className="list-group-item list-group-item-action py-2 ripple" onClick={() => Divs("MyFriends")}>
                <i className="fas fa-chart-area fa-fw me-3"></i><span>Networking</span>
              </a>
              <div className="dropdown">
                <a id="point" className="dropdown-toggle list-group-item list-group-item-action py-2 ripple" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fas fa-chart-area fa-fw me-3"></i> <span>Knowledge Sharing</span>
                </a>
                <ul className="dropdown-menu">
                  <li><a id="point" className="dropdown-item list-group-item list-group-item-action py-2 ripple" onClick={() => Gotos("Articles")}><i className="fas fa-chart-area fa-fw me-3"></i>Articles</a></li>
                  <li><a id="point" className="dropdown-item list-group-item list-group-item-action py-2 ripple" onClick={() => Gotos("Blogs")}><i className="fas fa-tachometer-alt fa-fw me-3"></i>Blogs</a></li>
                  <li><a id="point" className="dropdown-item list-group-item list-group-item-action py-2 ripple" onClick={() => Gotos("Project Insights")}><i className="fas fa-chart-area fa-fw me-3"></i>Project Insights</a></li>
                </ul>
              </div>
            </div>
          </div>
        </nav><br /><br />
        <nav id="main-navbar" className="navbar navbar-expand-lg navbar-light bg-white fixed-top border border-dark bg-primary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img
                src={cybage}
                width="70px"
                alt="MDB Logo"
                loading="lazy"
              />
            </a>

            <div className="d-none d-md-flex input-group w-auto my-auto">

              <input
                className="form-control rounded"
                value={userSearch}
                onChange={(e) => SearchFunction(e.target.value)}
                placeholder='Search for Connections'
                id="search"
              />
              <Notification username={username} />
            </div>

            <a id="point" onClick={UserLogout}>Logout</a>
          </div>
        </nav>
      </header>
      <main>
        <div className="container pt-4" id="mainDiv">

          {displaydiv === "Home" && (
            <nav id="HeaderMenu" >
              <div className="position-sticky shadow">
                <div className=" list-group list-group-flush mx-3 mt-1" id="homestats">
                  <a id="point" onClick={() => userFriendsArticles()} className="list-group-item list-group-item-action py-2 ripple">
                    <i className="fas fa-lock fa-fw me-3"></i><span>Articles</span>
                  </a>
                  <a id="point" onClick={() => userFriendsBlogs()} className="list-group-item list-group-item-action py-2 ripple" aria-current="true">
                    <i className="fas fa-tachometer-alt fa-fw me-3"></i><span>Blogs</span>
                  </a>
                  <a id="point" onClick={() => userFriendsProjects()} className="list-group-item list-group-item-action py-2 ripple">
                    <i className="fas fa-chart-area fa-fw me-3"></i><span>Project Insights</span>
                  </a>
                </div>
              </div>
            </nav>
          )}
          {userPostData == "Article" && (
            <> <center>
              <Container>
                {friendsArticles.map((blog) => (
                  <>
                    <Card>
                      <Header>
                        <Avatar src={img} sx={{ width: 40, height: 40, marginRight: 12 }} />
                        <div>
                          <AuthorInfo>
                            <AuthorName>{blog.userName}</AuthorName>
                            <span>·</span>
                            <span>Published on {blog.publishedDate}</span>
                          </AuthorInfo>
                        </div>
                      </Header>
                      <Title>{blog.articleTitle}</Title>
                      <Content>
                        <p>
                          {blog.content}
                        </p>
                      </Content>
                      <div className="d-flex justify-content-start align-items-center">
                        <>
                          {likedData.map(Element => (
                            <React.Fragment key={Element.Id}>
                              {blog.articleId === Element.Id ? (
                                Element.connectionStatus === 1 ? (
                                  <div >
                                    <Button variant="outlined" color="error" onClick={() => unLikePosts(blog.articleId, 0, 0, username)}>
                                      <i className="bi bi-heart-fill"></i>
                                    </Button></div>

                                ) : (
                                  <div >
                                    <Button variant="outlined" color="inherit" onClick={() => Likeposts(blog.articleId, 0, 0, username)}>
                                      <i className="bi bi-heart"></i>
                                    </Button>
                                  </div>
                                )
                              ) : ''
                              }
                            </React.Fragment>
                          ))}
                          <span id="point2" onClick={() => LikesList(blog.articleId, 0, 0)}>{blog.likes}</span>
                          <div >
                            <Button variant="outlined" color="info" onClick={() => createComment(blog.articleId, 0, 0)}>
                              <i className="bi bi-chat"></i>
                            </Button>
                          </div>
                        </>
                        <span id="point2" onClick={() => CommentsList(blog.articleId, 0, 0)}>{blog.comments}</span>
                      </div>
                    </Card>
                  </>
                ))}
              </Container>
            </center>
            </>
          )}
          {userPostData === "Blog" && (
            <BlogContainer>
            {friendsBlogs.map((blog) => (
                <BlogPostCard>
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
                    </div>
                
                    <div className="d-flex justify-content-start align-items-center">
                      {likedData.map(Element => (
                        <React.Fragment key={Element.Id}>
                          {blog.blogId === Element.Id ? (
                            Element.connectionStatus === 1 ? (
                              <div className='bloglikes'>
                                <Button variant="outlined" color="error" onClick={() => unLikePosts(0, blog.blogId, 0, username)}>
                                  <i className="bi bi-heart-fill"></i>
                                </Button>
                              </div>
                            ) : (
                              <div  className='bloglikes'>
                                <Button variant="outlined" color="inherit" onClick={() => Likeposts(0, blog.blogId, 0, username)}>
                                  <i className="bi bi-heart"></i>
                                </Button>
                              </div>
                            )
                          ) : ''
                          }
                        </React.Fragment>
                      ))}
                      <span id="point2" onClick={() => LikesList(0, blog.blogId, 0)}>{blog.likes}</span>
                      <div className="ml-2">
                        <Button variant="outlined" color="info" onClick={() => createComment(0, blog.blogId, 0)}><i className="bi bi-chat" ></i></Button>
                      </div>
                      <span id="point2" onClick={() => CommentsList(0, blog.blogId, 0)}>{blog.comments}</span>
                    </div>
                </BlogPostCard>
                ))}
            </BlogContainer>
          )}

          {userPostData === "Project Insight" && (
              <ProjectContainer>
                {friendsProjects.map((project) => (
                  <ProjectCard>
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
                    <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '20px' }}>
                    </div>


                    <div className="d-flex justify-content-start align-items-center">
                      <>
                        {likedData.map(Element => (
                          <React.Fragment key={Element.Id}>
                            {project.projectInsightId === Element.Id ? (
                              Element.connectionStatus === 1 ? (
                                <div className="mr-2">
                                  <Button variant="outlined" color="error" onClick={() => unLikePosts(0, 0, project.projectInsightId, username)}>
                                    <i className="bi bi-heart-fill"></i>
                                  </Button></div>
                              ) : (
                                <div className="mr-2">
                                  <Button variant="outlined" color="inherit" onClick={() => Likeposts(0, 0, project.projectInsightId, username)}>
                                    <i className="bi bi-heart"></i>
                                  </Button></div>
                              )
                            ) : ''
                            }
                          </React.Fragment>
                        ))}
                        <span id="point2" onClick={() => LikesList(0, 0, project.projectInsightId)}>{project.likes}</span>
                        <div className="ml-2">
                          <Button variant="outlined" color="info" onClick={() => createComment(0, 0, project.projectInsightId)}><i className="bi bi-chat"></i></Button>
                        </div>
                        <span id="point2" className='p-2' onClick={() => CommentsList(0, 0, project.projectInsightId)}>{project.comments}</span>
                      </>
                    </div>
                  </ProjectCard>
                ))}
              </ProjectContainer>
          )}


          {showList && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h4>Liked By:</h4>
                <button className="close-btn" onClick={() => setShowList(false)}>Close</button>
                {list.map((item) => (
                  <div key={item.userId}>
                    {item.userName}
                  </div>
                ))}
              </div>
            </div>
          )}



          {showCommentList && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h4>Comments</h4>
                <button className="close-btn" onClick={() => setShowCommentList(false)}>Close</button>
                {commentList.map((item) => (
                  <div key={item.id} className="comment-container">
                    <div className="comment-text">
                      <b>Name:</b> {item.userName}<br />
                      <b>Comment:</b> {item.comment}
                      <Button onClick={()=>deleteComment(item.id)} startIcon={<DeleteIcon />}></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}




          {commentForm && (
            <>
              <div className="modal-overlay">
                <div className="modal-content">
                  <button className="close-btn" onClick={() => setCommentForm(false)}>Close</button><br />
                  <input type="text" value={comment} onChange={e => setComment(e.target.value)} placeholder='Write Comment here' /><br />
                  <button className="btn btn-success" onClick={() => Commentposts(commentAid, commentBid, commentPid, comment)}>Comment</button>
                </div>
              </div>
            </>
          )}


          {displaydiv === "Dash" && <DashBoard username={username} />}

          {showAllFriends && (
            <div className="row">
              {searchForFriends.map(profile => (
                <div className="col-md-4 mb-4" key={profile.userId}>
                  <div className="card shadow">
                    <div className='pt-3 d-flex flex-column justify-content-center align-items-center'>
                      <img
                        src={img}
                        className="card-img-top rounded-circle"
                        alt="Profile Image"
                        style={{ maxWidth: '150px', maxHeight: '150px', objectFit: 'cover' }}
                      />
                      <h5 className="card-title">{profile.userName}</h5>
                    </div>
                    <div className="card-body">
                      <p className="card-text"><b>UserId: </b>{profile.userId}</p>
                      <p className="card-text"><b>Full Name: </b>{profile.fullName}</p>
                      <p className="card-text"><b>Email: </b>{profile.email}</p>
                      <>
                        {connectionWithFriend.map(Element => {
                          return (
                            profile.userName === Element.friendName ? (
                              Element.connectionStatus === 1 ? (
                                <button className="btn btn-primary" disabled>Already Connected</button>
                              ) : Element.connectionStatus === 2 ? (
                                <button className="btn btn-secondary">Pending</button>
                              ) : (
                                <button className="btn btn-primary" onClick={() => sendRequest(profile.userName)}>Get Connection</button>
                              )
                            ) : ''
                          );
                        })}
                      </>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {displaydiv === "MyFriends" && <Networking username={username} />}
          {displaydiv === "KnowledgeSharing" && <KnowledgeSharing username={username} share={data} />}
        </div>
      </main>
    </>
  )
}
export default Welcome;
