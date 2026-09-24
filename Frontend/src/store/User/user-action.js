import { userActions } from "./user-slice.js";
import {axiosInstance} from "../../utils/axios";

//signup
export const getSignup =(user) => async(dispatch)=>{
  try{
    dispatch(userActions.getSignupRequest());
    const {data} = await axiosInstance.post("/v1/rent/user/signup",user);
    dispatch(userActions.getSignupDetails(data.user))
  }
  catch(error){
    dispatch(userActions.getError(error.response.data.message))

  }
}

//login
export const getlogin=(user) => async(dispatch) => {
  try{
    dispatch(userActions.getLoginRequest());
    const {data} = await axiosInstance.post("/v1/rent/user/login",user);
    dispatch(userActions.getLoginDetails(data.user))

  }
  catch(error){
    dispatch(userActions.getError(error.response.data.message))
  }
}

export const currentUser =() =>async(dispatch) =>{
  try{
    dispatch(userActions.get)
  }
  catch(error){

  }
}