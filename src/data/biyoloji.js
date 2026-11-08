var BIO = (function(){
  var t=S.t, l=S.l, c=S.c, r=S.r, p=S.p, q=S.q, W=S.wrap;
  function nuc(which){
    var lab = function(k,x,y,name){ return which===k ? q(x,y,'?') : t(x,y,name,{s:13,c:'mut'}); };
    return W(380,200,
      c(72,100,28,'f3')+t(72,101,'P',{b:1})+l(100,100,142,95)+
      p('M185,58 L230,90 L213,142 L157,142 L140,90 Z','f2')+t(185,108,'5C',{s:12,c:'mut'})+
      l(230,90,268,90)+r(268,62,86,56,'f1',10)+t(311,91,'A/T/G/C',{s:12})+
      lab(1,72,45,'fosfat')+lab(2,185,172,'şeker')+lab(3,311,40,'baz')+
      t(190,190,'Bir DNA nükleotidi',{s:12,c:'mut'}));
  }
  function ladder(top, bottomQ, title){
    var n=top.length, w=60*n+80, b='';
    b+=l(30,40,w-30,40,'k1')+l(30,140,w-30,140,'k4');
    b+=t(18,40,"5'",{s:12})+t(w-16,40,"3'",{s:12})+t(18,140,"3'",{s:12})+t(w-16,140,"5'",{s:12});
    for(var i=0;i<n;i++){ var x=70+60*i;
      b+=l(x,40,x,140,'thin')+r(x-17,52,34,28,'f1',6)+t(x,67,top[i],{b:1});
      b+=r(x-17,100,34,28,'f4',6)+t(x,115,bottomQ?'?':'',{b:1}); }
    if(title) b+=t(w/2,166,title,{s:12,c:'mut'});
    return W(w,176,b);
  }
  function transcription(){
    var s=['T','A','C','G','G','A'], b='', w=60*6+80;
    b+=t(20,30,'DNA (kalıp)',{a:'start',s:12,c:'mut'})+l(30,48,w-30,48,'k1');
    for(var i=0;i<6;i++){ var x=70+60*i; b+=r(x-17,58,34,28,'f1',6)+t(x,73,s[i],{b:1})+l(x,90,x,108,'dash')+r(x-17,112,34,28,'f5',6)+t(x,127,'?',{b:1}); }
    b+=l(30,150,w-30,150,'k5')+t(20,168,'mRNA',{a:'start',s:12,c:'mut'});
    return W(w,180,b);
  }
  function fork(){
    var b='';
    b+=l(20,104,200,104,'k1')+l(20,126,200,126,'k4');
    for(var x=30;x<200;x+=16) b+=l(x,106,x,124,'thin');
    b+=l(200,104,450,36,'k1')+l(200,126,450,194,'k4');
    // öncü iplik
    b+=p('M440,52 L232,108','k2','ar');
    // kesikli iplik parçaları
    var seg=function(t1,t2){ var x1=200+250*t1,y1=126+68*t1-15,x2=200+250*t2,y2=126+68*t2-15; return p('M'+x1+','+y1+' L'+x2+','+y2,'k2','ar'); };
    b+=seg(0.14,0.33)+seg(0.39,0.6)+seg(0.66,0.88);
    b+=S.dot(200+250*0.36,126+68*0.36-15,5,'acc')+S.dot(200+250*0.63,126+68*0.63-15,5,'acc');
    b+='<ellipse cx="204" cy="115" rx="16" ry="26" class="f3"/>';
    b+=c(372,62,13,'f5');
    b+=q(204,72,'X')+q(320,190,'Y')+q(372,144,'Z')+q(392,30,'W');
    b+=l(372,155,358,141,'thin')+l(392,41,374,52,'thin');
    b+=t(470,36,"ana iplik",{a:'end',s:11,c:'mut'})+t(110,150,'Eşlenmemiş DNA',{s:12,c:'mut'});
    return W(480,206,b);
  }
  function organization(hl){
    var b='', nb=function(n,x,y){ return hl===n? q(x,y,String(n)) : '<circle cx="'+x+'" cy="'+y+'" r="10" class="f5"/>'+t(x,y+1,String(n),{s:12,b:1}); };
    // kromozom
    b+='<g transform="translate(62,78)"><rect x="-7" y="-44" width="14" height="88" rx="7" class="f5" transform="rotate(22)"/><rect x="-7" y="-44" width="14" height="88" rx="7" class="f5" transform="rotate(-22)"/></g>';
    // kromatin iplik + nükleozomlar
    b+=p('M84,72 C120,40 150,110 190,78 S240,50 262,96 S290,150 300,158','k3');
    [[124,64],[170,86],[222,64],[270,112]].forEach(function(o){ b+=c(o[0],o[1],9,'f3'); });
    b+=l(258,98,284,98,'thin')+l(258,126,284,126,'thin');
    // DNA sarmalı
    var s1='M300,160', s2='M300,160';
    for(var x=300;x<=520;x+=5){ var y=Math.sin((x-300)/18)*14; s1+=' L'+x+','+(160+y).toFixed(1); s2+=' L'+x+','+(160-y).toFixed(1); }
    b+=p(s1,'k1')+p(s2,'k4');
    for(var x2=309;x2<520;x2+=9){ var y2=Math.sin((x2-300)/18)*14; b+=l(x2,160+y2,x2,160-y2,'thin'); }
    b+=l(360,130,450,130,'ink')+l(360,124,360,136,'ink')+l(450,124,450,136,'ink');
    b+=l(300,196,520,196,'ink');
    b+=l(489,170,489,150,'ink','ar');
    b+=nb(7,26,40)+l(36,46,52,62,'thin')+l(36,46,70,52,'thin');
    b+=nb(5,124,30)+l(124,40,124,55,'thin');
    b+=nb(6,170,124)+l(170,114,166,96,'thin');
    b+=nb(4,296,112);
    b+=nb(3,405,112)+nb(2,410,212)+nb(1,489,124);
    return W(540,226,b);
  }
  function meselson(){
    var b='', xs=[70,180,290], lab=['¹⁵N’li DNA','1. eşlenme','2. eşlenme'];
    xs.forEach(function(x,i){ b+=p('M'+(x-22)+',30 L'+(x-22)+',160 Q'+x+',190 '+(x+22)+',160 L'+(x+22)+',30','ink')+t(x,202,lab[i],{s:12}); });
    b+=r(48,136,44,7,'f4',3)+r(158,101,44,7,'f2',3)+q(290,100,'?');
    [['hafif',68],['ara',104],['ağır',140]].forEach(function(o){ b+=l(330,o[1],350,o[1],'dash')+t(356,o[1],o[0],{a:'start',s:12,c:'mut'}); });
    b+=t(200,16,'14N ortamında eşlenme',{s:12,c:'mut'});
    return W(400,214,b);
  }
  function mouse(x,dead){
    return '<ellipse cx="'+x+'" cy="98" rx="26" ry="15" class="f5"/>'+c(x+24,88,10,'f5')+c(x+20,78,5,'f5')+p('M'+(x-26)+',100 q-14,6 -20,-6','k5')+
      (dead? t(x+27,87,'×',{s:12,b:1}) : S.dot(x+27,86,2));
  }
  function griffith(){
    var b='', L=[['Canlı S',''],['Canlı R',''],['Isıyla','öldürülmüş S'],['Öldürülmüş S','+ canlı R']], R=['Öldü','Yaşadı','Yaşadı','Öldü'];
    for(var i=0;i<4;i++){ var x=70+135*i; b+=t(x,22,L[i][0],{s:12})+(L[i][1]?t(x,40,L[i][1],{s:12}):'')+mouse(x-6,R[i]==='Öldü')+t(x,140,R[i],{s:12.5,b:1,c:R[i]==='Öldü'?'t4':'t2'})+t(x,158,(i+1)+'. durum',{s:11,c:'mut'}); if(i) b+=l(2+135*i,14,2+135*i,160,'dash'); }
    return W(545,170,b);
  }
  function trna(){
    var b='';
    b+=p('M150,20 L150,70','ink')+t(150,12,"amino asit bağlanır (3')",{s:11,c:'mut'});
    b+=c(92,96,26,'f2')+c(208,96,26,'f2')+p('M130,70 L170,70 L170,130 L130,130 Z','f2');
    b+=c(150,168,32,'f2');
    b+=t(132,178,'U',{b:1})+t(150,184,'A',{b:1})+t(168,178,'C',{b:1});
    b+=t(196,140,'antikodon',{s:11,c:'mut',a:'start'})+l(194,142,176,152,'thin');
    b+=l(30,222,270,222,'k5');
    b+=r(104,198,26,24,'f5',5)+r(137,198,26,24,'f5',5)+r(170,198,26,24,'f5',5)+t(117,211,'?',{b:1})+t(150,211,'?',{b:1})+t(183,211,'?',{b:1});
    b+=t(285,222,'mRNA',{a:'start',s:12,c:'mut'});
    return W(330,240,b);
  }
  function flow(which){
    var b='', box=function(x,s){ return r(x,32,100,40,'f1',10)+t(x+50,53,s,{b:1}); };
    b+=box(20,'DNA')+box(190,'mRNA')+box(360,'Protein');
    b+=l(124,52,184,52,'ink','ar')+l(294,52,354,52,'ink','ar');
    b+= which===1 ? q(154,30,'1') : t(154,32,'1',{b:1,c:'mut'});
    b+= which===2 ? q(324,30,'2') : t(324,32,'2',{b:1,c:'mut'});
    b+=p('M50,30 C40,4 90,4 80,28','ink','ar')+t(65,90,'kendini eşler',{s:11,c:'mut'});
    return W(480,100,b);
  }
  function ribosome(){
    var b='';
    b+='<ellipse cx="200" cy="84" rx="120" ry="52" class="f3"/>'+'<ellipse cx="200" cy="160" rx="110" ry="22" class="f3"/>';
    b+=l(30,146,370,146,'k5');
    ['A','U','G','U','U','C','G','C','A'].forEach(function(s,i){ b+=t(110+22*i,135,s,{s:12}); });
    b+=p('M154,126 L154,96 M132,126 L176,126','k2')+p('M220,126 L220,96 M198,126 L242,126','k2');
    b+=c(154,82,14,'f4')+t(154,83,'Met',{s:10})+c(220,82,14,'f1')+t(220,83,'Phe',{s:10});
    b+=c(118,62,12,'f4')+l(140,74,128,68,'thin');
    b+=l(168,82,206,82,'sacc')+q(187,58,'?');
    b+=t(30,170,'mRNA',{a:'start',s:12,c:'mut'});
    return W(400,192,b);
  }
  function hbonds(){
    var b='', row=function(y,a1,a2,n){ var s=r(60,y-18,56,36,'f1',8)+t(88,y+1,a1,{b:1})+r(184,y-18,56,36,'f4',8)+t(212,y+1,a2,{b:1});
      for(var i=0;i<n;i++){ var yy=y-((n-1)*7)+i*14; s+=l(120,yy,180,yy,'dash'); } return s; };
    b+=row(46,'A','T',2)+row(122,'G','C',3);
    b+=t(150,170,'kesikli çizgi = hidrojen bağı',{s:12,c:'mut'});
    return W(300,182,b);
  }
  function bars(){
    var b='', v=[['X',80],['Y',15],['Z',5]];
    b+=S.axes(50,170,250,150,'RNA tipi','% oran');
    v.forEach(function(o,i){ var x=85+70*i, h=o[1]*1.6; b+=r(x,170-h,40,h,'f'+(i+1),4)+t(x+20,186,o[0],{b:1})+t(x+20,162-h,'%'+o[1],{s:12}); });
    return W(320,200,b);
  }
  function semicons(){
    var b='';
    b+=l(30,60,130,60,'k4')+l(30,90,130,90,'k4')+t(80,112,'Ana DNA',{s:12,c:'mut'});
    b+=l(150,75,200,40,'ink','ar')+l(150,75,200,110,'ink','ar');
    b+=l(220,24,340,24,'k4')+l(220,46,340,46,'k1')+t(280,64,'Yavru DNA 1',{s:11,c:'mut'});
    b+=l(220,104,340,104,'k1')+l(220,126,340,126,'k4')+t(280,144,'Yavru DNA 2',{s:11,c:'mut'});
    b+=t(190,166,'koyu: eski iplik · açık: yeni iplik',{s:11.5,c:'mut'});
    return W(370,176,b);
  }
  function origins(){
    var b='';
    b+=c(100,80,52,'k1')+c(100,80,44,'k4')+'<ellipse cx="100" cy="32" rx="16" ry="9" class="f3"/>'+t(100,152,'Prokaryot',{b:1});
    b+=l(200,70,450,70,'k1')+l(200,90,450,90,'k4');
    [250,330,410].forEach(function(x){ b+='<ellipse cx="'+x+'" cy="80" rx="22" ry="15" class="f3"/>'; });
    b+=t(325,152,'Ökaryot',{b:1})+t(325,120,'sarı balonlar: eşlenmenin başladığı bölgeler',{s:11.5,c:'mut'});
    return W(470,164,b);
  }
  function cell(){
    var b='';
    b+='<ellipse cx="200" cy="105" rx="180" ry="88" class="f2"/>'+c(160,100,46,'f5');
    b+=p('M135,95 q10,-15 20,0 t20,0 t20,0','k4')+p('M140,112 q10,-12 20,0 t20,0','k4');
    [[260,60],[290,120],[240,150],[320,90],[100,160],[80,70]].forEach(function(o){ b+=S.dot(o[0],o[1],4,'acc'); });
    b+=q(160,40,'1')+l(160,51,160,58,'thin')+q(330,60,'2')+l(322,68,322,84,'thin');
    return W(400,210,b);
  }
  return {nuc:nuc, ladder:ladder, transcription:transcription, fork:fork, organization:organization, meselson:meselson, griffith:griffith, trna:trna, flow:flow, ribosome:ribosome, hbonds:hbonds, bars:bars, semicons:semicons, origins:origins, cell:cell};
})();

