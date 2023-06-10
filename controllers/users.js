import express from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({ message: "Invalid email or password" });
    } else {
      //return res.json({ user: user });
      if (user.password === password) {
        const payload = {
          id: user._id,
          name: user.name,
          email: user.email,
        };
        jwt.sign(
          payload,
          "9YMcy6XiRiAK7KS",
          { expiresIn: 86400 },
          (err, token) => {
            return res.json({
              message: "success",
              token: "Bearer " + token,
              name: user.name,
              sds23sds: user._id,
            });
          }
        );
      } else {
        return res.json({ message: "Invalid Username or Password" });
      }
    }
    //res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addUser = async (request, response) => {
  const { name, email, phone_no, password, role } = request.body;
  const newUser = new User({ name, email, phone_no, password, role });

  try {
    await newUser.save();
    response.status(201).json(newUser);
  } catch (error) {
    if (error.code === 11000) {
      if (JSON.stringify(error.keyPattern).includes("email")) {
        response
          .status(409)
          .json({ message: "Email already exists please use different email" });
      } else {
        response.status(409).json({
          message: "Mobile already exists please use different mobile number",
        });
      }
    } else {
      response.status(500).json({ message: error.message });
    }
  }
};
