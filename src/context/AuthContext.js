import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token") || "");
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refresh_token") || "");

  // Function to log in
  const login = async (username, password) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        username,
        password,
      });

      const { access, refresh } = response.data;
      setAccessToken(access);
      setRefreshToken(refresh);
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      setUser({ username });

      return true;
    } catch (error) {
      console.error("Login failed", error.response?.data);
      return false;
    }
  };

  // Function to log out
  const logout = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/logout/", { refresh_token: refreshToken });
    } catch (error) {
      console.error("Logout failed", error.response?.data);
    } finally {
      setAccessToken("");
      setRefreshToken("");
      setUser(null);
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
  };

  // Function to refresh the access token
  const refreshAccessToken = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
        refresh: refreshToken,
      });
      setAccessToken(response.data.access);
      localStorage.setItem("access_token", response.data.access);
    } catch (error) {
      console.error("Token refresh failed", error.response?.data);
      logout(); // Log out if refresh fails
    }
  };

  // Automatically refresh token before it expires (every 4 minutes)
  useEffect(() => {
    const interval = setInterval(() => {
      if (refreshToken) refreshAccessToken();
    }, 240000); // 4 minutes

    return () => clearInterval(interval);
  }, [refreshToken]);

  return (
    <AuthContext.Provider value={{ user, login, logout, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
