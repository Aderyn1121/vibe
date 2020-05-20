const sidebarLinks = document.getElementById('sidebarLinks');
const mainContent = document.getElementById('mainContent');
const sidebarPlaylists = document.getElementById('sidebarPlaylists');

sidebarLinks.addEventListener('click', async (event) => {
  if (!['home', 'search', 'library'].includes(event.target.id)) return;
  const res = await fetch(`/music/${event.target.id}/ajax`);
  const data = await res.json();
  history.pushState(
    { mainContent: 'home' },
    'home',
    `/music/${event.target.id}`
  );
  mainContent.innerHTML = data;
});

sidebarPlaylists.addEventListener('click', async (event) => {
  if (!event.target.id) return;
  const playlistId = event.target.id;
  const playlistJSON = await fetch(
    `${backendUrl}/playlists/${playlistId}/songs`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('VIBE_TOKEN')}`,
      },
    }
  );

  const { songsList: playlist } = await playlistJSON.json();

  console.log(playlist);

  if (playlist.length > 0) {
    songQueue = playlist;
    currentTrack = 0;
    startMusic(songQueue[currentTrack]);
  }
});
