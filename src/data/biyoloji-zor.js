/* Zor seviye: nükleik asitler · replikasyon · protein sentezi (çizimli, açık uçlu, yazı toleranslı) */
var BIOZ = (function(){
  var t=S.t, l=S.l, c=S.c, r=S.r, p=S.p, q=S.q, W=S.wrap;
  function seq(){
    var b='', s=['A','T','G','C','C','A'];
    b+=t(16,18,'KALIP DNA (soldan sağa okunur)',{a:'start',s:12,c:'mut'});
    for(var i=0;i<6;i++) b+=r(24+58*i,28,44,28,'f1',6)+t(46+58*i,43,s[i],{b:1});
    b+=t(16,84,'Sentezlenen mRNA',{a:'start',s:12,c:'mut'});
    for(var j=0;j<6;j++) b+=r(24+58*j,94,44,28,'f5',6)+q(46+58*j,108,'?');
    return W(380,132,b);
  }
  function gel(){
    var b='';
    b+=t(16,18,'Meselson–Stahl deneyi · ¹⁴N ortamında 1. eşlenme',{a:'start',s:12,c:'mut'});
    b+='<rect x="40" y="30" width="80" height="150" rx="8" class="f5"/>';
    b+=l(80,44,80,150,'thin');
    [['ağır (¹⁵N)',58],['ara / hibrit',105],['hafif (¹⁴N)',150]].forEach(function(o){
      b+=l(28,o[1],44,o[1],'dash')+t(130,o[1],o[0],{a:'start',s:12,c:'mut'});
    });
    b+=t(80,196,'deney tüpü',{s:11,c:'mut'});
    b+=t(16,216,'1. eşlenme sonunda kaç bant oluşur, hangi yoğunlukta bulunur?',{a:'start',s:12.5,c:'mut'});
    return W(420,228,b);
  }
  function cen(){
    var b='';
    b+=l(30,110,470,110,'dash')+t(466,100,'metafaz plak',{a:'end',s:11,c:'mut'});
    for(var i=0;i<6;i++){ var x=78+62*i;
      b+=l(x-13,50,x+13,96,'k1')+l(x+13,50,x-13,96,'k4');
      b+=c(x,73,5,'f3');
    }
    b+=t(16,26,'2n = 6 kromozomlu hücre · mitoz metafazı',{a:'start',s:12,c:'mut'});
    return W(480,126,b);
  }
  function kod(){
    var b='', cod=['AUG','UAC','GGA','UAA'];
    b+=t(16,18,'Ribozomda okunan kodonlar (soldan sağa)',{a:'start',s:12,c:'mut'});
    for(var i=0;i<4;i++) b+=r(24+96*i,30,80,30,'f1',6)+t(64+96*i,45,cod[i],{b:1});
    b+=t(16,92,'tRNA antikodonları (kodonların karşısına yaz)',{a:'start',s:12,c:'mut'});
    for(var j=0;j<4;j++) b+=r(24+96*j,102,80,30,'f5',6)+t(64+96*j,117,'?',{b:1});
    b+=t(16,156,'Okunan kodon sayısı 4’tür; polipeptitte kaç amino asit bulunur?',{a:'start',s:12,c:'mut'});
    return W(420,170,b);
  }
  function enzim(){
    var b='';
    b+=t(16,18,'Replikasyon çatalı',{a:'start',s:12,c:'mut'});
    b+=l(20,92,168,92,'k1')+l(20,112,168,112,'k4');
    for(var x=30;x<168;x+=16) b+=l(x,94,x,110,'thin');
    b+=l(168,92,438,42,'k1');
    b+=l(168,112,438,178,'k4');
    b+='<ellipse cx="172" cy="102" rx="14" ry="24" class="f3"/>';
    b+=p('M424,58 L184,96','k2','ar');
    var seg=function(t1,t2){ var x1=168+270*t1,y1=112+66*t1-14,x2=168+270*t2,y2=112+66*t2-14; return p('M'+x1+','+y1+' L'+x2+','+y2,'k2','ar'); };
    b+=seg(0.10,0.30)+seg(0.38,0.60)+seg(0.68,0.90);
    b+=S.dot(168+270*0.34,112+66*0.34-14,5,'acc')+S.dot(168+270*0.64,112+66*0.64-14,5,'acc');
    b+=q(172,58,'A')+l(172,69,172,80,'thin');
    b+=q(300,38,'B')+l(295,48,270,78,'thin');
    b+=q(210,152,'C')+l(220,143,252,126,'thin');
    b+=q(320,152,'D')+l(314,143,302,138,'thin');
    b+=t(470,34,'öncü (sürekli) iplik',{a:'end',s:11,c:'mut'});
    b+=t(96,138,'kalıp DNA',{s:11.5,c:'mut'});
    return W(480,196,b);
  }
  function dnarna(){
    var b='', s1='M40,60', s2='M40,60';
    for(var x=40;x<=220;x+=5){ var y=Math.sin((x-40)/16)*13; s1+=' L'+x+','+(60+y).toFixed(1); s2+=' L'+x+','+(60-y).toFixed(1); }
    b+=p(s1,'k1')+p(s2,'k4');
    for(var x2=49;x2<220;x2+=9){ var y2=Math.sin((x2-40)/16)*13; b+=l(x2,60+y2,x2,60-y2,'thin'); }
    b+=t(130,110,'DNA (çift sarmal)',{s:12,c:'mut'});
    var s3='M300,60';
    for(var x3=300;x3<=470;x3+=5){ var y3=Math.sin((x3-300)/16)*13; s3+=' L'+x3+','+(60+y3).toFixed(1); }
    b+=p(s3,'k2');
    b+=t(385,110,'RNA (tek zincir)',{s:12,c:'mut'});
    b+=t(260,60,'|',{s:26,c:'mut'});
    return W(510,126,b);
  }
  function rnabar(){
    var b='', v=[['rRNA',80],['tRNA',15],['mRNA',5]];
    b+=S.axes(50,170,260,150,'RNA tipi','oran (%)');
    v.forEach(function(o,i){ var x=85+80*i, h=o[1]*1.6; b+=r(x,170-h,44,h,'f'+(i+1),4)+t(x+22,186,o[0],{b:1})+t(x+22,160-h,'%'+o[1],{s:12}); });
    return W(340,200,b);
  }
  function codtable(){
    var rows=[['AUG','Metiyonin (Met)'],['UUU','Fenilalanin (Phe)'],['GGU','Glisin (Gli)'],['UAA','DUR (stop)']];
    var b='';
    b+=t(16,18,'Kodon tablosu (kısaltılmış)',{a:'start',s:12,c:'mut'});
    b+=r(20,32,150,26,'f1',4)+t(95,45,'Kodon',{b:1});
    b+=r(174,32,220,26,'f3',4)+t(284,45,'Amino asit',{b:1});
    rows.forEach(function(o,i){ var y=58+28*i;
      b+=r(20,y,150,26,'f5',0)+t(95,y+13,o[0],{b:1});
      b+=r(174,y,220,26,'f5',0)+t(284,y+13,o[1],{s:12.5});
    });
    return W(410,180,b);
  }
  return {seq:seq, gel:gel, cen:cen, kod:kod, enzim:enzim, dnarna:dnarna, rnabar:rnabar, codtable:codtable};
})();

