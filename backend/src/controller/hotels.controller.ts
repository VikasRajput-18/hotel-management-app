import { Response, Request, query } from "express";
import Hotel from "../models/hotel.model";
import { HotelSearchResponse } from "../shared/types";
import { constructSearchQuery } from "../lib/helper";

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
