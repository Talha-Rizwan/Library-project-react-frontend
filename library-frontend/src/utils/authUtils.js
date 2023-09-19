import axios from "axios";
import { redirect } from "react-router-dom";

export const refreshJwtToken = async (refreshToken) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/user/refresh/",
      {
        refresh: refreshToken,
      }
    );

    if (response.status !== 200) {
      throw new Error("Token refresh failed");
    }

    const data = response.data;
    localStorage.setItem("access_token", data.access);

    return data.access;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};

export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

export const isAccessTokenExpired = () => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    return true;
  }

  try {
    const payload = JSON.parse(atob(accessToken.split(".")[1]));
    const tokenExpiration = payload.exp * 1000;
    const currentTime = Date.now();

    return tokenExpiration < currentTime;
  } catch (error) {
    return true;
  }
};

export const isTokenVaild = () => {
  if (!getAccessToken()) {
    return false;
  } else if (isAccessTokenExpired()) {
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken) {
      refreshJwtToken(refreshToken)
        .then((newAccessToken) => {
          localStorage.setItem("access_token", newAccessToken);
        })
        .catch((error) => {
          console.error("Token refresh error:", error);
          return false;
        });
      return true;
    }
    console.error("Refresh token not found");
    redirect("/login");
    return false;
  }
  return true;
};
