const express = require("express");
const router = express.Router();
const fs = require("fs")
const { v4: uuid } = require("uuid");
const app = express();

app.use(express.static("./public"));

router.get("/", (req, res)=> {
    const videosFile =fs.readFileSync("./data/videos.json");
    const parsedVideos = JSON.parse(videosFile);

    const videoInfo = parsedVideos.map((video) =>({
        id: video.id,
        title: video.title,
        channel: video.channel,
        description: video.description,
        image: "Health.jpeg"
    }));
    res.json(videoInfo);
})

router.get("/:videoId", (req, res)=> {
    const videosFile =fs.readFileSync("./data/videos.json");
    const parsedVideos = JSON.parse(videosFile);
    const individualVideo = parsedVideos.find((video) => video.id === `${req.params.videoId}`);

    if (!individualVideo) {
        res.status(404).send("Video not found");
      }    
    res.json(individualVideo);
});


router.post("/",(req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const image = req.body.image;

    if(!title || !description) {
        return res.status(400).json ({error: true, message: "You must provide a title and description"})
    }
    const newPost = {
        id: uuid(),
        title: title,
        description: description,
        image: "Health.jpeg"
    };

    const posts = fs.readFileSync("./data/videos.json");
    const parsedPosts = JSON.parse(posts);
    parsedPosts.push(newPost);

    const updatedPosts = JSON.stringify(parsedPosts);
    fs.writeFileSync("./data/videos.json", updatedPosts);

    res.status(201).json(newPost);
});


module.exports = router;