const music = document.getElementById('music');
const musicButton = document.getElementById('musicButton');
const openButton = document.getElementById('openButton');
const loadingStatus = document.getElementById('loadingStatus');
const loadingCopy = document.getElementById('loadingCopy');
const progressFill = document.getElementById('progressFill');
const loadingResult = document.getElementById('loadingResult');
const loadingScreen = document.getElementById('loadingScreen');
const bottomNav = document.getElementById('bottomNav');
const scrollButton = document.getElementById('scrollButton');
const scrollHint = document.getElementById('scrollHint');
const stepLabel = document.getElementById('stepLabel');
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
  'Что будет в финале?',
  'Постановление прочитано'
];

let loadingIndex = 0;
let currentSection = 0;
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

function updateBottomButton(index) {
  currentSection = index;
  stepLabel.textContent = `${index + 1} из ${sections.length}`;
  scrollHint.textContent = hints[index];

  const title = scrollButton.querySelector('b');
  const arrow = scrollButton.querySelector('.arrow');

  if (index === sections.length - 1) {
    title.textContent = 'В начало';
    arrow.textContent = '↑';
    scrollButton.classList.add('finish');
  } else {
    title.textContent = 'Далее';
    arrow.textContent = '↓';
    scrollButton.classList.remove('finish');
  }
}

scrollButton.addEventListener('click', () => {
  if (currentSection === sections.length - 1) {
    sections[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    sections[currentSection + 1].scrollIntoView({
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
  curiousButton.querySelector('b').textContent = answer.classList.contains('show')
    ? 'Ай-ай-ай…'
    : 'А можно узнать подробнее?';
});

const observer = new IntersectionObserver((entries) => {
  const visible = entries
    .filter(entry => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (!visible) return;

  const index = sections.indexOf(visible.target);
  if (index >= 0) updateBottomButton(index);
}, {
  threshold: [0.35, 0.55, 0.75]
});

sections.forEach(section => observer.observe(section));
updateBottomButton(0);
runLoading();
