var FIZ = (function(){
  var t=S.t, l=S.l, c=S.c, r=S.r, p=S.p, q=S.q, W=S.wrap, dot=S.dot;
  function info(lines,x,y){ return lines.map(function(s,i){ return t(x||12,(y||20)+i*20,s,{a:'start',s:13.5}); }).join(''); }
  function circ(lines, opt){
    opt=opt||{}; var b='';
    b+=c(170,125,88,'ink')+dot(170,125)+t(160,140,'O',{s:13,i:1});
    b+=l(170,125,258,125,'dash')+t(214,113,'r',{i:1});
    b+=c(258,125,8,'f4')+l(258,117,258,52,'k4','ar4')+t(272,58,'v',{i:1,b:1});
    if(opt.arc) b+=p('M232,62 A88,88 0 0 0 195,40','sacc','ara');
    b+=info(lines,8,22);
    return W(330,230,b);
  }
  function coaxial(){
    var b=c(150,120,90,'f3')+c(150,120,42,'f1')+dot(150,120)+t(140,134,'O',{s:13,i:1});
    b+=l(150,120,192,120,'dash')+t(171,110,'r',{s:12,i:1})+l(150,120,150,30,'dash')+t(160,72,'2r',{s:12,i:1});
    b+=dot(192,120,4)+t(204,132,'K',{b:1})+dot(150,30,4)+t(162,24,'L',{b:1});
    b+=p('M225,70 A90,90 0 0 1 238,100','ink','ar');
    b+=t(150,228,'K ve L aynı mile perçinli (eş merkezli)',{s:12,c:'mut'});
    return W(300,240,b);
  }
  function belt(){
    var b=c(80,120,30,'f1')+c(260,120,90,'f3')+dot(80,120)+dot(260,120);
    // dış ortak teğetler (yaklaşık)
    b+=l(70,91.7,230,35,'ink')+l(70,148.3,230,205,'ink');
    b+=l(80,120,110,120,'dash')+t(95,110,'r',{s:12,i:1})+l(260,120,350,120,'dash')+t(305,110,'3r',{s:12,i:1});
    b+=t(80,172,'X',{b:1})+t(260,226,'Y',{b:1})+t(80,30,'f = 6 tur/s',{s:13})+q(300,60,'?');
    return W(370,240,b);
  }
  function avgacc(){
    var b=c(150,140,90,'ink')+dot(150,140)+t(140,154,'O',{s:13,i:1});
    b+=p('M240,140 A90,90 0 0 0 150,50','sacc','ara');
    b+=dot(240,140,4)+t(254,150,'A',{b:1})+dot(150,50,4)+t(150,36,'B',{b:1});
    b+=l(240,140,240,80,'k4','ar4')+t(255,90,'v',{i:1})+l(150,50,90,50,'k4','ar4')+t(96,38,'v',{i:1});
    b+=info(['v = 2 m/s','A → B : 2 s'],8,20);
    return W(300,240,b);
  }
  function hstring(){
    var b='<g transform="translate(70,10)">'+c(150,120,80,'dash')+dot(150,120)+t(140,134,'O',{s:13,i:1});
    b+=l(150,120,222,120,'ink')+c(230,120,9,'f4')+t(244,138,'m',{i:1});
    b+=l(222,120,180,120,'k1','ar1')+t(200,108,'T',{b:1,c:'t1'});
    b+=l(230,111,230,50,'k4','ar4')+t(244,56,'v',{i:1})+'</g>';
    b+=info(['Üstten görünüm','m = 0,5 kg','r = 1 m','v = 4 m/s'],8,20);
    return W(360,226,b);
  }
  function vcircle(lines){
    var b='<g transform="translate(50,0)">'+c(170,130,85,'ink')+dot(170,130)+t(158,140,'O',{s:12,i:1});
    b+=l(170,130,170,45,'dash')+l(170,130,170,215,'dash');
    b+=c(170,45,8,'f4')+t(170,24,'C',{b:1})+c(170,215,8,'f4')+t(188,226,'F',{b:1});
    b+=t(72,130,'D',{b:1})+t(268,130,'A',{b:1})+dot(85,130,3)+dot(255,130,3);
    b+=l(150,45,150,82,'k1','ar1')+t(140,70,'mg',{s:11,a:'end'})+l(150,215,150,250,'k1','ar1')+t(140,240,'mg',{s:11,a:'end'});
    b+=p('M240,70 A85,85 0 0 1 252,100','ink','ar')+'</g>';
    b+=info(lines||['Düşey düzlem'],8,20);
    return W(390,262,b);
  }
  function flatcurve(){
    var b='';
    b+=p('M40,175 A190,190 0 0 1 400,175','ink')+p('M90,190 A140,140 0 0 1 350,190','ink');
    b+=dot(220,215)+t(232,222,'O',{s:12,i:1});
    b+='<g transform="translate(220,48)"><rect x="-22" y="-12" width="44" height="24" rx="6" class="f1"/></g>';
    b+=l(220,62,220,118,'k4','ar4')+t(236,96,'fs',{b:1,c:'t4'});
    b+=l(220,130,220,210,'dash')+t(232,170,'r',{i:1});
    b+=l(250,48,300,56,'ink','ar')+t(310,62,'v',{i:1,a:'start'});
    b+=info(['Yatay, eğimsiz viraj'],8,20);
    return W(440,232,b);
  }
  function banked(){
    var b='';
    b+=l(20,210,330,210,'thin')+p('M60,210 L250,20','ink');
    b+=p('M100,210 A40,40 0 0 0 88,182','ink')+t(110,192,'θ',{i:1});
    b+='<g transform="translate(158,104) rotate(-45)"><rect x="-26" y="-30" width="52" height="30" rx="6" class="f1"/></g>';
    var cx=147,cy=93;
    b+=l(cx,cy,cx-50,cy-50,'k2','ar')+t(cx-60,cy-58,'N',{b:1,c:'t2'});
    b+=l(cx,cy,cx,cy+80,'k1','ar1')+t(cx+14,cy+76,'mg',{c:'t1'});
    b+=l(cx,cy,cx-80,cy,'dash','ar')+t(cx-80,cy+16,'merkez yönü',{s:11,a:'start',c:'mut'});
    b+=info(['Eğimli viraj (kesit)'],210,190);
    return W(340,224,b);
  }
  function rotor(){
    var b='';
    b+='<ellipse cx="160" cy="40" rx="100" ry="18" class="ink"/>'+l(60,40,60,210,'ink')+l(260,40,260,210,'ink')+p('M60,210 A100,18 0 0 0 260,210','ink')+p('M60,210 A100,18 0 0 1 260,210','dash');
    b+=l(160,20,160,232,'dash')+p('M140,14 A22,8 0 1 0 182,14','ink','ar');
    b+=r(236,112,22,26,'f4',4);
    b+=l(236,125,186,125,'k2','ar')+t(196,112,'N',{b:1,c:'t2'});
    b+=l(247,112,247,70,'k3','ar')+t(266,76,'fs',{b:1,c:'t3'});
    b+=l(247,138,247,182,'k1','ar1')+t(268,178,'mg',{c:'t1'});
    return W(320,240,b);
  }
  function loop(){
    var b='';
    b+=l(20,220,380,220,'thin');
    b+=p('M40,40 C60,170 140,220 280,220','ink')+c(280,165,55,'ink');
    b+=c(40,32,8,'f4')+t(56,22,'v = 0',{s:12,a:'start'});
    b+=l(20,40,20,218,'dash')+t(10,130,'h=5r',{s:12,a:'start'});
    b+=dot(280,220,4)+t(280,236,'A',{b:1})+dot(335,165,4)+t(350,165,'B',{b:1})+dot(280,110,4)+t(280,96,'C',{b:1});
    b+=dot(280,165)+l(280,165,335,165,'dash')+t(305,155,'r',{i:1,s:12});
    b+=info(['Sürtünmesiz ray'],230,20);
    return W(400,246,b);
  }
  function rolling(){
    var b=l(20,190,340,190,'ink')+c(170,115,75,'f1')+dot(170,115);
    b+=l(170,115,230,115,'k4','ar4')+t(240,115,'v',{a:'start',i:1,b:1});
    b+=dot(170,40,4)+q(196,32,'?')+dot(170,190,4)+q(196,176,'?');
    b+=p('M215,62 A75,75 0 0 1 238,88','ink','ar');
    b+=t(170,214,'Kaymadan yuvarlanan teker',{s:12,c:'mut'});
    return W(360,226,b);
  }
  function inertia(kind){
    var b='';
    if(kind===1){
      b+=l(60,90,280,90,'thin')+c(170,90,6,'f3')+c(90,90,13,'f4')+c(250,90,13,'f4')+t(90,91,'m',{s:12})+t(250,91,'m',{s:12});
      b+=l(170,110,90,110,'dash')+t(130,122,'r',{i:1})+l(170,110,250,110,'dash')+t(210,122,'r',{i:1});
      b+=t(170,60,'dönme ekseni',{s:12,c:'mut'})+l(170,66,170,84,'thin');
    } else {
      b+=l(60,90,300,90,'thin')+c(70,90,6,'f3')+c(160,90,13,'f4')+c(250,90,13,'f4')+t(160,91,'m',{s:12})+t(250,91,'m',{s:12});
      b+=l(70,112,160,112,'dash')+t(115,124,'r',{i:1})+l(70,132,250,132,'dash')+t(160,146,'2r',{i:1});
      b+=t(70,60,'dönme ekseni',{s:12,c:'mut'})+l(70,66,70,84,'thin');
    }
    b+=t(170,170,'Çubuğun kütlesi önemsiz',{s:12,c:'mut'});
    return W(340,184,b);
  }
  function skater(){
    var fig=function(x,open){ var s=c(x,40,12,'ink')+l(x,52,x,110,'ink')+l(x,110,x-16,150,'ink')+l(x,110,x+16,150,'ink');
      s+= open ? l(x-70,70,x+70,70,'ink') : p('M'+(x-14)+',66 L'+(x-4)+',80 M'+(x+14)+',66 L'+(x+4)+',80','ink');
      return s; };
    var b=fig(100,true)+fig(280,false);
    b+=p('M80,18 A22,8 0 1 0 122,18','ink','ar')+t(100,6,'ω₁',{s:13})+p('M260,18 A22,8 0 1 0 302,18','ink','ar')+q(318,22,'?');
    b+=t(100,174,'Kollar açık',{s:12,c:'mut'})+t(280,174,'Kollar kapalı',{s:12,c:'mut'});
    return W(380,186,b);
  }
  function sun(x,y){ var s=c(x,y,14,'f3'); for(var i=0;i<8;i++){ var a=i*Math.PI/4; s+=l((x+19*Math.cos(a)).toFixed(1),(y+19*Math.sin(a)).toFixed(1),(x+25*Math.cos(a)).toFixed(1),(y+25*Math.sin(a)).toFixed(1),'k3'); } return s; }
  function kepler(){
    var b='<ellipse cx="200" cy="110" rx="160" ry="90" class="dash"/>'+sun(68,110);
    b+=dot(40,110,5)+t(26,110,'X',{b:1})+dot(200,20,5)+t(200,8,'Y',{b:1})+dot(360,110,5)+t(376,110,'Z',{b:1});
    b+=t(68,148,'Güneş',{s:12,c:'mut'});
    return W(400,210,b);
  }
  function planets(){
    var b=c(100,200,40,'f3')+c(270,200,50,'f2');
    b+=l(100,200,100,138,'ink','ar')+t(112,170,'r',{i:1})+c(100,130,8,'f1')+t(100,114,'X',{b:1});
    b+=l(270,200,270,68,'ink','ar')+t(284,140,'2r',{i:1})+c(270,60,8,'f1')+t(270,44,'X',{b:1});
    b+=t(100,256,'M₁',{b:1})+t(270,262,'M₂',{b:1});
    b+=info(['X cisimlerinin ağırlıkları eşit'],8,18);
    return W(350,276,b);
  }
  function ellsat(){
    var b='<ellipse cx="230" cy="100" rx="150" ry="62" class="dash"/>'+sun(200,100);
    b+=c(80,100,7,'f1')+t(80,82,'X',{b:1})+c(380,100,7,'f1')+t(380,82,'Y',{b:1});
    b+=l(88,124,192,124,'thin')+t(140,138,'2R',{s:12})+l(208,124,372,124,'thin')+t(290,138,'3R',{s:12});
    b+=t(200,176,'Güneş etrafında dolanan uydu',{s:12,c:'mut'});
    return W(400,190,b);
  }
  function earthsat(){
    var b=c(110,140,48,'f1')+dot(110,140);
    var a=-0.45, sx=110+192*Math.cos(a), sy=140+192*Math.sin(a), ex=110+48*Math.cos(a), ey=140+48*Math.sin(a);
    b+=l(110,140,ex,ey,'ink')+t(126,118,'R',{i:1,s:13})+l(ex,ey,sx,sy,'dash')+t((ex+sx)/2+8,(ey+sy)/2+12,'x',{i:1});
    b+=r(sx-8,sy-8,16,16,'f4',3)+t(sx+12,sy-14,'G/16',{a:'start',s:12});
    b+=t(110,206,'Dünya (yüzeyde ağırlık G)',{s:12,c:'mut'});
    return W(360,220,b);
  }
  function orbits(){
    var b=c(50,200,16,'f3')+p('M50,150 A50,50 0 0 1 100,200','dash')+p('M50,0 A200,200 0 0 1 250,200','dash');
    var ax=50+50*Math.cos(-0.8), ay=200+50*Math.sin(-0.8), bx=50+200*Math.cos(-0.8), by=200+200*Math.sin(-0.8);
    b+=c(ax,ay,6,'f1')+t(ax+14,ay-6,'X',{b:1})+c(bx,by,6,'f1')+t(bx+14,by-6,'Y',{b:1});
    b+=l(50,200,ax,ay,'thin')+t(70,200-14,'',{})+l(50,214,100,214,'thin')+t(75,226,'R',{s:12})+l(50,234,250,234,'thin')+t(150,246,'4R',{s:12});
    return W(300,252,b);
  }
  function overflow(){
    var b='';
    var cup=function(x,water,ball){
      var s=l(x,40,x,170,'ink')+l(x,170,x+110,170,'ink')+l(x+110,170,x+110,40,'ink')+p('M'+(x+110)+',80 l28,-10','ink');
      s+=r(x+2,water,106,168-water,'f1',0);
      if(ball) s+=c(x+55,150,18,'f4');
      return s; };
    b+=cup(30,125,false)+cup(220,80,true);
    b+=l(30,80,140,80,'dash')+t(26,80,'120 cm³',{a:'end',s:11})+t(26,125,'60 cm³',{a:'end',s:11});
    b+=r(352,130,40,40,'f1',2)+t(400,150,'48 cm³',{a:'start',s:11});
    b+=t(85,190,'Şekil I',{s:12})+t(275,190,'Şekil II',{s:12});
    return W(460,202,b).replace('viewBox="0 0 460 202"','viewBox="-30 0 490 202"');
  }
  function cylinders(){
    var b=l(20,190,380,190,'thin');
    var cy=function(x,w,h,name){ return r(x,190-h,w,h,'f1',4)+'<ellipse cx="'+(x+w/2)+'" cy="'+(190-h)+'" rx="'+(w/2)+'" ry="6" class="f1"/>'+t(x+w/2,190-h/2,name,{b:1}); };
    b+=cy(40,30,120,'K')+cy(120,60,60,'L')+cy(230,90,60,'M');
    b+=t(55,206,'S',{s:12})+t(150,206,'2S',{s:12})+t(275,206,'3S',{s:12});
    b+=t(30,130,'2h',{a:'end',s:12})+t(112,160,'h',{a:'end',s:12})+t(222,160,'h',{a:'end',s:12});
    b+=info(['Aynı maddeden yapılmış silindirler'],8,18);
    return W(380,214,b);
  }
  function semicircle(){
    var b=l(20,150,320,150,'thin')+p('M70,150 A100,100 0 0 1 270,150','ink','ar');
    b+=dot(70,150,4)+t(70,168,'A',{b:1})+dot(270,150,4)+t(270,168,'B',{b:1})+dot(170,150)+t(170,168,'O',{s:12,i:1});
    b+=l(170,146,270,146,'dash')+t(220,134,'r = 10 m',{s:12});
    b+=info(['Süre: 5 s  (π = 3)'],8,18);
    return W(340,180,b);
  }
  return {circ:circ, coaxial:coaxial, belt:belt, avgacc:avgacc, hstring:hstring, vcircle:vcircle, flatcurve:flatcurve, banked:banked, rotor:rotor, loop:loop, rolling:rolling, inertia:inertia, skater:skater, kepler:kepler, planets:planets, ellsat:ellsat, earthsat:earthsat, orbits:orbits, overflow:overflow, cylinders:cylinders, semicircle:semicircle};
})();

