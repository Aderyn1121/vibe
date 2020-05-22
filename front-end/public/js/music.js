/*
DEFINITIONS
 */

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

const volumeLevel = document.getElementById('volumeLevel');
const volume = document.getElementById('volume');
const playButton = document.getElementById('playButton');
const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');
const repeatButton = document.getElementById('repeatButton');
const startTime = document.getElementById('startTime');
const endTime = document.getElementById('endTime');
const progressBar = document.getElementById('progress-bar');
const searchBar = document.getElementsByName('search');
const mainContent = document.getElementById('mainContent');
const sidebarLinks = document.getElementById('sidebarLinks');
const sidebarPlaylists = document.getElementById('sidebarPlaylists');
const plusIcon = document.getElementById('plusIcon');

//PLAYER FUNCTIONS
const playMusic = async () => {
  document.body.style.cursor = 'progress';
  await track.audio.play();
  track.audio.volume = volume.value / 100;
  document.body.style.cursor = 'default';
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
  document.body.style.cursor = 'default';
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
function updateTime(currentTime = Math.ceil(track.audio.currentTime)) {
  const duration = Math.floor(track.audio.duration) - currentTime;
  const percent = currentTime / track.audio.duration;

  const hours =
    Math.floor(currentTime / 3600) < 10
      ? `0${Math.floor(currentTime / 3600)}`
      : Math.floor(currentTime / 3600);
  const mins =
    Math.floor(currentTime / 60) < 10
      ? `0${Math.floor(currentTime / 60)}`
      : Math.floor(currentTime / 60);
  const seconds =
    currentTime % 60 < 10 ? `0${currentTime % 60}` : currentTime % 60;

  startTime.innerHTML = `${hours}:${mins}:${seconds}`;

  if (duration) {
    const durationHours =
      Math.floor(duration / 3600) < 10
        ? `0${Math.floor(duration / 3600)}`
        : Math.floor(duration / 3600);
    const durationMins =
      Math.floor(duration / 60) < 10
        ? `0${Math.floor(duration / 60)}`
        : Math.floor(duration / 60);
    const durationSeconds =
      duration % 60 < 10 ? `0${duration % 60}` : duration % 60;

    endTime.innerHTML = `${durationHours}:${durationMins}:${durationSeconds}`;
  } else {
    endTime.innerHTML = '00:00:00';
  }
  progressBar.value = Math.floor(percent * 100);
}

// NAV FUNCTIONS
const updateUser = async () => {
  const user = await getUser();
  const welcome = document.getElementById('welcome');

  welcome.innerHTML = `Welcome, ${user.username}`;

  const logoutButton = document.getElementById('logoutButton');
  logoutButton.addEventListener('mouseup', logoutUser);
};

// SIDEBAR FUNCTIONS

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
    div.setAttribute('playlistid', playlist.playlistId);
    div.innerHTML = `<div playlistid=${playlist.playlistId}>${playlist.playList}</div>`;
    sidebarPlaylists.appendChild(div);
  });
};

//HOME FUNCTIONS
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
    playlistDiv = document.createElement('div');
    playlistImg = document.createElement('img');
    playlistText = document.createElement('div');

    playlistDiv.classList.add('home__playlist');
    playlistImg.src = `/public/images/playlists/${Math.floor(
      Math.random() * (15 - 1) + 1
    )}.jpg`;
    playlistImg.setAttribute('playlistid', playlist.playlistId);
    playlistText.innerHTML = playlist.playList;
    playlistDiv.appendChild(playlistImg);
    playlistDiv.appendChild(playlistText);

    homePlaylists.prepend(playlistDiv);

    homePlaylists.addEventListener('click', async (event) => {
      playPlaylist();
    });
  });
};

//SEARCH FUNCTIONS

const updateSearchSection = (results, section) => {
  const resultSection = document.getElementById(`result${section}`);
  if (results.length === 0) {
    resultSection.innerHTML = `No ${section} found`;
    return;
  }

  resultSection.innerHTML = '';

  results.forEach((result) => {
    const div = document.createElement('div');
    const img = document.createElement('img');
    const text = document.createElement('div');

    div.classList.add('square');
    img.src = `/public/images/playlists/${Math.floor(
      Math.random() * (15 - 1) + 1
    )}.jpg`;
    // img.setAttribute(`${section}id`);
    text.innerHTML = result;
    div.appendChild(img);
    div.appendChild(text);

    resultSection.prepend(div);
  });
};

