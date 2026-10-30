import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/requestSlice'

const Requests = () => {
  const dispatch = useDispatch()
  const requests = useSelector((store) => store.requests)
  // const [showButtons, setShowButton] = useState(true)

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  }

const fetchRequests = async () => {
  try{
const res = await axios.get(BASE_URL + "/user/requests/received", {withCredentials: true} )
dispatch(addRequests(res?.data?.data))
  }
  catch(err) {
    console.log(err) 
  }
}

useEffect(() => {
  fetchRequests()
}, [])

 if (!requests) return;

  if (requests.length == 0) return <h1 className='flex justify-center my-10'>No Request Found!!!</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-3xl text-white">Connection Request</h1>

      {requests.map((request, index) => {
const {firstName, lastName, emailId} = request.fromUserId

        return (
          <div key={index} className="flex m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto justify-between items-center">
            <div>
              <img
                alt="userPhoto"
                className="w-20 h-20 rounded-full"
                src={
                  "https://as1.ftcdn.net/jpg/08/98/19/02/1000_F_898190256_GYkLbb1doT7DZ5ryqVfkffT1yN2uTuoF.jpg"
                }
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
              <p>{emailId}</p>
              <p>{'Default about section as its not added'}</p>
            </div>
            <div>
              <button className="btn btn-primary mx-2" 
              onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
              <button className="btn btn-secondary mx-2"
               onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Requests