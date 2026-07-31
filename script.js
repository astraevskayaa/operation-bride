const body = document.body;
const envelope = document.getElementById("openLetterButton");
const envelopeWrap = document.getElementById("envelopeWrap");
const letter = document.getElementById("letter");
const continueButton = document.getElementById("continueButton");
const dressCode = document.getElementById("dressCode");
const showPlanButton = document.getElementById("showPlanButton");
const planSection = document.getElementById("planSection");
const revealPlanButton = document.getElementById("revealPlanButton");
const secretMessage = document.getElementById("secretMessage");
const acceptButton = document.getElementById("acceptButton");
const finalScreen = document.getElementById("finalScreen");

envelope.addEventListener("click", () => {
  envelope.classList.add("open");

  window.setTimeout(() => {
    envelopeWrap.classList.add("hide");
  }, 700);

  window.setTimeout(() => {
    envelopeWrap.style.display = "none";
    letter.classList.add("show");
    letter.setAttribute("aria-hidden", "false");
    body.classList.remove("locked");
  }, 1150);
});

continueButton.addEventListener("click", () => {
  dressCode.classList.remove("hidden-section");
  dressCode.scrollIntoView({ behavior: "smooth" });
});

showPlanButton.addEventListener("click", () => {
  planSection.classList.remove("hidden-section");
  planSection.scrollIntoView({ behavior: "smooth" });
});

revealPlanButton.addEventListener("click", () => {
  secretMessage.classList.toggle("show");
  revealPlanButton.textContent = secretMessage.classList.contains("show")
    ? "Секрет всё равно не раскрыт"
    : "Раскрыть секрет";
});

acceptButton.addEventListener("click", () => {
  finalScreen.classList.add("show");
  finalScreen.setAttribute("aria-hidden", "false");
  body.classList.add("locked");
});
