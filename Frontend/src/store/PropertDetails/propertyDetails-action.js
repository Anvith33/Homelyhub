import { propertyDetailsAction } from "./propertyDetails-slice";
import { axiosInstance } from "../../utils/axios";

//fetch details of one specific property using its id

//recieve the property id
//start loading 
//call backend api
//wait for response
//get the property data
//store the details in redux
//if error store error in redux

export const getPropertyDetails = (id) => async (dispatch) => {
  try {
    dispatch(propertyDetailsAction.getListRequest());

    const response = await axiosInstance.get(`/v1/rent/listing/${id}`);

    if (!response?.data?.data) {
      throw new Error("could not fetch any propertyDetails");
    }

    const { data } = response.data;
    dispatch(propertyDetailsAction.getPropertyDetails(data));
  } catch (error) {
    const message = error?.response?.data?.message || error?.response?.data?.error || error.message;
    dispatch(propertyDetailsAction.getErrors(message));
  }
};