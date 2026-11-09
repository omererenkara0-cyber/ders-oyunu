const fs=require('fs'),vm=require('vm');
const ctx={window:{},console};vm.createContext(ctx);
for(const f of ['match.js','svg.js','data/biyoloji.js','data/biyoloji-zor.js','data/fizik.js','data/fizik-zor.js','data/inkilap.js','data/din.js','data/edebiyat.js','data/subjects.js'])
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
console.log(bad?bad+' PROBLEM':'tüm kontroller geçti');
