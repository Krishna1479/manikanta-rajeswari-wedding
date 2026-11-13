const weddingAt = new Date('2026-11-21T20:52:00+05:30').getTime();
const $ = id => document.getElementById(id);
let telugu = false;
let celebrationStarted = false;

function updateTimer() {
  let diff = weddingAt - Date.now();
  if (diff <= 0) {
    ['days','hours','minutes','seconds'].forEach(id => $(id).textContent = '00');
    $('timerNote').textContent = telugu ? 'శుభ ముహూర్తం వచ్చేసింది!' : 'The wedding moment is here!';
    $('celebrationMessage').hidden = false;
    if (!celebrationStarted) { celebrationStarted = true; startConfetti(); }
    return;
  }
  const d = Math.floor(diff / 86400000); diff %= 86400000;
  const h = Math.floor(diff / 3600000); diff %= 3600000;
  const m = Math.floor(diff / 60000); const s = Math.floor(diff % 60000 / 1000);
  $('days').textContent = String(d).padStart(2,'0');
  $('hours').textContent = String(h).padStart(2,'0');
  $('minutes').textContent = String(m).padStart(2,'0');
  $('seconds').textContent = String(s).padStart(2,'0');
}

$('langToggle').addEventListener('click', () => {
  telugu = !telugu;
  document.body.classList.toggle('te', telugu);
  document.documentElement.lang = telugu ? 'te' : 'en';
  $('langToggle').textContent = telugu ? 'English' : 'తెలుగు';
  document.querySelectorAll('[data-en]').forEach(el => { el.textContent = telugu ? el.dataset.te : el.dataset.en; });
  updateTimer();
});

const music = $('weddingMusic');
$('musicToggle').addEventListener('click', async () => {
  try {
    if (music.paused) {
      await music.play();
      $('musicToggle').classList.add('playing');
      $('musicToggle').setAttribute('aria-pressed','true');
      $('musicIcon').textContent = 'Ⅱ';
      $('musicLabel').textContent = telugu ? 'సంగీతం ఆపండి' : 'Pause music';
    } else {
      music.pause();
      $('musicToggle').classList.remove('playing');
      $('musicToggle').setAttribute('aria-pressed','false');
      $('musicIcon').textContent = '♫';
      $('musicLabel').textContent = telugu ? 'మంగళ వాయిద్యం వినండి' : 'Play music';
    }
  } catch (err) {
    $('musicLabel').textContent = telugu ? 'సంగీతం అందుబాటులో లేదు' : 'Music unavailable';
  }
});
music.addEventListener('ended', () => { $('musicToggle').classList.remove('playing'); });

// Share the live page URL once it is hosted; before publishing, share the invitation details.
$('whatsappShare').addEventListener('click', () => {
  const url = window.location.href;
  const message = telugu
    ? `నాగ సాయి మణికంఠ తేజ & రాజేశ్వరి వివాహానికి మీకు హృదయపూర్వక ఆహ్వానం!\nవివాహం: 21 నవంబర్ 2026, రాత్రి 8:52 – శ్రీ బాలాజీ కన్వెన్షన్, పెనుగొండ.\nరిసెప్షన్: 22 నవంబర్ 2026, సాయంత్రం 7:00 – సంగెపు కళ్యాణమండపం, గొసాల.\n${url}`
    : `You are warmly invited to the wedding of Naga Sai Manikanta Teja & Rajeswari!\nWedding: 21 November 2026, 8:52 PM – Sri Balaji Convention, Penugonda.\nReception: 22 November 2026, 7:00 PM – Sange(pu) Kalyanamandapam, Gosala.\n${url}`;
  $('whatsappShare').href = `https://wa.me/?text=${encodeURIComponent(message)}`;
});

function startConfetti() {
  const canvas = $('confettiCanvas'); const ctx = canvas.getContext('2d');
  const section = canvas.parentElement;
  canvas.width = section.clientWidth * devicePixelRatio;
  canvas.height = Math.max(260, section.clientHeight) * devicePixelRatio;
  canvas.style.width = section.clientWidth + 'px'; canvas.style.height = Math.max(260, section.clientHeight) + 'px';
  ctx.scale(devicePixelRatio, devicePixelRatio);
  const w = section.clientWidth, h = Math.max(260, section.clientHeight);
  const pieces = Array.from({length:150}, () => ({x:Math.random()*w,y:-Math.random()*h,vx:(Math.random()-.5)*2.8,vy:2+Math.random()*4,size:4+Math.random()*6,rot:Math.random()*6,spin:(Math.random()-.5)*.16,color:['#d7ad63','#fff0c9','#8d3730','#f4d7a0','#ffffff'][Math.floor(Math.random()*5)]}));
  let frame=0;
  function draw(){
    ctx.clearRect(0,0,w,h);
    pieces.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.rot+=p.spin;p.vy+=.012;if(p.y>h+12){p.y=-12;p.x=Math.random()*w;p.vy=2+Math.random()*3;}ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);ctx.fillStyle=p.color;ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size*.65);ctx.restore();});
    frame++; if(frame<900) requestAnimationFrame(draw); else ctx.clearRect(0,0,w,h);
  }
  draw();
}

updateTimer();
setInterval(updateTimer,1000);
window.addEventListener('resize', () => { if (celebrationStarted) startConfetti(); });
