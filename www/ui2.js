/* ui2.js — 3 nuqtali menyu, pastki panelda Profil/Sozlamalar, PIN qulf.
   Menyuga tabs ham ko'chiriladi. Qaytarish uchun: MENU_TABS = false. */
(()=>{
const MENU_TABS=true;
const $=s=>document.querySelector(s),html=document.documentElement;
const css=document.createElement('style');
css.textContent=`
#kmm-btn{flex:none;width:40px;height:40px;border:0;background:transparent;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;padding:0;cursor:pointer}
#kmm-btn i{width:4px;height:4px;border-radius:50%;background:var(--tx)}
#kmm-btn:active{background:var(--cd)}
#kmm-bd{position:fixed;inset:0;z-index:8999;display:none;background:rgba(0,0,0,.25)}
#kmm-p{position:fixed;left:8px;z-index:9000;width:min(92vw,340px);overflow:auto;display:none;background:var(--pn);color:var(--tx);border:1px solid var(--ln);border-radius:14px;box-shadow:0 10px 30px rgba(0,0,0,.45);padding:10px;flex-direction:column;gap:8px}
#kmm-p.on,#kmm-bd.on{display:flex}
#kmm-p h4{margin:4px 2px 0;font:700 12px system-ui;color:var(--mu);text-transform:uppercase;letter-spacing:.05em}
#kmm-p .b{display:block;width:100%;text-align:left;min-height:42px;font-size:14px;margin:0}
#kmm-p .bar{display:block;width:100%;max-width:none}
#kmm-p .tabs{display:flex;flex-wrap:wrap;gap:6px;overflow:visible;border:0;padding:0;margin:0;background:none}
#kmm-p .tabs button{flex:1 1 calc(50% - 6px);min-height:40px;padding:6px 8px;border:1px solid var(--ln);border-radius:8px;background:var(--cd);color:var(--tx);font-size:14px}
#kmm-p .tabs button.on{border-color:var(--ac);color:var(--ac)}
html.km-bn #profileBtn,html.km-bn .km-set{display:none!important}
@media(max-width:860px){
#mnav{position:relative;z-index:100000}
#mnav button{height:56px;min-height:56px;padding:0;justify-content:center;gap:2px;color:var(--mu)}
#mnav button svg{width:25px;height:25px;stroke:currentColor;fill:none;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
#mnav button b{display:none;font:600 10.5px/1 system-ui,sans-serif}
#mnav button.on:not(.act){color:var(--mu)}
#mnav button.act{color:var(--ac)}
#mnav button.act b{display:block}
#kmx-overlay,#kst,#ked,#kdsk{bottom:var(--kmnav,0px)!important}
}
@media(max-width:860px) and (max-height:480px){#mnav button{height:42px;min-height:42px;flex-direction:row;gap:6px}}
#kmlock{position:fixed;inset:0;z-index:2147483000;background:#0a1020;color:#e8f0ff;display:none;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:20px;font-family:system-ui,sans-serif}
#kmlock.on{display:flex}
#kmlock .ic{font-size:34px}
#kmlock h2{margin:0;font-size:20px}
#kmlock .s{min-height:20px;color:#8fa3c7;font-size:14px;text-align:center}
.kml-dots{display:flex;gap:14px;height:18px}
.kml-dots i{width:14px;height:14px;border-radius:50%;border:2px solid #5b9bff;box-sizing:border-box}
.kml-dots i.f{background:#5b9bff}
.kml-pad{display:grid;grid-template-columns:repeat(3,76px);gap:14px;margin-top:6px}
.kml-pad button{height:76px;border-radius:50%;border:1px solid #26324b;background:#121b2e;color:#e8f0ff;font:600 26px system-ui,sans-serif;padding:0}
.kml-pad button:active{background:#1d5bcf}
.kml-pad button:disabled{opacity:.35}
.kml-ok{margin-top:4px;padding:10px 26px;border-radius:22px;border:0;background:#1d5bcf;color:#fff;font:600 15px system-ui,sans-serif}
#kmlock.shake .kml-dots{animation:kmsh .35s}
@keyframes kmsh{20%,60%{transform:translateX(-10px)}40%,80%{transform:translateX(10px)}}
@media(max-height:640px){.kml-pad{grid-template-columns:repeat(3,58px);gap:8px}.kml-pad button{height:58px;font-size:22px}}
#kmldlg{position:fixed;inset:0;z-index:9500;background:rgba(0,0,0,.55);display:none;align-items:center;justify-content:center;padding:14px}
#kmldlg.on{display:flex}
#kmldlg .c{width:min(100%,380px);background:var(--pn);color:var(--tx);border:1px solid var(--ln);border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:10px}
#kmldlg .h{display:flex;justify-content:space-between;align-items:center}
#kmldlg p{margin:0;font-size:13.5px}
#kmldlg label{display:flex;justify-content:space-between;align-items:center;gap:8px;font-size:14px}
#kmldlg select{font:inherit;padding:6px;border-radius:8px;border:1px solid var(--ln);background:var(--cd);color:var(--tx)}
#kmldlg .b{min-height:42px;font-size:14px}
html.kml body>*:not(#kmlock){visibility:hidden!important}
`;
document.head.appendChild(css);

/* ================= 3 nuqtali menyu ================= */
let closeMenu=()=>{};
const hd=$('.hd');
if(hd){
  const kb=document.createElement('button');
  kb.id='kmm-btn';kb.type='button';kb.setAttribute('aria-label','Menyu');kb.innerHTML='<i></i><i></i><i></i>';
  hd.prepend(kb);
  const bd=document.createElement('div');bd.id='kmm-bd';
  const pn=document.createElement('div');pn.id='kmm-p';
  hd.append(bd,pn);

  const sec=(t)=>{const h=document.createElement('h4');h.textContent=t;pn.appendChild(h)};
  // progress
  const bar=hd.querySelector('.bar'),pt=$('#pt');
  if(bar||pt){sec('Progress');if(bar)pn.appendChild(bar);if(pt)pn.appendChild(pt)}
  // bo'limlar (tabs)
  const tabs=$('.tabs');
  if(MENU_TABS&&tabs){sec("Bo'limlar");pn.appendChild(tabs)}
  // amallar
  sec('Amallar');
  const acts=document.createElement('div');acts.style.cssText='display:flex;flex-direction:column;gap:6px';pn.appendChild(acts);
  const mk=(txt,fn)=>{const b=document.createElement('button');b.type='button';b.className='b';b.textContent=txt;b.onclick=fn;return b};
  const moveBtns=()=>{
    [...hd.children].forEach(el=>{
      if(el.tagName!=='BUTTON'||el===kb)return;
      if(/Sozlamalar/.test(el.textContent))el.classList.add('km-set');
      acts.appendChild(el);
    });
    acts.querySelectorAll('button').forEach(b=>{if(/Sozlamalar/.test(b.textContent))b.classList.add('km-set')});
  };
  moveBtns();
  new MutationObserver(moveBtns).observe(hd,{childList:true});
  // qulf tugmalari menyuda
  acts.appendChild(mk('🔒 Qulflash',()=>{if(get())lock();else openDlg()}));
  acts.appendChild(mk('🔐 Ilova qulfi',()=>openDlg()));

  const open=()=>{
    const r=hd.getBoundingClientRect();
    pn.style.top=Math.max(r.bottom+4,48)+'px';
    pn.style.maxHeight='calc(100dvh - '+(Math.max(r.bottom,48)+90)+'px)';
    pn.classList.add('on');bd.classList.add('on');
  };
  const close=()=>{pn.classList.remove('on');bd.classList.remove('on')};closeMenu=close;
  kb.onclick=()=>pn.classList.contains('on')?close():open();
  bd.onclick=close;
  pn.addEventListener('click',e=>{if(e.target.closest('button'))setTimeout(close,0)});
}

/* ================= Pastki panel: ikonkalar (faolida qisqa nom) ================= */
const nav=$('#mnav');
const findSet=()=>[...document.querySelectorAll('.hd button')].find(b=>/Sozlamalar/.test(b.textContent));
const mq=matchMedia('(max-width:860px)');
const navH=()=>html.style.setProperty('--kmnav',(mq.matches&&nav?nav.offsetHeight:0)+'px');
const bn=()=>{html.classList.toggle('km-bn',mq.matches&&!!nav);navH()};
bn();mq.addEventListener?mq.addEventListener('change',bn):mq.addListener(bn);
addEventListener('resize',navH);addEventListener('orientationchange',()=>setTimeout(navH,250));
const el=id=>document.getElementById(id);
const ICONS={
  book:'<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15H5.5A1.5 1.5 0 0 0 4 20.5z"/><path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v15h5.5a1.5 1.5 0 0 1 1.5 1.5z"/>',
  term:'<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M7 9.5l3 2.5-3 2.5M12.5 15H17"/>',
  desk:'<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  user:'<circle cx="12" cy="8" r="3.6"/><path d="M4.5 20c.8-3.8 3.7-5.8 7.5-5.8s6.7 2 7.5 5.8"/>',
  set:'<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>'
};
const ITEMS=[
  ['v','l','Darslar','Darslar',ICONS.book],
  ['v','t','Terminal','Terminal',ICONS.term],
  ['km','kali','Kali','Kali Linux (ish stoli)',ICONS.desk],
  ['km','prof','Profil','Profil / XP',ICONS.user],
  ['km','set','Sozlama','Sozlamalar',ICONS.set]
];
const isOn=(id,c)=>{const e=el(id);return !!(e&&e.classList.contains(c))};
const openNow=()=>isOn('kdsk','on')?'kali':isOn('kst','open')?'set':isOn('kmx-overlay','open')?'prof':null;
function closeAll(){
  const o=openNow();
  try{if(window.kmsDesktop)kmsDesktop.close()}catch(e){}
  if(isOn('kmx-overlay','open')){const x=el('kmx-close');x&&x.click()}
  if(isOn('kst','open')){const x=el('ks-x');x&&x.click()}
  closeMenu();
  return o;
}
const OPEN={
  kali:()=>{window.kmsDesktop&&kmsDesktop.open()},
  prof:()=>{const p=$('#profileBtn');p&&p.click()},
  set:()=>{const s=findSet();s&&s.click()}
};
if(nav){
  nav.innerHTML=ITEMS.map(([t,k,short,full,svg])=>
    `<button type="button" ${t==='v'?'data-v':'data-km'}="${k}" aria-label="${full}" title="${full}"><svg viewBox="0 0 24 24" aria-hidden="true">${svg}</svg><b>${short}</b></button>`).join('');
  const syncNav=()=>{
    const o=openNow(),v=document.body.dataset.v;
    nav.querySelectorAll('button').forEach(b=>{
      const act=o?b.dataset.km===o:b.dataset.v===v;
      b.classList.toggle('act',act);
      act?b.setAttribute('aria-current','true'):b.removeAttribute('aria-current');
    });
  };
  const mo=new MutationObserver(syncNav);
  ['kdsk','kst','kmx-overlay'].forEach(i=>{const e=el(i);e&&mo.observe(e,{attributes:true,attributeFilter:['class']})});
  mo.observe(document.body,{attributes:true,attributeFilter:['data-v']});
  syncNav();
  nav.addEventListener('click',e=>{
    const x=e.target.closest('button');if(!x)return;
    const k=x.dataset.km;
    if(!k){ // Darslar / Terminal
      if(!openNow()){closeMenu();return} // oddiy holat: eski ishlovchi ishlaydi
      e.stopImmediatePropagation();e.stopPropagation();
      closeAll();const v=x.dataset.v;
      setTimeout(()=>{document.body.dataset.v=v;if(v==='t')setTimeout(()=>{const t=$('#ti');t&&t.focus()},50)},200);
      return;
    }
    e.stopImmediatePropagation();e.stopPropagation();
    const was=closeAll();
    if(was===k)return; // faol tugma qayta bosildi: oyna yopiladi
    setTimeout(OPEN[k],was?200:0);
  },true);
}

/* ================= PIN qulf ================= */
const LS='km_lock',LF='km_lock_f';
function get(){try{return JSON.parse(localStorage.getItem(LS)||'null')}catch(e){return null}}
function put(o){try{o?localStorage.setItem(LS,JSON.stringify(o)):localStorage.removeItem(LS)}catch(e){}}
function getF(){try{return JSON.parse(localStorage.getItem(LF)||'{"n":0,"u":0}')}catch(e){return{n:0,u:0}}}
function putF(o){try{localStorage.setItem(LF,JSON.stringify(o))}catch(e){}}
const hex=b=>[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('');
function rnd(){try{return hex(crypto.getRandomValues(new Uint8Array(16)))}catch(e){return Math.random().toString(16).slice(2)+Date.now().toString(16)}}
async function hash(pin,salt){
  try{
    const k=await crypto.subtle.importKey('raw',new TextEncoder().encode(pin),'PBKDF2',false,['deriveBits']);
    return hex(await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt:new TextEncoder().encode(salt),iterations:60000},k,256));
  }catch(e){
    let h=5381;const s=salt+pin;for(let i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))>>>0;return'f'+h.toString(16);
  }
}
const say=m=>{try{typeof toast==='function'?toast(m):alert(m)}catch(e){alert(m)}};

