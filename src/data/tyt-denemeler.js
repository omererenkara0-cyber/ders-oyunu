/* TYT Deneme Sınavları — TÜM denemeler aynı TYT soru dağılımına sahiptir.
   Gerçek TYT dağılımı: Türkçe 40, Temel Matematik 40 (Geometri dahil), Sosyal 20, Fen 20 = 120 soru.
   Soru havuzu sınırlı olduğundan her dersin dağılımı, o dersin çoktan seçmeli soru sayısıyla
   motor tarafında otomatik olarak sınırlanır (toplam dağılım yine 120'dir).
   Denemeler yalnızca tohumları (seed) bakımından farklıdır; böylece her denemede farklı sorular seçilir. */
var TYT_DIST = [
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
];
var TYT_DENEMELER = [
  { id:'d1', name:'TYT Deneme 1', minutes:165, seed:1301, desc:'TYT soru dağılımı · farklı soru seçkisi', dist:TYT_DIST },
  { id:'d2', name:'TYT Deneme 2', minutes:165, seed:2417, desc:'TYT soru dağılımı · farklı soru seçkisi', dist:TYT_DIST },
  { id:'d3', name:'TYT Deneme 3', minutes:165, seed:3629, desc:'TYT soru dağılımı · farklı soru seçkisi', dist:TYT_DIST }
];
window.TYT_DENEMELER = TYT_DENEMELER;
