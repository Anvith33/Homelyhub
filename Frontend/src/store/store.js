import { configureStore } from "@reduxjs/toolkit";
import propertySlice from "./Property/propert-slice";
import propertyDetailsSlice from "./PropertDetails/propertyDetails-slice";
const store = configureStore({
  reducer:{
    properties: propertySlice.reducer,
    propertdetails: propertyDetailsSlice.reducer
  }
})
export default store;