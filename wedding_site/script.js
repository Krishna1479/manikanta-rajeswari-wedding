const weddingAt = new Date('2026-11-21T20:52:00+05:30').getTime();
const receptionAt = new Date('2026-11-22T19:00:00+05:30').getTime();
const $ = id => document.getElementById(id);
function updateTimer(){
  const now=Date.now(); let diff=weddingAt-now;
  if(diff<=0){$('days').textContent='00';$('hours').textContent='00';$('minutes').textContent='00';$('seconds').textContent='00';$('timerNote').textContent=document.body.classList.contains('te')?'శుభ ముహూర్తం వచ్చేసింది!':'The wedding moment is here!';return;}
  const d=Math.floor(diff/86400000);diff%=86400000;const h=Math.floor(diff/3600000);diff%=3600000;const m=Math.floor(diff/60000);const s=Math.floor(diff%60000/1000);
  $('days').textContent=String(d).padStart(2,'0');$('hours').textContent=String(h).padStart(2,'0');$('minutes').textContent=String(m).padStart(2,'0');$('seconds').textContent=String(s).padStart(2,'0');
}
let telugu=false;
$('langToggle').addEventListener('click',()=>{telugu=!telugu;document.body.classList.toggle('te',telugu);document.documentElement.lang=telugu?'te':'en';$('langToggle').textContent=telugu?'English':'తెలుగు';document.querySelectorAll('[data-en]').forEach(el=>{el.textContent=telugu?el.dataset.te:el.dataset.en;});updateTimer();});
updateTimer();setInterval(updateTimer,1000);
