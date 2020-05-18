const sidebarLinks = document.getElementById('sidebarLinks');
const mainContent = document.getElementById('mainContent');
const sidebarPlaylists = document.getElementById('sidebarPlaylists');

sidebarLinks.addEventListener('click', async (event) => {
  if (!['home', 'search', 'library'].includes(event.target.id)) return;
  const res = await fetch(
    `http://localhost:8081/music/${event.target.id}/ajax`
  );
  const data = await res.json();
  history.pushState(
    { mainContent: 'home' },
    'home',
    `http://localhost:8081/music/${event.target.id}`
  );
  mainContent.innerHTML = data;
});

sidebarPlaylists.addEventListener('click', async (event) => {
  const playlistId = event.target.id;
  // get playlist by id
  const res = JSON.stringify([
    { id: 1, title: 'Hide and Seek', artist: 'Imogen Heap' },
    { id: 2, title: 'Seasons', artist: 'Type (A) Alert' },
    { id: 3, title: 'Teach Me Tonight', artist: 'Groove for Thought' },
  ]);

  const data = JSON.parse(res);

  songQueue = data;
  currentTrack = 0;
  startMusic(songQueue[currentTrack]);
});
