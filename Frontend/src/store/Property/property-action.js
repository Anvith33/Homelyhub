import propertySlice from "./propert-slice";
import { propertyAction } from "./propert-slice";
import {axions} from "../../utils/axios"

//get all properties
//1. start api req
//2. tell redux loading started
//4. call backend api
//5.wait for response
//6. get the property data
//7.send data to redux store
//8.if error occurs send error to redux
