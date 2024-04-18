import { useEffect, useState } from "react"
import { User } from "../Models/User"
import { GetUserDetails, UpdateUserDetails } from "../Services/DashBoardService";

export function DashBoard({username}:{username:string}){
    const [user, setUser] = useState<User[]>([]);
    const [updateEmail, setUpdateEmail] = useState('');
    const [updateFullName, setUpdateFullName] = useState('');
    const [updateMobileNumber, setUpdateMobileNumber] = useState<number>(0);
    const [updatePassword, setUpdatePassword] = useState('');
    const [updateUserId, setUpdateUserId] = useState<number>();
    const [updateUserName, setUpdateUserName] = useState('');
    const [profileDetails, setProfileDetails] = useState(false);

    useEffect(()=>{
        Display();
    })
    async function Display() {
        const response=await GetUserDetails(username);
        setUser(response);
      }
    function UpdateDetails() {
        setUpdateUserId(user[0].userId);
        setUpdateUserName(user[0].userName);
        setUpdatePassword(user[0].userPassword);
        setUpdateMobileNumber(user[0].mobileNumber);
        setUpdateFullName(user[0].fullName)
        setUpdateEmail(user[0].email);
        setProfileDetails(true);
      }
      async function SubmitUpdateDetails() {
        try {
          const response=await UpdateUserDetails(updateFullName,updateUserName,updatePassword,updateEmail,updateMobileNumber)
          if(response.data!="success"){
            alert(response.data);
          }
          else{
            Display();
            setProfileDetails(false);
          } 
        } catch (error) {
          console.error("Error updating profile:", error);
        }
      }
return(
    <>
            {user.map((ProfileData) => (
              <div className="card shadow">
                <div className="card-body">
                  <h5 className="card-title"><b><i>UserName: </i></b>{ProfileData.userName}</h5>
                  <br />
                  <p className="card-text"><b>UserId: </b>{ProfileData.userId}</p>
                  <p className="card-text"><b>Full Name: </b>{ProfileData.fullName}</p>
                  <p className="card-text"><b>Mobile Number: </b>{ProfileData.mobileNumber}</p>
                  <p className="card-text"><b>Email: </b>{ProfileData.email}</p>
                  <button className='btn btn-success' onClick={() => UpdateDetails()}>Update details</button>
                </div>
              </div>
            ))}

            {profileDetails && (
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Profile Data</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setProfileDetails(false)}></button>
                </div>
                <form className="modal-body">
                  <label htmlFor="updateUserId">UserID</label>
                  <input type="text" value={updateUserId} disabled />
                  <label htmlFor="updateUserName">UserName</label>
                  <input type="text" value={updateUserName} disabled />
                  <label htmlFor="updateFullName">FullName</label>
                  <input type="text" value={updateFullName} onChange={e => setUpdateFullName(e.target.value)} />
                  <label htmlFor="updateEmail">Email</label>
                  <input type="text" value={updateEmail} onChange={e => setUpdateEmail(e.target.value)} />
                  <label htmlFor="updateMobileNumber">Mobile Number</label>
                  <input type="number" value={updateMobileNumber} onChange={e => setUpdateMobileNumber(parseInt(e.target.value))} />
                  <label htmlFor="updatePassword">Password</label>
                  <input type="text" value={updatePassword} onChange={e => setUpdatePassword(e.target.value)} />
                  <button type="button" className="btn btn-primary" onClick={() => SubmitUpdateDetails()}>Save changes</button>
                </form>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setProfileDetails(false)}>Close</button>
                </div>
              </div>
            </div>
          )}
          </>
)
}