# AGENTS.md

## Proje
"Bilgi Yolu" — TYT odaklı Türkçe eğitim quiz oyunu. Tek dosya HTML olarak derlenir.

## Build ve test
- Derle: `python3 build.py` → `dist/ders-oyunu.html` (src/index.template.html + style.css + JS birleşimi)
- Yayın: `cp dist/ders-oyunu.html index.html` (ikisi birebir aynı olmalı)
- Doğrula: `node validate.js` (biçim, şık tekrarı, deneme dağılımı, weak/anim kontrolleri)
- Soru verisi dosya sırası `build.py` içindeki `order` listesinde; yeni veri dosyası eklenirse `build.py` ve `validate.js` FILES listelerine de ekle.

## Yapı
- `src/data/tyt-*.js`: ders başına `Q_TYT_*` globali; `{kolay:[], zor:[]}`. Soru alanları: `type:'mc'`, `topic`, `q`, `options`(5), `answer`(0-4), `hints`, `exp`. Vurgu için `<u>...</u>`.
- `src/data/tyt-ek.js`: ek soru havuzu (denemeleri kesişimsiz yapmak için). `add(Q_TYT_X, 'kolay'|'zor', [...])` ile mevcut dizilere ekler. Veri dosyalarından SONRA yüklenir.
- `src/data/tyt-denemeler.js`: `TYT_DENEMELER` (seed, minutes, dist). TYT dağılımı toplam 120 soru / 165 dk.
- `src/engine.js`: `denemePick(cfg)` her dersin havuzunu sabit tohumla karıştırıp deneme indeksine göre dilimler → denemeler aynı dersten ortak soru almaz (havuz ≥ 3×dağılım olmalı).
- Deneme sınav ekranı (`special:'deneme'`): sorular `DENEME_GROUPS` sırasına göre gruplu gelir (Türkçe → Sosyal: Tarih,Coğrafya,Felsefe,Din → Matematik+Geometri → Fen: Fizik,Kimya,Biyoloji). Sol kolonda optik form + ders kısayolları (`optikHtml`, `bindDeneme`, `syncOptik`), soru kartında "Önceki soru" ve "Sınavı bitir" bulunur. Deneme soruları karıştırılmaz (sıra korunur).

## Kurallar
- Deneme dağılımı sabit: Türkçe 40, Tarih/Coğrafya/Felsefe/Din 5'er, Temel Matematik 30, Geometri 10, Fizik 7, Kimya 7, Biyoloji 6 (=120).
- 3 denemenin kesişimsiz olması için her dersin çoktan seçmeli havuzu ≥ 3×deneme başına sayı olmalı (Türkçe ≥120, Mat ≥90, Geo ≥30, Fiz ≥21, Kim ≥21, Biyo ≥18, Sosyal ≥15).
- Aynı soru metni (`q`) iki kez geçemez; validate bunu yakalar.
- Ana menü yalnızca "TYT Denemeleri" ve "Yanlışlarım" içerir.
