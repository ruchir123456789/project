import express from "express";
import {
  allusers,
  registerController,
  loginController,
  userbydataid,
  updateuser,
  deleteuser
} from "../Controllers/userController.js";
import { authuser, isuser, userrole } from "../Middelwares/authMiddleware.js";
import { deletedata } from "../Controllers/controller.js";
const router = express.Router();

router.get("/alluser", authuser, userrole, allusers);

router.get("/register", (req, res) => {
  res.render("register", { error: null, success: null });
});
router.post("/register", registerController);

router.get("/login", (req, res) => {
  res.render("login", { error: null, success: null });
});
router.post("/login", loginController);

router.get("/userbydata", authuser, userrole, userbydataid);

router.put("/updateuser",authuser,userrole,updateuser);

router.delete("/deletedata ",authuser, deleteuser)

export { router };
