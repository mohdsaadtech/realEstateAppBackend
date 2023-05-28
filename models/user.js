import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: String, maxLength: 100, required: true },
    email: { type: String, maxLength: 200, required: true, unique: true, index: true },
    phone_no: { type: Number, maxLength: 10, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'tenant' }
}, {timestamps: true}, {
    collection: 'users'
});

const User = mongoose.model('User', userSchema);

export default User;