const ov=document.createElement('div');ov.id='kmlock';
ov.innerHTML='<div class="ic">🔒</div><h2></h2><div class="s"></div><div class="kml-dots"></div><div class="kml-pad"></div><button class="kml-ok" hidden>Tasdiqlash</button>';
document.body.appendChild(ov);
const eT=ov.querySelector('h2'),eS=ov.querySelector('.s'),eD=ov.querySelector('.kml-dots'),eP=ov.querySelector('.kml-pad'),eOk=ov.querySelector('.kml-ok');
let buf='',opt={},res=null,padBtns=[];
['1','2','3','4','5','6','7','8','9','c','0','b'].forEach(k=>{
  const b=document.createElement('button');b.type='button';b.dataset.k=k;
  b.textContent=k==='c'?'✕':k==='b'?'⌫':k;eP.appendChild(b);padBtns.push(b);
});
function dots(){
  const n=opt.mode==='ask'?opt.n:6;
  eD.innerHTML=Array.from({length:n},(_,i)=>'<i class="'+(i<buf.length?'f':'')+'"></i>').join('');
  eOk.hidden=!(opt.mode==='set'&&buf.length>=4);
}
function render(o){
  opt=o;buf='';eT.textContent=o.t||'';eS.textContent=o.s||'';
  padBtns.forEach(b=>{b.disabled=!!o.dis&&b.dataset.k!=='c';if(b.dataset.k==='c')b.style.visibility=o.cancel?'visible':'hidden'});
  dots();ov.classList.add('on');
}
function openPad(o){render(o);return new Promise(r=>{res=r})}
function done(v){const r=res;res=null;r&&r(v)}
function hide(){ov.classList.remove('on')}
function shake(){ov.classList.remove('shake');void ov.offsetWidth;ov.classList.add('shake')}
function press(k){
  if(!res||opt.dis)return;
  if(k==='c'){if(opt.cancel)done(null);return}
  if(k==='b'){buf=buf.slice(0,-1);dots();return}
  const max=opt.mode==='ask'?opt.n:6;
  if(buf.length>=max)return;
  buf+=k;dots();
  if(buf.length===max){const v=buf;setTimeout(()=>done(v),120)}
}
eP.addEventListener('click',e=>{const b=e.target.closest('button');if(b)press(b.dataset.k)});
eOk.onclick=()=>{if(res&&buf.length>=4)done(buf)};
document.addEventListener('keydown',e=>{
  if(!ov.classList.contains('on')||!res)return;
  if(/^\d$/.test(e.key))press(e.key);
  else if(e.key==='Backspace')press('b');
  else if(e.key==='Enter'&&opt.mode==='set'&&buf.length>=4)done(buf);
  else if(e.key==='Escape')press('c');
},true);

