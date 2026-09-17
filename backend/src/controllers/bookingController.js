import {Property} from "../Models/propertyModel.js"
import {Booking} from "../Models/bookingModel.js"

//create order
const createOrder = async(req,res)=>{
  const{amount,propertyId, fromDate,toDate,guests} = req.body;

  //orderID
  const orderId="order_"+Date.now()
  res.json({
    success:true,
    message:"Order created successfully",
    orderId,
    amount,
    propertyId,
    fromDate,
    toDate,
    guests
  })
}

//verify payment function
const verifyPayment = async(req,res)=>{
  const{ orderId, bookingDetails, forceStatus} = req.body;

  if(forceStatus == "success")
  {
    const paymentId ="pay_"+Date.now();

    //save booking
    const newBooking = await Booking.create({
      user: req.user._id,
      property: bookingDetails.propertyId,
      price:bookingDetails.price,
      fromDate: bookingDetails.fromDate,
      toDate: bookingDetails.toDate,
      guests: bookingDetails.guests,
      numberOfnights:bookingDetails.numberOfnights,
      paid:true
    });

    //tell property dates are taken

    const updatedProperty = await Property.findByIdAndUpdate(
      bookingDetails.propertyId,{
        $push:{
          currentBookings:{
            bookingId:newBooking._id,
            fromDate:bookingDetails.fromDate,
            toDate:bookingDetails.toDate,
            userId:req.user._id
          }
        }
      },
      {new:true}
    );

    res.json({
      success:true,
      message:"Payment successfull booking confirmed!",
      paymentId,
      orderId,
      booking:newBooking
    })
  }

  else{
    res.status(400).json({
      success:false,
      message:"payment failed",
      orderId
    })
  }
}

//get my booking
const getUserBookings=async(req,res)=>{
  try
  {
    const bookings=await Booking.find({use:req.user._id});
    res.status(200).json({
      status:"success",
      data:{
        bookings
      }
    })
  }
  catch(error)
  {
    res.status(401).json({
    status:"failed",
    message:error.message
    })
  }
}