//managing booking
// store all bookings
// store individual booking details
// track api loading status
// add new booking when a booking is created
// updating the booking data when we receive it from the backend



import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
  bookingDetails: null,
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name:"booking",
  initialState,
  reducers:{
    setBookingRequest(state) {
      state.loading = true;
      state.error = null;
    },
    setBookings(state, action) {
      state.bookings = action.payload;
      state.loading = false;
    },
    addBooking(state, action) {
      state.bookings.push(action.payload);
    },
    setBookingDetails(state, action) {
      state.bookingDetails = action.payload;
      state.loading = false;
    },
    setBookingError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setBookingRequest,
  setBookings,
  addBooking,
  setBookingDetails,
  setBookingError,
} = bookingSlice.actions;
export default bookingSlice;