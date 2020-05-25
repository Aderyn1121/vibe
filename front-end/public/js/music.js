import { backendURL, getUser, logoutUser, changelogo } from './global.js';

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
const contextMenu = document.getElementById('contextMenu');
const contextPlaylists = document.getElementById('contextPlaylists');
let newPLform = document.getElementById('newPLForm');
let newPLinput = document.getElementById('newPLinput');

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

const clickPlay = (e) => {
  setTimeout(playMusic, 200);
};

const playClickedSong = async (event) => {
  const songId = event.target.getAttribute('songsid');
  const songJSON = await fetch(`${backendURL}/songs/${songId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('VIBE_TOKEN')}`,
    },
  });
  const { songsList } = await songJSON.json();

  songQueue = songsList;
  loadQueueAtSongNumber(songQueue[0]);
  playMusic();
};

function loadQueueAtSongNumber(songInQueue) {
  track.audio.src = `../../public/test_music/${songInQueue.songId}.m4a`;
  track.art.innerHTML = `<img src='../../public/images/album-art/${songInQueue.albumId}.jpg' >`;
  track.title.innerHTML = songInQueue.songName;
  track.artist.innerHTML = songInQueue.artistName;
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
  progressBar.value = 0;
}

function nextTrack() {
  if (repeat === 'one') {
    loadQueueAtSongNumber(songQueue[currentTrack]);
    track.audio.classList.add('playing');
    return;
  }

  currentTrack++;

  if (currentTrack > songQueue.length - 1 && repeat === 'none') {
    stopMusic();
    return;
  }

  if (currentTrack > songQueue.length - 1 && repeat === 'all') {
    currentTrack = 0;
  }
  loadQueueAtSongNumber(songQueue[currentTrack]);
  track.audio.classList.add('playing');
}

function prevTrack() {
  if (currentTrack > 0 && track.audio.currentTime < 1.5) {
    currentTrack--;
  }
  loadQueueAtSongNumber(songQueue[currentTrack]);
}

