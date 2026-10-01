import { configureStore } from "@reduxjs/toolkit";
import propertySlice from "./Property/property-slice";
import propertyDetailsSlice from "./PropertDetails/propertyDetails-slice";
import userSlice from "./User/user-slice";
import bookingSlice from "./Booking/booking-slice";

const store = configureStore({
  reducer: {
    properties: propertySlice.reducer,
    propertyDetails: propertyDetailsSlice.reducer,
    user:userSlice.reducer,
    booking:bookingSlice.reducer
  },
});

export default store;