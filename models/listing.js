import mongoose from "mongoose";

const listingSchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, maxLength: 500 },
    description: { type: String, required: true, maxLength: 5000 },
    address: { type: String, required: true, maxLength: 2000 },
    area_name: { type: String, required: true, maxLength: 200 },
    rent: { type: Number, required: true },
    area: { type: Number, required: true },
    type: { type: String, required: true, maxLength: 10 },
    bedroom_count: { type: Number, required: true },
    bathroom_count: { type: Number, required: true },
    image_url: { type: String, required: true }
}, {timestamps: true}, {
    collection: 'listings'
});

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;