/* Kali Maktab Desktop 7-bosqich: Tarmoq skanerlash (Nmap), Veb-sayt zaifligi (SQL in'ektsiya, lab.local)
   va Parolni crack qilish (hashcat) — to'liq ishlaydigan soxta oqim + qo'llanma + bot namoyishi.
   CSS klasslari (.gd/.sig/.tm/.gd-kebab/.gd-kdd) desktop6.js tomonidan allaqachon qo'shilgan — qayta yozilmaydi. */
(()=>{
const T=window.kmsT,DK=window.kmsDK;if(!T||!DK||!DK.dlg)return;
const {win,E,tst,root}=DK,C=T.C,$=(s,r)=>(r||root).querySelector(s);
const LG=k=>{try{return localStorage.getItem(k)}catch(e){return null}},LS=(k,v)=>{try{localStorage.setItem(k,v);return true}catch(e){return false}};
const delay=ms=>new Promise(r=>setTimeout(r,ms));

/* ---------- soxta nishonlar ---------- */
const NET_TARGETS=[{ip:'192.168.56.101',host:'lab-web01'},{ip:'192.168.56.102',host:'lab-db01'}];
const NET_VULNS={'192.168.56.101':["CVE-2021-3156 (sudo heap overflow) \u2014 mahalliy imtiyozni oshirish"],'192.168.56.102':["CVE-2016-6662 (MySQL) \u2014 konfiguratsiya fayli orqali root RCE"]};
const WEB_TARGET={url:'http://lab.local/login.php?user=1',db:'lab_app',table:'users'};
const WEB_USERS=[{id:1,user:'admin',hash:'5f4dcc3b5aa765d61d8327deb882cf99',pass:'password'},{id:2,user:'ali',hash:'e9aba73de1a9715fd100fe111585cebc',pass:'parol123'}];
const HASH_TARGETS=WEB_USERS;

/* ---------- buyruqlar: mavjud bazaviy nmap/sqlmap/hashcat buziladigan emas, faqat YANGI holatlar uchun kengaytiriladi ---------- */
const _nmap=C.nmap;
C.nmap=a=>{
 if(a.includes('--script')&&a.some(x=>/vuln/.test(x))){
  const tg=a.filter(x=>/^\d+\.\d+\.\d+\.\d+$/.test(x)).pop();
  if(!tg)return 'nmap: nishon manzil kerak. Masalan: nmap --script vuln 192.168.56.101';
  if(!tg.startsWith('192.168.56.'))return "Faqat 192.168.56.0/24 laboratoriya manzillari mavjud.";
  const vulns=NET_VULNS[tg];
  LS('kw7_vuln_'+tg,'1');
  return `Starting Nmap 7.95 ( https://nmap.org )\nNmap scan report for ${tg}\nPORT   STATE SERVICE\n22/tcp open  ssh\n80/tcp open  http\n\nHost script results:\n`+(vulns?vulns.map(v=>'|_ '+v).join('\n'):"|_ ma'lum zaiflik topilmadi")+`\n\nNmap done: 1 IP address (1 host up) scanned in 1.8 seconds`;
 }
 const r=_nmap?_nmap(a):null;
 if(r!=null){const tg=a.filter(x=>/^\d+\.\d+\.\d+\.\d+$/.test(x)).pop();if(tg)LS('kw7_scan_'+tg,'1')}
 return r!=null?r:'nmap: nishon manzil kerak';
};
const _sqlmap=C.sqlmap;
C.sqlmap=a=>{
 const ui=a.indexOf('-u'),url=ui>=0?a[ui+1]:(a.find(x=>/^https?:\/\//.test(x))||null);
 if(url&&url.includes('lab.local')){
  if(a.includes('--dbs')){if(!LG('kw7_sqli'))return "sqlmap: avval in'ektsiyani aniqlang: sqlmap -u \"<URL>\" --batch";LS('kw7_dbs','1');return `available databases [1]:\n[*] ${WEB_TARGET.db}`}
  if(a.includes('--tables')){if(!LG('kw7_sqli'))return "sqlmap: avval in'ektsiyani aniqlang";LS('kw7_tables','1');return `Database: ${WEB_TARGET.db}\n[1 table]\n+-------+\n| ${WEB_TARGET.table} |\n+-------+`}
  if(a.includes('--dump')){if(!LG('kw7_sqli'))return "sqlmap: avval in'ektsiyani aniqlang";LS('kw7_dump','1');return `Database: ${WEB_TARGET.db}\nTable: ${WEB_TARGET.table}\n`+WEB_USERS.map(u=>`${u.id} | ${u.user} | ${u.hash}`).join('\n')}
  LS('kw7_sqli','1');
  return `[*] starting @ ${new Date().toTimeString().slice(0,8)}\n[*] testing connection to the target URL\nsqlmap identified the following injection point(s):\nParameter: user (GET)\n    Type: boolean-based blind\n    Payload: user=1 AND 1=1\n\n[*] the back-end DBMS is MySQL\nweb application technology: Apache 2.4.41, PHP 7.4\nback-end DBMS: MySQL >= 5.0.12`;
 }
 return _sqlmap?_sqlmap(a):"sqlmap: -u URL kerak";
};
const _hashcat=C.hashcat;
C.hashcat=a=>{
 const hashArg=a.find(x=>/hashes\.txt$/.test(x));
 const hn=hashArg&&T.node(hashArg);
 if(hn&&hn.t==='f'){
  const wArg=a.find(x=>/rockyou\.txt$/.test(x));
  const wn=wArg&&T.node(wArg);
  if(!wn||wn.t!=='f')return "hashcat: lug'at kerak: /usr/share/wordlists/rockyou.txt";
  const words=wn.v.split('\n').map(x=>x.trim()).filter(Boolean);
  const lines=hn.v.split('\n').map(x=>x.trim()).filter(Boolean);
  let out=`hashcat (v6.2.6) starting\n\nDictionary cache built:\n* Filename..: ${wArg}\n* Keyspace..: ${words.length}\n\n`,cracked=0;
  lines.forEach(ln=>{const[user,hash]=ln.split(':'),tg=HASH_TARGETS.find(t=>t.hash===hash);
   if(tg&&words.includes(tg.pass)){out+=`${hash}:${tg.pass}\n`;cracked++;LS('kw7_crack_'+hash,tg.pass)}});
  out+=`\nSession..........: hashcat\nStatus...........: ${cracked?'Cracked':'Exhausted'}\nRecovered........: ${cracked}/${lines.length} (${lines.length?Math.round(100*cracked/lines.length):0}%)`;
  return out;
 }
 return _hashcat?_hashcat(a):'hashcat: hash fayli kerak';
};

/* ========== Qo'llanma bosqichlari (3 bo'lim) ========== */
const NET_STEPS=[
 {t:"1. Faol xostlarni aniqlash",d:"Tarmoqdagi yoqilgan qurilmalarni topamiz.",why:"-sn (ping skan) portlarni emas, faqat qaysi IP manzillar javob berayotganini tekshiradi \u2014 bu eng xavfsiz va tezkor birinchi qadam.",c:'nmap -sn 192.168.56.0/24'},
 {t:"2. Portlar va xizmat versiyasini skanerlash",d:"Tanlangan xostdagi ochiq portlar va ularda ishlayotgan dastur versiyasi.",why:"-sV banner/versiyani aniqlashga harakat qiladi \u2014 eski versiya ma'lum zaifliklarga ega bo'lishi mumkin.",c:'nmap -sV -p 22,80 <IP>'},
 {t:"3. Ma'lum zaifliklarni tekshirish (NSE)",d:"Nmap Scripting Engine orqali xizmatlardagi ma'lum CVE'larni qidiramiz.",why:"--script vuln oldindan yozilgan skriptlar yordamida aniqlangan xizmat versiyasini ma'lum zaiflik bazasi bilan solishtiradi.",c:'nmap --script vuln <IP>'},
];
const WEB_STEPS=[
 {t:"1. Kiritish nuqtasini tekshirish",d:"Login formasidagi parametr SQL so'rovga to'g'ridan-to'g'ri qo'shilayotganini aniqlaymiz.",why:"sqlmap har xil payload (masalan user=1 AND 1=1 / 1=2) yuborib, sahifa javobidagi farqdan in'ektsiya borligini aniqlaydi.",c:'sqlmap -u "<URL>" --batch'},
 {t:"2. Ma'lumotlar bazalarini sanash",d:"Serverdagi mavjud bazalar ro'yxati.",why:"In'ektsiya tasdiqlangach, sqlmap aynan shu zaiflikdan foydalanib ichki SQL so'rovlarni o'zi tuzadi.",c:'sqlmap -u "<URL>" --dbs'},
 {t:"3. Jadvallarni sanash",d:"Tanlangan baza ichidagi jadvallar.",why:"-D bilan baza tanlanadi, --tables shu bazadagi jadvallar ro'yxatini qaytaradi.",c:'sqlmap -u "<URL>" -D <DB> --tables'},
 {t:"4. Ma'lumotlarni chiqarib olish (dump)",d:"users jadvalidagi qatorlarni o'qiymiz.",why:"--dump jadval tarkibini to'liq o'qiydi \u2014 real hujumda bu parol xeshlarini o'g'irlash uchun ishlatiladi.",c:'sqlmap -u "<URL>" -D <DB> -T <TABLE> --dump'},
];
const HASH_STEPS=[
 {t:"1. Xesh faylini tayyorlash",d:"Bazadan olingan (soxta) parol xeshlarini faylga yozamiz.",why:"Real hujumda bu xeshlar avvalgi bosqichda (masalan SQLi dump) olinadi \u2014 hashcat parolni emas, balki uning xesh 'imzosini' tekshiradi.",c:'echo admin:<HASH1> > hashes.txt\necho ali:<HASH2> >> hashes.txt'},
 {t:"2. Lug'at hujumi (MD5)",d:"Mashhur parollar lug'ati bilan har bir xeshni solishtiramiz.",why:"-m 0 MD5 algoritmini bildiradi. hashcat lug'atdagi har bir so'zni xeshlab, fayldagi xeshlar bilan solishtiradi \u2014 mos kelsa, parol topilgan hisoblanadi.",c:'hashcat -m 0 hashes.txt /usr/share/wordlists/rockyou.txt'},
];
const STEPS={n:NET_STEPS,s:WEB_STEPS,h:HASH_STEPS};
const TAB_TITLE={n:"\ud83c\udf10 Tarmoq monitori",s:"\ud83c\udf10 Veb-lab monitori",h:"\ud83d\udd11 Hash ro'yxati"};
function fillCmd(tab,raw){
 if(tab==='n')return raw.replace(/<IP>/g,NET_TARGETS[0].ip);
 if(tab==='s')return raw.replace(/<URL>/g,WEB_TARGET.url).replace(/<DB>/g,WEB_TARGET.db).replace(/<TABLE>/g,WEB_TARGET.table);
 return raw.replace(/<HASH1>/g,HASH_TARGETS[0].hash).replace(/<HASH2>/g,HASH_TARGETS[1].hash);
}
function demoValuesFor(tab,raw){
 const out=[];
 if(tab==='n'){if(/<IP>/.test(raw))out.push(NET_TARGETS[0].ip)}
 else if(tab==='s'){if(/<URL>/.test(raw))out.push(WEB_TARGET.url);if(/<DB>/.test(raw))out.push(WEB_TARGET.db);if(/<TABLE>/.test(raw))out.push(WEB_TARGET.table)}
 else{if(/<HASH1>/.test(raw))out.push(HASH_TARGETS[0].hash);if(/<HASH2>/.test(raw))out.push(HASH_TARGETS[1].hash)}
 return out;
}

/* ---------- monitor oynasi (jadval + $ kirish qatori \u2014 bot yoki siz yoza olasiz) ---------- */
function monTableHTML(tab){
 if(tab==='n')return `<table><thead><tr><th>IP</th><th>Host</th><th>Holat</th></tr></thead><tbody>${NET_TARGETS.map(t=>`<tr class="${t===NET_TARGETS[0]?'demo':''}"><td><span class="sv" data-v="${t.ip}">${t.ip}</span></td><td>${E(t.host)}</td><td>${LG('kw7_vuln_'+t.ip)?'<span class="ok">\u2713 zaiflik topildi</span>':LG('kw7_scan_'+t.ip)?'skanerlandi':''}</td></tr>`).join('')}</tbody></table>`;
 if(tab==='s')return `<table><thead><tr><th>Maydon</th><th>Qiymat</th></tr></thead><tbody>
  <tr><td>URL</td><td><span class="sv" data-v="${WEB_TARGET.url}">${E(WEB_TARGET.url)}</span></td></tr>
  <tr><td>Baza</td><td>${LG('kw7_dbs')?`<span class="sv" data-v="${WEB_TARGET.db}">${E(WEB_TARGET.db)}</span>`:'<span class="ok">?</span>'}</td></tr>
  <tr><td>Jadval</td><td>${LG('kw7_tables')?`<span class="sv" data-v="${WEB_TARGET.table}">${E(WEB_TARGET.table)}</span>`:'?'}</td></tr>
  <tr><td>Holat</td><td>${LG('kw7_dump')?'<span class="ok">\u2713 ma\u2019lumot chiqarildi</span>':LG('kw7_sqli')?"in'ektsiya aniqlandi":'(hali tekshirilmagan)'}</td></tr></tbody></table>`;
 return `<table><thead><tr><th>Foydalanuvchi</th><th>Hash (MD5)</th><th>Holat</th></tr></thead><tbody>${HASH_TARGETS.map(t=>`<tr class="${t===HASH_TARGETS[0]?'demo':''}"><td>${E(t.user)}</td><td><span class="sv" data-v="${t.hash}">${t.hash}</span></td><td>${LG('kw7_crack_'+t.hash)?`<span class="ok">\u2713 ${E(LG('kw7_crack_'+t.hash))}</span>`:''}</td></tr>`).join('')}</tbody></table>`;
}
const monWins={};
function openMonWin(tab){
 const ex=monWins[tab];
 if(ex&&ex.el&&ex.el.isConnected){ex.el.style.display='flex';ex.refresh();return ex}
 const b=document.createElement('div');b.className='sig';
 const head=document.createElement('div');head.className='sigh';
 head.innerHTML=`<span>${E(TAB_TITLE[tab])}</span><small>bot/siz \u2014 kod yozish mumkin</small>`;
 const tbl=document.createElement('div'),outp=document.createElement('div');outp.className='out';
 const inrow=document.createElement('div');inrow.className='inrow';
 inrow.innerHTML=`<span>$</span><input autocapitalize="off" autocomplete="off" spellcheck="false" placeholder="nmap / sqlmap / hashcat ...">`;
 b.append(head,tbl,outp,inrow);
 const inp=inrow.querySelector('input');
 function refresh(){tbl.innerHTML=monTableHTML(tab)}
 refresh();
 inp.addEventListener('keydown',e=>{if(e.key==='Enter'){
  const v=inp.value;inp.value='';if(!v.trim())return;
  const line=document.createElement('div');line.textContent='$ '+v;outp.appendChild(line);
  let o='';try{o=T.run(v)}catch(err){o=String(err&&err.message||err)}
  if(o){const r=document.createElement('div');r.textContent=o;outp.appendChild(r)}
  outp.scrollTop=outp.scrollHeight;refresh();DK.flush&&DK.flush();
 }});
 const w=win(TAB_TITLE[tab],b,{w:460,h:340});
 w.body2=b;w.inp=inp;w.refresh=refresh;
 monWins[tab]=w;return w;
}
async function copyFromMon(val){
 const esc=window.CSS&&window.CSS.escape?window.CSS.escape(val):String(val).replace(/["\\]/g,'\\$&');
 const cells=[];for(const k in monWins){const w=monWins[k];if(w&&w.body2&&w.el&&w.el.isConnected)cells.push(...w.body2.querySelectorAll(`[data-v="${esc}"]`))}
 cells.forEach(c=>c.classList.add('flash'));await delay(500);cells.forEach(c=>c.classList.remove('flash'));
}

/* ---------- ish terminali (desktop6 bilan bir xil ko'rinish, mustaqil nusxa) ---------- */
let termBotWin=null;
function openWorkTerminal(){
 if(termBotWin&&termBotWin.el&&termBotWin.el.isConnected){termBotWin.el.style.display='flex';return termBotWin}
 const t=document.createElement('div');t.className='tm';
 const out=document.createElement('div'),row=document.createElement('div');
 row.innerHTML='<div class="pl"></div><span>\u2514\u2500$ </span><input autocapitalize="off" autocomplete="off" spellcheck="false">';
 t.append(out,row);
 const inp=row.querySelector('input'),pl=row.querySelector('.pl');
 const put=(s,cls)=>{const d=document.createElement('div');if(cls)d.className=cls;d.textContent=s;out.appendChild(d);t.scrollTop=t.scrollHeight};
 pl.textContent='\u250c\u2500\u2500(kali\u3392kali)-[~]';
 function runLocal(c){
  put(`\u250c\u2500\u2500(kali\u3392kali)-[~]\n\u2514\u2500$ ${c}`);
  c=(c||'').trim();termBotWin.lastOutput='';if(!c)return;
  let o='';try{o=T.run(c)}catch(e){o=String(e&&e.message||e)}
  if(o)put(o);
  termBotWin.lastOutput=o||'';
  DK.flush&&DK.flush();
 }
 inp.addEventListener('keydown',e=>{if(e.key==='Enter'){const v=inp.value;inp.value='';runLocal(v)}});
 termBotWin=win("\ud83d\udda5 Ish terminali",t,{w:560,h:380});
 termBotWin.input=inp;termBotWin.put=put;termBotWin.out=out;termBotWin.lastOutput='';termBotWin.scrollEl=t;
 put("Kali Maktab \u2014 ish terminali. Quyida bot o'zi yozadi va Enter bosadi (hammasi simulyatsiya).");
 setTimeout(()=>inp.focus(),50);
 return termBotWin;
}
async function typeCommand(inp,tab,raw,filled){
 const values=demoValuesFor(tab,raw);let i=0;
 while(i<filled.length){
  const v=values.find(val=>val&&filled.startsWith(val,i));
  if(v){await copyFromMon(v);inp.classList.add('paste-flash');inp.value+=v;await delay(200);inp.classList.remove('paste-flash');i+=v.length}
  else{inp.value+=filled[i];i++;await delay(15)}
 }
}
function focusWinIfPossible(w){try{w&&w.el&&w.el.dispatchEvent(new Event('pointerdown',{bubbles:true}))}catch(e){}}

/* ========== Bot: namoyishni o'zi bajaradi, jurnal yuritadi ========== */
let botBusy=false,lastReport=null;
async function runBotChain(tab,uptoIdx){
 if(botBusy){tst("\ud83e\udd16 Bot allaqachon ishlamoqda...");return}
 botBusy=true;
 const log=[],now=()=>new Date();
 try{
  const steps=STEPS[tab],list=uptoIdx==null?steps:steps.slice(0,uptoIdx+1);
  const tw=openWorkTerminal();
  log.push({ts:now(),type:'win',title:"\ud83d\udda5 Ish terminali",note:"buyruqlar shu yerda yozilib, Enter bosiladi"});
  if(!(monWins[tab]&&monWins[tab].el&&monWins[tab].el.isConnected))log.push({ts:now(),type:'win',title:TAB_TITLE[tab],note:"bot o'zi ochdi: shu bo'lim uchun kerakli ma'lumot shu yerda"});
  openMonWin(tab);
  tw.put("\ud83e\udd16 Bot: kerakli qiymatlarni \ud83d\udce1 monitor oynasidan nusxalab, buyruqlarni yozib ishga tushiraman.");
  tw.put("ESLATMA: to'liq simulyatsiya \u2014 hech qanday haqiqiy tarmoq/sayt/tizimga ulanilmaydi, buyruq hech kimga zarar yetkazmaydi.");
  for(const st of list){
   for(const raw of st.c.split('\n')){
    const filled=fillCmd(tab,raw);
    const mw=openMonWin(tab);
    if(mw.el&&mw.el.isConnected)focusWinIfPossible(mw);
    await delay(150);
    if(tw.el&&tw.el.isConnected)focusWinIfPossible(tw);
    tw.input.focus();
    await typeCommand(tw.input,tab,raw,filled);
    await delay(220);
    tw.input.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}));
    await delay(650);
    if(monWins[tab]&&monWins[tab].el&&monWins[tab].el.isConnected)monWins[tab].refresh();
    log.push({ts:now(),type:'cmd',title:st.t,why:st.why||st.d,cmd:filled,win:TAB_TITLE[tab],output:tw.lastOutput||''});
   }
  }
  tw.put("\u2705 Namoyish yakunlandi. Natijalarni yuqorida ko'rishingiz mumkin.");
  lastReport={tab,log};
  const btn=document.createElement('button');btn.textContent="\ud83d\udce4 Hisobot (PDF) \u2014 Telegram'ga yuborish";
  btn.style.cssText='margin:6px 0;background:#2d5a3a;color:#fff;border:0;border-radius:6px;padding:7px 11px;font-size:12px;cursor:pointer';
  btn.onclick=()=>sendReportPdf(lastReport);
  tw.out.appendChild(btn);
  try{tw.scrollEl.scrollTop=tw.scrollEl.scrollHeight}catch(e){}
 }finally{botBusy=false}
}

/* ========== Hisobot: nima/nega/qachon + PDF (tashqi kutubxonasiz, offline) + ulashish ========== */
const hhmmss=d=>d.toTimeString().slice(0,8);
const TAB_NAME={n:"Tarmoq skanerlash (Nmap)",s:"Veb-sayt zaifligi (SQL in'ektsiya)",h:"Parolni crack qilish (hashcat)"};
function reportLines(rep){
 const L=[`KALI MAKTAB \u2014 BOT HISOBOTI`,`Bo'lim: ${TAB_NAME[rep.tab]}`,`Sana: ${rep.log[0]?rep.log[0].ts.toLocaleString():''}`,
  `ESLATMA: to'liq simulyatsiya. Hech qanday haqiqiy tarmoq, sayt yoki tizimga ulanilmadi.`,''];
 let n=0;
 for(const e of rep.log){
  if(e.type==='win'){L.push(`[${hhmmss(e.ts)}] OYNA OCHILDI: ${e.title}`);if(e.note)L.push(`    \u2014 ${e.note}`)}
  else{n++;L.push(`[${hhmmss(e.ts)}] #${n} ${e.title}`,`    Sabab: ${e.why||'(ko\u2019rsatilmagan)'}`,`    Buyruq: ${e.cmd}`,`    Oyna: ${e.win}`);
   const out=(e.output||'').split('\n').filter(Boolean).slice(0,6);
   if(out.length){L.push('    Natija:');out.forEach(o=>L.push('      '+o))}}
  L.push('');
 }
 L.push(`\u2705 Yakun: ${n} ta buyruq bajarildi.`);
 return L;
}
function wrapText(s,width){const words=String(s).split(' '),out=[];let cur='';for(const w of words){if((cur+' '+w).trim().length>width){out.push(cur);cur=w}else cur=(cur+' '+w).trim()}out.push(cur);return out}
const pdfSafe=s=>String(s).replace(/[\u2018\u2019\u02bb\u02bc]/g,"'").replace(/[\u201c\u201d]/g,'"').replace(/[^\x20-\xFF]/g,'?');
function buildPdf(lines){
 const pageW=595,pageH=842,margin=40,fs=9,lh=12,width=100;
 const body=[];lines.forEach(ln=>wrapText(pdfSafe(ln),width).forEach(w=>body.push(w)));
 const perPage=Math.floor((pageH-2*margin)/lh);
 const pages=[];for(let i=0;i<body.length;i+=perPage)pages.push(body.slice(i,i+perPage));
 if(!pages.length)pages.push(['']);
 const n=pages.length,pageObjNums=[],contentObjNums=[];let next=4;
 for(let i=0;i<n;i++){contentObjNums.push(next++);pageObjNums.push(next++)}
 const esc=s=>s.replace(/\\/g,'\\\\').replace(/\(/g,'\\(').replace(/\)/g,'\\)');
 const objs={};
 objs[1]=`1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`;
 objs[2]=`2 0 obj\n<< /Type /Pages /Kids [${pageObjNums.map(x=>x+' 0 R').join(' ')}] /Count ${n} >>\nendobj\n`;
 objs[3]=`3 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n`;
 for(let i=0;i<n;i++){
  let stream=`BT /F1 ${fs} Tf ${margin} ${pageH-margin} Td ${lh} TL\n`;
  pages[i].forEach(ln=>{stream+=`(${esc(ln)}) Tj T*\n`});
  stream+='ET';
  const co=contentObjNums[i],po=pageObjNums[i];
  objs[co]=`${co} 0 obj\n<< /Length ${stream.length} >>\nstream\n${stream}\nendstream\nendobj\n`;
  objs[po]=`${po} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW} ${pageH}] /Resources << /Font << /F1 3 0 R >> >> /Contents ${co} 0 R >>\nendobj\n`;
 }
 const total=3+n*2;
 let pdf='%PDF-1.4\n';const offsets=[0];
 for(let i=1;i<=total;i++){offsets.push(pdf.length);pdf+=objs[i]}
 const xs=pdf.length;
 pdf+=`xref\n0 ${total+1}\n0000000000 65535 f \n`;
 for(let i=1;i<=total;i++)pdf+=String(offsets[i]).padStart(10,'0')+' 00000 n \n';
 pdf+=`trailer\n<< /Size ${total+1} /Root 1 0 R >>\nstartxref\n${xs}\n%%EOF`;
 const bytes=new Uint8Array(pdf.length);for(let i=0;i<pdf.length;i++)bytes[i]=pdf.charCodeAt(i)&0xFF;
 return bytes;
}
async function sendReportPdf(rep){
 if(!rep){tst("Hisobot topilmadi \u2014 avval botni ishga tushiring");return}
 const bytes=buildPdf(reportLines(rep)),blob=new Blob([bytes],{type:'application/pdf'});
 const nom=`KaliMaktab_hisobot_${rep.tab}_${Date.now()}.pdf`;
 let fayl=null;try{fayl=new File([blob],nom,{type:'application/pdf'})}catch(e){}
 if(fayl&&navigator.canShare&&navigator.canShare({files:[fayl]})){try{await navigator.share({files:[fayl],title:nom,text:'Kali Maktab \u2014 bot hisoboti (PDF)'});return}catch(e){}}
 const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=nom;a.click();
 setTimeout(()=>URL.revokeObjectURL(a.href),1500);
 tst(nom+" yuklab olindi \u2014 Telegramda fayl sifatida biriktiring");
}

/* ========== Qo'llanma oynasi (3 tabli: Tarmoq / Veb / Parol) ========== */
let gdW=null,gdTab='n';
function openGuide(){
 if(gdW&&gdW.el.isConnected){gdW.el.style.display='flex';return}
 const b=document.createElement('div');b.className='gd';
 function render(){
  const steps=STEPS[gdTab];
  const tgt=gdTab==='n'?`\ud83c\udfaf Nishon: ${NET_TARGETS[0].host} (${NET_TARGETS[0].ip})`:gdTab==='s'?`\ud83c\udfaf Nishon: ${E(WEB_TARGET.url)}`:`\ud83c\udfaf Nishon: ${HASH_TARGETS.map(h=>h.user).join(', ')} xeshlari`;
  b.innerHTML=`<div class="tabs2"><button data-tb="n" class="${gdTab==='n'?'on':''}">\ud83c\udf10 Tarmoq skanerlash</button><button data-tb="s" class="${gdTab==='s'?'on':''}">\ud83d\udc1b Veb zaiflik</button><button data-tb="h" class="${gdTab==='h'?'on':''}">\ud83d\udd11 Parol crack</button></div>
  <div class="note">\u26a0\ufe0f To'liq simulyatsiya: barcha xost/sayt/xeshlar xayoliy. Bu yerdagi hech bir buyruq haqiqiy tarmoq, sayt yoki tizimga ulanmaydi \u2014 shuning uchun istalgan buyruqni xavfsiz sinab ko'rishingiz mumkin.</div>
  <p class="tgt">${tgt}</p>
  ${steps.map((s,i)=>`<div class="st"><b>${E(s.t)}</b><p>${E(s.d)}</p>${s.why?`<p class="why">\ud83d\udca1 ${E(s.why)}</p>`:''}<code>${E(s.c)}</code><div class="bb"><button data-cp="${E(fillCmd(gdTab,s.c))}">\ud83d\udccb Nusxalash</button><button data-term="${i}">\ud83d\udda5 Terminalni ochish</button><button data-bot="${i}">\ud83e\udd16 Bot: ko'rsatib ber</button></div></div>`).join('')}`;
 }
 b.addEventListener('click',e=>{const d=e.target.dataset;
  if(d.tb){gdTab=d.tb;render()}
  else if(d.cp!==undefined){try{navigator.clipboard.writeText(d.cp).catch(()=>{})}catch(err){}tst('\ud83d\udccb Nusxalandi')}
  else if(d.term!==undefined){const i=+d.term,st=STEPS[gdTab][i];DK.term(fillCmd(gdTab,st.c).split('\n').join(' ; '))}
  else if(d.bot!==undefined){runBotChain(gdTab,+d.bot)}});
 gdW=win("\ud83d\udd75 Tarmoq / Veb / Parol qo'llanma",b,{w:420,h:480});gdW.render=render;render();
}
DK.guide7=openGuide;
function resetSim(){Object.keys(localStorage).filter(k=>/^kw7_/.test(k)).forEach(k=>{try{localStorage.removeItem(k)}catch(e){}});tst("\ud83d\udd04 Simulyatsiya holati tozalandi");if(gdW&&gdW.render)gdW.render();for(const k in monWins)if(monWins[k]&&monWins[k].el&&monWins[k].el.isConnected)monWins[k].refresh()}

/* ---------- menyu: ilovalar ro'yxati va ⋮ tezkor menyusiga (desktop6 yaratgan) qo'shimcha bandlar ---------- */
const mn=$('#kd-mn'),anchor=$('[data-a=gd]',mn)||$('[data-a=ff]',mn)||$('[data-a=files]',mn);
if(anchor)anchor.insertAdjacentHTML('afterend',`<div class="ct" data-a="gd7">\ud83d\udd75 Tarmoq/Veb/Parol qo'llanma</div>`);
mn&&mn.addEventListener('click',e=>{if(e.target.dataset.a==='gd7'){mn.classList.remove('on');openGuide()}},true);

const dd=root.querySelector('.gd-kdd');
if(dd&&!dd.querySelector('[data-kd7]')){
 const resetEl=dd.querySelector('[data-kd=reset]');
 const html=`<div data-kd7="guide">\ud83d\udd75 Tarmoq/Veb/Parol qo'llanma</div><div data-kd7="botn">\ud83e\udd16 Bot: Tarmoq skanerlash namoyishi</div><div data-kd7="bots">\ud83e\udd16 Bot: Veb zaiflik namoyishi</div><div data-kd7="both">\ud83e\udd16 Bot: Parol crack namoyishi</div><div data-kd7="pdf">\ud83d\udce4 Oxirgi hisobotni yuborish (PDF)</div><div data-kd7="reset">\ud83d\udd04 Tarmoq/Veb/Parol simulyatsiyasini tozalash</div>`;
 if(resetEl)resetEl.insertAdjacentHTML('beforebegin',html);else dd.insertAdjacentHTML('beforeend',html);
 dd.addEventListener('click',e=>{const k=e.target.dataset.kd7;if(!k)return;dd.classList.remove('on');
  if(k==='guide'){openGuide()}
  else if(k==='botn'){gdTab='n';openGuide();runBotChain('n')}
  else if(k==='bots'){gdTab='s';openGuide();runBotChain('s')}
  else if(k==='both'){gdTab='h';openGuide();runBotChain('h')}
  else if(k==='pdf'){sendReportPdf(lastReport)}
  else if(k==='reset'){resetSim()}});
}
})();
