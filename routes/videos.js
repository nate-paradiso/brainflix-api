const express = require("express");
const router = express.Router();
const fs = require("fs")

const image = app.use(express.static("./public"));

router.get("/", (req, res)=> {
    const videosFile =fs.readFileSync("./data/videos.json");
    const parsedVideos = JSON.parse(videosFile);


    const videoInfo = parsedVideos.map((video) =>({

        id: video.id,
        title: video.title,
        channel: video.channel,
        image: image
        

    }));

    res.json(videoInfo);

})


router.get("/:videoId", (req, res)=> {
    const videosFile =fs.readFileSync("./data/videos.json");
    const parsedVideos = JSON.parse(videosFile);
        
    const individualVideo = parsedVideos.find((video) => video.id === `${req.params.videoId}`) 

    if (!individualVideo) {
        res.status(404).send("Video not found");
      }    

    res.json(individualVideo);
});



module.exports = router;