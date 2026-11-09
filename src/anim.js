/* Oyun animasyonları: ekran geçişi, konfeti, uçan puan, sayı sayma.
   DOM'a bağlı olmayan parçalar (spec üretimi) saf ve test edilebilir. */
var ANIM = (function(){
  function reduced(){
    try { return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
    catch(e){ return false; }
  }

  /* Ekran geçişi: içeriği yazar ve kısa bir fade+slide animasyonu tetikler. */
  function render(app, html){
    app.innerHTML = html;
    if(reduced()) return;
    app.classList.remove('screen-in');
    void app.offsetWidth; /* reflow: animasyonun yeniden oynaması için */
    app.classList.add('screen-in');
  }

  /* Konfeti parçacıklarının konum/renk/zamanlama verisi. rnd() -> [0,1). */
  function confettiSpecs(n, rnd){
    rnd = rnd || Math.random;
    var colors = ['#86c29a','#cfae74','#8fb4dd','#de9aa3','#b4a3dd'];
    var out = [];
    for(var i=0;i<n;i++){
      out.push({
        left: rnd()*100,
        dx: (rnd()*2-1)*80,
        dy: 120 + rnd()*160,
        rot: (rnd()*2-1)*540,
        dur: 900 + rnd()*700,
        delay: rnd()*160,
        size: 6 + rnd()*7,
        round: rnd() < 0.35,
        color: colors[Math.floor(rnd()*colors.length)]
      });
    }
    return out;
  }

  /* Konfeti patlaması: geçici bir katman ekler. */
  function confetti(app, n){
    if(reduced()) return;
    var host = document.body || app;
    var layer = document.createElement('div');
    layer.className = 'confetti-layer';
    confettiSpecs(n).forEach(function(p){
      var el = document.createElement('i');
      el.className = 'confetti' + (p.round?' round':'');
      el.style.left = p.left + '%';
      el.style.width = el.style.height = p.size + 'px';
      el.style.background = p.color;
      el.style.setProperty('--dx', p.dx.toFixed(1)+'px');
      el.style.setProperty('--dy', p.dy.toFixed(1)+'px');
      el.style.setProperty('--rot', p.rot.toFixed(0)+'deg');
      el.style.animationDuration = p.dur + 'ms';
      el.style.animationDelay = p.delay + 'ms';
      layer.appendChild(el);
    });
    host.appendChild(layer);
    setTimeout(function(){ layer.remove(); }, 2000);
  }

  /* Puanın yanından yukarı süzülen "+N" yazısı. */
  function floatPoints(anchor, text, cls){
    if(reduced() || !anchor) return;
    var r = anchor.getBoundingClientRect();
    var el = document.createElement('span');
    el.className = 'float-pts' + (cls?' '+cls:'');
    el.textContent = text;
    el.style.left = (r.left + r.width/2) + 'px';
    el.style.top = (r.top - 4) + 'px';
    document.body.appendChild(el);
    setTimeout(function(){ el.remove(); }, 1100);
  }

  /* Bir sayıyı hedefe doğru yumuşak biçimde artırır. suffix: sayıdan sonra eklenecek metin. */
  function countUp(el, to, dur, suffix){
    if(!el) return;
    suffix = suffix||'';
    if(reduced()){ el.textContent = to + suffix; return; }
    var from = 0, start = null;
    dur = dur || 900;
    function step(ts){
      if(start==null) start = ts;
      var k = Math.min(1, (ts-start)/dur);
      var e = 1 - Math.pow(1-k, 3); /* easeOutCubic */
      el.textContent = Math.round(from + (to-from)*e) + suffix;
      if(k<1) requestAnimationFrame(step);
      else el.textContent = to + suffix;
    }
    requestAnimationFrame(step);
  }

  return { render:render, confetti:confetti, confettiSpecs:confettiSpecs, floatPoints:floatPoints, countUp:countUp, reduced:reduced };
})();
