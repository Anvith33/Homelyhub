// recv the user information
// Validate the required information
//send the information to ot AI trip planner
//calculate the budget per night
//search mongodb for suitable properties
//send both AI trip Plan + matching Properties back to the frontend/user

import { Property } from "../Models/propertyModel.js";
import { planTrip } from "../ai/tripPlanner.js";
import { generateDescription } from "../ai/generateDescription.js";

const cleanCity = (text = "") =>
  String(text).trim().toLowerCase().replaceAll(" ", "");

const createTripPlan = async (req, res) => {
  try {
    const destination = req.body.destination ?? req.body.desaination;
    const budget = req.body.budget;
    const days = req.body.days;
    const people = req.body.people;
    const interests = req.body.interests ?? req.body.intrest ?? [];

    if (!destination || !budget || !days || !people) {
      return res.status(400).json({
        status: "fail",
        message: "Please fill the destination, budget, days and people",
      });
    }

    const plan = await planTrip({
      destination,
      budget,
      days,
      people,
      interests,
    });

    const perNight = Number(budget) / Number(days);
    const city = cleanCity(destination);

    const properties = await Property.find({
      $or: [
        { "address.city": city },
        { "address.state": city },
        { "address.area": city },
      ],
      price: { $lte: perNight },
      maximumGuest: { $gte: Number(people) },
    }).limit(6);

    res.status(200).json({
      status: "success",
      data: { plan, properties, perNight },
    });
  } catch (error) {
    console.error("Trip planning failed:", error);
    res.status(500).json({
      status: "fail",
      message: "Could not create a trip plan, please try again",
    });
  }
};

const writeDescription = async (req, res) => {
  try {
    const description = await generateDescription(req.body);
    res.status(200).json({ status: "success", data: { description } });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Could not generate a description",
    });
  }
};

export { createTripPlan, writeDescription };