function updateTime(currentTime = Math.ceil(track.audio.currentTime)) {
  const duration = Math.floor(track.audio.duration) - currentTime;
  const percent = currentTime / track.audio.duration;
  const mins =
    Math.floor(currentTime / 60) < 10
      ? `0${Math.floor(currentTime / 60)}`
      : Math.floor(currentTime / 60);
  const seconds =
    currentTime % 60 < 10 ? `0${currentTime % 60}` : currentTime % 60;

  startTime.innerHTML = `${mins}:${seconds}`;

  if (duration) {
    const durationMins =
      Math.floor(duration / 60) < 10
        ? `0${Math.floor(duration / 60)}`
        : Math.floor(duration / 60);
    const durationSeconds =
      duration % 60 < 10 ? `0${duration % 60}` : duration % 60;

    endTime.innerHTML = `${durationMins}:${durationSeconds}`;
  } else {
    endTime.innerHTML = '00:00';
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
  contextPlaylists.innerHTML = '';
  sidebarPlaylists.innerHTML = `
  <form id="newPLForm" class="hidden">
  <input class="newPlaylist" name="newPlaylist" type="text" id="newPLinput">
  </form>`;

  newPLform = document.getElementById('newPLForm');
  newPLinput = document.getElementById('newPLinput');

  playlists.forEach((playlist) => {
    const div = document.createElement('div');

    div.setAttribute('playlistid', playlist.playlistId);
    div.innerHTML = `<div playlistid=${playlist.playlistId}>${playlist.playList}</div>`;
    const contextDiv = div.cloneNode(true);
    contextDiv.classList.add('contextPlaylist');
    sidebarPlaylists.appendChild(div);
    contextPlaylists.appendChild(contextDiv);
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
    const playlistDiv = document.createElement('div');
    const playlistImg = document.createElement('img');
    const playlistText = document.createElement('div');

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
  });
};

//SEARCH FUNCTIONS

const updateSearchSection = (results, section) => {
  const mainSection = document.getElementById(`search${section}`);
  const resultSection = document.getElementById(`result${section}`);
  const noResults = document.getElementById('noResults');
  if (results.length === 0) {
    noResults.classList.remove('hidden');
    mainSection.classList.add('hidden');
    return;
  }
  noResults.classList.add('hidden');
  mainSection.classList.remove('hidden');

  if (section === 'Playlists') {
    section = 'playlist';
  }
  section = section.toLowerCase();

  resultSection.innerHTML = '';

  results.forEach((result) => {
    const div = document.createElement('div');
    const img = document.createElement('img');
    const text = document.createElement('div');

    div.classList.add('square');
    div.setAttribute(`${section}id`, result.id);
    img.src = `/public/images/playlists/${Math.floor(
      Math.random() * (15 - 1) + 1
    )}.jpg`;
    img.setAttribute(`${section}id`, result.id);
    text.innerHTML = result.name;
    div.appendChild(img);
    div.appendChild(text);
    if (section === 'songs') {
      const plus = document.createElement('div');
      plus.classList.add('search-plus');
      plus.setAttribute('songsid', result.id);

      plus.innerHTML = `<i songsid=${result.id} class="fas fa-plus"></i>`;

      plus.addEventListener('click', (event1) => {
        event1.stopPropagation();
        contextMenu.classList.remove('hidden');
        contextMenu.style.top = `${event1.pageY - 10}px`;
        contextMenu.style.left = `${event1.pageX - 10}px`;

        contextPlaylists.addEventListener(
          'click',
          async (event3) => {
            const playlistId = event3.target.getAttribute('playlistid');
            const songId = event1.target.getAttribute('songsid');
            const body = { songId: songId };
            await fetch(`${backendURL}/playlists/${playlistId}/songs`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('VIBE_TOKEN')}`,
              },
              body: JSON.stringify(body),
            });
            contextMenu.classList.add('hidden');
          },
          { once: true }
        );
      });

      div.appendChild(plus);

      div.addEventListener('click', async (e) => {
        if (!event.target.getAttribute('songsid')) return;
        playClickedSong(e);
      });
    } else if (section === 'playlist') {
      div.addEventListener('click', async (e) => {
        playPlaylist(e);
      });
    }

    div.addEventListener('click', clickPlay);

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

  updateSearchSection(searchResults.matchedPlaylists, 'Playlists');

  updateSearchSection(searchResults.matchedArtist, 'Artists');

  updateSearchSection(searchResults.matchedSongs, 'Songs');

  updateSearchSection(searchResults.matchedAlbums, 'Albums');

  // updateSearchSection(searchResults.matchedFriends, 'Friends');

  updateSearchSection(searchResults.matchedUsers, 'Users');
};

//PLAYLIST FUNCTIONS

const getPlaylist = async (playlistId) => {
  const playlistJSON = await fetch(`${backendURL}/playlists/${playlistId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('VIBE_TOKEN')}`,
    },
  });

  const { playlistName } = await playlistJSON.json();
  return playlistName;
};

const getPlaylistSongs = async (playlistId) => {
  const songsJSON = await fetch(`${backendURL}/playlists/${playlistId}/songs`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('VIBE_TOKEN')}`,
    },
  });

  const { songsList } = await songsJSON.json();
  return songsList;
};

const playPlaylist = async (event, songNumber = 0) => {
  if (!event.target.getAttribute('playlistid')) return;
  const playlistId = event.target.getAttribute('playlistid');
  const songs = await getPlaylistSongs(playlistId);

  if (songs.length > 0) {
    songQueue = songs;

    currentTrack = songNumber;
    loadQueueAtSongNumber(songQueue[currentTrack]);
    playMusic();
  }
};

const deletePlaylist = async (event) => {
  const playlistId = event.target.getAttribute('playlistid');

  const res = await fetch(`${backendURL}/playlists/${playlistId}/delete`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('VIBE_TOKEN')}`,
    },
  });

  if (!res.ok) {
    return;
  }

  const home = await fetch(`/music/home/ajax`);
  const data = await home.json();
  mainContent.innerHTML = data;

  history.pushState({ mainContent: 'home' }, 'home', `/music/home`);
  updateHome();
  updatePlaylists();
};

const editPlaylist = async (event) => {
  const playlistId = window.location.href.match(/\d+$/)[0];
  const editPlaylistTitle = document.getElementById('editPlaylistTitle');
  const editTitleForm = document.getElementById('editTitleForm');
  const editTitleInput = document.getElementById('editTitleInput');
  editPlaylistTitle.classList.add('hidden');
  editTitleForm.classList.remove('hidden');
  editTitleInput.focus();

  editTitleInput.addEventListener('blur', (event2) => {
    event2.stopPropagation();
    editPlaylistTitle.classList.remove('hidden');
    editTitleForm.classList.add('hidden');
  });
  editTitleForm.addEventListener('submit', async (event3) => {
    event3.preventDefault();
    const formData = new FormData(editTitleForm);
    const playlistName = formData.get('newPlaylistTitle');
    const body = { playlistName };

    await fetch(`${backendURL}/playlists/${playlistId}/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('VIBE_TOKEN')}`,
      },
      body: JSON.stringify(body),
    });
    editPlaylistTitle.innerHTML = playlistName;
    editPlaylistTitle.classList.remove('hidden');
    editTitleForm.classList.add('hidden');
    sidebarPlaylists.innerHTML = '';
    updatePlaylists();
  });
};

const deleteSongFromPlaylist = async (event) => {
  const songId = event.target.getAttribute('songid');
  const playlistId = window.location.href.match(/\d+$/);
  await fetch(`${backendURL}/playlists/${playlistId}/songs/${songId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('VIBE_TOKEN')}`,
    },
  });
  updateEditPlaylistsList(playlistId);
};

const updateEditPlaylistsList = async (playlistId) => {
  const songs = await getPlaylistSongs(playlistId);
  const tableBody = document.getElementById('tableBody');
  if (songs.length === 0) {
    tableBody.innerHTML = '<div.addSongs>No songs found</div>';
    return;
  }

  tableBody.innerHTML = '';
  let trackCounter = 0;
  songs.forEach((song) => {
    const songDiv = document.createElement('div');
    const trackDiv = document.createElement('div');
    const artistDiv = document.createElement('div');
    const albumDiv = document.createElement('div');
    const deleteDiv = document.createElement('div');

    songDiv.classList.add('song');
    trackDiv.classList.add('listsong');
    artistDiv.classList.add('listsong');
    albumDiv.classList.add('listsong');
    deleteDiv.classList.add('delete');

    trackDiv.setAttribute('songsid', song.songId);
    trackDiv.setAttribute('playlistid', playlistId);
    trackDiv.setAttribute('trackid', trackCounter);
    artistDiv.setAttribute('artistId', song.artistId);
    albumDiv.setAttribute('albumId', song.albumId);
    deleteDiv.setAttribute('songId', song.songId);

    trackDiv.innerHTML = song.songName;
    artistDiv.innerHTML = song.artistName;
    albumDiv.innerHTML = song.albumName;
    deleteDiv.innerHTML = `<i songId=${song.songId} class="fas fa-trash"></i>`;

    trackDiv.addEventListener('click', async (event) => {
      playPlaylist(event, event.target.getAttribute('trackid'));
    });
    trackDiv.addEventListener('click', clickPlay);
    trackCounter++;

    deleteDiv.addEventListener('click', deleteSongFromPlaylist);

    songDiv.appendChild(trackDiv);
    songDiv.appendChild(artistDiv);
    songDiv.appendChild(albumDiv);
    songDiv.appendChild(deleteDiv);

    tableBody.appendChild(songDiv);
  });
};

const updateEditPlaylist = async (playlistId) => {
  const EPLTitle = document.getElementById('editPlaylistTitle');
  const EPLPlayButton = document.getElementById('editPlaylistPlayButton');
  const EPLDeleteButton = document.getElementById('editPlaylistDeleteButton');
  const EPLEditButton = document.getElementById('editIcon');

  const playlistName = await getPlaylist(playlistId);

  EPLTitle.innerHTML = playlistName;
  EPLPlayButton.setAttribute('playlistid', playlistId);
  EPLDeleteButton.setAttribute('playlistid', playlistId);
  EPLPlayButton.addEventListener('click', (e) => {
    playPlaylist(e);
  });
  EPLPlayButton.addEventListener('click', clickPlay);
  EPLDeleteButton.addEventListener('click', deletePlaylist);
  EPLEditButton.addEventListener('click', editPlaylist);
  updateEditPlaylistsList(playlistId);
};

//INITAL LOAD

if (!localStorage['VIBE_TOKEN']) {
  window.location.replace('/login');
} else {
  const username = document.getElementById('username');
  updateUser();
  updatePlaylists();
  changelogo('#000000');
  if (window.location.href.includes('library')) {
    // updateLibrary()
  } else if (window.location.href.includes('search')) {
    updateSearch();
  } else if (window.location.href.includes('playlist')) {
    const windowId = window.location.href.match(/\d+$/);
    updateEditPlaylist(windowId[0]);
  } else {
    updateHome();
  }
}

//EVENT LISTENERS

track.audio.addEventListener('ended', async () => {
  await nextTrack();
  if (track.audio.classList.contains('playing')) {
    playMusic();
  }
});

playButton.addEventListener('click', (e) => {
  if (track.audio.classList.contains('playing')) {
    pauseMusic();
  } else {
    playMusic();
  }
});

nextButton.addEventListener('click', async (e) => {
  await nextTrack();
  if (track.audio.classList.contains('playing')) {
    playMusic();
  }
});

prevButton.addEventListener('click', async (e) => {
  await prevTrack();
  playMusic();
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

volume.onchange = () => {
  track.audio.volume = volume.value / 100;
};

progressBar.oninput = function (event) {
  if (!track.audio.src) return;
  clearInterval(interval);

  const percent = progressBar.value / 100;

  updateTime(Math.floor(track.audio.duration * percent));
};

progressBar.onchange = function (event) {
  if (!track.audio.src) return;

  pauseMusic();

  const percent = progressBar.value / 100;
  track.audio.currentTime = Math.floor(track.audio.duration * percent);

  playMusic();
};

searchBar[0].addEventListener('focus', async (event) => {
  if (window.location.href.includes('search')) return;
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
  if (!['home', 'search', 'library'].includes(event.target.id)) return;
  if (window.location.href.includes(event.target.id)) return;
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

sidebarPlaylists.addEventListener('click', async (event) => {
  if (!event.target.getAttribute('playlistid')) return;
  if (
    window.location.href.match(/\d+$/) &&
    window.location.href.match(/\d+$/)[0] ===
      event.target.getAttribute('playlistid')
  )
    return;

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
  newPLform.classList.remove('hidden');
  newPLinput.focus();

  newPLinput.addEventListener('blur', (event) => {
    event.stopPropagation();
    newPLform.classList.add('hidden');
  });

  newPLform.addEventListener('submit', async (event2) => {
    event2.preventDefault();
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

contextMenu.addEventListener('mouseleave', (event2) => {
  contextMenu.classList.add('hidden');
});
