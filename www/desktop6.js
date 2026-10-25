/* Kali Maktab Desktop 6-bosqich: Wi-Fi parolini topish (handshake + lug'at, WPS) va Bluetooth buzish
   (skanerlash, portlar/xizmatlar, standart PIN bilan ulanish) — to'liq ishlaydigan soxta oqim + qo'llanma. */
(()=>{
const T=window.kmsT,DK=window.kmsDK;if(!T||!DK||!DK.dlg)return;
const {win,E,tst,root}=DK,C=T.C,$=(s,r)=>(r||root).querySelector(s);
const LG=k=>{try{return localStorage.getItem(k)}catch(e){return null}},LS=(k,v)=>{try{localStorage.setItem(k,v);return true}catch(e){return false}};
const J=(k,d)=>{try{return JSON.parse(LG(k))||d}catch(e){return d}};
const rnd=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;

/* ---------- soxta nishonlar: Wi-Fi tarmoqlari ---------- */
const WIFI_TARGETS=[
 {essid:'KaliNet_5G',bssid:'A4:2B:B0:11:22:33',ch:36,enc:'WPA2',pass:'kali1234',wps:false,clients:['B8:27:EB:11:9A:02']},
 {essid:'LabWiFi',bssid:'02:11:22:AA:BB:CC',ch:1,enc:'WPA2',pass:'kalimaktab',wps:false,clients:['DC:A6:32:7B:21:4F','3C:5A:B4:90:11:02']},
 {essid:'Maktab_Guest',bssid:'02:5E:77:10:20:30',ch:11,enc:'WPA2',pass:'guest2026',wps:false,clients:[]},
 {essid:'TP-Link_A4F2',bssid:'9C:A2:F4:33:7B:A1',ch:6,enc:'WPA2',pass:'tplink8825',wps:true,wpsPin:'12345670',clients:['E0:33:8E:44:21:AA']},
 {essid:'Cafe_Free',bssid:'00:11:22:AA:BB:01',ch:9,enc:'OPN',pass:null,wps:false,clients:[]},
];
const byBssid=b=>WIFI_TARGETS.find(x=>x.bssid.toLowerCase()===String(b||'').toLowerCase());
const monOn=()=>LG('kd6_mon')==='1';

/* ---------- soxta nishonlar: Bluetooth qurilmalari ---------- */
const BT_TARGETS=[
 {name:'JBL Flip 5',mac:'5C:F3:70:AA:01:02',cls:'Audio/Video (Speaker)',rssi:-52,pin:'0000',port:1,service:'Audio Sink'},
 {name:'Redmi Buds 4',mac:'24:18:C6:33:44:55',cls:'Audio/Video (Headset)',rssi:-60,pin:'1234',port:1,service:'Handsfree'},
 {name:'Kali-Phone',mac:'9C:B6:D0:12:34:56',cls:'Phone',rssi:-45,pin:'0000',port:3,service:'OBEX File Transfer'},
 {name:'Logitech K380',mac:'B0:10:41:7A:22:9C',cls:'Peripheral (Keyboard)',rssi:-66,pin:'0000',port:5,service:'HID'},
 {name:'Lab-Speaker-Admin',mac:'D4:3A:2C:99:10:7F',cls:'Audio/Video (Speaker) [admin]',rssi:-70,pin:'0000',port:9,service:'Serial Port (Admin Console)',secret:'KALI{bluetooth_default_pin}'},
];
const byMac=m=>BT_TARGETS.find(x=>x.mac.toLowerCase()===String(m||'').toLowerCase());

/* ========== Wi-Fi: terminal buyruqlari ========== */
function deauthMsg(tg){
 const tm=()=>new Date().toTimeString().slice(0,8);
 return `${tm()}  Waiting for beacon frame (BSSID: ${tg.bssid}) on channel ${tg.ch}\n`+
  (tg.clients[0]?`${tm()}  Sending 64 directed DeAuth. STMAC: [${tg.clients[0]}] [34|56 ACKs]\n`:'')+
  `${tm()}  WPA handshake: ${tg.bssid}`;
}
C['airmon-ng']=a=>{
 if(a[0]==='start'&&a.includes('wlan0')){LS('kd6_mon','1');
  return "Found 2 processes that could cause trouble.\n  PID Name\n  601 dhclient\n  655 wpa_supplicant\n\nPHY\tInterface\tDriver\t\tChipset\nphy0\twlan0\t\tath9k_htc\tAtheros AR9271\n\n\t\t(mac80211 monitor mode vif enabled for [phy0]wlan0 on [phy0]wlan0mon)\n\t\t(mac80211 station mode vif disabled for [phy0]wlan0)"}
 if(a[0]==='stop'){LS('kd6_mon','0');return '(mac80211 station mode vif enabled on [phy0]wlan0)'}
 return monOn()?"PHY\tInterface\tDriver\t\tChipset\n\nphy0\twlan0mon\tath9k_htc\tAtheros AR9271 802.11n (monitor mode)":"PHY\tInterface\tDriver\t\tChipset\n\nphy0\twlan0\t\tath9k_htc\tAtheros AR9271 802.11n";
};
C['airodump-ng']=a=>{
 if(!a.includes('wlan0mon'))return "airodump-ng: interfeys kerak (monitor rejimida). Avval: airmon-ng start wlan0, so'ng: airodump-ng wlan0mon";
 if(!monOn())return "airodump-ng: wlan0mon topilmadi. Avval: airmon-ng start wlan0";
 const bi=a.indexOf('--bssid'),bssid=bi>=0?a[bi+1]:null,wi=a.indexOf('-w'),prefix=wi>=0?a[wi+1]:null;
 if(bssid){
  const tg=byBssid(bssid);
  if(!tg)return `airodump-ng: ${bssid} topilmadi. Avval umumiy skanerlash: airodump-ng wlan0mon`;
  const hs=J('kd6_hs',{}),cnt=J('kd6_dumpcnt',{});cnt[bssid]=(cnt[bssid]||0)+1;LS('kd6_dumpcnt',JSON.stringify(cnt));
  const captured=!!hs[bssid]||cnt[bssid]>=4;
  if(captured&&!hs[bssid]){hs[bssid]=1;LS('kd6_hs',JSON.stringify(hs))}
  let out=` CH ${tg.ch} ][ Elapsed: ${cnt[bssid]*6} s ]${captured?' [ WPA handshake: '+tg.bssid+' ]':''}\n\n BSSID              PWR Beacons #Data  CH  ENC  CIPHER AUTH ESSID\n\n ${tg.bssid}  -${rnd(30,55)}     ${80+cnt[bssid]*12}   ${captured?rnd(40,90):rnd(0,6)}   ${tg.ch}  ${tg.enc.padEnd(4)} ${tg.enc==='OPN'?'    ':'CCMP  '}${tg.enc==='OPN'?'   ':'PSK '} ${tg.essid}\n\n BSSID              STATION            PWR   Rate   Lost  Frames\n`+
   (tg.clients.length?tg.clients.map(c=>` ${tg.bssid}  ${c}  -${rnd(20,60)}    1 - 1     0     ${rnd(3,40)}`).join('\n'):" (hozircha ulangan stansiya yo'q — aireplay-ng --deauth bilan majburlash mumkin)");
  if(prefix){
   const cn=T.node(T.cwd);
   if(cn&&cn.t==='d'){const fn=prefix+'-01.cap';
    cn.c[fn]=T.f(`KISMET-CAP-FILE\nESSID:${tg.essid}\nBSSID:${tg.bssid}\nHANDSHAKE:${captured?1:0}\n`+[...Array(30)].map(()=>Math.random().toString(16).slice(2,10)).join(''));
    DK.flush&&DK.flush();
    out+=`\n\n^C\n${captured?'1':'0'} handshake(s) captured.\nSaved to ${fn}`}
  }
  return out;
 }
 return ` CH  6 ][ Elapsed: 12 s ][ ${new Date().toISOString().slice(0,16).replace('T',' ')}\n\n BSSID              PWR  Beacons  #Data  CH  ENC  CIPHER AUTH ESSID\n\n`+
  WIFI_TARGETS.map(n=>` ${n.bssid}  -${rnd(30,80)}      ${rnd(20,90)}     ${rnd(0,40)}   ${String(n.ch).padStart(2)}  ${n.enc.padEnd(4)} ${n.enc==='OPN'?'    ':'CCMP  '}${n.enc==='OPN'?'   ':'PSK '} ${n.essid}${n.wps?'  (WPS)':''}`).join('\n')+
  "\n\nMuayyan tarmoqqa qulflanish: airodump-ng --bssid <BSSID> -c <CH> -w lab wlan0mon";
};
C['aireplay-ng']=a=>{
 if(!monOn())return 'aireplay-ng: monitor interfeys kerak. Avval: airmon-ng start wlan0';
 if(!a.includes('wlan0mon'))return 'aireplay-ng: wlan0mon interfeysi kerak';
 if(a.includes('-0')||a.includes('--deauth')){
  const ai=a.indexOf('-a'),tg=byBssid(ai>=0?a[ai+1]:null);
  if(!tg)return 'aireplay-ng: -a <BSSID> kerak. Masalan: aireplay-ng -0 5 -a 02:11:22:AA:BB:CC wlan0mon';
  const hs=J('kd6_hs',{});hs[tg.bssid]=1;LS('kd6_hs',JSON.stringify(hs));
  return deauthMsg(tg);
 }
 return 'aireplay-ng: rejim kerak. Masalan: -0 5 -a <BSSID> wlan0mon';
};
C.wash=a=>{
 if(!monOn())return 'wash: monitor interfeys kerak. Avval: airmon-ng start wlan0';
 const w=WIFI_TARGETS.filter(t=>t.wps);
 return 'BSSID              Ch  dBm  WPS  Lck  Vendor    ESSID\n--------------------------------------------------------------\n'+
  w.map(t=>`${t.bssid}  ${t.ch}  -${rnd(35,55)}  2.0  No   TP-LINK   ${t.essid}`).join('\n');
};
C.reaver=a=>{
 const bi=a.indexOf('-b'),bssid=bi>=0?a[bi+1]:null,tg=byBssid(bssid);
 if(!tg)return "reaver: -b <BSSID> kerak. Avval 'wash' bilan WPS yoqilgan tarmoqni toping.";
 if(!tg.wps)return `[!] ${tg.essid} WPS'ni qo'llamaydi yoki aniqlanmadi. Avval: wash -i wlan0mon`;
 if(!monOn())return 'reaver: monitor interfeys kerak (wlan0mon)';
 const st=J('kd6_wps',{});st[bssid]=(st[bssid]||0)+1;LS('kd6_wps',JSON.stringify(st));const n=st[bssid];
 if(n<3)return `[*] WPS PIN raqamlarini sinash boshlandi...\n[*] Trying pin "${rnd(10000000,99999999)}"\n[+] ${(n*33).toFixed(2)}% complete\n[*] Davom ettirish uchun buyruqni qayta yuboring.`;
 return `[+] WPS PIN topildi: '${tg.wpsPin}'\n[+] WPA PSK: '${tg.pass}'\n[+] AP SSID: '${tg.essid}'`;
};
C['aircrack-ng']=a=>{
 const capArg=a.find(x=>/\.cap$/i.test(x));
 if(!capArg)return "aircrack-ng: .cap fayl kerak. Masalan: aircrack-ng -w /usr/share/wordlists/rockyou.txt lab-01.cap";
 const capNode=T.node(capArg);
 if(!capNode||capNode.t!=='f')return `aircrack-ng: ${capArg}: fayl topilmadi`;
 const wi=a.indexOf('-w'),wpath=wi>=0?a[wi+1]:null;
 if(!wpath)return "Lug'at kerak: -w /usr/share/wordlists/rockyou.txt";
 const wnode=T.node(wpath);
 if(!wnode||wnode.t!=='f')return `aircrack-ng: lug'at fayli topilmadi: ${wpath}`;
 const m1=/ESSID:(.*)/.exec(capNode.v),m2=/BSSID:(.*)/.exec(capNode.v),m3=/HANDSHAKE:(\d)/.exec(capNode.v);
 const essid=m1?m1[1].trim():'?',bssid=m2?m2[1].trim():'?',hs=m3?m3[1]==='1':false;
 if(!hs)return `Reading packets, please wait...\nOpening ${capArg}\n\nNo valid WPA handshakes found for ${essid} (${bssid}).\nAvval airodump-ng + aireplay-ng bilan handshake ushlang.`;
 const tg=byBssid(bssid),words=wnode.v.split('\n').map(x=>x.trim()).filter(Boolean);
 if(tg&&tg.pass&&words.includes(tg.pass))
  return `                               Aircrack-ng 1.7\n\n      [00:00:0${rnd(2,9)}] ${words.length}/${words.length} keys tested\n\n                         KEY FOUND! [ ${tg.pass} ]\n\n(ESSID: ${essid})`;
 return `                               Aircrack-ng 1.7\n\n      [00:00:12] ${words.length}/${words.length} keys tested (${rnd(900,3000)} k/s)\n\n      Passphrase not in dictionary\n\n(Maslahat: boshqa/to'liqroq lug'at bilan urinib ko'ring, yoki WPS ochiq bo'lsa 'wash' + 'reaver')`;
};

/* ========== Bluetooth: terminal buyruqlari ========== */
C.hciconfig=()=>`hci0:\tType: Primary  Bus: USB\n\tBD Address: 08:00:27:3A:5C:11  ACL MTU: 310:10  SCO MTU: 64:8\n\t${LG('kd_bt')==='1'?'UP RUNNING PSCAN ISCAN':'DOWN'}\n\tRX bytes:12480 acl:0 sco:0 events:220 errors:0\n\tTX bytes:9876 acl:0 sco:0 commands:140 errors:0`;
C.bluetoothctl=a=>{
 const sub=a[0];
 if(sub==='scan'){
  if(a[1]==='off')return 'Discovery stopped';
  return 'Agent registered\n[bluetooth]# scan on\nDiscovery started\n'+BT_TARGETS.map(d=>`[NEW] Device ${d.mac} ${d.name}\tRSSI: ${d.rssi} dBm\tClass: ${d.cls}`).join('\n');
 }
 if(sub==='pair'){
  const mac=a[1],tg=byMac(mac);
  if(!tg)return `bluetoothctl: ${mac||''} topilmadi. Avval: bluetoothctl scan on`;
  const tryPin=a[2]||'0000';
  if(tryPin!==tg.pin)return `Attempting to pair with ${mac}\n[CHG] Device ${mac} Connected: yes\nRequest PIN code\n[agent] PIN: ${tryPin}\nFailed to pair: org.bluez.Error.AuthenticationFailed`;
  const pr=J('kd_btp',[]);if(!pr.includes(mac)){pr.push(mac);LS('kd_btp',JSON.stringify(pr))}LS('kd_btc',mac);
  return `Attempting to pair with ${mac}\n[CHG] Device ${mac} Connected: yes\nRequest PIN code\n[agent] PIN: ${tryPin}\n[CHG] Device ${mac} Paired: yes\nPairing successful`;
 }
 if(sub==='devices'){const pr=J('kd_btp',[]);return pr.length?pr.map(m=>{const t=byMac(m);return `Device ${m} ${t?t.name:'?'}`}).join('\n'):'(hali qurilma ulanmagan)'}
 if(sub==='trust')return a[1]?`[CHG] Device ${a[1]} Trusted: yes`:'bluetoothctl: MAC kerak';
 return "Agent registered\n[bluetooth]# scan on\n[NEW] Device 5C:F3:70:AA:01:02 JBL Flip 5\n[NEW] Device 24:18:C6:33:44:55 Redmi Buds\n[NEW] Device 9C:B6:D0:12:34:56 Kali-Phone\n\n(sub-buyruqlar: scan on|off, pair <MAC> [PIN], devices, trust <MAC>)";
};
C.hcitool=a=>{
 if(a[0]==='scan')return 'Scanning ...\n'+BT_TARGETS.map(d=>`\t${d.mac}\t${d.name}`).join('\n');
 if(a[0]==='inq')return 'Inquiring ...\n'+BT_TARGETS.map(d=>`\t${d.mac}\tclock offset: 0x${rnd(1000,9999)}\tclass: 0x${rnd(100000,999999)}`).join('\n');
 return 'hcitool: scan | inq';
};
C.sdptool=a=>{
 if(a[0]==='browse'){
  const mac=a[1],tg=byMac(mac);
  if(!tg)return `sdptool: ${mac||''}: qurilma topilmadi`;
  return `Browsing ${mac} ...\nService Name: ${tg.service}\nService RecHandle: 0x1000${rnd(0,9)}\nService Class ID List:\n  "${tg.service}" (0x11${rnd(10,99)})\nProtocol Descriptor List:\n  "L2CAP" (0x0100)\n  "RFCOMM" (0x0003)\n    Channel: ${tg.port}`;
 }
 return 'sdptool: browse <MAC> kerak';
};
C.rfcomm=a=>{
 if(a[0]==='connect'){
  const mac=a[1],ch=+a[2]||null,tg=byMac(mac),pr=J('kd_btp',[]);
  if(!tg)return `rfcomm: ${mac||''} topilmadi`;
  if(!pr.includes(mac))return `Can't connect RFCOMM socket: Connection refused (avval ulaning: bluetoothctl pair ${mac} <PIN>)`;
  if(ch!==tg.port)return `rfcomm: channel ${ch!=null?ch:'?'} — "Page timeout" (to'g'ri kanalni "sdptool browse ${mac}" orqali toping)`;
  let out=`Connected /dev/rfcomm0 to ${mac} on channel ${ch}\nPress CTRL-C for hangup`;
  if(tg.secret){out+=`\n\n[${tg.service}] motd: ${tg.secret}`;
   const dn=T.node('/home/kali/lab');if(dn&&dn.t==='d'){dn.c['bt_admin_console.txt']=T.f(`RFCOMM session log — ${tg.name} (${mac})\nmotd: ${tg.secret}\n`);DK.flush&&DK.flush()}}
  return out;
 }
 return 'rfcomm: connect <MAC> <channel> kerak';
};
C.l2ping=a=>{
 const mac=a.find(x=>/^[0-9A-Fa-f:]{17}$/.test(x)),tg=byMac(mac);
 if(!tg)return 'l2ping: MAC manzil kerak. Masalan: l2ping 5C:F3:70:AA:01:02';
 const ci=a.indexOf('-c'),n=Math.min(+(ci>=0?a[ci+1]:4)||4,8);
 let o=`Ping: ${mac} from 08:00:27:3A:5C:11 (data size 44) ...\n`;
 for(let i=0;i<n;i++)o+=`44 bytes from ${mac} id ${i} time ${(Math.abs(tg.rssi)/10+Math.random()).toFixed(2)}ms\n`;
 return o+`${n} sent, ${n} received, 0% loss`;
};

/* ========== Qo'llanma oynasi ========== */
const CSS=`
#kdsk .gd{height:100%;overflow:auto;background:#161c2b;padding:10px;box-sizing:border-box;color:#dbe4f5;font:13px/1.5 system-ui,sans-serif}
#kdsk .gd .tabs2{display:flex;gap:6px;margin-bottom:10px}
#kdsk .gd .tabs2 button{flex:1;background:#202a40;border:0;color:#9ab;border-radius:8px;padding:8px;font-size:13px}
#kdsk .gd .tabs2 button.on{background:#2c4f8f;color:#fff}
#kdsk .gd .st{background:#1d2740;border:1px solid #2c3a5c;border-radius:10px;padding:10px 12px;margin-bottom:8px}
#kdsk .gd .st b{display:block;margin-bottom:3px}
#kdsk .gd .st p{margin:0 0 4px;color:#aeb9d4;font-size:12.5px}
#kdsk .gd .st code{display:block;background:#0b0f18;color:#9fd0ff;padding:7px;border-radius:6px;margin-top:5px;font:12px monospace;white-space:pre-wrap}
#kdsk .gd .st .bb{margin-top:6px;display:flex;gap:6px}
#kdsk .gd .st .bb button{background:#2d3a58;border:0;color:#fff;border-radius:6px;padding:4px 9px;font-size:11px}
#kdsk .gd .note{background:#33261a;border:1px solid #6b4a1e;color:#f0c987;border-radius:8px;padding:8px 10px;font-size:12px;margin:4px 0 10px}
#kdsk .gd .why{background:#172036;border-left:3px solid #3a6fd0;color:#bcd3ff;font-size:12px;padding:6px 8px;margin:2px 0 4px;border-radius:4px}
#kdsk .gd .tgt{color:#8fe3a8;font-size:12px;margin:0 0 10px}
#kdsk .gd .st .bb button[data-bot]{background:#2d5a3a}
#kdsk .gd-kebab{font-size:20px;line-height:1;padding:2px 12px;font-weight:700}
#kdsk .gd-kdd{position:absolute;min-width:230px;background:rgba(14,19,32,.97);border:1px solid #3a4560;border-radius:10px;z-index:12;padding:6px;display:none}
#kdsk .gd-kdd.on{display:block}
#kdsk .gd-kdd div{padding:9px 10px;border-radius:6px;font-size:13px}
#kdsk .gd-kdd div:active{background:rgba(255,255,255,.14)}
#kdsk .tm .ttl2{color:#7fd9ff;margin-top:10px;font-weight:600}
#kdsk .tm .note2{color:#f0c987}
#kdsk .tm input.paste-flash{outline:2px solid #ffd54f;background:#2a2410}
#kdsk .sig{height:100%;overflow:auto;background:#0f1420;padding:8px;box-sizing:border-box;color:#dbe4f5;font:12.5px/1.4 system-ui,sans-serif}
#kdsk .sig .sigh{font-weight:700;margin-bottom:8px;color:#9fd0ff;display:flex;justify-content:space-between;align-items:center}
#kdsk .sig .sigh small{color:#6b7aa0;font-weight:400;font-size:11px}
#kdsk .sig table{width:100%;border-collapse:collapse;font:12px monospace}
#kdsk .sig th{text-align:left;color:#7d8bb0;font-weight:600;padding:4px 6px;border-bottom:1px solid #2c3a5c}
#kdsk .sig td{padding:5px 6px;border-bottom:1px solid #1c2538}
#kdsk .sig tr.demo{background:rgba(80,140,255,.12)}
#kdsk .sig .sv{transition:background .15s,color .15s;border-radius:3px;padding:0 2px}
#kdsk .sig .sv.flash{background:#ffd54f;color:#111}
#kdsk .sig .ok{color:#7ee787}
#kdsk .sig .out{margin-top:8px;border-top:1px solid #253150;padding-top:6px;font:12px/1.4 monospace;color:#9ab;white-space:pre-wrap;max-height:120px;overflow:auto}
#kdsk .sig .inrow{display:flex;gap:4px;margin-top:8px;align-items:center}
#kdsk .sig .inrow span{color:#7fd9ff;font:12px monospace}
#kdsk .sig .inrow input{flex:1;background:#0b0f18;border:1px solid #2c3a5c;color:#dbe4f5;border-radius:6px;padding:5px 7px;font:12px monospace}
#kdsk .sig .inrow input.paste-flash{outline:2px solid #ffd54f;background:#2a2410}
`;
document.head.appendChild(Object.assign(document.createElement('style'),{textContent:CSS}));

/* ---------- namoyish (bot) uchun belgilangan soxta nishonlar ---------- */
const WIFI_DEMO=WIFI_TARGETS.find(x=>x.essid==='LabWiFi');
const WPS_DEMO=WIFI_TARGETS.find(x=>x.wps);
const BT_DEMO=BT_TARGETS.find(x=>x.name==='JBL Flip 5');
function fillCmd(tab,raw){
 if(tab==='w'){
  const tg=/wash|reaver/.test(raw)?WPS_DEMO:WIFI_DEMO;
  return raw.replace(/<BSSID>/g,tg.bssid).replace(/<CH>/g,String(tg.ch));
 }
 return raw.replace(/<MAC>/g,BT_DEMO.mac).replace(/<kanal>/g,String(BT_DEMO.port));
}

const WIFI_STEPS=[
 {t:"1. Adapterni monitor rejimiga o'tkazish",d:"Kartani oddiy rejimdan atrofdagi barcha paketlarni eshitadigan monitor rejimiga o'tkazamiz.",why:"Oddiy (managed) rejimda karta faqat o'ziga qaratilgan paketlarni qabul qiladi. Monitor rejimida u havodagi 802.11 paketlarning barchasini — hatto o'zi ulanmagan tarmoqlarnikini ham — passiv tarzda tinglay oladi. Bu hali hech qanday qurilmaga ta'sir qilmaydi, faqat eshitish.",c:'airmon-ng start wlan0'},
 {t:'2. Atrofdagi tarmoqlarni skanerlash',d:"Ko'rinib turgan tarmoqlar — BSSID, kanal, shifrlash turi va signal darajasi.",why:"airodump-ng AP'lar muntazam yuboradigan 'beacon' freymlarini o'qiydi. ENC/AUTH ustunlari tarmoq WPA2 ekanini yoki ochiq (OPN) ekanini ko'rsatadi — bu keyingi usulni tanlashga yordam beradi.",c:'airodump-ng wlan0mon'},
 {t:'3. Bitta tarmoqqa qulflanib yozib olish',d:'Tanlangan BSSID va kanalga qulflanib, paketlarni faylga yozamiz.',why:"-w parametri qabul qilingan paketlarni .cap fayliga saqlaydi. Faqat bitta kanalga qulflanish signalni kuchaytiradi va WPA 'qo'l siqishuvi'ni to'liq ushlab qolish ehtimolini oshiradi.",c:'airodump-ng --bssid <BSSID> -c <CH> -w lab wlan0mon'},
 {t:"4. Handshake ni tezlashtirish (ixtiyoriy)",d:"Ulangan qurilmani bir lahza uzib-ulab, WPA \"qo'l siqishuv\" (handshake) paketini tezroq ushlaymiz.",why:"Deauthentication freymi 802.11 standartining zaif tomoni: u shifrlanmagan va soxtalashtirilishi mumkin. Qurilma qayta ulanganda 4 bosqichli WPA handshake sodir bo'ladi — aynan shu paketlar parolni matematik tekshirish uchun kerak bo'ladi.",c:'aireplay-ng -0 5 -a <BSSID> wlan0mon'},
 {t:"5. Parolni lug'at bilan sinash",d:"Ushlangan handshake faylini mashhur parollar lug'ati bilan solishtiradi.",why:"Handshake parolning o'zi emas — u parolni tasdiqlash uchun matematik 'imzo'. aircrack-ng lug'atdagi har bir so'zni shu imzo bilan solishtiradi. Parol lug'atda bo'lmasa, usul natija bermaydi — shuning uchun uzun va tasodifiy parollar ancha xavfsizroq.",c:'aircrack-ng -w /usr/share/wordlists/rockyou.txt lab-01.cap'},
 {t:"Muqobil yo'l: WPS zaifligi",d:"Agar router WPS yoqilgan bo'lsa, lug'atsiz ham, PIN orqali parol topiladi.",why:"WPS PIN atigi 8 xonali bo'lib, ko'p router uni 4+4 qismga bo'lib alohida tekshiradi — bu urinishlar sonini keskin kamaytiradi. Shuning uchun zamonaviy routerlarda WPS odatda o'chirib qo'yiladi.",c:'wash -i wlan0mon\nreaver -i wlan0mon -b <BSSID> -vv'},
];
const BT_STEPS=[
 {t:'1. Bluetooth adapterni tekshirish',d:'Adapter holatini ko\u2019ramiz.',why:"hciconfig lokal Bluetooth kontrolleri (hci0)ning holatini, manzilini va ishga tushganini ko'rsatadi — bu har doim birinchi diagnostika qadami.",c:'hciconfig'},
 {t:'2. Atrofdagi qurilmalarni qidirish',d:"Nom, MAC manzil va signal darajasi (RSSI) chiqadi.",why:"'Discoverable' rejimdagi qurilmalar o'zlarining reklama (advertising) paketlarini ochiq efirga uzatib turadi. Buni tinglash passiv — ruxsat so'ralmaydi va qurilmaga ta'sir qilinmaydi.",c:'bluetoothctl scan on'},
 {t:"3. Xizmatlar va portlarni (kanallarni) ko'rish",d:'Qurilma qanday xizmat taqdim etishini va qaysi RFCOMM kanalda ekanini aniqlaymiz.',why:"SDP (Service Discovery Protocol) qurilma taqdim etadigan xizmatlar (audio, fayl uzatish, seriyali port) va ularning kanal raqamini qaytaradi. To'g'ri kanalni bilmasdan xizmatga ulanib bo'lmaydi.",c:'sdptool browse <MAC>'},
 {t:'4. Standart PIN bilan ulanish',d:"Ko'p qurilma hali ham zavod PIN kodini (0000 yoki 1234) ishlatadi.",why:"Arzon va eski qurilmalar ko'pincha zavoddan kelgan PINni hech qachon o'zgartirmaydi — bu amaliyotda eng keng tarqalgan Bluetooth zaiflik hisoblanadi.",c:'bluetoothctl pair <MAC> 0000'},
 {t:'5. Xizmatga ulanish',d:"To'g'ri kanal orqali qurilma xizmatiga (masalan, Serial Port) ulanamiz.",why:"Juftlashgandan (pairing) so'ng, to'g'ri RFCOMM kanaliga ulanib, qurilma taqdim etadigan xizmatdan (masalan, seriyali konsol) foydalanish mumkin bo'ladi.",c:'rfcomm connect <MAC> <kanal>'},
];

/* ---------- bot: ikkita HAQIQIY oynani o'zi ochadi (ish terminali + signal monitori),
   ulardan qiymatlarni "nusxalaydi", terminalga yozadi va Enter bosadi ---------- */
const delay=ms=>new Promise(r=>setTimeout(r,ms));
const WIFI_EXEC_ORDER=[0,1,3,2,4,5]; /* bot haqiqiy natija ko'rsatishi uchun: deauth (3) handshake ni "capture+write" (2) qadamidan oldin bajariladi, ro'yxatdagi ko'rinish tartibi esa o'zgarmaydi */
let botBusy=false,termBotWin=null;
const monWins={}; /* kind -> win obj: 'w' Wi-Fi, 'b' Bluetooth, 'f' Fayllar/natijalar — bot kerakli turini o'zi ochadi */

const MON_META={
 w:{title:"\ud83d\udce1 Signal monitori \u2014 Wi-Fi",ph:'airodump-ng / wash ...'},
 b:{title:"\ud83d\udce1 Signal monitori \u2014 Bluetooth",ph:'bluetoothctl / hcitool ...'},
 f:{title:"\ud83d\udcc1 Natijalar \u2014 fayllar",ph:'ls / cat ...'},
};
function monTableHTML(kind){
 if(kind==='w'){
  const hs=J('kd6_hs',{});
  return `<table><thead><tr><th>BSSID</th><th>CH</th><th>ENC</th><th>ESSID</th><th></th></tr></thead><tbody>${WIFI_TARGETS.map(t=>`<tr class="${t===WIFI_DEMO||t===WPS_DEMO?'demo':''}"><td><span class="sv" data-v="${t.bssid}">${t.bssid}</span></td><td><span class="sv" data-v="${t.ch}">${t.ch}</span></td><td>${t.enc}</td><td>${E(t.essid)}</td><td>${hs[t.bssid]?'<span class="ok">\u2713 handshake</span>':''}</td></tr>`).join('')}</tbody></table>`;
 }
 if(kind==='b'){
  const pr=J('kd_btp',[]);
  return `<table><thead><tr><th>MAC</th><th>Nomi</th><th>Klass</th><th></th></tr></thead><tbody>${BT_TARGETS.map(t=>`<tr class="${t===BT_DEMO?'demo':''}"><td><span class="sv" data-v="${t.mac}">${t.mac}</span></td><td>${E(t.name)}</td><td>${E(t.cls)}</td><td>${pr.includes(t.mac)?'<span class="ok">\u2713 paired</span>':''}</td></tr>`).join('')}</tbody></table>`;
 }
 /* 'f' — joriy katalogdagi natija fayllar (masalan .cap) va lug'at: aircrack-ng bosqichida bot shu oynadan nusxalaydi */
 const cn=T.node(T.cwd),files=[];
 if(cn&&cn.t==='d')for(const k in cn.c)if(/\.cap$/i.test(k))files.push(k);
 if(!files.includes('lab-01.cap'))files.push('lab-01.cap');
 const rows=files.map(f=>`<tr><td><span class="sv" data-v="${f}">${E(f)}</span></td><td>.cap (ushlangan paketlar)</td></tr>`).join('')+
  `<tr><td><span class="sv" data-v="/usr/share/wordlists/rockyou.txt">/usr/share/wordlists/rockyou.txt</span></td><td>lug'at</td></tr>`;
 return `<table><thead><tr><th>Nomi</th><th>Tavsif</th></tr></thead><tbody>${rows}</tbody></table>`;
}
/* kerakli turdagi monitor oynasini bot o'zi ochadi (yoki bor bo'lsa — qayta ko'rsatadi); boshqa turdagi oynalar yopilmaydi */
function openDataWin(kind){
 const ex=monWins[kind];
 if(ex&&ex.el&&ex.el.isConnected){ex.el.style.display='flex';ex.refresh();return ex}
 const meta=MON_META[kind];
 const b=document.createElement('div');b.className='sig';
 const head=document.createElement('div');head.className='sigh';
 head.innerHTML=`<span>${E(meta.title)}</span><small>bot/siz \u2014 kod yozish mumkin</small>`;
 const tbl=document.createElement('div');
 const outp=document.createElement('div');outp.className='out';
 const inrow=document.createElement('div');inrow.className='inrow';
 inrow.innerHTML=`<span>$</span><input autocapitalize="off" autocomplete="off" spellcheck="false" placeholder="${meta.ph}">`;
 b.append(head,tbl,outp,inrow);
 const inp=inrow.querySelector('input');
 function refresh(){tbl.innerHTML=monTableHTML(kind)}
 refresh();
 inp.addEventListener('keydown',e=>{if(e.key==='Enter'){
  const v=inp.value;inp.value='';if(!v.trim())return;
  const line=document.createElement('div');line.textContent='$ '+v;outp.appendChild(line);
  let o='';try{o=T.run(v)}catch(err){o=String(err&&err.message||err)}
  if(o){const r=document.createElement('div');r.textContent=o;outp.appendChild(r)}
  outp.scrollTop=outp.scrollHeight;refresh();DK.flush&&DK.flush();
 }});
 const w=win(meta.title,b,{w:460,h:340});
 w.body2=b;w.inp=inp;w.refresh=refresh;
 monWins[kind]=w;
 return w;
}
/* qiymatni mos monitor oynasida topib, yorqinlashtirib "nusxalash" effekti (barcha ochiq monitor oynalarini qidiradi) */
async function copyFromSignal(val){
 const esc=window.CSS&&window.CSS.escape?window.CSS.escape(val):String(val).replace(/["\\]/g,'\\$&');
 const cells=[];
 for(const k in monWins){const w=monWins[k];if(w&&w.body2&&w.el&&w.el.isConnected)cells.push(...w.body2.querySelectorAll(`[data-v="${esc}"]`))}
 cells.forEach(c=>c.classList.add('flash'));
 await delay(500);
 cells.forEach(c=>c.classList.remove('flash'));
}
/* buyruq matniga qarab qaysi monitor turi kerakligini bot o'zi aniqlaydi va, kerak bo'lsa, o'sha oynani ochadi */
function neededKind(tab,raw){
 if(/\.cap\b|rockyou\.txt/.test(raw))return 'f';
 return tab;
}
function demoValuesFor(tab,raw){
 const out=[];
 if(tab==='w'){
  const tg=/wash|reaver/.test(raw)?WPS_DEMO:WIFI_DEMO;
  if(/<BSSID>/.test(raw))out.push(tg.bssid);
  if(/<CH>/.test(raw))out.push(String(tg.ch));
  if(/lab-01\.cap/.test(raw))out.push('lab-01.cap');
  if(/rockyou\.txt/.test(raw))out.push('/usr/share/wordlists/rockyou.txt');
 }else{
  if(/<MAC>/.test(raw))out.push(BT_DEMO.mac);
  if(/<kanal>/.test(raw))out.push(String(BT_DEMO.port));
 }
 return out;
}

/* 1-oyna: Ish terminali — bot shu yerga yozadi va Enter bosadi (haqiqiy buyruq dvigateli bilan) */
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
/* qiymatlarni "nusxalab joylashtiradi" (bir zumda), qolganini o'zi "yozadi" (harf-harf) */
async function typeCommand(inp,tab,raw,filled){
 const values=demoValuesFor(tab,raw);
 let i=0;
 while(i<filled.length){
  const v=values.find(val=>val&&filled.startsWith(val,i));
  if(v){
   await copyFromSignal(v);
   inp.classList.add('paste-flash');
   inp.value+=v;
   await delay(200);
   inp.classList.remove('paste-flash');
   i+=v.length;
  }else{
   inp.value+=filled[i];i++;
   await delay(15);
  }
 }
}
let lastReport=null; /* oxirgi bot yugurishining to'liq jurnali — PDF/Telegram tugmasi shundan foydalanadi */
async function runBotChain(tab,uptoIdx){
 if(botBusy){tst("\ud83e\udd16 Bot allaqachon ishlamoqda...");return}
 botBusy=true;
 const log=[]; /* {ts, type:'win'|'cmd', ...} — "nima qildi, qachon, nega" jurnali */
 const now=()=>new Date();
 try{
  const steps=tab==='w'?WIFI_STEPS:BT_STEPS;
  const picked=uptoIdx==null?steps:steps.slice(0,uptoIdx+1);
  const list=tab==='w'?WIFI_EXEC_ORDER.filter(i=>picked.includes(steps[i])).map(i=>steps[i]):picked;
  const tw=openWorkTerminal();
  log.push({ts:now(),type:'win',title:"\ud83d\udda5 Ish terminali",note:"buyruqlar shu yerda yozilib, Enter bosiladi"});
  if(!(monWins[tab]&&monWins[tab].el&&monWins[tab].el.isConnected))log.push({ts:now(),type:'win',title:MON_META[tab].title,note:'boshlang\u2019ich monitor sifatida ochildi'});
  openDataWin(tab); /* boshlang'ich monitor: tanlangan bo'lim (Wi-Fi yoki Bluetooth) */
  tw.put(tab==='w'?"\ud83e\udd16 Bot: kerakli qiymatlarni \ud83d\udce1 monitor oynasidan nusxalab, buyruqlarni yozib ishga tushiraman. Kerak bo'lsa qo'shimcha oyna (masalan \ud83d\udcc1 Natijalar) o'zim ochaman.":"\ud83e\udd16 Bot: MAC manzilini \ud83d\udce1 Signal monitoridan nusxalab, buyruqlarni yozib ishga tushiraman.");
  tw.put("ESLATMA: to'liq simulyatsiya \u2014 hech qanday haqiqiy Wi-Fi yoki Bluetooth qurilmasiga ulanilmaydi.");
  for(const st of list){
   const lines=st.c.split('\n');
   for(const raw of lines){
    const filled=fillCmd(tab,raw);
    const kind=neededKind(tab,raw);
    const existed=!!(monWins[kind]&&monWins[kind].el&&monWins[kind].el.isConnected);
    const sw=openDataWin(kind);
    if(!existed)log.push({ts:now(),type:'win',title:MON_META[kind].title,note:"bot o'zi ochdi: \""+filled+"\" buyrug'i uchun kerakli ma'lumot shu yerda"});
    if(sw.el&&sw.el.isConnected)focusWinIfPossible(sw);
    await delay(150);
    if(tw.el&&tw.el.isConnected)focusWinIfPossible(tw);
    tw.input.focus();
    await typeCommand(tw.input,tab,raw,filled);
    await delay(220);
    tw.input.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}));
    await delay(650);
    for(const k in monWins)if(monWins[k]&&monWins[k].el&&monWins[k].el.isConnected)monWins[k].refresh();
    log.push({ts:now(),type:'cmd',title:st.t,why:st.why||st.d,cmd:filled,win:MON_META[kind].title,output:tw.lastOutput||''});
   }
  }
  tw.put("\u2705 Namoyish yakunlandi. Natijalarni yuqorida ko'rishingiz mumkin.");
  lastReport={tab,log};
  const btn=document.createElement('button');btn.className='rpbtn';btn.textContent="\ud83d\udce4 Hisobot (PDF) \u2014 Telegram'ga yuborish";
  btn.style.cssText='margin:6px 0;background:#2d5a3a;color:#fff;border:0;border-radius:6px;padding:7px 11px;font-size:12px;cursor:pointer';
  btn.onclick=()=>sendReportPdf(lastReport);
  tw.out.appendChild(btn);
  try{tw.scrollEl.scrollTop=tw.scrollEl.scrollHeight}catch(e){}
 }finally{botBusy=false}
}
function focusWinIfPossible(w){try{w&&w.el&&w.el.dispatchEvent(new Event('pointerdown',{bubbles:true}))}catch(e){}}

/* ========== Bot hisoboti: nima qildi / nega / qachon qaysi oyna ochildi — PDF qilib Telegram'ga (yoki istalgan ulashish menyusiga) yuborish ========== */
const hhmmss=d=>d.toTimeString().slice(0,8);
function reportLines(rep){
 const L=[];
 L.push(`KALI MAKTAB \u2014 BOT HISOBOTI`);
 L.push(`Bo'lim: ${rep.tab==='w'?"Wi-Fi parolini topish":"Bluetooth buzish"}`);
 L.push(`Sana: ${rep.log[0]?rep.log[0].ts.toLocaleString():''}`);
 L.push(`ESLATMA: to'liq simulyatsiya. Hech qanday haqiqiy Wi-Fi yoki Bluetooth qurilmasiga ulanilmadi.`);
 L.push('');
 let cmdNo=0;
 for(const e of rep.log){
  if(e.type==='win'){
   L.push(`[${hhmmss(e.ts)}] OYNA OCHILDI: ${e.title}`);
   if(e.note)L.push(`    \u2014 ${e.note}`);
  }else{
   cmdNo++;
   L.push(`[${hhmmss(e.ts)}] #${cmdNo} ${e.title}`);
   L.push(`    Sabab: ${e.why||'(ko\u2019rsatilmagan)'}`);
   L.push(`    Buyruq: ${e.cmd}`);
   L.push(`    Oyna: ${e.win}`);
   const out=(e.output||'').split('\n').filter(Boolean).slice(0,6);
   if(out.length){L.push('    Natija:');out.forEach(o=>L.push('      '+o))}
  }
  L.push('');
 }
 L.push(`\u2705 Yakun: ${cmdNo} ta buyruq bajarildi.`);
 return L;
}
function wrapText(s,width){
 const words=String(s).split(' '),out=[];let cur='';
 for(const w of words){if((cur+' '+w).trim().length>width){out.push(cur);cur=w}else cur=(cur+' '+w).trim()}
 out.push(cur);
 return out;
}
const pdfSafe=s=>String(s).replace(/[\u2018\u2019\u02bb\u02bc]/g,"'").replace(/[\u201c\u201d]/g,'"').replace(/[^\x20-\xFF]/g,'?');
/* hech qanday tashqi kutubxonasiz (APK internetsiz ishlashi uchun), minimal haqiqiy PDF faylni qo'lda yig'ish */
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
 const bytes=new Uint8Array(pdf.length);
 for(let i=0;i<pdf.length;i++)bytes[i]=pdf.charCodeAt(i)&0xFF;
 return bytes;
}
async function sendReportPdf(rep){
 if(!rep){tst("Hisobot topilmadi \u2014 avval botni ishga tushiring");return}
 const lines=reportLines(rep);
 const bytes=buildPdf(lines);
 const blob=new Blob([bytes],{type:'application/pdf'});
 const nom=`KaliMaktab_hisobot_${rep.tab==='w'?'wifi':'bt'}_${Date.now()}.pdf`;
 let fayl=null;try{fayl=new File([blob],nom,{type:'application/pdf'})}catch(e){}
 if(fayl&&navigator.canShare&&navigator.canShare({files:[fayl]})){
  try{await navigator.share({files:[fayl],title:nom,text:'Kali Maktab \u2014 bot hisoboti (PDF)'});return}catch(e){}
 }
 const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=nom;a.click();
 setTimeout(()=>URL.revokeObjectURL(a.href),1500);
 tst(nom+" yuklab olindi \u2014 Telegramda fayl sifatida biriktiring");
}

