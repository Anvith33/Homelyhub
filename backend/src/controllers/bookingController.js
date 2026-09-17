import {Property} from "../Models/propertyModel.js"
import {Booking} from "../Models/bookingModel.js"

//create order
const createOrder = async(req,res)=>{
  const{amount,propertyId, fromDate,toDate,guests} = req.body;

  //orderID
  const orderID="order_"+Date.now()
  res.json({
    success:true,
    message:"Order created successfully",
    orderID,
    amount,
    propertyId,
    fromDate,
    toDate,
    guests
  })
}