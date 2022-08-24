import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import tourRouter from "./routes/tour.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const port = process.env.PORT || 5000;

app.use("/users", userRouter);
app.use("/tour", tourRouter);

const MONGODBURL =
  "mongodb+srv://madhu:7Tu7XUXsdvOwxFko@cluster0.nf85irq.mongodb.net/tour_db?retryWrites=true&w=majority";

mongoose
  .connect(MONGODBURL)
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(`${err} did not connect`);
  });

app.get("/", (req, res) => {
  res.send("Welcome to Tour API");
});
