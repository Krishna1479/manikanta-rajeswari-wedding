const weddingAt = new Date('2026-11-21T20:52:00+05:30').getTime();
const $ = id => document.getElementById(id);
let telugu = false;
let celebrationStarted = false;

function updateTimer() {
  const ids = ['days','hours','minutes','seconds'];
  if (!ids.every(id => $(id))) return;
  let diff = weddingAt - Date.now();
  if (diff <= 0) {
    ['days','hours','minutes','seconds'].forEach(id => $(id).textContent = '00');
    if ($('timerNote')) $('timerNote').textContent = telugu ? 'శుభ ముహూర్తం వచ్చేసింది!' : 'The wedding moment is here!';
    if ($('celebrationMessage')) $('celebrationMessage').hidden = false;
    if (!celebrationStarted) { celebrationStarted = true; if ($('confettiCanvas')) startConfetti(); }
    return;
  }
  const d = Math.floor(diff / 86400000); diff %= 86400000;
  const h = Math.floor(diff / 3600000); diff %= 3600000;
  const m = Math.floor(diff / 60000); const s = Math.floor(diff % 60000 / 1000);
  const values = {days:d,hours:h,minutes:m,seconds:s};
  Object.entries(values).forEach(([id,value]) => {
    const formatted = String(value).padStart(2,'0');
    // Countdown numerals intentionally remain Western/English digits in both languages.
    $(id).textContent = formatted;
  });
}

function updateLanguage() {
  document.querySelectorAll('[data-en][data-te]').forEach(el => {
    el.textContent = telugu ? el.dataset.te : el.dataset.en;
  });
  document.querySelectorAll('[data-title-en][data-title-te]').forEach(el => {
    el.title = telugu ? el.dataset.titleTe : el.dataset.titleEn;
  });
  document.documentElement.lang = telugu ? 'te' : 'en';
  document.body.classList.toggle('te', telugu);
  $('langToggle').textContent = telugu ? 'English' : 'తెలుగు';
  $('langToggle').setAttribute('aria-label', telugu ? 'Switch to English' : 'భాషను తెలుగులోకి మార్చండి');
  document.title = telugu
    ? 'నాగ సాయి మణికంఠ తేజ ♥ రాజేశ్వరి | వివాహ ఆహ్వానం'
    : 'Naga Sai Manikanta Teja ♥ Rajeswari | Wedding Invitation';
  $('pageDescription').content = telugu ? $('pageDescription').dataset.te : $('pageDescription').dataset.en;
  updateTimer();
  updateWhatsAppLink();
}

$('langToggle').addEventListener('click', () => {
  telugu = !telugu;
  updateLanguage();
});

function updateWhatsAppLink() {
  // Share the clean public URL only; omit tracking parameters and fragments.
  const url = `${window.location.origin}${window.location.pathname}`;
  const message = telugu
    ? `💐 శ్రీ సాయి గణేశాయ నమః 💐\n\n💍 నాగ సాయి మణికంఠ తేజ ❤️ రాజేశ్వరి 💍\n\nమా కుటుంబంలో జరుగుతున్న ఈ శుభ వివాహ వేడుకకు మీరు కుటుంబ సమేతంగా విచ్చేసి వధూవరులను ఆశీర్వదించవలసిందిగా మనస్ఫూర్తిగా ఆహ్వానిస్తున్నాము. 🙏✨\n\n🪔 *వివాహ ముహూర్తం*\n📅 21 నవంబర్ 2026\n🕗 రాత్రి 8:52 గంటలకు\n📍 శ్రీ బాలాజీ కన్వెన్షన్, పెనుగొండ\n\n🎉 *రిసెప్షన్ & విందు*\n📅 22 నవంబర్ 2026\n🕖 సాయంత్రం 7:00 గంటల నుండి\n📍 సంగెపు శివ కోటేశ్వరరావు కళ్యాణ వేదిక, భవనరుషి, నల్లమేకలవారి వీధి, గొసాల, విజయవాడ\n\nమీ రాకే మా ఆనందం. మీ ఆశీస్సులు వధూవరులకు అందించండి. ❤️\n\n🌐 పూర్తి ఆహ్వానం & లొకేషన్ వివరాలు:\n${url}\n\n— ప్రేమతో, వధూవరుల కుటుంబ సభ్యులు`
    : `💐 With the blessings of the Almighty 💐\n\n💍 Naga Sai Manikanta Teja ❤️ Rajeswari 💍\n\nTogether with our families, we warmly invite you and your family to celebrate this special occasion and bless the couple. 🙏✨\n\n🪔 *WEDDING MUHURTHAM*\n📅 Saturday, 21 November 2026\n🕗 8:52 PM\n📍 Sri Balaji Convention, Penugonda\n\n🎉 *RECEPTION & DINNER*\n📅 Sunday, 22 November 2026\n🕖 7:00 PM onwards\n📍 Sangepu Siva Koteswara Rao Kalyana Vedhika, Bhavanarushi, Nallamekalavari Street, Gosala, Vijayawada\n\nYour presence and blessings will make our celebration truly special. ❤️\n\n🌐 View the complete invitation & directions:\n${url}\n\n— With love, the families`;
  $('whatsappShare').href = `https://wa.me/?text=${encodeURIComponent(message)}`;
}

function startConfetti() {
  const canvas = $('confettiCanvas'); const ctx = canvas.getContext('2d');
  const section = canvas.parentElement;
  const ratio = window.devicePixelRatio || 1;
  canvas.width = section.clientWidth * ratio;
  canvas.height = Math.max(260, section.clientHeight) * ratio;
  canvas.style.width = section.clientWidth + 'px'; canvas.style.height = Math.max(260, section.clientHeight) + 'px';
  ctx.setTransform(ratio,0,0,ratio,0,0);
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

function initWeddingPage() {
  // Render immediately, then keep ticking independently of language or layout.
  try { updateLanguage(); } catch (error) { console.error('Language setup:', error); }
  updateTimer();
  window.setInterval(updateTimer, 1000);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) updateTimer();
  });
  window.addEventListener('pageshow', updateTimer);
  window.addEventListener('focus', updateTimer);
  window.addEventListener('resize', () => { if (celebrationStarted && $('confettiCanvas')) startConfetti(); });
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWeddingPage, { once: true });
} else {
  initWeddingPage();
}
