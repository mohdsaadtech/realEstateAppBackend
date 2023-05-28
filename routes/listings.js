import express from 'express';
import { getListings, addListing, getListing } from '../controllers/listings.js';

const router = express.Router();

router.get('/listings', getListings);
router.get('/listing/:id', getListing);
router.post('/addListing', addListing);

export default router;