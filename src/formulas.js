/* Formül kağıdı ekranı — ders bazlı formül özeti (DOM'suz üretim, engine.render eder). */
(function(){
  var esc = function(s){ return String(s).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };

  function has(sid){ return !!(window.FORMULS && window.FORMULS[sid] && window.FORMULS[sid].length); }

  function figHtml(sec){
    if(!sec.fig || !window.FSVG || !FSVG[sec.fig]) return '';
    var svg = FSVG[sec.fig]();
    return '<figure class="ffig">'+svg+(sec.figCap?'<figcaption>'+esc(sec.figCap)+'</figcaption>':'')+'</figure>';
  }

  function sectionsHtml(sid){
    var secs = (window.FORMULS||{})[sid]||[];
    return secs.map(function(sec){
      var rows = (sec.rows||[]).map(function(r){
        return '<div class="frow"><span class="fk">'+esc(r[0])+'</span><span class="fv">'+esc(r[1])+'</span></div>';
      }).join('');
      return '<div class="card fsec"><h3>'+esc(sec.h)+'</h3>'+
        (sec.note?'<p class="fnote">'+esc(sec.note)+'</p>':'')+
        '<div class="fbody">'+figHtml(sec)+'<div class="ftable">'+rows+'</div></div></div>';
    }).join('');
  }

  /* Formül kağıdı ekranını DOM'a yazar. backFn: geri dönüş işlevi. */
  function open(host, s, backFn){
    var h = '<header class="top"><div class="brand"><span class="dot"></span>Bilgi Yolu</div></header>'+
      '<div class="bar" style="--sc:'+s.color+'"><button class="icon-btn" id="fBack">← Geri</button><div class="title"><i></i>'+esc(s.name)+' · Formül Kağıdı</div></div>'+
      '<section class="hero"><h1>'+esc(s.name)+' formülleri</h1><p>Sınavdan önce hızlı tekrar için gerekli tüm bağıntılar. Sorularda kullanacağın semboller burada özetlenmiştir.</p></section>'+
      '<div class="fgrid">'+sectionsHtml(s.id)+'</div>'+
      '<div class="foot">Formül kağıdı · yalnızca özet amaçlıdır.</div>';
    host.innerHTML = h;
    var back = host.querySelector('#fBack'); if(back) back.onclick = backFn;
    window.scrollTo(0,0);
  }

  window.FORMULAS = { has:has, open:open, sectionsHtml:sectionsHtml };
})();
