

const logInForm = document.getElementById('auth-form');

logInForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(logInForm);
  const email = formData.get('email');
  const password = formData.get('password');
  const body = { email, password };
  console.log(backendURL);
  const res = await fetch(`${backendURL}/login`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const { errors } = await res.json();
    errors.forEach((error) => {
      const errorP = document.createElement('p');
      if (error !== 'Invalid value') {
        errorP.innerHTML = error;
        errorP.classList.add('error');
        errorP.style.color = 'red';
        errorP.style['font-size'] = '.8rem';
        logInForm.prepend(errorP);
      }
    });
  }

  const {
    token,
    user: { id },
  } = await res.json();
  // storage access_token in localStorage:
  localStorage.setItem('VIBE_TOKEN', token);
  localStorage.setItem('VIBE_USER_ID', id);
  // redirect to music player
  window.location.href = '/music';
});
