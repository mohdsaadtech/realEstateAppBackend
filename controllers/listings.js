import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import Listing from "../models/listing.js";
import User from "../models/user.js";
//const multer  = require('multer')

const DIR = './public/images';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});



export const getListings = async (req, res) => { 
    try {
        const listings = await Listing.find();
        res.status(200).json(listings);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getListing = async (req, res) => { 
    const { id } = req.params;
    console.log(id);
    try {
        const listing = await Listing.findById(id);
        res.status(200).json(listing);
    } catch (error) {
        console.log("callling...............")
        res.status(404).json({ message: error.message });
    }
}

export const addListing = async (request, response) => {
    const { user_id, title, description, address, area_name, rent, area, type, bedroom_count, bathroom_count, image_url } = request.body;
    console.log(request.body);
    const newListing = new Listing({ user_id, title, description, address, area_name, rent, area, type, bedroom_count, bathroom_count, image_url });

    try {
        await newListing.save();
        response.status(201).json(newListing);
    } catch (error) {
        response.status(500).json({ message: error.message });  
    }
}