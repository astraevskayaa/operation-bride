const music = document.getElementById('music');
const musicButton = document.getElementById('musicButton');
const openButton = document.getElementById('openButton');
const loadingStatus = document.getElementById('loadingStatus');
const loadingCopy = document.getElementById('loadingCopy');
const progressFill = document.getElementById('progressFill');
const loadingResult = document.getElementById('loadingResult');
const loadingScreen = document.getElementById('loadingScreen');
const bottomNav = document.getElementById('bottomNav');
const revealButton = document.getElementById('revealButton');
const scrollHint = document.getElementById('scrollHint');
const curiousButton = document.getElementById('curiousButton');
const answer = document.getElementById('answer');
const sections = [...document.querySelectorAll('.story-section')];

const loadingSteps = [
  'Созываем семейный совет…',
  'Приглашаем старших…',
  'Наливаем чай…',
  'Обсуждаем ситуацию…',
  'Принимаем окончательное решение…'
];

const hints = [
  'Открыть дату операции',
  'Открыть решение совета',
  'Открыть подготовку невесты',
  'Открыть секретный план',
  'Открыть финальное постановление'
];

let loadingIndex = 0;
let currentStep = 0;
let loadingFinished = false;
let buttonLocked = false;

function runLoading() {
  const timer = setInterval(() => {
    loadingStatus.textContent = loadingSteps[loadingIndex];
    progressFill.style.width = `${((loadingIndex + 1) / loadingSteps.length) * 100}%`;
    loadingIndex += 1;

    if (loadingIndex >= loadingSteps.length) {
      clearInterval(timer);
      setTimeout(() => {
        loadingCopy.hidden = true;
        loadingResult.classList.add('show');
        openButton.hidden = false;
        loadingFinished = true;
        if (navigator.vibrate) navigator.vibrate([80, 50, 140]);
      }, 600);
    }
  }, 850);
}

musicButton.addEventListener('click', async () => {
  try {
    await music.play();
    musicButton.querySelector('b').textContent = 'Атмосфера включена';
    musicButton.querySelector('small').textContent = 'Музыка играет';
  } catch {
    musicButton.querySelector('small').textContent = 'Добавьте рядом файл music.mp3';
  }
});

openButton.addEventListener('click', () => {
  if (!loadingFinished) return;
  loadingScreen.classList.add('closed');
  document.body.classList.remove('loading-open');
  bottomNav.hidden = false;
  setTimeout(() => loadingScreen.hidden = true, 600);
  window.scrollTo(0, 0);
});

revealButton.addEventListener('click', () => {
  if (buttonLocked) return;
  buttonLocked = true;

  if (currentStep < sections.length - 1) {
    currentStep += 1;
    const nextSection = sections[currentStep];

    // This is the only place where the next section becomes visible.
    nextSection.hidden = false;
    nextSection.classList.add('reveal-animation');

    setTimeout(() => {
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 30);

    if (currentStep === sections.length - 1) {
      revealButton.querySelector('b').textContent = 'В начало';
      scrollHint.textContent = 'Постановление прочитано';
      revealButton.querySelector('.arrow').textContent = '↑';
      revealButton.classList.add('finish');
    } else {
      scrollHint.textContent = hints[currentStep];
    }
  } else {
    sections[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  if (navigator.vibrate) navigator.vibrate(35);
  setTimeout(() => buttonLocked = false, 700);
});

curiousButton.addEventListener('click', () => {
  answer.hidden = !answer.hidden;
  curiousButton.querySelector('b').textContent =
    answer.hidden ? 'А можно узнать подробнее?' : 'Ай-ай-ай…';
});

runLoading();
