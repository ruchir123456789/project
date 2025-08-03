import express from "express";
const router = express.Router();
import {
  getalldata,
  getdatabyid,
  createdata,
  updatedata,
  deletedata,
} from "../Controllers/controller.js";
import { authuser, userrole } from "../Middelwares/authMiddleware.js";
router.get("/data", authuser, getalldata);

router.get("/data/:id", authuser, getdatabyid);

router.get("/createdata",authuser,(req,res)=>{
  res.render("createnewpet",);
} )
router.post("/createdata",authuser,userrole, createdata);

router.get("/updatedate/:id",(req,res)=>{
  const id = req.params.id;
  res.render("updatenewpet" ,{id:id})
})
router.post("/updatedate/:id", authuser,userrole, updatedata);

// router.delete("/de")
router.get("/deletedata/:id", authuser,(req,res)=>{
  res.render("deletepetdata",{id : req.params.id})
})
router.delete("/deletedata/:id", authuser,userrole, deletedata);

export { router };
