import { userActions } from "./user-slice";
import { axiosInstance } from "../../utils/axios";

export const getSignup = (user) => async (dispatch) => {
  try {
    dispatch(userActions.getSignupRequest());
    const { data } = await axiosInstance.post("/v1/rent/user/signup", user);
    dispatch(userActions.getSignupDetails(data.user));
  } catch (error) {
    dispatch(userActions.getError(error.response?.data?.message || "Signup failed"));
  }
};

export const getLogin = (user) => async (dispatch) => {
  try {
    dispatch(userActions.getLoginRequest());
    const { data } = await axiosInstance.post("/v1/rent/user/login", user);
    dispatch(userActions.getLoginDetails(data.user));
  } catch (error) {
    dispatch(userActions.getError(error.response?.data?.message || "Login failed"));
  }
};

export const getlogin = getLogin;

export const currentUser = () => async (dispatch) => {
  try {
    dispatch(userActions.getCurrentRequest());
    const { data } = await axiosInstance.get("/v1/rent/user/me");
    dispatch(userActions.getCurrentUser(data.user));
  } catch {
    dispatch(userActions.getLogout(null));
  }
};

export const updateUser = (updatedUser) => async (dispatch) => {
  try {
    dispatch(userActions.getUpdateUserRequest());
    await axiosInstance.patch("/v1/rent/user/updateMe", updatedUser);
    const { data } = await axiosInstance.get("/v1/rent/user/me");
    dispatch(userActions.getCurrentUser(data.user));
  } catch (error) {
    dispatch(userActions.getError(error.response?.data?.message || "Update failed"));
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    await axiosInstance.post("/v1/rent/user/forgotPassword", { email });
  } catch (error) {
    dispatch(userActions.getError(error.response?.data?.message || "Could not reset password"));
  }
};

export const resetPassword = (passwords, token) => async (dispatch) => {
  try {
    await axiosInstance.patch(`/v1/rent/user/resetPassword/${token}`, passwords);
  } catch (error) {
    dispatch(userActions.getError(error.response?.data?.message || "Password reset failed"));
  }
};

export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch(userActions.getPasswordRequest());
    await axiosInstance.patch("/v1/rent/user/updateMyPassword", passwords);
    dispatch(userActions.getPasswordSuccess(true));
  } catch (error) {
    dispatch(userActions.getError(error.response?.data?.message || "Password update failed"));
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axiosInstance.get("/v1/rent/user/logout");
    dispatch(userActions.getLogout(null));
  } catch (error) {
    dispatch(userActions.getError(error.response?.data?.message || "Logout failed"));
  }
};