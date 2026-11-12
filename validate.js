/* TYT soru bankası doğrulayıcı. Tüm soruları yükler ve tutarlılığı denetler. */
const fs=require('fs'),vm=require('vm');
const ctx={window:{},console};vm.createContext(ctx);
const FILES=['match.js','svg.js','data/tyt-turkce.js','data/tyt-matematik.js','data/tyt-geometri.js','data/tyt-fizik.js','data/tyt-kimya.js','data/tyt-biyoloji.js','data/tyt-tarih.js','data/tyt-cografya.js','data/tyt-felsefe.js','data/tyt-din.js','data/tyt-deneme.js','data/tyt-denemeler.js','data/subjects.js','weak.js','anim.js'];
for(const f of FILES)
  vm.runInContext(fs.readFileSync('src/'+f,'utf8').replace(/^var (\w+)/gm,'globalThis.$1'),ctx);
let bad=0;
const fail=(...a)=>{bad++;console.log('FAIL',...a);};

/* 1) Her soru biçimsel olarak geçerli mi? */
const seen=new Set();
let total=0, withImg=0, mcCount=0, openCount=0;
const OPEN_TYPES=new Set(['parts','list','free']);
for(const S of ctx.SUBJECTS){
  if(!S.id||!S.name||!S.levels) fail('ders alanları eksik',S.id);
  S.levels.forEach(lv=>{
    if(!lv.id||!lv.name||!Array.isArray(lv.questions)) fail('seviye alanları eksik',S.id,lv.id);
    lv.questions.forEach((q,i)=>{
      total++;
      const tag=S.id+':'+lv.id+'#'+(i+1);
      if(typeof q.q!=='string'||q.q.trim().length<8) fail('soru metni kısa',tag);
      if(!q.topic||typeof q.topic!=='string') fail('konu yok',tag);
      if(!Array.isArray(q.hints)||q.hints.length<1) fail('ipucu yok',tag);
      if(!q.exp||typeof q.exp!=='string') fail('açıklama yok',tag);
      const isMc = q.type==='mc' || (!q.type && Array.isArray(q.options));
      if(isMc){
        mcCount++;
        if(!Array.isArray(q.options)||q.options.length!==5) fail('şık sayısı 5 değil',tag,q.options&&q.options.length);
        if(q.options&&new Set(q.options).size!==q.options.length) fail('şık tekrarı',tag);
        if(!Number.isInteger(q.answer)||q.answer<0||q.answer>4) fail('cevap indeksi geçersiz',tag,q.answer);
      } else {
        openCount++;
        if(q.type && !OPEN_TYPES.has(q.type)) fail('bilinmeyen soru tipi',tag,q.type);
        const hasSpec = q.a || q.num!=null || q.all || q.keys || q.type==='parts' || q.type==='list' || q.type==='free';
        if(!hasSpec) fail('cevap ölçütü yok (a/num/all/keys/type)',tag);
        if(q.a && !Array.isArray(q.a)) fail('a dizisi değil',tag);
        if(q.all && (!Array.isArray(q.all)||!q.all.every(g=>Array.isArray(g)))) fail('all biçimi geçersiz',tag);
      }
      if(q.svg){ withImg++; if(!/^<svg[\s\S]*<\/svg>$/.test(q.svg)||q.svg.indexOf('undefined')!==-1) fail('svg geçersiz',tag); }
      const key=q.q.slice(0,60);
      if(seen.has(key)) fail('soru tekrarı',tag,q.q.slice(0,40));
      seen.add(key);
    });
  });
}
console.log('Toplam',total,'soru ·',mcCount,'çoktan seçmeli ·',openCount,'açık uçlu ·',withImg,'çizimli');
if(total<80) fail('soru sayısı çok az',total);

/* 2) Ders bazlı özet */
for(const S of ctx.SUBJECTS){
  const c=S.levels.reduce((a,lv)=>a+lv.questions.length,0);
  console.log(' -',S.name.padEnd(16),c,'soru');
}

