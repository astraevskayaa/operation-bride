const music = document.getElementById('music');
const musicButton = document.getElementById('musicButton');
const openButton = document.getElementById('openButton');
const loadingStatus = document.getElementById('loadingStatus');
const progressFill = document.getElementById('progressFill');
const loadingResult = document.getElementById('loadingResult');
const loadingScreen = document.getElementById('loadingScreen');
const storyScreen = document.getElementById('storyScreen');
const storyContent = document.getElementById('storyContent');
const nextButton = document.getElementById('nextButton');
const nextHint = document.getElementById('nextHint');
const progressDots = document.getElementById('progressDots');

const loadingSteps = [
  'Созываем семейный совет…',
  'Приглашаем старших…',
  'Наливаем чай…',
  'Обсуждаем ситуацию…',
  'Принимаем окончательное решение…'
];

const pages = [
  `
  <div class="story-block">
    <div class="kicker">Официальное обращение</div>
    <h2 class="large-title">Эй,<br>красавица…</h2>
    <p class="story-text">До нас дошли слухи, что ты собралась замуж.</p>
    <p class="story-text">Мы посоветовались. Ещё раз посоветовались. Позвали старших. Налили чай.</p>
    <div class="hero-line">Тебя надо украсть.</div>
  </div>`,
  `
  <div class="story-block">
    <div class="kicker">Дата операции</div>
    <div class="date-big">1 августа</div>
    <div class="time-big">15:30</div>
    <p class="story-text">Будь готова. Маршрут не разглашается. Жених к переговорам не допускается.</p>
  </div>`,
  `
  <div class="story-block">
    <div class="kicker">Решение семейного совета</div>
    <h2 class="large-title">Всё уже решено.</h2>
    <div class="statement-cards">
      <div class="statement"><span>✦</span>Машина будет.</div>
      <div class="statement"><span>✦</span>Музыка будет.</div>
      <div class="statement"><span>✦</span>Люди серьёзные приедут.</div>
      <div class="statement"><span>✦</span>Красивой быть обязательно.</div>
    </div>
  </div>`,
  `
  <div class="story-block">
    <div class="kicker">Подготовка невесты</div>
    <h2 class="large-title">Чтобы все сказали:</h2>
    <div class="hero-line">Вай,<br>вай,<br>вай!</div>
    <p class="story-text">Праздничный образ, хорошее настроение, заряженный телефон и полное доверие подругам.</p>
  </div>`,
  `
  <div class="story-block">
    <div class="kicker">План вечера</div>
    <h2 class="large-title">План очень простой.</h2>
    <div class="plan">
      <div class="plan-row"><b>15:30</b><span>Забрать самую красивую девушку.</span></div>
      <div class="plan-row"><b>Дальше</b><div class="redacted"></div></div>
      <div class="plan-row"><b>Потом</b><div class="redacted short"></div></div>
      <div class="plan-row"><b>Финал</b><span>Сделать этот день незабываемым.</span></div>
    </div>
    <div class="alert-card">Ай-ай-ай… Такая любопытная. Когда старшие составили план, молодые вопросов не задают.</div>
  </div>`,
  `
  <div class="story-block">
    <div class="kicker">Постановление вступило в силу</div>
    <h2 class="large-title">Ну всё,<br>красавица.</h2>
    <p class="story-text">Калым подготовлен. Музыка выбрана. Машина почти выехала.</p>
    <div class="final-phrase">Если услышишь громкую музыку — это за тобой.</div>
  </div>`
];

let loadIndex = 0;
let pageIndex = 0;
let loadingFinished = false;

function runLoading() {
  loadingStatus.textContent = loadingSteps[0];
  const timer = setInterval(() => {
    progressFill.style.width = `${((loadIndex + 1) / loadingSteps.length) * 100}%`;
    loadingStatus.textContent = loadingSteps[loadIndex];
    loadIndex += 1;

    if (loadIndex >= loadingSteps.length) {
      clearInterval(timer);
      setTimeout(() => {
        loadingStatus.style.display = 'none';
        document.querySelector('.progress').style.display = 'none';
        loadingResult.classList.add('show');
        openButton.classList.remove('hidden');
        loadingFinished = true;
        if (navigator.vibrate) navigator.vibrate([80, 50, 140]);
      }, 650);
    }
  }, 850);
}

musicButton.addEventListener('click', async () => {
  try {
    await music.play();
    musicButton.querySelector('b').textContent = 'Атмосфера включена';
    musicButton.querySelector('small').textContent = 'Музыка играет';
  } catch (e) {
    musicButton.querySelector('small').textContent = 'Добавьте файл music.mp3';
  }
});

openButton.addEventListener('click', () => {
  if (!loadingFinished) return;
  loadingScreen.classList.remove('active');
  storyScreen.classList.add('active');
  renderPage();
  if (navigator.vibrate) navigator.vibrate(90);
});

function renderDots() {
  progressDots.innerHTML = pages.map((_, index) =>
    `<span class="${index === pageIndex ? 'active' : ''}"></span>`
  ).join('');
}

function renderPage() {
  storyContent.innerHTML = pages[pageIndex];
  renderDots();

  if (pageIndex === pages.length - 1) {
    nextButton.style.display = 'none';
  } else {
    nextButton.style.display = 'flex';
    nextHint.textContent = [
      'Слушаю внимательно',
      'Что решили старшие?',
      'Как подготовиться?',
      'Покажите план',
      'Принять постановление'
    ][pageIndex];
  }
}

nextButton.addEventListener('click', () => {
  if (pageIndex < pages.length - 1) {
    pageIndex += 1;
    renderPage();
    if (navigator.vibrate) navigator.vibrate(45);
  }
});

runLoading();
