/* TYT Deneme Sınavları — TÜM denemeler aynı TYT soru dağılımına sahiptir.
   TYT dağılımı (toplam 120 soru):
     Türkçe 40 · Sosyal 20 (Tarih 5, Coğrafya 5, Felsefe 5, Din Kültürü 5)
     · Temel Matematik 40 (son 10 sorusu Geometri) · Fen 20 (Fizik 7, Kimya 7, Biyoloji 6).
   Denemeler yalnızca tohumları (seed) bakımından farklıdır; böylece her denemede farklı sorular seçilir.
   Soru sırası gerçek TYT düzeni izler: Türkçe → Sosyal → Matematik(+Geometri) → Fen. */
var TYT_DIST = [
  {id:'turkce',    n:40},
  {id:'tarih',     n:5},
  {id:'cografya',  n:5},
  {id:'felsefe',   n:5},
  {id:'din',       n:5},
  {id:'matematik', n:30},
  {id:'geometri',  n:10},
  {id:'fizik',     n:7},
  {id:'kimya',     n:7},
  {id:'biyoloji',  n:6}
];
var TYT_DENEMELER = [
  { id:'d1', name:'TYT Deneme 1', minutes:165, seed:1301, desc:'120 soru · TYT dağılımı · farklı soru seçkisi', dist:TYT_DIST },
  { id:'d2', name:'TYT Deneme 2', minutes:165, seed:2417, desc:'120 soru · TYT dağılımı · farklı soru seçkisi', dist:TYT_DIST },
  { id:'d3', name:'TYT Deneme 3', minutes:165, seed:3629, desc:'120 soru · TYT dağılımı · farklı soru seçkisi', dist:TYT_DIST }
];
window.TYT_DENEMELER = TYT_DENEMELER;
