//managing booking
// store all bookings
// store individual booking details
// track api loading status
// add new booking when a booking is created
// updating the booking data when we receive it from the backend



import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings:[],
  BookingDetails:{},
  loading:false
}

const bookinSlice = createSlice({
  name:"booking",
  initialState,
  reducers:{
    setNookingRequest(state){
      state.loading=true;
    },
    setBooking(state, action){
      state.bookingsooking= action.payload;
      state.loading=false
    },
    addBooking:(state,action)=>{
      state.bookings.push(action.payload);
    },
    setBookingDetails:(state, action)=>{
      state.bookingDetails=action.payloadload.bookings;
    }
  }
})

export const {setBookings, addBooking, setBookingDetails} = bookinSlice.actions;
export default bookinSlice;