const express = require("express");
const app = express();
const cors = require("cors");
// Allow JSON to be sent/recieved 
app.use(express.json());
// Allow the `public` directory to serve static files
app.use("/public", express.static("./public"));
// Allow cross origin for a particular origin (our frontend), but block requests from any other origin
app.use(cors({ origin: "http://localhost:3000" }));




// Import the post routes and register them using the base endpoint of `/posts` 
//(any route inside the route fill will start with `/posts`)
const videoRoutes = require("./routes/videos");
app.use("/videos", videoRoutes);

app.listen(8088, () => {
  console.log("Listening on port 8088");
});
