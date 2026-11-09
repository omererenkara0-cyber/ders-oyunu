/* Ders bazlı zayıf konu analizi — saf yardımcılar (DOM'suz, test edilebilir). */
(function(){
  var WEAK_MIN_N = 2, WEAK_MAX_TOPICS = 4;

  function tkey(sid, topic){ return sid+'::'+(topic||'Genel'); }

  function questionsOf(s){ return s.levels ? s.levels.reduce(function(a,lv){ return a.concat(lv.questions); },[]) : s.questions; }

  /* Tek bir dersin zayıf konuları. Anahtar ders kapsamlı olduğu için dersler karışmaz. */
  function weakTopicsFor(tstats, sid, minN){
    minN = minN==null ? WEAK_MIN_N : minN;
    var ts=tstats||{}, out=[];
    Object.keys(ts).forEach(function(k){
      if(k.indexOf(sid+'::')!==0) return;
      var t=ts[k]; if(t.n<minN) return;
      out.push({topic:k.slice(sid.length+2), ok:t.ok, n:t.n, pct:Math.round(t.ok/t.n*100), last:t.last||0});
    });
    out.sort(function(a,b){ return a.pct-b.pct || b.n-a.n || a.last-b.last; });
    var weak = out.filter(function(x){ return x.pct<100; });
    return weak.length ? weak.slice(0,WEAK_MAX_TOPICS) : out.slice(0,WEAK_MAX_TOPICS);
  }

  /* Zayıf konuları ders ders gruplar. Her grupta o dersin zayıf konuları ve soru havuzu olur. */
  function weakBySubject(tstats, subjects, allQ){
    return subjects.map(function(s){
      var weak = weakTopicsFor(tstats, s.id); if(!weak.length) return null;
      var names = weak.map(function(w){ return w.topic; });
      var pool = allQ.filter(function(x){ return x.s===s && names.indexOf(x.q.topic||'Genel')>=0; });
      if(!pool.length) return null;
      return {s:s, weak:weak, pool:pool};
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

  window.WEAK = { tkey:tkey, weakTopicsFor:weakTopicsFor, weakBySubject:weakBySubject, migrateTstats:migrateTstats,
    MIN_N:WEAK_MIN_N, MAX_TOPICS:WEAK_MAX_TOPICS };
})();
