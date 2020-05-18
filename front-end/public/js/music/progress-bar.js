const startTime = document.getElementById('startTime');
const endTime = document.getElementById('endTime');

function updateTime() {
  const currentTime = Math.ceil(track.audio.currentTime);
  const duration = Math.floor(track.audio.duration) - currentTime;

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
}

setInterval(updateTime, 1000);
