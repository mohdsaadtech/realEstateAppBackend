import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import Listing from "../models/listing.js";
import User from "../models/user.js";

export const getListings = async (req, res) => {
  try {
    const listings = await Listing.find();
    res.status(200).json(listings);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getListing = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const listing = await Listing.findById(id);
    res.status(200).json(listing);
  } catch (error) {
    console.log("callling...............");
    res.status(404).json({ message: error.message });
  }
};
