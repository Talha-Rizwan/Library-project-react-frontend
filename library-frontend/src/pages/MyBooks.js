import React,{useState, useEffect} from "react";
import axios from "axios";
import { refreshJwtToken, getAccessToken, isAccessTokenExpired } from '../utils/authUtils';
import { useNavigate } from "react-router-dom";

const MyBooks = () => {
    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useState(getAccessToken());

    useEffect(() => {
    // Check if the access token is expired
    if (isAccessTokenExpired()) {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        refreshJwtToken(refreshToken)
          .then(newAccessToken => {
            setAccessToken(newAccessToken);
          })
          .catch(error => {
            console.error('Token refresh error:', error);
            navigate('/login')
          });
      } else {
        // Handle the case when there's no refresh token (e.g., redirect to login)
        console.error('Refresh token not found');
        // You might want to redirect the user to the login page or handle the error appropriately
      }
    }
  }, []);


  useEffect(() => {
    const token = accessToken;

  // Create a headers object with the Authorization header
  const headers = {
    'Authorization': `Bearer ${token}`,
  };
    axios
      .get(`http://127.0.0.1:8000/api/home/user-request/`,{
        headers: headers,
      })
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log("Error getting data!");
        console.error("Error data: ", error);
      });
  }, []);

  console.log("the token is : ", accessToken)

    return (
        <h1>Hello world</h1>
    )
}

export default MyBooks;
