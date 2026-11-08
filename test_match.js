const M=require('./src/match.js');
let fails=0;
const T=(r,s,e)=>{const g=M.check(r,s); if(g!==e){fails++;console.log('FAIL '+JSON.stringify(r)+' -> '+g+' spec '+JSON.stringify(s))}};
T('mitokondridir',{a:['mitokondri']},true);
T('Mitekondri',{a:['mitokondri']},true);
T('sol karıncık',{a:['sol karıncık'],not:['sağ karıncık']},true);
T('sag karincik',{a:['sol karıncık'],not:['sağ karıncık']},false);
T('uzaklaşır',{a:['yaklaşır'],not:['uzaklaşır']},false);
T('normale yaklasir',{a:['yaklaşır'],not:['uzaklaşır']},true);
T('1/4',{num:0.25},true); T('%25',{num:[0.25,25]},true); T('4',{num:0.25},false); T('0,25',{num:0.25},true);
T('16 N',{num:16},true); T('160',{num:16},false);
T('TAC GCA',{a:['TACGCA'],strict:true},true); T('TAC GCT',{a:['TACGCA'],strict:true},false);
T('kanunu esasi',{a:['Kanun-i Esasi','1876 Anayasası']},true);
T('Versay - Almanya',{all:[['versay'],['almanya']]},true);
T('Versay',{all:[['versay'],['almanya']]},false);
T('Bu ifadeler insanın aklına hitap eder',{keys:[['akıl','akla','aklına']]},true);
T('√2',{num:1.414,a:['kök 2']},true);
T('ibni sina',{a:['İbn Sînâ']},true);
T('mayoz',{a:['mitoz']},false);
T('2mr²',{a:['2mr2']},true); T('2 m r^2',{a:['2mr2']},true); T('5mr2',{a:['2mr2'],strict:true},false); T('2 m r2',{a:['2mr2'],strict:true},true);
const l1=M.checkList(['türkçülük','osmanlıcılık','islamcilik','batıcılık'],[{a:['Osmanlıcılık']},{a:['İslamcılık']},{a:['Türkçülük']},{a:['Batıcılık']},{a:['Adem-i merkeziyetçilik']}]);
if(l1.join()!=='true,true,true,true'){fails++;console.log('list1',l1)}
const l2=M.checkList(['türkçülük','türkçülük'],[{a:['Osmanlıcılık']},{a:['Türkçülük']}]);
if(l2.join()!=='true,false'){fails++;console.log('list2',l2)}
if(typeof DATA!=='undefined'){}
module.exports={T,get fails(){return fails}};
if(require.main===module) console.log(fails?fails+' FAIL':'all ok');
