var IC = {
  bio:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M7 3c0 6 10 6 10 12s-10 6-10 6M17 3c0 6-10 6-10 12"/><path d="M8.5 6h7M8 18h8M10 9.5h4M10 14.5h4"/></svg>',
  fiz:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-60 12 12)"/></svg>',
  ink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M4 21V9l8-5 8 5v12"/><path d="M2 21h20M8 21v-6h8v6M9 11h6"/></svg>',
  din:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 6c-2-1.5-5-2-8-1.5v14c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5v-14c-3-.5-6 0-8 1.5z"/><path d="M12 6v14"/></svg>',
  ed:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3l5 5L9 20H4v-5z"/><path d="M13 6l5 5"/></svg>'
};
var SUBJECTS = [
  {id:'biyoloji', name:'Biyoloji', desc:'Nükleik asitler · DNA replikasyonu · Protein sentezi', color:'#8cc49e', icon:IC.bio, questions:Q_BIYOLOJI,
    levels:[
      {id:'kolay', name:'Kolay–Orta', desc:'Çalışma soruları · açık uçlu', questions:Q_BIYOLOJI},
      {id:'zor', name:'Zor', desc:'Çizimli · hesaplama · yorum', questions:Q_BIYOLOJI_ZOR}
    ]},
  {id:'fizik', name:'Fizik', desc:'Çembersel hareket · Dönme · Kütle çekimi', color:'#8fb4dd', icon:IC.fiz, questions:Q_FIZIK},
  {id:'inkilap', name:'İnkılap Tarihi', desc:'Çalışma soruları (ilk 10)', color:'#de9aa3', icon:IC.ink, questions:Q_INKILAP},
  {id:'din', name:'Din Kültürü', desc:'İslam ve bilim · 1. dönem 1. sınav', color:'#d9b56f', icon:IC.din, questions:Q_DIN},
  {id:'edebiyat', name:'Edebiyat', desc:'1. dönem sınav soruları', color:'#b4a3dd', icon:IC.ed, questions:Q_EDEBIYAT}
];
window.SUBJECTS = SUBJECTS;
