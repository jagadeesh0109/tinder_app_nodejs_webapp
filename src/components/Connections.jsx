import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connection = useSelector((store) => store.connections);
  console.log("ln9-", connection);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res?.data?.data);
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log("err-", err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connection) return;

  if (connection.length == 0) return <h1>No connection Available!!!</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-3xl text-white">Connections</h1>

      {connection.map((connection, index) => {
const {firstName, lastName, emailId} = connection

        return (
          <div key={index} className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
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
          </div>
        );
      })}
    </div>
  );
};

export default Connections;

//https://as1.ftcdn.net/jpg/08/98/19/02/1000_F_898190256_GYkLbb1doT7DZ5ryqVfkffT1yN2uTuoF.jpg
