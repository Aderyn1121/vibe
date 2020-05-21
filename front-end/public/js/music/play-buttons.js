const playButton = document.getElementById('playButton');
const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');
const repeatButton = document.getElementById('repeatButton');


playButton.addEventListener('click', (e) => {
  if (track.audio.classList.contains('playing')) {
    pauseMusic();
  } else {
    playMusic();
  }
});

nextButton.addEventListener('click', (e) => {
  nextTrack();
});

prevButton.addEventListener('click', (e) => {
  prevTrack();
});

repeatButton.addEventListener('click', (e) => {
  if (repeat === 'none') {
    repeat = 'all';
    repeatButton.classList.add('glow');
  } else if (repeat === 'all') {
    repeat = 'one';
    repeatButton.innerHTML = 1;
  } else {
    repeat = 'none';
    repeatButton.innerHTML = '<i class="fas fa-redo-alt"/>';
    repeatButton.classList.remove('glow');
  }
});

volume.oninput = () => {
  volumeLevel.innerHTML = volume.value;
  track.audio.volume = volume.value / 100;
};