const coolLeft=()=>Math.max(0,Math.ceil((getF().u-Date.now())/1000));
async function check(title,canCancel){
  const c=get();if(!c)return true;
  let msg='';
  for(;;){
    let w=coolLeft();
    if(w>0){
      if(canCancel){say('Ko\'p xato urinish. '+w+' soniya kuting');return false}
      while((w=coolLeft())>0){render({t:title,s:'Ko\'p xato. '+w+' soniya kuting',mode:'ask',n:c.n,dis:true});await new Promise(r=>setTimeout(r,1000))}
      msg='';
    }
    const p=await openPad({t:title,s:msg,mode:'ask',n:c.n,cancel:canCancel});
    if(p==null){hide();return false}
    if(await hash(p,c.s)===c.h){putF({n:0,u:0});hide();return true}
    const f=getF();f.n=(f.n||0)+1;
    if(f.n%5===0)f.u=Date.now()+Math.min(600,30*Math.pow(2,f.n/5-1))*1000;
    putF(f);shake();msg='Noto\'g\'ri PIN';
  }
}
async function setNew(){
  let msg='4–6 raqam kiriting';
  for(;;){
    const a=await openPad({t:'Yangi PIN',s:msg,mode:'set',cancel:true});
    if(a==null){hide();return null}
    const b=await openPad({t:'PINni takrorlang',s:'',mode:'set',cancel:true});
    if(b==null){hide();return null}
    if(a===b){hide();return a}
    shake();msg='PINlar mos kelmadi, qayta kiriting';
  }
}
let locked=false;
async function lock(){
  if(locked||!get())return;
  locked=true;html.classList.add('kml');
  await check('Ilova qulflangan',false);
  html.classList.remove('kml');locked=false;
}
window.kmLock=lock;

