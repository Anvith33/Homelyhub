//state manager
// all list properties
//count
//search filters
//loading flag
//error

import {createSlice} from "@reduxjs/toolkit";

const propertySlice =createSlice({
  name : "property",
  initialState:{
    properties:[],
    totalProperties:0,
    searchParams:{},
    error:null,
    loading:false
  },
  reducers:{
    getRequest(state){
      state.loading=true;
    },
    getProperties(state,action){
      state.properties= action.payload.data
    }
  }
})