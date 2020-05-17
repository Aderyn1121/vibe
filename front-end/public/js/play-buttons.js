const audio = document.getElementsByTagName('audio');
const playButton = document.getElementById('playButton');

playButton.addEventListener('click', (e) => {
  currentSong = audio[0];
  if (currentSong.classList.contains('playing')) {
    currentSong.pause();
    playButton.innerHTML = '<i class="fas fa-play"></i>';
  } else {
    currentSong.play();
    playButton.innerHTML = '<i class="fas fa-pause"></i>';
  }
  currentSong.classList.toggle('playing');
});
