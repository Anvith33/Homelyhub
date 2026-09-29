// recv the user information
// Validate the required information
//send the information to ot AI trip planner
//calculate the budget per night
//search mongodb for suitable properties
//send both AI trip Plan + matching Properties back to the frontend/user

import {Property} from "../Models/propertyModel.js"
import { planTrip } from "../ai/tripPlanner"

const cleanCity=(text) => text.toLoweCase().replaceAll(" ","")

const createtripPlan=async(req, res) =>{
  try{
    const {desaination, budget, days, people, intrest}= req.body
    if(!desaination || !budget ||!days|| !people){
      return res.status(400).json({
        status:"fail",
        message:"Please fill the destination,budget,days and people"
      })
    }
    const plan =await planTrip({
      desaination, 
      budget, 
      days, 
      people, 
      intrest:intrest || []
    });

    const perNight = Number(budget)/Number(days);

    const city = cleanCity(desaination);

    const properties = await Property.find({
      $or:[
        {"address.city":city},
        {"address.state":city},
        {"address.area":city}
      ],
      price:{$lte: perNight},
      maximumGuest:{$gte: Number(people)},
    }).limit(6);

    res.status(200).json({
      status:"success",
      data:{plan, properties, perNight}
    })

  }
  catch(error){
    res.status(500).json({
    status:"fail",
    message:"Could not create a trip pln, please try again"
    })

  }
}

export {createtripPlan};