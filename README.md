# Bilgi Yolu — Ders Oyunu

Ana menüden ders seçilerek oynanan, açık uçlu sorulardan oluşan oyun (Biyoloji, Fizik, İnkılap Tarihi, Din Kültürü, Edebiyat).

Oyna: https://omererenkara0-cyber.github.io/ders-oyunu/

- `index.html` — tek dosyalık oyun (yayınlanan sürüm)
- `src/` — kaynak (stil, cevap eşleştirme, soru havuzları)
- Biyoloji dersi iki seviyeye ayrılmıştır: **Kolay–Orta** (`src/data/biyoloji.js`) ve **Zor** (`src/data/biyoloji-zor.js`, çizimli/hesaplamalı/yorum soruları)
- `python3 build.py` → `dist/ders-oyunu.html` üretir; yayınlamak için `index.html` olarak kopyala
- `node test_match.js`, `node validate.js` — cevap kontrol testleri
