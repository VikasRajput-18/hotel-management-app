import { Response, Request } from "express";
import Hotel from "../models/hotel.model";
import { BookingType, HotelSearchResponse } from "../shared/types";
import { constructSearchQuery } from "../lib/helper";
import { validationResult } from "express-validator";
import { stripe } from "../routes/hotels.routes";

export const searchHotels = async (req: Request, res: Response) => {
  try {
    const query = constructSearchQuery(req.query);

    let sortOptions = {};
    switch (req.query.sortOptions) {
      case "starRating":
        sortOptions = { starRating: -1 };
        break;
      case "pricePerNightAsc":
        sortOptions = { pricePerNight: 1 };
        break;
      case "pricePerNightDsc":
        sortOptions = { pricePerNight: -1 };
        break;
    }

    const pageSize = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    // pageNumber = 3  (3-1) * 5
    const skip = (pageNumber - 1) * pageSize;
    const hotels = await Hotel.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);
    const total = await Hotel.countDocuments(query);

    let response: HotelSearchResponse = {
      data: hotels,
      pagination: {
        total,
        pages: Math.ceil(total / pageSize),
        page: pageNumber,
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    console.log(`Search :  ${error}`);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getHotelDetails = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    return res.status(200).json(hotel);
  } catch (error) {
    console.log(`Hotel Details ID :  ${error}`);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const createPayment = async (req: Request, res: Response) => {
  try {
    const { numberOfNights } = req.body;
    const hotelId = req.params.hotelId;

    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      return res.status(400).json({ message: "Hotel not found" });
    }

    const totalCost = hotel.pricePerNight * numberOfNights;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCost * 100,
      currency: "inr",
      description: "Payment for hotel booking",
      metadata: {
        hotelId,
        userId: req.userId,
      },
    });

    if (!paymentIntent.client_secret) {
      return res.status(500).json({ message: "Error creating payment intent" });
    }

    const response = {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret.toString(),
      totalCost,
    };

    return res.send(response);
  } catch (error) {
    console.log(`Hotel Payment :  ${error}`);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const hotelBookings = async (req: Request, res: Response) => {
  try {
    const paymentIntentId = req.body.paymentIntentId;
    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId as string
    );

    if (!paymentIntent) {
      return res.status(400).json({ message: "Payment intent not found" });
    }
    if (
      paymentIntent.metadata.hotelId !== req.params.hotelId ||
      paymentIntent.metadata.userId !== req.userId
    ) {
      return res.status(400).json({ message: "Payment intent mismatch" });
    }

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({
        message: `Payment intent not succeeded. Status : ${paymentIntent.status}`,
      });
    }
    const newBooking: BookingType = {
      ...req.body,
      userId: req.userId,
    };

    const hotel = await Hotel.findOneAndUpdate(
      { _id: req.params.hotelId },
      {
        $push: { bookings: newBooking },
      },
      { new: true } // Return the updated document
    );

    if (!hotel) {
      return res.status(400).json({ message: "Hotel not found" });
    }

    res.status(200).send();
  } catch (error) {
    console.log(`Search :  ${error}`);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find().sort("-lastUpdated");
    res.json(hotels);
  } catch (error) {
    console.log(`Hotels :  ${error}`);
    res.status(500).json({ message: "Something went wrong" });
  }
};
