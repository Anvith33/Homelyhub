import { configureStore } from "@reduxjs/toolkit";
import propertySlice from "./Property/property-slice";
import propertyDetailsSlice from "./PropertDetails/propertyDetails-slice";
import userSlice from "./User/user-slice";
import bookingSlice from "./Booking/booking-slice";
import accommodationSlice from "./Accommodation/accommodation-slice";
import paymentSlice from "./Payment/payment-slice";

const store = configureStore({
  reducer: {
    properties: propertySlice.reducer,
    propertyDetails: propertyDetailsSlice.reducer,
    user:userSlice.reducer,
    booking:bookingSlice.reducer,
    accommodation: accommodationSlice.reducer,
    payment: paymentSlice.reducer
  },
});

export default store;