const fs=require('fs'),vm=require('vm');
const ctx={window:{},console};vm.createContext(ctx);
for(const f of ['match.js','svg.js','data/biyoloji.js','data/fizik.js','data/inkilap.js','data/din.js','data/edebiyat.js','data/subjects.js'])
  vm.runInContext(fs.readFileSync('src/'+f,'utf8').replace(/^var (\w+)/gm,'globalThis.$1'),ctx);
const M=ctx.M; let bad=0;
const firstOf=s=> s.num!=null? String(s.num) : s.a? s.a[0] : s.all? s.all.map(g=>g[0]).join(' ') : s.keys? s.keys[0][0] : null;
for(const S of ctx.SUBJECTS){
  let img=S.questions.filter(q=>q.svg).length;
  console.log(S.name, S.questions.length,'soru,',img,'çizimli');
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
const T=(sid,i,inp,exp)=>{const qs=ctx.SUBJECTS.find(s=>s.id===sid).questions; const q=typeof i==='string'? qs.find(x=>x.q.includes(i)) : qs[i-1]; const g=M.check(inp,q); if(g!==exp){bad++;console.log('FAIL case',sid,i,inp,g);}};
T('biyoloji',9,'riboz',false); T('biyoloji',11,'deoksiriboz',false); T('biyoloji',15,'TACGCT',false);
T('fizik',1,'4',false); T('fizik','Buz patencisi','azalır',false); T('fizik','Buz patencisi','kollarını kapatınca artar',true); T('fizik','(m ve r cinsinden)','5mr2',false); T('biyoloji','yeni nükleotitleri','RNA polimeraz',false); T('biyoloji','yeni nükleotitleri','DNA polimeraz',true); T('fizik','yönü sürekli','açısal hız',false); T('fizik','Kepler’in birinci','çember',false);
T('inkilap',10,'erzurum kongresi',false); T('inkilap',10,'sivas kongresi',true); T('inkilap',1,'kanunu esasi',true);
T('din',3,'farabi',false); T('din',1,'insanın aklına hitap eder',true);
console.log(bad?bad+' PROBLEM':'tüm kontroller geçti');
