import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [isLoginForm, setIsLoginForm] = useState(true)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL+"/login", {
        emailId,
        password,
      },
       {withCredentials: true}
    
    );
    //calling the action by dispatching the action
    dispatch(addUser(res.data))
    navigate("/")
    } catch (err) {
      
      setError(err?.response?.data || "Login failed");
    }
  };

  const handleSignUp = async () => {
    try{
const res = await axios.post(BASE_URL + "/signup", {firstName, lastName, emailId, password}, {withCredentials: true})
dispatch(addUser(res?.data?.data))
return navigate("/profile")
    }
    catch(err) {
      setError(err?.response?.data || "something went wrong")
    }
  }

  useEffect(() => {
  }, [emailId]);

  return (
    <div className="card bg-base-100 w-96 shadow-sm mx-auto">
      <div className="card-body">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <div className="fieldset-legend font-black text-xl flex justify-center">
           {isLoginForm? "Login" : "SignUp Form"}
          </div>


   {!isLoginForm && <><label className="label p-[10px]">First Name</label>
          <input
            type="text"
            value={firstName}
            className="input w-full"
           // placeholder="Enter first Name"
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label className="label mt-5 p-[10px]">Last Name</label>
          <input
            type="text"
            value={lastName}
            className="input w-full"
           // placeholder="Enter lastname"
            onChange={(e) => setLastName(e.target.value)}
          />
          </>
          }
         

          <label className="label p-[10px]">Email</label>
          <input
            type="email"
            value={emailId}
            className="input w-full"
           // placeholder="Email"
            onChange={(e) => setEmailId(e.target.value)}
          />

          <label className="label mt-5 p-[10px]">Password</label>
          <input
            type="password"
            value={password}
            className="input w-full"
           // placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-red-600">{error}</p>
          <div className="flex justify-center">
            <button className="btn btn-neutral mt-5" onClick={isLoginForm? handleLogin: handleSignUp}>
              {isLoginForm? "Login" : "Sign Up"}
            </button>
          </div>
          <p className="my-5 cursor-pointer text-center" onClick={() => setIsLoginForm((value) => !value)}>
            {isLoginForm ? "New User? SignUp Here" : "Existing User? Login Here"}
          </p>
        </fieldset>
      </div>
    </div>
  );
};

export default Login;
