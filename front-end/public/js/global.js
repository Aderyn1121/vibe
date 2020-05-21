const backendURL = document
  .getElementsByTagName('script')[0]
  .getAttribute('backend');
const logoStyle = document.getElementsByClassName('logoStyle');

const getUser = async () => {
  const userId = localStorage.getItem('VIBE_USER_ID');

  const res = await fetch(`${backendURL}/users/${userId}`, {
    method: 'GET',
  });
  const user = await res.json();
  return user;
};

const logoutUser = () => {
  localStorage.removeItem('VIBE_TOKEN');
  localStorage.removeItem('VIBE_USER_ID');
  window.location.replace('/');
};

const changelogo = (number, pathColor, fillColor = '#fde74c') => {
  logoStyle[number].innerHTML = `.cls-1,
  .cls-4 {
    fill: none;
  }
  .cls-2 {
    clip-path: url(#clip-path);
  }
  .cls-3 {
    fill: ${fillColor};
  }
  .cls-4 {
    stroke: ${pathColor};
    stroke-miterlimit: 10;
    stroke-width: 30px;
    
  }`;
};
