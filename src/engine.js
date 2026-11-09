(function(){
  var SUBJECTS = window.SUBJECTS;
  var qSubj = new Map();
  SUBJECTS.forEach(function(s){
    var qs = s.levels ? s.levels.reduce(function(a,lv){ return a.concat(lv.questions); },[]) : s.questions;
    qs.forEach(function(q){ if(!qSubj.has(q)) qSubj.set(q, s); });
  });
  var $ = function(s,r){ return (r||document).querySelector(s); };
  var app = $('#app');
  var store = {
    get: function(k,d){ try{ var v=localStorage.getItem('dersoyunu.'+k); return v==null?d:JSON.parse(v);}catch(e){return d;} },
    set: function(k,v){ try{ localStorage.setItem('dersoyunu.'+k, JSON.stringify(v)); }catch(e){} }
  };
  var opts = store.get('opts', {count:10, shuffle:true, mixedCount:20, mixedMin:10});
  if(store.get('optsV', 0) < 2 && opts.mixedMin===20){ opts.mixedMin=10; store.set('opts',opts); }
  store.set('optsV', 2);
  var theme = store.get('theme', 'dark');
  document.documentElement.setAttribute('data-theme', theme);
  var G = null; // aktif oyun
  var timerId = null;

  /* ---------- OYUNCULAR ---------- */
  var prof = store.get('profiles', null);
  if(!prof || !prof.list){
    prof = {cur:null, list:{}};
    var oldBest = store.get('best', null);
    if(oldBest && Object.keys(oldBest).length){ prof.list['Oyuncu 1']={best:oldBest,hist:{},mistakes:{},tstats:{}}; prof.cur='Oyuncu 1'; }
    store.set('profiles', prof);
  }
  Object.keys(prof.list).forEach(function(n){ if(!prof.list[n].mistakes) prof.list[n].mistakes={}; if(!prof.list[n].tstats) prof.list[n].tstats={}; });
  var tstatsChanged = false;
  Object.keys(prof.list).forEach(function(n){ if(window.WEAK.migrateTstats(prof.list[n].tstats, SUBJECTS)) tstatsChanged = true; });
  if(tstatsChanged) store.set('profiles', prof);
  function saveProf(){ store.set('profiles', prof); }
  function curP(){ return prof.cur && prof.list[prof.cur] ? prof.list[prof.cur] : null; }
  function addPlayer(name){
    name = String(name||'').replace(/\s+/g,' ').trim().slice(0,24);
    if(!name) return false;
    if(!prof.list[name]) prof.list[name]={best:{},hist:{},mistakes:{},tstats:{}};
    prof.cur=name; saveProf(); return true;
  }
  function pad(n){ return ('0'+n).slice(-2); }
  function fmtDate(t){ var d=new Date(t); return pad(d.getDate())+'.'+pad(d.getMonth()+1)+'<i class="tm"> '+pad(d.getHours())+':'+pad(d.getMinutes())+'</i>'; }
  function playerBar(){
    if(!curP()) return '<div class="card player" id="pcard"><div class="ph"><b>Oyuncu</b><span>Puanların adına kaydedilsin</span></div>'+
      '<form class="pform" id="pform"><input id="pname" maxlength="24" placeholder="Adını yaz…" autocomplete="off"><button class="btn primary">Kaydet</button></form></div>';
    return '<div class="card player" id="pcard"><div class="ph"><b>Oyuncu</b><span>Puanlar oyuncuya göre ayrı tutulur</span></div><div class="prow">'+
      '<select id="psel" aria-label="Oyuncu">'+Object.keys(prof.list).map(function(n){ return '<option'+(n===prof.cur?' selected':'')+'>'+esc(n)+'</option>'; }).join('')+'</select>'+
      '<button class="btn" id="padd">+ Yeni oyuncu</button><button class="btn ghost" id="pdel">Sil</button></div></div>';
  }
  function scoreTable(){
    var p=curP(); if(!p) return '';
    var rowFor = function(name, key){
      var h=p.hist[key]||[];
      return '<tr><th>'+name+'</th>'+[0,1,2].map(function(k){
        var r=h[k]; if(!r) return '<td class="empty">—</td>';
        var cl = r.p>=70?'hi':r.p>=40?'mid':'lo';
        return '<td><b class="'+cl+'">%'+r.p+'</b><small><span>'+r.ok+'/'+r.n+'<em> doğru</em></span><span class="dt"><em> · </em>'+fmtDate(r.t)+'</span></small></td>';
      }).join('')+'</tr>';
    };
    var rows = SUBJECTS.map(function(s){
      if(s.levels){
        return s.levels.map(function(lv){
          return rowFor('<i style="background:'+s.color+'"></i>'+s.name+' · '+lv.name, s.id+':'+lv.id);
        }).join('');
      }
      return rowFor('<i style="background:'+s.color+'"></i>'+s.name, s.id);
    }).join('');
    rows += rowFor('<i style="background:var(--accent2)"></i>Karışık Sınav', 'karisik');
    return '<div class="card scores-card"><h3>'+esc(prof.cur)+' · son 3 tur</h3><div class="tbl-wrap"><table class="scores">'+
      '<thead><tr><th>Ders</th><th>Son tur</th><th>Önceki tur</th><th>Ondan önceki</th></tr></thead><tbody>'+rows+'</tbody></table></div></div>';
  }
  function modal(inner, bind){
    var d=document.createElement('div'); d.className='modal-bg';
    d.innerHTML='<div class="modal">'+inner+'</div>';
    document.body.appendChild(d);
    var close=function(){ d.remove(); document.removeEventListener('keydown',kd); };
    var kd=function(e){ if(e.key==='Escape') close(); };
    document.addEventListener('keydown',kd);
    d.onclick=function(e){ if(e.target===d) close(); };
    bind(d, close);
  }
  function bindPlayer(){
    var pf=$('#pform');
    if(pf) pf.onsubmit=function(e){ e.preventDefault(); if(addPlayer($('#pname').value)) menu(); else $('#pname').focus(); };
    var ps=$('#psel'); if(ps) ps.onchange=function(){ prof.cur=this.value; saveProf(); menu(); };
    var pa=$('#padd'); if(pa) pa.onclick=function(){
      modal('<h3>Yeni oyuncu</h3><form id="mf"><input id="mn" class="minput" maxlength="24" placeholder="Adını yaz…" autocomplete="off"><div class="actions"><button type="button" class="btn ghost" id="mNo">Vazgeç</button><button class="btn primary" id="mYes">Ekle</button></div></form>', function(d, close){
        $('#mNo',d).onclick=close;
        $('#mf',d).onsubmit=function(e){ e.preventDefault(); if(addPlayer($('#mn',d).value)){ close(); menu(); } else $('#mn',d).focus(); };
        $('#mn',d).focus();
      });
    };
    var pd=$('#pdel'); if(pd) pd.onclick=function(){
      modal('<h3>Oyuncu silinsin mi?</h3><p>“'+esc(prof.cur)+'” ve tüm puanları silinecek.</p><div class="actions"><button class="btn ghost" id="mNo">Vazgeç</button><button class="btn primary" id="mYes">Sil</button></div>', function(d, close){
        $('#mNo',d).onclick=close;
        $('#mYes',d).onclick=function(){ delete prof.list[prof.cur]; prof.cur=Object.keys(prof.list)[0]||null; saveProf(); close(); menu(); };
        $('#mNo',d).focus();
      });
    };
  }

  function esc(s){ return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
  function trim(x,n){ return x.length>n ? x.slice(0,n-1)+'…' : x; }
  function shuffle(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
  function themeBtn(){ return '<button class="icon-btn" id="themeBtn" title="Tema">'+(theme==='dark'?'☀ Açık tema':'☾ Koyu tema')+'</button>'; }
  function bindTheme(){ var b=$('#themeBtn'); if(b) b.onclick=function(){ theme = theme==='dark'?'light':'dark'; document.documentElement.setAttribute('data-theme',theme); store.set('theme',theme); b.outerHTML=themeBtn(); bindTheme(); }; }

  /* ---------- SORU KİMLİĞİ & HATA DEFTERİ ---------- */
  function qkey(q){ return q.q; }
  function mistakes(){ var p=curP(); return p ? p.mistakes : {}; }
  function mistakeCount(){ return Object.keys(mistakes()).length; }
  function addMistake(q){ var p=curP(); if(!p) return; p.mistakes[qkey(q)]={q:q}; saveProf(); }
  function delMistake(q){ var p=curP(); if(!p) return; delete p.mistakes[qkey(q)]; saveProf(); }
  function mistakeList(){ return Object.keys(mistakes()).map(function(k){ return mistakes()[k]; }); }

  /* ---------- SORU HAVUZU YARDIMCILARI ---------- */
  function allQuestions(){
    var out=[];
    SUBJECTS.forEach(function(s){
      if(s.levels) s.levels.forEach(function(lv){ lv.questions.forEach(function(q){ out.push({q:q, s:s, lv:lv}); }); });
      else s.questions.forEach(function(q){ out.push({q:q, s:s, lv:null}); });
    });
    return out;
  }
  function topicsOf(list){
    var out=[]; list.forEach(function(q){ var t=q.topic||'Genel'; if(out.indexOf(t)<0) out.push(t); });
    return out;
  }

  /* ---------- ZAYIF KONU ANALİZİ (ders bazlı; mantık src/weak.js) ---------- */
  var WEAK = window.WEAK;
  var WEAK_MAX_Q = 15;
  function tkey(sid, topic){ return WEAK.tkey(sid, topic); }
  /* Zayıf konuları ders ders gruplar; her grupta o dersin zayıf konuları ve soru havuzu olur. */
  function weakBySubject(){ return curP() ? WEAK.weakBySubject(curP().tstats, SUBJECTS, allQuestions()) : []; }

  /* ---------- ANA MENÜ ---------- */
  function menu(){
    G = null; clearTimer();
    var best = curP() ? curP().best : {};
    var h = '<header class="top"><div class="brand"><span class="dot"></span>Bilgi Yolu</div>'+themeBtn()+'</header>'+
      '<section class="hero"><h1>Hangi dersle başlamak istersin?</h1><p>Cevaplarını kendi kelimelerinle yaz. Küçük yazım hataları sorun değil, her yanlışta bir ipucu açılır.</p></section>'+
      playerBar();
    var mc = mistakeCount();
    h += '<div class="grid">';
    var extra = '';
    if(curP() && mc){
      extra += '<button class="card subject special" data-mistakes="1" style="--sc:var(--bad)">'+
        '<div class="ico">✎</div><h3>Yanlışlarım</h3><div class="tag">Hata defteri · '+mc+' soru</div>'+
        '<div class="meta"><span>'+mc+' soru</span><span>Tekrar çöz</span></div></button>';
    }
    if(curP()){
      extra += '<button class="card subject special" data-mixed="1" style="--sc:var(--accent2)">'+
        '<div class="ico">⚡</div><h3>Karışık Sınav</h3><div class="tag">Tüm derslerden rastgele · süreli</div>'+
        '<div class="meta"><span>'+opts.mixedCount+' soru · '+opts.mixedMin+' dk</span><span>Deneme</span></div></button>';
    }
    var wbs = weakBySubject();
    wbs.forEach(function(g){
      extra += '<button class="card subject special" data-weaks="'+g.s.id+'" style="--sc:var(--ok)">'+
        '<div class="ico">🎯</div><h3>Zayıf Konularım · '+esc(g.s.name)+'</h3>'+
        '<div class="tag">'+g.weak.map(function(w){ return esc(trim(w.topic,22)); }).join(' · ')+'</div>'+
        '<div class="meta"><span>%'+g.weak[0].pct+' · '+g.weak.length+' konu</span><span>Hedefli çalış</span></div></button>';
    });
    h += extra;
    SUBJECTS.forEach(function(s,i){
      var b = best[s.id];
      var total = s.levels ? s.levels.reduce(function(a,lv){return a+lv.questions.length;},0) : s.questions.length;
      var cnt = s.levels ? (s.levels.length+' seviye · '+total+' soru') : (total+' soru');
      var bestTxt = s.levels ? 'İki seviye' : (b!=null?'En iyi: %'+b:'Henüz oynanmadı');
      h += '<button class="card subject" data-i="'+i+'" style="--sc:'+s.color+';animation-delay:'+((i+(extra?2:0))*.05).toFixed(2)+'s">'+
        '<div class="ico">'+s.icon+'</div><h3>'+s.name+'</h3>'+
        '<div class="tag">'+s.desc+'</div>'+
        '<div class="meta"><span>'+cnt+'</span><span>'+bestTxt+'</span></div></button>';
    });
    h += '</div>'+scoreTable()+'<div class="opts"><span>Soru sayısı</span><div class="seg" id="cnt">'+
      [10,20,0].map(function(n){ return '<button data-n="'+n+'" class="'+(opts.count===n?'on':'')+'">'+(n||'Tümü')+'</button>'; }).join('')+
      '</div><label class="chk"><input type="checkbox" id="shf" '+(opts.shuffle?'checked':'')+'> Soruları karıştır</label>'+
      '<span class="sep"></span><span>Karışık sınav</span><div class="seg" id="mcnt">'+
      [10,20,30].map(function(n){ return '<button data-n="'+n+'" class="'+(opts.mixedCount===n?'on':'')+'">'+n+'</button>'; }).join('')+
      '</div><div class="seg" id="mmin">'+
      [10,20,30].map(function(n){ return '<button data-n="'+n+'" class="'+(opts.mixedMin===n?'on':'')+'">'+n+' dk</button>'; }).join('')+
      '</div></div>'+
      '<div class="foot">Enter ile cevap gönderilir · Sorulardayken üstteki “Ana Menü” tuşuyla çıkabilirsin</div>';
    ANIM.render(app, h);
    bindTheme();
    bindPlayer();
    var needPlayer = function(){ var pc=$('#pcard'); pc.classList.remove('shake'); void pc.offsetWidth; pc.classList.add('shake'); pc.scrollIntoView({block:'center',behavior:'smooth'}); var f=$('#pname'); if(f) f.focus({preventScroll:true}); };
    app.querySelectorAll('.subject').forEach(function(b){ b.onclick=function(){
      if(!curP()){ needPlayer(); return; }
      if(b.dataset.mistakes){ startMistakes(); return; }
      if(b.dataset.mixed){ mixedExam(); return; }
      if(b.dataset.weaks){ startWeak(b.dataset.weaks); return; }
      var s = SUBJECTS[+b.dataset.i];
      if(s.levels) levelSelect(s); else pickScreen(s, null);
    }; });
    app.querySelectorAll('#cnt button').forEach(function(b){ b.onclick=function(){ opts.count=+b.dataset.n; store.set('opts',opts); menu(); }; });
    app.querySelectorAll('#mcnt button').forEach(function(b){ b.onclick=function(){ opts.mixedCount=+b.dataset.n; store.set('opts',opts); menu(); }; });
    app.querySelectorAll('#mmin button').forEach(function(b){ b.onclick=function(){ opts.mixedMin=+b.dataset.n; store.set('opts',opts); menu(); }; });
    $('#shf').onchange=function(){ opts.shuffle=this.checked; store.set('opts',opts); };
    window.scrollTo(0,0);
  }

  /* ---------- SEVİYE SEÇİMİ ---------- */
  function levelSelect(s){
    G = null; clearTimer();
    var best = curP() ? curP().best : {};
    var h = '<header class="top"><div class="brand"><span class="dot"></span>Bilgi Yolu</div>'+themeBtn()+'</header>'+
      '<div class="bar" style="--sc:'+s.color+'"><button class="icon-btn" id="homeBtn">← Ana Menü</button><div class="title"><i></i>'+s.name+'</div></div>'+
      '<section class="hero"><h1>'+s.name+' · hangi seviyeyle başlamak istersin?</h1><p>Kolay–orta seviyede çalışma soruları, zor seviyede ise çizimli, hesaplamalı ve yorum gerektiren sorular bulunur.</p></section>'+
      '<div class="grid">';
    s.levels.forEach(function(lv,i){
      var b = best[s.id+':'+lv.id];
      h += '<button class="card subject" data-l="'+i+'" style="--sc:'+s.color+';animation-delay:'+(i*.05).toFixed(2)+'s">'+
        '<div class="ico">'+s.icon+'</div><h3>'+lv.name+'</h3>'+
        '<div class="tag">'+lv.desc+'</div>'+
        '<div class="meta"><span>'+lv.questions.length+' soru</span><span>'+(b!=null?'En iyi: %'+b:'Henüz oynanmadı')+'</span></div></button>';
    });
    h += '</div><div class="foot">Zor seviyede cevaplar için yazım hataları tolere edilir; yine de doğru terimi yazmaya çalış.</div>';
    ANIM.render(app, h);
    bindTheme();
    $('#homeBtn').onclick = menu;
    app.querySelectorAll('.subject').forEach(function(b){ b.onclick=function(){ pickScreen(s, s.levels[+b.dataset.l]); }; });
    window.scrollTo(0,0);
  }

  /* ---------- KONU FİLTRESİ ---------- */
  var pickSel = null;
  function pickScreen(s, lv){
    G = null; clearTimer();
    var pool = lv ? lv.questions : s.questions;
    var topics = topicsOf(pool);
    if(topics.length<=1){ startGame({s:s, lv:lv, questions:pool, key:s.id+(lv?':'+lv.id:''), name:s.name, color:s.color}); return; }
    pickSel = {};
    var h = '<header class="top"><div class="brand"><span class="dot"></span>Bilgi Yolu</div>'+themeBtn()+'</header>'+
      '<div class="bar" style="--sc:'+s.color+'"><button class="icon-btn" id="backBtn">← Geri</button><div class="title"><i></i>'+s.name+(lv?' · '+lv.name:'')+'</div></div>'+
      '<section class="hero"><h1>Hangi konuları çalışmak istersin?</h1><p>İstediğin konuları seç ya da tümüyle başla. Seçili konulara göre sorular hazırlanır.</p></section>'+
      '<div class="card pick"><div class="chips" id="chips">'+
      '<button class="chip" data-all="1">Tümü</button>'+
      topics.map(function(t,i){ return '<button class="chip" data-t="'+i+'">'+esc(t)+'</button>'; }).join('')+
      '</div><div class="pick-foot"><span id="pcount">'+pool.length+' soru</span><button class="btn primary" id="pstart">Başla →</button></div></div>'+
      '<div class="foot">Konu seçmezsen tüm sorular gelir.</div>';
    ANIM.render(app, h);
    bindTheme();
    $('#backBtn').onclick = function(){ if(lv) levelSelect(s); else menu(); };
    var chips = app.querySelectorAll('.chip');
    var update = function(){
      var sel = topics.filter(function(t,i){ return pickSel[i]; });
      var n = pool.filter(function(q){ return !sel.length || sel.indexOf(q.topic||'Genel')>=0; }).length;
      $('#pcount').textContent = n+' soru';
      chips.forEach(function(c){
        if(c.dataset.all) c.classList.toggle('on', sel.length===0);
        else c.classList.toggle('on', !!pickSel[+c.dataset.t]);
      });
    };
    chips.forEach(function(c){ c.onclick=function(){
      if(c.dataset.all){ pickSel={}; }
      else { var i=+c.dataset.t; if(pickSel[i]) delete pickSel[i]; else pickSel[i]=1; }
      update();
    }; });
    $('#pstart').onclick=function(){
      var sel = topics.filter(function(t,i){ return pickSel[i]; });
      var qs = sel.length ? pool.filter(function(q){ return sel.indexOf(q.topic||'Genel')>=0; }) : pool;
      startGame({s:s, lv:lv, questions:qs, key:s.id+(lv?':'+lv.id:''), name:s.name, color:s.color});
    };
    update();
    window.scrollTo(0,0);
  }

  /* ---------- HATA DEFTERİ / KARIŞIK SINAV ---------- */
  function startMistakes(){
    var list = mistakeList();
    if(!list.length){ menu(); return; }
    var qs = shuffle(list.map(function(m){ return m.q; }));
    if(opts.count && qs.length>opts.count) qs = qs.slice(0,opts.count);
    startGame({name:'Yanlışlarım', color:'#dc9090', questions:qs, key:'yanlislar', special:'mistakes'});
  }
  function mixedExam(){
    var all = shuffle(allQuestions());
    var n = opts.mixedCount || 20;
    if(all.length>n) all = all.slice(0,n);
    var qs = all.map(function(x){ return x.q; });
    startGame({name:'Karışık Sınav', color:'#cfae74', questions:qs, key:'karisik', timed:(opts.mixedMin||20)*60});
  }
  function startWeak(sid){
    var groups = weakBySubject();
    var g = null;
    for(var i=0;i<groups.length;i++) if(groups[i].s.id===sid){ g=groups[i]; break; }
    if(!g){ menu(); return; }
    var qs = shuffle(g.pool.map(function(x){ return x.q; }));
    if(qs.length>WEAK_MAX_Q) qs = qs.slice(0,WEAK_MAX_Q);
    var label = g.weak.map(function(w){ return w.topic; }).join(' · ');
    startGame({name:'Zayıf Konularım · '+g.s.name, color:g.s.color, questions:qs, key:'zayif:'+g.s.id,
      special:'weak', weakSubj:g.s.id, focus:label});
  }

  /* ---------- OYUN ---------- */
  function startGame(cfg){
    clearTimer();
    var qs = cfg.questions.slice();
    if(opts.shuffle && cfg.special!=='mistakes') qs = shuffle(qs);
    if(opts.count && !cfg.timed && cfg.special!=='weak' && qs.length>opts.count) qs = qs.slice(0,opts.count);
    G = {name:cfg.name, color:cfg.color||'var(--accent)', lv:cfg.lv||null, key:cfg.key,
         special:cfg.special||null, focus:cfg.focus||null, s:cfg.s||null, weakSubj:cfg.weakSubj||null, qs:qs, i:0, score:0, log:[], topics:{},
         timed:cfg.timed||0, left:cfg.timed||0, streak:0, bestStreak:0};
    question();
  }
  function maxPts(){ return G.qs.length*10; }
  function streakBonus(s){ return Math.min(Math.max(s-1,0)*2, 10); }
  function clearTimer(){ if(timerId){ clearInterval(timerId); timerId=null; } }
  function fmtTime(sec){ var m=Math.floor(sec/60), s=sec%60; return pad(m)+':'+pad(s); }
  function startTimer(){
    if(!G.timed) return;
    clearTimer();
    timerId = setInterval(function(){
      if(!G){ clearTimer(); return; }
      G.left--;
      var el=$('#tleft'); if(el){ el.textContent=fmtTime(Math.max(G.left,0)); var p=el.parentNode; if(p) p.classList.toggle('low', G.left<=60); }
      if(G.left<=0){ clearTimer(); results(); }
    }, 1000);
  }

  function autoHint(q){
    var first = function(spec){
      if(spec.num!=null && !spec.a) return null;
      var a = (spec.a||[])[0] || (spec.all? spec.all.map(function(g){return g[0];}).join(' – ') : null);
      if(!a) return null;
      var letters = a.replace(/[^A-Za-zÇĞİÖŞÜçğıöşüâîûÂÎÛ]/g,'').length;
      return '“'+a.charAt(0).toLocaleUpperCase('tr')+'” ile başlıyor'+(letters>1?' ('+letters+' harf)':'');
    };
    if(q.type==='parts'){
      var out=[]; q.parts.forEach(function(p,i){ if(!G.cur.done[i]){ var f=first(p); if(f) out.push((p.label?p.label.replace(/:$/,''):'')+': '+f); } });
      return out.length? out.join(' · ') : null;
    }
    if(q.type==='list'){
      var left = q.pool.filter(function(p,j){ return !G.cur.usedPool[j]; }).map(function(p){ return (p.a||[])[0] || (p.all||[]).map(function(g){return g[0];}).join(' – '); });
      if(q.ordered) return null;
      return left.length? 'Kabul edilen cevaplardan birinin baş harfi: “'+left[0].charAt(0)+'”' : null;
    }
    if(q.type==='free') return null;
    return first(q);
  }
  function hintList(q){
    var hs = (q.hints||[]).slice();
    var ah = autoHint(q); if(ah) hs.push(ah);
    return hs;
  }

  function fieldsHtml(q){
    if(q.type==='parts') return q.parts.map(function(p,i){
      return '<div class="field" data-k="'+i+'">'+(p.label?'<label>'+p.label+'</label>':'')+(p.long?'<textarea style="min-height:80px" spellcheck="false" placeholder="'+(p.ph||'Cevabın…')+'"></textarea>':'<input autocomplete="off" spellcheck="false" placeholder="'+(p.ph||'Cevabın…')+'">')+'</div>'; }).join('');
    if(q.type==='list'){ var h=''; for(var i=0;i<q.n;i++) h+='<div class="field" data-k="'+i+'"><label>'+(q.labels?q.labels[i]:(i+1)+'.')+'</label><input autocomplete="off" spellcheck="false" placeholder="'+(q.ordered?(i+1)+'. sıradaki…':'Cevabın…')+'"></div>';
      (q.extra||[]).forEach(function(p,j){ h+='<div class="field" data-k="'+(q.n+j)+'"><label>'+p.label+'</label>'+(p.long?'<textarea style="min-height:80px" spellcheck="false" placeholder="Cevabın…"></textarea>':'<input autocomplete="off" spellcheck="false" placeholder="Cevabın…">')+'</div>'; });
      return h; }
    if(q.type==='free') return '<div class="field" data-k="0"><textarea spellcheck="true" placeholder="'+(q.ph||'Cevabını buraya yaz…')+'"></textarea></div>';
    if(q.long) return '<div class="field" data-k="0"><textarea style="min-height:90px" spellcheck="false" placeholder="Cevabını kendi cümlelerinle yaz…"></textarea></div>';
    return '<div class="field" data-k="0"><input autocomplete="off" spellcheck="false" placeholder="Cevabını yaz…"></div>';
  }

  function question(){
    var q = G.qs[G.i], s=G.s;
    G.cur = {wrong:0, hints:0, done:{}, usedPool:{}, finished:false};
    var pct = Math.round(G.i/G.qs.length*100);
    var h = '<div class="bar" style="--sc:'+G.color+'">'+
      '<button class="icon-btn" id="homeBtn">← Ana Menü</button>'+
      '<div class="title"><i></i>'+esc(G.name)+(G.lv?' · '+G.lv.name:'')+'</div><div class="sp"></div>'+
      (G.timed?'<span class="pill timer'+(G.left<=60?' low':'')+'">⏱ <b id="tleft">'+fmtTime(Math.max(G.left,0))+'</b></span>':'')+
      '<span class="pill">Soru <b>'+(G.i+1)+'</b> / '+G.qs.length+'</span>'+
      (G.streak>=2?'<span class="pill streak" id="streakPill">🔥 Seri <b>'+G.streak+'</b> · +'+streakBonus(G.streak)+'</span>':'')+
      '<span class="pill">Puan <b id="pts">'+G.score+'</b></span>'+themeBtn()+'</div>'+
      '<div class="progress" style="--sc:'+G.color+'"><div style="width:'+pct+'%"></div></div>'+
      '<div class="card qcard" id="qc" style="--sc:'+G.color+'">'+
      (G.focus?'<div class="focus-note">🎯 Odak: '+esc(G.focus)+'</div>':'')+
      '<div class="qnum"><span>'+(q.topic||'')+'</span><span>'+(q.src||'')+'</span></div>'+
      (q.passage?'<div class="passage">'+q.passage+'</div>':'')+
      '<div class="qtext">'+q.q+(q.note?'<span class="sub">'+q.note+'</span>':'')+'</div>'+
      (q.svg?'<figure class="fig">'+q.svg+'</figure>':'')+
      '<div class="inputs">'+fieldsHtml(q)+'</div>'+
      '<div class="actions"><button class="btn primary" id="chk">Kontrol Et</button>'+
      '<button class="btn ghost" id="pass">Pas geç</button><button class="btn ghost" id="show" style="display:none">Cevabı göster</button>'+
      '<button class="btn primary" id="next" style="display:none">'+(G.i+1<G.qs.length?'Sonraki soru →':'Sonuçları gör →')+'</button>'+
      '<span class="kbd">Enter ↵</span></div>'+
      '<div class="hints" id="hints"></div><div id="fb"></div></div>';
    ANIM.render(app, h);
    bindTheme();
    $('#homeBtn').onclick = confirmHome;
    $('#chk').onclick = submit;
    $('#pass').onclick = function(){ reveal(true); };
    $('#show').onclick = function(){ reveal(false); };
    $('#next').onclick = next;
    app.querySelectorAll('.field input, .field textarea').forEach(function(inp,idx,all){
      inp.addEventListener('keydown',function(e){
        if(e.key==='Enter' && !(inp.tagName==='TEXTAREA' && e.shiftKey)){
          if(inp.tagName==='TEXTAREA' && q.type==='free') { if(!e.ctrlKey) return; }
          e.preventDefault();
          if(G.cur.finished){ next(); return; }
          if(all.length>1){
            for(var j=idx+1;j<all.length;j++){ if(!all[j].disabled && !all[j].value.trim()){ all[j].focus(); return; } }
          }
          submit();
        }
      });
    });
    startTimer();
    var f = app.querySelector('.field input, .field textarea'); if(f) f.focus({preventScroll:true});
    window.scrollTo(0,0);
  }

  function values(){ return Array.prototype.map.call(app.querySelectorAll('.field'), function(f){ var i=f.querySelector('input,textarea'); return i.value; }); }
  function mark(k, ok){
    var f = app.querySelector('.field[data-k="'+k+'"]'); if(!f) return;
    f.classList.remove('ok','bad'); f.classList.add(ok?'ok':'bad');
    if(ok){ var i=f.querySelector('input,textarea'); i.disabled=true; }
  }

  function evaluate(q, vals){
    if(q.type==='parts'){
      var all=true;
      q.parts.forEach(function(p,i){
        if(G.cur.done[i]) return;
        var ok = M.check(vals[i], p); if(ok) G.cur.done[i]=true; else all=false;
        mark(i, ok);
      });
      return all;
    }
    if(q.type==='list'){
      var pool=q.pool, all2=true;
      (q.extra||[]).forEach(function(p,j){ var k=q.n+j; if(G.cur.done[k]) return; var ok=M.check(vals[k],p); if(ok) G.cur.done[k]=true; else all2=false; mark(k,ok); });
      vals.slice(0,q.n).forEach(function(v,i){
        if(G.cur.done[i]) return;
        var hit=-1;
        if(q.ordered){ if(M.check(v,pool[i])) hit=i; }
        else for(var j=0;j<pool.length;j++){ if(!G.cur.usedPool[j] && M.check(v,pool[j])){ hit=j; break; } }
        if(hit>=0){ G.cur.usedPool[hit]=1; G.cur.done[i]=true; mark(i,true); }
        else { all2=false; mark(i,false); }
      });
      return all2;
    }
    if(q.type==='free'){
      var v=vals[0], c=q.check||{}, ok=true;
      var sent = v.split(/[.!?…]+/).filter(function(x){ return x.trim().split(/\s+/).length>=2; }).length;
      if(c.minSentences && sent < c.minSentences) ok=false;
      if(c.minWords && v.trim().split(/\s+/).filter(Boolean).length < c.minWords) ok=false;
      if(c.must) c.must.forEach(function(alts){ if(!M.check(v,{keys:[alts]})) ok=false; });
      G.cur.freeInfo = {sent:sent};
      mark(0, ok);
      return ok;
    }
    var r = M.check(vals[0], q); mark(0, r); return r;
  }

  function submit(){
    if(G.cur.finished) return;
    var q=G.qs[G.i], vals=values();
    var pending = app.querySelectorAll('.field input:not(:disabled), .field textarea:not(:disabled)');
    var empty = Array.prototype.some.call(pending, function(i){ return !i.value.trim(); });
    if(empty){ var e=Array.prototype.find.call(pending,function(i){return !i.value.trim();}); e.focus(); var qc=$('#qc'); qc.classList.remove('shake'); void qc.offsetWidth; qc.classList.add('shake'); return; }
    var ok = evaluate(q, vals);
    if(ok){ finish(true); return; }
    G.cur.wrong++;
    var qc=$('#qc'); qc.classList.remove('shake'); void qc.offsetWidth; qc.classList.add('shake');
    var hs = hintList(q);
    var box=$('#hints');
    if(G.cur.hints < hs.length){
      var hh=hs[G.cur.hints]; G.cur.hints++;
      if(q.type==='free' && G.cur.freeInfo && q.check && q.check.minSentences) hh += ' (Şu an yaklaşık '+G.cur.freeInfo.sent+' cümle var.)';
      box.insertAdjacentHTML('beforeend','<div class="hint"><b>İpucu '+G.cur.hints+'</b>'+hh+'</div>');
    } else {
      box.insertAdjacentHTML('beforeend','<div class="hint"><b>Bir daha dene</b>İpuçları bitti. İstersen “Cevabı göster”e basabilirsin.</div>');
    }
    if(G.cur.wrong>=2 || G.cur.hints>=hs.length) $('#show').style.display='';
    var f = app.querySelector('.field input:not(:disabled), .field textarea:not(:disabled)'); if(f){ f.focus(); f.select && f.select(); }
  }

  function answerText(q){
    if(q.exp) return q.exp;
    if(q.type==='parts') return q.parts.map(function(p){ return (p.label||'')+' '+(p.a?p.a[0]:p.num); }).join('<br>');
    if(q.type==='list') return q.pool.map(function(p){ return p.a?p.a[0]:(p.all||[]).map(function(g){return g[0];}).join(' – '); }).join(', ');
    return q.a? q.a[0] : String(q.num);
  }
  function altText(q){
    if(q.type || !q.a || q.a.length<2) return '';
    var uniq=[]; q.a.forEach(function(x){ if(uniq.indexOf(x)<0) uniq.push(x); });
    if(uniq.length<2) return '';
    return '<div class="alt">Kabul edilen cevaplar: '+uniq.slice(0,8).map(esc).join(' · ')+'</div>';
  }

  function animateScore(to){
    var el=$('#pts'); if(!el) return;
    var from = parseInt(el.textContent,10)||0;
    if(from===to) return;
    var steps = Math.min(Math.abs(to-from), 12), k=0;
    var iv = setInterval(function(){
      k++; el.textContent = Math.round(from+(to-from)*k/steps);
      el.classList.add('bump');
      if(k>=steps){ clearInterval(iv); el.textContent=to; setTimeout(function(){ el.classList.remove('bump'); },200); }
    }, 30);
  }

  function finish(ok){
    var q=G.qs[G.i];
    G.cur.finished=true;
    var firstTry = ok && G.cur.wrong===0;
    var bonus = 0;
    if(ok){
      if(firstTry){ G.streak++; if(G.streak>G.bestStreak) G.bestStreak=G.streak; bonus = streakBonus(G.streak); }
      else G.streak = 0;
    } else G.streak = 0;
    var pts = ok ? Math.max(10 - G.cur.wrong*2, 2) + bonus : 0;
    G.score += pts;
    var tk = q.topic||'Genel';
    var t = G.topics[tk] || (G.topics[tk]={ok:0,n:0});
    t.n++; if(ok) t.ok++;
    var p=curP();
    if(p){
      if(!p.tstats) p.tstats={};
      var sid = (qSubj.get(q)||{}).id || 'genel';
      var key = tkey(sid, tk);
      var tt=p.tstats[key]||(p.tstats[key]={ok:0,n:0}); tt.n++; if(ok) tt.ok++; tt.last=Date.now();
    }
    if(ok) delMistake(q); else addMistake(q);
    saveProf();
    G.log.push({q:q, ok:ok, pts:pts, bonus:bonus, streak:G.streak, wrong:G.cur.wrong});
    animateScore(G.score);
    app.querySelectorAll('.field input, .field textarea').forEach(function(i){ i.disabled=true; });
    var title;
    if(!ok) title = 'Cevap';
    else if(bonus>0) title = 'Doğru! 🔥 '+G.streak+'’li seri (+'+pts+')';
    else title = G.cur.wrong ? 'Doğru! (+'+pts+')' : 'Harika, ilk denemede doğru! (+10)';
    var extra = (q.type==='free' && ok) ? '<div class="alt">Bu soru serbest yazım sorusu; değerlendirme ölçütünü aşağıda görebilirsin.</div>' : '';
    if(bonus>0) extra += '<div class="alt">Kombo bonusu: +'+bonus+' puan (ardışık ilk-deneme doğruları).</div>';
    if(!ok && G.special!=='mistakes') extra += '<div class="alt">Bu soru “Yanlışlarım”a eklendi; ana menüden tekrar çözebilirsin.</div>';
    var mark = ok ? '<svg class="check-mark" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5"/></svg>' : '';
    $('#fb').innerHTML = '<div class="fb '+(ok?'ok':'bad')+'"><div class="h">'+mark+title+'</div>'+answerText(q)+altText(q)+extra+'</div>';
    if(ok){
      var combo = G.streak>=2;
      ANIM.confetti(app, combo ? 26 : 14);
      ANIM.floatPoints($('#pts'), '+'+pts+(bonus>0?' 🔥':''), bonus>0?'bonus':'');
    }
    $('#chk').style.display='none'; $('#pass').style.display='none'; $('#show').style.display='none';
    var n=$('#next'); n.style.display=''; n.focus({preventScroll:true});
    setTimeout(function(){ var fb=$('#fb'); if(fb && fb.getBoundingClientRect().bottom>window.innerHeight) fb.scrollIntoView({behavior:'smooth',block:'end'}); },50);
  }
  function reveal(){ finish(false); }
  function next(){ if(!G) return; G.i++; if(G.i>=G.qs.length) results(); else question(); }

  /* ---------- SONUÇ ---------- */
  function topicAnalysis(){
    var ks = Object.keys(G.topics);
    if(ks.length<2) return '';
    ks.sort(function(a,b){ var ra=G.topics[a].ok/G.topics[a].n, rb=G.topics[b].ok/G.topics[b].n; return ra-rb; });
    return '<div class="analysis"><h3>Konu analizi</h3><p class="an-sub">En çok zorlandığın konular üstte.</p>'+
      ks.map(function(k){
        var t=G.topics[k], p=Math.round(t.ok/t.n*100);
        var cl = p>=70?'hi':p>=40?'mid':'lo';
        return '<div class="an-row"><span class="an-name">'+esc(k)+'</span><span class="an-bar"><i class="'+cl+'" style="width:'+p+'%"></i></span><span class="an-pct '+cl+'">%'+p+'</span></div>';
      }).join('')+'</div>';
  }

  function results(){
    clearTimer();
    var s=G.s, okc=G.log.filter(function(l){return l.ok;}).length;
    var pct = Math.min(100, Math.round(G.score/maxPts()*100));
    var p=curP();
    if(p){
      if(p.best[G.key]==null || pct>p.best[G.key]) p.best[G.key]=pct;
      p.hist[G.key]=[{p:pct, s:G.score, ok:okc, n:G.qs.length, t:Date.now()}].concat(p.hist[G.key]||[]).slice(0,3);
      saveProf();
    }
    var msg = pct>=85?'Çok iyi gidiyorsun!':pct>=60?'Güzel iş, biraz daha tekrarla mükemmel olur.':pct>=35?'Fena değil, yanlışları gözden geçir.':'Konuyu tekrar edip yeniden dene.';
    var firstTry = G.log.filter(function(l){return l.ok&&!l.wrong;}).length;
    var stat = function(val, label, i){ return '<div class="stat" style="animation-delay:'+(0.08*i).toFixed(2)+'s"><b>'+val+'</b><span>'+label+'</span></div>'; };
    var h='<div class="bar" style="--sc:'+G.color+'"><button class="icon-btn" id="homeBtn">← Ana Menü</button><div class="title"><i></i>'+esc(G.name)+(G.lv?' · '+G.lv.name:'')+'</div><div class="sp"></div>'+themeBtn()+'</div>'+
      '<div class="card result" style="--sc:'+G.color+'"><div class="big" id="bigPct">%0</div><div class="sub">'+msg+'</div>'+
      '<div class="stats">'+stat(okc+'/'+G.qs.length,'Doğru',0)+stat(G.score,'Puan',1)+stat(firstTry,'İlk denemede',2)+
      stat(G.bestStreak>=2?('🔥 '+G.bestStreak):'—','En uzun seri',3)+'</div>'+
      '<div class="actions" style="justify-content:center"><button class="btn primary" id="again">Tekrar oyna</button><button class="btn" id="home2">Ana menü</button></div>'+
      topicAnalysis()+
      '<div class="review">'+G.log.map(function(l,i){
        var qt = l.q.q.replace(/<br\s*\/?>/g,' ').replace(/<[^>]+>/g,''); qt=trim(qt,140);
        return '<div class="rv" style="animation-delay:'+Math.min(0.5,0.04*i).toFixed(2)+'s"><div class="st '+(l.ok?'ok':'bad')+'">'+(l.ok?'✓':'✗')+'</div><div><div>'+(i+1)+'. '+esc(qt)+'</div><div class="ans">'+esc(trim(answerText(l.q).replace(/<br\s*\/?>/g,' · ').replace(/<[^>]+>/g,'').replace(/&amp;/g,'&'),260))+'</div></div></div>';
      }).join('')+'</div></div>';
    ANIM.render(app, h); bindTheme();
    ANIM.countUp($('#bigPct'), pct, 900, '%');
    if(pct>=85) ANIM.confetti(app, 30);
    $('#homeBtn').onclick=menu; $('#home2').onclick=menu;
    $('#again').onclick=function(){
      if(G.special==='mistakes') startMistakes();
      else if(G.special==='weak') startWeak(G.weakSubj);
      else if(G.s) startGame({s:G.s, lv:G.lv, questions:(G.lv?G.lv.questions:G.s.questions), key:G.key, name:G.name, color:G.color});
      else mixedExam();
    };
    window.scrollTo(0,0);
  }

  function confirmHome(){
    if(!G || (G.i===0 && !G.cur.wrong && !G.cur.finished)){ menu(); return; }
    var d=document.createElement('div'); d.className='modal-bg';
    d.innerHTML='<div class="modal"><h3>Ana menüye dön?</h3><p>Bu oyundaki ilerlemen kaydedilmeyecek.</p><div class="actions"><button class="btn ghost" id="mNo">Vazgeç</button><button class="btn primary" id="mYes">Ana menü</button></div></div>';
    document.body.appendChild(d);
    var close=function(){ d.remove(); document.removeEventListener('keydown',kd); };
    var kd=function(e){ if(e.key==='Escape') close(); };
    document.addEventListener('keydown',kd);
    d.onclick=function(e){ if(e.target===d) close(); };
    $('#mNo',d).onclick=close; $('#mYes',d).onclick=function(){ close(); menu(); };
    $('#mYes',d).focus();
  }
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape' && G && !document.querySelector('.modal-bg')) confirmHome();
    if(e.key==='Enter' && G && G.cur && G.cur.finished && !(document.activeElement && /^(BUTTON|A|INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) && !document.querySelector('.modal-bg')){ e.preventDefault(); next(); }
  });
  menu();
})();
