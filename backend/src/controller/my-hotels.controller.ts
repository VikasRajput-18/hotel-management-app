import { Request, Response, Express } from "express";
import { v2 as cloudinary } from "cloudinary";
import Hotel from "../models/hotel.model";
import { HotelType } from "../shared/types";

export const createMyHotels = async (req: Request, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: HotelType = req.body;
    // upload images to cloudinary
    const imageUrls = await uploadImages(imageFiles);
    //if upload was successfull , add the urls to the new hotel
    newHotel.imageUrls = imageUrls;
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;

    const hotel = await Hotel.create(newHotel);
    return res.status(200).send(hotel);
  } catch (error) {
    console.log(`Error creating hotel : ${error}`);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

export const getMyHotels = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(400).json({ message: "Token not found" });
    }
    const hotels = await Hotel.find({ userId });
    return res.status(200).json(hotels);
  } catch (error) {
    console.log(`Error creating hotel : ${error}`);
    return res
      .status(500)
      .json({ success: false, message: "Error fetching hotels" });
  }
};

export const getMyHotel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Hotel Id not found" });
    }
    const hotel = await Hotel.findOne({
      _id: id,
      userId: req.userId.toString(),
    });
    if (!hotel) {
      res.status(400).json({ message: "Hotel is not exists" });
    }

    return res.status(200).json(hotel);
  } catch (error) {
    console.log(`Error creating hotel : ${error}`);
    return res
      .status(500)
      .json({ success: false, message: "Error fetching hotel" });
  }
};
export const updateMyHotel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Hotel Id not found" });
    }
    const updatedHotel: HotelType = req.body;
    updatedHotel.lastUpdated = new Date();
    const hotel = await Hotel.findOneAndUpdate(
      { _id: id, userId: req.userId.toString() },
      {
        $set: updatedHotel,
      },
      {
        new: true,
      }
    );
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    const imageFiles = req.files as Express.Multer.File[];
    const updatedImageUrls = await uploadImages(imageFiles);
    hotel.imageUrls = [...updatedImageUrls, ...(updatedHotel.imageUrls || [])];
    await hotel.save();

    return res.status(200).json(hotel);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};
async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    const dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}
