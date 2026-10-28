import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("jaga@gmail.com");
  const [password, setPassword] = useState("jaga@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      console.error(err);
    }
  };

  useEffect(() => {
  }, [emailId]);

  return (
    <div className="card bg-base-100 w-96 shadow-sm mx-auto">
      <div className="card-body">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <div className="fieldset-legend font-black text-xl flex justify-center">
            Login
          </div>

          <label className="label p-[10px]">Email</label>
          <input
            type="email"
            value={emailId}
            className="input w-full"
            placeholder="Email"
            onChange={(e) => setEmailId(e.target.value)}
          />

          <label className="label mt-5 p-[10px]">Password</label>
          <input
            type="password"
            value={password}
            className="input w-full"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-center">
            <button className="btn btn-neutral mt-5" onClick={handleLogin}>
              Login
            </button>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default Login;
