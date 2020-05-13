const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const bodyContent = document.getElementById('bodyContent');
const header = document.querySelector('body h1');


button1.addEventListener('click', async () => {
  const res = await fetch('http://localhost:8081/body1/button');
  const data = await res.json();
  history.pushState({ body: 1 }, 'body1', 'http://localhost:8081/body1');
  bodyContent.innerHTML = data;
});

button2.addEventListener('click', async () => {
  const res = await fetch('http://localhost:8081/body2/button');
  const data = await res.json();
  history.pushState({ body: 2 }, 'body2', 'http://localhost:8081/body2');
  bodyContent.innerHTML = data;
});
