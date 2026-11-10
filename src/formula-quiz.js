/* Formül sınavı ekranı — sol tarafta formül kağıdı, sağ tarafta test alanı.
   "Teste Başla" ile formüller kapanır ve formüller normal soru mekaniğiyle
   ortalanmış biçimde sorulur; her yanlışta bir ipucu açılır. */
(function(){
  var esc = function(s){ return String(s).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  var M = window.M;

  function pool(){ return window.FORMUL_SORU || []; }
  function has(sid){ return !!(window.FORMULS && window.FORMULS[sid] && window.FORMULS[sid].length) && pool().length; }
  function qsFor(sid){ return pool(); } /* şimdilik yalnızca fizik soruları */

  function checkAnswer(q, raw){
    if(q.formula) return M.formula(raw, {a:q.a, num:q.num});
    if(q.num!=null) return M.check(raw, {num:q.num, a:q.a, tol:q.tol});
    return M.check(raw, {a:q.a, not:q.not});
  }
  function autoHint(q){
    if(q.formula || q.num!=null) return null;
    var a=(q.a||[])[0]; if(!a) return null;
    var letters=a.replace(/[^A-Za-zÇĞİÖŞÜçğıöşü]/g,'').length;
    return '“'+a.charAt(0).toLocaleUpperCase('tr')+'” ile başlıyor'+(letters>1?' ('+letters+' harf)':'');
  }
  function hintList(q){ var hs=(q.hints||[]).slice(); var ah=autoHint(q); if(ah) hs.push(ah); return hs; }
  function solText(q){
    if(q.sol) return q.sol;
    if(q.type==='parts') return q.parts.map(function(p){ return (p.label||'')+' '+(p.num||p.a&&p.a[0]); }).join(' · ');
    if(q.num!=null) return String(q.num);
    return (q.a||[])[0]||'';
  }

  var Q = null; /* aktif sınav durumu */

  /* --- sol panel (formül kağıdı) --- */
  function studyHtml(s){
    return '<div class="fstudy">'+
      '<div class="fstudy-left"><div class="fstudy-scroll">'+
        '<div class="fstudy-head"><h2>'+esc(s.name)+' formülleri</h2><p>Sınavdan önce hızlı tekrar. Sağdaki panelden teste başlayabilirsin.</p></div>'+
        '<div class="fgrid">'+window.FORMULAS.sectionsHtml(s.id)+'</div>'+
      '</div></div>'+
      '<aside class="fstudy-right"><div class="card fpanel">'+
        '<div class="fp-ico">📝</div>'+
        '<h3>Formül Sınavı</h3>'+
        '<p>Formülleri bilip bilmediğini ölçen '+qsFor(s.id).length+' soru. Cevaplar açık uçlu; her yanlışta ipucu açılır.</p>'+
        '<ul class="fp-list"><li>Yazım/sembol toleransı vardır</li><li>Bağıntıları kendin yazacaksın</li><li>Her yanlış bir ipucu açar</li></ul>'+
        '<button class="btn primary fp-start" id="fstart">Teste Başla →</button>'+
      '</div></aside>'+
    '</div>';
  }

  /* --- soru ekranı (ortalanmış, normal soru mekaniği) --- */
  function barHtml(s){
    return '<div class="bar" style="--sc:'+s.color+'">'+
      '<button class="icon-btn" id="qBack">← Formüller</button>'+
      '<div class="title"><i></i>'+esc(s.name)+' · Formül Sınavı</div><div class="sp"></div>'+
      '<span class="pill">Soru <b>'+(Q.i+1)+'</b> / '+Q.qs.length+'</span>'+
      '<span class="pill">Doğru <b id="qok">'+Q.ok+'</b></span></div>';
  }
  function questionHtml(s){
    var q=Q.qs[Q.i];
    var pct=Math.round(Q.i/Q.qs.length*100);
    return '<div class="fquiz">'+
      barHtml(s)+
      '<div class="progress" style="--sc:'+s.color+'"><div style="width:'+pct+'%"></div></div>'+
      '<div class="card qcard" id="qc" style="--sc:'+s.color+'">'+
        '<div class="qnum"><span>'+esc(q.topic||'Formül')+'</span><span>Formül sorusu</span></div>'+
        '<div class="qtext">'+esc(q.q)+'</div>'+
        (q.fig&&window.FSVG&&FSVG[q.fig]?'<figure class="fig">'+FSVG[q.fig]()+'</figure>':'')+
        '<div class="inputs"><div class="field" data-k="0"><input autocomplete="off" spellcheck="false" placeholder="Cevabını yaz…"></div></div>'+
        '<div class="actions"><button class="btn primary" id="qchk">Kontrol Et</button>'+
        '<button class="btn ghost" id="qshow" style="display:none">Cevabı göster</button>'+
        '<button class="btn primary" id="qnext" style="display:none">'+(Q.i+1<Q.qs.length?'Sonraki soru →':'Sonuçları gör →')+'</button>'+
        '<span class="kbd">Enter ↵</span></div>'+
        '<div class="hints" id="hints"></div><div id="fb"></div>'+
      '</div></div>';
  }

  function renderStudy(host, s, backFn){
    host.classList.add('wide');
    host.innerHTML = '<header class="top"><div class="brand"><span class="dot"></span>Bilgi Yolu</div></header>'+
      '<div class="bar" style="--sc:'+s.color+'"><button class="icon-btn" id="fBack">← Geri</button>'+
      '<div class="title"><i></i>'+esc(s.name)+' · Formül Kağıdı</div></div>'+
      studyHtml(s);
    host.querySelector('#fBack').onclick = backFn;
    host.querySelector('#fstart').onclick = function(){ startQuiz(host, s, backFn); };
    window.scrollTo(0,0);
  }

  function startQuiz(host, s, backFn){
    var qs = shuffleArr(qsFor(s.id).slice());
    Q = { s:s, host:host, backFn:backFn, qs:qs, i:0, ok:0, wrong:0, hints:0, finished:false, log:[] };
    renderQuestion();
  }
  function shuffleArr(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i];a[i]=a[j];a[j]=t; } return a; }

  function renderQuestion(){
    var s=Q.s, host=Q.host, back=Q.backFn;
    host.classList.remove('wide');
    host.innerHTML = questionHtml(s);
    host.querySelector('#qBack').onclick = function(){ Q=null; renderStudy(host, s, back); };
    host.querySelector('#qchk').onclick = submit;
    host.querySelector('#qshow').onclick = function(){ reveal(); };
    host.querySelector('#qnext').onclick = next;
    var inp = host.querySelector('.field input');
    inp.addEventListener('keydown', function(e){
      if(e.key==='Enter'){ e.preventDefault(); if(Q && Q.finished) next(); else submit(); }
    });
    inp.focus({preventScroll:true});
    window.scrollTo(0,0);
  }

  function submit(){
    if(!Q || Q.finished) return;
    var q=Q.qs[Q.i], inp=Q.host.querySelector('.field input'), raw=inp.value;
    if(!raw.trim()){ shake(); inp.focus(); return; }
    var ok = checkAnswer(q, raw);
    if(ok){ Q.ok++; finishQ(true); return; }
    Q.wrong++;
    shake();
    var hs = hintList(q), box = Q.host.querySelector('#hints');
    if(Q.hints < hs.length){
      var hh = hs[Q.hints]; Q.hints++;
      box.insertAdjacentHTML('beforeend','<div class="hint"><b>İpucu '+Q.hints+'</b>'+esc(hh)+'</div>');
    } else {
      box.insertAdjacentHTML('beforeend','<div class="hint"><b>Bir daha dene</b>İpuçları bitti. İstersen “Cevabı göster”e basabilirsin.</div>');
    }
    if(Q.wrong>=2 || Q.hints>=hs.length) Q.host.querySelector('#qshow').style.display='';
    inp.focus(); inp.select && inp.select();
  }
  function reveal(){ if(!Q || Q.finished) return; Q.wrong++; finishQ(false); }
  function shake(){ var qc=Q.host.querySelector('#qc'); qc.classList.remove('shake'); void qc.offsetWidth; qc.classList.add('shake'); }

  function finishQ(ok){
    var q=Q.qs[Q.i]; Q.finished=true;
    Q.log.push({q:q, ok:ok, wrong:Q.wrong});
    var inp=Q.host.querySelector('.field input'); inp.disabled=true;
    var firstTry = ok && Q.wrong===0;
    var title = ok ? (firstTry?'Harika, ilk denemede doğru! ✓':'Doğru! ✓') : 'Cevap';
    var extra = (!ok && Q.wrong>=2) ? '<div class="alt">Bu soruyu formül kağıdından tekrar edebilirsin.</div>' : '';
    Q.host.querySelector('#fb').innerHTML = '<div class="fb '+(ok?'ok':'bad')+'"><div class="h">'+esc(title)+'</div>'+solText(q)+extra+'</div>';
    Q.host.querySelector('#qok').textContent = Q.ok;
    Q.host.querySelector('#qchk').style.display='none';
    Q.host.querySelector('#qshow').style.display='none';
    var n=Q.host.querySelector('#qnext'); n.style.display=''; n.focus({preventScroll:true});
    if(ok && window.ANIM) ANIM.confetti(Q.host, 10);
  }
  function next(){
    if(!Q) return;
    Q.i++;
    if(Q.i>=Q.qs.length){ summary(); return; }
    Q.wrong=0; Q.hints=0; Q.finished=false;
    renderQuestion();
  }

  function summary(){
    var s=Q.s, host=Q.host, n=Q.qs.length, ok=Q.ok, pct=Math.round(ok/n*100);
    var msg = pct>=85?'Formülleri iyi biliyorsun!':pct>=60?'İyi gidiyorsun, birkaç tekrar yeterli.':pct>=35?'Formülleri bir tur daha tekrar et.':'Formül kağıdını baştan gözden geçirip yeniden dene.';
    var rows = Q.log.map(function(l,i){
      var qt=l.q.q.replace(/<[^>]+>/g,''); if(qt.length>90) qt=qt.slice(0,89)+'…';
      return '<div class="rv"><div class="st '+(l.ok?'ok':'bad')+'">'+(l.ok?'✓':'✗')+'</div><div><div>'+(i+1)+'. '+esc(qt)+'</div><div class="ans">'+solText(l.q)+'</div></div></div>';
    }).join('');
    host.classList.remove('wide');
    host.innerHTML = '<div class="fquiz">'+
      '<div class="bar" style="--sc:'+s.color+'"><button class="icon-btn" id="sBack">← Formüller</button>'+
      '<div class="title"><i></i>'+esc(s.name)+' · Formül Sınavı</div></div>'+
      '<div class="card result" style="--sc:'+s.color+'"><div class="big">%'+pct+'</div><div class="sub">'+msg+'</div>'+
      '<div class="stats"><div class="stat"><b>'+ok+'/'+n+'</b><span>Doğru</span></div>'+
      '<div class="stat"><b>'+(n-ok)+'</b><span>Yanlış</span></div></div>'+
      '<div class="actions" style="justify-content:center"><button class="btn primary" id="sAgain">Tekrar test</button>'+
      '<button class="btn" id="sFormulas">Formüllere dön</button></div>'+
      '<div class="review">'+rows+'</div></div></div>';
    host.querySelector('#sAgain').onclick = function(){ startQuiz(host, s, Q.backFn); };
    host.querySelector('#sFormulas').onclick = function(){ renderStudy(host, s, Q.backFn); };
    host.querySelector('#sBack').onclick = function(){ renderStudy(host, s, Q.backFn); };
    window.scrollTo(0,0);
  }

  function open(host, s, backFn){
    backFnRef = backFn;
    renderStudy(host, s, backFn);
  }

  window.FORMULAQUIZ = { has:has, open:open, check:checkAnswer, hintList:hintList, solText:solText };
})();
