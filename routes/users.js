import express from "express";
import { login, addUser } from "../controllers/users.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", login);
router.post("/addUser", addUser);

function verifyJWT(req, res, next) {
  // removes 'Bearer` from token
  const token = req.headers["x-access-token"]?.split(" ")[1];

  if (token) {
    jwt.verify(token, "9YMcy6XiRiAK7KS", (err, decoded) => {
      if (err)
        return res.json({
          isLoggedIn: false,
          message: "Failed To Authenticate",
        });
      req.user = {};
      req.user.id = decoded.id;
      req.user.email = decoded.email;
      req.user.name = decoded.name;
      next();
    });
  } else {
    res.json({ message: "Incorrect Token Given", isLoggedIn: false });
  }
}

router.get("/isUserAuthenticated", verifyJWT, (req, res) => {
  return res.json({
    isLoggedIn: true,
    email: req.user.email,
    name: req.user.name,
  });
});

export default router;