/* 3) Deneme sınavları tutarlı mı? */
const DL=ctx.window.TYT_DENEMELER;
const ids=new Set(ctx.SUBJECTS.map(s=>s.id));
/* Ders başına çoktan seçmeli (denemeye uygun) soru sayısı. */
const mcCap={};
for(const S of ctx.SUBJECTS){
  let c=0; S.levels.forEach(lv=>lv.questions.forEach(q=>{ if(q.type==='mc'||(!q.type&&q.options)) c++; }));
  mcCap[S.id]=c;
}
if(!Array.isArray(DL)||!DL.length) fail('deneme listesi yok');
else{
  const dids=new Set();
  DL.forEach(D=>{
    const tag='deneme:'+(D&&D.id);
    if(!D.id||dids.has(D.id)) fail('deneme id eksik/tekrar',tag); dids.add(D.id);
    if(!D.name||typeof D.name!=='string') fail('deneme adı yok',tag);
    if(typeof D.minutes!=='number'||D.minutes<=0) fail('deneme süresi geçersiz',tag);
    if(typeof D.seed!=='number') fail('deneme tohumu yok',tag);
    if(!Array.isArray(D.dist)||!D.dist.length){ fail('deneme dağılımı yok',tag); return; }
    let sum=0, eff=0;
    D.dist.forEach(d=>{
      sum+=d.n;
      if(!ids.has(d.id)) fail('deneme ders yok',tag,d.id);
      if(!(d.n>0)) fail('deneme soru sayısı geçersiz',tag,d.id);
      if((mcCap[d.id]||0)<=0) fail('denemede o dersin sorusu yok',tag,d.id);
      eff += Math.min(d.n, mcCap[d.id]||0);
    });
    if(sum!==120) fail('deneme toplam dağılımı 120 değil',tag,sum);
    if(eff<1) fail('deneme hiç soru üretmiyor',tag);
    console.log(' -',D.name.padEnd(32),eff,'soru ·',D.minutes,'dk (dağılım toplamı '+sum+')');
  });
  console.log(' Deneme sayısı:',DL.length);
}

/* 4) weak.js: ders bazlı ayrım */
const WK=ctx.window.WEAK;
const allQ=[]; for(const S of ctx.SUBJECTS) S.levels.forEach(lv=>lv.questions.forEach(q=>allQ.push({q,s:S})));
const WTEST=(name,cond)=>{ if(!cond) fail('weak',name); };
const ts1={"turkce::Paragraf":{ok:0,n:3},"din::İslam ve İbadet":{ok:0,n:3},"fizik::Hareket":{ok:0,n:3}};
const g1=WK.weakBySubject(ts1,ctx.SUBJECTS,allQ);
WTEST('3 ders grubu',g1.length===3);
WTEST('her grup tek ders',g1.every(g=>g.pool.every(x=>x.s===g.s)));
WTEST('openErrors eski kayıt',WK.openErrors({ok:1,n:3})===2);
const rec=WK.recordResult({},false); WTEST('yanlış w=1',rec.w===1);
WK.recordResult(rec,true); WTEST('doğru w=0',rec.w===0);
WTEST('tamamlanan konu gruptan düşer',WK.weakBySubject({"din::X":{ok:5,n:5,w:0}},ctx.SUBJECTS,allQ).length===0);

/* 5) anim.js saf parça */
const AN=ctx.ANIM;
const seq=(v)=>{let i=0;return()=>v[i++%v.length];};
const specs=AN.confettiSpecs(6,seq([0,0.5,0.25,0.75,0.1,0.9,0.3,0.6,0.2,0.8,0.4,0.7]));
WTEST('konfeti adedi',specs.length===6);
WTEST('konfeti geçerli',specs.every(p=>p.left>=0&&p.left<=100&&p.dur>=900&&p.dur<=1600&&/^#[0-9a-f]{6}$/i.test(p.color)));

console.log(bad?bad+' PROBLEM':'tüm kontroller geçti');
process.exit(bad?1:0);
