const express = require("express");
const router = express.Router();
const fs = require("fs")
const { v4: uuid } = require("uuid");

router.get("/", (req, res)=> {
    const videosFile =fs.readFileSync("./data/videos.json");
    const parsedVideos = JSON.parse(videosFile);

    const videoInfo = parsedVideos.map((video) =>({
        id: video.id,
        title: video.title,
        channel: video.channel,
        image: `http://localhost:8088/images/${video.image}`,
        description: video.description,
        // video: `http://localhost:8088/images/${video.video}`
    }));

    //send the response(data)
    res.json(videoInfo);
})

router.get("/:videoId", (req, res)=> {
    const videosFile =fs.readFileSync("./data/videos.json");
    const parsedVideos = JSON.parse(videosFile);
    const individualVideo = parsedVideos.find((video) => video.id === `${req.params.videoId}`);

    if (!individualVideo) {
        res.status(404).send("Video not found");
      }    
      individualVideo.image = `http://localhost:8088/images${individualVideo.image}`
    //   individualVideo.video = `http://localhost:8088/images${individualVideo.image}`
    res.json(individualVideo);
});


router.post("/",(req, res) => {
    const title = req.body.title;
    const description = req.body.description;

    if(!title || !description) {
        return res.status(400).json ({error: true, message: "You must provide a title and description"})
    }
    const newPost = {
        id: uuid(),
        title: title,
        channel: "Nate Paradiso",
        image: "/New-video.jpeg",
        description: description,
        views: "40,000",
        likes: "3,589",
        duration: "0",
        video: "https://project-2-api.herokuapp.com/stream",
        timestamp: new Date,
        comments:[{
            id: uuid(),
            name: "Nate",
            comment:"So radical",
            likes:"75,985",
            timestamp: new Date,
        },
        {
            id: uuid(),
            name: "Some Guy",
            comment:"",
            likes:"80,985",
            timestamp: new Date,
        },]
    };

    const posts = fs.readFileSync("./data/videos.json");
    const parsedPosts = JSON.parse(posts);
    parsedPosts.push(newPost);

    const updatedPosts = JSON.stringify(parsedPosts);
    fs.writeFileSync("./data/videos.json", updatedPosts);

    res.status(201).json(newPost);
});




router.post("/:videoId/comments", (req, res) => {
    const commentText = req.body.comment;  

    if (!commentText) {
        return res.status(400).json({ error: true, message: "You must provide a comment" });
    }

    const newComment = {
        id: uuid(),
        name: "Nate",
        comment: commentText,  
        likes: "75,985",
        timestamp: new Date(),
    };

    const postsComments = fs.readFileSync("./data/videos.json");
    const parsedComments = JSON.parse(postsComments);

    const videoIndex = parsedComments.findIndex((video) => video.id === req.params.videoId);
    if (videoIndex === -1) {
        return res.status(404).json({ error: true, message: "Video not found" });
    }

    parsedComments[videoIndex].comments.push(newComment);

    const updatedComments = JSON.stringify(parsedComments);
    fs.writeFileSync("./data/videos.json", updatedComments);

    res.status(201).json(newComment);
});

module.exports = router;