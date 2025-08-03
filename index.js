import express from "express";
const app = express();
import path from "path";
import dotenv from "dotenv";
import { router } from "./Routes/routers.js";
import { router as r } from "./Routes/userRoute.js";
import cookieParser from "cookie-parser";
import methodOverride from 'method-override';



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(methodOverride('_method'))

app.use("/", r);
app.use("/v1/api/", router);
app.use(express.static("public"));

app.set("Views", "Views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // console.log("hello");
  // res.send("dog data ");
  // res.render("home");
  // res.render("home2");
  res.render("index")
});

dotenv.config();
const port = process.env.PORT;
app.listen(port, () => {
  console.log("http://localhost:8000");
});
