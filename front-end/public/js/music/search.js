const searchBar = document.getElementsByName('search');
const mainContent = document.getElementById('mainContent');

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
