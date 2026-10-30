import React from 'react'

const Usercard = ({user}) => {
    const {firstName, lastName, emailId} = user;
  return (
   <div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img
      src="src/assets/Cozy Pink Piglet.png" 
      alt="user name" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    <p>This is my Email Id , lets get in Touch {emailId}</p>
    <div className="card-actions justify-center my-4">
      <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-secondary">Interested</button>
    </div>
  </div>
</div>
  )
}

export default Usercard