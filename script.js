const body = document.body;

const loadingScreen = document.getElementById("loadingScreen");
const documentScreen = document.getElementById("documentScreen");
const progressBar = document.getElementById("progressBar");
const loadingLines = [...document.querySelectorAll(".loading-line")];
const openFolderButton = document.getElementById("openFolderButton");
const waxStamp = document.getElementById("waxStamp");

const continueButton = document.getElementById("continueButton");
const decisionSection = document.getElementById("decisionSection");
const dressButton = document.getElementById("dressButton");
const dressSection = document.getElementById("dressSection");
const planButton = document.getElementById("planButton");
const planSection = document.getElementById("planSection");
const moreButton = document.getElementById("moreButton");
const answer = document.getElementById("answer");
const acceptButton = document.getElementById("acceptButton");
const finalScreen = document.getElementById("finalScreen");

let step = 0;

function runLoading() {
  const interval = window.setInterval(() => {
    progressBar.style.width = `${(step + 1) * 25}%`;

    loadingLines.forEach((line, index) => {
      line.classList.toggle("active", index === step);
    });

    step += 1;

    if (step >= loadingLines.length) {
      window.clearInterval(interval);

      window.setTimeout(() => {
        openFolderButton.classList.add("show");
      }, 500);
    }
  }, 900);
}

window.addEventListener("load", runLoading);

openFolderButton.addEventListener("click", () => {
  loadingScreen.classList.add("hidden-section");
  documentScreen.classList.remove("hidden-section");
  body.classList.remove("locked");

  window.setTimeout(() => {
    waxStamp.classList.add("show");
  }, 550);
});

continueButton.addEventListener("click", () => {
  decisionSection.classList.remove("hidden-section");
  decisionSection.scrollIntoView({ behavior: "smooth" });
});

dressButton.addEventListener("click", () => {
  dressSection.classList.remove("hidden-section");
  dressSection.scrollIntoView({ behavior: "smooth" });
});

planButton.addEventListener("click", () => {
  planSection.classList.remove("hidden-section");
  planSection.scrollIntoView({ behavior: "smooth" });
});

moreButton.addEventListener("click", () => {
  answer.classList.toggle("show");
  moreButton.textContent = answer.classList.contains("show")
    ? "Ай, какая любопытная"
    : "А можно узнать подробнее?";
});

acceptButton.addEventListener("click", () => {
  finalScreen.classList.add("show");
  finalScreen.setAttribute("aria-hidden", "false");
  body.classList.add("locked");
});
