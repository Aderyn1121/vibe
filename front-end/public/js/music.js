const updateUser = async () => {
  const user = await getUser();

  navButtons.innerHTML = `<a id=logoutButton>Logout</a><a>${user.username}</a>`;

  const logoutButton = document.getElementById('logoutButton');
  logoutButton.addEventListener('mouseup', logoutUser);
};

const updatePlaylists = async () => {
  const user = await getUser();
  const playlistsJSON = await fetch(
    `http://localhost:8080/users/${user.userId}/playlists`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('VIBE_TOKEN')}`,
      },
    }
  );
  const { playlistNames: playlists } = await playlistsJSON.json();
  const sidebarPlaylists = document.getElementById('sidebarPlaylists');

  playlists.forEach((playlist) => {
    const div = document.createElement('div');
    div.innerHTML = `<div id=${playlist.playlistId}>${playlist.playList}</div>`;
    sidebarPlaylists.appendChild(div);
  });
};
// inital load

//Authorization
if (!localStorage['VIBE_TOKEN']) {
  window.location.replace('http://localhost:8081/login');
} else {
  const username = document.getElementById('username');
  updateUser();
  updatePlaylists();
}

const track = {
  art: document.getElementById('trackArt'),
  title: document.getElementById('trackTitle'),
  artist: document.getElementById('trackArtist'),
  audio: document.getElementById('trackAudio'),
};
let interval;
let songQueue = [];
let currentTrack = 0;
let repeat = 'none';

function playMusic() {
  track.audio.play();
  playButton.innerHTML = '<i class="fas fa-pause"></i>';
  track.audio.classList.add('playing');
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(updateTime, 1000);
}

function startMusic(songInQueue) {
  track.audio.src = `../../public/test_music/${songInQueue.songId}.m4a`;
  track.art.innerHTML = `<img src='../../public/images/album-art/${songInQueue.songId}.jpg' >`;
  track.title.innerHTML = songInQueue.playlistSong;
  // track.artist.innerHTML = songInQueue.artist;
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
