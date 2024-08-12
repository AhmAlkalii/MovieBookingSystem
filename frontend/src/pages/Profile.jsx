import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';



const Profile = () => {
  const { user } = useAuthContext();
  const [userdata, setuserData] = useState([])

  useEffect(() => {
    fetchUser()
  },[])

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/user/${user.theid}`);
      setuserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  


  return (
    <div>

        <div>
          <h4>First Name: {userdata.firstname}</h4>
          <h4>Last Name: {userdata.lastname}</h4>
          <h4>Email: {userdata.email}</h4>
        </div>
    </div>
  )
}

export default Profile