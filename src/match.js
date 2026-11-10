/* Esnek cevap kontrolü: Türkçe karakter, büyük/küçük harf, yazım hatası ve ek toleransı */
var M = (function(){
  var MAP = {'ı':'i','ş':'s','ğ':'g','ü':'u','ö':'o','ç':'c','â':'a','î':'i','û':'u','é':'e','ë':'e','ä':'a'};
  function lower(s){ return String(s).replace(/İ/g,'i').replace(/I/g,'ı').toLowerCase(); }
  function norm(s){
    s = lower(s).replace(/√/g,' kok ').replace(/²/g,'2').replace(/³/g,'3').replace(/₂/g,'2');
    s = s.replace(/[ışğüöçâîûéëä]/g, function(c){ return MAP[c]; });
    s = s.replace(/['’‘`´"“”]/g,'');
    s = s.replace(/[^a-z0-9]+/g,' ').trim();
    return s;
  }
  function lev(a,b,max){
    if(a===b) return 0;
    var la=a.length, lb=b.length;
    if(Math.abs(la-lb)>max) return max+1;
    var pp=new Array(lb+1), prev=new Array(lb+1), cur=new Array(lb+1), i, j;
    for(j=0;j<=lb;j++) prev[j]=j;
    for(i=1;i<=la;i++){
      cur[0]=i; var best=cur[0];
      for(j=1;j<=lb;j++){
        var c = a.charCodeAt(i-1)===b.charCodeAt(j-1)?0:1;
        cur[j]=Math.min(prev[j]+1,cur[j-1]+1,prev[j-1]+c);
        if(i>1&&j>1&&a[i-1]===b[j-2]&&a[i-2]===b[j-1]) cur[j]=Math.min(cur[j],pp[j-2]+1);
        if(cur[j]<best) best=cur[j];
      }
      if(best>max) return max+1;
      var t=pp; pp=prev; prev=cur; cur=t;
    }
    return prev[lb];
  }
  function thr(len, strict){
    if(strict) return 0;
    if(len<=3) return 0;
    if(len<=6) return 1;
    if(len<=10) return 2;
    return 3;
  }
  /* girdinin içinde hedefe en yakın parçanın uzaklığı */
  function dist(inp, tgt){
    var T = thr(tgt.length) + 2, best = lev(inp,tgt,T);
    var tn = tgt.replace(/ /g,'');
    best = Math.min(best, lev(inp.replace(/ /g,''), tn, T));
    var toks = inp.split(' '), k = tgt.split(' ').length;
    for(var w=Math.max(1,k-1); w<=k+1; w++){
      for(var i=0;i+w<=toks.length;i++){
        var win = toks.slice(i,i+w).join(' ');
        best = Math.min(best, lev(win,tgt,T), lev(win.replace(/ /g,''),tn,T));
        if(tgt.length>=4 && win.length>tgt.length){
          // Türkçe ekler: "mitokondridir" -> "mitokondri"
          if(win.length - tgt.length <= 6){
            best = Math.min(best, lev(win.slice(0,tgt.length),tgt,T));
          }
        }
        if(best===0) return 0;
      }
    }
    return best;
  }
  function nums(raw){
    var s = String(raw).replace(/(\d),(\d)/g,'$1.$2');
    var out=[], re=/(-?\d+(?:\.\d+)?)(?:\s*[\/:]\s*(-?\d+(?:\.\d+)?))?/g, m;
    while((m=re.exec(s))){
      var v=parseFloat(m[1]);
      if(m[2]!==undefined){ var d=parseFloat(m[2]); if(d!==0) out.push(v/d); out.push(v); out.push(d); }
      else out.push(v);
    }
    return out;
  }
  function numMatch(raw, targets, tol){
    targets = [].concat(targets); tol = tol==null?0.02:tol;
    var ns = nums(raw);
    // kesirli cevap bekleniyorsa pay/payda tek başına sayılmasın
    var s = String(raw).replace(/(\d),(\d)/g,'$1.$2');
    var fr = /(-?\d+(?:\.\d+)?)\s*[\/:]\s*(-?\d+(?:\.\d+)?)/g, m, fracs=[], plain=s.replace(fr,function(a,p,q){ fracs.push(parseFloat(p)/parseFloat(q)); return ' '; });
    var cand = fracs.concat(nums(plain).filter(function(x){return true;}));
    for(var i=0;i<cand.length;i++) for(var j=0;j<targets.length;j++){
      var t=targets[j]; if(Math.abs(cand[i]-t) <= Math.max(Math.abs(t)*tol,1e-9)) return true;
    }
    return false;
  }
  function bestOf(inp, list, strict){
    var b={d:99,len:0};
    (list||[]).forEach(function(a){
      var t=norm(a); if(!t) return;
      var d = strict ? (inp.replace(/ /g,'')===t.replace(/ /g,'')?0:99) : dist(inp,t);
      var ok = d<=thr(t.length,strict);
      if(d<b.d || (d===b.d && ok)) b={d:d,len:t.length,ok:ok};
    });
    return b;
  }
  function has(inp, alts){ return bestOf(inp, [].concat(alts)).ok; }
  /* spec: {a, not, num, tol, strict, keys, minKeys, all} */
  function check(raw, spec){
    var inp = norm(raw), rt = String(raw).trim();
    if(!rt) return false;
    if(spec.raw && spec.raw.indexOf(rt)>=0) return true;
    if(spec.minWords && rt.split(/\s+/).length < spec.minWords) return false;
    if(spec.cap && rt.charAt(0)===rt.charAt(0).toLocaleLowerCase('tr')) return false;
    if(spec.exact){
      var e = (spec.a||[]).some(function(a){ return norm(a)===inp; });
      return e;
    }
    if(spec.num!=null && numMatch(raw, spec.num, spec.tol)) return true;
    if(spec.all){
      for(var g=0; g<spec.all.length; g++) if(!has(inp, spec.all[g])) return false;
      return true;
    }
    if(spec.keys){
      var c=0; spec.keys.forEach(function(g){ if(has(inp,g)) c++; });
      if(c >= (spec.minKeys||1)) return true;
    }
    if(spec.a){
      var acc = bestOf(inp, spec.a, spec.strict);
      if(acc.ok){
        if(spec.not){
          var bad = bestOf(inp, spec.not, false);
          if(bad.ok && (bad.d < acc.d || (bad.d===acc.d && bad.len > acc.len))) return false;
        }
        return true;
      }
    }
    return false;
  }
  /* liste tipi: n girdinin her biri farklı bir havuz öğesiyle eşleşmeli */
  function checkList(inputs, pool, ordered){
    var used = {}, res = [];
    inputs.forEach(function(raw, i){
      var hit=-1;
      if(ordered){ if(pool[i] && check(raw,pool[i])) hit=i; }
      else for(var j=0;j<pool.length;j++){ if(!used[j] && check(raw,pool[j])){ hit=j; break; } }
      if(hit>=0) used[hit]=1;
      res.push(hit>=0);
    });
    return res;
  }
  /* Formül cevabı kontrolü: sembol/boşluk/çarpma işareti/ünlem farklarını tolere eder.
     Ör. "v²/r", "v2/r", "V kare / r", "a = v^2 / r" aynı kabul edilir. */
  var FWORD = [['bolu','/'],['kare','2'],['kup','3'],['kok','sqrt'],['carpi','']];
  function fnorm(s){
    s = lower(String(s));
    s = s.replace(/[ışğüöçâîû]/g, function(c){ return MAP[c]; });
    s = s.replace(/π/g,'pi').replace(/θ/g,'theta').replace(/ω/g,'omega').replace(/α/g,'alpha')
         .replace(/τ/g,'tau').replace(/Δ/g,'d').replace(/μ/g,'mu').replace(/λ/g,'lambda');
    s = s.replace(/√/g,'sqrt').replace(/²/g,'2').replace(/³/g,'3').replace(/½/g,'1/2').replace(/¼/g,'1/4');
    s = s.replace(/[·×*∙]/g,'').replace(/\^/g,'').replace(/[−–—]/g,'-');
    FWORD.forEach(function(w){ s = s.split(w[0]).join(w[1]); });
    s = s.replace(/\s+/g,'');
    s = s.replace(/^[a-z]{1,3}=/,'');   /* baştaki "a =" / "v=" atılır */
    s = s.replace(/\.(?=[a-z])/g,'').replace(/([a-z\)])\./g,'$1');
    s = s.replace(/\[|\]/g,'(');
    s = s.replace(/[^a-z0-9\/\(\)\.\-\+]/g,'');
    return s;
  }
  /* Çarpma sırası ve parantez farkını yok sayan imza: her pay/payda içindeki
     karakterler sıralanır. Ör. "m·v²/r" ≡ "v²·m/r", ama "v²/r" ≠ "r/v²". */
  function fsig(s){ s=s.replace(/[\(\)]/g,''); return s.split('/').map(function(p){ return p.split('').sort().join(''); }).join('/'); }
  function formula(raw, spec){
    var inp = fnorm(raw); if(!inp) return false;
    var si = fsig(inp), cands = [].concat(spec.a||[]);
    for(var i=0;i<cands.length;i++){
      var c = fnorm(cands[i]); if(!c) continue;
      if(inp===c || fsig(c)===si) return true;
    }
    if(spec.num!=null && numMatch(raw, spec.num, spec.tol)) return true;
    return false;
  }
  return {norm:norm, lev:lev, check:check, checkList:checkList, nums:nums, numMatch:numMatch, dist:dist, fnorm:fnorm, fsig:fsig, formula:formula};
})();
if(typeof module!=='undefined') module.exports=M;
