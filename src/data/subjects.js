var IC = {
  tur:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16v16H4z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
  mat:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h7M7.5 3.5v7"/><path d="M14 6l6 6M20 6l-6 6"/><path d="M4 17h7"/><path d="M14 20h6"/></svg>',
  geo:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M3 20L12 4l9 16z"/><path d="M12 4v16"/></svg>',
  fiz:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-60 12 12)"/></svg>',
  kim:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6M10 3v6L5 18a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/><path d="M7.5 14h9"/></svg>',
  bio:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M7 3c0 6 10 6 10 12s-10 6-10 6M17 3c0 6-10 6-10 12"/><path d="M8.5 6h7M8 18h8M10 9.5h4M10 14.5h4"/></svg>',
  tar:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M4 21V9l8-5 8 5v12"/><path d="M2 21h20M8 21v-6h8v6M9 11h6"/></svg>',
  cog:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>',
  fel:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0-3 11v2h6v-2a6 6 0 0 0-3-11z"/><path d="M10 20h4M10.5 22h3"/></svg>',
  din:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 6c-2-1.5-5-2-8-1.5v14c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5v-14c-3-.5-6 0-8 1.5z"/><path d="M12 6v14"/></svg>'
};
function tytSubject(id, name, desc, color, icon, data, levelDesc){
  levelDesc = levelDesc || {};
  return {id:id, name:name, desc:desc, color:color, icon:icon,
    levels:[
      {id:'kolay', name:'Kolay–Orta', desc:levelDesc.kolay||'Temel kavram soruları · çoktan seçmeli', questions:data.kolay},
      {id:'zor', name:'Zor', desc:levelDesc.zor||'Yorum · hesaplama · çeldiricili', questions:data.zor}
    ]};
}
var SUBJECTS = [
  tytSubject('turkce',    'Türkçe',           'Sözcükte anlam · paragraf · yazım', '#de9aa3', IC.tur, Q_TYT_TURKCE),
  tytSubject('matematik', 'Temel Matematik',  'Sayılar · denklem · problemler',    '#8fb4dd', IC.mat, Q_TYT_MATEMATIK),
  tytSubject('geometri',  'Geometri',         'Açılar · alan · çember',            '#8cc49e', IC.geo, Q_TYT_GEOMETRI),
  tytSubject('fizik',     'Fizik',            'Hareket · kuvvet · enerji',         '#7fb0e0', IC.fiz, Q_TYT_FIZIK),
  tytSubject('kimya',     'Kimya',            'Atom · karışımlar · mol',           '#d9b56f', IC.kim, Q_TYT_KIMYA),
  tytSubject('biyoloji',  'Biyoloji',         'Hücre · nükleik asitler · replikasyon', '#8cc49e', IC.bio, Q_TYT_BIYOLOJI, {zor:'Çizimli · açık uçlu · yazı toleranslı'}),
  tytSubject('tarih',     'Tarih',            'İlk Türk devletleri · inkılaplar',  '#de9aa3', IC.tar, Q_TYT_TARIH),
  tytSubject('cografya',  'Coğrafya',         'İklim · yer şekilleri · nüfus',     '#b4a3dd', IC.cog, Q_TYT_COGRAFYA),
  tytSubject('felsefe',   'Felsefe',          'Bilgi · ahlak · varlık',            '#c9a3dd', IC.fel, Q_TYT_FELSEFE),
  tytSubject('din',       'Din Kültürü',      'İnanç · ibadet · ahlak',            '#d9b56f', IC.din, Q_TYT_DIN)
];
window.SUBJECTS = SUBJECTS;
window.TYT_DENEME = TYT_DENEME;
