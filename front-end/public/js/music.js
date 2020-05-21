// inital load

//Authorization

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

const playMusic = async () => {
  track.audio.play();
  playButton.innerHTML = '<i class="fas fa-pause"></i>';
  track.audio.classList.add('playing');
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(updateTime, 1000);
};

function startMusic(songInQueue) {
  track.audio.src = `../../public/test_music/${songInQueue.songId}.m4a`;
  track.art.innerHTML = `<img src='../../public/images/album-art/${songInQueue.songId}.jpg' >`;
  track.title.innerHTML = songInQueue.playlistSong;
  track.artist.innerHTML = songInQueue.artistName;
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

// Music funtions
const updateUser = async () => {
  const user = await getUser();
  const welcome = document.getElementById('welcome');

  welcome.innerHTML = `<h3>Welcome, ${user.username}</h3>`;

  const logoutButton = document.getElementById('logoutButton');
  logoutButton.addEventListener('mouseup', logoutUser);
};

const updatePlaylists = async () => {
  const user = await getUser();
  const playlistsJSON = await fetch(
    `${backendURL}/users/${user.userId}/playlists`,
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
    div.innerHTML = `<div playlistid=${playlist.playlistId}>${playlist.playList}</div>`;
    sidebarPlaylists.appendChild(div);
  });
};

const playPlaylist = async () => {
  if (!event.target.getAttribute('playlistid')) return;
  const playlistId = event.target.getAttribute('playlistid');
  const playlistJSON = await fetch(
    `${backendURL}/playlists/${playlistId}/songs`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('VIBE_TOKEN')}`,
      },
    }
  );

  const { songsList: playlist } = await playlistJSON.json();

  if (playlist.length > 0) {
    songQueue = playlist;
    currentTrack = 0;
    startMusic(songQueue[currentTrack]);
  }
};

const updateHome = async () => {
  const userId = localStorage.getItem('VIBE_USER_ID');
  const playlistsJSON = await fetch(`${backendURL}/users/${userId}/playlists`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('VIBE_TOKEN')}`,
    },
  });

  const { playlistNames: playlists } = await playlistsJSON.json();
  const homePlaylists = document.getElementById('homePlaylists');
  playlists.forEach((playlist) => {
    console.log(playlist);
    playlistDiv = document.createElement('div');
    playlistImg = document.createElement('img');
    playlistText = document.createElement('div');

    playlistDiv.classList.add('home__playlist');
    playlistImg.src = `/public/images/playlists/${Math.floor(
      Math.random() * (16 - 1) + 1
    )}.jpg`;
    playlistImg.setAttribute('playlistid', playlist.playlistId);
    playlistText.innerHTML = playlist.playList;
    playlistDiv.appendChild(playlistImg);
    playlistDiv.appendChild(playlistText);

    homePlaylists.prepend(playlistDiv);

    homePlaylists.addEventListener('click', async (event) => {
      console.log(event.target);
      playPlaylist();
    });
  });
};

if (!localStorage['VIBE_TOKEN']) {
  window.location.replace('/login');
} else {
  const username = document.getElementById('username');
  updateUser();
  updatePlaylists();
  changelogo(0, '#000000');
  updateHome();
}

document.body.style.cursor = 'default';

track.audio.addEventListener('ended', () => {
  nextTrack();
});

track.audio.addEventListener('playing', () => {
  document.body.style.cursor = 'default';
});

track.audio.addEventListener('loadstart', () => {
  document.body.style.cursor = 'progress';
});

window.addEventListener('load', () => {
  document.body.style.cursor = 'default';
});
