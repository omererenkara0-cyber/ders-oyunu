/* Ders bazlı zayıf konu analizi — saf yardımcılar (DOM'suz, test edilebilir).
   Bir konu, çözülmemiş hatası (w) olduğu sürece "zayıf" sayılır; doğru cevap
   bir hatayı kapatır ve konu tamamlanınca listeden düşer. */
(function(){
  var WEAK_MAX_TOPICS = 4;

  function tkey(sid, topic){ return sid+'::'+(topic||'Genel'); }

  function questionsOf(s){ return s.levels ? s.levels.reduce(function(a,lv){ return a.concat(lv.questions); },[]) : s.questions; }

  /* Çözülmemiş hata sayısı. Eski (w alanı olmayan) kayıtlarda ok/n'den türetilir. */
  function openErrors(t){ return t.w==null ? Math.max((t.n||0)-(t.ok||0),0) : t.w; }

  /* Bir cevabı kayda işler: yanlış hata açar, doğru bir hatayı kapatır. */
  function recordResult(rec, ok){
    rec.w = openErrors(rec);
    rec.n = (rec.n||0)+1;
    if(ok) rec.ok = (rec.ok||0)+1;
    rec.w = Math.max(0, rec.w + (ok?-1:1));
    return rec;
  }

  /* Tek bir dersin zayıf konuları. Anahtar ders kapsamlı olduğu için dersler karışmaz. */
  function weakTopicsFor(tstats, sid){
    var ts=tstats||{}, out=[];
    Object.keys(ts).forEach(function(k){
      if(k.indexOf(sid+'::')!==0) return;
      var t=ts[k], w=openErrors(t); if(w<=0) return;
      out.push({topic:k.slice(sid.length+2), ok:t.ok||0, n:t.n||0, w:w,
        pct:Math.round((t.ok||0)/(t.n||1)*100), last:t.last||0});
    });
    out.sort(function(a,b){ return b.w-a.w || a.pct-b.pct || b.n-a.n || a.last-b.last; });
    return out.slice(0,WEAK_MAX_TOPICS);
  }

  /* Zayıf konuları ders ders gruplar. Her grupta o dersin zayıf konuları ve soru havuzu olur. */
  function weakBySubject(tstats, subjects, allQ){
    return subjects.map(function(s){
      var weak = weakTopicsFor(tstats, s.id); if(!weak.length) return null;
      var names = weak.map(function(w){ return w.topic; });
      var pool = allQ.filter(function(x){ return x.s===s && names.indexOf(x.q.topic||'Genel')>=0; });
      if(!pool.length) return null;
      return {s:s, weak:weak, open:weak.reduce(function(a,w){ return a+w.w; },0), pool:pool};
    }).filter(Boolean);
  }

  /* Eski (yalnızca konu adıyla anahtarlanmış) kayıtları ders kapsamlı anahtara taşır.
     Konu tek bir derse aitse taşınır; birden fazla derse aitse (belirsiz) silinir.
     Değişiklik yapıldıysa true döner. */
  function migrateTstats(tstats, subjects){
    var ts = tstats||{}, moved = {}, changed = false;
    Object.keys(ts).forEach(function(k){
      if(k.indexOf('::')>=0) return;
      var owners = subjects.filter(function(s){
        return questionsOf(s).some(function(q){ return (q.topic||'Genel')===k; });
      });
      if(owners.length===1){ var nk = owners[0].id+'::'+k; if(!ts[nk]) moved[nk]=ts[k]; delete ts[k]; }
      else delete ts[k];
      changed = true;
    });
    Object.keys(moved).forEach(function(k){ ts[k]=moved[k]; });
    return changed;
  }

  window.WEAK = { tkey:tkey, openErrors:openErrors, recordResult:recordResult,
    weakTopicsFor:weakTopicsFor, weakBySubject:weakBySubject, migrateTstats:migrateTstats,
    MAX_TOPICS:WEAK_MAX_TOPICS };
})();
