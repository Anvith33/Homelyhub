import { configureStore } from "@reduxjs/toolkit";
import propertySlice from "./Property/propert-slice";

const store = configureStore({
  reducer:{
    propertiees: propertySlice.reducer
  }
})
export default store;