const updateSearch = async () => {
  if (!searchBar[0].value) return;
  const searchInput = encodeURIComponent(searchBar[0].value);
  const userId = encodeURIComponent(localStorage.getItem('VIBE_USER_ID'));
  const token = encodeURIComponent(localStorage.getItem('VIBE_TOKEN'));

  const resultsJSON = await fetch(
    `${backendURL}/search/?searchInput=${searchInput}&userId=${userId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('VIBE_TOKEN')}`,
      },
    }
  );

  const { searchResults } = await resultsJSON.json();

  // updateSearchSection(searchResults.matchedPlaylists, 'Playlists');

  updateSearchSection(searchResults.matchedArtist, 'Artists');

  updateSearchSection(searchResults.matchedSongs, 'Songs');

  updateSearchSection(searchResults.matchedAlbums, 'Albums');

  // updateSearchSection(searchResults.matchedFriends, 'Friends');

  // updateSearchSection(searchResults.matchedUsers, 'Users');
};

//PLAYLIST FUNCTIONS

const updateEditPlaylist = async (playlistId) => {
  const EPLTitle = document.getElementById('editPlaylistTitle');
  const EPLPlayButton = document.getElementById('editPlaylistPlayButton');
  const EPLDeleteButton = document.getElementById('editPlaylistDeleteButton');
  const EPLEditButton = document.getElementById('editIcon');

  const playlistJSON = await fetch(`${backendURL}/playlists/${playlistId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('VIBE_TOKEN')}`,
    },
  });

  const { playlistName } = await playlistJSON.json();
  EPLTitle.innerHTML = playlistName;
  EPLPlayButton.setAttribute('playlistid', playlistId);
  EPLDeleteButton.setAttribute('playlistid', playlistId);
  EPLPlayButton.onclick = () => {
    playPlaylist();
  };
  EPLDeleteButton.onclick = () => {
    console.log('still need to write delete');
  };
  EPLEditButton.onclick = () => {
    console.log('still need to write edit');
  };
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

//INITAL LOAD

if (!localStorage['VIBE_TOKEN']) {
  window.location.replace('/login');
} else {
  const username = document.getElementById('username');
  updateUser();
  updatePlaylists();
  changelogo(0, '#000000');
  if (window.location.href.includes('library')) {
    // updateLibrary()
  } else if (window.location.href.includes('search')) {
    updateSearch();
  } else if (window.location.href.includes('playlist')) {
    const windowId = window.location.href.match(/\d$/);
    updateEditPlaylist(windowId[0]);
  } else {
    updateHome();
  }
}

//EVENT LISTENERS

track.audio.addEventListener('ended', () => {
  nextTrack();
});

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

progressBar.oninput = function (event) {
  if (!track.audio.src) return;
  clearInterval(interval);
  const percent = progressBar.value / 100;
  updateTime(Math.floor(track.audio.duration * percent));
  const changeTrackTime = () => {
    track.audio.currentTime = Math.floor(track.audio.duration * percent);
    playMusic();
    document.body.removeEventListener('mouseup', changeTrackTime);
  };
  document.body.addEventListener('mouseup', changeTrackTime);
};

searchBar[0].addEventListener('focus', async (event) => {
  const res = await fetch(`/music/search/ajax`);
  const data = await res.json();
  history.pushState({ mainContent: 'search' }, 'search', '/music/search');
  mainContent.innerHTML = data;
  updateSearch();
});

searchBar[0].addEventListener('keyup', async () => {
  updateSearch();
});

sidebarLinks.addEventListener('click', async (event) => {
  console.log('working');
  if (!['home', 'search', 'library'].includes(event.target.id)) return;
  const res = await fetch(`/music/${event.target.id}/ajax`);
  const data = await res.json();
  mainContent.innerHTML = data;

  history.pushState(
    { mainContent: event.target.id },
    event.target.id,
    `/music/${event.target.id}`
  );

  if (event.target.id === 'home') {
    updateHome();
  } else if (event.target.id === 'search') {
    updateSearch();
  } else {
    // updateLibrary()
  }
});

// sidebarPlaylists.addEventListener('click', async (event) => {
//   playPlaylist();
// });

sidebarPlaylists.addEventListener('click', async (event) => {
  if (!event.target.getAttribute('playlistid')) return;
  const playlistId = event.target.getAttribute('playlistid');

  const res = await fetch(`/music/playlist/${playlistId}/ajax`);
  const data = await res.json();
  history.pushState(
    { playlist: playlistId },
    playlistId,
    `/music/playlist/${playlistId}`
  );
  mainContent.innerHTML = data;
  updateEditPlaylist(playlistId);
});

plusIcon.addEventListener('click', () => {
  const newPLform = document.createElement('form');
  newPLform.innerHTML =
    '<input id = newPlaylist class= "newPlaylist", name= "newPlaylist", type="text">';
  sidebarPlaylists.prepend(newPLform);
  const playlistInput = document.getElementById('newPlaylist');
  playlistInput.focus();
  newPLform.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(newPLform);
    const playlistName = formData.get('newPlaylist');
    const body = { playlistName };
    const user = await getUser();

    await fetch(`${backendURL}/users/${user.userId}/playlists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('VIBE_TOKEN')}`,
      },
      body: JSON.stringify(body),
    });
    sidebarPlaylists.innerHTML = '';
    updatePlaylists();
  });
});
