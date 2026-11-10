const fs=require('fs'),vm=require('vm');
const ctx={window:{},console};vm.createContext(ctx);
for(const f of ['match.js','svg.js','data/formul-svg.js','data/biyoloji.js','data/biyoloji-zor.js','data/fizik.js','data/fizik-zor.js','data/inkilap.js','data/din.js','data/edebiyat.js','data/formuller.js','data/formul-soru.js','data/subjects.js','weak.js','anim.js'])
  vm.runInContext(fs.readFileSync('src/'+f,'utf8').replace(/^var (\w+)/gm,'globalThis.$1'),ctx);
const M=ctx.M; let bad=0;
const firstOf=s=> s.num!=null? String(s.num) : s.a? s.a[0] : s.all? s.all.map(g=>g[0]).join(' ') : s.keys? s.keys[0][0] : null;
const LISTS=[]; for(const S of ctx.SUBJECTS){ LISTS.push({id:S.id, questions:S.questions}); if(S.levels) S.levels.forEach(lv=>LISTS.push({id:S.id+':'+lv.id, questions:lv.questions})); }
for(const S of LISTS){
  let img=S.questions.filter(q=>q.svg).length;
  console.log(S.id, S.questions.length,'soru,',img,'çizimli');
  S.questions.forEach((q,i)=>{
    const tag=S.id+'#'+(i+1);
    const specs = q.type==='parts'? q.parts : q.type==='list'? q.pool.concat(q.extra||[]) : q.type==='free'? [] : [q];
    specs.forEach(s=>{ let v=firstOf(s); if(s.minWords) v=v+' kelimesi burada geçiyor ve cümle uzun'; if(v==null||!M.check(v,s)){bad++;console.log('FAIL self',tag,v);} 
      (s.a||[]).forEach(a=>{ let v2=s.minWords? a+' bir iki üç dört beş':a; if(!M.check(v2,s)){bad++;console.log('FAIL alt',tag,a);} });
      (s.not||[]).forEach(n=>{ if(M.check(n,s)){bad++;console.log('FAIL not accepted',tag,n);} }); });
    if(!q.hints||!q.hints.length) console.log('no hints',tag);
  });
}
// tipik yanlışlar
const T=(sid,i,inp,exp)=>{const qs=LISTS.find(s=>s.id===sid).questions; const q=typeof i==='string'? qs.find(x=>x.q.includes(i)) : qs[i-1]; const g=M.check(inp,q); if(g!==exp){bad++;console.log('FAIL case',sid,i,inp,g);}};
T('biyoloji',9,'riboz',false); T('biyoloji',11,'deoksiriboz',false); T('biyoloji',15,'TACGCT',false);
T('fizik',1,'4',false); T('fizik','Buz patencisi','azalır',false); T('fizik','Buz patencisi','kollarını kapatınca artar',true); T('fizik','(m ve r cinsinden)','5mr2',false); T('biyoloji','yeni nükleotitleri','RNA polimeraz',false); T('biyoloji','yeni nükleotitleri','DNA polimeraz',true); T('fizik','yönü sürekli','açısal hız',false); T('fizik','Kepler’in birinci','çember',false);
T('inkilap',10,'erzurum kongresi',false); T('inkilap',10,'sivas kongresi',true); T('inkilap',1,'kanunu esasi',true);
T('din',3,'farabi',false); T('din',1,'insanın aklına hitap eder',true);
// zor seviye (biyoloji)
T('biyoloji:zor',1,'TACGGU',false); T('biyoloji:zor',1,'UACGGU',true); T('biyoloji:zor',1,'UACGGT',false);
T('biyoloji:zor',2,'tek bant ara',true); T('biyoloji:zor',2,'iki bant',false);
T('biyoloji:zor','eşlenme süresi prokaryottakine','kısalır',true); T('biyoloji:zor','eşlenme süresi prokaryottakine','uzar',false);
T('biyoloji:zor','5′ ucu ile','3',true); T('biyoloji:zor','5′ ucu ile','5',false);
T('biyoloji:zor','kalıp DNA zincirinden sentezlenen mRNA','uacggu',true);
T('biyoloji:zor','üst zinciri AATGCG','TTACGC',true); T('biyoloji:zor','üst zinciri AATGCG','AATGCG',false);
// biyoloji zor: yeni sorular (enzim/Okazaki/prokaryot/DNA-RNA/RNA oranı/kodon)
const TP=(sid,qsub,label,inp,exp)=>{const qs=LISTS.find(s=>s.id===sid).questions; const q=qs.find(x=>x.q.includes(qsub)); if(!q||!q.parts){bad++;console.log('FAIL part missing',sid,qsub);return;} const p=q.parts.find(x=>(x.label||'').includes(label)); if(!p){bad++;console.log('FAIL part label',sid,label);return;} const g=M.check(inp,p); if(g!==exp){bad++;console.log('FAIL part case',sid,label,inp,g);}};
TP('biyoloji:zor','A, B, C ve D ile gösterilen','A (','helikaz',true);
TP('biyoloji:zor','A, B, C ve D ile gösterilen','C (','ligaz',true);
TP('biyoloji:zor','A, B, C ve D ile gösterilen','B (','polimeraz',true);
TP('biyoloji:zor','A, B, C ve D ile gösterilen','D (','okazaki',true);
TP('biyoloji:zor','A, B, C ve D ile gösterilen','A (','ligaz',false);
TP('biyoloji:zor','DNA ve RNA moleküllerini karşılaştırarak','Şeker','deoksiriboz',true);
TP('biyoloji:zor','DNA ve RNA moleküllerini karşılaştırarak','Baz','urasil',true);
TP('biyoloji:zor','DNA ve RNA moleküllerini karşılaştırarak','Zincir','çift',true);
TP('biyoloji:zor','RNA tiplerinin oranları','En fazla','rrna',true);
TP('biyoloji:zor','RNA tiplerinin oranları','En az','mrna',true);
TP('biyoloji:zor','RNA tiplerinin oranları','görevi','ribozom',true);
TP('biyoloji:zor','kısaltılmış kodon tablosu','1. amino','metiyonin',true);
TP('biyoloji:zor','kısaltılmış kodon tablosu','3. amino','glisin',true);
TP('biyoloji:zor','iki kez eşlenen (2 eşlenme)','Toplam','4',true);
TP('biyoloji:zor','iki kez eşlenen (2 eşlenme)','Hibrit','2',true);
TP('biyoloji:zor','iki kez eşlenen (2 eşlenme)','hafif','2',true);
T('biyoloji:zor','Okazaki parçalarının oluşmasına','polimeraz yalnızca 5\' yönünde sentez yapar, çataldan uzaklaşan zincirde kesintili parçalar oluşur',true);
T('biyoloji:zor','prokaryot ve ökaryot DNA replikasyonunu','ökaryotta birden fazla orijin ve çekirdekte hızlı gerçekleşir',true);
T('biyoloji:zor','Griffith deneyinde','protein ve rna parçalandı, dna parçalandığında aktarım durdu',true);
T('biyoloji:zor','600 nükleotitlik tek zincirli','4800',true);
T('biyoloji:zor','600 nükleotitlik tek zincirli','1200',false);
T('biyoloji:zor','60 amino asitlik bir polipeptidin','186',true);
T('biyoloji:zor','60 amino asitlik bir polipeptidin','180',false);
T('biyoloji:zor','kalıp DNA zincirinden sentezlenen mRNA’daki toplam baz','eşit',true);
// fizik zor seviye
T('fizik:zor','Kayışla birbirine bağlı','5',true); T('fizik:zor','Kayışla birbirine bağlı','45',false);
T('fizik:zor','konik sarkaç','0,8',true); T('fizik:zor','konik sarkaç','1,25',false);
T('fizik:zor','yuvarlanan bir silindirin','3/2',true); T('fizik:zor','yuvarlanan bir silindirin','1',false);
T('fizik:zor','çubuğa, dönme ekseninden','6',true); T('fizik:zor','çubuğa, dönme ekseninden','3',false);
T('fizik:zor','ikinci bir disk düşüyor','12',true); T('fizik:zor','ikinci bir disk düşüyor','8',false);
T('fizik:zor','T_Y / T_X oranı','8',true); T('fizik:zor','T_Y / T_X oranı','2',false);
T('fizik:zor','kaçış hızı bunun','kök 2',true); T('fizik:zor','kaçış hızı bunun','2',false);
T('fizik:zor','0–8 s arasında toplam','60',true); T('fizik:zor','0–8 s arasında toplam','40',false);
T('fizik:zor','özkütlesi kaç','3',true); T('fizik:zor','özkütlesi kaç','30',false);
T('fizik:zor','basınçların oranı','2',true); T('fizik:zor','basınçların oranı','1',false);
T('fizik:zor','denge sıcaklığı','44',true); T('fizik:zor','denge sıcaklığı','50',false);
T('fizik:zor','Kayığın yere','13',true); T('fizik:zor','Kayığın yere','7',false);
T('fizik:zor','esneklik potansiyel enerjisi','4',true); T('fizik:zor','esneklik potansiyel enerjisi','8',false);
T('fizik:zor','birlikte hareket ediyor','1,2',true); T('fizik:zor','birlikte hareket ediyor','6/5',true); T('fizik:zor','birlikte hareket ediyor','5',false);
T('fizik:zor','45 m yükseklikten','30',true); T('fizik:zor','45 m yükseklikten','90',false);
T('fizik:zor','en az hangi yükseklikten','2,5',true); T('fizik:zor','en az hangi yükseklikten','5/2',true); T('fizik:zor','en az hangi yükseklikten','1,5',false);
T('fizik:zor','en alt noktasından 5 m/s','30',true); T('fizik:zor','en alt noktasından 5 m/s','20',false);
T('fizik:zor','virajı kaymadan dönebilecek en büyük hız','10',true); T('fizik:zor','virajı kaymadan dönebilecek en büyük hız','100',false);
// zayıf konu analizi: ders bazlı ayrım (src/weak.js)
const WK=ctx.window.WEAK;
const allQ=[]; for(const S of ctx.SUBJECTS){ const qs=S.levels?S.levels.reduce((a,lv)=>a.concat(lv.questions),[]):S.questions; qs.forEach(q=>allQ.push({q,s:S})); }
const WTEST=(name,cond)=>{ if(!cond){bad++;console.log('FAIL weak',name);} };
// 1) Dersler ayrı gruplanır; "Genel" konusu din/edebiyat/inkilap arasında karışmaz
const ts1={"biyoloji::Nükleotit":{ok:0,n:3},"din::Genel":{ok:0,n:3},"edebiyat::Genel":{ok:0,n:3},"fizik::Hareket":{ok:0,n:3}};
const g1=WK.weakBySubject(ts1,ctx.SUBJECTS,allQ);
WTEST('grup sayısı 4', g1.length===4);
WTEST('her grup tek ders', g1.every(g=>g.pool.every(x=>x.s===g.s)));
const ede=g1.find(g=>g.s.id==='edebiyat'); WTEST('edebiyat havuzu sadece edebiyat', ede && ede.pool.length===15 && ede.pool.every(x=>x.s.id==='edebiyat'));
const din=g1.find(g=>g.s.id==='din'); WTEST('din havuzu sadece din', din && din.pool.length===10);
const bio=g1.find(g=>g.s.id==='biyoloji'); WTEST('biyoloji havuzu sadece biyoloji', bio && bio.pool.every(x=>x.s.id==='biyoloji'));
// 2) weakTopicsFor ders dışı anahtarları yok sayar
WTEST('weakTopicsFor din 1 konu', WK.weakTopicsFor(ts1,'din').length===1);
WTEST('weakTopicsFor fizik 1 konu', WK.weakTopicsFor(ts1,'fizik').length===1);
WTEST('weakTopicsFor edebiyat sadece Genel', WK.weakTopicsFor(ts1,'edebiyat')[0].topic==='Genel');
// 3) Aynı adlı konu farklı derslerde bağımsız puanlanır
const ts2={"biyoloji::Ortak":{ok:0,n:5,w:5},"fizik::Ortak":{ok:5,n:5,w:0}};
WTEST('biyoloji::Ortak %0', WK.weakTopicsFor(ts2,'biyoloji')[0].pct===0);
// 4) Çözülmemiş hatası olmayan konu (yani %100) zayıf listesine girmez
WTEST('fizik::Ortak %100 zayıf sayılmaz (boş liste)', WK.weakTopicsFor(ts2,'fizik').length===0);
// 5) Tek yanlış bile konuyu zayıf yapar (min-N eşiği yok)
WTEST('tek yanlış zayıf yapar', WK.weakTopicsFor({"din::X":{ok:0,n:1,w:1}},'din').length===1);
// 6) openErrors eski (w'siz) kayıtları ok/n'den türetir
WTEST('openErrors eski kayıt', WK.openErrors({ok:1,n:3})===2);
WTEST('openErrors yeni kayıt', WK.openErrors({ok:1,n:3,w:0})===0);
// 7) recordResult: yanlış hata açar, doğru hatayı kapatır; hepsi kapanınca liste boşalır
const rec=WK.recordResult({},false); WTEST('yanlış sonrası w=1', rec.w===1 && WK.weakTopicsFor({'din::K':rec},'din').length===1);
WK.recordResult(rec,true); WTEST('doğru sonrası w=0', rec.w===0 && WK.weakTopicsFor({'din::K':rec},'din').length===0);
WK.recordResult(rec,true); WTEST('w sıfırın altına inmez', rec.w===0);
WK.recordResult(rec,false); WTEST('yeni yanlış yeniden açar', rec.w===1 && WK.weakTopicsFor({'din::K':rec},'din').length===1);
// 8) Zayıf konular tamamlanınca ders grubu menüden kaybolur (0 konu)
const tsC={"inkilap::Genel":{ok:10,n:10,w:0}};
WTEST('tamamlanan konu grubu yok', WK.weakBySubject(tsC,ctx.SUBJECTS,allQ).length===0);
const tsD={"inkilap::Genel":{ok:0,n:10,w:2}};
WTEST('açık hata olan konu grubu var', WK.weakBySubject(tsD,ctx.SUBJECTS,allQ).length===1);
// 9) Migrasyon: tek sahip taşınır, çok sahip silinir, :: olan korunur
const ts3={"Nükleik asitlerin keşfi":{ok:0,n:2},"Hareket":{ok:1,n:2},"Genel":{ok:2,n:2},"Düzgün çembersel hareket":{ok:1,n:2},"fizik::Hareket":{ok:9,n:9}};
WK.migrateTstats(ts3,ctx.SUBJECTS);
WTEST('tek sahip biyolojiye taşındı', !!ts3['biyoloji::Nükleik asitlerin keşfi'] && !ts3['Nükleik asitlerin keşfi']);
WTEST('çok sahipli Genel silindi', !ts3['Genel']);
WTEST('çok sahipli (kolay+zor) silindi', !ts3['Düzgün çembersel hareket']);
WTEST('mevcut kapsamlı anahtar korundu', ts3['fizik::Hareket'].ok===9 && !ts3['Hareket']);
// animasyon: konfeti spec üretimi (saf)
const AN=ctx.ANIM;
const seq=(vals)=>{let i=0;return()=>vals[i++%vals.length];};
const specs=AN.confettiSpecs(5, seq([0.0,0.5,0.25,0.75,0.1,0.9,0.3,0.6,0.2,0.8]));
WTEST('konfeti adedi', specs.length===5);
WTEST('konfeti left 0-100', specs.every(p=>p.left>=0&&p.left<=100));
WTEST('konfeti süre aralığı', specs.every(p=>p.dur>=900&&p.dur<=1600));
WTEST('konfeti boyut aralığı', specs.every(p=>p.size>=6&&p.size<=13));
WTEST('konfeti geçerli renk', specs.every(p=>/^#[0-9a-f]{6}$/i.test(p.color)));
WTEST('konfeti round bool', specs.every(p=>typeof p.round==='boolean'));
WTEST('konfeti n=0 boş', AN.confettiSpecs(0, seq([0.5])).length===0);
// formül kağıdı: fizik için dolu ve biçimli
const FM=ctx.FORMULS||{};
WTEST('fizik formülleri var', Array.isArray(FM.fizik) && FM.fizik.length>=8);
let fBad=0, fRows=0;
(FM.fizik||[]).forEach(sec=>{ if(!sec.h || !Array.isArray(sec.rows) || !sec.rows.length) fBad++;
  sec.rows.forEach(r=>{ fRows++; if(!Array.isArray(r) || r.length!==2 || !String(r[0]).trim() || !String(r[1]).trim()) fBad++; }); });
WTEST('formül bölümleri biçimli', fBad===0);
WTEST('formül satır sayısı yeterli', fRows>=30);
WTEST('her formül bölümünde başlık var', (FM.fizik||[]).every(s=>typeof s.h==='string' && s.h.length>0));
// formül çizimleri: tanımlı her fig FSVG'de üretilebilmeli
const FSV=ctx.FSVG||{};
let figBad=0, figN=0;
(FM.fizik||[]).forEach(s=>{ if(!s.fig) return; figN++;
  const fn=FSV[s.fig];
  if(typeof fn!=='function'){ figBad++; console.log('FAIL fig missing', s.fig); return; }
  let out=''; try{ out=fn(); }catch(e){ figBad++; console.log('FAIL fig threw', s.fig, e.message); return; }
  if(!/^<svg[\s\S]*<\/svg>$/.test(out) || out.indexOf('NaN')!==-1 || out.indexOf('undefined')!==-1){ figBad++; console.log('FAIL fig bad', s.fig); }
});
WTEST('her bölüm için çizim var', figN===(FM.fizik||[]).length);
WTEST('çizimler geçerli SVG üretiyor', figBad===0);

// formül sınavı soruları
const FS=ctx.FORMUL_SORU||[];
WTEST('formül sınavı soruları var', FS.length>=25);
let fsBad=0, fsFig=0;
FS.forEach((q,i)=>{
  if(!q.q || typeof q.q!=='string') { fsBad++; console.log('FAIL soru metni', i); }
  const hasAns = q.formula ? (Array.isArray(q.a)&&q.a.length) : (q.num!=null || (Array.isArray(q.a)&&q.a.length));
  if(!hasAns) { fsBad++; console.log('FAIL cevap yok', i, q.q); }
  if(!Array.isArray(q.hints) || !q.hints.length) { fsBad++; console.log('FAIL ipucu yok', i); }
  if(q.fig){ fsFig++; if(typeof FSV[q.fig]!=='function'){ fsBad++; console.log('FAIL fig yok', q.fig); } }
});
WTEST('formül soruları biçimli', fsBad===0);
WTEST('formül sorularında çizim kullanılıyor', fsFig>=8);
// her formül sorusu en az bir ipucu ile yanlışta yol gösterir; doğru cevap kabul ediliyor mu?
let fsAnsBad=0;
FS.forEach((q,i)=>{
  if(q.formula){ if(!M.formula(q.a[0], {a:q.a})) { fsAnsBad++; console.log('FAIL formula self-check', i, q.q); } }
  else if(q.num!=null){ if(!M.check(String(q.num).replace('.',','), {num:q.num, a:q.a})) { fsAnsBad++; console.log('FAIL num self-check', i, q.q); } }
  else if(q.a && q.a.length){ if(!M.check(q.a[0], {a:q.a, not:q.not})) { fsAnsBad++; console.log('FAIL a self-check', i, q.q); } }
});
WTEST('formül sorularının cevap anahtarı kendini doğruluyor', fsAnsBad===0);
// yanlış cevaplar reddedilmeli (aşırı tolerans olmasın) ve 'not' seçenekleri kabul edilmemeli
let fsNegBad=0;
FS.forEach((q,i)=>{
  const wrong = (q.num!=null) ? String((q.num===0? 1 : 0)).replace('.',',') : 'zzzz';
  let accepted;
  if(q.formula) accepted = M.formula(wrong, {a:q.a, num:q.num});
  else if(q.num!=null) accepted = M.check(wrong, {num:q.num, a:q.a, tol:q.tol});
  else accepted = M.check(wrong, {a:q.a, not:q.not});
  if(accepted){ fsNegBad++; console.log('FAIL yanlış kabul edildi', i, q.q, '=>', wrong); }
  (q.not||[]).forEach(n=>{ if(M.check(n, {a:q.a, not:q.not})){ fsNegBad++; console.log('FAIL not kabul edildi', i, n); } });
});
WTEST('formül sorularında yanlış cevaplar reddediliyor', fsNegBad===0);
console.log(bad?bad+' PROBLEM':'tüm kontroller geçti');