let gdW=null,gdTab='w';
function openGuide(){
 if(gdW&&gdW.el.isConnected){gdW.el.style.display='flex';return}
 const b=document.createElement('div');b.className='gd';
 function render(){
  const steps=gdTab==='w'?WIFI_STEPS:BT_STEPS;
  const tgt=gdTab==='w'?`\ud83c\udfaf Namoyish nishoni: ${E(WIFI_DEMO.essid)} (BSSID ${WIFI_DEMO.bssid}, kanal ${WIFI_DEMO.ch}) \u2014 WPS qadami uchun: ${E(WPS_DEMO.essid)} (${WPS_DEMO.bssid})`:`\ud83c\udfaf Namoyish nishoni: ${E(BT_DEMO.name)} (${BT_DEMO.mac})`;
  b.innerHTML=`<div class="tabs2"><button data-tb="w" class="${gdTab==='w'?'on':''}">\ud83d\udcf6 Wi-Fi parolini topish</button><button data-tb="b" class="${gdTab==='b'?'on':''}">\ud83d\udd35 Bluetooth buzish</button></div>
  <div class="note">\u26a0\ufe0f To'liq simulyatsiya: barcha tarmoq/qurilma va natijalar xayoliy. Bu yerdagi hech bir buyruq haqiqiy Wi-Fi yoki Bluetooth qurilmasiga ulanmaydi yoki ta'sir qilmaydi \u2014 shuning uchun istalgan buyruqni xavfsiz sinab ko'rishingiz mumkin.</div>
  <p class="tgt">${tgt}</p>
  ${steps.map((s,i)=>`<div class="st"><b>${E(s.t)}</b><p>${E(s.d)}</p>${s.why?`<p class="why">\ud83d\udca1 ${E(s.why)}</p>`:''}<code>${E(s.c)}</code><div class="bb"><button data-cp="${E(fillCmd(gdTab,s.c))}">\ud83d\udccb Nusxalash</button><button data-term="${i}">\ud83d\udda5 Terminalni ochish</button><button data-bot="${i}">\ud83e\udd16 Bot: ko'rsatib ber</button></div></div>`).join('')}`;
 }
 b.addEventListener('click',e=>{const d=e.target.dataset;
  if(d.tb){gdTab=d.tb;render()}
  else if(d.cp!==undefined){try{navigator.clipboard.writeText(d.cp).catch(()=>{})}catch(err){}tst('\ud83d\udccb Nusxalandi')}
  else if(d.term!==undefined){const i=+d.term,st=(gdTab==='w'?WIFI_STEPS:BT_STEPS)[i];DK.term(fillCmd(gdTab,st.c).split('\n').join(' ; '))}
  else if(d.bot!==undefined){runBotChain(gdTab,+d.bot)}});
 gdW=win("\ud83c\udf93 Wi-Fi / Bluetooth qo'llanma",b,{w:420,h:480});gdW.render=render;render();
}
DK.guide=openGuide;
C.guide=()=>{if(!root.classList.contains('on'))return "guide: qo'llanma faqat \ud83d\udc09 Kali Desktop ichida ochiladi.";openGuide();return ''};
C.qollanma=C.guide;
function resetSim(){['kd6_mon','kd6_hs','kd6_dumpcnt','kd6_wps','kd_btp','kd_btc'].forEach(k=>{try{localStorage.removeItem(k)}catch(e){}});tst("\ud83d\udd04 Simulyatsiya holati tozalandi");if(gdW&&gdW.render)gdW.render();for(const k in monWins)if(monWins[k]&&monWins[k].el&&monWins[k].el.isConnected)monWins[k].refresh()}

