import express from "express";
import cors from "cors";
import route from "./routes/route.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(route);

// Gunakan PORT dari environment, fallback ke 5000 untuk lokal
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
