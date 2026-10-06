import { paymentActions } from "./payment-slice";
import { axiosInstance } from "../../utils/axios";

export const initiateCheckoutSession = (paymentData) => async (dispatch) => {
  try {
    dispatch(paymentActions.getCheckoutRequest());
    const response = await axiosInstance.post(
      "/v1/rent/user/booking/create-order",
      paymentData
    );

    if (!response.data?.success) {
      throw new Error("Failed to initiate checkout session");
    }
    dispatch(paymentActions.getCheckoutSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(
      paymentActions.getError(error.response?.data?.message || error.message)
    );
    throw error;
  }
};

export const verifyPayment = (verifyData) => async (dispatch) => {
  try {
    dispatch(paymentActions.getVerifyRequest());
    const response = await axiosInstance.post(
      "/v1/rent/user/booking/verify-payment",
      verifyData
    );

    if (!response.data?.success) {
      throw new Error("Failed to verify payment");
    }
    dispatch(paymentActions.getVerifySuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(
      paymentActions.getError(error.response?.data?.message || error.message)
    );
    throw error;
  }
};
