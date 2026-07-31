document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const app = document.getElementById("app");
  const loaderText = document.getElementById("loaderText");
  const loaderProgress = document.getElementById("loaderProgress");
  const decisionStamp = document.getElementById("decisionStamp");
  const loaderActions = document.getElementById("loaderActions");
  const openButton = document.getElementById("openButton");
  const pages = [...document.querySelectorAll(".page")];
  const nextButton = document.getElementById("nextButton");
  const dots = document.getElementById("dots");
  const curiousButton = document.getElementById("curiousButton");
  const remarkCard = document.getElementById("remarkCard");
  const music = document.getElementById("music");
  const musicButton = document.getElementById("musicButton");
  const musicMini = document.getElementById("musicMini");
  const musicText = document.getElementById("musicText");
  const musicIcon = document.getElementById("musicIcon");
  let currentPage = 0;
  let locked = false;

  const loaderSteps = [
    "Проверяем маршрут…",
    "Заводим машину…",
    "Добавляем громкости…",
    "Убеждаемся, что всё готово…",
    "Выезжаем за красавицей…"
  ];

  loaderSteps.forEach((text, index) => {
    setTimeout(() => {
      loaderText.textContent = text;
      loaderProgress.style.width = `${((index + 1) / loaderSteps.length) * 100}%`;
      if (index === loaderSteps.length - 1) {
        setTimeout(() => {
          decisionStamp.classList.add("show");
          loaderActions.hidden = false;
        }, 400);
      }
    }, index * 600);
  });

  openButton.addEventListener("click", () => {
    loader.style.transition = "opacity .4s ease";
    loader.style.opacity = "0";
    setTimeout(() => { loader.hidden = true; app.hidden = false; showPage(0); }, 400);
  });

  pages.forEach((_, index) => {
    const dot = document.createElement("span");
    if (index === 0) dot.classList.add("active");
    dots.appendChild(dot);
  });

  function showPage(index) {
    pages.forEach((page, i) => { page.hidden = i !== index; if (i === index) page.scrollTop = 0; });
    currentPage = index;
    nextButton.textContent = currentPage === pages.length - 1 ? "В начало" : "Далее";
    [...dots.children].forEach((dot, i) => dot.classList.toggle("active", i === currentPage));
  }

  nextButton.addEventListener("click", () => {
    if (locked) return;
    locked = true;
    showPage(currentPage === pages.length - 1 ? 0 : currentPage + 1);
    setTimeout(() => locked = false, 350);
  });

  curiousButton.addEventListener("click", () => {
    remarkCard.hidden = false;
    curiousButton.textContent = "Любопытство зафиксировано";
    curiousButton.disabled = true;
    if ("vibrate" in navigator) navigator.vibrate([45,35,75]);
    setTimeout(() => remarkCard.scrollIntoView({behavior:"smooth",block:"nearest"}), 80);
  });

  function updateMusicUI() {
    const playing = !music.paused;
    musicButton.classList.toggle("playing", playing);
    musicMini.classList.toggle("playing", playing);
    musicText.textContent = playing ? "Выключить музыку" : "Включить музыку";
    musicIcon.textContent = playing ? "❚❚" : "♫";
    musicMini.textContent = playing ? "❚❚" : "♫";
  }

  async function toggleMusic() {
    try {
      if (music.paused) await music.play(); else music.pause();
    } catch (e) {
      musicText.textContent = "Добавь music.mp3 в папку сайта";
    }
    updateMusicUI();
  }

  musicButton.addEventListener("click", toggleMusic);
  musicMini.addEventListener("click", toggleMusic);
  music.addEventListener("play", updateMusicUI);
  music.addEventListener("pause", updateMusicUI);
  showPage(0);
});
