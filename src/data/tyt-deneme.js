/* TYT Deneme Sınavı yapılandırması — ders bazlı soru dağılımı ve süre.
   Gerçek TYT dağılımı: Türkçe 40, Temel Matematik 40, Sosyal 20, Fen 20 (toplam 120).
   Soru havuzu küçük olduğundan dağılım, mevcut soru sayısıyla sınırlanır. */
var TYT_DENEME = {
  name:'TYT Deneme Sınavı',
  minutes:165,
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
  ]
};
