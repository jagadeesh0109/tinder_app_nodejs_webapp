import React, { useState } from 'react'
import Usercard from './Usercard'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Editprofile = ({user}) => {
   
const [firstName, setfirstName] = useState(user.firstName)
const [lastName, setlastName] = useState(user.lastName)
const [emailId, setEmail] = useState(user.emailId)
const [error, setError] = useState("")
const dispatch = useDispatch()
const [showToast, setshowToast] = useState(false)

const saveProfile = async () => {
  try {
    const res = await axios.patch(
      BASE_URL + "/profile/edit",
      {
        firstName,
        lastName,
      },
      {
        withCredentials: true,
      },
    );
    
    dispatch(addUser(res?.data?.data))
    setshowToast(true)
    setTimeout(() =>{
    setshowToast(false)
    },3000)
  } catch (err) {
    setError(err.data);
  }
};

  return (
    <>
    <div className="flex justify-center my-10">
      <div className="card bg-base-100 w-96 shadow-sm mx-10">
      <div className="card-body">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border">
          <div className="fieldset-legend font-black text-xl flex justify-center">
            Edit Profile
          </div>

          <label className="label p-[10px]">FirstName</label>
          <input
            type="text"
            value={firstName}
            className="input w-full"
            placeholder="Enter first name"
            onChange={(e) => setfirstName(e.target.value)}
          />

           <label className="label p-[10px]">Last Name</label>
          <input
           type = "text" 
            value={lastName}
            className="input w-full"
            placeholder="Enter last name"
            onChange={(e) => setlastName(e.target.value)}
          />

        
          <p className="text-red-600">{error}</p>
          <div className="flex justify-center">
            <button className="btn btn-primary mt-5 mb-5" onClick={saveProfile}>
              Update Profile
            </button>
          </div>
        </fieldset>
      </div>
    </div>
<Usercard user={{firstName, lastName, emailId}} />
    </div>
    
{showToast && (<div className="toast toast-top toast-center">
  <div className="alert alert-info">
    <span>Profile updated successfully!!!.</span>
  </div>
  
</div>)}
</>
  )
}

export default Editprofile