var Q_BIYOLOJI = [
{ topic:'Nükleik asitlerin keşfi', q:'Çekirdekten elde ettiği, asit özelliği gösteren maddeye “nüklein” adını veren bilim insanı kimdir?',
  a:['Miescher','Friedrich Miescher','F. Miescher','Mişer'], hints:['1870’li yıllarda çalışan İsviçreli bir biyokimyacıdır.','Soyadı “M” ile başlar.'], exp:'<b>Friedrich Miescher</b> (1869–1871)' },
{ topic:'Nükleik asitlerin keşfi', svg:BIO.griffith(), q:'1928’de kapsüllü (S) ve kapsülsüz (R) zatürre bakterileri ile şekildeki deneyi yapan bilim insanı kimdir?',
  a:['Griffith','Frederick Griffith','F. Griffith','Grifit'], not:['Avery'], hints:['Bu deneyde kapsül özelliğinin aktarıldığı gösterildi ama aktaran madde bulunamadı.','Soyadı “G” ile başlar.'], exp:'<b>Frederick Griffith</b>' },
{ topic:'Nükleik asitlerin keşfi', svg:BIO.griffith(), q:'Şekildeki 4. durumda fare ölmüştür. Isıyla öldürülmüş S bakterileri ile canlı R bakterileri birlikteyken ne olmuştur?',
  long:true, keys:[['dönüşüm','transformasyon','dönüştü','dönüşmüş','dönüştürdü','dönüşerek'],['kapsül özelliği','kapsüllü hale','kapsül kazandı','kapsül geçti','aktarıldı','aktarılmış','geçmiş','S bakterisine']],
  hints:['Ölü S bakterilerinden canlı R bakterilerine bir şey geçti.','R bakterileri kapsül yapabilen hale geldi. Bu olayın adı?'],
  exp:'Ölü S bakterilerindeki kalıtım maddesi canlı R bakterilerine geçti ve R bakterileri kapsüllü S bakterilerine <b>dönüştü (transformasyon)</b>.' },
{ topic:'Nükleik asitlerin keşfi', q:'1944’te Griffith deneyini enzimler kullanarak geliştiren ve özelliği aktaran maddenin DNA olduğunu bulan araştırmacılardan birinin adını yazınız.',
  a:['Avery','Oswald Avery','MacLeod','Colin MacLeod','McCarty','Maclyn McCarty','Avery MacLeod McCarty'], hints:['Üç kişilik bir ekiptir.','Ekip: A…, MacLeod ve McCarty.'], exp:'<b>Avery – MacLeod – McCarty</b>' },
{ topic:'Nükleik asitlerin keşfi', q:'DNA’nın X ışını fotoğrafını (Photo 51) elde eden bilim insanlarından birini yazınız.',
  a:['Rosalind Franklin','Franklin','Maurice Wilkins','Wilkins'], not:['Watson','Crick'], hints:['Fotoğraf, onun izni olmadan Watson’a gösterildi.','Bir kadın bilim insanı: Rosalind …'], exp:'<b>Rosalind Franklin</b> ve <b>Maurice Wilkins</b> (1951)' },
{ topic:'Nükleik asitlerin keşfi', q:'1953’te DNA’nın çift sarmal yapısını modelleyen bilim insanlarından birinin adını yazınız.',
  a:['Watson','James Watson','Crick','Francis Crick','Watson ve Crick','Watson Crick'], not:['Franklin','Wilkins'], hints:['1962’de Nobel Ödülü’nü Wilkins ile paylaştılar.','İki kişidir: W… ve C…'], exp:'<b>James Watson</b> ve <b>Francis Crick</b>' },
{ topic:'Bilimin doğası', q:'Nükleik asitlerin keşif sürecinden çıkarılabilecek, bilimin doğasına ait bir özellik yazınız.',
  long:true, keys:[['değişebilir','değişir','değişken','kesin değil','mutlak değil','sorgulanabilir','gelişir'],['gözlem','deney'],['etkilen','birbirinin çalışma','birikimli','birikim','iş birliği','işbirliği','önceki çalışma'],['teknoloji','toplum'],['etik']],
  hints:['Bilgi zamanla yenilendi; Griffith’in sorusunu Avery cevapladı.','Franklin’in fotoğrafının izinsiz paylaşılması hangi kavramla ilgili?','Deney, gözlem, etik, değişebilirlik… bunlardan biriyle cümle kur.'],
  exp:'Bilimsel bilgi değişebilir · Bilimde gözlem ve deneyler yoluyla çıkarımlar elde edilir · Bilim insanları birbirlerinin çalışmalarından etkilenir · Bilim, toplum ve teknoloji arasında ayrılmaz bir ilişki vardır · Bilimde etik dışı süreçler yaşanabilir.' },
{ topic:'Nükleotit', svg:BIO.nuc(1), q:'Şekildeki DNA nükleotidinde “?” ile gösterilen yapı nedir?',
  a:['Fosfat','fosfat grubu','fosforik asit','P'], not:['şeker','baz'], hints:['Nükleotitleri birbirine bağlayan omurgada şekerle birlikte bulunur.','İçinde “P” elementi vardır.'], exp:'<b>Fosfat grubu</b>' },
{ topic:'Nükleotit', svg:BIO.nuc(2), q:'Şekildeki DNA nükleotidinde “?” ile gösterilen 5 karbonlu şekerin adı nedir?',
  a:['Deoksiriboz','deoksiriboz şekeri','dezoksiriboz'], not:['riboz','glikoz'], hints:['RNA’daki şekerden bir oksijen eksiktir.','DNA’nın açık adındaki “D…” harfi bu şekerden gelir.'], exp:'<b>Deoksiriboz</b>' },
{ topic:'Nükleotit', svg:BIO.nuc(3), q:'Şekilde “?” ile gösterilen ve A, T, G, C harfleriyle ifade edilen yapıya ne ad verilir?',
  a:['Azotlu organik baz','azotlu baz','organik baz','baz','nükleobaz'], not:['fosfat','şeker'], hints:['Adenin, timin, guanin ve sitozin bu gruptadır.','İçinde azot (N) bulunur.'], exp:'<b>Azotlu organik baz</b>' },
{ topic:'DNA – RNA', q:'RNA nükleotitlerinde bulunan 5 karbonlu şekerin adı nedir?',
  a:['Riboz'], not:['deoksiriboz','glikoz'], hints:['DNA’daki şekerin oksijen eksiği olmayan hali.','“RNA” kısaltmasındaki “R” bu şekerden gelir.'], exp:'<b>Riboz</b>' },
{ topic:'DNA – RNA', q:'RNA’da timin bazı yerine hangi baz bulunur?',
  a:['Urasil','U'], not:['timin','adenin','guanin','sitozin'], hints:['Sadece RNA’ya özgü bir bazdır.','“U” harfiyle gösterilir.'], exp:'<b>Urasil (U)</b>' },
{ topic:'DNA – RNA', q:'DNA ve RNA’nın ortak özelliklerinden birini yazınız.',
  long:true, keys:[['fosfat'],['adenin','guanin','sitozin','A G C'],['nükleotit','nükleotid'],['protein sentezi','protein sentezinde'],['fosfodiester','fosfat ester','ester bağ'],['hücrede bulunur','tüm canlılarda','bütün canlılarda']],
  hints:['İkisi de aynı tür yapı birimlerinden oluşur.','Her ikisinde de ortak bulunan bazlar ve gruplar var: fosfat, adenin, guanin, sitozin…'],
  exp:'Her ikisi de nükleotitlerden oluşur · fosfat ve A, G, C bazlarını içerir · fosfodiester (fosfat ester) bağları bulundurur · protein sentezinde görevlidir.' },
{ topic:'DNA – RNA', q:'DNA ile RNA arasındaki farklardan birini yazınız.',
  long:true, keys:[['çift','tek','sarmal','zincir','iplik'],['deoksiriboz','riboz'],['timin','urasil'],['çekirdek','sitoplazma'],['kendini eşler','eşlenir','replikasyon']],
  hints:['Zincir sayısını düşün.','Şeker çeşidi ya da bazlardan birini karşılaştırabilirsin.'],
  exp:'DNA çift, RNA tek zincirlidir · DNA’da deoksiriboz, RNA’da riboz bulunur · DNA’da timin, RNA’da urasil bulunur.' },
{ topic:'DNA yapısı', svg:BIO.ladder(['A','T','G','C','G','T'],true,'Üstteki zincire göre alttaki zinciri yaz'), q:'Şekildeki DNA’nın üst zinciri ATGCGT ise alttaki tamamlayıcı zincirin baz dizilimi nedir?',
  strict:true, a:['TACGCA'], hints:['A’nın karşısına T, G’nin karşısına C gelir.','İlk iki baz “TA…” ile başlar.'], exp:'<b>TACGCA</b> (A–T, G–C eşleşmesi)' },
{ topic:'DNA yapısı', svg:BIO.hbonds(), q:'Bir DNA molekülünde 10 adet A–T ve 5 adet G–C baz çifti varsa toplam kaç hidrojen bağı bulunur?',
  num:35, hints:['Şekle bak: A–T arasında 2, G–C arasında 3 hidrojen bağı vardır.','10×2 + 5×3 = ?'], exp:'10×2 + 5×3 = <b>35</b> hidrojen bağı' },
{ topic:'DNA yapısı', q:'100 nükleotitlik çift zincirli bir DNA’da 30 adenin varsa kaç guanin vardır?',
  num:20, hints:['A sayısı = T sayısı, G sayısı = C sayısıdır.','A + T = 60 ise G + C = 40.'], exp:'A=T=30 → G+C=40 → G = <b>20</b>' },
{ topic:'RNA tipleri', q:'Protein sentezi için DNA’dan kopyalanan şifreleri (kodonları) ribozoma taşıyan RNA çeşidi hangisidir?',
  a:['mRNA','mesajcı RNA','elçi RNA','haberci RNA'], not:['tRNA','rRNA'], hints:['Adı “mesaj” kelimesinden gelir.','Kısaltması m harfiyle başlar.'], exp:'<b>mRNA</b> (mesajcı RNA)' },
{ topic:'RNA tipleri', q:'Antikodonları ile amino asitleri ribozoma taşıyan RNA çeşidi hangisidir?',
  a:['tRNA','taşıyıcı RNA','transfer RNA'], not:['mRNA','rRNA'], hints:['Adı “taşımak” ile ilgilidir.','Yonca yaprağı şeklindedir.'], exp:'<b>tRNA</b> (taşıyıcı RNA)' },
{ topic:'RNA tipleri', svg:BIO.bars(), q:'Grafikte hücrede bulunma oranları verilen RNA tiplerinden X hangisidir?',
  note:'Bilgi: Bu RNA ribozomun alt birimlerini oluşturur.',
  a:['rRNA','ribozomal RNA'], not:['mRNA','tRNA'], hints:['Sıralama: rRNA > tRNA > mRNA','En çok bulunan RNA ribozomun yapısına katılır.'], exp:'<b>X = rRNA</b> (rRNA > tRNA > mRNA)' },
{ topic:'RNA tipleri', svg:BIO.bars(), q:'Grafiğe göre hücrede en az bulunan Z hangi RNA tipidir?',
  a:['mRNA','mesajcı RNA','elçi RNA'], not:['tRNA','rRNA'], hints:['Sıralama: rRNA > tRNA > mRNA','Ömrü kısadır; şifreyi taşıdıktan sonra yıkılır.'], exp:'<b>Z = mRNA</b>' },
{ topic:'DNA replikasyonu', svg:BIO.fork(), q:'Şekildeki replikasyon çatalında X ile gösterilen, DNA’nın iki zinciri arasındaki hidrojen bağlarını kıran enzim hangisidir?',
  a:['Helikaz','helikaz enzimi'], not:['ligaz','polimeraz','primaz'], hints:['Fermuar gibi DNA’yı açar.','Adı “helix” (sarmal) kelimesinden gelir.'], exp:'<b>Helikaz</b>' },
{ topic:'DNA replikasyonu', svg:BIO.fork(), q:'Şekilde Y ile gösterilen, kesintili sentezlenen kısa DNA parçalarına ne ad verilir?',
  a:['Okazaki parçaları','okazaki','okazaki parçacıkları','okazaki fragmentleri'], hints:['Bu parçaları keşfeden Japon bilim insanının adını taşır.','“O” harfiyle başlar.'], exp:'<b>Okazaki parçaları</b>' },
{ topic:'DNA replikasyonu', svg:BIO.fork(), q:'Şekilde Z noktalarında Okazaki parçaları arasında fosfodiester bağı kurarak onları birleştiren enzim hangisidir?',
  a:['DNA ligaz','ligaz'], not:['helikaz','polimeraz'], hints:['Adı Latince “bağlamak” (ligare) kelimesinden gelir.','Sonu “-gaz” ile biter.'], exp:'<b>DNA ligaz</b>' },
{ topic:'DNA replikasyonu', svg:BIO.fork(), q:'Şekilde W ile gösterilen, kalıp zincire bakarak yeni nükleotitleri ekleyen enzim hangisidir?',
  a:['DNA polimeraz','polimeraz'], not:['RNA polimeraz','helikaz','ligaz'], hints:['“Polimer” yapan enzim.','DNA … (iki kelime)'], exp:'<b>DNA polimeraz</b>' },
{ topic:'DNA replikasyonu', svg:BIO.semicons(), q:'Şekilde her yavru DNA’da bir eski bir yeni zincir bulunmaktadır. Bu eşlenme modeline ne ad verilir?',
  a:['Yarı korunumlu','yarı korunumlu eşlenme','semikonservatif','yarı korunumlu replikasyon','yarı koruyucu'], not:['korunumlu','dağınık'], hints:['Ana DNA’nın yarısı korunuyor.','“Yarı …” diye başlar.'], exp:'<b>Yarı korunumlu (semikonservatif)</b> eşlenme' },
{ topic:'DNA replikasyonu', svg:BIO.meselson(), q:'Meselson–Stahl deneyinde ¹⁵N’li DNA, ¹⁴N ortamında iki kez eşlendiğinde 3. tüpte hangi bantlar görülür?',
  all:[['ara','orta','hibrit','ortada'],['hafif','üst','üstte','yukarı']], hints:['Yarı korunumlu modele göre 2. eşlenmede 4 DNA’nın 2’si hibrit olur.','Diğer ikisi tamamen ¹⁴N’lidir. İki bant yaz.'], exp:'<b>Ara (hibrit) ve hafif</b> bantlar (yarı yarıya)' },
{ topic:'DNA replikasyonu', svg:BIO.origins(), q:'Şekle göre prokaryot ve ökaryot DNA replikasyonu arasındaki farklardan birini yazınız.',
  long:true, keys:[['orijin','başlangıç','köken','başladığı'],['sitoplazma','çekirdek'],['halkasal','dairesel','doğrusal']],
  hints:['Sarı balonların sayısına bak.','Ayrıca replikasyonun hücrede gerçekleştiği yeri de yazabilirsin.'],
  exp:'Prokaryotlarda tek, ökaryotlarda birden fazla replikasyon orijini bulunur · Prokaryot replikasyonu sitoplazmada, ökaryotlarınki çekirdekte gerçekleşir.' },
{ topic:'DNA replikasyonu', q:'Prokaryot hücrelerde DNA replikasyonu hücrenin neresinde gerçekleşir?',
  a:['Sitoplazma','sitoplazmada','stoplazma'], not:['çekirdek'], hints:['Prokaryotlarda çekirdek zarı yoktur.','Hücre zarı ile çevrili sıvı ortam.'], exp:'<b>Sitoplazmada</b>' },
{ topic:'Genetik materyal', svg:BIO.organization(1), q:'Genetik materyalin organizasyonunda 1 numara ile gösterilen, DNA’nın en küçük yapı birimi nedir?',
  a:['Nükleotit','nükleotid','nukleotit'], not:['gen','histon'], hints:['Fosfat + şeker + bazdan oluşur.','“N” ile başlar.'], exp:'1: <b>Nükleotit</b> · 2: DNA zinciri · 3: Gen · 4: Kromatin parçası (nükleozom) · 5: Histon proteini · 6: Kromatin iplik · 7: Kardeş kromatitler' },
{ topic:'Genetik materyal', svg:BIO.organization(3), q:'Şekilde 3 numara ile gösterilen, protein sentezi için anlamlı şifre veren DNA bölümüne ne denir?',
  a:['Gen'], not:['kromozom','histon'], hints:['Kalıtsal özellikleri belirleyen birimdir.','Üç harfli bir kelime.'], exp:'3: <b>Gen</b>' },
{ topic:'Genetik materyal', q:'Şekildeki genetik materyalde gen uzunluğu her zaman aynı mıdır?',
  svg:BIO.organization(3), a:['Hayır','değişir','değişken','aynı değil','farklıdır','farklı','hayır değişir'], not:['evet','aynıdır','sabittir'], hints:['Her protein aynı uzunlukta mı?','Protein sentezi için anlamlı şifre veren kısım gendir; şifre uzunluğu proteine göre değişir.'], exp:'<b>Hayır</b>, gen uzunluğu değişir. Protein sentezi için anlamlı şifre veren kısımlar gendir.' },
{ topic:'Genetik materyal', svg:BIO.organization(5), q:'Şekilde 5 numara ile gösterilen, DNA’nın etrafına sarıldığı proteinler nedir?',
  a:['Histon','histon proteini','histonlar'], not:['nükleozom','gen'], hints:['DNA bu proteinlerin etrafına makaraya sarılan ip gibi dolanır.','“H” ile başlar.'], exp:'5: <b>Histon proteini</b>' },
{ topic:'Genetik materyal', svg:BIO.organization(7), q:'Şekilde 7 numara ile gösterilen, eşlenmiş kromozomun birbirinin aynısı olan iki kolunun adı nedir?',
  a:['Kardeş kromatit','kardeş kromatitler','kromatit','kromatitler'], not:['homolog'], hints:['Eşlenme sonucu oluşan özdeş kopyalardır.','“Kardeş …”'], exp:'7: <b>Eşlenmiş kromozomun kardeş kromatitleri</b>' },
{ topic:'Protein sentezi', svg:BIO.flow(1), q:'Şekilde 1 numara ile gösterilen, DNA’dan mRNA sentezlenmesi olayına ne ad verilir?',
  a:['Transkripsiyon','yazılım','RNA sentezi'], not:['translasyon','replikasyon'], hints:['Türkçesi “yazılım”dır.','“Trans…” ile başlar, “kopyalamak” anlamına gelir.'], exp:'<b>Transkripsiyon</b> (yazılım)' },
{ topic:'Protein sentezi', svg:BIO.flow(2), q:'Şekilde 2 numara ile gösterilen, mRNA’daki şifreye göre protein sentezlenmesi olayına ne ad verilir?',
  a:['Translasyon','çeviri','protein sentezi'], not:['transkripsiyon','replikasyon'], hints:['Türkçesi “çeviri”dir.','Ribozomda gerçekleşir; “Trans…” ile başlar.'], exp:'<b>Translasyon</b> (çeviri)' },
{ topic:'Protein sentezi', svg:BIO.transcription(), q:'Kalıp DNA zinciri TACGGA ise bu zincirden sentezlenen mRNA’nın baz dizilimi nedir?',
  strict:true, a:['AUGCCU'], hints:['RNA’da timin yerine urasil (U) bulunur.','A’nın karşısına U, T’nin karşısına A gelir; dizi “AUG…” ile başlar.'], exp:'<b>AUGCCU</b>' },
{ topic:'Protein sentezi', q:'mRNA üzerinde bir amino asidi şifreleyen üçlü baz dizisine (kodona) kaç nükleotit vardır?',
  num:3, a:['üç'], hints:['“Üçlü şifre” olarak da adlandırılır.'], exp:'<b>3</b> nükleotit' },
{ topic:'Protein sentezi', svg:BIO.trna(), q:'Şekildeki tRNA’nın antikodonu UAC’dir. Bu antikodonun eşleştiği mRNA kodonu nedir?',
  strict:true, a:['AUG'], hints:['Antikodon ile kodon tamamlayıcıdır (A–U, G–C).','Bu kodon aynı zamanda başlangıç kodonudur.'], exp:'<b>AUG</b> (başlangıç kodonu)' },
{ topic:'Protein sentezi', svg:BIO.trna(), q:'AUG başlangıç kodonuna karşılık gelen, şekildeki tRNA’nın taşıdığı amino asit hangisidir?',
  a:['Metiyonin','metionin','Met'], hints:['Protein sentezi her zaman bu amino asitle başlar.','Kısaltması “Met”.'], exp:'<b>Metiyonin</b>' },
{ topic:'Protein sentezi', svg:BIO.ribosome(), q:'Şekilde ribozomda “?” ile gösterilen, iki amino asit arasında kurulan bağın adı nedir?',
  a:['Peptit bağı','peptid bağı','peptit'], not:['hidrojen bağı','fosfodiester','glikozit'], hints:['Amino asitler arasında su çıkışıyla kurulur.','Proteinlere “polipeptit” de denir.'], exp:'<b>Peptit bağı</b>' },
{ topic:'Protein sentezi', q:'DNA üzerindeki genden RNA sentezlenmesini sağlayan enzim hangisidir?',
  a:['RNA polimeraz','rna polimeraz enzimi'], not:['DNA polimeraz','ligaz','helikaz'], hints:['Replikasyondaki DNA polimerazın RNA için olan karşılığı.','“RNA …” (iki kelime)'], exp:'<b>RNA polimeraz</b>' },
{ topic:'Protein sentezi', svg:BIO.cell(), q:'Ökaryot hücrede transkripsiyon, şekildeki 1 numaralı yapıda gerçekleşir. Bu yapının adı nedir?',
  a:['Çekirdek','nükleus','cekirdek'], not:['ribozom','sitoplazma'], hints:['DNA’nın bulunduğu, zarla çevrili bölüm.','Hücrenin yönetim merkezi.'], exp:'<b>Çekirdek</b>' },
{ topic:'Protein sentezi', svg:BIO.cell(), q:'Şekilde 2 numara ile gösterilen, translasyonun gerçekleştiği küçük organel hangisidir?',
  a:['Ribozom','ribozomlar'], not:['lizozom','çekirdek','mitokondri'], hints:['Zarsız, çok küçük bir organeldir; rRNA ve proteinden oluşur.','“R” ile başlar.'], exp:'<b>Ribozom</b>' }
];
