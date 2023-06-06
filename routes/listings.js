import express from "express";
import { getListings, getListing } from "../controllers/listings.js";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import Listing from "../models/listing.js";
import User from "../models/user.js";

const router = express.Router();

const DIR = "./public/images";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

router.get("/listings", getListings);
router.get("/listing/:id", getListing);
router.post(
  "/addListing",
  upload.single("image_url"),
  async (request, response) => {
    const {
      user_id,
      title,
      description,
      address,
      area_name,
      rent,
      area,
      type,
      bedroom_count,
      bathroom_count,
    } = request.body;
    console.log("request.body", request.body);

    const image_url = "http://localhost:5000/images/" + request.file.filename;
    const newListing = new Listing({
      user_id,
      title,
      description,
      address,
      area_name,
      rent,
      area,
      type,
      bedroom_count,
      bathroom_count,
      image_url,
    });

    try {
      await newListing.save();
      response.status(201).json(newListing);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  }
);

export default router;
