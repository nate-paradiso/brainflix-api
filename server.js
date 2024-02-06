const express = require("express");
const app = express();
const cors = require("cors");


app.use("/images", express.static('public/images'));

// Allow JSON to be sent/received 
app.use(express.json());

require("dotenv").config();
const PORT = process.env.PORT || 8088;
const FRONTEND_URL = process.env.FRONTEND_URL;
app.use(cors({ origin: FRONTEND_URL }));

const videoRoutes = require("./routes/videos");
app.use("/videos", videoRoutes);

app.listen(PORT, () => {
  console.log(`API live on port ${PORT}`);
});
