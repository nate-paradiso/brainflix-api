const express = require("express");
const app = express();
const cors = require("cors");

// Allow JSON to be sent/received 
app.use(express.json());
// Allow the `public` directory to serve static files
// app.use("/public", express.static("./public"));
// Allow cross origin for a particular origin (our frontend), but block requests from any other origin
require("dotenv").config();
const PORT = process.env.PORT || 8088;
const FRONTEND_URL = process.env.FRONTEND_URL;
app.use(cors({ origin: FRONTEND_URL }));


const videoRoutes = require("./routes/videos");
app.use("/videos", videoRoutes);

app.listen(PORT, () => {
  console.log(`API live on port ${PORT}`);
});
