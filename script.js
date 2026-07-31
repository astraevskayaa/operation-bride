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
  const typedLine = document.getElementById("typedLine");
  const revealLine = document.getElementById("revealLine");
  const openingReveal = document.getElementById("openingReveal");
  const finalWriting = document.getElementById("finalWriting");
  let typingStarted = false;

  let currentPage = 0;
  let locked = false;

  const loaderSteps = [
    "Собираем девчонок…",
    "Проверяем тайный маршрут…",
    "Готовим машину…",
    "Убеждаемся, что всё красиво…",
    "Осталось забрать красавицу…"
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
    loader.style.transition = "opacity .45s ease";
    loader.style.opacity = "0";

    setTimeout(() => {
      loader.hidden = true;
      app.hidden = false;
      showPage(0);
    }, 450);
  });

  pages.forEach((_, index) => {
    const dot = document.createElement("span");
    if (index === 0) dot.classList.add("active");
    dots.appendChild(dot);
  });


  function startOpeningAnimation() {
    if (typingStarted || !typedLine) return;
    typingStarted = true;

    const text = typedLine.dataset.text || "";
    typedLine.textContent = "";
    let index = 0;

    const timer = setInterval(() => {
      typedLine.textContent += text[index] || "";
      index += 1;

      if (index >= text.length) {
        clearInterval(timer);
        setTimeout(() => revealLine?.classList.add("show"), 350);
        setTimeout(() => openingReveal?.classList.add("show"), 800);
      }
    }, 85);
  }

  function showPage(index) {
    pages.forEach((page, pageIndex) => {
      const active = pageIndex === index;
      page.hidden = !active;
      if (active) page.scrollTop = 0;
    });

    currentPage = index;

    if (currentPage === 0) {
      startOpeningAnimation();
    }

    if (currentPage === pages.length - 1) {
      setTimeout(() => finalWriting?.classList.add("show"), 500);
    }

    if (currentPage === pages.length - 1) {
      nextButton.hidden = true;
      musicMini.hidden = false;
    } else {
      nextButton.textContent = "Далее";
      nextButton.hidden = false;
      musicMini.hidden = false;
    }

    [...dots.children].forEach((dot, index) => {
      dot.classList.toggle("active", index === currentPage);
    });
  }

  nextButton.addEventListener("click", () => {
    if (locked || currentPage >= pages.length - 1) return;

    locked = true;
    showPage(currentPage + 1);

    setTimeout(() => {
      locked = false;
    }, 450);
  });

  curiousButton.addEventListener("click", () => {
    remarkCard.hidden = false;
    curiousButton.textContent = "Ответ получен";
    curiousButton.disabled = true;

    if ("vibrate" in navigator) {
      navigator.vibrate([45, 35, 75]);
    }

    setTimeout(() => {
      remarkCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 80);
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
      if (music.paused) {
        await music.play();
      } else {
        music.pause();
      }
    } catch (error) {
      musicText.textContent = "Проверь файл music.mp3";
    }

    updateMusicUI();
  }

  musicButton.addEventListener("click", toggleMusic);
  musicMini.addEventListener("click", toggleMusic);
  music.addEventListener("play", updateMusicUI);
  music.addEventListener("pause", updateMusicUI);

  showPage(0);
});
