
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginProps } from "../Models/LoginUser";
import { LoginUser } from "../Services/LoginService";
import { useState } from "react";
import Swal from 'sweetalert2';

function Login({ setUsername }: LoginProps) {
  const [UserName, setUserName] = useState("");
  const [UserPassword, setUserPassword] = useState("");
  const [errors, setErrors] = useState({ name: '', password: '' });
  const navigate = useNavigate();
  async function handle() {
    try {
      const data = await LoginUser(UserName, UserPassword);
      if (data) {
        setUsername(UserName);
        localStorage.setItem('token',data['token']);
        navigate('./welcome');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Wrong Credentials', // You might need to adjust this based on the response from your API
        showConfirmButton: false,
        timer: 1500 // Automatically close after 1.5 seconds
      });
    }
  }
  function Check() {
    var status = true;
    const newErrors = { name: '', password: '' };
    if (UserName.length === 0) {
      newErrors.name = "Name is Required";
      console.log(newErrors.name);
      status = false;
    }
    if (UserPassword.length === 0) {
      newErrors.password = "Password is Required";
      status = false;
    }
    setErrors(newErrors);
    if (status) {
      setUsername(UserName);
      handle();
    }
  }

  return (
    <section className="vh-100" style={{ backgroundColor: "lightblue" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>
                    <form className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="text" value={UserName} onChange={(e) => setUserName(e.target.value)} className="form-control" />
                          {(errors.name.length === 0) ? <label className="form-label" htmlFor="Username">UserName</label> :
                            <p style={{ color: "red" }}>{errors.name}</p>}
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="password" value={UserPassword} onChange={(e) => setUserPassword(e.target.value)} className="form-control" />
                          {(errors.password.length === 0) ? <label className="form-label" htmlFor="UserPassword">Password</label> :
                            <p style={{ color: "red" }}>{errors.password}</p>}
                        </div>

                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="button" onClick={Check} className="btn btn-primary btn-lg">LogIn</button>
                      </div>
                      <p className="small fw-bold mt-2 pt-1 mb-0">
                        Don't have an account? <Link to="/register" className="link-danger">Register</Link>
                      </p>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid" alt="Sample image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>

  )
}
export default Login;