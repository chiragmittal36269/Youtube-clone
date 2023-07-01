const video_container = document.getElementById("yt-video");

const videoId = localStorage.getItem("videoId");

video_container.src = `https://www.youtube.com/embed/${videoId}`;
