/* Kali Maktab Desktop 5-bosqich: soxta Firefox brauzer — manzil satri, qidiruv, bir nechta lab sahifalari,
   yuklab olish (VFS ga), PDF/fayl integratsiyasi, tarix va xatcho'plar. Internetga chiqish yo'q, faqat lab domenlari. */
(()=>{
const T=window.kmsT,DK=window.kmsDK;if(!T||!DK||!DK.dlg)return;
const {win,E,tst,root}=DK,$=(s,r)=>(r||root).querySelector(s);
const LG=k=>{try{return localStorage.getItem(k)}catch(e){return null}},LS=(k,v)=>{try{localStorage.setItem(k,v);return true}catch(e){return false}};
const J=(k,d)=>{try{return JSON.parse(LG(k))||d}catch(e){return d}};

const CSS=`
#kdsk .ff{display:flex;flex-direction:column;height:100%;background:#1c1b22;color:#fbfbfe;font-family:Inter,"Segoe UI",system-ui,sans-serif;position:relative}
#kdsk .ff svg{display:block;flex:none}
#kdsk .ff .fftb{display:flex;align-items:flex-end;gap:3px;padding:6px 8px 0;background:#1c1b22;flex:none;overflow-x:auto;scrollbar-width:none}
#kdsk .ff .fftb::-webkit-scrollbar{display:none}
#kdsk .ff .fft{display:flex;align-items:center;gap:8px;flex:0 1 190px;min-width:96px;max-width:190px;height:34px;padding:0 6px 0 10px;border-radius:8px;color:#cfcfd8;cursor:pointer;position:relative}
#kdsk .ff .fft:hover{background:rgba(255,255,255,.07)}
#kdsk .ff .fft.on{background:#3a3943;color:#fbfbfe}
#kdsk .ff .fft b{flex:1;min-width:0;font-weight:400;font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#kdsk .ff .fft .fx{width:20px;height:20px;border-radius:5px;display:flex;align-items:center;justify-content:center;flex:none;color:#cfcfd8}
#kdsk .ff .fft .fx:hover{background:rgba(255,255,255,.14)}
#kdsk .ff .fnt{width:30px;height:30px;margin:0 0 2px 2px;border:0;border-radius:8px;background:none;color:#cfcfd8;display:flex;align-items:center;justify-content:center;flex:none;padding:0}
#kdsk .ff .fnt:hover,#kdsk .ff .ib:hover{background:rgba(255,255,255,.1)}
#kdsk .ff .fav{width:16px;height:16px;border-radius:4px;display:inline-flex;align-items:center;justify-content:center;font:700 10px/1 Inter,system-ui,sans-serif;color:#fff;flex:none;overflow:hidden}
#kdsk .ff .fav.w{color:#ff9aa2}
#kdsk .ff .fav.s{color:#9bb7ff}
#kdsk .ff .fb{display:flex;gap:2px;padding:6px 8px;background:#1c1b22;align-items:center;flex:none}
#kdsk .ff .ib{width:34px;height:34px;border:0;background:none;color:#fbfbfe;border-radius:8px;display:flex;align-items:center;justify-content:center;padding:0;flex:none}
#kdsk .ff .ib:disabled{opacity:.35}
#kdsk .ff .ib.on svg{fill:#0a84ff;stroke:#0a84ff}
#kdsk .ff .fadr{flex:1;min-width:0;display:flex;align-items:center;gap:8px;height:36px;margin:0 4px;background:#2b2a33;border:1px solid transparent;border-radius:8px;padding:0 10px;color:#cfcfd8}
#kdsk .ff .fadr:focus-within{border-color:#0a84ff;box-shadow:0 0 0 2px rgba(10,132,255,.45)}
#kdsk .ff .fadr .lk.bad{color:#ff9aa2}
#kdsk .ff .fadr input{flex:1;min-width:0;background:none;border:0;color:#fbfbfe;font:14px Inter,system-ui,sans-serif;outline:0;padding:0}
#kdsk .ff .fadr input::placeholder{color:#9e9ea8}
#kdsk .ff .fbm{display:flex;gap:2px;padding:0 8px 6px;overflow-x:auto;background:#1c1b22;flex:none;border-bottom:1px solid #0c0c0d;scrollbar-width:none}
#kdsk .ff .fbm::-webkit-scrollbar{display:none}
#kdsk .ff .fbm button{display:flex;align-items:center;gap:6px;background:none;border:0;color:#fbfbfe;border-radius:6px;padding:4px 8px;white-space:nowrap;font:12.5px Inter,system-ui,sans-serif;flex:none}
#kdsk .ff .fbm button:hover{background:rgba(255,255,255,.1)}
#kdsk .ff .pbar{height:2px;background:#0a84ff;width:0;transition:width .25s;flex:none}
#kdsk .ff .pbar.on{width:70%}
#kdsk .ff .ffm{display:none;position:absolute;right:8px;top:84px;width:220px;background:#2b2a33;border-radius:10px;padding:6px;box-shadow:0 8px 28px rgba(0,0,0,.55);z-index:6;border:1px solid #3a3943}
#kdsk .ff .ffm.on{display:block}
#kdsk .ff .ffm div{display:flex;align-items:center;gap:12px;padding:9px 10px;border-radius:6px;font-size:13.5px;cursor:pointer}
#kdsk .ff .ffm div:hover{background:rgba(255,255,255,.1)}
#kdsk .ff .fpg{flex:1;overflow:auto;background:#f9f9fb;color:#15141a}
#kdsk .ff .fpg.dk{background:#1c1b22;color:#fbfbfe}
#kdsk .ff .fpg .pad{max-width:760px;margin:0 auto;padding:18px 20px 40px;font:15px/1.55 Inter,system-ui,sans-serif}
#kdsk .ff .fpg .pad.nopad{max-width:none;margin:0;padding:0}
#kdsk .ff h1{font-size:24px;margin:.2em 0 .4em;font-weight:700}
#kdsk .ff h2{font-size:16px;margin:1em 0 .3em;color:#1f2937}
#kdsk .ff p{margin:.5em 0}
#kdsk .ff a.ln{color:#0060df;text-decoration:underline;cursor:pointer}
#kdsk .ff code,#kdsk .ff pre{background:#0f172a;color:#9fd0ff;font:12px/1.5 monospace;padding:2px 5px;border-radius:4px}
#kdsk .ff pre{display:block;padding:10px;overflow:auto;white-space:pre-wrap}
#kdsk .ff .srow{display:flex;gap:8px;margin:12px 0}
#kdsk .ff .srow input{flex:1;padding:9px 12px;border-radius:8px;border:1px solid #bfbfc9;font:14px Inter,sans-serif}
#kdsk .ff .srow button{border:0;background:#0060df;color:#fff;border-radius:8px;padding:9px 16px;font:13px Inter,sans-serif}
#kdsk .ff .res{border-bottom:1px solid #e5e7eb;padding:9px 0;cursor:pointer}
#kdsk .ff .res b{display:block;color:#0060df;font-size:14px}
#kdsk .ff .res small{color:#059669;display:block;font-size:11px}
#kdsk .ff .res span{color:#444;font-size:12.5px}
#kdsk .ff .card{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:14px 16px;margin:12px 0;box-shadow:0 1px 3px rgba(0,0,0,.06)}
#kdsk .ff .warn{background:#fff3cd;border:1px solid #f2c94c;color:#7a5b00;border-radius:8px;padding:10px 12px;margin:10px 0;font-size:13px}
#kdsk .ff table{width:100%;border-collapse:collapse;margin:8px 0;font-size:13px}
#kdsk .ff td,#kdsk .ff th{border:1px solid #d9dde3;padding:5px 8px;text-align:left}
#kdsk .ff .post{border-bottom:1px solid #e5e7eb;padding:9px 0}
#kdsk .ff .post b{color:#1f2937}
#kdsk .ff .post small{color:#777}
#kdsk .ff .btnx{display:inline-block;background:#0060df;color:#fff;border-radius:7px;padding:7px 12px;font-size:12.5px;cursor:pointer;margin-top:6px;border:0}
#kdsk .ff .tag{display:inline-block;background:#eef2ff;color:#3730a3;border-radius:5px;padding:1px 7px;font-size:11px;margin-right:4px}
#kdsk .ff .ffn{max-width:640px;margin:0 auto;padding:26px 18px 44px;font:15px/1.4 Inter,system-ui,sans-serif;color:#fbfbfe}
#kdsk .ff .ffn .lg{display:flex;align-items:center;justify-content:center;gap:14px;margin:12px 0 24px;font-size:30px;font-weight:400}
#kdsk .ff .ffn .sb{display:flex;align-items:center;gap:10px;background:#2b2a33;border:1px solid #5b5b66;border-radius:10px;padding:5px 5px 5px 14px;color:#cfcfd8}
#kdsk .ff .ffn .sb:focus-within{border-color:#0a84ff;box-shadow:0 0 0 2px rgba(10,132,255,.45)}
#kdsk .ff .ffn .sb input{flex:1;min-width:0;background:none;border:0;color:#fbfbfe;font:16px Inter,system-ui,sans-serif;outline:0;padding:8px 0}
#kdsk .ff .ffn .sb input::placeholder{color:#9e9ea8}
#kdsk .ff .ffn .sb button{width:38px;height:36px;border:0;border-radius:7px;background:#0a6cf0;color:#fff;display:flex;align-items:center;justify-content:center;padding:0;flex:none}
#kdsk .ff .ffn h3{font-size:16px;font-weight:600;margin:28px 4px 14px;color:#fbfbfe}
#kdsk .ff .ffn .tiles{display:flex;flex-wrap:wrap;gap:16px 16px}
#kdsk .ff .ffn .tile{width:78px;text-align:center;font-size:12px;color:#fbfbfe;cursor:pointer}
#kdsk .ff .ffn .tile i{display:flex;width:78px;height:78px;background:#2b2a33;border-radius:16px;align-items:center;justify-content:center;margin-bottom:7px}
#kdsk .ff .ffn .tile i b{display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:10px;font:600 22px Inter,system-ui,sans-serif;color:#fff}
#kdsk .ff .ffn .tile:hover i{background:#3a3943}
#kdsk .ff .ffn .cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:14px}
#kdsk .ff .ffn .sc{background:#2b2a33;border-radius:12px;overflow:hidden}
#kdsk .ff .ffn .sc .im{height:104px}
#kdsk .ff .ffn .sc .bd{padding:11px 14px 14px}
#kdsk .ff .ffn .sc small{color:#9e9ea8;font-size:11.5px}
#kdsk .ff .ffn .sc b{display:block;margin:5px 0;font-size:15px;line-height:1.3}
#kdsk .ff .ffn .sc p{color:#c5c5ce;font-size:13px;margin:4px 0}
#kdsk .ff .ffe{max-width:640px;margin:0 auto;padding:40px 20px 50px;color:#fbfbfe;font:15px/1.5 Inter,system-ui,sans-serif}
#kdsk .ff .ffe svg{color:#ff9aa2;margin-bottom:22px}
#kdsk .ff .ffe h1{font-size:26px;line-height:1.25;color:#fbfbfe;margin:0 0 18px}
#kdsk .ff .ffe .eh{font-size:36px;font-weight:700;margin:6px 0 16px;word-break:break-all}
#kdsk .ff .ffe ul{margin:8px 0 14px;padding-left:22px}
#kdsk .ff .ffe li{margin:6px 0}
#kdsk .ff .ffe .en{color:#9e9ea8;font-size:12.5px;margin:18px 0}
#kdsk .ff .ffe .ffbtn{border:0;background:#0a6cf0;color:#fff;border-radius:7px;padding:10px 18px;font:600 14px Inter,system-ui,sans-serif}
`;
document.head.appendChild(Object.assign(document.createElement('style'),{textContent:CSS}));

/* ---------- lab "internet"i: domenlar va sahifalar ---------- */
const HOME='kstart';
const NEWS=[
 ['Maktablarda kiberxavfsizlik darslari ko\u2019paymoqda',"Respublika bo\u2019ylab bir nechta litseylarda \u201cEtik xaker asoslari\u201d elektivi sinovdan o\u2019tmoqda.",'2 soat oldin'],
 ['CTF musobaqasi: ro\u2019yxatdan o\u2019tish ochildi',"Talabalar o\u2019rtasida onlayn Capture The Flag musobaqasi fayl, tarmoq va veb toifalarida o\u2019tkaziladi.",'Kecha'],
 ['Zaif parollar hali ham №1 muammo',"Tahlilga ko\u2019ra, sinovdan o\u2019tgan tizimlarning 61% ida lug\u2019atdagi oddiy parollar ishlatilgan.",'3 kun oldin'],
];
function escR(s){return E(s)}
const IC={back:'<path d="M19 12H5M12 5l-7 7 7 7"/>',fwd:'<path d="M5 12h14M12 5l7 7-7 7"/>',rl:'<path d="M20 12a8 8 0 1 1-2.6-5.9M20 4v5h-5"/>',
 search:'<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>',star:'<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8 6.8 19.6l1-5.8L3.5 9.7l5.9-.8z"/>',
 home:'<path d="M4 11l8-7 8 7M6 10v9h4v-5h4v5h4v-9"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',lock:'<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
 warn:'<path d="M12 4.2L21 19.8H3z"/><path d="M12 10v4.2M12 17v.4"/>',x:'<path d="M6 6l12 12M18 6L6 18"/>',plus:'<path d="M12 5v14M5 12h14"/>'};
const ico=(k,s)=>`<svg viewBox="0 0 24 24" width="${s||20}" height="${s||20}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[k]}</svg>`;
const globe=s=>`<svg viewBox="0 0 64 64" width="${s}" height="${s}" aria-hidden="true"><circle cx="32" cy="32" r="30" fill="#2f8cff"/><g stroke="#fff" stroke-opacity=".55" stroke-width="1.8" fill="none"><ellipse cx="32" cy="32" rx="12" ry="30"/><path d="M3 32h58M7 19h50M7 45h50"/></g><path d="M45 19L35 35 19 45l10-16z" fill="#fff"/><path d="M45 19L35 35 29 29z" fill="#ff5a5f"/></svg>`;
const FAV={'kwiki.lab':['K','#2f74c0'],'router.lab':['R','#c0573a'],'192.168.56.1':['R','#c0573a'],'pastebin.lab':['P','#c9a92c'],'shop.lab':['D','#31b48d'],'portal.lab':['P','#3a70b8']};
const GRAD=['linear-gradient(135deg,#6a2fd6,#0a84ff)','linear-gradient(135deg,#0a8f6a,#38b6ff)','linear-gradient(135deg,#d6336c,#ff8a3d)'];
function favOf(t){
 if(t.kind==='home')return `<span class="fav">${globe(16)}</span>`;
 if(t.kind==='err')return `<span class="fav w">${ico('warn',16)}</span>`;
 if(t.kind==='search')return `<span class="fav s">${ico('search',15)}</span>`;
 const f=FAV[t.cur]||[(t.cur||'?')[0].toUpperCase(),'#6b6b78'];
 return `<span class="fav" style="background:${f[1]}">${f[0]}</span>`;
}
function page_kstart(){
 return `<div class="ffn"><div class="lg">${globe(46)}<span>KaliStart</span></div>
 <div class="sb">${ico('search',20)}<input id="ff-q0" placeholder="Search or enter address" autocapitalize="off" spellcheck="false"><button data-go="search" aria-label="Go">${ico('fwd',18)}</button></div>
 <h3>Shortcuts</h3>
 <div class="tiles">${BOOK.map(b=>{const f=FAV[b[1]];return `<div class="tile" data-go="${E(b[1])}"><i><b style="background:${f[1]}">${f[0]}</b></i>${E(b[0])}</div>`}).join('')}</div>
 <h3>Recommended stories</h3>
 <div class="cards">${NEWS.map((n,i)=>`<div class="sc"><div class="im" style="background:${GRAD[i%3]}"></div><div class="bd"><small>KaliNews · ${E(n[2])}</small><b>${E(n[0])}</b><p>${E(n[1])}</p></div></div>`).join('')}</div></div>`;
}
function page_kwiki(){
 const sect=[['nmap','Tarmoqdagi hostlarni va ochiq portlarni skanerlaydi. Masalan: <code>nmap -sV 192.168.56.101</code>.'],
  ['aircrack-ng svitasi','Wi-Fi paketlarini ushlab olib (airodump-ng), lug\u2019at yordamida parolni tiklashga (aircrack-ng) harakat qiladi.'],
  ['hydra / john / hashcat','Login-parol yoki hash qiymatlarini lug\u2019at (wordlist) orqali sinab ko\u2019radigan vositalar.'],
  ['Wireshark','Tarmoq paketlarini ushlab, filtrlab tahlil qilish uchun grafik vosita.']];
 return `<h1>\ud83d\udcd8 KaliWiki</h1><p>Ichki ma\u2019lumotnoma \u2014 darslikdagi vositalar bo\u2019yicha qisqacha.</p>
 ${sect.map(s=>`<div class="card"><b>${E(s[0])}</b><p>${s[1]}</p></div>`).join('')}
 <div class="warn">\u26a0 Bu vositalarni faqat 192.168.56.0/24 lab tarmog\u2018ida yoki o\u2019zingizga tegishli tizimda ishlating.</div>`;
}
function page_router(){
 const ssid=DK.st?DK.st.ssid:(LG('kd_ssid')||'KaliNet_5G');
 const logged=LG('kd_rtlog')==='1';
 if(!logged){
  return `<h1>\ud83d\udcf6 Router sozlamalari \u2014 192.168.56.1</h1>
  <div class="card"><p>Admin panelga kirish:</p>
  <div class="srow"><input id="ff-u" placeholder="Login" value="admin"><input id="ff-p" placeholder="Parol" type="text"></div>
  <button class="btnx" data-go="routerlogin">Kirish</button>
  <p style="color:#777;font-size:12px;margin-top:8px">Maslahat: ko\u2019plab routerlarda standart login/parol o\u2019zgartirilmagan bo\u2019ladi \u2014 <code>admin / admin</code> sinab ko\u2019ring.</p></div>`;
 }
 return `<h1>\u2699 Router admin paneli</h1>
 <table><tr><th>SSID</th><td>${E(ssid)}</td></tr><tr><th>Xavfsizlik</th><td>WPA2-PSK</td></tr>
 <tr><th>Wi-Fi paroli</th><td><code>kalimaktab</code></td></tr><tr><th>Kanal</th><td>36 (5GHz)</td></tr>
 <tr><th>DHCP range</th><td>192.168.56.100 \u2013 192.168.56.200</td></tr></table>
 <div class="warn">\ud83d\udd0e Bu panel orqali parolni to\u2018g\u2018ridan-to\u2018g\u2018ri ko\u2018rish \u2014 zaif admin panellarga misol. Haqiqiy tarmoqlarda bu og\u2018ir xavfsizlik xatosi hisoblanadi.</div>`;
}
function page_pastebin(){
 return `<h1>\ud83d\udcdd PasteLab \u2014 oxirgi joylashtirilgan</h1>
 <div class="card"><b>leak_db_dump.txt</b><br><small>anon \u00b7 2 kun oldin</small>
 <pre>ali:parol123
olim:qwerty2024
admin:admin</pre>
 <p>Haqiqiy hayotda bunday "leak" fayllari parol qayta ishlatilishini (password reuse) sinash uchun hydra/john kabi vositalarda ishlatiladi.</p></div>
 <div class="card"><b>wordlist-mini.txt</b><br><small>kali_admin \u00b7 5 kun oldin</small>
 <p>Mashq uchun kichik lug\u2019at fayli. Yuklab olingach <code>~/Downloads/wordlist-mini.txt</code> ga tushadi.</p>
 <button class="btnx" data-dl="wordlist">\u2b07 Yuklab olish (wordlist-mini.txt)</button></div>`;
}
function page_shop(){
 return `<h1>\ud83d\uded2 Maktab-Market (demo do\u2018kon)</h1><p>Veb-ilovalarni sinash uchun o\u2018quv do\u2018koni.</p>
 <div class="card"><b>Mexanik klaviatura</b> \u2014 420 000 so\u2018m<br><span style="color:#777;font-size:12px">ID: 12 \u00b7 /product.php?id=12</span></div>
 <div class="card"><b>USB Wi-Fi adapter (monitor mode)</b> \u2014 180 000 so\u2018m<br><span style="color:#777;font-size:12px">ID: 7 \u00b7 /product.php?id=7</span></div>
 <div class="warn">Bu sahifa SQL-injection mashqlari uchun maqsadli demo (sqlmap darsida ishlatiladi): <code>sqlmap -u "http://shop.lab/product.php?id=7"</code></div>`;
}
function page_examboard(){
 return `<h1>\ud83c\udfeb Maktab portali</h1><p>O\u2018quvchilar uchun ichki portal.</p>
 <div class="card"><p>Bu sahifada kirish formasi bor, lekin login/parol serverga yuboriladi. Buni Wireshark bilan "http" filtri orqali kuzatish mumkin.</p>
 <div class="srow"><input placeholder="Login" value="talaba12"><input placeholder="Parol" type="password" value="••••••"></div>
 <button class="btnx" data-go="kstart">Kirish (demo)</button></div>`;
}
const SITES={
 kstart:{t:'KaliStart',body:page_kstart},
 'kwiki.lab':{t:'KaliWiki',body:page_kwiki},
 'router.lab':{t:'Router sozlamalari',body:page_router},
 '192.168.56.1':{t:'Router sozlamalari',body:page_router},
 'pastebin.lab':{t:'PasteLab',body:page_pastebin},
 'shop.lab':{t:'Maktab-Market',body:page_shop},
 'portal.lab':{t:'Maktab portali',body:page_examboard},
};
const BOOK=[['KaliWiki','kwiki.lab'],['Router','router.lab'],['PasteLab','pastebin.lab'],['Do\u2018kon','shop.lab'],['Portal','portal.lab']];

function searchResults(q){
 const ql=q.toLowerCase();
 const hay=[['kwiki.lab','KaliWiki \u2014 vositalar ma\u2019lumotnomasi','nmap, aircrack-ng, hydra, wireshark haqida qisqacha tushuntirishlar.'],
  ['router.lab','Router sozlamalari \u2014 192.168.56.1','Wi-Fi tarmog\u2018i sozlamalari va admin panel.'],
  ['pastebin.lab','PasteLab \u2014 oxirgi joylashtirilgan matnlar','Oshkor bo\u2018lgan parollar ro\u2019yxati va wordlist fayli.'],
  ['shop.lab','Maktab-Market demo do\u2018koni','Veb ilova zaifliklarini sinash uchun o\u2018quv do\u2018koni (SQLi mashq).'],
  ['portal.lab','Maktab portali \u2014 kirish sahifasi','O\u2018quvchilar portali, login forma (Wireshark mashqi uchun).']];
 let r=hay.filter(h=>h[1].toLowerCase().includes(ql)||h[2].toLowerCase().includes(ql)||h[0].includes(ql));
 if(!r.length)r=hay;
 return r;
}
function page_search(q){
 const r=searchResults(q);
 return `<h1>\ud83d\udd0d "${E(q)}" uchun natijalar</h1>
 
 ${r.map(x=>`<div class="res" data-go="${E(x[0])}"><b>${E(x[1])}</b><small>${E(x[0])}</small><span>${E(x[2])}</span></div>`).join('')}`;
}

/* ---------- oyna ---------- */
let bw=null;
function isUrlLike(v){return /^[\w.-]+\.(lab|local|com|org|net)(\/.*)?$/i.test(v)||/^\d+\.\d+\.\d+\.\d+/.test(v)||v in SITES}
function normUrl(v){v=v.trim();v=v.replace(/^https?:\/\//,'');v=v.replace(/\/$/,'');return v}
function errPage(t,m){return `<div class="ffe">${ico('warn',72)}<h1>${E(t)}</h1><p>${m}</p><div class="en">Bu simulyatsiya: faqat .lab sahifalari va qidiruv ishlaydi.</div><button class="ffbtn" data-a="rl">Try Again</button></div>`}
function dnsPage(u){const host=u.split('/')[0];
 return `<div class="ffe">${ico('warn',72)}<h1>Hmm. We’re having trouble finding that site.</h1><p>We can’t connect to the server at</p><div class="eh">${E(host)}.</div>
 <p>If that address is correct, here are three other things you can try:</p>
 <ul><li>Try again later.</li><li>Check your network connection.</li><li>If you are connected but behind a firewall, check that Firefox has permission to access the Web.</li></ul>
 <div class="en">Bu simulyatsiya: faqat .lab sahifalari va qidiruv ishlaydi.</div><button class="ffbtn" data-a="rl">Try Again</button></div>`}

function openBrowser(initial){
 if(bw&&bw.el.isConnected){bw.el.style.display='flex';bw.open(initial);return}
 const b=document.createElement('div');b.className='ff';
 b.innerHTML=`<div class="fftb"></div>
 <div class="fb"><button class="ib" data-a="back" aria-label="Back">${ico('back')}</button><button class="ib" data-a="fwd" aria-label="Forward">${ico('fwd')}</button><button class="ib" data-a="rl" aria-label="Reload">${ico('rl')}</button>
   <div class="fadr"><span class="lk">${ico('search',16)}</span><input class="fadri" placeholder="Search or enter address" autocapitalize="off" spellcheck="false"></div>
   <button class="ib" data-a="bm" aria-label="Bookmark">${ico('star')}</button><button class="ib" data-a="hm" aria-label="Home">${ico('home')}</button><button class="ib" data-a="mn" aria-label="Menu">${ico('menu')}</button></div>
 <div class="fbm"></div>
 <div class="pbar"></div><div class="fpg"><div class="pad"></div></div>
 <div class="ffm"><div data-m="nt">${ico('plus',18)}New tab</div><div data-m="hm">${ico('home',18)}Home</div><div data-m="rl">${ico('rl',18)}Reload</div><div data-m="xt">${ico('x',18)}Close tab</div></div>`;
 const pad=b.querySelector('.pad'),adr=b.querySelector('.fadri'),lk=b.querySelector('.lk'),pbar=b.querySelector('.pbar'),fpg=b.querySelector('.fpg'),tb=b.querySelector('.fftb'),bmb=b.querySelector('.fbm'),mnu=b.querySelector('.ffm');
 let tabs=[],ai=0,bmx=J('kd_ffbm',[]);
 const newT=()=>({hist:[],hi:-1,cur:HOME,kind:'home',title:'New Tab'});
 function build(t){
  const url=t.cur;let kind='site',title=(SITES[url]&&SITES[url].t)||url,html;
  if(url===HOME){kind='home';title='New Tab';html=page_kstart()}
  else if(/\.pdf$/i.test(url)||/^file:\/\//.test(url)){
   const p=url.replace(/^file:\/\//,'');const n=T.node(p);
   if(n&&n.t==='f'){html=`<p style="padding:20px;color:#15141a">Fayl ochilmoqda: <code>${E(p)}</code></p>`;title=p.split('/').pop();setTimeout(()=>DK.openFile?DK.openFile(p):(DK.docs&&DK.docs()),200)}
   else{kind='err';title='File Not Found';html=errPage('File not found',`${E(p)} mavjud emas.`)}
  }
  else if(SITES[url])html=SITES[url].body();
  else if(isUrlLike(url)){kind='err';title='Server Not Found';html=dnsPage(url)}
  else{kind='search';title=url+' - Search';html=page_search(url)}
  t.kind=kind;t.title=title;return html;
 }
 function drawBar(){
  const L=BOOK.concat(bmx.map(u=>[u,u]));
  bmb.innerHTML=L.map(x=>{const f=FAV[x[1]]||[(x[1][0]||'?').toUpperCase(),'#6b6b78'];return `<button data-go="${E(x[1])}"><span class="fav" style="background:${f[1]}">${f[0]}</span>${E(x[0])}</button>`}).join('');
 }
 function drawTabs(){
  tb.innerHTML=tabs.map((t,i)=>`<div class="fft${i===ai?' on':''}" data-t="${i}">${favOf(t)}<b>${E(t.title)}</b><span class="fx" data-x="${i}">${ico('x',12)}</span></div>`).join('')+`<button class="fnt" data-a="nt" aria-label="New tab">${ico('plus',16)}</button>`;
 }
 function show(){
  const t=tabs[ai];if(!t)return;
  pbar.classList.add('on');setTimeout(()=>pbar.classList.remove('on'),180);
  const html=build(t),dark=t.kind==='home'||t.kind==='err';
  fpg.classList.toggle('dk',dark);pad.className='pad'+(dark?' nopad':'');pad.innerHTML=html;fpg.scrollTop=0;
  bw.cur=t.cur;adr.value=t.cur===HOME?'':t.cur;
  lk.className='lk'+(t.kind==='err'?' bad':'');
  lk.innerHTML=ico(t.kind==='err'?'warn':(t.kind==='home'||t.kind==='search')?'search':'lock',16);
  b.querySelector('[data-a=back]').disabled=t.hi<=0;b.querySelector('[data-a=fwd]').disabled=t.hi>=t.hist.length-1;
  b.querySelector('[data-a=bm]').classList.toggle('on',t.cur!==HOME&&bmx.includes(t.cur));
  drawTabs();drawBar();bindPad();
 }
 function go(url,push){
  const t=tabs[ai];url=url===HOME?HOME:normUrl(url);
  if(push!==false){t.hist=t.hist.slice(0,t.hi+1);t.hist.push(url);t.hi=t.hist.length-1}
  t.cur=url;show();
 }
 function addTab(url){tabs.push(newT());ai=tabs.length-1;go(url||HOME)}
 function closeTab(i){
  if(tabs.length<=1){bw.close();bw=null;return}
  tabs.splice(i,1);if(ai>=i&&ai>0)ai--;show();
 }
 function bindPad(){
  pad.querySelectorAll('[data-go]').forEach(el=>el.onclick=()=>go(el.dataset.go));
  pad.querySelectorAll('[data-dl]').forEach(el=>el.onclick=()=>doDownload(el.dataset.dl));
  pad.querySelectorAll('[data-a=rl]').forEach(el=>el.onclick=()=>show());
  const q0=pad.querySelector('#ff-q0');
  if(q0){pad.querySelector('[data-go="search"]').onclick=()=>go(q0.value.trim()||'nmap');q0.addEventListener('keydown',e=>{if(e.key==='Enter')go(q0.value.trim()||'nmap')});}
  const lb=pad.querySelector('[data-go="routerlogin"]');
  if(lb)lb.onclick=()=>{const u=pad.querySelector('#ff-u').value.trim(),p=pad.querySelector('#ff-p').value.trim();
   if(u==='admin'&&p==='admin'){LS('kd_rtlog','1');tst('✅ Kirish muvaffaqiyatli');go('router.lab')}
   else tst("Noto‘g‘ri login/parol. Standart qiymatni sinab ko‘ring.")};
 }
 function doDownload(k){
  if(k==='wordlist'){const n=T.node('/home/kali/Downloads');if(n){n.c['wordlist-mini.txt']=T.f('123456\nqwerty\nkalimaktab\nparol123\nadmin\n');DK.flush&&DK.flush();tst('⬇ wordlist-mini.txt → ~/Downloads')}}
 }
 b.querySelector('.fb').addEventListener('click',e=>{
  const bt=e.target.closest('[data-a]');if(!bt)return;const a=bt.dataset.a,t=tabs[ai];mnu.classList.remove('on');
  if(a==='back'&&t.hi>0){t.hi--;t.cur=t.hist[t.hi];show()}
  else if(a==='fwd'&&t.hi<t.hist.length-1){t.hi++;t.cur=t.hist[t.hi];show()}
  else if(a==='rl')show();
  else if(a==='hm')go(HOME);
  else if(a==='mn'){e.stopPropagation();mnu.classList.toggle('on')}
  else if(a==='bm'){const u=t.cur;if(u===HOME)return;const i=bmx.indexOf(u);
   if(i>=0){bmx.splice(i,1);tst('★ Xatcho‘pdan olib tashlandi')}
   else if(!BOOK.some(x=>x[1]===u)){bmx.push(u);tst('★ Xatcho‘plarga qo‘shildi')}
   LS('kd_ffbm',JSON.stringify(bmx));show()}});
 mnu.addEventListener('click',e=>{const m=e.target.closest('[data-m]');if(!m)return;mnu.classList.remove('on');
  const k=m.dataset.m;if(k==='nt')addTab();else if(k==='hm')go(HOME);else if(k==='rl')show();else if(k==='xt')closeTab(ai)});
 b.addEventListener('click',e=>{if(!e.target.closest('.ffm')&&!e.target.closest('[data-a=mn]'))mnu.classList.remove('on')});
 tb.addEventListener('click',e=>{
  if(e.target.closest('[data-a=nt]')){addTab();return}
  const x=e.target.closest('[data-x]');if(x){e.stopPropagation();closeTab(+x.dataset.x);return}
  const t=e.target.closest('[data-t]');if(t&&+t.dataset.t!==ai){ai=+t.dataset.t;show()}});
 bmb.addEventListener('click',e=>{const u=e.target.closest('[data-go]');if(u)go(u.dataset.go)});
 adr.addEventListener('focus',()=>setTimeout(()=>adr.select(),0));
 adr.addEventListener('keydown',e=>{if(e.key==='Enter'){go(adr.value.trim()||HOME);adr.blur()}});
 bw=win('Firefox',b,{w:620,h:440});bw.render=()=>show();
 bw.open=u=>{if(u)addTab(u)};
 tabs.push(newT());ai=0;go(initial||HOME);
}
DK.browser=openBrowser;
/* ---------- terminal integratsiyasi ---------- */
const C=T.C;
C.firefox=a=>{if(!root.classList.contains('on'))return "firefox: brauzer faqat \ud83d\udc09 Kali Desktop ichida ochiladi.";const u=a.filter(x=>x[0]!=='-')[0];openBrowser(u);return ''};
C['firefox-esr']=C.firefox;

/* ---------- menyu va ish stoli ikonkasi ---------- */
const mn=$('#kd-mn'),anchor=$('[data-a=files]',mn);
if(anchor)anchor.insertAdjacentHTML('afterend',`<div class="ct" data-a="ff">\ud83c\udf10 Firefox</div>`);
mn&&mn.addEventListener('click',e=>{if(e.target.dataset.a==='ff'){mn.classList.remove('on');openBrowser()}},true);
const ic=$('#kd-ic');
if(ic){const d=document.createElement('div');d.innerHTML=`<b>\ud83c\udf10</b>Firefox`;let last=0;
 d.onclick=()=>{ic.querySelectorAll('.sel').forEach(x=>x.classList.remove('sel'));d.classList.add('sel');const now=Date.now();if(now-last<450){openBrowser();d.classList.remove('sel')}last=now};
 ic.insertBefore(d,ic.firstChild);}
})();
