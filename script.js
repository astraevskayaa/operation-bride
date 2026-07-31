const states=[
"Созываем семейный совет…",
"Приглашаем старших…",
"Наливаем чай…",
"Принимаем решение…"
];
let i=0;
const fill=document.getElementById('fill');
const status=document.getElementById('status');
const start=document.getElementById('start');
const music=document.getElementById('music');
document.getElementById('musicBtn').onclick=()=>music.play().catch(()=>{});
const timer=setInterval(()=>{
 fill.style.width=((i+1)*25)+'%';
 status.textContent=states[i];
 i++;
 if(i===4){
  clearInterval(timer);
  start.classList.remove('hide');
 }
},900);

const pages=[
`<div class="fade"><h2>Эй, красавица…</h2><p>До нас дошли слухи, что ты собралась замуж.</p><p>Мы посоветовались. Позвали старших. Налили чай.</p><div class="big">ТЕБЯ<br>НАДО<br>УКРАСТЬ</div></div>`,
`<div class="fade"><div class="big gold">1 августа</div><h2>15:30</h2><p>Будь готова.</p></div>`,
`<div class="fade"><p>✓ Машина будет.</p><p>✓ Музыка будет.</p><p>✓ Люди серьёзные приедут.</p><p>✓ Красивой быть обязательно.</p></div>`,
`<div class="fade"><h2>План вечера</h2><p><b>15:30</b> — забрать красавицу.</p><p>██████████</p><p>██████████</p><button onclick="alert('Ай-ай-ай... Такая любопытная 😄')">А дальше?</button></div>`,
`<div class="fade"><div class="big gold">СОГЛАСИЕ<br>ПОЛУЧЕНО</div><p>Калым подготовлен.<br>Музыка выбрана.<br>Машина почти выехала.</p><h2>Это за тобой ❤️</h2><p style="opacity:.7">📍Группа похищения уже выехала.</p></div>`
];
let p=0;
const story=document.getElementById('story');
const loading=document.getElementById('loading');
const content=document.getElementById('content');
start.onclick=()=>{
 loading.classList.remove('active');
 story.classList.add('active');
 render();
 if(navigator.vibrate) navigator.vibrate(120);
};
function render(){
 content.innerHTML=pages[p];
 document.getElementById('next').style.display=p===pages.length-1?'none':'block';
}
document.getElementById('next').onclick=()=>{
 p++;
 render();
 if(navigator.vibrate) navigator.vibrate(50);
};
