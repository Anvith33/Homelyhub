import { configureStore } from "@reduxjs/toolkit";
import propertySlice from "./Property/propert-slice";
import propertyDetailsSlice from "./PropertDetails/propertyDetails-slice";
import userSlice from "./User/user-slice";

const store = configureStore({
  reducer: {
    properties: propertySlice.reducer,
    propertyDetails: propertyDetailsSlice.reducer,
    user:userSlice.reducer
  },
});

export default store;