var Q_FIZIK = [
{ topic:'Düzgün çembersel hareket', svg:FIZ.circ(['T = 4 s']), q:'Şekildeki X cismi O merkezli çembersel yörüngede bir turunu 4 saniyede tamamlıyor. Cismin frekansı kaç Hz’dir?',
  num:0.25, hints:['Frekans, saniyedeki tur sayısıdır.','f = 1 / T'], exp:'f = 1/T = 1/4 = <b>0,25 Hz</b>' },
{ topic:'Düzgün çembersel hareket', q:'Çembersel hareket yapan bir cismin bir tam tur atması için geçen süreye ne ad verilir?',
  a:['Periyot','periyod','dönem'], not:['frekans'], hints:['T harfiyle gösterilir, birimi saniyedir.','“P” ile başlar.'], exp:'<b>Periyot (T)</b>' },
{ topic:'Düzgün çembersel hareket', q:'Çembersel harekette bir saniyedeki tur sayısına ne ad verilir?',
  a:['Frekans','frekans (f)'], not:['periyot'], hints:['Birimi s⁻¹ yani Hertz’dir.','f harfiyle gösterilir.'], exp:'<b>Frekans (f)</b> – birimi Hertz (s⁻¹)' },
{ topic:'Düzgün çembersel hareket', svg:FIZ.circ(['r = 3 m','T = 6 s','π = 3']), q:'Şekildeki cismin çizgisel hızının büyüklüğü kaç m/s’dir? (π = 3)',
  num:3, hints:['Bir turda alınan yol çevredir: 2πr','v = 2πr / T'], exp:'v = 2πr/T = 2·3·3/6 = <b>3 m/s</b>' },
{ topic:'Düzgün çembersel hareket', svg:FIZ.circ(['T = 3 s','π = 3']), q:'Periyodu 3 s olan şekildeki cismin açısal hızı kaç rad/s’dir? (π = 3)',
  num:2, hints:['Bir turda taranan açı 2π radyandır.','ω = 2π / T'], exp:'ω = 2π/T = 6/3 = <b>2 rad/s</b>' },
{ topic:'Düzgün çembersel hareket', svg:FIZ.circ(['ω = 4 rad/s','r = 0,5 m']), q:'Açısal hızı 4 rad/s olan cisim 0,5 m yarıçaplı yörüngede dönüyor. Çizgisel hızı kaç m/s’dir?',
  num:2, hints:['Çizgisel hız ile açısal hız arasındaki ilişkiyi kullan.','v = ω · r'], exp:'v = ω·r = 4·0,5 = <b>2 m/s</b>' },
{ topic:'Düzgün çembersel hareket', svg:FIZ.circ(['v = 6 m/s','r = 3 m']), q:'Şekildeki cismin merkezcil ivmesinin büyüklüğü kaç m/s²’dir?',
  num:12, hints:['Merkezcil ivme merkeze doğrudur.','a = v² / r'], exp:'a = v²/r = 36/3 = <b>12 m/s²</b>' },
{ topic:'Düzgün çembersel hareket', svg:FIZ.circ(['m = 2 kg','v = 4 m/s','r = 2 m']), q:'Şekildeki 2 kg kütleli cisme etki eden merkezcil kuvvet kaç N’dur?',
  num:16, hints:['F = m · a ve a = v²/r','F = m·v² / r'], exp:'F = mv²/r = 2·16/2 = <b>16 N</b>' },
{ topic:'Düzgün çembersel hareket', svg:FIZ.circ([]), q:'Düzgün çembersel harekette büyüklüğü sabit kalıp yönü sürekli değişen vektörel niceliklerden birini yazınız.',
  a:['çizgisel hız','hız','hız vektörü','merkezcil ivme','ivme','merkezcil kuvvet','kuvvet','konum vektörü','konum','momentum','çizgisel momentum'], not:['açısal hız','periyot','frekans','sürat','kinetik enerji'],
  hints:['Şekildeki v okunun yönü cisim döndükçe ne olur?','Hız, ivme, kuvvet, konum… bunlardan biri.'], exp:'Çizgisel hız, merkezcil ivme, merkezcil kuvvet, konum vektörü, momentum' },
{ topic:'Düzgün çembersel hareket', q:'Düzgün çembersel hareket yapan bir cisimde sabit (değişmeyen) kalan niceliklerden birini yazınız.',
  a:['açısal hız','periyot','frekans','sürat','hızın büyüklüğü','kinetik enerji','merkezcil ivmenin büyüklüğü','yarıçap'], not:['hız vektörü','çizgisel hız','ivme','konum vektörü'],
  hints:['Cisim her turu aynı sürede atıyor.','Periyot, frekans, açısal hız… bunlardan biri.'], exp:'Açısal hız, periyot, frekans, sürat (hızın büyüklüğü), kinetik enerji' },
{ topic:'Kasnaklar', svg:FIZ.coaxial(), q:'Şekildeki eş merkezli kasnaklarda K ve L noktaları için hangi nicelik aynıdır?',
  a:['açısal hız','periyot','frekans','devir sayısı','tur sayısı','dönme sayısı'], not:['çizgisel hız','hız','merkezcil ivme'],
  hints:['İki kasnak aynı anda bir tur atar.','Aynı mile bağlı kasnakların ω değerleri eşittir.'], exp:'<b>Açısal hız</b> (dolayısıyla periyot ve frekans) aynıdır. Çizgisel hız: v_L = 2·v_K' },
{ topic:'Kasnaklar', svg:FIZ.belt(), q:'Yarıçapı r olan X kasnağı saniyede 6 tur atıyor ve kayışla 3r yarıçaplı Y kasnağına bağlıdır. Y kasnağı saniyede kaç tur atar?',
  num:2, hints:['Kayışla bağlı kasnakların çizgisel hızları eşittir.','2π·f_X·r = 2π·f_Y·3r'], exp:'f_X·r = f_Y·3r → 6·r = f_Y·3r → <b>2 tur/s</b>' },
{ topic:'Ortalama ivme', svg:FIZ.avgacc(), q:'v = 2 m/s sabit süratle dönen cisim A’dan B’ye 2 s’de geliyor. Bu aralıktaki ortalama ivmesinin büyüklüğü kaç m/s²’dir?',
  num:Math.SQRT2, tol:0.03, a:['kök 2','karekök 2','√2'], hints:['Δv, son hız ile ilk hızın vektörel farkıdır.','Birbirine dik iki 2 m/s’lik vektörün farkı 2√2 m/s’dir. a = Δv/Δt'],
  exp:'|Δv| = 2√2 m/s → a = 2√2 / 2 = <b>√2 m/s²</b> (≈1,41)' },
{ topic:'Çembersel hareket uygulamaları', svg:FIZ.hstring(), q:'Yatay düzlemde ipe bağlı olarak dönen cisim için ipteki gerilme kuvveti T kaç N’dur?',
  num:8, hints:['Yatay düzlemde merkezcil kuvveti ip gerilmesi sağlar.','T = m·v²/r'], exp:'T = mv²/r = 0,5·16/1 = <b>8 N</b>' },
{ topic:'Çembersel hareket uygulamaları', svg:FIZ.vcircle(['m = 1 kg','v = 4 m/s','r = 0,4 m','g = 10 m/s²']), q:'Düşey düzlemde dönen cisim en üst nokta C’den 4 m/s hızla geçiyor. C noktasında ipteki gerilme kuvveti kaç N’dur?',
  num:30, hints:['En üstte hem T hem mg merkeze (aşağı) doğrudur.','T + mg = mv²/r → T = mv²/r − mg'], exp:'T = mv²/r − mg = 1·16/0,4 − 10 = <b>30 N</b>' },
{ topic:'Çembersel hareket uygulamaları', svg:FIZ.vcircle(['m = 1 kg','v = 4 m/s','r = 1 m','g = 10 m/s²']), q:'Cisim en alt nokta F’den 4 m/s hızla geçiyor. F noktasında ipteki gerilme kuvveti kaç N’dur?',
  num:26, hints:['En altta T yukarı (merkeze), mg aşağı doğrudur.','T − mg = mv²/r → T = mv²/r + mg'], exp:'T = mv²/r + mg = 16 + 10 = <b>26 N</b>' },
{ topic:'Çembersel hareket uygulamaları', svg:FIZ.vcircle(), q:'Düşey düzlemde sabit süratle dönen cismin ipi en çok hangi noktada kopabilir?',
  a:['F','F noktası','en alt','en alt nokta','en alt noktada','alt'], not:['C','en üst','A','D'], hints:['İp gerilmesinin en büyük olduğu noktayı bul.','Bu noktada T = mv²/r + mg olur.'], exp:'<b>F (en alt nokta)</b>: gerilme en büyüktür (T = mv²/r + mg).' },
{ topic:'Çembersel hareket uygulamaları', svg:FIZ.vcircle(['r = 0,9 m','g = 10 m/s²']), q:'İpin en üst noktada gevşememesi için cismin C noktasındaki hızı en az kaç m/s olmalıdır?',
  num:3, hints:['Sınır durumda C noktasında T = 0 olur.','mg = mv²/r → v = √(g·r)'], exp:'v = √(gr) = √9 = <b>3 m/s</b>' },
{ topic:'Çembersel hareket uygulamaları', svg:FIZ.flatcurve(), q:'Yatay ve eğimsiz bir virajı dönen aracın dönebilmesi için gereken merkezcil kuvveti hangi kuvvet sağlar?',
  a:['sürtünme kuvveti','sürtünme','statik sürtünme','fs'], not:['ağırlık','tepki','normal kuvvet'], hints:['Şekilde merkeze doğru gösterilen kuvvete bak.','Lastikler ile yol arasındaki kuvvet.'], exp:'<b>Sürtünme kuvveti (fs)</b>' },
{ topic:'Çembersel hareket uygulamaları', svg:FIZ.flatcurve(), q:'Sürtünme katsayısı 0,5 olan yatay yolda 20 m yarıçaplı virajı kaymadan dönebilecek en büyük hız kaç m/s’dir? (g = 10 m/s²)',
  num:10, hints:['fs = merkezcil kuvvet → k·m·g = m·v²/r','v = √(k·g·r)'], exp:'v = √(kgr) = √(0,5·10·20) = <b>10 m/s</b>' },
{ topic:'Çembersel hareket uygulamaları', svg:FIZ.banked(), q:'Eğim açısı θ = 45° olan sürtünmesiz virajın yarıçapı 40 m’dir. Araç bu virajı kaç m/s hızla güvenle döner? (g = 10 m/s², tan45° = 1)',
  num:20, hints:['Normal kuvvetin yatay bileşeni merkezcil kuvveti sağlar.','tanθ = v²/(g·r) → v² = tanθ·g·r'], exp:'v² = tanθ·g·r = 1·10·40 = 400 → <b>20 m/s</b>' },
{ topic:'Çembersel hareket uygulamaları', svg:FIZ.rotor(), q:'Dönen silindirin iç yüzeyindeki cisim için merkezcil kuvveti hangi kuvvet sağlar?',
  a:['tepki kuvveti','normal kuvvet','N','yüzeyin tepki kuvveti','duvarın tepkisi','tepki'], not:['sürtünme','ağırlık','mg','fs'], hints:['Şekilde merkeze (eksene) doğru olan oka bak.','Duvarın cisme dik olarak uyguladığı kuvvet.'], exp:'<b>Tepki (normal) kuvveti N</b>. Sürtünme ise ağırlığı dengeler (fs = mg).' },
{ topic:'Çembersel hareket uygulamaları', svg:FIZ.rotor(), q:'Yarıçapı 5 m olan silindirin iç yüzeyi ile cisim arasındaki sürtünme katsayısı 0,5’tir. Cismin kaymaması için çizgisel hızı en az kaç m/s olmalıdır? (g = 10 m/s²)',
  num:10, hints:['fs = mg ve N = mv²/r; fs = k·N','k·mv²/r = mg → v² = g·r/k'], exp:'v² = gr/k = 10·5/0,5 = 100 → <b>10 m/s</b>' },
{ topic:'Raylı sistemler', svg:FIZ.loop(), q:'5r yüksekliğinden serbest bırakılan cisim A noktasından geçerken raya uyguladığı tepki kuvveti kaç mg olur?',
  num:11, hints:['Enerji korunumu: mg·5r = ½mv² → v² = 10gr','A’da N − mg = mv²/r'], exp:'v² = 10gr → N = mg + m·10gr/r = <b>11 mg</b>' },
{ topic:'Raylı sistemler', svg:FIZ.loop(), q:'Aynı cisim çemberin en üst noktası C’den geçerken tepki kuvveti kaç mg olur?',
  num:5, hints:['C’nin yüksekliği 2r: mg·5r = mg·2r + ½mv² → v² = 6gr','C’de N + mg = mv²/r'], exp:'v² = 6gr → N = 6mg − mg = <b>5 mg</b>' },
{ topic:'Raylı sistemler', svg:FIZ.loop(), q:'Cisim B noktasından (r yüksekliğinde) geçerken tepki kuvveti kaç mg olur?',
  num:8, hints:['mg·5r = mg·r + ½mv² → v² = 8gr','B’de ağırlık yataya diktir; merkezcil kuvveti yalnız N sağlar: N = mv²/r'], exp:'v² = 8gr → N = mv²/r = <b>8 mg</b>' },
{ topic:'Dönerek öteleme', svg:FIZ.rolling(), q:'Kaymadan yuvarlanan tekerin merkezi v hızıyla ilerliyor. Tekerin en üst noktasının yere göre hızı ne olur?',
  a:['2v','2 v','iki v','2 katı'], num:2, hints:['En üst noktada öteleme hızı ile dönme hızı aynı yöndedir.','v + ω·r = v + v'], exp:'v + v = <b>2v</b>' },
{ topic:'Dönerek öteleme', svg:FIZ.rolling(), q:'Aynı tekerin yere değen en alt noktasının yere göre hızı nedir?',
  num:0, a:['sıfır','hareketsiz','sıfırdır'], hints:['En altta öteleme ve dönme hızları zıt yönlüdür.','v − ω·r = v − v'], exp:'v − v = <b>0</b>' },
{ topic:'Eylemsizlik momenti', q:'Bir cismin dönmeye karşı gösterdiği zorluğa (dirence) ne ad verilir?',
  a:['eylemsizlik momenti','atalet momenti','dönme eylemsizliği'], not:['tork','açısal momentum'], hints:['I harfiyle gösterilir ve skalerdir.','I = m·r²; “…lik momenti”'], exp:'<b>Eylemsizlik (atalet) momenti</b>, I = mr²' },
{ topic:'Eylemsizlik momenti', svg:FIZ.inertia(1), q:'Şekildeki sistemin dönme eksenine göre eylemsizlik momenti nedir? (m ve r cinsinden)',
  strict:true, a:['2mr2','2mr^2','2 m r2','2r2m','2m r2'], hints:['Her kütle için I = m·r²','İki kütle eksenden r uzakta: mr² + mr²'], exp:'I = mr² + mr² = <b>2mr²</b>' },
{ topic:'Eylemsizlik momenti', svg:FIZ.inertia(2), q:'Şekildeki sistemin eksene göre eylemsizlik momenti nedir? (m ve r cinsinden)',
  strict:true, a:['5mr2','5mr^2','5 m r2','5r2m','5m r2'], hints:['Uzaklık karesiyle etkili: 2r’deki kütle m(2r)² verir.','mr² + m(2r)² = mr² + 4mr²'], exp:'I = mr² + m(2r)² = <b>5mr²</b>' },
{ topic:'Dönme kinetik enerjisi', q:'Eylemsizlik momenti 2 kg·m² olan bir cisim 3 rad/s açısal hızla dönüyor. Dönme kinetik enerjisi kaç J’dür?',
  num:9, hints:['Öteleme için ½mv², dönme için benzer formül.','E = ½·I·ω²'], exp:'E = ½·2·3² = <b>9 J</b>' },
{ topic:'Açısal momentum', q:'Eylemsizlik momenti 4 kg·m² olan bir disk 5 rad/s açısal hızla dönüyor. Açısal momentumu kaç kg·m²/s’dir?',
  num:20, hints:['Çizgisel momentum p = m·v’nin dönme karşılığı.','L = I·ω'], exp:'L = I·ω = 4·5 = <b>20 kg·m²/s</b>' },
{ topic:'Açısal momentum', svg:FIZ.skater(), q:'Buz patencisi dönerken kollarını kapatıyor. Patencinin açısal hızı nasıl değişir?',
  a:['artar','hızlanır','büyür','artış','yükselir'], not:['azalır','değişmez','yavaşlar','sabit'], hints:['Açısal momentum korunur: I₁ω₁ = I₂ω₂','Kollar kapanınca r, dolayısıyla I küçülür.'], exp:'I küçülür, L = Iω korunduğu için ω <b>artar</b>.' },
{ topic:'Açısal momentum', q:'Bir sisteme etki eden net tork sıfır ise hangi nicelik korunur?',
  a:['açısal momentum','L'], not:['enerji','çizgisel momentum','eylemsizlik momenti'], hints:['τ = ΔL/Δt','τ = 0 ise ΔL = 0'], exp:'<b>Açısal momentum</b> korunur (L_ilk = L_son).' },
{ topic:'Kütle çekimi ve Kepler', svg:FIZ.kepler(), q:'Güneş etrafındaki eliptik yörüngede dolanan gezegenin çizgisel hızı X, Y ve Z noktalarından hangisinde en büyüktür?',
  a:['X','X noktası','X noktasında'], not:['Y','Z'], hints:['Kepler’in 2. yasası: eşit zamanlarda eşit alanlar taranır.','Güneş’e en yakın noktada hız en büyüktür.'], exp:'<b>X</b> (Güneş’e en yakın nokta). Sıralama: v_X > v_Y > v_Z' },
{ topic:'Kütle çekimi ve Kepler', svg:FIZ.kepler(), q:'Kepler’in birinci yasasına göre gezegenlerin Güneş etrafındaki yörüngelerinin şekli nedir?',
  a:['elips','eliptik','elips şeklinde'], not:['çember','daire'], hints:['Güneş, yörüngenin odaklarından birindedir.','Basık bir çember.'], exp:'<b>Elips</b> – Güneş odaklardan birindedir.' },
{ topic:'Kütle çekimi ve Kepler', svg:FIZ.planets(), q:'Kütleleri M₁ ve M₂ olan gezegenlerin merkezinden r ve 2r uzaklıktaki X cisimlerinin ağırlıkları eşittir. M₁/M₂ oranı kaçtır?',
  num:0.25, hints:['g = G·M / d²','M₁/r² = M₂/(2r)²'], exp:'M₁/r² = M₂/4r² → M₁/M₂ = <b>1/4</b>' },
{ topic:'Kütle çekimi ve Kepler', svg:FIZ.ellsat(), q:'Uydu X noktasındayken Güneş’in uyguladığı çekim kuvveti F_X, Y noktasındayken F_Y’dir. F_X / F_Y oranı kaçtır?',
  num:2.25, hints:['F = G·M·m / d², kuvvet uzaklığın karesiyle ters orantılı.','F_X/F_Y = (3R)² / (2R)²'], exp:'F_X/F_Y = 9R²/4R² = <b>9/4</b>' },
{ topic:'Kütle çekimi ve Kepler', svg:FIZ.earthsat(), q:'Dünya yüzeyinde ağırlığı G olan uydunun ağırlığı, yüzeyden x yüksekliğindeki yörüngede G/16 oluyor. Dünya’nın yarıçapı R ise x kaç R’dir?',
  num:3, a:['3R'], hints:['Ağırlık merkeze uzaklığın karesiyle ters orantılı: 16 kat azalma → uzaklık 4 katı.','Merkeze uzaklık 4R ise yüzeyden yükseklik?'], exp:'R + x = 4R → x = <b>3R</b>' },
{ topic:'Kütle çekimi ve Kepler', svg:FIZ.orbits(), q:'Bir gezegen etrafında R ve 4R yarıçaplı yörüngelerde dolanan X ve Y uydularının periyotları T_X ve T_Y’dir. T_X / T_Y oranı kaçtır?',
  num:0.125, hints:['Kepler’in 3. yasası: T² / r³ sabittir.','(T_X/T_Y)² = (1/4)³ = 1/64'], exp:'(T_X/T_Y)² = 1/64 → T_X/T_Y = <b>1/8</b>' },
{ topic:'Kütle çekimi ve Kepler', q:'Newton’un etki-tepki prensibine göre Dünya’nın Güneş’e uyguladığı çekim kuvveti, Güneş’in Dünya’ya uyguladığı kuvvete göre nasıldır?',
  a:['eşit','aynı','eşittir','aynı büyüklükte','eşit büyüklükte'], not:['büyük','küçük','daha az'], hints:['Etki-tepki kuvvetleri her zaman çift hâlinde oluşur.','Büyüklükleri …, yönleri zıttır.'], exp:'<b>Eşit büyüklükte</b>, zıt yönlüdür.' },
{ topic:'Kütle çekimi ve Kepler', q:'İki cisim arasındaki uzaklık 2 katına çıkarılırsa aralarındaki kütle çekim kuvveti ilk değerinin kaçta kaçı olur?',
  num:0.25, a:['dörtte biri','dörtte bir'], hints:['F ∝ 1/d²','2² = 4'], exp:'F′ = F/4 → <b>1/4</b>’ü' },
{ topic:'Kütle çekimi ve Kepler', q:'Dünya yüzeyinden yukarı çıkıldıkça yer çekimi ivmesi nasıl değişir?',
  a:['azalır','küçülür','düşer','azalma'], not:['artar','değişmez'], hints:['g = G·M / d²','d büyüdükçe g …'], exp:'<b>Azalır</b> (g = GM/d²).' },
{ topic:'Fizik bilimine giriş', q:'Bir usta tahtaya çivi çakarken çivinin sıcaklığının arttığını gözlemliyor. Çivinin sıcaklık artışı fiziğin hangi alt alanının konusudur?',
  a:['Termodinamik','ısı bilimi'], not:['mekanik','optik','elektrik'], hints:['Konu: ısı ve sıcaklık.','“Termo” ısı demektir.'], exp:'<b>Termodinamik</b> – çakma işi ısıya dönüşür; ısı ve sıcaklık termodinamiğin konusudur.' },
{ topic:'Fizik bilimine giriş', q:'Sıcaklığın SI (Uluslararası Birim Sistemi) birimi nedir?',
  a:['Kelvin','K'], not:['celsius','santigrat','fahrenheit','derece'], hints:['°C, SI birimi değildir.','Mutlak sıcaklık ölçeğinin birimi.'], exp:'<b>Kelvin (K)</b>' },
{ topic:'Madde ve özellikleri', svg:FIZ.overflow(), q:'Küre biçimindeki metal cisim Şekil I’deki taşma kabına bırakıldığında kaptan 48 cm³ su taşıyor. Kürenin yarıçapı kaç cm’dir? (π = 3)',
  num:3, hints:['Kürenin hacmi = kaptaki boş kısım + taşan su = 60 + 48','V = (4/3)·π·r³ = 4r³'], exp:'V = 60 + 48 = 108 cm³ → 4r³ = 108 → r³ = 27 → <b>r = 3 cm</b>' },
{ topic:'Madde ve özellikleri', svg:FIZ.cylinders(), q:'Aynı maddeden yapılmış K, L ve M silindirlerinden hangisi kendi ağırlığına karşı en az dayanıklıdır?',
  a:['K','K silindiri'], not:['L','M'], hints:['Dayanıklılık kesit alanına değil, yüksekliğe bağlıdır.','Yükseklik arttıkça dayanıklılık azalır.'], exp:'<b>K</b> (D_L = D_M > D_K). Dayanıklılık yalnızca yüksekliğe bağlıdır.' },
{ topic:'Hareket', svg:FIZ.semicircle(), q:'Çember şeklindeki yolun A noktasından B noktasına yarım çember çizerek 5 s’de gelen cismin sürat ve hızı kaç m/s’dir? (π = 3)',
  type:'parts', parts:[{label:'Sürat (m/s):', num:6},{label:'Hız (m/s):', num:4}],
  hints:['Sürat = alınan yol / süre; hız = yer değiştirme / süre.','Yol = π·r = 30 m, yer değiştirme = 2r = 20 m.'], exp:'Sürat = 30/5 = <b>6 m/s</b> · Hız = 20/5 = <b>4 m/s</b>' }
];
