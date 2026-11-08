(function(){
  var SUBJECTS = window.SUBJECTS;
  var $ = function(s,r){ return (r||document).querySelector(s); };
  var app = $('#app');
  var store = {
    get: function(k,d){ try{ var v=localStorage.getItem('dersoyunu.'+k); return v==null?d:JSON.parse(v);}catch(e){return d;} },
    set: function(k,v){ try{ localStorage.setItem('dersoyunu.'+k, JSON.stringify(v)); }catch(e){} }
  };
  var opts = store.get('opts', {count:10, shuffle:true});
  var theme = store.get('theme', 'dark');
  document.documentElement.setAttribute('data-theme', theme);
  var G = null; // aktif oyun

  /* ---------- OYUNCULAR ---------- */
  var prof = store.get('profiles', null);
  if(!prof || !prof.list){
    prof = {cur:null, list:{}};
    var oldBest = store.get('best', null);
    if(oldBest && Object.keys(oldBest).length){ prof.list['Oyuncu 1']={best:oldBest,hist:{}}; prof.cur='Oyuncu 1'; }
    store.set('profiles', prof);
  }
  function saveProf(){ store.set('profiles', prof); }
  function curP(){ return prof.cur && prof.list[prof.cur] ? prof.list[prof.cur] : null; }
  function addPlayer(name){
    name = String(name||'').replace(/\s+/g,' ').trim().slice(0,24);
    if(!name) return false;
    if(!prof.list[name]) prof.list[name]={best:{},hist:{}};
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
    var rows = SUBJECTS.map(function(s){
      var h=p.hist[s.id]||[];
      return '<tr><th><i style="background:'+s.color+'"></i>'+s.name+'</th>'+[0,1,2].map(function(k){
        var r=h[k]; if(!r) return '<td class="empty">—</td>';
        var cl = r.p>=70?'hi':r.p>=40?'mid':'lo';
        return '<td><b class="'+cl+'">%'+r.p+'</b><small><span>'+r.ok+'/'+r.n+'<em> doğru</em></span><span class="dt"><em> · </em>'+fmtDate(r.t)+'</span></small></td>';
      }).join('')+'</tr>';
    }).join('');
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

  /* ---------- ANA MENÜ ---------- */
  function menu(){
    G = null;
    var best = curP() ? curP().best : {};
    var h = '<header class="top"><div class="brand"><span class="dot"></span>Bilgi Yolu</div>'+themeBtn()+'</header>'+
      '<section class="hero"><h1>Hangi dersle başlamak istersin?</h1><p>Cevaplarını kendi kelimelerinle yaz. Küçük yazım hataları sorun değil, her yanlışta bir ipucu açılır.</p></section>'+
      playerBar()+'<div class="grid">';
    SUBJECTS.forEach(function(s,i){
      var b = best[s.id];
      h += '<button class="card subject" data-i="'+i+'" style="--sc:'+s.color+'">'+
        '<div class="ico">'+s.icon+'</div><h3>'+s.name+'</h3>'+
        '<div class="tag">'+s.desc+'</div>'+
        '<div class="meta"><span>'+s.questions.length+' soru</span><span>'+(b!=null?'En iyi: %'+b:'Henüz oynanmadı')+'</span></div></button>';
    });
    h += '</div>'+scoreTable()+'<div class="opts"><span>Soru sayısı</span><div class="seg" id="cnt">'+
      [10,20,0].map(function(n){ return '<button data-n="'+n+'" class="'+(opts.count===n?'on':'')+'">'+(n||'Tümü')+'</button>'; }).join('')+
      '</div><label class="chk"><input type="checkbox" id="shf" '+(opts.shuffle?'checked':'')+'> Soruları karıştır</label></div>'+
      '<div class="foot">Enter ile cevap gönderilir · Sorulardayken üstteki “Ana Menü” tuşuyla çıkabilirsin</div>';
    app.innerHTML = h;
    bindTheme();
    bindPlayer();
    app.querySelectorAll('.subject').forEach(function(b){ b.onclick=function(){
      if(!curP()){ var pc=$('#pcard'); pc.classList.remove('shake'); void pc.offsetWidth; pc.classList.add('shake'); pc.scrollIntoView({block:'center',behavior:'smooth'}); $('#pname').focus({preventScroll:true}); return; }
      start(SUBJECTS[+b.dataset.i]);
    }; });
    app.querySelectorAll('#cnt button').forEach(function(b){ b.onclick=function(){ opts.count=+b.dataset.n; store.set('opts',opts); menu(); }; });
    $('#shf').onchange=function(){ opts.shuffle=this.checked; store.set('opts',opts); };
    window.scrollTo(0,0);
  }

  /* ---------- OYUN ---------- */
  function start(s){
    var qs = s.questions.slice();
    if(s.ordered){ if(opts.shuffle) qs = shuffle(qs); }
    else if(opts.shuffle) qs = shuffle(qs);
    if(opts.count && qs.length>opts.count) qs = qs.slice(0,opts.count);
    G = {s:s, qs:qs, i:0, score:0, log:[]};
    question();
  }
  function maxPts(){ return G.qs.length*10; }

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
    var h = '<div class="bar" style="--sc:'+s.color+'">'+
      '<button class="icon-btn" id="homeBtn">← Ana Menü</button>'+
      '<div class="title"><i></i>'+s.name+'</div><div class="sp"></div>'+
      '<span class="pill">Soru <b>'+(G.i+1)+'</b> / '+G.qs.length+'</span>'+
      '<span class="pill">Puan <b id="pts">'+G.score+'</b></span>'+themeBtn()+'</div>'+
      '<div class="progress" style="--sc:'+s.color+'"><div style="width:'+pct+'%"></div></div>'+
      '<div class="card qcard" id="qc" style="--sc:'+s.color+'">'+
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
    app.innerHTML = h;
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
          // çok alanlıysa boş bir sonraki alana geç
          if(all.length>1){
            for(var j=idx+1;j<all.length;j++){ if(!all[j].disabled && !all[j].value.trim()){ all[j].focus(); return; } }
          }
          submit();
        }
      });
    });
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

  function finish(ok){
    var q=G.qs[G.i];
    G.cur.finished=true;
    var pts = ok ? Math.max(10 - G.cur.wrong*2, 2) : 0;
    G.score += pts; $('#pts').textContent=G.score;
    G.log.push({q:q, ok:ok, pts:pts, wrong:G.cur.wrong});
    app.querySelectorAll('.field input, .field textarea').forEach(function(i){ i.disabled=true; });
    var title = ok ? (G.cur.wrong? 'Doğru! (+'+pts+')' : 'Harika, ilk denemede doğru! (+10)') : 'Cevap';
    var extra = (q.type==='free' && ok) ? '<div class="alt">Bu soru serbest yazım sorusu; değerlendirme ölçütünü aşağıda görebilirsin.</div>' : '';
    $('#fb').innerHTML = '<div class="fb '+(ok?'ok':'bad')+'"><div class="h">'+title+'</div>'+answerText(q)+altText(q)+extra+'</div>';
    $('#chk').style.display='none'; $('#pass').style.display='none'; $('#show').style.display='none';
    var n=$('#next'); n.style.display=''; n.focus({preventScroll:true});
    setTimeout(function(){ var fb=$('#fb'); if(fb && fb.getBoundingClientRect().bottom>window.innerHeight) fb.scrollIntoView({behavior:'smooth',block:'end'}); },50);
  }
  function reveal(){ finish(false); }
  function next(){ if(!G) return; G.i++; if(G.i>=G.qs.length) results(); else question(); }

  /* ---------- SONUÇ ---------- */
  function results(){
    var s=G.s, okc=G.log.filter(function(l){return l.ok;}).length;
    var pct = Math.round(G.score/maxPts()*100);
    var p=curP();
    if(p){
      if(p.best[s.id]==null || pct>p.best[s.id]) p.best[s.id]=pct;
      p.hist[s.id]=[{p:pct, s:G.score, ok:okc, n:G.qs.length, t:Date.now()}].concat(p.hist[s.id]||[]).slice(0,3);
      saveProf();
    }
    var msg = pct>=85?'Çok iyi gidiyorsun!':pct>=60?'Güzel iş, biraz daha tekrarla mükemmel olur.':pct>=35?'Fena değil, yanlışları gözden geçir.':'Konuyu tekrar edip yeniden dene.';
    var h='<div class="bar" style="--sc:'+s.color+'"><button class="icon-btn" id="homeBtn">← Ana Menü</button><div class="title"><i></i>'+s.name+'</div><div class="sp"></div>'+themeBtn()+'</div>'+
      '<div class="card result" style="--sc:'+s.color+'"><div class="big">%'+pct+'</div><div class="sub">'+msg+'</div>'+
      '<div class="stats"><div class="stat"><b>'+okc+'/'+G.qs.length+'</b><span>Doğru</span></div><div class="stat"><b>'+G.score+'</b><span>Puan</span></div>'+
      '<div class="stat"><b>'+G.log.filter(function(l){return l.ok&&!l.wrong;}).length+'</b><span>İlk denemede</span></div></div>'+
      '<div class="actions" style="justify-content:center"><button class="btn primary" id="again">Tekrar oyna</button><button class="btn" id="home2">Ana menü</button></div>'+
      '<div class="review">'+G.log.map(function(l,i){
        var qt = l.q.q.replace(/<br\s*\/?>/g,' ').replace(/<[^>]+>/g,''); qt=trim(qt,140);
        return '<div class="rv"><div class="st '+(l.ok?'ok':'bad')+'">'+(l.ok?'✓':'✗')+'</div><div><div>'+(i+1)+'. '+esc(qt)+'</div><div class="ans">'+esc(trim(answerText(l.q).replace(/<br\s*\/?>/g,' · ').replace(/<[^>]+>/g,'').replace(/&amp;/g,'&'),260))+'</div></div></div>';
      }).join('')+'</div></div>';
    app.innerHTML=h; bindTheme();
    $('#homeBtn').onclick=menu; $('#home2').onclick=menu; $('#again').onclick=function(){ start(s); };
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