/* ---------- menyu va ish stoli ikonkasi ---------- */
const mn=$('#kd-mn'),anchor=$('[data-a=ff]',mn)||$('[data-a=files]',mn);
if(anchor)anchor.insertAdjacentHTML('afterend',`<div class="ct" data-a="gd">\ud83c\udf93 Wi-Fi/BT qo'llanma</div>`);
mn&&mn.addEventListener('click',e=>{if(e.target.dataset.a==='gd'){mn.classList.remove('on');openGuide()}},true);
const ic=$('#kd-ic');
if(ic){const d=document.createElement('div');d.innerHTML=`<b>\ud83c\udf93</b>Qo'llanma`;let last=0;
 d.onclick=()=>{ic.querySelectorAll('.sel').forEach(x=>x.classList.remove('sel'));d.classList.add('sel');const now=Date.now();if(now-last<450){openGuide();d.classList.remove('sel')}last=now};
 ic.insertBefore(d,ic.firstChild);}

/* ---------- tepa chap 3 nuqta (\u22ee) menyusi: qo'llanma va bot namoyishiga tezkor kirish ---------- */
const pnEl=root.querySelector('.pn');
if(pnEl&&!pnEl.querySelector('.gd-kebab')){
 const kb=document.createElement('button');kb.className='gd-kebab';kb.textContent='\u22ee';kb.title="Wi-Fi/BT qo'llanma va bot namoyishi";
 const kmBtn=pnEl.querySelector('#kd-m');
 if(kmBtn)kmBtn.insertAdjacentElement('afterend',kb);else pnEl.insertBefore(kb,pnEl.firstChild);
 const dd=document.createElement('div');dd.className='gd-kdd';
 dd.innerHTML=`<div data-kd="guide">\ud83c\udf93 Wi-Fi/BT qo'llanma</div><div data-kd="botw">\ud83e\udd16 Bot: Wi-Fi namoyishi (to'liq)</div><div data-kd="botb">\ud83e\udd16 Bot: Bluetooth namoyishi (to'liq)</div><div data-kd="pdf">\ud83d\udce4 Oxirgi hisobotni yuborish (PDF)</div><div data-kd="reset">\ud83d\udd04 Simulyatsiyani tozalash</div>`;
 root.appendChild(dd);
 kb.onclick=e=>{e.stopPropagation();mn.classList.remove('on');const qsEl=root.querySelector('.qs');qsEl&&qsEl.classList.remove('on');
  if(!dd.classList.contains('on')){const r=kb.getBoundingClientRect(),rr=root.getBoundingClientRect();dd.style.left=(r.left-rr.left)+'px';dd.style.top=(r.bottom-rr.top+4)+'px'}
  dd.classList.toggle('on')};
 dd.addEventListener('click',e=>{const k=e.target.dataset.kd;if(!k)return;dd.classList.remove('on');
  if(k==='guide'){openGuide()}
  else if(k==='botw'){gdTab='w';openGuide();runBotChain('w')}
  else if(k==='botb'){gdTab='b';openGuide();runBotChain('b')}
  else if(k==='pdf'){sendReportPdf(lastReport)}
  else if(k==='reset'){resetSim()}});
 root.addEventListener('pointerdown',e=>{if(dd.classList.contains('on')&&!dd.contains(e.target)&&e.target!==kb)dd.classList.remove('on')});
}
})();
