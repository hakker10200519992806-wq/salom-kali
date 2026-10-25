/* Kali Maktab Desktop 8-bosqich: "📧 Pochta qutisi" — fishing (phishing) xabarlarini aniqlash simulyatori.
   Hujum emas, himoya ta'limi: soxta xatlar, shubhali belgilarni bosib ko'rish, va
   "agar aldansangiz nima bo'ladi" degan oqibat-ssenariysi — barchasi to'liq xayoliy,
   hech qanday tarmoqqa chiqmaydi va hech qanday haqiqiy login sahifasini nusxalamaydi. */
(()=>{
const T=window.kmsT,DK=window.kmsDK;if(!T||!DK||!DK.win)return;
const {win,E,tst,root}=DK,C=T.C,$=(s,r)=>(r||root).querySelector(s);
const LG=k=>{try{return localStorage.getItem(k)}catch(e){return null}},LS=(k,v)=>{try{localStorage.setItem(k,v);return true}catch(e){return false}};
const J=(k,d)=>{try{return JSON.parse(LG(k))||d}catch(e){return d}};
const delay=ms=>new Promise(r=>setTimeout(r,ms));

const CSS=`
#kdsk .mbx{display:flex;height:100%;font:13px/1.45 system-ui,sans-serif;color:#e8eef7;background:#161c2b}
#kdsk .mbx .mlist{width:240px;flex:none;overflow:auto;border-right:1px solid #2b3550;background:#131927}
#kdsk .mbx .mitem{padding:10px 12px;border-bottom:1px solid #222b42;cursor:pointer}
#kdsk .mbx .mitem:hover{background:#1d2740}
#kdsk .mbx .mitem.on{background:#243156}
#kdsk .mbx .mitem b{display:block;font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#kdsk .mbx .mitem span{display:block;color:#93a1c2;font-size:11.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#kdsk .mbx .mitem .tag{display:inline-block;margin-top:4px;font-size:10.5px;padding:1px 6px;border-radius:10px}
#kdsk .mbx .mitem .tag.ok{background:#1d4d33;color:#7fe0a7}
#kdsk .mbx .mitem .tag.bad{background:#5a1f24;color:#ff9aa2}
#kdsk .mbx .mread{flex:1;overflow:auto;padding:14px 16px}
#kdsk .mbx .mhd{border-bottom:1px solid #2b3550;padding-bottom:10px;margin-bottom:10px}
#kdsk .mbx .mhd h3{margin:0 0 6px;font-size:16px}
#kdsk .mbx .mhd .row{color:#9fb0d6;font-size:12.5px;margin:2px 0}
#kdsk .mbx .mbody p{margin:0 0 10px}
#kdsk .mbx .flag{cursor:pointer;border-bottom:2px dotted #ff9aa2;background:rgba(255,80,80,.14);border-radius:3px;padding:0 2px}
#kdsk .mbx .flag.seen{border-bottom-color:#7fe0a7;background:rgba(90,220,140,.14)}
#kdsk .mbx .found{margin-top:12px;padding:10px 12px;background:#131927;border:1px solid #2b3550;border-radius:8px}
#kdsk .mbx .found h4{margin:0 0 6px;font-size:12.5px;color:#9fb0d6;text-transform:uppercase;letter-spacing:.03em}
#kdsk .mbx .found li{margin:4px 0;font-size:12.5px;color:#d7e0f5}
#kdsk .mbx .qrow{display:flex;gap:8px;margin-top:14px;flex-wrap:wrap}
#kdsk .mbx .qrow button{border:0;border-radius:7px;padding:9px 14px;font:600 13px/1 system-ui,sans-serif;cursor:pointer}
#kdsk .mbx .qrow .ok{background:#1d4d33;color:#9ff0bf}
#kdsk .mbx .qrow .bad{background:#5a1f24;color:#ffb3b8}
#kdsk .mbx .verdict{margin-top:10px;padding:9px 12px;border-radius:8px;font-size:12.5px}
#kdsk .mbx .verdict.y{background:#1d4d33;color:#9ff0bf}
#kdsk .mbx .verdict.n{background:#5a1f24;color:#ffb3b8}
#kdsk .mbx .atkbtn{margin-top:14px;background:#7a2d2d;color:#ffd9d9;border:0;border-radius:7px;padding:9px 14px;font:600 13px/1 system-ui,sans-serif;cursor:pointer}
#kdsk .mbx .empty{padding:30px;text-align:center;color:#7f8bad}
#kdsk .story{padding:16px;max-width:560px;margin:0 auto}
#kdsk .story .warnbar{background:#5a1f24;color:#ffd9d9;border-radius:8px;padding:8px 12px;font:700 12.5px/1.4 system-ui,sans-serif;margin-bottom:14px;text-align:center}
#kdsk .story .shot{border:2px solid #3a4560;border-radius:10px;padding:14px;background:#0e1322;margin:12px 0}
#kdsk .story .shot .fakebar{background:#7a2d2d;color:#fff;font-size:11px;font-weight:700;padding:4px 8px;border-radius:5px;display:inline-block;margin-bottom:10px}
#kdsk .story .shot label{display:block;font-size:11.5px;color:#93a1c2;margin:8px 0 3px}
#kdsk .story .shot .fld{background:#1b2338;border:1px solid #333f5e;border-radius:6px;padding:8px 10px;color:#9fb0d6;font-family:monospace;font-size:12.5px}
#kdsk .story table{width:100%;border-collapse:collapse;margin:10px 0;font-size:12px}
#kdsk .story td,#kdsk .story th{border:1px solid #2b3550;padding:6px 8px;text-align:left}
#kdsk .story th{background:#1d2740;color:#9fb0d6}
#kdsk .story .steptxt{min-height:70px}
#kdsk .story .nav{display:flex;justify-content:space-between;margin-top:14px}
#kdsk .story .nav button{border:0;border-radius:7px;padding:9px 16px;background:#2c4f8f;color:#fff;font:600 13px/1 system-ui,sans-serif}
#kdsk .story .nav button:disabled{opacity:.3}
#kdsk .story ul{margin:6px 0 0;padding-left:18px}
#kdsk .story li{margin:4px 0}
`;
document.head.appendChild(Object.assign(document.createElement('style'),{textContent:CSS}));

/* ---------- yetishmayotgan buyruqlarni terminalga qo'shish (lessons3.js ufw/fail2ban misollari uchun ham kerak) ---------- */
if(!C.whois)C.whois=a=>{
 const d=(a.filter(x=>x[0]!=='-')[0]||'example.com').toLowerCase(),fake=/paypai|verify|secure-|-support|\.xyz$|\.support$/.test(d);
 return `Domain Name: ${d.toUpperCase()}\nRegistrar: (namuna) ${fake?"noma'lum / yashirilgan":'Ro\u2018yxatdan o\u2018tgan rasmiy registrator'}\nCreation Date: ${fake?'2 kun oldin \u2014 JUDA YANGI':'1999-07-15 \u2014 eski, barqaror'}\nRegistrant Organization: ${fake?"noma'lum (maxfiylashtirilgan)":'Rasmiy kompaniya nomi'}\n\n(Bu natija \u2014 o\u2018quv namunasi, haqiqiy WHOIS ma\u2018lumoti emas.)`;
};
if(!C.setoolkit)C.setoolkit=()=>`Social-Engineer Toolkit (SET) \u2014 FAQAT SIMULYATSIYA\n\n\u26a0\ufe0f Bu yerda haqiqiy dastur ishlamaydi, hech qanday fayl yoki veb-sahifa yaratilmaydi \u2014 faqat ta'lim maqsadida konsol ko'rinishi ko'rsatilmoqda.\n\nSelect from the menu:\n1) Social-Engineering Attacks\n2) Penetration Testing (Fast-Track)\n99) Exit\n\n[NAMUNA] Haqiqiy hayotda shu bosqichda haqiqiy saytga o'xshash soxta sahifa tayyorlanadi. Aynan shuning uchun havolani bosishdan oldin domenni har doim tekshirish kerak.`;
if(!C.ufw)C.ufw=a=>!a[0]?'ufw: status | enable | deny from <manzil>':a[0]==='status'?'Status: active\nTo                         Action      From\n22/tcp                     ALLOW       Anywhere\n80,443/tcp                 ALLOW       Anywhere':a[0]==='enable'?"Xavfsizlik devori yoqildi":a[0]==='deny'?`Qoida qo'shildi: ${a.slice(1).join(' ')||'(manzil kiritilmadi)'} \u2014 endi rad etiladi`:'ufw: status | enable | deny from <manzil>';
if(!C['fail2ban-client'])C['fail2ban-client']=a=>(a[0]==='status')?`Status for the jail: ${a[1]||'sshd'}\n|- Currently failed:\t2\n|- Total failed:\t14\n\`- Currently banned:\t1\n   \`- Banned IP list:\t203.0.113.9`:'fail2ban-client: status [jail]';
if(!C.iptables)C.iptables=a=>a.includes('-L')?'Chain INPUT (policy ACCEPT)\ntarget     prot opt source               destination\nDROP       all  --  203.0.113.9          anywhere':'iptables: -L kerak';

/* ---------- xatlar ma'lumoti ---------- */
const MAIL=[
{id:1,bad:true,from:'PayPal xizmati',email:'support@paypaI.com',subj:'⚠️ Hisobingiz BLOKLANADI — 24 soat ichida tasdiqlang!',date:'Bugun, 02:13',prev:'Hisobingizda g\u2018ayrioddiy faollik aniqlandi. Zudlik bilan tasdiqlang...',
 body:`<p>Hurmatli <span class="flag" data-r="Haqiqiy xizmatlar odatda ismingizni biladi va shaxsiylashtirilgan murojaat qiladi. \u201cHurmatli mijoz\u201d kabi umumiy murojaat \u2014 fishingning klassik belgisi.">mijoz</span>,</p>
 <p>Hisobingizda g\u2018ayrioddiy faollik aniqlandi. <span class="flag" data-r="Shoshiltirish taktikasi: vaqt bosimi ostida odam o\u2018ylamasdan bosadi. Haqiqiy kompaniyalar bunday \u201ctezroq, aks holda...\u201d uslubida yozmaydi.">24 soat ichida tasdiqlamasangiz, hisobingiz butunlay bloklanadi</span> va mablag\u2018laringizga kirish imkoni yo\u2018qoladi.</p>
 <p>Tasdiqlash uchun: <span class="flag" data-r="Domenga diqqat: paypaI.com \u2014 bu \u201cpaypal\u201d emas! Kichik \u201cl\u201d o\u2018rniga katta \u201cI\u201d (paypaI) qo\u2018yilgan \u2014 ko\u2018zga deyarli bir xil ko\u2018rinadi. Bu \u201ctipsquatting\u201d deb ataladi. Havolaning haqiqiy manzilini har doim diqqat bilan o\u2018qing.">http://paypaI-secure-verify.ru/login</span></p>
 <p>Hurmat bilan,<br>PayPal Xavfsizlik bo\u2018limi<br><span class="flag" data-r="Yuboruvchi manzili: support@paypaI.com \u2014 domen nomi rasmiy paypal.com bilan bir xil emas. Email dasturida ko\u2018rsatilgan ism (\u201cPayPal xizmati\u201d) emas, balki @ dan keyingi domenni tekshiring.">support@paypaI.com</span></p>
 <p><span class="flag" data-r="Kutilmagan .exe/.scr kengaytmali ilova \u2014 zararli dastur bo\u2018lishi mumkin. Hech qachon notanish yuboruvchidan kelgan bajariluvchi faylni ochmang.">📎 hisob_tafsilot.exe</span></p>`,
 flagsTotal:5,isBad:true},
{id:2,bad:false,from:'Kali Maktab',email:'admin@kalimaktab.uz',subj:'Yangi dars qo\u2018shildi: Tarmoq asoslari',date:'Kecha, 18:40',prev:'Salom! Kurs dasturiga yangi bo\u2018lim qo\u2018shdik...',
 body:`<p>Salom, Sardor!</p>
 <p>Kurs dasturiga \u201cTarmoq asoslari\u201d bo\u2018limi qo\u2018shildi. Ilovani oching va \u2699 Sozlamalar orqali yangilanishni ko\u2018rishingiz mumkin.</p>
 <p>Savollaringiz bo\u2018lsa, ilova ichidagi \u201cBog\u2018lanish\u201d bo\u2018limidan yozing.</p>
 <p>Omad,<br>Kali Maktab jamoasi<br>admin@kalimaktab.uz</p>`,
 flagsTotal:0,isBad:false},
{id:3,bad:true,from:'XalqBank',email:'noreply@xalq-bank.support',subj:'Kartangiz band qilindi \u2014 SMS kodni tasdiqlang',date:'Bugun, 09:02',prev:'Kartangiz vaqtincha bloklandi. Tasdiqlash kodini yuboring...',
 body:`<p>Xurmatli mijoz. <span class="flag" data-r="Imlo xatolari (\u201cXurmatli\u201d, grammatik noto\u2018g\u2018riliklar) \u2014 rasmiy bank xabarlarida kamdan-kam uchraydi, odatda professional tahrirlangan bo\u2018ladi.">Kartangiz shubhali operatsiya sababli band qilindi.</span></p>
 <p>Blokdan chiqarish uchun telefoningizga kelgan <span class="flag" data-r="BU ENG XAVFLI BELGI: hech qanday bank yoki xizmat sizdan SMS tasdiqlash kodini (OTP) so\u2018z orqali, email orqali yoki qo\u2018ng\u2018iroqda so\u2018ramaydi. Bu kod faqat SIZ kiritadigan joy uchun, boshqa hech kimga aytilmaydi.">6 xonali SMS kodni shu xatga javob tariqasida yuboring</span>.</p>
 <p>Bo\u2018lim: <span class="flag" data-r="Domen xalq-bank.support \u2014 rasmiy bank domeni (masalan xalqbank.uz) bilan bir xil emas. \u201c.support\u201d kabi kam uchraydigan domen kengaytmalariga ehtiyot bo\u2018ling.">xalq-bank.support</span></p>`,
 flagsTotal:3,isBad:true},
{id:4,bad:false,from:'Google',email:'no-reply@accounts.google.com',subj:'Yangi qurilmadan kirish qayd etildi',date:'3 kun oldin',prev:'Hisobingizga Android qurilmasidan kirildi...',
 body:`<p>Salom,</p>
 <p>Hisobingizga yangi Android qurilmasidan kirish amalga oshirildi (Toshkent, O\u2018zbekiston). Agar bu siz bo\u2018lsangiz, hech narsa qilish shart emas.</p>
 <p>Agar bu siz bo\u2018lmasangiz, parolingizni darhol rasmiy sayt orqali o\u2018zgartiring: myaccount.google.com</p>
 <p>Google jamoasi</p>`,
 flagsTotal:0,isBad:false},
{id:5,bad:true,from:'Instagram Sovg\u2018alar',email:'promo@instagram-sovgalar-rasmiy.xyz',subj:'🎉 Siz iPhone 15 Pro yutdingiz!',date:'Bugun, 11:47',prev:'Tabriklaymiz! Siz tasodifiy tanlov g\u2018olibi bo\u2018ldingiz...',
 body:`<p>Tabriklaymiz! 🎉 <span class="flag" data-r="\u201cBepul sovg\u2018a/yutuq\u201d va favqulodda yaxshi xabar \u2014 agar juda yaxshi tuyulsa, odatda haqiqat emas. Siz ishtirok etmagan tanlovda g\u2018olib bo\u2018lish mumkin emas.">Siz bizning tasodifiy tanlovimizda iPhone 15 Pro yutdingiz!</span></p>
 <p>Mukofotni olish uchun quyidagi havola orqali <span class="flag" data-r="\u201cYetkazib berish puli\u201d so\u2018rash klassik avans-to\u2018lov firibgarligi: siz pul yuborasiz, sovg\u2018a hech qachon kelmaydi.">50 000 so\u2018m yetkazib berish to\u2018lovini</span> amalga oshiring: <span class="flag" data-r="Nostandart domen kengaytmasi (.xyz) va brendga o\u2018xshash, lekin rasmiy bo\u2018lmagan nom \u2014 Instagram'ning rasmiy domeni instagram.com, boshqasi emas.">instagram-sovgalar-rasmiy.xyz</span></p>`,
 flagsTotal:3,isBad:true},
{id:6,bad:false,from:'Jamshid (hamkasb)',email:'jamshid@kalimaktab.uz',subj:'Ertangi uchrashuv vaqti',date:'2 kun oldin',prev:'Salom, ertangi uchrashuvni soat 15:00 ga ko\u2018chirsak bo\u2018ladimi?',
 body:`<p>Salom!</p>
 <p>Ertangi uchrashuvni soat 15:00 ga ko\u2018chirsak bo\u2018ladimi? Menda ertalab boshqa band bor.</p>
 <p>Rahmat,<br>Jamshid</p>`,
 flagsTotal:0,isBad:false}
];

/* ---------- oyna ---------- */
let bw=null,cur=null,seen={},score=J('kms_phish_score',{right:0,total:0});

function listHtml(){
 return MAIL.map(m=>`<div class="mitem${cur&&cur.id===m.id?' on':''}" data-id="${m.id}">
   <b>${E(m.from)}</b><span>${E(m.subj)}</span>
   <span class="tag ${answered(m.id)?(answered(m.id)==='ok'?'ok':'bad'):''}" style="${answered(m.id)?'':'display:none'}">${answered(m.id)==='ok'?'✓ to\u2018g\u2018ri topdingiz':'✗ xato baholadingiz'}</span>
 </div>`).join('');
}
function answered(id){return LG('kms_phish_a_'+id)}

function readHtml(m){
 const found=Object.keys(seen).filter(k=>k.startsWith(m.id+'_')).length;
 const already=answered(m.id);
 return `<div class="mhd"><h3>${E(m.subj)}</h3>
  <div class="row"><b>${E(m.from)}</b> &lt;${E(m.email)}&gt;</div>
  <div class="row">${E(m.date)}</div></div>
  <div class="mbody" id="mbd-${m.id}">${m.body}</div>
  ${m.flagsTotal?`<div class="found"><h4>Topilgan shubhali belgilar (${found}/${m.flagsTotal})</h4><ul id="fl-${m.id}">${renderFoundList(m)}</ul></div>`:''}
  ${already?`<div class="verdict ${already==='ok'?'y':'n'}">${already==='ok'?'✅ To\u2018g\u2018ri! Siz bu xatni dуris baholadingiz.':'❌ Noto\u2018g\u2018ri baho berdingiz. Qizil belgilarni qayta ko\u2018rib chiqing.'}</div>`
   :`<div class="qrow"><button class="ok" data-v="ok">✅ Ishonchli xat</button><button class="bad" data-v="bad">🚩 Bu fishing!</button></div>`}
  ${m.bad?`<button class="atkbtn" id="atkbtn">😱 Agar havolani bosib, ma\u2018lumot kiritsam nima bo\u2018ladi?</button>`:''}`;
}
function renderFoundList(m){
 const items=[];for(const k in seen){if(k.startsWith(m.id+'_'))items.push(seen[k])}
 return items.length?items.map(t=>`<li>${E(t)}</li>`).join(''):'<li style="color:#5f6c90">Shubhali joylarni (qizil belgilangan matn) bosib ko\u2018ring \u2014 sabab shu yerda chiqadi</li>';
}

function openMail(id){
 cur=MAIL.find(x=>x.id===id);if(!cur)return;
 $('.mlist',bw.body).querySelectorAll('.mitem').forEach(x=>x.classList.toggle('on',+x.dataset.id===id));
 $('.mread',bw.body).innerHTML=readHtml(cur);
 bindRead();
}
function bindRead(){
 const rd=$('.mread',bw.body);if(!rd)return;
 rd.querySelectorAll('.flag').forEach(sp=>{
  sp.onclick=()=>{
   const r=sp.dataset.r,key=cur.id+'_'+r.slice(0,24);
   if(!seen[key]){seen[key]=r;sp.classList.add('seen');tst('🔎 '+r);
    const fl=$('#fl-'+cur.id,rd);if(fl)fl.innerHTML=renderFoundList(cur)}
   else{tst('🔎 '+r)}
  };
 });
 const qr=rd.querySelector('.qrow');
 if(qr)qr.onclick=e=>{
  const b=e.target.closest('button[data-v]');if(!b)return;
  const v=b.dataset.v,right=(v==='bad')===cur.isBad;
  LS('kms_phish_a_'+cur.id,right?'ok':'bad');
  score.total++;if(right)score.right++;LS('kms_phish_score',JSON.stringify(score));
  tst(right?'✅ To\u2018g\u2018ri!':'❌ Noto\u2018g\u2018ri \u2014 qizil belgilangan joylarni ko\u2018ring');
  $('.mlist',bw.body).innerHTML=listHtml();bindList();
  rd.innerHTML=readHtml(cur);bindRead();
 };
 const ab=rd.querySelector('#atkbtn');
 if(ab)ab.onclick=()=>openStory(cur);
}
function bindList(){
 $('.mlist',bw.body).onclick=e=>{const it=e.target.closest('.mitem');if(it)openMail(+it.dataset.id)};
}

/* ---------- "haqiqiy hujum" oqibat ssenariysi (to'liq xayoliy, hech narsa yubormaydi) ---------- */
const STEPS=[
 {t:'1\u20442 \u2014 Havola bosildi',h:()=>`<p class="steptxt">Siz xatdagi <b>\u201cHisobni tasdiqlash\u201d</b> havolasini bosdingiz. Brauzer PayPal'ga juda o\u2018xshash sahifa ochadi \u2014 lekin bu klonlangan (soxta) sahifa, haqiqiy PayPal emas:</p>
  <div class="shot"><span class="fakebar">⚠️ SOXTA SAHIFA \u2014 BU HAQIQIY PAYPAL EMAS (faqat namuna)</span>
   <label>Login / Email</label><div class="fld">sardor_2001@gmail.com</div>
   <label>Parol</label><div class="fld">••••••••</div></div>`},
 {t:'2\u20442 \u2014 Ma\u2019lumot yuboriladi',h:()=>`<p class="steptxt">Siz login va parolni kiritib, <b>\u201cKirish\u201d</b> tugmasini bosdingiz. Bu ma\u2018lumotlar PayPal serveriga emas \u2014 to\u2018g\u2018ridan-to\u2018g\u2018ri jinoyatchining serveriga jo\u2018naydi. Ko\u2018p hollarda u yana haqiqiy PayPal'ga qayta yo\u2018naltiradi, shuning uchun siz hech narsa sezmaysiz.</p>
  <div class="shot"><span class="fakebar">📡 YUBORILGAN MA\u2019LUMOT (namuna)</span>
  <label>Yuborildi</label><div class="fld">login=sardor_2001@gmail.com&pass=********</div>
  <label>Qabul qiluvchi</label><div class="fld">paypaI-secure-verify.ru/collect.php</div></div>`},
 {t:'3\u20442 \u2014 Fojia: hisobga kirish',h:()=>`<p class="steptxt">Jinoyatchi bir necha daqiqa ichida haqiqiy PayPal'ga sizning login/parolingiz bilan kiradi. Quyidagi jadval \u2014 <b>to\u2018liq o\u2018ylab topilgan namuna</b>, hech kimning haqiqiy ma\u2018lumoti emas:</p>
  <table><tr><th>Vaqt</th><th>Amal</th><th>Natija</th></tr>
  <tr><td>02:14</td><td>Tizimga kirish</td><td>Muvaffaqiyatli (jinoyatchi tomonidan)</td></tr>
  <tr><td>02:15</td><td>Qayta tiklash emaili o\u2018zgartirildi</td><td>Qurbon ogohlantirishni ko\u2018rmaydi</td></tr>
  <tr><td>02:17</td><td>Pul o\u2018tkazish</td><td>$1,240 noma\u2018lum hisobga (NAMUNA)</td></tr>
  <tr><td>02:18</td><td>2FA o\u2018chirildi</td><td>Keyingi kirishlar ham ochiq</td></tr></table>`},
 {t:'4\u20444 \u2014 Oldini olish mumkin edi',h:()=>`<p class="steptxt">Bu fojiani quyidagilar oldini olardi:</p>
  <ul>
   <li>Havolani bosishdan oldin domenni diqqat bilan o\u2018qish (<b>paypaI.com</b> \u2260 <b>paypal.com</b>)</li>
   <li>Parol yoki SMS/OTP kodni hech qachon email/xabar orqali yubormaslik</li>
   <li>Shubhali bo\u2018lsa havola orqali emas, sayt manzilini qo\u2018lda yozib yoki rasmiy ilova orqali kirish</li>
   <li>SMS o\u2018rniga autentifikator ilova (2FA) ishlatish \u2014 u fishing orqali o\u2018g\u2018irlanmaydi</li>
   <li>Shoshiltiruvchi, qo\u2018rqituvchi xabarlarga ishonmaslik \u2014 rasmiy qo\u2018llab-quvvatlashga to\u2018g\u2018ridan-to\u2018g\u2018ri murojaat qilish</li>
  </ul>`}
];
function openStory(m){
 let i=0;
 const b=document.createElement('div');b.className='story';
 const draw=()=>{
  b.innerHTML=`<div class="warnbar">BU TO\u2018LIQ XAYOLIY SSENARIY \u2014 HECH QANDAY HAQIQIY SAYT, SERVER YOKI ODAM ISHTIROK ETMAYDI</div>
   <h3 style="margin:0 0 8px">${STEPS[i].t}</h3>${STEPS[i].h()}
   <div class="nav"><button id="st-prev" ${i===0?'disabled':''}>← Orqaga</button>
   <span style="align-self:center;color:#7f8bad;font-size:12px">${i+1} / ${STEPS.length}</span>
   <button id="st-next">${i===STEPS.length-1?'Yopish ✓':'Keyingisi →'}</button></div>`;
  $('#st-prev',b).onclick=()=>{i--;draw()};
  $('#st-next',b).onclick=()=>{if(i===STEPS.length-1){$('.mread',bw.body).innerHTML=readHtml(cur);bindRead()}else{i++;draw()}};
 };
 draw();
 $('.mread',bw.body).innerHTML='';$('.mread',bw.body).appendChild(b);
}

function openMailbox(){
 if(bw&&bw.el&&bw.el.isConnected){bw.min=false;bw.el.style.display='flex';return}
 const b=document.createElement('div');b.className='mbx';
 b.innerHTML=`<div class="mlist">${listHtml()}</div><div class="mread"><div class="empty">👈 O\u2018qish uchun xatni tanlang</div></div>`;
 bw=win('📧 Pochta qutisi',b,{w:680,h:460});
 bindList();
 cur=null;
}

/* ========== 🎣 Hujum va 🛡 Himoya qo'llanmasi: har qadamda avval TUSHUNTIRISH, keyin kod
   (nusxalash + terminalda ochish + bot namoyishi tugmalari bilan) — WiFi/BT va Tarmoq/Veb/Parol
   qo'llanmalari (desktop6.js/desktop7.js) bilan bir xil uslub. Hamma buyruq to'liq xayoliy terminalda
   ishlaydi, hech qanday haqiqiy sayt/odam/hisobga ta'sir qilmaydi. ========== */
const PH_STEPS={
 a:[ /* hujumchi nuqtai nazaridan — faqat tushunish/tanish uchun, barcha natijalar o'ylab topilgan */
  {t:"1) Nishon xizmatni tanlash",d:"Hujumchi ko'p odam ishlatadigan xizmatni (bank, pochta, to'lov tizimi) tanlaydi va uning rasmiy domenini o'rganadi.",why:"whois domen qachon ro'yxatdan o'tgani va egasi haqida ma'lumot beradi.",c:"whois paypal.com"},
  {t:"2) Soxta (typosquat) domen tayyorlash",d:"Asl domenga juda o'xshash, lekin bitta belgisi almashtirilgan (kichik l → katta I) yangi domen ro'yxatdan o'tkaziladi.",why:"Yangi va egasi yashiringan domen — shubha belgisi.",c:"whois paypaI.com"},
  {t:"3) Soxta login sahifa (simulyatsiya)",d:"Haqiqiy saytga o'xshash sahifa tayyorlanadi; unga kiritilgan login/parol jinoyatchi serveriga yuboriladigan qilib sozlanadi.",why:"Bu yerda vosita nomi va konsol ko'rinishi namuna sifatida ko'rsatiladi — haqiqiy sahifa yaratilmaydi.",c:"setoolkit"},
  {t:"4) Ommaviy xat yuborish",d:"Soxta sahifaga havola qo'shilgan xat minglab manzilga, ko'pincha shoshiltiruvchi sarlavha bilan yuboriladi.",why:"",c:'echo "Yuborildi: support@paypaI.com -> 500ta manzilga (NAMUNA)"'},
  {t:"5) \"Yig'ilgan\" ma'lumot",d:"Agar qurbon ma'lumot kiritsa, u jinoyatchi tomonga to'planadi. Quyidagi qiymat to'liq o'ylab topilgan namuna, hech kimning haqiqiy ma'lumoti emas.",why:"",c:'echo "NAMUNA: login=demo_user parol=****** (haqiqiy emas)"'}
 ],
 d:[ /* himoya (blue team) — aniqlash va bloklash */
  {t:"1) Yuboruvchi manzilini tekshirish",d:"Ko'rsatilgan ism (masalan \"PayPal xizmati\") emas, @ belgisidan keyingi haqiqiy domenni diqqat bilan o'qing.",why:"",c:'echo "support@paypaI.com" | grep -i "paypai"'},
  {t:"2) Domenni whois orqali tekshirish",d:"Juda yangi ro'yxatdan o'tgan yoki egasi yashiringan domen — jiddiy shubha belgisi.",why:"",c:"whois paypaI.com"},
  {t:"3) Shubhali domenni xavfsizlik devorida bloklash",d:"Fishing domeni aniqlansa, unga ulanishni tarmoq darajasida man etish mumkin.",why:"",c:"ufw deny from paypaI.com"},
  {t:"4) Firewall holatini tekshirish",d:"Qo'shilgan qoida kuchda ekanini tekshirish.",why:"",c:"ufw status"},
  {t:"5) fail2ban bilan shubhali urinishlarni kuzatish",d:"Fishingdan keyin parolni qo'lda sinab ko'rishga urinishlar — ko'p marta xato login — avtomatik aniqlanadi va bloklanadi.",why:"",c:"fail2ban-client status sshd"},
  {t:"6) 2FA va parol menejeri",d:"Parol o'g'irlansa ham, 2FA (autentifikator ilova) hisobni himoya qiladi. SMS/OTP kodni hech kimga bermang.",why:"",c:'echo "2FA holati: FAOL"'}
 ]
};
let gdW=null,gdTab='a';
function openGuide(){
 if(gdW&&gdW.el&&gdW.el.isConnected){gdW.el.style.display='flex';return}
 const b=document.createElement('div');b.className='gd';
 function render(){
  const steps=PH_STEPS[gdTab];
  b.innerHTML=`<div class="tabs2"><button data-tb="a" class="${gdTab==='a'?'on':''}">\ud83c\udfa3 Hujum qanday ishlaydi</button><button data-tb="d" class="${gdTab==='d'?'on':''}">\ud83d\udee1 Himoya (blue team)</button></div>
  <div class="note">\u26a0\ufe0f To'liq simulyatsiya: domen, xat va "yig'ilgan ma'lumot" — barchasi xayoliy namuna. Hech qanday haqiqiy sayt yoki serverga ulanilmaydi, hech kimning haqiqiy ma'lumoti ishlatilmaydi.</div>
  ${steps.map((s,i)=>`<div class="st"><b>${E(s.t)}</b><p>${E(s.d)}</p>${s.why?`<p class="why">\ud83d\udca1 ${E(s.why)}</p>`:''}<code>${E(s.c)}</code><div class="bb"><button data-cp="${E(s.c)}">\ud83d\udccb Nusxalash</button><button data-term="${i}">\ud83d\udda5 Terminalni ochish</button><button data-bot="${i}">\ud83e\udd16 Bot: ko'rsatib ber</button></div></div>`).join('')}
  <button class="atkbtn" id="ph-mbx">\ud83d\udce7 Amaliy mashq: Pochta qutisida sinab ko'ring</button>`;
 }
 b.addEventListener('click',e=>{
  const d=e.target.dataset;
  if(e.target.id==='ph-mbx'){gdW.el.style.display='none';openMailbox();return}
  if(d.tb){gdTab=d.tb;render()}
  else if(d.cp!==undefined){try{navigator.clipboard.writeText(d.cp).catch(()=>{})}catch(err){}tst('\ud83d\udccb Nusxalandi')}
  else if(d.term!==undefined){const i=+d.term,st=PH_STEPS[gdTab][i];DK.term(st.c)}
  else if(d.bot!==undefined){runBotChain(gdTab,+d.bot)}
 });
 gdW=win("\ud83c\udfa3 Fishing: hujum va himoya qo'llanmasi",b,{w:420,h:480});gdW.render=render;render();
}
DK.guidePhish=openGuide;

/* ---------- ish terminali: bot o'zi yozadi va Enter bosadi (desktop6/desktop7 bilan bir xil uslub) ---------- */
let termBotWin=null;
function openWorkTerminal(){
 if(termBotWin&&termBotWin.el&&termBotWin.el.isConnected){termBotWin.el.style.display='flex';return termBotWin}
 const t=document.createElement('div');t.className='tm';
 const out=document.createElement('div'),row=document.createElement('div');
 row.innerHTML='<div class="pl"></div><span>\u2514\u2500$ </span><input autocapitalize="off" autocomplete="off" spellcheck="false">';
 t.append(out,row);
 const inp=row.querySelector('input'),pl=row.querySelector('.pl');
 const put=s=>{const dv=document.createElement('div');dv.textContent=s;out.appendChild(dv);t.scrollTop=t.scrollHeight};
 pl.textContent='\u250c\u2500\u2500(kali\u3392kali)-[~]';
 function runLocal(c){
  put(`\u250c\u2500\u2500(kali\u3392kali)-[~]\n\u2514\u2500$ ${c}`);
  c=(c||'').trim();termBotWin.lastOutput='';if(!c)return;
  let o='';try{o=T.run(c)}catch(e){o=String(e&&e.message||e)}
  if(o)put(o);termBotWin.lastOutput=o||'';
 }
 inp.addEventListener('keydown',e=>{if(e.key==='Enter'){const v=inp.value;inp.value='';runLocal(v)}});
 termBotWin=win("\ud83d\udda5 Ish terminali",t,{w:560,h:380});
 termBotWin.input=inp;termBotWin.put=put;termBotWin.out=out;termBotWin.lastOutput='';termBotWin.scrollEl=t;
 put("Kali Maktab — ish terminali. Bot o'zi yozadi va Enter bosadi (hammasi simulyatsiya).");
 setTimeout(()=>inp.focus(),50);
 return termBotWin;
}
async function typeCommand(inp,c){let i=0;while(i<c.length){inp.value+=c[i];i++;await delay(16)}}
function focusWinIfPossible(w){try{w&&w.el&&w.el.dispatchEvent(new Event('pointerdown',{bubbles:true}))}catch(e){}}

let botBusy=false,lastReport=null;
async function runBotChain(tab,uptoIdx){
 if(botBusy){tst("\ud83e\udd16 Bot allaqachon ishlamoqda...");return}
 botBusy=true;
 const log=[],now=()=>new Date();
 try{
  const steps=PH_STEPS[tab],list=uptoIdx==null?steps:steps.slice(0,uptoIdx+1);
  const tw=openWorkTerminal();
  log.push({ts:now(),type:'win',title:"\ud83d\udda5 Ish terminali",note:"buyruqlar shu yerda yozilib, Enter bosiladi"});
  tw.put(tab==='a'?"\ud83e\udd16 Bot: hujum bosqichlarini (to'liq simulyatsiya) ko'rsataman.":"\ud83e\udd16 Bot: himoya (blue team) bosqichlarini ko'rsataman.");
  for(const st of list){
   if(tw.el&&tw.el.isConnected)focusWinIfPossible(tw);
   tw.input.focus();
   await typeCommand(tw.input,st.c);
   await delay(200);
   tw.input.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}));
   await delay(500);
   log.push({ts:now(),type:'cmd',title:st.t,why:st.why||st.d,cmd:st.c,win:"Ish terminali",output:tw.lastOutput||''});
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

/* ========== Hisobot: nima/nega/qachon + PDF (tashqi kutubxonasiz, offline) + Telegram/ulashish ========== */
const hhmmss=d=>d.toTimeString().slice(0,8);
const PH_TAB_NAME={a:"Fishing: hujum qanday ishlaydi",d:"Fishingdan himoyalanish (blue team)"};
function reportLines(rep){
 const L=[`KALI MAKTAB \u2014 BOT HISOBOTI`,`Bo'lim: ${PH_TAB_NAME[rep.tab]}`,`Sana: ${rep.log[0]?rep.log[0].ts.toLocaleString():''}`,
  `ESLATMA: to'liq simulyatsiya. Hech qanday haqiqiy odam, sayt yoki hisobga ta'sir qilinmadi.`,''];
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
 const nom=`KaliMaktab_fishing_hisobot_${rep.tab}_${Date.now()}.pdf`;
 let fayl=null;try{fayl=new File([blob],nom,{type:'application/pdf'})}catch(e){}
 if(fayl&&navigator.canShare&&navigator.canShare({files:[fayl]})){
  try{await navigator.share({files:[fayl],title:nom,text:"Kali Maktab \u2014 fishing bot hisoboti (PDF)"});return}catch(e){}
 }
 const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=nom;a.click();
 setTimeout(()=>URL.revokeObjectURL(a.href),1500);
 tst(nom+" yuklab olindi \u2014 Telegramda fayl sifatida biriktiring");
}

/* ---------- menyu va ish stoli ikonkasi ---------- */
const mn=$('#kd-mn');
if(mn){
 const anchor=mn.querySelector('[data-a="files"]')||mn.querySelector('[data-a="ff"]');
 if(anchor)anchor.insertAdjacentHTML('afterend','<div class="ct" data-a="mbx">\ud83d\udce7 Pochta qutisi</div><div class="ct" data-a="phg">\ud83c\udfa3 Fishing: hujum/himoya</div>');
 mn.addEventListener('click',e=>{
  if(e.target.dataset.a==='mbx'){mn.classList.remove('on');openMailbox()}
  else if(e.target.dataset.a==='phg'){mn.classList.remove('on');openGuide()}
 },true);
}
const ic=$('#kd-ic');
if(ic){
 const d=document.createElement('div');d.innerHTML='<b>\ud83d\udce7</b>Pochta';let last=0;
 d.onclick=()=>{ic.querySelectorAll('.sel').forEach(x=>x.classList.remove('sel'));d.classList.add('sel');
  const now=Date.now();if(now-last<450){openMailbox();d.classList.remove('sel')}last=now};
 ic.appendChild(d);
}
DK.mailbox=openMailbox;

/* ---------- tepa chap ⋮ (kebab) tezkor menyusiga qo'shamiz: yuqori chap tomondagi 3 nuqta ichida ko'rinishi uchun.
   Agar desktop6.js/desktop7.js ochgan .gd-kdd mavjud bo'lsa, o'sha menyuga qo'shiladi (ularning uslubi bilan bir xil). ---------- */
const dd=root.querySelector('.gd-kdd');
if(dd&&!dd.querySelector('[data-kd8]')){
 const resetEl=dd.querySelector('[data-kd7="reset"]')||dd.querySelector('[data-kd="reset"]');
 const html=`<hr><div data-kd8="guide">\ud83c\udfa3 Fishing: hujum/himoya qo'llanmasi</div><div data-kd8="mbx">\ud83d\udce7 Pochta qutisi (aniqlash mashqi)</div><div data-kd8="bota">\ud83e\udd16 Bot: Fishing hujumi namoyishi</div><div data-kd8="botd">\ud83e\udd16 Bot: Himoya (blue team) namoyishi</div><div data-kd8="pdf">\ud83d\udce4 Oxirgi hisobotni yuborish (PDF)</div>`;
 if(resetEl)resetEl.insertAdjacentHTML('beforebegin',html);else dd.insertAdjacentHTML('beforeend',html);
 dd.addEventListener('click',e=>{const k=e.target.dataset.kd8;if(!k)return;dd.classList.remove('on');
  if(k==='guide'){openGuide()}
  else if(k==='mbx'){openMailbox()}
  else if(k==='bota'){gdTab='a';openGuide();runBotChain('a')}
  else if(k==='botd'){gdTab='d';openGuide();runBotChain('d')}
  else if(k==='pdf'){sendReportPdf(lastReport)}
 });
}
})();