var Q_BIYOLOJI_ZOR = [
{ topic:'Zor · Transkripsiyon', svg:BIOZ.seq(), q:'Şekildeki kalıp DNA zincirinden sentezlenen mRNA’nın baz dizilimini yazınız.',
  strict:true, a:['UACGGU','UAC GGU'], hints:['RNA’da timin yerine urasil (U) bulunur.','A’nın karşısına U, T’nin karşısına A, G’nin karşısına C gelir.','Dizi “UAC…” ile başlar; toplam altı baz yaz.'], exp:'Kalıp DNA: ATGCCA → mRNA: <b>UACGGU</b> (A–U, T–A, G–C, C–G)' },

{ topic:'Zor · Yarı korunumlu eşlenme', svg:BIOZ.gel(), q:'Meselson–Stahl deneyinde ¹⁵N’li (ağır) DNA, ¹⁴N ortamında bir kez eşlenmiştir. Deney tüpünde kaç bant oluşur ve bu bant(lar) hangi yoğunlukta bulunur?',
  all:[['tek','bir bant','1 bant','yalnız bir'],['ara','hibrit','orta','ortada']], hints:['Yarı korunumlu modele göre her yavru DNA’da bir eski (¹⁵N), bir yeni (¹⁴N) iplik vardır.','Tüm yavru DNA’lar aynı yoğunluğa sahiptir.','“Tek bant” ve “ara (hibrit)” ifadelerini birlikte kullan.'], exp:'<b>Tek bant</b> oluşur ve bu bant <b>ara (hibrit)</b> yoğunluktadır; çünkü her yavru DNA bir ağır (¹⁵N) bir hafif (¹⁴N) iplikten oluşur.' },

{ topic:'Zor · Hücre döngüsü', svg:BIOZ.cen(), q:'Şekildeki hücre (2n = 6) mitoz bölünmenin metafazındadır. Bu hücrede kaç kromozom, kaç kromatit ve kaç DNA molekülü bulunur?',
  type:'parts', parts:[
    {label:'Kromozom sayısı:', num:6},
    {label:'Kromatit sayısı:', num:12},
    {label:'DNA molekülü sayısı:', num:12}], hints:['Metafazda her kromozom iki kromatitlidir.','Kromozom sayısı tür için sabittir (2n = 6).','Kromatit = 2 × kromozom; DNA molekülü sayısı = kromatit sayısı.'], exp:'<b>6 kromozom · 12 kromatit · 12 DNA molekülü</b>' },

{ topic:'Zor · Şifre–antikodon', svg:BIOZ.kod(), q:'Şekilde ribozomda okunan dört kodon verilmiştir. Bu dizideki her kodonun karşısına gelecek tRNA antikodonlarını sırasıyla yazınız.',
  type:'parts', parts:[
    {label:'1. antikodon:', strict:true, a:['UAC']},
    {label:'2. antikodon:', strict:true, a:['AUG']},
    {label:'3. antikodon:', strict:true, a:['CCU']},
    {label:'4. antikodon:', strict:true, a:['AUU']}], hints:['Antikodon, kodonun tamamlayıcısıdır (A–U, G–C).','AUG’un karşısına UAC, UAA’nın karşısına AUU gelir.','Sıra: UAC · AUG · CCU · AUU.'], exp:'Kodon → antikodon: AUG→<b>UAC</b> · UAC→<b>AUG</b> · GGA→<b>CCU</b> · UAA→<b>AUU</b>' },

{ topic:'Zor · Protein sentezi', svg:BIOZ.kod(), q:'Şekildeki dört kodon okunduktan sonra ribozomda sentezlenen polipeptitte kaç amino asit bulunur?',
  num:3, hints:['UAA bir durdurucu (stop) kodondur.','Durdurucu kodon amino asit şifrelemez; sentezi sonlandırır.','İlk üç kodonu say.'], exp:'<b>3 amino asit</b> (UAA durdurucu kodon olduğundan amino asit şifrelemez)' },

{ topic:'Zor · DNA hesaplama', q:'300 nükleotitlik çift zincirli bir DNA molekülünde 60 adenin bulunmaktadır. Bu DNA’da kaç guanin vardır?',
  num:90, hints:['Toplam nükleotit 300 ise A+T+G+C = 300’dür.','A = T olduğundan T de 60’tır; geriye G+C = 180 kalır.','G = C olduğundan G = 180 ÷ 2.'], exp:'A=T=60 → G+C = 300−120 = 180 → G = C = <b>90</b>' },

{ topic:'Zor · DNA hesaplama', q:'Bir DNA molekülünde toplam 900 hidrojen bağı ve 150 adenin bulunmaktadır. Bu DNA’da kaç guanin vardır?',
  num:200, hints:['A–T arasında 2, G–C arasında 3 hidrojen bağı vardır.','A = T = 150 ise A–T bağları 150×2 = 300 hidrojen bağı eder.','Kalan 600 bağ G–C’ye aittir; her G–C çifti 3 bağ kurar: G = 600 ÷ 3.'], exp:'A=T=150 → A–T bağları 300 · Kalan 900−300 = 600 → G = C = 600 ÷ 3 = <b>200</b>' },

{ topic:'Zor · Replikasyon', q:'1200 nükleotitlik çift zincirli bir DNA molekülü bir kez eşlendiğinde, yeni sentezlenen ipliklerde toplam kaç nükleotit bulunur?',
  num:1200, hints:['Her DNA ipliği 600 nükleotittir.','Her yavru DNA’da bir iplik eski, bir iplik yenidir.','İki yavru DNA’da toplam 2 yeni iplik vardır: 2 × 600.'], exp:'Ana DNA 2×600 nükleotit → yeni sentezlenen iplikler 2×600 = <b>1200</b> nükleotit' },

{ topic:'Zor · Protein sentezi', q:'1200 nükleotitlik çift zincirli bir DNA’dan sentezlenebilecek en uzun polipeptitte en fazla kaç amino asit bulunur?',
  num:200, hints:['Yalnızca bir zincir (kalıp zincir) şifre olarak okunur.','Kalıp zincir 600 nükleotittir.','Her amino asit 3 nükleotitlik (kodon) şifreyle belirlenir: 600 ÷ 3.'], exp:'600 ÷ 3 = <b>200</b> amino asit (en fazla)' },

{ topic:'Zor · Replikasyon', svg:BIO.origins(), q:'Aynı uzunluktaki bir DNA parçasını; prokaryot tek bir orijinden, ökaryot ise üç orijinden eşler. Buna göre ökaryottaki eşlenme süresi prokaryottakine göre nasıl değişir?',
  a:['Kısalır','azalır','daha kısa','kısa','azalacak','kısalacak','azalıyor','daha kısa sürer'], not:['uzar','artar','aynı kalır','değişmez'], hints:['Birden fazla orijin, aynı anda birden fazla noktadan eşlenme başlatır.','İşi paylaşmak süreyi kısaltır mı uzatır mı?'], exp:'Birden çok orijinden eşzamanlı eşlenme başladığı için ökaryotta eşlenme süresi <b>kısalır (azalır)</b>.' },

{ topic:'Zor · Yarı korunumlu eşlenme', svg:BIO.semicons(), q:'Yarı korunumlu eşlenmeye göre ¹⁴N ortamında üç kez eşlenen bir DNA için; ortamdaki toplam DNA sayısı, tamamen hafif (¹⁴N) DNA sayısı ve hibrit DNA sayısı sırasıyla kaçtır?',
  type:'parts', parts:[
    {label:'Toplam DNA:', num:8},
    {label:'Hibrit DNA:', num:2},
    {label:'Tamamen hafif DNA:', num:6}], hints:['Her eşlenmede DNA sayısı iki katına çıkar: 2ⁿ.','Hibrit DNA sayısı her zaman 2’dir (eski ağır iplikler yalnızca iki tanedir).','Kalan DNA’lar tamamen hafiftir.'], exp:'3 eşlenme → 2³ = <b>8 DNA</b> · <b>2 hibrit</b> · <b>6 tamamen hafif</b>' },

{ topic:'Zor · Mutasyon', q:'Orak hücreli anemiye yol açan mutasyonda DNA’daki GAG şifresi GTG’ye dönüşür. Bu mutasyonun protein düzeyindeki sonucunu kısaca yazınız.',
  long:true, keys:[['amino asit','aminoasit'],['değişir','değişmiş','değişikliğe','farklı','yer değiştir'],['glutamik','valin','orak','hemoglobin']], hints:['Bir baz değişince oluşan yeni kodon hangi amino asidi şifreler?','Glutamik asit yerine valin geçer.','Amino asit değişince proteinin yapısı ve işlevi bozulur; alyuvar orak şeklini alır.'], exp:'Şifre GAG→GTG olunca kodon değişir; glutamik asit yerine <b>valin</b> gelir. <b>Amino asit değiştiği için hemoglobin yapısı (protein işlevi) bozulur</b> ve alyuvarlar orak şeklini alır.' },

{ topic:'Zor · Translasyon', q:'Bir mRNA’nın yalnızca ilk üç nükleotidi (başlangıç kodonu) değişecek biçimde mutasyona uğrarsa protein sentezi neden hiç başlamayabilir?',
  long:true, keys:[['başlangıç','başlama','start','AUG'],['metiyonin','metionin'],['kodon','şifre']], hints:['Translasyonun başlaması için özel bir kodon tanınır.','Bu kodon AUG’dir ve metiyonin şifreler.','Başlangıç kodonu tanınmazsa ribozom senteze başlayamaz.'], exp:'Protein sentezi <b>AUG (başlangıç/metiyonin)</b> kodonundan başlar. Başlangıç kodonu bozulursa ribozom şifreyi tanıyamaz ve translasyon <b>başlamaz</b>.' },

{ topic:'Zor · Kalıtım yorumu', q:'Bir canlının karaciğer hücresi ile deri hücresinde DNA içeriği aynı olmasına rağmen ürettikleri proteinler farklıdır. Bunun nedenini açıklayınız.',
  long:true, keys:[['gen','genler'],['aktif','ifade','kullanı','çalış','okun','sentezlen'],['farklı','ayrı','her hücrede'],['protein','enzim']], hints:['Hücrelerde tüm genler aynı anda çalışır mı?','Bir hücrede bazı genler aktif, bazıları baskılanmıştır.','Aktif genler hangi proteinlerin üretileceğini belirler.'], exp:'Tüm vücut hücrelerinde aynı DNA (genom) bulunur; ancak her hücrede <b>farklı genler aktif (ifade edilir)</b>. Bu nedenle karaciğer ve deri hücreleri farklı protein ve enzimler üretir.' },

{ topic:'Zor · Nükleik asit yapısı', q:'Bir DNA molekülündeki iki iplik ters yönlüdür (antiparalel). Buna göre bir ipliğin 5′ ucu ile diğer ipliğin hangi ucu karşı karşıyadır?',
  a:['3','3 ucu','3′ ucu','3\' ucu','üç','üç ucu'], hints:['İplikler zıt yönlerde uzanır.','Bir zincirin 5′ ucunun hizasına diğer zincirin hangi ucu gelir?','5′ ↔ 3′ eşleşir.'], exp:'İplikler antiparaleldir: bir zincirin <b>5′</b> ucunun karşısında diğer zincirin <b>3′</b> ucu bulunur.' },

{ topic:'Zor · Nükleotit', svg:BIO.ladder(['A','A','T','G','C','G'],true,'Üstteki zincire göre alttaki zinciri yaz'), q:'Şekildeki DNA’nın üst zinciri AATGCG ise alttaki tamamlayıcı zincirin baz dizilimini yazınız.',
  strict:true, a:['TTACGC','TTA CGC'], hints:['A’nın karşısına T, G’nin karşısına C gelir.','Dizi “TT…” ile başlar.','Altı bazın tamamını yaz.'], exp:'<b>TTACGC</b>' },

{ topic:'Zor · Replikasyon', svg:BIO.fork(), q:'DNA replikasyonu ile transkripsiyonu; kullanılan kalıp ve sentezlenen ürün açısından karşılaştırarak bir fark yazınız.',
  long:true, keys:[['dna','mrna','rna'],['tüm','tamamı','her iki','iki zincir','bir zincir','kalıp zincir'],['ürün','oluşan','sentezlenen']], hints:['Replikasyonda DNA’nın tamamı mı, bir bölümü mü kopyalanır?','Transkripsiyonun ürünü hangi moleküldür?','Replikasyon tüm DNA’yı, transkripsiyon gen bölgesini (bir zinciri) kalıp kullanır.'], exp:'Replikasyonda kalıp <b>DNA’nın her iki ipliği</b> olabilir ve ürün <b>DNA</b>’dır; transkripsiyonda kalıp <b>DNA’nın bir ipliği (gen bölgesi)</b>, ürün ise <b>mRNA</b>’dır.' },

{ topic:'Zor · Protein sentezi', q:'Bir hücrede 100 amino asitlik bir polipeptit sentezleniyorsa bu proteinin şifresini taşıyan mRNA’da en az kaç nükleotit bulunur? (Yalnızca amino asit şifrelerini hesapla.)',
  num:300, hints:['Her amino asit 3 nükleotitlik bir kodonla şifrelenir.','100 amino asit × 3 nükleotit.','Başlangıç ve durdurucu kodonları hesaba katma.'], exp:'100 × 3 = <b>300</b> nükleotit' },

{ topic:'Zor · Replikasyon enzimleri', svg:BIOZ.enzim(), q:'Şekilde replikasyon çatalında A, B, C ve D ile gösterilen yapı/enzimleri; (a) hidrojen bağlarını kıran, (b) kesintili sentezde Okazaki parçalarını birleştiren, (c) kalıp zincire yeni nükleotit ekleyen enzimlerle eşleştiriniz.',
  type:'parts', parts:[
    {label:'A (hidrojen bağlarını kırar):', a:['helikaz','helicase']},
    {label:'B (yeni nükleotit ekler):', a:['dna polimeraz','polimeraz']},
    {label:'C (Okazaki parçalarını birleştirir):', a:['dna ligaz','ligaz']},
    {label:'D (kesintili parça):', a:['okazaki','okazaki parçası','okazaki fragmenti']}],
  hints:['Çatalın ucundaki “fermuar”ı açan enzim hidrojen bağlarını kırar.','Okazaki parçaları arasında fosfodiester bağı kuran enzim “ligaz”dır.','Kalıp zincire yeni nükleotitleri ekleyen enzim polimerazdır; D ise bu kesintili parçaların adıdır.'],
  exp:'A → <b>helikaz</b> · B → <b>DNA polimeraz</b> · C → <b>DNA ligaz</b> · D → <b>Okazaki parçası</b>' },

{ topic:'Zor · Okazaki ve öncü iplik', q:'Bir replikasyon çatalında kalıp zincirlerden biri 5′→3′, diğeri 3′→5′ yönünde okunur. DNA polimeraz yalnızca 5′→3′ yönünde sentez yapabildiğine göre, bu durumun Okazaki parçalarının oluşmasına nasıl yol açtığını açıklayınız.',
  long:true, keys:[['3','3′','üç','5','5′','beş'],['kesintili','parça','okazaki','sürekli','öncü','gecikmeli'],['yön','ters','zıt','çatala doğru','çataldan']],
  hints:['Polimeraz yalnızca 5′→3′ yönde çalışır, ama çatal açılırken iki kalıp zincirin yönü zıttır.','Çataldan uzaklaşan yönde sentez kesintili olmak zorundadır.','Kesintili sentezlenen kısa parçalar “Okazaki parçaları”dır ve ligazla birleştirilir.'],
  exp:'İki kalıp zincirin yönü zıt olduğundan polimeraz bir zincirde çatala doğru <b>sürekli (öncü iplik)</b>, diğerinde çataldan uzaklaşarak <b>kesintili</b> sentez yapar. Kesintili sentezlenen kısa parçalar <b>Okazaki parçaları</b>dır ve DNA ligaz ile birleştirilir.' },

{ topic:'Zor · Prokaryot–ökaryot', svg:BIO.origins(), q:'Şekildeki prokaryot ve ökaryot DNA replikasyonunu; orijin sayısı, gerçekleştiği yer ve eşlenme hızı bakımından karşılaştırarak iki fark yazınız.',
  long:true, keys:[['orijin','başlangıç noktası','tek','birden fazla','çoklu'],['çekirdek','çekirdekte','sitoplazma','sitoplazmada'],['hızlı','hız','yavaş','süre']],
  hints:['Prokaryotta kaç orijin var, ökaryotta kaç?','Biri sitoplazmada, diğeri çekirdekte gerçekleşir.','Birden çok orijin eşlenmeyi hızlandırır.'],
  exp:'Prokaryotta <b>tek orijin</b> ve replikasyon <b>sitoplazmada</b> gerçekleşir; ökaryotta <b>birden fazla orijin</b> ve replikasyon <b>çekirdekte</b> gerçekleşir. Çoklu orijin sayesinde ökaryot replikasyonu daha <b>hızlı</b> tamamlanır.' },

{ topic:'Zor · DNA–RNA karşılaştırma', svg:BIOZ.dnarna(), q:'Şekildeki DNA ve RNA moleküllerini karşılaştırarak; şeker, baz ve zincir sayısı bakımından birer fark yazınız.',
  type:'parts', parts:[
    {label:'Şeker farkı:', a:['deoksiriboz','riboz']},
    {label:'Baz farkı:', a:['timin','urasil','t','u']},
    {label:'Zincir sayısı:', a:['çift','tek','iki','bir','çift zincir','tek zincir']}],
  hints:['DNA’da deoksiriboz, RNA’da riboz şekeri bulunur.','DNA’da timin, RNA’da urasil bulunur.','DNA çift sarmal, RNA tek zincirdir.'],
  exp:'DNA’da <b>deoksiriboz</b>, RNA’da <b>riboz</b> şekeri bulunur; DNA’da <b>timin</b>, RNA’da <b>urasil</b> bazı bulunur; DNA <b>çift</b>, RNA <b>tek</b> zincirlidir.' },

{ topic:'Zor · RNA oranları', svg:BIOZ.rnabar(), q:'Grafikte bir hücredeki RNA tiplerinin oranları verilmiştir. Buna göre en fazla ve en az bulunan RNA tiplerini yazıp, en fazla bulunanın hücredeki temel görevini açıklayınız.',
  type:'parts', parts:[
    {label:'En fazla bulunan:', a:['rrna','ribozomal rna','ribozomal']},
    {label:'En az bulunan:', a:['mrna','mesajcı rna','haberci rna','mesajci']},
    {label:'rRNA görevi:', a:['ribozom','ribozomun yapısını oluştur','ribozom alt birim']}],
  hints:['Protein sentezinde en çok kullanılan RNA, ribozomun yapı taşıdır.','Şifreyi taşıyan mRNA hücrede en az bulunur.','rRNA ribozomun yapısına katılır.'],
  exp:'En fazla <b>rRNA</b>, en az <b>mRNA</b> bulunur. rRNA <b>ribozomun yapısını oluşturarak</b> protein sentezinde görev alır.' },

{ topic:'Zor · Kodon tablosu', svg:BIOZ.codtable(), q:'Şekilde kısaltılmış kodon tablosu verilmiştir. AUG – UUU – GGU – UAA kodonları okunduğunda ribozomda sentezlenen polipeptitte kaç amino asit bulunur ve dizilimi ne olur?',
  type:'parts', parts:[
    {label:'Amino asit sayısı:', num:3},
    {label:'1. amino asit:', a:['metiyonin','met','metionin']},
    {label:'2. amino asit:', a:['fenilalanin','phe','fenil alanin']},
    {label:'3. amino asit:', a:['glisin','gli','gly']}],
  hints:['UAA bir durdurucu (stop) kodondur, amino asit şifrelemez.','Tabloya göre AUG→Metiyonin, UUU→Fenilalanin, GGU→Glisin.','Durdurucu kodon sentezi bitirir; yalnızca ilk üç kodon sayılır.'],
  exp:'UAA durdurucu olduğundan <b>3 amino asit</b> sentezlenir: <b>Metiyonin – Fenilalanin – Glisin</b>.' },

{ topic:'Zor · Keşif deneyleri', q:'Griffith deneyinde “aktarılan madde”nin ne olduğu anlaşılamamıştı; Avery–MacLeod–McCarty deneyinde ise bu maddenin DNA olduğu gösterildi. Bu iki deney arasındaki temel farkı ve bilimin doğasına ilişkin çıkarımı yazınız.',
  long:true, keys:[['enzim','protein','rna','parçala','yık','ayrıştır'],['dna','deoksiribonükleik'],['bilgi','değiş','geliş','kanıt','deney']],
  hints:['Avery ekibi deneyde hangi maddeleri parçalayarak hangi maddenin kalıcı olduğunu test etti?','Protein ve RNA parçalandığında özellik aktarılmaya devam etti; DNA parçalandığında aktarım durdu.','Bu süreç bilimsel bilginin kanıtlarla nasıl değişip geliştiğini gösterir.'],
  exp:'Avery ekibi deneyde <b>enzimler kullanarak protein ve RNA’yı parçaladı</b>; aktarım sürdü. <b>DNA parçalandığında aktarım durdu</b> ve özelliği aktaran maddenin <b>DNA</b> olduğu kanıtlandı. Bu, bilimsel bilginin yeni <b>kanıtlarla değişip geliştiğini</b> gösterir.' },

{ topic:'Zor · Yarı korunumlu eşlenme', q:'¹⁴N ortamında iki kez eşlenen (2 eşlenme) bir DNA için; ortamdaki toplam DNA molekülü sayısı, hibrit DNA sayısı ve tamamen hafif DNA sayısı sırasıyla kaçtır?',
  type:'parts', parts:[
    {label:'Toplam DNA:', num:4},
    {label:'Hibrit DNA:', num:2},
    {label:'Tamamen hafif DNA:', num:2}],
  hints:['Her eşlenmede DNA sayısı ikiye katlanır: 2ⁿ.','Eski ağır iplikler yalnızca iki tanedir, bu yüzden hibrit DNA her zaman 2’dir.','Kalan DNA’lar tamamen hafiftir.'],
  exp:'2 eşlenme → 2² = <b>4 DNA</b> · <b>2 hibrit</b> · <b>2 tamamen hafif</b>' },

{ topic:'Zor · Replikasyon hesaplama', q:'600 nükleotitlik tek zincirli bir DNA parçası üç kez eşlenirse, sonuçta oluşan DNA moleküllerindeki toplam nükleotit sayısı kaç olur?',
  num:4800, hints:['Tek zincir 600 nükleotit ise çift zincirli DNA 1200 nükleotittir.','3 eşlenmede DNA sayısı 2³ = 8 olur.','8 DNA × 1200 nükleotit.'],
  exp:'Çift zincirli DNA 1200 nükleotit · 3 eşlenme → 2³ = 8 DNA · 8 × 1200 = <b>4800</b> nükleotit' },

{ topic:'Zor · Transkripsiyon', svg:BIOZ.seq(), q:'Şekildeki kalıp DNA zincirinden sentezlenen mRNA’daki toplam baz sayısı ile kalıp DNA’daki toplam baz sayısı arasındaki ilişkiyi yazınız.',
  a:['eşit','aynı','eşittir','aynıdır','birbirine eşit','eşit sayıda'], hints:['Transkripsiyonda kalıp DNA’nın her bazı mRNA’ya kopyalanır.','Altı bazlık kalıp DNA’dan altı bazlık mRNA sentezlenir.','Sayılar birbirine eşittir.'],
  exp:'Her baz kopyalandığı için mRNA’daki baz sayısı kalıp DNA’daki baz sayısına <b>eşittir</b>.' },

{ topic:'Zor · Protein sentezi', q:'60 amino asitlik bir polipeptidin şifresini taşıyan mRNA’da başlangıç ve durdurucu kodonlar da dâhil olmak üzere toplam kaç nükleotit bulunur?',
  num:186, hints:['60 amino asidin şifresi 60 kodon eder.','Kodonlara başlangıç ve durdurucu kodonlar da eklenir: 60 + 2 = 62 kodon.','62 kodon × 3 nükleotit.'],
  exp:'(60 + 2) kodon × 3 = <b>186</b> nükleotit' }
];
