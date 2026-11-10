/* Formül sınavı — sorular doğrudan formül kağıdından (FORMULS) üretilir.
   Kağıttaki her bağıntı satırı tek bir soruya dönüşür: "<etiket> bağıntısını yazınız."
   Cevap anahtarı = satırın sağ tarafı; yazım/sembol toleransı M.formula ile sağlanır. */
var FORMUL_SORU = (function(){
  /* büyüklük açıklamaları (ipuçlarında kullanılır) */
  var OV = {
    'T':'periyot','f':'frekans','ω':'açısal hız','v':'çizgisel hız','r':'yarıçap','a':'ivme',
    'F':'kuvvet','m':'kütle','k':'sürtünme katsayısı','g':'yer çekimi ivmesi','θ':'eğim açısı',
    'α':'açısal ivme','τ':'tork','I':'eylemsizlik momenti','L':'açısal momentum','M':'gezegen kütlesi',
    'R':'gezegen yarıçapı','h':'yükseklik','d':'uzaklık','G':'çekim sabiti','N':'normal kuvvet',
    'W':'ağırlık','n':'tur sayısı','t':'zaman','E':'enerji',
    'f_s':'sürtünme kuvveti','v_max':'en büyük hız','v_min':'en küçük hız','ω_min':'en küçük açısal hız',
    'v_k':'kurtulma hızı','v_üst':'tepedeki hız','v_alt':'dipteki hız','T_üst':'tepedeki ip gerilmesi',
    'T_alt':'dipteki ip gerilmesi','T_orta':'ortadaki ip gerilmesi','g′':'yükseklikteki yer çekimi ivmesi',
    'E_pot':'potansiyel enerji','E_kin':'kinetik enerji','E_dönme':'dönme kinetik enerjisi',
    'I_merkez':'merkez eksenine göre eylemsizlik momenti','v_alt,min':'en küçük dip hızı'
  };
  var FUNC = {sin:1,cos:1,tan:1,cot:1,sqrt:1,pi:1,log:1,ln:1};

  function uniq(a){ var out=[], seen={}; a.forEach(function(x){ x=String(x).trim(); if(x && !seen[x]){ seen[x]=1; out.push(x); } }); return out; }
  function rightOf(eq){ var i=String(eq).indexOf('='); return i<0? String(eq).trim() : String(eq).slice(i+1).trim(); }
  function leftOf(eq){ return String(eq).split('=')[0].trim(); }

  /* üst düzey ayırıcı: parantez içini atlar; "," için ondalık virgülü (6,67) korur */
  function topSplit(s, sep){
    var out=[], depth=0, buf='';
    for(var i=0;i<s.length;i++){
      var c=s[i];
      if(c==='(') depth++;
      else if(c===')') depth=Math.max(0,depth-1);
      var dec = (sep===',' && /\d/.test(s[i-1]||'') && /\d/.test(s[i+1]||''));
      if(depth===0 && !dec && s.substr(i,sep.length)===sep){ out.push(buf); buf=''; i+=sep.length-1; continue; }
      buf+=c;
    }
    out.push(buf);
    return out;
  }
  /* sondaki üst düzey parantez grubunu ("... (açıklama)") atar */
  function stripTrailingParen(s){
    s=s.trim(); if(s.charAt(s.length-1)!==')') return s;
    var depth=0, i;
    for(i=s.length-1;i>=0;i--){
      if(s[i]===')') depth++;
      else if(s[i]==='('){ depth--; if(depth===0) break; }
    }
    if(i<=0) return s;
    return s.slice(0,i).trim();
  }
  function balanced(s){ var d=0; for(var i=0;i<s.length;i++){ if(s[i]==='(')d++; else if(s[i]===')')d--; if(d<0) return false; } return d===0; }
  function meaningful(p){
    p=String(p).trim();
    if(!p) return false;
    var alnum = p.replace(/[^A-Za-z0-9α-ωΑ-Ω]/g,'');
    if(alnum.length<2) return false;                 /* tek harf/sayı */
    if(!balanced(p)) return false;                    /* dengesiz parantez */
    if(/^[·*\/]/.test(p)) return false;               /* baştaki çarpma/bölme */
    if(/[·*\/+−\-]$/.test(p)) return false;           /* sondaki işleç */
    if(/√\s*$/.test(p)) return false;                 /* kökün içi eksik ("2π·√") */
    return true;
  }
  /* kabul edilen cevap yazımları: sol taraf, sağ taraf, sondaki açıklama/≈ atılmış
     hâlleri ve eşitliğin sağ tarafındaki tüm alternatifler (tek harf ve bozuk
     parçalar elenir). */
  function answerForms(eq){
    var rhs = rightOf(eq), forms=[];
    function add(s){ s=String(s||'').trim(); if(s) forms.push(s); }
    add(eq);                /* tam eşitliğin kendisi de kabul edilir */
    add(rhs);
    var lf = leftOf(eq);
    if(/[\/·*+−²³√]/.test(lf)) add(lf);   /* "T²/r³ = …" gibi adlandırılmış bağıntılarda sol taraf */
    add(stripTrailingParen(rhs));
    add(rhs.replace(/\s*≈.*$/,''));
    add(stripTrailingParen(rhs.replace(/\s*≈.*$/,'')));
    topSplit(rhs, ',').forEach(function(piece){
      piece=piece.trim(); if(!piece) return;
      var eqParts = topSplit(piece,' = ');
      eqParts.forEach(function(x){ if(x.indexOf('√')<0 || x.replace(/[^A-Za-zα-ωΑ-Ω0-9]/g,'').length>=2) add(x); });
    });
    return uniq(forms.filter(meaningful));
  }
  function varsOf(eq){
    var out=[], re=/([A-Za-z_][A-Za-z0-9_′]*|[α-ωΑ-Ω])/g, m;
    while((m=re.exec(eq))){
      var w=m[1];
      if(FUNC[w.toLowerCase()]) continue;
      if(out.indexOf(w)<0) out.push(w);
    }
    return out;
  }
  function stripNo(h){ return String(h).replace(/^\s*\d+\.\s*/,'').trim(); }
  /* etiketten birim parantezini ("(T, s)") atar; açıklayıcı parantezleri korur */
  function descriptor(label){ return String(label).trim().replace(/\s*\([^)]*,[^)]*\)\s*$/,'').trim(); }

  function buildQuestion(sec, row, idx){
    var eq = String(row[1]);
    var d = descriptor(row[0]);
    var q = /bağıntı/i.test(d) ? d + 'nı yazınız.' : d + ' bağıntısını yazınız.';
    var vars = varsOf(eq).map(function(x){ return OV[x] || x; });
    return {
      id:'fs'+idx,
      topic:stripNo(sec.h),
      formula:true,
      q: q,
      a: answerForms(eq),
      hints: [
        'Formülde geçen büyüklükler: ' + vars.join(', ') + '.',
        'Bağıntı, formül kağıdındaki “' + stripNo(sec.h) + '” bölümündedir.'
      ],
      sol: eq
    };
  }
  function build(secs){
    var out=[], i=0;
    (secs||[]).forEach(function(sec){
      (sec.rows||[]).forEach(function(row){
        if(!Array.isArray(row) || row.length<2) return;
        if(String(row[1]).indexOf('=')<0) return;
        out.push(buildQuestion(sec, row, ++i));
      });
    });
    return out;
  }
  return { build:build, _answerForms:answerForms, _descriptor:descriptor };
})();
window.FORMUL_SORU = FORMUL_SORU;
if(typeof module!=='undefined') module.exports = FORMUL_SORU;
