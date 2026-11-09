/* Fizik · Zor seviye: çizimli, hesaplamalı ve yorum gerektiren sorular */
var FIZZ = (function(){
  var t=S.t, l=S.l, c=S.c, r=S.r, p=S.p, q=S.q, W=S.wrap, dot=S.dot;
  function info(lines,x,y){ return lines.map(function(s,i){ return t(x||12,(y||20)+i*20,s,{a:'start',s:13.5}); }).join(''); }
  function sun(x,y){ var s=c(x,y,14,'f3'); for(var i=0;i<8;i++){ var a=i*Math.PI/4; s+=l((x+19*Math.cos(a)).toFixed(1),(y+19*Math.sin(a)).toFixed(1),(x+25*Math.cos(a)).toFixed(1),(y+25*Math.sin(a)).toFixed(1),'k3'); } return s; }
  function graph(pts, opt){
    opt=opt||{};
    var x0=opt.x0||48, y0=opt.y0||176, xw=opt.xw||260, yh=opt.yh||138;
    var xmax=opt.xmax||10, ymax=opt.ymax||10;
    var X=function(x){ return x0 + x/xmax*xw; }, Y=function(y){ return y0 - y/ymax*yh; };
    var b = l(x0,y0,x0+xw,y0,'ink','ar')+l(x0,y0,x0,y0-yh,'ink','ar');
    b += t(x0+xw+4,y0+16, opt.xl||'x',{a:'end',s:12,i:1});
    b += t(x0-10,y0-yh-4, opt.yl||'y',{a:'end',s:12,i:1});
    if(opt.dashed) b += '<polyline points="'+opt.dashed.map(function(pt){return X(pt[0]).toFixed(1)+','+Y(pt[1]).toFixed(1);}).join(' ')+'" class="dash"/>';
    b += '<polyline points="'+pts.map(function(pt){return X(pt[0]).toFixed(1)+','+Y(pt[1]).toFixed(1);}).join(' ')+'" class="sacc"/>';
    (opt.dots===false?[]:pts).forEach(function(pt){ b+=dot(X(pt[0]),Y(pt[1]),3.5); });
    (opt.xTicks||[]).forEach(function(xv){ b+=l(X(xv),y0,X(xv),y0+5,'thin')+t(X(xv),y0+17,String(xv),{s:11,c:'mut'}); });
    (opt.yTicks||[]).forEach(function(yv){ b+=l(x0,Y(yv),x0-5,Y(yv),'thin')+t(x0-9,Y(yv),String(yv),{a:'end',s:11,c:'mut'}); });
    return W(opt.w||340, opt.h||210, b+(opt.extra||''));
  }
  function compoundGears(){
    var b=c(120,120,40,'f1')+dot(120,120)+t(120,120,'X',{s:13,b:1});
    b+=c(270,120,90,'f3')+dot(270,120)+t(270,120,'Y',{s:13,b:1});
    b+=l(112,84,248,38,'ink')+l(112,156,248,202,'ink');
    b+=l(120,120,160,120,'dash')+t(140,110,'r',{s:12,i:1});
    b+=l(270,120,340,120,'dash')+t(305,110,'3r',{s:12,i:1});
    b+=t(120,178,'f = 15 tur/s',{s:13})+q(340,60,'?');
    return W(380,220,b);
  }
  function conical(){
    var b=l(170,30,170,190,'thin')+t(170,210,'tavan',{s:12,c:'mut'});
    var px=170+120, py=140;
    b+=l(170,30,px,py,'ink')+t(200,84,'L',{s:13,i:1});
    b+=p('M158,30 A12,8 0 0 0 182,30','ink')+t(192,40,'θ',{i:1,s:13});
    b+=c(px,py,10,'f4')+t(px,py,'m',{s:12,b:1});
    b+=l(px,py,170,140,'dash')+t(px-30,132,'r',{s:12,i:1});
    b+=p('M'+(px-40)+',116 A42,42 0 0 1 '+(px-30)+',100','ink','ar');
    b+=info(['m = 0,5 kg','r = 2 m','v = 4 m/s','g = 10 m/s²'],12,20);
    return W(360,220,b);
  }
  function rollingKE(){
    var b=l(20,190,340,190,'ink')+c(170,120,70,'f1')+dot(170,120);
    b+=l(170,120,232,120,'k4','ar4')+t(242,120,'v',{a:'start',i:1,b:1});
    b+=l(170,50,170,120,'dash')+t(180,84,'r',{s:12,i:1});
    b+=p('M214,66 A70,70 0 0 1 240,96','ink','ar');
    b+=t(170,214,'Kaymadan yuvarlanan silindir',{s:12,c:'mut'});
    return W(360,226,b);
  }
  function rodMasses(){
    var b=l(40,110,320,110,'thin')+c(160,110,6,'f3')+t(160,90,'dönme ekseni',{s:12,c:'mut'});
    b+=c(280,110,14,'f4')+t(280,111,'m',{s:12})+l(160,132,280,132,'dash')+t(220,144,'2r',{i:1});
    b+=c(100,110,14,'f4')+t(100,111,'2m',{s:12})+l(160,156,100,156,'dash')+t(130,168,'r',{i:1});
    b+=t(180,196,'Çubuğun kütlesi önemsiz',{s:12,c:'mut'});
    return W(360,208,b);
  }
  function keplerRatio(){
    var b=c(50,190,18,'f3')+sun(50,190);
    b+=p('M50,150 A40,40 0 0 1 90,190','dash')+p('M50,0 A190,190 0 0 1 240,190','dash');
    var ax=50+40*Math.cos(-0.8), ay=190+40*Math.sin(-0.8), bx=50+190*Math.cos(-0.8), by=190+190*Math.sin(-0.8);
    b+=c(ax,ay,6,'f1')+t(ax+14,ay-6,'X',{b:1})+c(bx,by,6,'f1')+t(bx+14,by-6,'Y',{b:1});
    b+=l(50,206,90,206,'thin')+t(70,220,'r',{s:12})+l(50,228,240,228,'thin')+t(145,242,'4r',{s:12});
    return W(300,252,b);
  }
  function escape(){
    var b=c(150,140,70,'f1')+dot(150,140)+t(150,140,'M',{s:14,b:1});
    b+=p('M150,60 A80,80 0 0 0 150,220','dash');
    b+=l(150,140,222,140,'ink','ar')+t(196,128,'R',{i:1});
    b+=c(150,60,7,'f4')+l(150,53,150,20,'k4','ar4')+t(150,12,'v',{i:1,b:1});
    b+=t(150,246,'Kütle M, yarıçap R',{s:12,c:'mut'});
    return W(300,262,b);
  }
  function vtGraph(){
    return graph([[0,0],[4,10],[8,10]], {xmax:8, ymax:12, xl:'t (s)', yl:'v (m/s)', xTicks:[2,4,6,8], yTicks:[4,8,12], extra:info(['v–t grafiği'],12,20)});
  }
  function massVolGraph(){
    return graph([[0,0],[30,90]], {xmax:30, ymax:120, xl:'V (cm³)', yl:'m (g)', xTicks:[10,20,30], yTicks:[30,60,90,120], extra:dot(30,90,3.5)});
  }
  function pressureBlocks(){
    var b=l(20,200,380,200,'thin');
    b+=r(60,200-90,60,90,'f1',4)+t(90,150,'K',{b:1});
    b+=r(200,200-70,140,70,'f3',4)+t(270,160,'L',{b:1});
    b+=t(90,120,'G',{s:12})+t(270,120,'G',{s:12});
    b+=l(60,214,120,214,'thin')+t(90,228,'S',{s:12})+l(200,214,340,214,'thin')+t(270,228,'2S',{s:12});
    b+=info(['K ve L aynı ağırlıkta katı bloklar'],8,18);
    return W(400,240,b);
  }
  function mixture(){
    var b='';
    var cup=function(x,temp,col){ return '<path d="M'+x+',60 L'+(x+20)+',170 L'+(x+90)+',170 L'+(x+110)+',60" class="ink"/>'+r(x+16,110,78,58,col,4)+t(x+55,88,temp,{s:13,b:1}); };
    b+=cup(30,'80 °C','f4')+cup(210,'20 °C','f1')+t(85,196,'200 g su',{s:12})+t(265,196,'300 g su',{s:12});
    b+=t(170,40,'→',{s:22})+q(170,24,'?');
    b+=info(['Isı alışverişi yalnızca sular arasında'],8,18);
    return W(380,214,b);
  }
  function river(){
    var b=l(20,120,380,120,'dash');
    b+=r(150,90,50,26,'f1',4)+t(175,103,'kayık',{s:11});
    b+=l(175,103,240,103,'k4','ar4')+t(250,103,'v_s = 5 m/s',{a:'start',s:12,i:1});
    b+=l(175,90,175,40,'k2','ar')+t(175,30,'akıntı = 12 m/s',{s:12,i:1});
    b+=t(20,140,'nehir kıyıları',{s:12,c:'mut'});
    b+=info(['Kayık akıntıya dik yöneliyor'],8,18);
    return W(400,164,b);
  }
  function spring(){
    var b=l(40,60,60,60,'ink');
    for(var i=0;i<7;i++){ var x=60+i*26; b+=l(x,60,x+13,42,'ink')+l(x+13,42,x+26,60,'ink'); }
    b+=l(250,60,300,60,'ink')+r(300,46,34,28,'f4',4)+t(317,60,'m',{s:12});
    b+=l(250,60,300,60,'ink');
    b+=l(40,60,40,150,'dash')+l(300,60,300,150,'dash');
    b+=l(40,120,250,120,'k1','ar1')+t(145,108,'k = 200 N/m',{s:12,i:1});
    b+=info(['x = 0,2 m sıkıştırma'],8,20);
    return W(360,166,b);
  }
  function collision(){
    var b=c(90,120,26,'f1')+t(90,120,'2 kg',{s:11})+l(120,120,180,120,'k4','ar4')+t(150,106,'v=3 m/s',{s:11,i:1});
    b+=c(280,120,30,'f3')+t(280,120,'3 kg',{s:11})+t(280,166,'durgun',{s:11,c:'mut'});
    b+=t(185,190,'çarpışma sonrası birlikte hareket',{s:12,c:'mut'});
    return W(360,208,b);
  }
  function dropHeight(){
    var b=l(40,40,340,40,'thin')+l(190,40,190,210,'dash');
    b+=c(190,60,8,'f4')+t(206,60,'v₀ = 0',{a:'start',s:12});
    b+=l(40,210,340,210,'ink');
    b+=l(40,40,40,210,'thin')+t(30,120,'h = 45 m',{a:'start',s:12,i:1});
    b+=q(190,120,'?')+t(190,150,'v = ?',{s:12,c:'mut'});
    b+=info(['g = 10 m/s²  (sürtünme yok)'],8,20);
    return W(360,228,b);
  }
  function minLoopHeight(){
    var b=l(20,200,360,200,'thin')+c(250,150,50,'ink');
    b+=c(60,30,8,'f4')+t(78,22,'v=0',{a:'start',s:12});
    b+=l(30,30,30,198,'dash')+t(20,110,'h = ?',{a:'start',s:12,i:1});
    b+=dot(250,100,4)+t(250,88,'C',{b:1})+dot(250,150)+t(232,150,'O',{s:11,i:1});
    b+=l(250,150,300,150,'dash')+t(275,142,'R',{s:12,i:1});
    b+=info(['Sürtünmesiz ray, çember yarıçapı R'],8,20);
    return W(380,222,b);
  }
  return {compoundGears:compoundGears, conical:conical, rollingKE:rollingKE, rodMasses:rodMasses, keplerRatio:keplerRatio, escape:escape,
    vtGraph:vtGraph, massVolGraph:massVolGraph, pressureBlocks:pressureBlocks, mixture:mixture, river:river, spring:spring,
    collision:collision, dropHeight:dropHeight, minLoopHeight:minLoopHeight};
})();

