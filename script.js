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

  const musicButton = document.getElementById("musicButton");
  const musicMini = document.getElementById("musicMini");
  const musicText = document.getElementById("musicText");
  const musicIcon = document.getElementById("musicIcon");

  let currentPage = 0;
  let locked = false;
  let audioContext = null;
  let musicTimer = null;
  let musicPlaying = false;
  let noteIndex = 0;

  const loaderSteps = [
    "Созываем семейный совет…",
    "Приглашаем старших…",
    "Наливаем чай…",
    "Обсуждаем ситуацию…",
    "Принимаем окончательное решение…"
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

    setTimeout(() => {
      loader.hidden = true;
      app.hidden = false;
      showPage(0);
    }, 400);
  });

  pages.forEach((_, index) => {
    const dot = document.createElement("span");
    if (index === 0) dot.classList.add("active");
    dots.appendChild(dot);
  });

  function showPage(index) {
    pages.forEach((page, pageIndex) => {
      const isCurrent = pageIndex === index;
      page.hidden = !isCurrent;
      if (isCurrent) page.scrollTop = 0;
    });

    currentPage = index;
    nextButton.textContent = currentPage === pages.length - 1 ? "В начало" : "Далее";

    [...dots.children].forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === currentPage);
    });
  }

  nextButton.addEventListener("click", () => {
    if (locked) return;
    locked = true;

    const nextPage = currentPage === pages.length - 1 ? 0 : currentPage + 1;
    showPage(nextPage);

    setTimeout(() => {
      locked = false;
    }, 350);
  });

  curiousButton.addEventListener("click", () => {
    remarkCard.hidden = false;
    curiousButton.textContent = "Замечание получено";
    curiousButton.disabled = true;

    if ("vibrate" in navigator) {
      navigator.vibrate([45, 35, 75]);
    }

    setTimeout(() => {
      remarkCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 80);
  });

  const melody = [
    261.63, 329.63, 392.00, 523.25,
    392.00, 329.63, 293.66, 392.00,
    493.88, 587.33, 493.88, 392.00
  ];

  function playTone(frequency) {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;

    gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.07, audioContext.currentTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.42);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.45);
  }

  function updateMusicUI() {
    musicButton.classList.toggle("playing", musicPlaying);
    musicMini.classList.toggle("playing", musicPlaying);
    musicText.textContent = musicPlaying ? "Выключить музыку" : "Включить музыку";
    musicIcon.textContent = musicPlaying ? "❚❚" : "♫";
    musicMini.textContent = musicPlaying ? "❚❚" : "♫";
  }

  function startMusic() {
    if (musicPlaying) return;

    musicPlaying = true;
    noteIndex = 0;
    playTone(melody[noteIndex]);

    musicTimer = setInterval(() => {
      noteIndex = (noteIndex + 1) % melody.length;
      playTone(melody[noteIndex]);
    }, 480);

    updateMusicUI();
  }

  function stopMusic() {
    musicPlaying = false;

    if (musicTimer) {
      clearInterval(musicTimer);
      musicTimer = null;
    }

    updateMusicUI();
  }

  function toggleMusic() {
    if (musicPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  }

  musicButton.addEventListener("click", toggleMusic);
  musicMini.addEventListener("click", toggleMusic);

  showPage(0);
});