/* sozlama oynasi */
const dl=document.createElement('div');dl.id='kmldlg';document.body.appendChild(dl);
const AUTO=[[0,'Darhol'],[30,'30 soniyadan keyin'],[60,'1 daqiqadan keyin'],[300,'5 daqiqadan keyin'],[-1,'Faqat ilova ochilganda']];
function openDlg(){
  const c=get();
  dl.innerHTML='<div class="c"><div class="h"><b>🔐 Ilova qulfi</b><button class="b" data-a="x">✕</button></div>'+
  (c?'<p>Qulf yoqilgan ('+c.n+' xonali PIN). Ilova ochilganda har safar PIN so\'raladi.</p>'+
     '<label>Fonda qulflash<select id="kml-a">'+AUTO.map(([v,t])=>'<option value="'+v+'"'+(v===c.a?' selected':'')+'>'+t+'</option>').join('')+'</select></label>'+
     '<button class="b" data-a="lock">🔒 Hozir qulflash</button><button class="b" data-a="chg">PINni o\'zgartirish</button><button class="b" data-a="off">Qulfni o\'chirish</button>'
    :'<p>PIN o\'rnatsangiz, ilova ochilganda va fondan qaytganda PIN so\'raladi.</p><button class="b" data-a="set">PIN o\'rnatish</button>')+
  '<p style="opacity:.7">PINni unutsangiz, ilovani qulfdan chiqarishning yo\'li yo\'q: ilova ma\'lumotlarini tozalash kerak bo\'ladi. Avval «Progress kodi» ni saqlab qo\'ying.</p></div>';
  dl.classList.add('on');
}
dl.addEventListener('change',e=>{if(e.target.id==='kml-a'){const c=get();if(c){c.a=+e.target.value;put(c)}}});
dl.addEventListener('click',async e=>{
  if(e.target===dl){dl.classList.remove('on');return}
  const b=e.target.closest('button[data-a]');if(!b)return;
  const a=b.dataset.a;
  if(a==='x'){dl.classList.remove('on');return}
  if(a==='lock'){dl.classList.remove('on');lock();return}
  if(a==='set'){
    const p=await setNew();if(p==null)return;
    const s=rnd();put({s,h:await hash(p,s),n:p.length,a:30});putF({n:0,u:0});say('Qulf yoqildi');openDlg();return;
  }
  if(a==='chg'){
    if(!await check('Joriy PIN',true))return;
    const p=await setNew();if(p==null)return;
    const s=rnd(),c=get();put({s,h:await hash(p,s),n:p.length,a:c?c.a:30});say('PIN o\'zgartirildi');openDlg();return;
  }
  if(a==='off'){
    if(!await check('PINni kiriting',true))return;
    put(null);putF({n:0,u:0});say('Qulf o\'chirildi');openDlg();
  }
});

/* ishga tushganda va fondan qaytganda */
let hiddenAt=0;
document.addEventListener('visibilitychange',()=>{
  const c=get();
  if(document.visibilityState==='hidden'){
    hiddenAt=Date.now();
    if(c&&!locked)html.classList.add('kml'); // "so'nggi ilovalar"da ko'rinmasin
  }else if(c&&!locked){
    const away=(Date.now()-hiddenAt)/1000;
    if(c.a>=0&&away>=c.a)lock();else html.classList.remove('kml');
  }else if(!c){html.classList.remove('kml')}
});
if(get())lock();else html.classList.remove('kml');
})();
