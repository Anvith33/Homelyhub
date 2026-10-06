import { axiosInstance } from "../../utils/axios";
import {
  setBookingDetails,
  setBookingError,
  setBookingRequest,
  setBookings,
} from "./booking-slice";

//fetch booking details
export const fetchBookingDetails = (bookingId) => async (dispatch) => {
  dispatch(setBookingRequest());
  try {
    const response = await axiosInstance.get(
      `/v1/rent/user/booking/${bookingId}`
    );
    dispatch(setBookingDetails(response.data.data.bookings));
  } catch (error) {
    dispatch(
      setBookingError(
        error.response?.data?.message || "Could not load booking details"
      )
    );
  }
};

//fetch user bookings
export const fetchUserBookings = () => async (dispatch) => {
  dispatch(setBookingRequest());
  try {
    const response = await axiosInstance.get("/v1/rent/user/booking");
    dispatch(setBookings(response.data.data.bookings));
  } catch (error) {
    dispatch(
      setBookingError(
        error.response?.data?.message || "Could not load your bookings"
      )
    );
  }
};
