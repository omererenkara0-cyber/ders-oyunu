/* Ders bazlı formül kağıdı verisi.
   Biçim: FORMULS[dersId] = [ { h:başlık, note?:açıklama, rows:[[etiket, formül], ...] }, ... ] */
var FORMULS = {
  fizik: [
    { h:'1. Temel çembersel hareket büyüklükleri', fig:'circ', figCap:'Çembersel yörüngede dönen cisim (v: çizgisel hız, r: yarıçap)',
      rows:[
        ['Periyot (T, s)', 'T = 1/f = t/n'],
        ['Frekans (f, Hz)', 'f = 1/T = n/t'],
        ['Açısal hız (ω, rad/s)', 'ω = 2π/T = 2πf = θ/t'],
        ['Çizgisel hız (v, m/s)', 'v = 2πr/T = 2πrf = ω·r']
      ]},
    { h:'2. Merkezcil ivme ve merkezcil kuvvet', fig:'avgacc', figCap:'Merkezcil ivme yönü çemberin merkezine doğrudur',
      rows:[
        ['Merkezcil ivme', 'a = v²/r = ω²·r = ω·v = 4π²r/T² = 4π²r·f²'],
        ['Merkezcil kuvvet', 'F = m·a = m·v²/r = m·ω²·r = m·ω·v = 4π²mr/T²']
      ]},
    { h:'3. Viraj, eğimli yol ve silindir (rotor)',
      note:'Merkezcil kuvvet her zaman virajın/çemberin merkezine doğrudur.',
      fig:'banked', figCap:'Eğimli viraj kesiti (N: normal kuvvet, mg: ağırlık)',
      rows:[
        ['Yatay virajda sürtünme kuvveti', 'f_s = m·v²/r   (f_s,max = k·m·g)'],
        ['Yatay virajda maksimum güvenli hız', 'v_max = √(k·g·r)'],
        ['Eğimli yol (sürtünmesiz)', 'tanθ = v²/(r·g)'],
        ['Eğimli yolda ideal hız', 'v = √(r·g·tanθ)'],
        ['Silindir içi — yatay (normal)', 'N = m·ω²·r = m·v²/r'],
        ['Silindir içi — düşey (sürtünme = ağırlık)', 'k·N = m·g'],
        ['Silindir içi minimum açısal hız', 'ω_min = √(g/(k·r))'],
        ['Silindir içi minimum hız', 'v_min = √(g·r/k)']
      ]},
    { h:'4. Düşey düzlemde düzgün çembersel hareket',
      note:'+ yön merkeze doğru. Üstte gerilme/normal ile ağırlık aynı yönde; altta zıt yönde.',
      fig:'vcircle', figCap:'Düşey çembersel hareket (C: tepe, F: dip)',
      rows:[
        ['Tepe (üst) nokta', 'T_üst = m·v²/r − m·g'],
        ['Tepe — gergin kalma koşulu', 'T ≥ 0  →  v_üst ≥ √(g·r)'],
        ['Dip (alt) nokta', 'T_alt = m·v²/r + m·g   (en büyük gerilme)'],
        ['Orta (yan) nokta', 'T_orta = m·v²/r'],
        ['Enerji: tepe ↔ dip', '½m·v_alt² = ½m·v_üst² + m·g·(2r)'],
        ['Hız bağıntısı', 'v_alt² = v_üst² + 4g·r'],
        ['En küçük durumdaki dip hızı', 'v_alt,min = √(5g·r)']
      ]},
    { h:'5. Konik sarkaç',
      note:'İp uzunluğu L, düşeyle açı θ, yarıçap r = L·sinθ.',
      fig:'conical', figCap:'Konik sarkaç (T: ip gerilmesi, mg: ağırlık)',
      rows:[
        ['Yatay bileşen', 'T·sinθ = m·ω²·r = m·v²/r'],
        ['Düşey bileşen', 'T·cosθ = m·g'],
        ['Açı ilişkisi', 'tanθ = ω²·r/g = v²/(r·g)'],
        ['Açısal hız', 'ω = √(g/(L·cosθ))'],
        ['Periyot', 'T = 2π·√(L·cosθ/g)'],
        ['İp gerilmesi', 'T = m·g/cosθ']
      ]},
    { h:'6. Dönme hareketi', fig:'torque', figCap:'Sabit eksen etrafında dönme ve tork',
      rows:[
        ['Açısal ivme', 'α = Δω/Δt'],
        ['Tork', 'τ = F·r ,   τ = I·α'],
        ['Kaymadan yuvarlanma', 'v = ω·r ,   a = α·r']
      ]},
    { h:'7. Eylemsizlik momenti (I)', fig:'inertia1', figCap:'Noktasal kütlelerin dönme eksenine göre eylemsizlik momenti',
      rows:[
        ['Noktasal kütle', 'I = m·r²'],
        ['Çubuk (ortadan)', 'I = (1/12)·M·L²'],
        ['Çubuk (uçtan)', 'I = (1/3)·M·L²'],
        ['Disk / silindir', 'I = ½·M·R²'],
        ['Halka / çember', 'I = M·R²'],
        ['Dolu küre', 'I = (2/5)·M·R²'],
        ['Boş küre (kabuk)', 'I = (2/3)·M·R²'],
        ['Paralel eksen (Steiner)', 'I = I_merkez + M·d²']
      ]},
    { h:'8. Dönme kinetik enerjisi ve yuvarlanma', fig:'rolling', figCap:'Kaymadan yuvarlanan teker (v: öteleme hızı)',
      rows:[
        ['Dönme kinetik enerjisi', 'E_dönme = ½·I·ω²'],
        ['Dönerek öteleme (toplam)', 'E = ½·m·v² + ½·I·ω²'],
        ['Eğik düzlemde yuvarlanma ivmesi', 'a = g·sinθ / (1 + I/(m·r²))'],
        ['Dolu küre', 'a = (5/7)·g·sinθ'],
        ['Silindir / disk', 'a = (2/3)·g·sinθ'],
        ['Halka', 'a = (1/2)·g·sinθ']
      ]},
    { h:'9. Açısal momentum', fig:'skater', figCap:'Kollarını kapatınca I küçülür, ω büyür (L korunur)',
      rows:[
        ['Açısal momentum', 'L = I·ω'],
        ['Noktasal kütle', 'L = m·v·r = m·ω·r²'],
        ['Tork–momentum ilişkisi', 'τ = ΔL/Δt'],
        ['Korunum (I değişirse)', 'I₁·ω₁ = I₂·ω₂']
      ]},
    { h:'10. Kütle çekimi ve yer çekimi', fig:'planets', figCap:'Ağırlıkları eşit iki cisim: F = G·M·m/r²',
      rows:[
        ['Newton çekim yasası', 'F = G·M·m/r²'],
        ['Çekim sabiti', 'G = 6,67×10⁻¹¹ N·m²/kg²'],
        ['Yüzeyde yer çekimi ivmesi', 'g = G·M/R²'],
        ['Yükseklikte yer çekimi ivmesi', 'g′ = g·(R/(R+h))²'],
        ['Ağırlık', 'W = m·g']
      ]},
    { h:'11. Uydu: yörünge hızı ve periyot',
      note:'Çekim kuvveti merkezcil kuvveti sağlar: G·M·m/r² = m·v²/r.',
      fig:'earthsat', figCap:'Dünya çevresinde dolanan uydu (r = R + h)',
      rows:[
        ['Yörünge (dolanma) hızı', 'v = √(G·M/r)   (r = R + h)'],
        ['Yüzeye yakın hız', 'v = √(g·R) ≈ 7,9 km/s'],
        ['Yörünge periyodu', 'T = 2π·√(r³/(G·M))'],
        ['Kepler 3. yasa', 'T²/r³ = 4π²/(G·M) = sabit'],
        ['Yörünge enerjileri', 'E_pot = −G·M·m/r ,   E_kin = +G·M·m/(2r)'],
        ['Toplam enerji', 'E = −G·M·m/(2r)']
      ]},
    { h:'12. Kurtulma (kaçış) hızı ve bağlanma enerjisi', fig:'escape', figCap:'Bir gezegenin çekiminden kurtulma (v_k: kaçış hızı)',
      rows:[
        ['Kurtulma hızı', 'v_k = √(2·G·M/R) = √(2·g·R)'],
        ['Dünya için yaklaşık', 'v_k ≈ 11,2 km/s'],
        ['Bağlanma enerjisi', 'E_bağlanma = |E| = G·M·m/(2r)']
      ]}
  ]
};
window.FORMULS = FORMULS;
if(typeof module!=='undefined') module.exports = FORMULS;
