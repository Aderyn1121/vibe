const track = {
  art: document.getElementById('trackArt'),
  title: document.getElementById('trackTitle'),
  artist: document.getElementById('trackArtist'),
  audio: document.getElementById('trackAudio'),
};
let stopObject;
let songQueue = [];
let currentTrack = 0;
let repeat = 'none';

function playMusic() {
  track.audio.play();
  playButton.innerHTML = '<i class="fas fa-pause"></i>';
  track.audio.classList.add('playing');
}

function startMusic(songInQueue) {
  track.audio.src = `../../public/test_music/${songInQueue.id}.m4a`;
  track.art.innerHTML = `<img src='../../public/images/album-art/${songInQueue.id}.jpg' >`;
  track.title.innerHTML = songInQueue.title;
  track.artist.innerHTML = songInQueue.artist;

  playMusic();
}
function pauseMusic() {
  track.audio.pause();
  playButton.innerHTML = '<i class="fas fa-play"></i>';
  track.audio.classList.remove('playing');
}

function stopMusic(song) {
  track.audio.setAttribute('src', '');
  track.art.innerHTML = '';
  track.title.innerHTML = '______________';
  track.artist.innerHTML = '______________';
  pauseMusic();
}

function nextTrack() {
  if (repeat === 'one') {
    startMusic(songQueue[currentTrack]);
    return;
  }

  currentTrack += 1;

  if (currentTrack > songQueue.length - 1 && repeat === 'none') {
    stopMusic();
    return;
  }

  if (currentTrack > songQueue.length - 1 && repeat === 'all') {
    currentTrack = 0;
  }
  startMusic(songQueue[currentTrack]);
}

function prevTrack() {
  if (currentTrack > 0 && track.audio.currentTime < 1.5) {
    currentTrack -= +1;
    startMusic(songQueue[currentTrack]);
  } else {
    startMusic(songQueue[currentTrack]);
  }
}

track.audio.addEventListener('ended', () => {
  nextTrack();
});
