const base_url = "https://www.googleapis.com/youtube/v3";

const api_key = "AIzaSyAv9IW7d8fcz6R7nod77UqdBbhZaQKuWc4";

const container = document.getElementById("videos-container");

async function getVideos(q) {
	const url = `${base_url}/search?key=${api_key}&q=${q}&type=video&maxResults=20`;
	const response = await fetch(url);
	const data = await response.json();
	const videos = data.items;
	getVideoData(videos);
}

async function getVideoData(videos) {
	let videoData = [];
	for (let i = 0; i < videos.length; i++) {
		const video = videos[i];
		const videoId = video.id.videoId;
		videoData.push(await getVideoDetails(videoId));
	}
	console.log(videoData);
	renderVideos(videoData);
}

async function getVideoDetails(videoId) {
	const url = `${base_url}/videos?key=${api_key}&part=snippet,contentDetails,statistics&id=${videoId}`;
	const response = await fetch(url, {
		method: "get",
	});
	const data = await response.json();

	return data.items[0];
}

function renderVideos(videos) {
	container.innerHTML = ``;
	for (let i = 0; i < videos.length; i++) {
		const video = videos[i];
		const thumbnailURL = video.snippet.thumbnails.high.url;
		const videoTitle = video.snippet.localized.title;
		const channelName = video.snippet.channelTitle;
		let viewCount = video.statistics.viewCount;
		const publishedAt = video.snippet.publishedAt;
		container.innerHTML += `
					<div class="video-info">
						<div class="video-image" onclick="openVideoDetails('${video.id}')">
							<img src="${thumbnailURL}" alt="video title" />
						</div>
						<div class="video-description">
							<div class="channel-avatar">
								<img src="" alt="channel avatar" />
							</div>
							<div class="video-title">${videoTitle}</div>
							<div class="channel-description">
								<p class="channel-name">${channelName}</p>
								<p class="video-views">${viewCount} views</p>
								<p class="video-time">${publishedAt}</p>
							</div>
						</div>
					</div>
				`;
	}
}

function openVideoDetails(videoId) {
	localStorage.setItem("videoId", videoId);
	window.open("videoDetails.html");
}

getVideos("");
