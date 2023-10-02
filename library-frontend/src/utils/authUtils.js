import axios from "axios";
import { redirect } from "react-router-dom";

import { ACCESS_TOKEN, REFRESH_TOKEN, LIBRARIAN_ROLE, URL } from "../constants";

export const refreshJwtToken = async (refreshToken) => {
  try {
    const response = await axios.post(`${URL}/api/user/refresh/`, {
      refresh: refreshToken,
    });

    if (response.status !== 200) {
      throw new Error("Token refresh failed");
    }

    const data = response.data;
    localStorage.setItem(ACCESS_TOKEN, data.access);

    return data.access;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN);
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
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (refreshToken) {
      refreshJwtToken(refreshToken)
        .then((newAccessToken) => {
          localStorage.setItem(ACCESS_TOKEN, newAccessToken);
          return true;
        })
        .catch((error) => {
          console.error("Token refresh error:", error);
          return false;
        });
    }
    console.error("Refresh token not found");
    redirect("/login");
    return false;
  }
  return true;
};

export const isLibrarian = () => {
  return localStorage.getItem(LIBRARIAN_ROLE);
};
