import express from 'express';
import User from "../models/user.js";

export const getUsers = async (req, res) => { 
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addUser = async (request, response) => {
    const { name, email, phone_no, password, role } = request.body;
    console.log(request.body.name);
    const newUser = new User({ name, email, phone_no, password, role });

    try {
        await newUser.save();
        response.status(201).json(newUser);
    } catch (error) {
        if(error.code === 11000) {
            if(JSON.stringify(error.keyPattern).includes("email")) {               
                response.status(409).json({ message: "Email already exists please use different email" });
            } else {
                response.status(409).json({ message: "Mobile already exists please use different mobile number" });
            } 
        } else {
            response.status(500).json({ message: error.message });
        }        
    }
}