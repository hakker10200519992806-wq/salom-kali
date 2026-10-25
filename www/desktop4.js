/* Kali Maktab Desktop 4-bosqich: Missiyalar/CTF (ball, daraja, Dars/Erkin rejim), Wireshark va Metasploit simulyatorlari,
   zaxira (eksport/import), 4 ta ish stoli (workspace) va klaviatura yorliqlari. */
(()=>{
const T=window.kmsT,DK=window.kmsDK;if(!T||!DK||!DK.dlg)return;
const {win,E,tst,root}=DK,C=T.C,$=(s,r)=>(r||root).querySelector(s);
const LG=k=>{try{return localStorage.getItem(k)}catch(e){return null}},LS=(k,v)=>{try{localStorage.setItem(k,v);return true}catch(e){return false}};
const J=(k,d)=>{try{return JSON.parse(LG(k))||d}catch(e){return d}};
const CSS=`
#kdsk .ms{height:100%;overflow:auto;background:#161c2b;padding:8px;box-sizing:border-box}
#kdsk .ms .hd{background:#202a40;border-radius:10px;padding:10px;margin-bottom:8px}
#kdsk .ms .br{height:8px;background:#0b0f18;border-radius:4px;margin:6px 0;overflow:hidden}#kdsk .ms .br i{display:block;height:100%;background:linear-gradient(90deg,#4ade80,#60a5fa)}
#kdsk .ms .cd{background:#1d2740;border:1px solid #2c3a5c;border-radius:10px;margin-bottom:6px}
#kdsk .ms .cd>div:first-child{padding:10px;display:flex;gap:8px;align-items:center}#kdsk .ms .cd>div:first-child b{flex:1}
#kdsk .ms .cd.ok{opacity:.65}
#kdsk .ms .bd{padding:0 10px 10px;font-size:13px}
#kdsk .ms .bd code{display:block;background:#0b0f18;color:#9fd0ff;padding:6px;border-radius:6px;margin:6px 0;font:12px monospace;white-space:pre-wrap}
#kdsk .ms input{background:#0b0f18;border:1px solid #3a4560;color:#fff;border-radius:6px;padding:7px;width:100%;box-sizing:border-box;margin:6px 0;font:13px monospace}
#kdsk .ms button,#kdsk .wsk button.b2{background:#2c4f8f;border:0;color:#fff;border-radius:8px;padding:7px 12px;margin:2px 4px 2px 0}
#kdsk .wsk{display:flex;flex-direction:column;height:100%;background:#efefef;color:#16181d;font:12px/1.35 "Segoe UI",Inter,system-ui,sans-serif;position:relative}
#kdsk .wsk svg{display:block;flex:none}
#kdsk .wsk .wm{display:flex;background:#f5f5f5;border-bottom:1px solid #cfcfcf;overflow-x:auto;flex:none;scrollbar-width:none}
#kdsk .wsk .wm span{padding:5px 9px;white-space:nowrap;cursor:default}
#kdsk .wsk .wm span:hover{background:#d9e6f7}
#kdsk .wsk .wtb{display:flex;align-items:center;gap:1px;padding:3px 6px;background:#f0f0f0;border-bottom:1px solid #cfcfcf;overflow-x:auto;flex:none;scrollbar-width:none}
#kdsk .wsk .wtb button{width:28px;height:28px;border:1px solid transparent;border-radius:3px;background:none;display:flex;align-items:center;justify-content:center;color:#444;padding:0;margin:0;flex:none}
#kdsk .wsk .wtb button:hover:not(:disabled){background:#dbe8f8;border-color:#9fbfe8}
#kdsk .wsk .wtb button:disabled{opacity:.4}
#kdsk .wsk .wtb i{width:1px;height:20px;background:#c4c4c4;margin:0 4px;flex:none}
#kdsk .wsk .wf{display:flex;align-items:center;gap:4px;padding:4px 6px;background:#f0f0f0;border-bottom:1px solid #cfcfcf;flex:none}
#kdsk .wsk .wf button{width:26px;height:24px;border:1px solid #b5b5b5;border-radius:2px;background:linear-gradient(#fcfcfc,#e4e4e4);color:#444;display:flex;align-items:center;justify-content:center;padding:0;margin:0;flex:none}
#kdsk .wsk .wf input{flex:1;min-width:0;height:24px;box-sizing:border-box;background:#fff;border:1px solid #9a9a9a;border-radius:2px;color:#111;padding:0 6px;margin:0;font:12px "Segoe UI",Inter,system-ui,sans-serif;outline:0}
#kdsk .wsk .wf input:focus{border-color:#308cc6;box-shadow:0 0 0 1px #308cc6}
#kdsk .wsk .wf input.ok{background:#afffaf}
#kdsk .wsk .wf input.bad{background:#ffafaf}
#kdsk .wsk .wl{flex:1.25;min-height:70px;overflow-x:auto;background:#fff;border-bottom:1px solid #b8b8b8;display:flex}
#kdsk .wsk .wli{display:flex;flex-direction:column;min-width:660px;flex:1}
#kdsk .wsk .wh,#kdsk .wsk .lt .r{display:grid;grid-template-columns:48px 86px 130px 130px 76px 58px minmax(260px,1fr)}
#kdsk .wsk .wh{background:linear-gradient(#fafafa,#e6e6e6);border-bottom:1px solid #b4b4b4;flex:none}
#kdsk .wsk .wh span{padding:3px 6px;border-right:1px solid #cfcfcf}
#kdsk .wsk .lt{flex:1;overflow-y:auto;overflow-x:hidden;outline:0}
#kdsk .wsk .lt .r{white-space:nowrap;cursor:default;color:#12272e;background:#fff}
#kdsk .wsk .lt .r span{padding:1px 6px;overflow:hidden;text-overflow:ellipsis}
#kdsk .wsk .lt .r.tcp{background:#e7e6ff}
#kdsk .wsk .lt .r.http{background:#e4ffc7}
#kdsk .wsk .lt .r.udp{background:#daeeff}
#kdsk .wsk .lt .r.icmp{background:#fce0ff}
#kdsk .wsk .lt .r.arp{background:#faf0d7}
#kdsk .wsk .lt .r.syn{background:#a0a0a0}
#kdsk .wsk .lt .r.s{background:#308cc6;color:#fff}
#kdsk .wsk .lt .none{padding:10px;color:#666}
#kdsk .wsk .wd{flex:1;min-height:56px;overflow:auto;background:#fff;border-bottom:1px solid #b8b8b8;padding:2px 0;line-height:1.55}
#kdsk .wsk .tl{white-space:nowrap;cursor:default;padding-right:12px}
#kdsk .wsk .tl:hover{background:#e9f1fb}
#kdsk .wsk .tl.sel{background:#308cc6;color:#fff}
#kdsk .wsk .ta{display:inline-block;width:13px;color:#555;font-size:9px}
#kdsk .wsk .tl.sel .ta{color:#fff}
#kdsk .wsk .tn.has>.tl .ta::before{content:"▶"}
#kdsk .wsk .tn.has.o>.tl .ta::before{content:"▼"}
#kdsk .wsk .tc{display:none}
#kdsk .wsk .tn.o>.tc{display:block}
#kdsk .wsk .wb{flex:.9;min-height:56px;overflow:auto;background:#fff;font:12px/1.5 "DejaVu Sans Mono",Consolas,monospace;padding:2px 6px}
#kdsk .wsk .hr{white-space:nowrap}
#kdsk .wsk .ho{color:#666;margin-right:2ch}
#kdsk .wsk .hx{margin-right:1ch}
#kdsk .wsk .hx i,#kdsk .wsk .ha i{font-style:normal;display:inline-block}
#kdsk .wsk .hx i{width:2ch;margin-right:1ch}
#kdsk .wsk .hx i:nth-child(8){margin-right:2ch}
#kdsk .wsk .ha i{width:1ch}
#kdsk .wsk .wb i.hl{background:#b9d4ee}
#kdsk .wsk .wst{display:flex;justify-content:space-between;gap:14px;padding:3px 8px;background:#f0f0f0;border-top:1px solid #cfcfcf;font-size:11.5px;flex:none;overflow:hidden;white-space:nowrap}
#kdsk .wsh{display:none!important}
#kdsk .wsb{background:rgba(255,255,255,.14)!important}`;
document.head.appendChild(Object.assign(document.createElement('style'),{textContent:CSS}));

/* ---------- topshiriq fayllari (bir marta) ---------- */
function mk(path,content){const parts=path.split('/').filter(Boolean),name=parts.pop();let n=T.fs;for(const p of parts){if(!n.c[p])n.c[p]=T.d({});n=n.c[p]}n.c[name]=T.f(content)}
if(LG('kd_m1')!=='1'){
  mk('/var/www/html/index.html','<html><body>Lab server</body></html>\n');mk('/var/www/html/.flag.txt','KALI{hidden_files_are_not_secret}\n');
  const al=T.node('/var/log/auth.log');if(al&&al.t==='f')al.v+='Oct 17 09:20:11 kali sshd[812]: Failed password for invalid user admin from 192.168.56.101\nOct 17 09:20:15 kali sshd[812]: debug: token=KALI{grep_finds_needles}\nOct 17 09:21:02 kali sshd[812]: Accepted password for kali from 192.168.56.1\n';
  mk('/home/kali/Documents/secret.b64',btoa('KALI{base64_is_not_encryption}')+'\n');mk('/home/kali/lab/script.sh','#!/bin/bash\necho "Lab skripti"\n');
  LS('kd_m1','1');DK.flush&&DK.flush()}
C.base64=C.base64||((a,inp)=>{const dec=a.includes('-d')||a.includes('--decode'),fl=a.filter(x=>x[0]!='-')[0];let t=fl?(T.node(fl)&&T.node(fl).t==='f'?T.node(fl).v:null):inp;if(t===null||t===undefined)return fl?`base64: ${fl}: fayl topilmadi`:'base64: fayl yoki matn kerak';t=t.replace(/\n$/,'');
  try{return dec?decodeURIComponent(escape(atob(t.trim()))):btoa(unescape(encodeURIComponent(t)))}catch(e){return 'base64: noto\'g\'ri kiritish'}});

/* ---------- missiyalar ---------- */
const M=[
{id:'hidden',t:'Yashirin fayl',pt:10,d:"/var/www/html papkasida yashirin (nuqta bilan boshlanadigan) fayl bor. Ichidagi flagni toping va kiriting.",h:'cd /var/www/html && ls -la && cat .flag.txt',flag:'KALI{hidden_files_are_not_secret}'},
{id:'grep',t:'Logdan qidirish',pt:10,d:'/var/log/auth.log ichida flag yashirilgan. grep bilan toping.',h:"grep KALI /var/log/auth.log",flag:'KALI{grep_finds_needles}'},
{id:'ports',t:'Ochiq portlar',pt:20,d:'Laboratoriya mashinasi 192.168.56.101 da qaysi portlar ochiq? Vergul bilan yozing (masalan 21,25).',h:'nmap -sT -p 21,22,80,443 192.168.56.101',ans:'22,80'},
{id:'wifi',t:'Wi-Fi paroli',pt:20,d:"LabWiFi tarmog'ining parolini toping.",h:"airmon-ng start wlan0 → airodump-ng wlan0mon (LabWiFi BSSID: 02:11:22:AA:BB:CC) → airodump-ng --bssid 02:11:22:AA:BB:CC -c 1 -w lab wlan0mon → aircrack-ng -w /usr/share/wordlists/rockyou.txt lab-01.cap",ans:'kalimaktab'},
{id:'chmod',t:'Ruxsatlar',pt:20,d:"/home/kali/lab/script.sh faylini bajariladigan (755) qiling.",h:'chmod 755 ~/lab/script.sh',check:()=>{const n=T.node('/home/kali/lab/script.sh');return !!n&&['755','+x','777','775'].includes(n.m)}},
{id:'report',t:'Hisobot yozing',pt:20,d:'Desktop ichida reports papkasi yarating, ichida report.txt faylga "done" so\'zini yozing.',h:'mkdir ~/Desktop/reports && echo done > ~/Desktop/reports/report.txt',check:()=>{const n=T.node('/home/kali/Desktop/reports/report.txt');return !!n&&n.t==='f'&&/done/i.test(n.v)}},
{id:'b64',t:'Base64',pt:30,d:'Documents/secret.b64 ichidagi matn base64 bilan kodlangan. Dekodlab flagni toping.',h:'base64 -d ~/Documents/secret.b64',flag:'KALI{base64_is_not_encryption}'},
{id:'wire',t:'Wireshark',pt:30,d:"Wireshark ilovasida http filtri bilan paketlarni ko'ring va yashirin flagni toping.",h:'Filter: http   →  oxirgi javob paketini bosing',flag:'KALI{filter_the_noise}'},
{id:'wps',t:'WPS zaifligi',pt:25,d:"TP-Link_A4F2 nomli ruterda WPS yoqilgan. Uni toping va WPS PIN orqali Wi-Fi parolini soching.",h:'airmon-ng start wlan0 → wash -i wlan0mon → reaver -i wlan0mon -b 9C:A2:F4:33:7B:A1 -vv (natija chiqquncha bir necha marta ishga tushiring)',ans:'tplink8825'},
{id:'bt',t:'Bluetooth admin konsoli',pt:25,d:"Lab-Speaker-Admin nomli Bluetooth qurilmasi standart (zavod) PIN bilan himoyalangan. Unga ulanib, admin konsoldagi maxfiy xabarni toping.",h:'bluetoothctl scan on → sdptool browse D4:3A:2C:99:10:7F → bluetoothctl pair D4:3A:2C:99:10:7F 0000 → rfcomm connect D4:3A:2C:99:10:7F 9',flag:'KALI{bluetooth_default_pin}'},
{id:'msf',t:'Metasploit',pt:30,d:"Metasploit konsolida vsftpd backdoor modulini 192.168.56.102 ga ishga tushiring.",h:'use exploit/unix/ftp/vsftpd_234_backdoor\nset RHOSTS 192.168.56.102\nrun',event:true}];
const LV=[[0,'Newbie'],[40,'Script Kiddie'],[90,'Hacker'],[140,'Pentester'],[190,'Elite']];
const solved=()=>J('kd_ms',[]),total=M.reduce((a,m)=>a+m.pt,0);
const score=()=>Math.max(0,M.filter(m=>solved().includes(m.id)).reduce((a,m)=>a+m.pt,0)-3*(+LG('kd_pen')||0));
const mode=()=>LG('kd_mode')==='free'?'free':'lesson';
function solve(id){const s=solved();if(s.includes(id))return;s.push(id);LS('kd_ms',JSON.stringify(s));const m=M.find(x=>x.id===id);tst(`🎯 Missiya bajarildi: ${m.t} (+${m.pt})`);refreshMs()}
DK.solve=solve;
let msW=null,open1=null;
function refreshMs(){if(msW&&msW.el.isConnected)msW.render()}
function openMissions(){
  if(msW&&msW.el.isConnected){msW.el.style.display='flex';return}
  const b=document.createElement('div');b.className='ms';
  const render=()=>{const sc=score(),lv=[...LV].reverse().find(l=>sc>=l[0]),nx=LV.find(l=>l[0]>sc),s=solved(),ml=mode()==='lesson';
    b.innerHTML=`<div class="hd"><b>🎯 ${lv[1]}</b> · ${sc}/${total} ball<div class="br"><i style="width:${Math.round(sc/total*100)}%"></i></div><small>${nx?`Keyingi daraja: ${nx[1]} (${nx[0]} ball)`:'Eng yuqori daraja!'}</small><br><button data-a="mode">${ml?'📘 Dars rejimi (maslahatlar ochiq)':'🏴 Erkin rejim (maslahat -3 ball)'}</button></div>`+
    M.map(m=>{const ok=s.includes(m.id),op=open1===m.id;return `<div class="cd${ok?' ok':''}"><div data-o="${m.id}"><span>${ok?'✅':'🎯'}</span><b>${E(m.t)}</b><small>${m.pt} ball</small></div>${op&&!ok?`<div class="bd">${E(m.d)}${ml||(J('kd_hint',[]).includes(m.id))?`<code>${E(m.h)}</code>`:`<br><button data-hint="${m.id}">💡 Maslahat (-3 ball)</button>`}${m.event?'<br><button data-a="msf">💣 Metasploit ochish</button>':m.check?`<br><button data-chk="${m.id}">✔ Tekshirish</button>`:`<input data-in="${m.id}" placeholder="${m.flag?'KALI{...}':'javob'}" autocapitalize="off"><button data-sub="${m.id}">Yuborish</button>`}${m.id==='wire'?'<button data-a="wire">🦈 Wireshark</button>':''}</div>`:''}</div>`}).join('')+
    `<div class="hd" style="margin-top:8px"><button data-a="exp">💾 Zaxira (eksport)</button><button data-a="imp">📥 Tiklash (import)</button></div>`};
  b.onclick=e=>{const d=e.target.dataset;
    if(d.o){open1=open1===d.o?null:d.o;render()}else if(d.a==='mode'){LS('kd_mode',mode()==='lesson'?'free':'lesson');render()}
    else if(d.hint){const h=J('kd_hint',[]);h.push(d.hint);LS('kd_hint',JSON.stringify(h));LS('kd_pen',(+LG('kd_pen')||0)+1);render()}
    else if(d.chk){const m=M.find(x=>x.id===d.chk);if(m.check())solve(m.id);else tst('Hali bajarilmagan. Terminalda qayta urinib ko\'ring.')}
    else if(d.sub){const m=M.find(x=>x.id===d.sub),v=$(`[data-in=${d.sub}]`,b).value.trim();
      const ok=m.flag?v===m.flag:v.toLowerCase().replace(/\s+/g,'').split(',').sort().join(',')===m.ans.split(',').sort().join(',');
      if(ok)solve(m.id);else tst("Noto'g'ri javob")}
    else if(d.a==='msf')openMsf();else if(d.a==='wire')openWire();else if(d.a==='exp')exportBk();else if(d.a==='imp')importBk()};
  msW=win('Missions',b,{w:440,h:480});msW.render=render;render()}

/* ---------- zaxira ---------- */
const KEYS=['kms_vfs','kd_ms','kd_pen','kd_hint','kd_mode','kd_ssid','kd_wf','kd_bt','kd_btp','kd_ports','kd_m1','kd_docs','kms_dwall','kms'];
function exportBk(){T.fs&&DK.flush();const o={v:1,t:Date.now()};KEYS.forEach(k=>{const v=LG(k);if(v!==null)o[k]=v});const txt=JSON.stringify(o);
  const dn=T.node('/home/kali/Documents');let saved=false;if(dn&&dn.t==='d'){const o2=Object.assign({},o);try{const fsx=JSON.parse(o2.kms_vfs);delete fsx.c.home.c.kali.c.Documents.c['kali_backup.json'];o2.kms_vfs=JSON.stringify(fsx)}catch(e){}dn.c['kali_backup.json']=T.f(JSON.stringify(o2));DK.flush();saved=true}
  try{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([txt],{type:'application/json'}));a.download='kali_backup.json';document.body.appendChild(a);a.click();a.remove()}catch(e){}
  try{navigator.clipboard.writeText(txt).catch(()=>{})}catch(e){}
  DK.dlg(`<b>Zaxira tayyor</b><pre>${saved?'• Documents/kali_backup.json ga saqlandi\n':''}• Yuklab olish boshlandi (brauzer ruxsat bergan bo'lsa)\n• Matn bufer (clipboard) ga nusxalandi\n\nTiklash: "Tiklash" tugmasi bilan shu JSON faylni tanlang.</pre>`,[['OK']])}
function importBk(){const fi=document.createElement('input');fi.type='file';fi.accept='.json,application/json';fi.onchange=async()=>{const f=fi.files[0];if(!f)return;try{const o=JSON.parse(await f.text());if(!o||o.v!==1)throw 0;
  DK.dlg('<b>Zaxirani tiklash?</b><pre>Joriy fayl tizimi va progress almashtiriladi. Ilova qayta yuklanadi.</pre>',[['Tiklash',()=>{KEYS.forEach(k=>{if(k in o)LS(k,o[k])});location.reload()}],['Cancel']])}catch(e){tst("Bu zaxira fayli emas")}};fi.click()}

/* ---------- Wireshark ---------- */
const PK=(()=>{let s=7;const r=()=>{s=(s*1103515245+12345)&0x7fffffff;return s/0x7fffffff},P=[];let t=0;
  const add=(src,dst,pr,len,info,pl,sp,dp)=>{t+=r()*0.05+0.001;P.push({n:P.length+1,t:t.toFixed(6),src,dst,pr,len,info,pl:pl||'',sp:sp||0,dp:dp||0})};
  const me='192.168.56.10',web='192.168.56.101',ext=['93.184.216.34','142.250.74.14','1.1.1.1'];
  const noise=()=>{const k=Math.floor(r()*4),e=ext[Math.floor(r()*3)],p=49000+Math.floor(r()*900);
    if(k===0)add(me,'192.168.56.1','DNS',74,'Standard query A example.com','',p,53);else if(k===1)add(me,e,'TLSv1.3',Math.floor(100+r()*1200),'Application Data','',p,443);
    else if(k===2)add(me,e,'TCP',66,`${p} → 443 [ACK] Seq=1 Ack=1`,'',p,443);else add(me,'192.168.56.1','ICMP',98,'Echo (ping) request','',0,0)};
  add('192.168.56.1','ff:ff:ff','ARP',42,'Who has 192.168.56.10? Tell 192.168.56.1');add(me,'192.168.56.1','DNS',74,'Standard query A lab.local','',50111,53);add('192.168.56.1',me,'DNS',90,'Standard query response A 192.168.56.101','',53,50111);
  for(let i=0;i<4;i++)noise();
  add(me,web,'TCP',74,'49200 → 80 [SYN]','',49200,80);add(web,me,'TCP',74,'80 → 49200 [SYN, ACK]','',80,49200);add(me,web,'TCP',66,'49200 → 80 [ACK]','',49200,80);
  noise();add(me,web,'HTTP',210,'GET /login HTTP/1.1','GET /login HTTP/1.1\nHost: 192.168.56.101\nUser-Agent: Mozilla/5.0',49200,80);noise();
  add(web,me,'HTTP',540,'HTTP/1.1 200 OK (text/html)','HTTP/1.1 200 OK\nServer: Apache/2.4.54\n\n<form action="/login" method="post">...</form>',80,49200);noise();noise();
  add(me,web,'HTTP',320,'POST /login HTTP/1.1  (application/x-www-form-urlencoded)','POST /login HTTP/1.1\nHost: 192.168.56.101\nContent-Type: application/x-www-form-urlencoded\n\nuser=ali&pass=parol123',49200,80);noise();
  add(web,me,'HTTP',260,'HTTP/1.1 302 Found','HTTP/1.1 302 Found\nLocation: /admin',80,49200);noise();noise();
  add(me,web,'HTTP',190,'GET /admin HTTP/1.1','GET /admin HTTP/1.1\nHost: 192.168.56.101\nCookie: session=ali',49201,80);noise();
  add(web,me,'HTTP',610,'HTTP/1.1 200 OK (text/html)','HTTP/1.1 200 OK\nServer: Apache/2.4.54\n\n<html><body>Admin panel</body></html>\n<!-- KALI{filter_the_noise} -->',80,49201);
  for(let i=0;i<6;i++)noise();return P})();
function evalF(p,f){f=f.trim();if(!f)return true;
  return f.split(/\s*(?:\|\||\bor\b)\s*/i).some(or=>or.split(/\s*(?:&&|\band\b)\s*/i).every(tm=>{tm=tm.trim();let neg=false;if(/^(!|not\s)/i.test(tm)){neg=true;tm=tm.replace(/^(!|not\s)\s*/i,'')}
    let r=false,m;
    if(m=/^(?:\w+\.)?(?:frame|http|info)?\s*contains\s*"?([^"]*)"?$/i.exec(tm))r=(p.pl+' '+p.info).toLowerCase().includes(m[1].toLowerCase());
    else if(m=/^ip\.(addr|src|dst)\s*==\s*([\d.]+)$/i.exec(tm))r=m[1]==='addr'?(p.src===m[2]||p.dst===m[2]):m[1]==='src'?p.src===m[2]:p.dst===m[2];
    else if(m=/^(tcp|udp)\.(?:port|dstport|srcport)\s*==\s*(\d+)$/i.exec(tm))r=(p.pr==='TCP'||p.pr==='HTTP'||p.pr.startsWith('TLS')?'tcp':p.pr==='DNS'?'udp':'')===m[1].toLowerCase()&&(p.sp==m[2]||p.dp==m[2]);
    else{const w=tm.toLowerCase();r=w==='ip'?p.pr!=='ARP':w==='eth'||w==='frame'?true:w==='http.request'?p.pr==='HTTP'&&/^(GET|POST)/.test(p.info):w==='http.response'?p.pr==='HTTP'&&/^HTTP\//.test(p.info):w==='tcp'?['TCP','HTTP','TLSv1.3'].includes(p.pr):w==='udp'?p.pr==='DNS':w==='tls'||w==='ssl'?p.pr.startsWith('TLS'):p.pr.toLowerCase()===w}
    return neg?!r:r}))}
const WME='192.168.56.10',WWEB='192.168.56.101',WGW='52:54:00:12:35:02';
const WMAC={[WME]:'08:00:27:3a:5c:11',[WWEB]:'08:00:27:7e:41:0c'};
const macOf=ip=>WMAC[ip]||WGW,ipb=s=>s.split('.').map(Number),macb=s=>s.split(':').map(x=>parseInt(x,16));
const be=(v,n)=>{const a=[];for(let i=n-1;i>=0;i--)a.push(Math.floor(v/Math.pow(2,i*8))&255);return a};
const strb=s=>[...s].map(c=>c.charCodeAt(0)&255);
const hx=(v,n)=>'0x'+v.toString(16).padStart(n,'0');
const vendor=m=>m==='ff:ff:ff:ff:ff:ff'?'Broadcast':m===WGW?'RealtekU_'+m.slice(9):'PcsCompu_'+m.slice(9);
const dnsName=n=>n.split('.').flatMap(l=>[l.length,...strb(l)]).concat(0);
function splitHttp(pl){const i=pl.indexOf('\n\n');const head=(i<0?pl:pl.slice(0,i)).split('\n'),body=i<0?'':pl.slice(i+2);return{head,body}}
function buildFrame(p){
 let B=[];const L={};const seg=(k,a)=>{L[k]=[B.length,B.length+a.length];B=B.concat(a)};const m={};
 const dm=p.dst==='ff:ff:ff'?'ff:ff:ff:ff:ff:ff':macOf(p.dst),sm=macOf(p.src);m.dm=dm;m.sm=sm;
 seg('eth',[...macb(dm),...macb(sm),...(p.pr==='ARP'?[8,6]:[8,0])]);
 if(p.pr==='ARP'){seg('arp',[0,1,8,0,6,4,0,1,...macb(sm),...ipb(p.src),0,0,0,0,0,0,...ipb(WME)]);return{B,L,m}}
 let proto,tr,ap=[];const ts=100000+p.n*37;
 if(p.pr==='DNS'){proto=17;const resp=/response/.test(p.info);const name=(/query A (\S+)/.exec(p.info)||[0,'lab.local'])[1];m.dns={resp,name};
  ap=[0x12,0x34,resp?0x81:1,resp?0x80:0,0,1,0,resp?1:0,0,0,0,0,...dnsName(name),0,1,0,1,...(resp?[0xc0,0x0c,0,1,0,1,0,0,0x0e,0x10,0,4,...ipb(WWEB)]:[])];
  m.ul=8+ap.length;tr=[...be(p.sp,2),...be(p.dp,2),...be(m.ul,2),0x9a,0x3c]}
 else if(p.pr==='ICMP'){proto=1;tr=[8,0,0x5d,0xa1,0,0x1a,0,p.n&255];ap=Array.from({length:56},(_,i)=>(i+8)&255)}
 else{proto=6;const syn=/\[SYN/.test(p.info),sa=/SYN, ACK/.test(p.info);
  const fl=sa?0x12:syn?0x02:(p.pl||/Application/.test(p.info))?0x18:0x10;m.fl=fl;
  const opt=syn?[2,4,5,0xb4,4,2,8,10,...be(ts,4),0,0,0,0,1,3,3,7]:[1,1,8,10,...be(ts,4),...be(ts-3,4)];
  m.seq=1000+p.n*131;m.ack=fl===0x02?0:5000+p.n*97;m.win=fl===0x02?64240:502;m.th=20+opt.length;
  tr=[...be(p.sp,2),...be(p.dp,2),...be(m.seq,4),...be(m.ack,4),(m.th/4)<<4,fl,...be(m.win,2),0x4b,0x1d,0,0,...opt];
  if(p.pl){const{head,body}=splitHttp(p.pl);m.http={head,body};ap=strb(head.join('\r\n')+'\r\n\r\n'+body)}
  else if(p.pr.startsWith('TLS')){const n=p.len-71;m.tls=n;let s=p.n*7919+1;ap=[0x17,3,3,...be(n,2)];for(let i=0;i<n;i++){s=(s*1103515245+12345)&0x7fffffff;ap.push((s>>8)&255)}}}
 m.proto=proto;m.tl=20+tr.length+ap.length;m.id=p.n*37;
 seg('ip',[0x45,0,...be(m.tl,2),...be(m.id,2),0x40,0,64,proto,0xb8,0x2e,...ipb(p.src),...ipb(p.dst)]);
 seg('tr',tr);if(ap.length)seg('ap',ap);return{B,L,m}}
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function wtree(p,t0,d0){
 const {B,L,m}=p.fr,N=(t,r,c)=>({t,s:r?r[0]:0,e:r?r[1]:B.length,c:c||[]}),len=B.length;
 const d=new Date(d0+(parseFloat(p.t)-t0)*1000),pad=(x,n)=>String(x).padStart(n||2,'0');
 const arr=`${MON[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${pad(d.getMilliseconds(),3)}000000 +05`;
 const lay=p.pr==='ARP'?'eth:ethertype:arp':p.pr==='ICMP'?'eth:ethertype:ip:icmp:data':p.pr==='DNS'?'eth:ethertype:ip:udp:dns':'eth:ethertype:ip:tcp'+(m.http?':http'+(m.http.body?':data-text-lines':''):m.tls?':tls':'');
 const T=[];
 T.push(N(`Frame ${p.n}: ${len} bytes on wire (${len*8} bits), ${len} bytes captured (${len*8} bits) on interface eth0, id 0`,0,[
  N('Section number: 1'),N('Interface id: 0 (eth0)'),N('Encapsulation type: Ethernet (1)'),N('Arrival Time: '+arr),N(`Frame Number: ${p.n}`),
  N(`Frame Length: ${len} bytes (${len*8} bits)`),N(`Capture Length: ${len} bytes (${len*8} bits)`),N('Protocols in frame: '+lay)]));
 T.push(N(`Ethernet II, Src: ${vendor(m.sm)} (${m.sm}), Dst: ${vendor(m.dm)} (${m.dm})`,L.eth,[
  N(`Destination: ${vendor(m.dm)} (${m.dm})`,[0,6]),N(`Source: ${vendor(m.sm)} (${m.sm})`,[6,12]),N(p.pr==='ARP'?'Type: ARP (0x0806)':'Type: IPv4 (0x0800)',[12,14])]));
 if(p.pr==='ARP'){const a=L.arp[0];T.push(N('Address Resolution Protocol (request)',L.arp,[N('Hardware type: Ethernet (1)',[a,a+2]),N('Protocol type: IPv4 (0x0800)',[a+2,a+4]),N('Hardware size: 6',[a+4,a+5]),N('Protocol size: 4',[a+5,a+6]),N('Opcode: request (1)',[a+6,a+8]),
  N(`Sender MAC address: ${vendor(m.sm)} (${m.sm})`,[a+8,a+14]),N(`Sender IP address: ${p.src}`,[a+14,a+18]),N('Target MAC address: 00:00:00_00:00:00 (00:00:00:00:00:00)',[a+18,a+24]),N(`Target IP address: ${WME}`,[a+24,a+28])]));return T}
 const i=L.ip[0],pn={6:'TCP',17:'UDP',1:'ICMP'}[m.proto];
 T.push(N(`Internet Protocol Version 4, Src: ${p.src}, Dst: ${p.dst}`,L.ip,[N('0100 .... = Version: 4',[i,i+1]),N('.... 0101 = Header Length: 20 bytes (5)',[i,i+1]),N('Differentiated Services Field: 0x00 (DSCP: CS0, ECN: Not-ECT)',[i+1,i+2]),
  N(`Total Length: ${m.tl}`,[i+2,i+4]),N(`Identification: ${hx(m.id,4)} (${m.id})`,[i+4,i+6]),N('010. .... = Flags: 0x2, Don’t fragment',[i+6,i+7]),N('Time to Live: 64',[i+8,i+9]),N(`Protocol: ${pn} (${m.proto})`,[i+9,i+10]),
  N('Header Checksum: 0xb82e [validation disabled]',[i+10,i+12]),N(`Source Address: ${p.src}`,[i+12,i+16]),N(`Destination Address: ${p.dst}`,[i+16,i+20])]));
 const t=L.tr[0],ap=L.ap,apl=ap?ap[1]-ap[0]:0;
 if(m.proto===6){const fn=[[0x20,'URG'],[0x10,'ACK'],[0x08,'PSH'],[0x04,'RST'],[0x02,'SYN'],[0x01,'FIN']].filter(x=>m.fl&x[0]).map(x=>x[1]).reverse().join(', ');
  const kids=[N(`Source Port: ${p.sp}`,[t,t+2]),N(`Destination Port: ${p.dp}`,[t+2,t+4]),N('[Stream index: 0]'),N(`[TCP Segment Len: ${apl}]`),N(`Sequence Number: ${m.seq}    (relative sequence number)`,[t+4,t+8]),N(`Acknowledgment Number: ${m.ack}`,[t+8,t+12]),
   N(`${(m.th/4).toString(2).padStart(4,'0')} .... = Header Length: ${m.th} bytes (${m.th/4})`,[t+12,t+13]),N(`Flags: ${hx(m.fl,3)} (${fn})`,[t+13,t+14]),N(`Window: ${m.win}`,[t+14,t+16]),N('Checksum: 0x4b1d [unverified]',[t+16,t+18]),N('Urgent Pointer: 0',[t+18,t+20]),N(`Options: (${m.th-20} bytes)`,[t+20,t+m.th])];
  if(apl)kids.push(N(`TCP payload (${apl} bytes)`,ap));
  T.push(N(`Transmission Control Protocol, Src Port: ${p.sp}, Dst Port: ${p.dp}, Seq: ${m.seq}, Ack: ${m.ack}, Len: ${apl}`,L.tr,kids))}
 else if(m.proto===17)T.push(N(`User Datagram Protocol, Src Port: ${p.sp}, Dst Port: ${p.dp}`,L.tr,[N(`Source Port: ${p.sp}`,[t,t+2]),N(`Destination Port: ${p.dp}`,[t+2,t+4]),N(`Length: ${m.ul}`,[t+4,t+6]),N('Checksum: 0x9a3c [unverified]',[t+6,t+8])]));
 else T.push(N('Internet Control Message Protocol',L.tr,[N('Type: 8 (Echo (ping) request)',[t,t+1]),N('Code: 0',[t+1,t+2]),N('Checksum: 0x5da1 [correct]',[t+2,t+4]),N('Identifier (BE): 26 (0x001a)',[t+4,t+6]),N(`Sequence Number (BE): ${p.n}`,[t+6,t+8])]));
 if(m.proto===1)T.push(N('Data (56 bytes)',ap));
 if(m.dns){const a=ap[0],q=dnsName(m.dns.name).length+4,r=m.dns.resp;
  const kids=[N('Transaction ID: 0x1234',[a,a+2]),N(r?'Flags: 0x8180 Standard query response, No error':'Flags: 0x0100 Standard query',[a+2,a+4]),N('Questions: 1',[a+4,a+6]),N(`Answer RRs: ${r?1:0}`,[a+6,a+8]),N('Authority RRs: 0',[a+8,a+10]),N('Additional RRs: 0',[a+10,a+12]),
   N('Queries',[a+12,a+12+q],[N(`${m.dns.name}: type A, class IN`,[a+12,a+12+q])])];
  if(r)kids.push(N('Answers',[a+12+q,ap[1]],[N(`${m.dns.name}: type A, class IN, addr ${WWEB}`,[a+12+q,ap[1]])]));
  T.push(N(`Domain Name System (${r?'response':'query'})`,ap,kids))}
 if(m.tls)T.push(N('Transport Layer Security',ap,[N('TLSv1.3 Record Layer: Application Data Protocol: Hypertext Transfer Protocol',ap,[N('Opaque Type: Application Data (23)',[ap[0],ap[0]+1]),N('Version: TLS 1.2 (0x0303)',[ap[0]+1,ap[0]+3]),N(`Length: ${m.tls}`,[ap[0]+3,ap[0]+5]),N('Encrypted Application Data: '+B.slice(ap[0]+5,ap[0]+21).map(v=>v.toString(16).padStart(2,'0')).join('')+'…',[ap[0]+5,ap[1]])])]));
 if(m.http){const{head,body}=m.http;let o=ap[0];const kids=[];
  head.forEach(l=>{kids.push(N(l+'\\r\\n',[o,o+l.length+2]));o+=l.length+2});kids.push(N('\\r\\n',[o,o+2]));o+=2;
  if(/^POST/.test(head[0])&&body){const bs=o;kids.push(N('HTML Form URL Encoded: application/x-www-form-urlencoded',[bs,ap[1]],body.split('&').map(f=>{const[k,v]=f.split('=');return N(`Form item: "${k}" = "${v}"`,[bs,ap[1]])})))}
  else if(body){const ls=body.split('\n');let q=o;kids.push(N(`Line-based text data: text/html (${ls.length} lines)`,[o,ap[1]],ls.map(l=>{const n=N(l,[q,Math.min(ap[1],q+l.length+1)]);q+=l.length+1;return n})))}
  T.push(N('Hypertext Transfer Protocol',ap,kids))}
 return T}
function whex(B){let h='';for(let o=0;o<B.length;o+=16){const c=B.slice(o,o+16);h+=`<div class="hr"><span class="ho">${o.toString(16).padStart(4,'0')}</span><span class="hx">${c.map((v,i)=>`<i data-i="${o+i}">${v.toString(16).padStart(2,'0')}</i>`).join('')}</span><span class="ha">${c.map((v,i)=>`<i data-i="${o+i}">${v>31&&v<127?E(String.fromCharCode(v)):'.'}</i>`).join('')}</span></div>`}return h}
const WKW=new Set(['tcp','udp','http','dns','icmp','arp','tls','ssl','ip','eth','frame','http.request','http.response']);
function validF(f){f=f.trim();if(!f)return 0;return f.split(/\s*(?:\|\||\bor\b|&&|\band\b)\s*/i).every(tm=>{tm=tm.replace(/^(!|not\s)\s*/i,'').trim();
 return /contains\s*"?[^"]*"?$/i.test(tm)||/^ip\.(addr|src|dst)\s*==\s*[\d.]+$/i.test(tm)||/^(tcp|udp)\.(port|dstport|srcport)\s*==\s*\d+$/i.test(tm)||WKW.has(tm.toLowerCase())})?1:2}
const wi=(k,s)=>`<svg viewBox="0 0 24 24" width="${s||18}" height="${s||18}" aria-hidden="true">${{
 fin:'<path d="M5 20c2-8 5-14 9-16 0 6 1 10 5 16z" fill="currentColor"/>',stop:'<rect x="6" y="6" width="12" height="12" rx="1.5" fill="currentColor"/>',
 rs:'<path d="M5 20c2-8 5-14 9-16 0 6 1 10 5 16z" fill="#3a9a4a"/><path d="M17 5a6 6 0 0 1 3 5" stroke="#2a7a3a" stroke-width="2" fill="none" stroke-linecap="round"/>',
 gear:'<circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
 open:'<path d="M3 7h6l2 2h10v10H3z" fill="#e0b64a"/>',save:'<rect x="4" y="4" width="16" height="16" rx="2" fill="#5b7fbf"/><rect x="7" y="4" width="10" height="6" fill="#fff"/>',
 close:'<circle cx="12" cy="12" r="8" fill="#c44"/><path d="M9 9l6 6M15 9l-6 6" stroke="#fff" stroke-width="2" stroke-linecap="round"/>',
 rl:'<path d="M19 12a7 7 0 1 1-2.2-5M19 4v4h-4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
 find:'<circle cx="11" cy="11" r="5.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15.5 15.5L20 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
 back:'<path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
 fwd:'<path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
 down:'<path d="M12 4v14M6 12l6 6 6-6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
 list:'<path d="M5 7h14M5 12h14M5 17h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
 bm:'<path d="M7 4h10v16l-5-4-5 4z" fill="#7aa9e6" stroke="#4a79b6" stroke-width="1.5"/>',x:'<path d="M7 7l10 10M17 7L7 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'}[k]}</svg>`;
function openWire(){
  if(!PK.built){PK.forEach(p=>{p.fr=buildFrame(p);p.len=p.fr.B.length});PK.built=1}
  const t0=parseFloat(PK[0].t),d0=Date.now();
  const b=document.createElement('div');b.className='wsk';
  b.innerHTML=`<div class="wm">${['File','Edit','View','Go','Capture','Analyze','Statistics','Telephony','Wireless','Tools','Help'].map(x=>`<span>${x}</span>`).join('')}</div>
  <div class="wtb"><button data-a="fin" disabled title="Start capturing packets">${wi('fin')}</button><button data-a="stop" title="Stop capturing packets" style="color:#d33">${wi('stop')}</button><button data-a="rs" title="Restart current capture">${wi('rs')}</button><button data-a="o" title="Capture options">${wi('gear')}</button><i></i>
   <button data-a="o" title="Open">${wi('open')}</button><button data-a="o" title="Save">${wi('save')}</button><button data-a="o" title="Close">${wi('close')}</button><button data-a="o" title="Reload">${wi('rl')}</button><i></i>
   <button data-a="o" title="Find a packet">${wi('find')}</button><button data-a="o" title="Previous packet">${wi('back')}</button><button data-a="o" title="Next packet">${wi('fwd')}</button><button data-a="o" title="Last packet">${wi('down')}</button><button data-a="o" title="Autoscroll">${wi('list')}</button></div>
  <div class="wf"><button tabindex="-1" title="Recent filters">${wi('bm',16)}</button><input placeholder="Apply a display filter … <Ctrl-/>" autocapitalize="off" spellcheck="false"><button class="wcl" tabindex="-1" title="Clear">${wi('x',14)}</button><button class="wap" tabindex="-1" title="Apply">${wi('fwd',16)}</button></div>
  <div class="wl"><div class="wli"><div class="wh"><span>No.</span><span>Time</span><span>Source</span><span>Destination</span><span>Protocol</span><span>Length</span><span>Info</span></div><div class="lt" tabindex="0"></div></div></div>
  <div class="wd"></div><div class="wb"></div><div class="wst"><span class="s1"></span><span class="s2"></span><span>Profile: Default</span></div>`;
  const inp=$('input',b),lt=$('.lt',b),wd=$('.wd',b),wb=$('.wb',b),s1=$('.s1',b),s2=$('.s2',b);let selN=0,run=true,byI=[];
  const cls=p=>p.pr==='ARP'?'arp':p.pr==='ICMP'?'icmp':p.pr==='DNS'?'udp':p.pr==='HTTP'?'http':/SYN|FIN/.test(p.info)&&p.pr==='TCP'?'syn':'tcp';
  const dsp=a=>a==='ff:ff:ff'?'Broadcast':a;
  const draw=()=>{const f=inp.value;let rows;try{rows=PK.filter(p=>evalF(p,f))}catch(e){rows=PK}
    const v=validF(f);inp.className=v===1?'ok':v===2?'bad':'';
    lt.innerHTML=rows.map(p=>`<div data-n="${p.n}" class="r ${cls(p)}${p.n===selN?' s':''}"><span>${p.n}</span><span>${(parseFloat(p.t)-t0).toFixed(6)}</span><span>${p.src}</span><span>${dsp(p.dst)}</span><span>${p.pr}</span><span>${p.len}</span><span>${E(p.info)}</span></div>`).join('')||'<div class="none">No packets match the display filter.</div>';
    s1.textContent=run?'● eth0: <live capture in progress>':'■ eth0: capture stopped';
    s2.textContent=`Packets: ${PK.length} · Displayed: ${rows.length} (${(rows.length*100/PK.length).toFixed(1)}%)`};
  const rowTree=(n,d)=>{const h=n.c.length>0;return `<div class="tn${h?' has':''}" data-s="${n.s}" data-e="${n.e}"><div class="tl" style="padding-left:${d*15+4}px"><span class="ta"></span>${E(n.t)}</div>${h?`<div class="tc">${n.c.map(x=>rowTree(x,d+1)).join('')}</div>`:''}</div>`};
  const select=n=>{selN=n;const p=PK[n-1];lt.querySelectorAll('.r.s').forEach(x=>x.classList.remove('s'));const r=lt.querySelector(`[data-n="${n}"]`);if(r){r.classList.add('s');r.scrollIntoView({block:'nearest'})}
    wd.innerHTML=wtree(p,t0,d0).map(x=>rowTree(x,0)).join('');const tops=wd.querySelectorAll(':scope>.tn.has');if(tops.length)tops[tops.length-1].classList.add('o');
    wb.innerHTML=whex(p.fr.B);byI=[];wb.querySelectorAll('i').forEach(e=>{(byI[e.dataset.i]=byI[e.dataset.i]||[]).push(e)})};
  inp.oninput=draw;inp.addEventListener('keydown',e=>{if(e.key==='Enter'){draw();lt.focus()}});
  $('.wcl',b).onclick=()=>{inp.value='';draw()};$('.wap',b).onclick=draw;
  lt.onclick=e=>{const r=e.target.closest('[data-n]');if(r)select(+r.dataset.n)};
  lt.addEventListener('keydown',e=>{if(e.key!=='ArrowDown'&&e.key!=='ArrowUp')return;e.preventDefault();const rs=[...lt.querySelectorAll('[data-n]')];if(!rs.length)return;
    const i=rs.findIndex(x=>+x.dataset.n===selN),j=Math.max(0,Math.min(rs.length-1,(i<0?(e.key==='ArrowDown'?0:rs.length-1):i+(e.key==='ArrowDown'?1:-1))));select(+rs[j].dataset.n)});
  wd.onclick=e=>{const l=e.target.closest('.tl');if(!l)return;const n=l.parentNode;wd.querySelectorAll('.tl.sel').forEach(x=>x.classList.remove('sel'));l.classList.add('sel');
    if(n.classList.contains('has'))n.classList.toggle('o');
    wb.querySelectorAll('i.hl').forEach(x=>x.classList.remove('hl'));for(let i=+n.dataset.s;i<+n.dataset.e;i++)(byI[i]||[]).forEach(x=>x.classList.add('hl'))};
  $('.wm',b).onclick=e=>{const s=e.target.closest('span');if(s)tst('Wireshark: “'+s.textContent+'” menyusi simulyatsiyada mavjud emas')};
  $('.wtb',b).onclick=e=>{const bt=e.target.closest('button');if(!bt||bt.disabled)return;const a=bt.dataset.a;
    if(a==='stop'||a==='rs'){run=a==='rs';$('[data-a=stop]',b).disabled=!run;$('[data-a=fin]',b).disabled=run;$('[data-a=stop]',b).style.color=run?'#d33':'';draw()}
    else tst('Wireshark: bu funksiya simulyatsiyada mavjud emas')};
  win('Wireshark',b,{w:640,h:520});draw()}

/* ---------- Metasploit (soddalashtirilgan) ---------- */
const MODS={'exploit/unix/ftp/vsftpd_234_backdoor':{rp:21,d:'VSFTPD v2.3.4 Backdoor Command Execution',ok:'192.168.56.102'},'exploit/windows/smb/ms17_010_eternalblue':{rp:445,d:'MS17-010 EternalBlue SMB Remote Code Execution',ok:'192.168.56.103'},'auxiliary/scanner/portscan/tcp':{rp:0,d:'TCP Port Scanner',ok:''}};
function openMsf(){
  const t=document.createElement('div');t.className='tm';const out=document.createElement('div'),row=document.createElement('div');
  row.innerHTML='<span class="pr">msf6 &gt; </span><input autocapitalize="off" autocomplete="off" spellcheck="false">';t.append(out,row);
  const inp=$('input',row),pr=$('.pr',row);let mod='',opt={},sess=false;
  const put=s=>{const e=document.createElement('div');e.textContent=s;out.appendChild(e)};
  const prompt=()=>{pr.innerHTML=sess?'meterpreter-shell &gt; ':mod?`msf6 <span style="color:#ff7b72">exploit(${mod.split('/').pop()})</span> &gt; `:'msf6 &gt; '};
  win('Metasploit',t,{w:600,h:400});
  put('       =[ metasploit v6.4 (simulyatsiya) ]\n+ -- --=[ 3 modul: search, use, show options, set, run ]\nYordam: help');
  function cmd(l){put((sess?'shell > ':'msf6 > ')+l);const a=l.trim().split(/\s+/),c=a[0];
    if(sess){if(c==='exit'){sess=false;put('[*] Sessiya yopildi')}else if(c==='id')put('uid=0(root) gid=0(root)');else if(c==='whoami')put('root');else if(c==='ls')put('bin  etc  home  root  var');else put(c?`sh: ${c}: buyruq topilmadi (id, whoami, ls, exit)`:'');return}
    if(c==='help')put('search <so\'z> | use <modul> | show options | set <KEY> <qiymat> | run | back | exit');
    else if(c==='search'){const q=(a[1]||'').toLowerCase();Object.keys(MODS).filter(m=>m.includes(q)).forEach(m=>put(`  ${m}   ${MODS[m].d}`))}
    else if(c==='use'){if(MODS[a[1]]){mod=a[1];opt={RPORT:MODS[mod].rp,RHOSTS:''};put(`[*] ${mod} tanlandi`)}else put('[-] Modul topilmadi (search bilan qidiring)')}
    else if(c==='back')mod='';
    else if(c==='show'&&a[1]==='options'){if(!mod)put('[-] Avval: use <modul>');else put('Module options:\n  Name     Current Setting\n'+Object.keys(opt).map(k=>`  ${k.padEnd(8)} ${opt[k]}`).join('\n'))}
    else if(c==='set'){if(!mod)put('[-] Avval: use <modul>');else if(a[1]&&a[2]){opt[a[1].toUpperCase()]=a[2];put(`${a[1].toUpperCase()} => ${a[2]}`)}else put('set KEY qiymat')}
    else if(c==='run'||c==='exploit'){if(!mod)return put('[-] Avval: use <modul>');const h=opt.RHOSTS;if(!h)return put('[-] RHOSTS o\'rnatilmagan');
      if(!h.startsWith('192.168.56.'))return put("Faqat 192.168.56.0/24 laboratoriya manzillari mavjud.");
      put(`[*] ${h}:${opt.RPORT} - ${MODS[mod].d}...`);if(mod.startsWith('auxiliary')){put(`[+] ${h}:22 - TCP OPEN\n[+] ${h}:80 - TCP OPEN`);return}
      if(MODS[mod].ok===h){put(`[+] ${h}:${opt.RPORT} - Backdoor muvaffaqiyatli\n[*] Command shell session 1 opened (192.168.56.10:4444 -> ${h})\n(id, whoami, ls, exit)`);sess=true;if(mod.includes('vsftpd'))solve('msf')}
      else put('[-] Exploit tugadi, lekin sessiya ochilmadi (nishon zaif emas).')}
    else if(c==='exit')put('Oynani yoping (✕).');else if(c)put(`[-] Noma'lum buyruq: ${c}. help`)}
  inp.addEventListener('keydown',e=>{if(e.key==='Enter'){const v=inp.value;inp.value='';cmd(v);prompt();t.scrollTop=t.scrollHeight}});
  t.onclick=()=>{if(!getSelection().toString())inp.focus()};setTimeout(()=>inp.focus(),50)}
const msfOld=C.msfconsole;C.msfconsole=()=>root.classList.contains('on')?(openMsf(),''):"msfconsole: Kali Desktop ichida ochiladi (Sozlamalar → Kali Desktop).";
DK.missions=openMissions;

/* ---------- ish stollari va yorliqlar ---------- */
let ws=1;const ar=DK.ar,tb=$('#kd-tb');
const mark=n=>{if(n.nodeType===1&&(n.classList.contains('w')||n.tagName==='BUTTON')&&!n.dataset.ws)n.dataset.ws=ws};
new MutationObserver(m=>m.forEach(r=>r.addedNodes.forEach(mark))).observe(ar,{childList:true});
new MutationObserver(m=>m.forEach(r=>r.addedNodes.forEach(mark))).observe(tb,{childList:true});
const wsb=document.createElement('button');wsb.id='kd-ws';wsb.textContent='🗔 1';$('#kd-m').after(wsb);
function setWs(n){ws=n;wsb.textContent='🗔 '+n;[...ar.querySelectorAll('.w'),...tb.children].forEach(e=>e.classList.toggle('wsh',e.dataset.ws!=ws))}
wsb.onclick=()=>setWs(ws%4+1);
document.addEventListener('keydown',e=>{if(!root.classList.contains('on'))return;const k=e.key.toLowerCase();
  if(e.altKey&&!e.ctrlKey&&/^[1-4]$/.test(e.key)){e.preventDefault();setWs(+e.key)}
  else if(e.ctrlKey&&e.altKey&&k==='t'){e.preventDefault();DK.term()}
  else if(e.ctrlKey&&e.altKey&&k==='f'){e.preventDefault();DK.files()}
  else if(e.ctrlKey&&e.altKey&&k==='m'){e.preventDefault();openMissions()}
  else if(e.altKey&&e.key==='F1'){e.preventDefault();$('#kd-m').click()}
  else if(e.altKey&&e.key==='F4'){e.preventDefault();const v=[...ar.querySelectorAll('.w')].filter(x=>!x.classList.contains('wsh')&&x.style.display!=='none').sort((a,b)=>b.style.zIndex-a.style.zIndex)[0];if(v)v.querySelector('.x').click()}
  else if(e.altKey&&e.key==='Tab'){e.preventDefault();const bs=[...tb.children].filter(x=>!x.classList.contains('wsh'));if(bs.length){const i=bs.findIndex(x=>x.classList.contains('act'));bs[(i+1)%bs.length].click()}}});

/* ---------- menyu, ikonkalar ---------- */
const APPS={ms:openMissions,wire:openWire,msf:openMsf};
const mn=$('#kd-mn'),anchor=$('[data-a=net]',mn)||$('[data-a=files]',mn);
anchor.insertAdjacentHTML('afterend',[['ms','🎯 Missions / CTF'],['wire','🦈 Wireshark'],['msf','💣 Metasploit']].map(([a,t])=>`<div class="ct" data-a="${a}">${t}</div>`).join(''));
mn.addEventListener('click',e=>{const a=e.target.dataset&&e.target.dataset.a;if(a&&APPS[a]){e.stopPropagation();mn.classList.remove('on');APPS[a]()}},true);
const ic=$('#kd-ic');[['🎯','Missions','ms'],['🦈','Wireshark','wire']].forEach(([i,n,a])=>{const d=document.createElement('div');d.innerHTML=`<b>${i}</b>${n}`;let last=0;
  d.onclick=()=>{ic.querySelectorAll('.sel').forEach(x=>x.classList.remove('sel'));d.classList.add('sel');const now=Date.now();if(now-last<450){APPS[a]();d.classList.remove('sel')}last=now};ic.appendChild(d)});
})();
