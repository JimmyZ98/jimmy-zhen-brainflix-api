const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuid } = require("uuid");
const videosFile = fs.readFileSync("./data/videos.json");

router
  .route("/")
  .get((req, res) => {
    const videos = JSON.parse(videosFile);
    const filteredVideos = videos.map(function (x) {
      return (({ id, title, channel, image }) => ({
        id,
        title,
        channel,
        image,
      }))(x);
    });
    res.json(filteredVideos);
  })
  .post((req, res) => {
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
  if (!singleVideo) {
    res.status(404).send("No video with that id exists");
    return;
  }

  res.json(singleVideo);
});
module.exports = router;
