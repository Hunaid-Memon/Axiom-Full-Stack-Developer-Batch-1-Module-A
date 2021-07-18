const container = document.getElementById('container');
const previousBtn = document.getElementById('previous');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');
const progress = document.getElementById('progress');
const audio = document.getElementById('audio');
const title = document.getElementById('song-title');
const albumArt = document.getElementById('album-art');
const progressBar = document.getElementById('progress-bar');

const tracks = ['Aarzoo-E-Mohabbat NFK', 'Phiroon Dhoondta Maikadah Tauba Tauba'];

let trackIndex = 1;

loadTrack(tracks[trackIndex]);

function loadTrack(track){
    title.innerText = track;
    audio.src = `music/${track}.mp3`
    albumArt.src = `images/${track}.jpg`;
    // console.log(title,audio.src,albumArt.src);
}

function playTrack(){
    container.classList.add('play');
    // console.log(playBtn.innerHTML);
    playBtn.innerHTML = `<i class="fas fa-pause"></i>`
    audio.play();
}

function pauseTrack(){
    container.classList.remove('play');
    playBtn.innerHTML = `<i class="fas fa-play"></i>`
    audio.pause();
}

function preTrack(){
    trackIndex--;
    console.log(trackIndex);
    if(trackIndex < 0){
        trackIndex = tracks.length -1;
        console.log(trackIndex);
        console.log(tracks.length);
    };
    loadTrack(tracks[trackIndex]);
    playTrack()
}

function nextTrack(){
    trackIndex++;
    if(trackIndex > tracks.length - 1){
        trackIndex = 0
    }
    loadTrack(tracks[trackIndex]);
    playTrack()
}

function updateProgress(e){
//     const duration = e.srcElement.duration;
//     const timeUpdate = e.srcElement.currentTime;
//     console.log(duration,timeUpdate);
// Destructure
    const {duration, currentTime} = e.srcElement;
    const progressPersentage = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPersentage}%`;
}

function setProgress(e){
    const width = this.clientWidth;
    const clickLocation = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickLocation / width) * duration
}

//Event Listeners
playBtn.addEventListener('click' , () =>{
    const isPlaying = container.classList.contains('play');
    if(isPlaying){
        pauseTrack();
    }else{
        playTrack();
    }
});

previousBtn.addEventListener('click', preTrack);
nextBtn.addEventListener('click', nextTrack);
audio.addEventListener('timeupdate', updateProgress);
progress.addEventListener('click', setProgress);
audio.addEventListener('ended', nextTrack );