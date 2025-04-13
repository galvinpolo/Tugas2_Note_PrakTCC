import express from "express";
import cors from "cors";
import route from "./routes/route.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(route);

app.listen(5000, () => {
  console.log("server is running");
});
