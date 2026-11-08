/* Soru çizimleri için küçük SVG yardımcıları */
var S = {
  wrap: function(w,h,body){
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" width="'+w+'" height="'+h+'" role="img">'+
      '<defs>'+
      '<marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mk" d="M0,0 L10,5 L0,10 z"/></marker>'+
      '<marker id="ara" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mka" d="M0,0 L10,5 L0,10 z"/></marker>'+
      '<marker id="ar4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mk4" d="M0,0 L10,5 L0,10 z"/></marker>'+
      '<marker id="ar1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mk1" d="M0,0 L10,5 L0,10 z"/></marker>'+
      '</defs>'+body+'</svg>';
  },
  t: function(x,y,s,o){ o=o||{};
    return '<text x="'+x+'" y="'+y+'" text-anchor="'+(o.a||'middle')+'"'+(o.c?' class="'+o.c+'"':'')+
      ' style="'+(o.s?'font-size:'+o.s+'px;':'')+(o.b?'font-weight:700;':'')+(o.i?'font-style:italic;':'')+'" dominant-baseline="middle">'+s+'</text>'; },
  l: function(x1,y1,x2,y2,c,ar){ return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" class="'+(c||'ink')+'"'+(ar?' marker-end="url(#'+ar+')"':'')+'/>'; },
  c: function(cx,cy,r,c){ return '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" class="'+(c||'ink')+'"/>'; },
  dot: function(cx,cy,r,c){ return '<circle cx="'+cx+'" cy="'+cy+'" r="'+(r||3.5)+'" class="'+(c||'mk')+'"/>'; },
  r: function(x,y,w,h,c,rx){ return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+(rx||0)+'" class="'+(c||'ink')+'"/>'; },
  p: function(d,c,ar){ return '<path d="'+d+'" class="'+(c||'ink')+'"'+(ar?' marker-end="url(#'+ar+')"':'')+'/>'; },
  q: function(x,y,s){ return '<circle cx="'+x+'" cy="'+y+'" r="11" class="qb"/>'+S.t(x,y+1,s||'?',{c:'qbt',s:14}); },
  axes: function(x0,y0,w,h,xl,yl){
    return S.l(x0,y0,x0+w,y0,'ink','ar')+S.l(x0,y0,x0,y0-h,'ink','ar')+
      S.t(x0+w+4,y0+16,xl,{a:'end',s:13,i:1})+S.t(x0+8,y0-h-2,yl,{a:'start',s:13,i:1});
  }
};
