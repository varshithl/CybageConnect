
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Register } from "../Services/RegistrationService";
import Swal from 'sweetalert2';

function Registration(){
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState(0);
  const [errors, setErrors] = useState({
    fullname: '',
    name: '',
    password: '',
    email: '',
    mobilenumber: ''
  });

  const handleRegistration = async () => {
    try {
      const response=await Register(fullName, userName, userPassword, email, mobileNumber);
      if(response!="success"){
        Swal.fire({
          icon: 'error',
          title: 'Not Success', // You might need to adjust this based on the response from your API
          showConfirmButton: false,
          timer: 1500 // Automatically close after 1.5 seconds
        });
      }else{
        navigate('/');
      }
    } catch (error) {
      toast.error("Registration Unsuccessful");
    }
  };

  const handleValidation = () => {
    const newErrors = {
      fullname: '',
      name: '',
      password: '',
      email: '',
      mobilenumber: ''
    };
    let status = true;

    if (!fullName) {
      newErrors.fullname = "FullName is Required";
      status = false;
    }
    if (!userName) {
      newErrors.name = "UserName is Required";
      status = false;
    }
    if (!userPassword) {
      newErrors.password = "Password is Required";
      status = false;
    }
    if (!email) {
      newErrors.email = "Email is Required";
      status = false;
    }
    if (!mobileNumber || mobileNumber.toString().length !== 10) {
      newErrors.mobilenumber = "Invalid Mobile Number and must be 10";
      status = false;
    }

    setErrors(newErrors);
    if (status) {
      handleRegistration();
    }
  };


  
return (
    <section className="vh-100" style={{backgroundColor:"lightblue"}}>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{borderRadius: "25px"}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-4 mx-1 mx-md-4 mt-4">Registration</p>

                <form className="mx-1 mx-md-4">

                  <div className="d-flex flex-row align-items-center mb-1">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" value={fullName} onChange={(e)=>setFullName(e.target.value)} className="form-control" />
                      {(errors.fullname.length===0)?<label className="form-label" htmlFor="FullName">FullName</label>:
                      <p style={{color:"red"}}>{errors.fullname}</p>}
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-1">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" value={userName} onChange={(e)=>setUserName(e.target.value)} className="form-control" />
                      {
                        (errors.name.length===0)?(<label className="form-label" htmlFor="Username">UserName</label>): (
                        <p style={{color:"red"}}>{errors.name}</p>)
                      }
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-1">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" value={userPassword} onChange={(e)=>setUserPassword(e.target.value)} className="form-control" />
                      {(errors.password.length===0)?<label className="form-label" htmlFor="UserPassword">Password</label>:
                      <p style={{color:"red"}}>{errors.password}</p>}
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-1">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" />
                      {(errors.email.length===0)?<label className="form-label" htmlFor="Email">Email</label>:
                      <p style={{color:"red"}}>{errors.email}</p>}
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-1">
                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="MobileNumber" value={mobileNumber} onChange={(e)=>setMobileNumber(parseInt(e.target.value))} className="form-control" />
                      {(errors.mobilenumber.toString().length===0)?<label className="form-label" htmlFor="MobileNumber">MobileNumber</label>:
                      <p style={{color:"red"}}>{errors.mobilenumber}</p>}
                    </div>
                  </div>

                  <div className="d-flex justify-content-center mx-4 mb-2 mb-lg-4">
                    <button type="button" onClick={handleValidation} className="btn btn-primary btn-lg">Register</button>
                  </div>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Already have an account? <Link to="/" className="link-Primary">Login</Link>
                </p>
                </form>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  className="img-fluid" alt="Sample image"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

);
}
export default Registration;