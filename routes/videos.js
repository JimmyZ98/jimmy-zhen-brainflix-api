const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuid } = require("uuid");
const videosFile = fs.readFileSync("./data/videos.json");

router
  .route("/")
  .get((req, res) => {
    const videos = JSON.parse(videosFile);
    res.json(videos);
  })
  .post((req, res) => {
    console.log(req.body);
    const newVideoInfo = { ...req.body, id: uuid() };
    console.log(newVideoInfo);
    const videos = JSON.parse(videosFile);
    const allVideos = [...videos, newVideoInfo];
    fs.writeFileSync("./data/videos.json", JSON.stringify(allVideos));

    res.status(201).json(newVideoInfo);
  });

router.get("/:videoId", (req, res) => {
  console.log(req.params);
  const videos = JSON.parse(videosFile);
  const singleVideo = videos.find((video) => video.id === req.params.videoId);
});
module.exports = router;
