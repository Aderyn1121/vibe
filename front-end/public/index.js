const signUpButton = document.getElementsByClassName('nav-bar__sign-up');

signUpButton[0].addEventListener('click', async (e) => {
  const res = await fetch('http://localhost:8081/signup/ajax');
  const data = await res.json();

  document = data;
});

// button1.addEventListener('click', async (e) => {
//   const res = await fetch('http://localhost:8081/body1/button');
//   const data = await res.json();
//   history.pushState({ body: 1 }, 'body1', 'http://localhost:8081/body1');
//   bodyContent.innerHTML = data;
// });
