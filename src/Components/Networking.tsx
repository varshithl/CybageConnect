import { useEffect, useState } from "react";
import { DeleteConnectionOfFriend, GetMyFriends } from "../Services/GetMyFriends";
import { UserConnetions } from "../Models/UserConnections";
import img from '../img/no_profile_pic.jpg';

export function Networking({username}:{username:string}){
    
  const [connections, setConnections] = useState<UserConnetions[]>([]);
  useEffect(()=>{
    MyFriends();
  })
    async function MyFriends() {
        const res=await GetMyFriends(username);
          setConnections(res);
        }
      async function DeleteConnection(friendId: number) {
        {
          var response=await DeleteConnectionOfFriend(username,friendId);
          if (response === true) {
            setConnections(connections.filter(e => e.userId !== friendId));
          }
        }
      }
    return(
        (
            <div className="row">
              {connections.map((profile) => (
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
                      <button className="btn btn-danger" onClick={() => DeleteConnection(profile.userId)}>Remove Connection</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
    )
}