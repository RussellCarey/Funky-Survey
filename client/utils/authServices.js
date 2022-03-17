import axios from "axios";
import { serverUrl } from "./serverURL";

export const login = async (email, password) => {
  try {
    const login = await axios.request({
      method: "POST",
      withCredentials: true,
      credentials: "include",
      url: `${serverUrl}/api/users/login/`,
      data: {
        email,
        password,
      },
    });

    console.log(login);
    return login;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

export const checkIfUserLoggedIn = async (req) => {
  try {
    // Check we are logged in..
    const check = await axios.post(`${serverUrl}/api/users/isloggedin/`, {
      withCredentials: true,
      credentials: "include",
      data: {
        token: req.cookies.jwt,
      },
    });

    if (!check || check.data.status !== "success") return { status: "fail" };

    return {
      status: check.data.status,
      username: check.data.user.username,
      id: check.data.user._id,
      jwt: req.cookies.jwt,
    };
  } catch (error) {
    console.log(error.response);
    return { status: "fail" };
  }
};

export const logoutUser = async (email, password) => {
  const logout = await axios.request({
    method: "POST",
    withCredentials: true,
    credentials: "include",
    url: `${serverUrl}/api/users/logout/`,
  });

  return logout.data;
};

export const signupUser = async (userdata) => {
  try {
    const signup = await axios.request({
      method: "POST",
      withCredentials: true,
      credentials: "include",
      url: `${serverUrl}/api/users/signup/`,
      data: {
        userdata,
      },
    });

    return signup;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};
