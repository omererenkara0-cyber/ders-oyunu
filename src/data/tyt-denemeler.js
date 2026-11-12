/* TYT Deneme Sınavları — her deneme kendi soru dağılımı, süresi ve tohumuna (seed) sahiptir.
   Gerçek TYT dağılımı: Türkçe 40, Temel Matematik 40, Geometri (Matematiğin içinde), Sosyal 20, Fen 20.
   Soru havuzu sınırlı olduğundan her dersin dağılımı, o derste bulunan çoktan seçmeli soru
   sayısıyla otomatik olarak sınırlanır (motor tarafında). Toplam dağılım yine 120'dir. */
var TYT_DENEMELER = [
  { id:'d1', name:'TYT Deneme 1 · Genel', minutes:165, seed:1301,
    desc:'Tüm derslerden dengeli dağılım · klasik TYT düzeni',
    dist:[
      {id:'turkce',    n:40},
      {id:'matematik', n:30},
      {id:'geometri',  n:10},
      {id:'fizik',     n:7},
      {id:'kimya',     n:7},
      {id:'biyoloji',  n:6},
      {id:'tarih',     n:5},
      {id:'cografya',  n:5},
      {id:'felsefe',   n:5},
      {id:'din',       n:5}
    ] },
  { id:'d2', name:'TYT Deneme 2 · Sözel Ağırlıklı', minutes:165, seed:2417,
    desc:'Türkçe ve sosyal bilimler ağırlıklı · farklı soru seçkisi',
    dist:[
      {id:'turkce',    n:44},
      {id:'matematik', n:26},
      {id:'geometri',  n:10},
      {id:'fizik',     n:6},
      {id:'kimya',     n:6},
      {id:'biyoloji',  n:6},
      {id:'tarih',     n:6},
      {id:'cografya',  n:6},
      {id:'felsefe',   n:5},
      {id:'din',       n:5}
    ] },
  { id:'d3', name:'TYT Deneme 3 · Sayısal Ağırlıklı', minutes:165, seed:3629,
    desc:'Matematik ve fen bilimleri ağırlıklı · farklı soru seçkisi',
    dist:[
      {id:'turkce',    n:36},
      {id:'matematik', n:34},
      {id:'geometri',  n:12},
      {id:'fizik',     n:8},
      {id:'kimya',     n:8},
      {id:'biyoloji',  n:6},
      {id:'tarih',     n:4},
      {id:'cografya',  n:4},
      {id:'felsefe',   n:4},
      {id:'din',       n:4}
    ] }
];
window.TYT_DENEMELER = TYT_DENEMELER;
