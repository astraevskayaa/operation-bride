document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const loaderText = document.getElementById("loaderText");
  const loaderProgress = document.getElementById("loaderProgress");
  const loaderStamp = document.getElementById("loaderStamp");
  const openInvitation = document.getElementById("openInvitation");
  const app = document.getElementById("app");

  const pages = Array.from(document.querySelectorAll(".page"));
  const nextButton = document.getElementById("nextButton");
  const progressDots = document.getElementById("progressDots");

  const envelope = document.getElementById("secretEnvelope");
  const tapHint = document.getElementById("tapHint");

  let currentPage = 0;
  let locked = false;

  const loadingSteps = [
    "Созываем семейный совет…",
    "Приглашаем старших…",
    "Наливаем чай…",
    "Обсуждаем ситуацию…",
    "Принимаем окончательное решение…"
  ];

  loadingSteps.forEach((text, index) => {
    window.setTimeout(() => {
      loaderText.textContent = text;
      loaderProgress.style.width = `${((index + 1) / loadingSteps.length) * 100}%`;

      if (index === loadingSteps.length - 1) {
        window.setTimeout(() => {
          loaderStamp.classList.add("show");
          openInvitation.hidden = false;
        }, 450);
      }
    }, index * 650);
  });

  openInvitation.addEventListener("click", () => {
    loader.style.opacity = "0";
    loader.style.transition = "opacity .45s ease";

    window.setTimeout(() => {
      loader.hidden = true;
      app.hidden = false;
      showPage(0);
    }, 450);
  });

  function createDots() {
    progressDots.innerHTML = "";
    pages.forEach((_, index) => {
      const dot = document.createElement("span");
      if (index === currentPage) dot.classList.add("active");
      progressDots.appendChild(dot);
    });
  }

  function showPage(index) {
    pages.forEach((page, pageIndex) => {
      const active = pageIndex === index;
      page.hidden = !active;
      page.classList.toggle("active", active);
      if (active) page.scrollTop = 0;
    });

    currentPage = index;
    nextButton.textContent = currentPage === pages.length - 1 ? "В начало" : "Далее";

    Array.from(progressDots.children).forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === currentPage);
    });
  }

  createDots();

  nextButton.addEventListener("click", () => {
    if (locked) return;
    locked = true;

    const nextIndex = currentPage === pages.length - 1 ? 0 : currentPage + 1;
    showPage(nextIndex);

    window.setTimeout(() => {
      locked = false;
    }, 420);
  });

  function openEnvelope() {
    if (envelope.classList.contains("open")) return;

    envelope.classList.add("open");
    envelope.setAttribute("aria-label", "Секретный конверт открыт");
    tapHint.textContent = "Доступ к маршруту всё равно закрыт";

    if ("vibrate" in navigator) {
      navigator.vibrate([50, 35, 85]);
    }
  }

  envelope.addEventListener("click", openEnvelope);
  envelope.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openEnvelope();
    }
  });
});
