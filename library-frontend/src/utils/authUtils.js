import axios from "axios";
import { redirect } from "react-router-dom";

// Function to refresh the JWT token
export const refreshJwtToken = async (refreshToken) => {
  try {
    const response = await axios.post("/api/user/refresh/", {
      refresh: refreshToken,
    });

    if (!response.status === 200) {
      // Handle the error here (e.g., show an error message to the user)
      throw new Error("Token refresh failed");
    }

    const data = response.data;

    // Store the new access token in your client's storage (e.g., localStorage)
    localStorage.setItem("access_token", data.access);

    return data.access; // Return the new access token
  } catch (error) {
    // Handle network errors or other issues
    console.error("Error refreshing token:", error);
    throw error;
  }
};

// Function to get the access token from client's storage
export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

// Function to check if the access token is expired
export const isAccessTokenExpired = () => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    return true; // Access token is not present
  }

  try {
    const payload = JSON.parse(atob(accessToken.split(".")[1]));
    const tokenExpiration = payload.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();

    return tokenExpiration < currentTime;
  } catch (error) {
    return true; // Error parsing token or invalid token
  }
};

export const isTokenVaild = () => {
    if (!getAccessToken()){
        return false
    }
    else if (isAccessTokenExpired()) {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          refreshJwtToken(refreshToken)
            .then(newAccessToken => {
                localStorage.setItem("access_token", newAccessToken);
                return true;
            })
            .catch(error => {
              console.error('Token refresh error:', error);
              return false;
            });
        } else {
          // Handle the case when there's no refresh token (e.g., redirect to login)
          console.error('Refresh token not found');
          return false;
          // You might want to redirect the user to the login page or handle the error appropriately
        }
    }
}
