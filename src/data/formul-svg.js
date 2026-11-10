/* Formül kağıdı çizimleri — gradyanlı, gölgeli vektör illüstrasyonlar (SVG).
   Her bölüm için ayrı bir çizim üretir; engine'den bağımsızdır. */
var FSVG = (function(){
  var t=S.t, l=S.l, p=S.p, dot=S.dot;

  var DEFS =
    '<defs>'+
    '<marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path fill="#dfe7f0" d="M0,0 L10,5 L0,10 z"/></marker>'+
    '<marker id="ara" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path fill="#7fb2e8" d="M0,0 L10,5 L0,10 z"/></marker>'+
    '<marker id="ar4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path fill="#de9aa3" d="M0,0 L10,5 L0,10 z"/></marker>'+
    '<marker id="ar1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path fill="#8fb4dd" d="M0,0 L10,5 L0,10 z"/></marker>'+
    '<marker id="ar2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path fill="#8cc49e" d="M0,0 L10,5 L0,10 z"/></marker>'+
    '<linearGradient id="gBlue" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#aacbf1"/><stop offset="1" stop-color="#5b8fd0"/></linearGradient>'+
    '<linearGradient id="gRod" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e3eaf3"/><stop offset="1" stop-color="#9aa8ba"/></linearGradient>'+
    '<linearGradient id="gWheel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef3f8"/><stop offset="1" stop-color="#9fb0c4"/></linearGradient>'+
    '<linearGradient id="gCar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bcd7f4"/><stop offset="1" stop-color="#5b8fd0"/></linearGradient>'+
    '<radialGradient id="gBall" cx="35%" cy="30%" r="78%"><stop offset="0" stop-color="#f8cbd1"/><stop offset="1" stop-color="#d87985"/></radialGradient>'+
    '<radialGradient id="gEarth" cx="35%" cy="28%" r="82%"><stop offset="0" stop-color="#a8d4ff"/><stop offset="55%" stop-color="#4f8fd6"/><stop offset="1" stop-color="#2d5c9b"/></radialGradient>'+
    '<radialGradient id="gPlanet" cx="35%" cy="28%" r="82%"><stop offset="0" stop-color="#d6e6dc"/><stop offset="1" stop-color="#6f9c86"/></radialGradient>'+
    '<filter id="soft" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="2.5" stdDeviation="2.6" flood-color="#000" flood-opacity="0.24"/></filter>'+
    '</defs>';

  function wrap(w,h,body){ return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" width="'+w+'" height="'+h+'" role="img">'+DEFS+body+'</svg>'; }
  function ball(x,y,r,fill){ return '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+(fill||'url(#gBall)')+'" filter="url(#soft)"/>'; }
  function ring(cx,cy,R,sw){ return '<circle cx="'+cx+'" cy="'+cy+'" r="'+R+'" fill="none" stroke="url(#gBlue)" stroke-width="'+(sw||9)+'" opacity="0.9"/>'; }

  /* 1 — çembersel hareket */
  function circ(){
    var cx=182, cy=126, R=86, b='';
    b+=ring(cx,cy,R);
    b+=dot(cx,cy,4)+t(cx-12,cy+14,'O',{s:13,i:1});
    b+=l(cx,cy,cx+R,cy,'dash')+t(cx+R/2,cy-10,'r',{i:1,s:12});
    b+=ball(cx+R,cy,11);
    b+=l(cx+R,cy-12,cx+R,cy-58,'k4','ar4')+t(cx+R+14,cy-46,'v',{i:1,b:1,c:'t4'});
    b+=p('M'+(cx+R-26)+','+(cy-40)+' A'+R+','+R+' 0 0 1 '+(cx+R-4)+','+(cy-24),'ink','ar');
    b+=t(cx,232,'T = 2πr/v = 1/f',{s:12,c:'mut'});
    return wrap(364,244,b);
  }

  /* 2 — merkezcil ivme yönü */
  function avgacc(){
    var cx=150, cy=126, R=84, b='';
    b+=ring(cx,cy,R);
    b+=dot(cx,cy,4)+t(cx-12,cy+14,'O',{s:13,i:1});
    var Ax=cx+R*0.71, Ay=cy+R*0.71;
    b+=ball(Ax,Ay,11);
    b+=l(Ax,Ay-12,Ax,Ay-60,'k4','ar4')+t(Ax+14,Ay-50,'v',{i:1,b:1,c:'t4'});
    b+=l(Ax-10,Ay+8,cx+(Ax-cx)*0.22,cy+(Ay-cy)*0.22,'k2','ar2')+t(Ax+6,Ay+34,'a',{b:1,c:'t2'});
    b+=t(150,232,'a = v²/r  (yön: merkeze)',{s:12,c:'mut'});
    return wrap(300,244,b);
  }

  /* 3 — eğimli viraj */
  function banked(){
    var b='';
    b+=l(24,196,336,196,'thin');
    b+='<path d="M60,196 L300,196 L300,72 Z" fill="url(#gBlue)" opacity="0.18"/>';
    b+=l(60,196,300,72,'ink');
    b+=p('M104,196 A44,44 0 0 0 96,172','ink')+t(116,184,'θ',{i:1,s:13});
    var ux=0.906, uy=-0.423, px=196, py=128;
    b+='<g transform="translate('+px+','+py+') rotate(-25)"><rect x="-30" y="-15" width="60" height="30" rx="8" fill="url(#gCar)" filter="url(#soft)"/></g>';
    var nx=-0.423, ny=-0.906;
    b+=l(px,py,(px+nx*64).toFixed(1),(py+ny*64).toFixed(1),'k2','ar2')+t((px+nx*78).toFixed(1),(py+ny*78).toFixed(1),'N',{b:1,c:'t2'});
    b+=l(px,py,px,(py+70),'k4','ar4')+t(px+14,py+66,'mg',{c:'t4'});
    b+=l(px,py,(px-ux*60).toFixed(1),(py-uy*60).toFixed(1),'k3','ara')+t((px-ux*76).toFixed(1),(py-uy*76-6).toFixed(1),'f_s',{b:1,c:'t3'});
    b+=t(300,210,'N·sinθ = m·v²/r',{a:'end',s:12,c:'mut'});
    return wrap(360,222,b);
  }

  /* 4 — düşey düzlemde çembersel hareket */
  function vcircle(){
    var cx=170, cy=130, R=82, b='';
    b+=ring(cx,cy,R);
    b+=l(cx,cy,cx,cy-R,'dash')+t(cx+12,cy-R/2,'r',{i:1,s:12});
    b+=ball(cx,cy-R,11)+t(cx,cy-R-18,'C',{b:1});
    b+=ball(cx,cy+R,11)+t(cx,cy+R+22,'F',{b:1});
    b+=l(cx-14,cy-R+8,cx-14,cy-R+56,'k2','ar2')+t(cx-30,cy-R+40,'T',{b:1,c:'t2'});
    b+=l(cx+14,cy-R+8,cx+14,cy-R+56,'k4','ar4')+t(cx+30,cy-R+40,'mg',{c:'t4'});
    b+=l(cx-14,cy+R-8,cx-14,cy+R-56,'k2','ar2')+t(cx-30,cy+R-40,'T',{b:1,c:'t2'});
    b+=l(cx+14,cy+R+8,cx+14,cy+R+56,'k4','ar4')+t(cx+30,cy+R+40,'mg',{c:'t4'});
    b+=t(cx,260,'T_üst = mv²/r − mg   ·   T_dip = mv²/r + mg',{s:11.5,c:'mut'});
    return wrap(340,272,b);
  }

  /* 5 — konik sarkaç */
  function conical(){
    var px=180, py=42, ang=36*Math.PI/180, L=140, b='';
    var sx=Math.sin(ang), cs=Math.cos(ang);
    var bx=px+L*sx, by=py+L*cs, rx=L*sx;
    b+=l(66,42,294,42,'ink');
    for(var i=0;i<8;i++) b+=l(72+i*30,42,62+i*30,32,'thin');
    b+=l(px,py,px,by+28,'dash');
    b+='<path d="M'+px+','+py+' L'+(px-rx).toFixed(1)+','+by.toFixed(1)+' L'+(px+rx).toFixed(1)+','+by.toFixed(1)+' Z" fill="url(#gBlue)" opacity="0.14"/>';
    b+='<ellipse cx="'+px+'" cy="'+by.toFixed(1)+'" rx="'+rx.toFixed(1)+'" ry="22" class="dash"/>';
    b+=l(px,py,bx.toFixed(1),by.toFixed(1),'ink');
    b+=l(px,by.toFixed(1),bx.toFixed(1),by.toFixed(1),'thin')+t((px+bx)/2,(by-8).toFixed(1),'r',{i:1,s:12});
    b+=p('M'+px+',66 A24,24 0 0 1 '+(px+24*sx).toFixed(1)+','+(py+24*cs).toFixed(1),'ink')+t(px+20,72,'θ',{i:1,s:12});
    b+=ball(bx.toFixed(1),by.toFixed(1),11);
    b+=l(bx.toFixed(1),by.toFixed(1),(bx-64*sx).toFixed(1),(by-64*cs).toFixed(1),'k1','ar1')+t((bx-80*sx).toFixed(1),(by-80*cs-6).toFixed(1),'T',{b:1,c:'t1'});
    b+=l(bx.toFixed(1),by.toFixed(1),bx.toFixed(1),(by+56).toFixed(1),'k4','ar4')+t((bx+14).toFixed(1),(by+54).toFixed(1),'mg',{c:'t4'});
    b+=t(px,by+56,'tanθ = ω²r/g',{s:12,c:'mut'});
    return wrap(360,250,b);
  }

  /* 6 — dönme ve tork */
  function torque(){
    var b='';
    b+='<path d="M62,168 L82,132 L102,168 Z" fill="url(#gRod)"/>';
    b+='<rect x="72" y="118" width="244" height="13" rx="6.5" fill="url(#gRod)" filter="url(#soft)"/>';
    b+=dot(84,124,5)+t(84,186,'O',{b:1});
    b+=l(84,104,316,104,'dash')+t(200,94,'r',{i:1,s:12});
    b+=l(84,112,84,98,'thin')+l(316,112,316,98,'thin');
    b+=l(308,132,308,184,'k4','ar4')+t(322,182,'F',{b:1,c:'t4'});
    b+=p('M116,72 A64,64 0 0 1 196,68','ink','ar')+t(156,54,'τ',{b:1});
    b+=t(200,206,'τ = F·r = I·α',{s:12,c:'mut'});
    return wrap(360,218,b);
  }

  /* 7 — eylemsizlik momenti */
  function inertia1(){
    var b='';
    b+=l(180,44,180,158,'dash');
    b+='<rect x="66" y="98" width="228" height="11" rx="5.5" fill="url(#gRod)" filter="url(#soft)"/>';
    b+=dot(180,104,5)+t(180,132,'eksen',{s:12,c:'mut'});
    b+=ball(110,104,16)+t(110,104,'m',{s:12,b:1});
    b+=ball(250,104,16)+t(250,104,'m',{s:12,b:1});
    b+=l(110,128,180,128,'thin')+t(145,142,'r',{i:1,s:12});
    b+=l(180,128,250,128,'thin')+t(215,142,'r',{i:1,s:12});
    b+=t(180,176,'I = m·r² + m·r² = 2m·r²',{s:12,c:'mut'});
    return wrap(360,194,b);
  }

  /* 8 — yuvarlanma */
  function rolling(){
    var b='';
    b+=l(24,192,336,192,'thin');
    b+=l(24,192,336,60,'ink');
    var tx=0.5, px=24+312*tx, py=192-132*tx;
    var nx=-0.39, ny=-0.921, cx=px+nx*46, cy=py+ny*46;
    b+='<circle cx="'+cx.toFixed(1)+'" cy="'+cy.toFixed(1)+'" r="46" fill="url(#gWheel)" filter="url(#soft)"/>';
    b+='<circle cx="'+cx.toFixed(1)+'" cy="'+cy.toFixed(1)+'" r="46" fill="none" stroke="#7c8b9e" stroke-width="2"/>';
    b+='<circle cx="'+cx.toFixed(1)+'" cy="'+cy.toFixed(1)+'" r="30" fill="none" stroke="#aab7c6" stroke-width="1.4" stroke-dasharray="4 4"/>';
    b+=dot(cx,cy,4);
    b+=l(cx.toFixed(1),cy.toFixed(1),(cx+34).toFixed(1),(cy+14).toFixed(1),'k4','ar4')+t((cx+40).toFixed(1),(cy+8).toFixed(1),'v',{a:'start',i:1,c:'t4'});
    b+=p('M'+(cx+30).toFixed(1)+','+(cy-34).toFixed(1)+' A46,46 0 0 1 '+(cx+44).toFixed(1)+','+(cy-14).toFixed(1),'ink','ar')+t((cx+56).toFixed(1),(cy-30).toFixed(1),'ω',{i:1,s:12});
    b+=t(180,214,'v = ω·r ,   a = g·sinθ /(1 + I/mr²)',{s:12,c:'mut'});
    return wrap(360,226,b);
  }

  /* 9 — açısal momentum korunumu */
  function skater(){
    var b='';
    var pose=function(cx,arm,wr){
      var s='';
      s+=l(cx-arm,118,cx+arm,118,'ink');
      s+=ball(cx-arm,118,11)+ball(cx+arm,118,11);
      s+='<circle cx="'+cx+'" cy="118" r="10" fill="url(#gRod)" filter="url(#soft)"/>';
      s+=p('M'+(cx-26)+',92 A37,37 0 0 1 '+(cx+26)+',92','sacc','ara');
      s+=t(cx,80,wr,{s:13,b:1});
      return s;
    };
    b+=pose(98,70,'ω₁');
    b+=pose(268,30,'ω₂');
    b+=t(98,164,'Kollar açık · I büyük',{s:12,c:'mut'});
    b+=t(268,164,'Kollar kapalı · I küçük',{s:12,c:'mut'});
    b+=t(183,198,'I₁·ω₁ = I₂·ω₂  →  I küçülünce ω artar',{s:12,c:'mut'});
    return wrap(366,212,b);
  }

  /* 10 — kütle çekimi */
  function planets(){
    var b='';
    b+='<circle cx="112" cy="152" r="46" fill="url(#gPlanet)" filter="url(#soft)"/>';
    b+='<circle cx="278" cy="152" r="66" fill="url(#gPlanet)" filter="url(#soft)"/>';
    b+=ball(112,82,10)+t(112,64,'X',{b:1});
    b+=ball(278,66,10)+t(278,48,'X',{b:1});
    b+=l(112,152,112,92,'dash')+t(124,120,'r',{i:1,s:12});
    b+=l(278,152,278,76,'dash')+t(290,112,'2r',{i:1,s:12});
    b+=t(112,222,'M₁',{b:1});
    b+=t(278,234,'M₂',{b:1});
    b+=t(190,28,'X cisimlerinin ağırlıkları eşit · F = G·M·m/r²',{s:11.5,c:'mut'});
    return wrap(366,248,b);
  }

  /* 11 — uydu */
  function earthsat(){
    var b='', ex=182, ey=150;
    b+='<ellipse cx="'+ex+'" cy="'+ey+'" rx="162" ry="112" fill="none" class="dash"/>';
    b+='<circle cx="'+ex+'" cy="'+ey+'" r="54" fill="url(#gEarth)" filter="url(#soft)"/>';
    var a=-0.62, sx=ex+162*Math.cos(a), sy=ey+112*Math.sin(a);
    b+=ball(sx.toFixed(1),sy.toFixed(1),10);
    b+=l(ex,ey,sx.toFixed(1),sy.toFixed(1),'thin')+t((ex+sx)/2+4,(ey+sy)/2+16,'r = R + h',{i:1,s:11});
    b+=l(sx.toFixed(1),(sy-12).toFixed(1),(sx+44).toFixed(1),(sy-46).toFixed(1),'k4','ar4')+t((sx+52).toFixed(1),(sy-52).toFixed(1),'v',{i:1,c:'t4'});
    b+=t(ex,ey+4,'M',{b:1,s:15});
    return wrap(366,286,b);
  }

  /* 12 — kurtulma hızı */
  function escape(){
    var b='', cx=180, cy=210, R=76;
    b+='<circle cx="'+cx+'" cy="'+cy+'" r="'+R+'" fill="url(#gPlanet)" filter="url(#soft)"/>';
    b+=t(cx,cy+5,'M',{b:1,s:15});
    b+=l(cx,cy,cx,cy-R,'ink')+t(cx+12,cy-R/2,'R',{i:1,s:13});
    b+=ball(cx,cy-R,10);
    b+=l(cx,cy-R-12,cx,cy-R-72,'k4','ar4')+t(cx+16,cy-R-56,'v_k',{b:1,c:'t4'});
    b+=l(cx,cy-R-16,cx,cy-R-40,'dash');
    b+=t(cx,cy+112,'v_k = √(2GM/R)',{s:12,c:'mut'});
    return wrap(360,340,b);
  }

  return { circ:circ, avgacc:avgacc, banked:banked, vcircle:vcircle, conical:conical,
           torque:torque, inertia1:inertia1, rolling:rolling, skater:skater,
           planets:planets, earthsat:earthsat, escape:escape };
})();
window.FSVG = FSVG;
if(typeof module!=='undefined') module.exports = FSVG;