var Q_FIZIK_ZOR = [
{ topic:'Çembersel hareket · kasnaklar', svg:FIZZ.compoundGears(), q:'Kayışla birbirine bağlı X (yarıçap r) ve Y (yarıçap 3r) kasnakları vardır. X kasnağı saniyede 15 tur atıyorsa Y kasnağı saniyede kaç tur atar?',
  num:5, hints:['Kayışlı sistemde kasnakların çizgisel hızları eşittir.','v = 2π·r·f → r_X·f_X = r_Y·f_Y'], exp:'r·15 = 3r·f_Y → <b>f_Y = 5 tur/s</b>' },

{ topic:'Çembersel hareket uygulamaları', svg:FIZZ.conical(), q:'Uzunluğu L olan ipe bağlı 0,5 kg kütle yatay düzlemde r = 2 m yarıçaplı konik sarkaç hareketi yapıyor. Cismin hızı 4 m/s ise ipin düşeyle yaptığı açının tanjantı (tanθ) kaçtır? (g = 10 m/s²)',
  num:0.8, hints:['Düşeyde: T·cosθ = mg.','Yatayda merkezcil: T·sinθ = m·v²/r','Taraf tarafa böl: tanθ = v²/(r·g)'], exp:'tanθ = v²/(r·g) = 16/(2·10) = <b>0,8</b>' },

{ topic:'Çembersel hareket uygulamaları', svg:FIZZ.rollingKE(), q:'Kaymadan yuvarlanan bir silindirin (I = ½·m·r²) toplam kinetik enerjisi, yalnızca öteleme kinetik enerjisinin kaç katıdır?',
  num:1.5, a:['3/2','1,5','1.5'], hints:['Toplam KE = ½·m·v² + ½·I·ω²','Kaymadan yuvarlanma: v = ω·r → I·ω² = ½·m·v²'], exp:'E_toplam = ½mv² + ¼mv² = ¾mv² → oran = <b>3/2</b>' },

{ topic:'Eylemsizlik momenti', svg:FIZZ.rodMasses(), q:'Kütlesi önemsiz bir çubuğa, dönme ekseninden r uzaklığa 2m ve 2r uzaklığa m kütleleri sabitlenmiştir. Sistemin eksene göre eylemsizlik momenti kaç m·r²’dir?',
  num:6, hints:['Her nokta kütle için I = m·d².','(2m)·r² + m·(2r)²'], exp:'I = 2m·r² + m·4r² = <b>6·m·r²</b>' },

{ topic:'Açısal momentum', q:'Eylemsizlik momenti 6 kg·m² olan bir disk 4 rad/s açısal hızla dönerken üzerine ikinci bir disk düşüyor ve sistemin eylemsizlik momenti 2 kg·m² oluyor. Sistemin yeni açısal hızı kaç rad/s olur?',
  num:12, hints:['Dış tork yoksa açısal momentum korunur.','I₁·ω₁ = I₂·ω₂'], exp:'6·4 = 2·ω₂ → <b>ω₂ = 12 rad/s</b>' },

{ topic:'Kütle çekimi ve Kepler', svg:FIZZ.keplerRatio(), q:'Aynı gezegen çevresinde r ve 4r yarıçaplı yörüngelerde dolanan X ve Y uydularının periyotları T_X ve T_Y’dir. T_Y / T_X oranı kaçtır?',
  num:8, hints:['Kepler’in 3. yasası: T² ∝ r³.','(T_Y/T_X)² = (4)³ = 64'], exp:'(T_Y/T_X)² = 64 → T_Y/T_X = <b>8</b>' },

{ topic:'Kütle çekimi ve Kepler', svg:FIZZ.escape(), q:'Bir gezegenin yüzeyindeki yörünge (dolana bilir) hızı v ise, yüzeyden kaçış hızı bunun kaç katıdır?',
  num:1.41, a:['√2','kök 2','karekok 2'], hints:['Yörünge hızı: v = √(GM/R)','Kaçış hızı: v_kaçış = √(2GM/R)'], exp:'v_kaçış = √2 · v ≈ <b>1,41 katı</b>' },

{ topic:'Hareket · grafik', svg:FIZZ.vtGraph(), q:'Şekildeki hız–zaman grafiğinde cisim 0–4 s arası düzgün hızlanıp 4–8 s arası sabit hızla gidiyor. Cisim 0–8 s arasında toplam kaç metre yer değiştirmiştir?',
  num:60, hints:['Yer değiştirme, v–t grafiğinin altındaki alandır.','Üçgen (0–4 s) + dikdörtgen (4–8 s)'], exp:'A = ½·4·10 + 4·10 = 20 + 40 = <b>60 m</b>' },

{ topic:'Madde ve özellikleri · grafik', svg:FIZZ.massVolGraph(), q:'Aynı maddeden yapılmış bir cismin kütle–hacim grafiği şekildeki gibidir. Bu maddenin özkütlesi kaç g/cm³’tür?',
  num:3, hints:['Özkütle, kütle–hacim doğrusunun eğimidir.','d = m / V'], exp:'d = 90/30 = <b>3 g/cm³</b>' },

{ topic:'Basınç', svg:FIZZ.pressureBlocks(), q:'Ağırlıkları eşit K ve L katı bloklarının yere temas eden yüzey alanları sırasıyla S ve 2S’dir. Blokların yere uyguladığı basınçların oranı P_K / P_L kaçtır?',
  num:2, hints:['Katı basıncı P = G / A.','A alanı büyüdükçe basınç azalır.'], exp:'P_K/P_L = (G/S)/(G/2S) = <b>2</b>' },

{ topic:'Isı ve sıcaklık', svg:FIZZ.mixture(), q:'Aynı cins sıvıdan 200 g (80 °C) ile 300 g (20 °C) bir kapta karıştırılıyor. Isı kaybı yoksa karışımın denge sıcaklığı kaç °C olur?',
  num:44, hints:['Alınan ısı = verilen ısı: m₁·c·(T−T₁) = m₂·c·(T₂−T)','c’ler sadeleşir; sadece kütle ve sıcaklıklar kalır.'], exp:'T = (200·80 + 300·20)/(200+300) = 22000/500 = <b>44 °C</b>' },

{ topic:'Hareket · bağıl hız', svg:FIZZ.river(), q:'Bir kayık, akıntı hızı 12 m/s olan nehirde akıntıya dik yönde 5 m/s hızla kürek çekiyor. Kayığın yere (kıyıya) göre hızı kaç m/s’dir?',
  num:13, hints:['Dik iki hız vektörünün bileşkesi.','Pisagor: v = √(v₁² + v₂²)'], exp:'v = √(5² + 12²) = √169 = <b>13 m/s</b>' },

{ topic:'Enerji', svg:FIZZ.spring(), q:'Yay sabiti 200 N/m olan bir yay 0,2 m sıkıştırılmıştır. Yayda depolanan esneklik potansiyel enerjisi kaç joule’dür?',
  num:4, hints:['Yay enerjisi: E = ½·k·x²','x² = 0,2² = 0,04'], exp:'E = ½·200·0,04 = <b>4 J</b>' },

{ topic:'İtme ve momentum', svg:FIZZ.collision(), q:'Kütlesi 2 kg olan cisim 3 m/s hızla, durgun hâldeki 3 kg kütleli cisme çarpıp birlikte hareket ediyor. Ortak hızları kaç m/s’dir?',
  num:1.2, a:['6/5','1,2','1.2'], hints:['Çarpışmada momentum korunur.','m₁·v₁ = (m₁ + m₂)·v'], exp:'2·3 = (2+3)·v → v = 6/5 = <b>1,2 m/s</b>' },

{ topic:'Enerji', svg:FIZZ.dropHeight(), q:'Sürtünmesiz ortamda 45 m yükseklikten serbest bırakılan bir cisim yere kaç m/s hızla çarpar? (g = 10 m/s²)',
  num:30, hints:['Potansiyel enerji kinetik enerjiye dönüşür.','v = √(2·g·h)'], exp:'v = √(2·10·45) = √900 = <b>30 m/s</b>' },

{ topic:'Raylı sistemler', svg:FIZZ.minLoopHeight(), q:'Sürtünmesiz ray, yarıçapı R olan çemberin en üst noktasından cismin raya değmesi (gevşememesi) için cisim en az hangi yükseklikten bırakılmalıdır? (yükseklik R cinsinden)',
  num:2.5, a:['5/2','2,5','2.5'], hints:['En üst noktada: m·g = m·v²/R → v² = g·R','Enerji korunumu: m·g·h = m·g·(2R) + ½·m·v²'], exp:'g·h = 2gR + ½gR = 2,5gR → h = <b>2,5R</b>' },

{ topic:'Çembersel hareket uygulamaları', q:'Düşey düzlemde ipe bağlı 0,5 kg kütle, r = 0,5 m yarıçaplı çemberin en alt noktasından 5 m/s hızla geçiyor. Bu noktada ipteki gerilme kuvveti kaç N’dur? (g = 10 m/s²)',
  num:30, hints:['En alt noktada T − mg = m·v²/r.','T = m·g + m·v²/r'], exp:'T = 0,5·10 + 0,5·25/0,5 = 5 + 25 = <b>30 N</b>' },

{ topic:'Çembersel hareket uygulamaları', q:'Sürtünme katsayısı 0,4 olan yatay yolda 25 m yarıçaplı virajı kaymadan dönebilecek en büyük hız kaç m/s’dir? (g = 10 m/s²)',
  num:10, hints:['Merkezcil kuvveti sürtünme sağlar: μ·m·g = m·v²/r.','v = √(μ·g·r)'], exp:'v = √(0,4·10·25) = √100 = <b>10 m/s</b>' }
];
