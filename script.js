let songs = [
    {
        title: "Karkuzhal Kadavaye",
        artist: "G. V. Prakash Kumar",
        image: "images/song1.jpg",
        audio: "audio/song1.mp3",
        gradient: "linear-gradient(135deg, #1a0508, #5a1720, #b65328, #d58a45)"
    },
    {
        title: "New York Nagaram",
        artist: "A. R. Rahman",
        image: "images/song2.jpg",
        audio: "audio/song2.mp3",
        gradient: "linear-gradient(135deg, #050505, #16090b, #5c1015, #a63b24)"
    },
    {
        title: "Jaalakaari",
        artist: "Sai Abhyankkar",
        image: "images/song3.webp",
        audio: "audio/song3.mp3",
        gradient: "linear-gradient(135deg, #071321, #172b46, #4b3b52, #a66f70)"
    }
]

let audio = document.getElementById("audio");
let albumImg = document.getElementById("album-img");
let songName = document.querySelector(".song-name");
let songAuthor = document.querySelector(".song-author");
let playBtn = document.getElementById("play-btn");
let previousBtn = document.getElementById("previous-btn");
let nextBtn = document.getElementById("next-btn");
let progressBar = document.getElementById("progress-bar");
let currentTime = document.getElementById("current-time");
let duration = document.getElementById("duration");
let volumeBar = document.getElementById("volume-bar");
let songStatus = document.getElementById("status");
let currentSong = 0;

function loadSong() {
    let song = songs[currentSong];
    songName.textContent = song.title;
    songAuthor.textContent = song.artist;
    albumImg.src = song.image;
    audio.src = song.audio;
    document.querySelector(".parent").style.background = song.gradient;
}

loadSong();

playBtn.addEventListener("click",function(){
    if (audio.paused){
        audio.play();
    }
    else{
        audio.pause();
    }
})

audio.addEventListener("play",function(){
    playBtn.textContent = "⏸";
    songStatus.textContent = "Playing";
    albumImg.classList.add("playing");
})

audio.addEventListener("pause",function(){
    playBtn.textContent = "▶";
    songStatus.textContent = "Paused";
    albumImg.classList.remove("playing");
})

audio.addEventListener("timeupdate",function(){
    let mins = String(Math.floor(audio.currentTime / 60)).padStart(2, "0");
    let seconds = String(Math.floor(audio.currentTime % 60)).padStart(2, "0");
    currentTime.textContent = `${mins}:${seconds}`;
    if (!Number.isNaN(audio.duration)){
        progressBar.value = audio.currentTime / audio.duration * 100;
    }
})

audio.addEventListener("loadedmetadata",function(){
    let mins = String(Math.floor(audio.duration / 60)).padStart(2, "0");
    let seconds = String(Math.floor(audio.duration % 60)).padStart(2, "0");
    duration.textContent = `${mins}:${seconds}`;
})

progressBar.addEventListener("input",function(){
    audio.currentTime =  progressBar.value / 100 * audio.duration;
})

previousBtn.addEventListener("click",function(){
    let wasPlaying = !audio.paused;
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong();
    progressBar.value = 0;
    currentTime.textContent = "00:00";
    if (wasPlaying){
        audio.play();
    }
})

nextBtn.addEventListener("click",function(){
    let wasPlaying = !audio.paused;
    currentSong = (currentSong + 1) % songs.length;
    progressBar.value = 0;
    currentTime.textContent = "00:00";
    loadSong();
    if (wasPlaying){
        audio.play();
    }
    console.log(audio.currentTime
            ,audio.duration
            ,progressBar.value)
})

audio.addEventListener("ended",function(){
    currentSong = (currentSong + 1) % songs.length;
    loadSong();
    progressBar.value = 0;
    currentTime.textContent = "00:00";
    audio.play();
})

volumeBar.addEventListener("input",function(){
    audio.volume = volumeBar.value;
})