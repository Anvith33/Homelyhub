import { propertyAction } from "./propert-slice";
import { axiosInstance } from "../../utils/axios";

//get all properties
//1. start api req
//2. tell redux loading started
//4. call backend api
//5.wait for response
//6. get the property data
//7.send data to redux store
//8.if error occurs send error to redux

//dispatch means send to redux
//getstate means get from redux

export const getAllProperties = () => async (dispatch, getState) => {
  try {
    console.log("API call started");

    dispatch(propertyAction.getRequest());

    const { searchParams } = getState().properties;

    console.log(searchParams);

    const response = await axiosInstance.get("/v1/rent/listing", {
      params: { ...searchParams },
    });

    if (!response) {
      throw new Error("could not fetch any properties");
    }
    const { data } = response;
    console.log(data);

    dispatch(propertyAction.getProperties(data));

  } catch (error) {
    dispatch(propertyAction.getErrors(error.message));
  }
}