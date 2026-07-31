const body = document.body;

const startButton = document.getElementById("startButton");
const decisionSection = document.getElementById("decisionSection");
const dressButton = document.getElementById("dressButton");
const dressSection = document.getElementById("dressSection");
const planButton = document.getElementById("planButton");
const planSection = document.getElementById("planSection");
const moreButton = document.getElementById("moreButton");
const answer = document.getElementById("answer");
const acceptButton = document.getElementById("acceptButton");
const finalScreen = document.getElementById("finalScreen");

body.classList.remove("locked");

startButton.addEventListener("click", () => {
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
