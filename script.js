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
  'Слушаю внимательно',
  'Что решили старшие?',
  'Как подготовиться?',
  'Покажите план',
  'Что будет в финале?'
];

let loadingIndex = 0;
let currentStep = 0;
let loadingFinished = false;

function runLoading() {
  loadingStatus.textContent = loadingSteps[0];

  const timer = setInterval(() => {
    progressFill.style.width =
      `${((loadingIndex + 1) / loadingSteps.length) * 100}%`;

    loadingStatus.textContent = loadingSteps[loadingIndex];
    loadingIndex += 1;

    if (loadingIndex >= loadingSteps.length) {
      clearInterval(timer);

      setTimeout(() => {
        loadingCopy.style.display = 'none';
        loadingResult.classList.add('show');
        openButton.classList.remove('hidden');
        loadingFinished = true;

        if (navigator.vibrate) {
          navigator.vibrate([80, 50, 140]);
        }
      }, 600);
    }
  }, 850);
}

musicButton.addEventListener('click', async () => {
  try {
    await music.play();
    musicButton.querySelector('b').textContent = 'Атмосфера включена';
    musicButton.querySelector('small').textContent = 'Музыка играет';
  } catch (error) {
    musicButton.querySelector('small').textContent =
      'Добавьте рядом файл music.mp3';
  }
});

openButton.addEventListener('click', () => {
  if (!loadingFinished) return;

  loadingScreen.classList.add('closed');
  document.body.classList.remove('loading-open');
  bottomNav.classList.remove('hidden');

  setTimeout(() => {
    loadingScreen.style.display = 'none';
  }, 600);

  window.scrollTo({ top: 0, behavior: 'auto' });

  if (navigator.vibrate) {
    navigator.vibrate(90);
  }
});

revealButton.addEventListener('click', () => {
  if (currentStep < sections.length - 1) {
    currentStep += 1;

    const nextSection = sections[currentStep];
    nextSection.classList.remove('hidden-section');
    nextSection.classList.add('revealed');

    requestAnimationFrame(() => {
      nextSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });

    if (currentStep === sections.length - 1) {
      revealButton.querySelector('b').textContent = 'В начало';
      scrollHint.textContent = 'Постановление прочитано';
      revealButton.querySelector('.arrow').textContent = '↑';
      revealButton.classList.add('finish');
    } else {
      scrollHint.textContent = hints[currentStep];
    }
  } else {
    sections[0].scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  if (navigator.vibrate) {
    navigator.vibrate(35);
  }
});

curiousButton.addEventListener('click', () => {
  answer.classList.toggle('show');

  curiousButton.querySelector('b').textContent =
    answer.classList.contains('show')
      ? 'Ай-ай-ай…'
      : 'А можно узнать подробнее?';
});

runLoading();
