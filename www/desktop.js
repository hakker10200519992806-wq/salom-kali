/* Kali Maktab: Kali Desktop simulyatori (1-bosqich: qobiq, panel, oynalar, ilovalar menyusi, fon). */
(()=>{
const $=s=>document.querySelector(s);
const E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const LG=k=>{try{return localStorage.getItem(k)}catch(e){return null}};
const LS=(k,v)=>{try{localStorage.setItem(k,v);return true}catch(e){return false}};
const tst=m=>{try{toast(m)}catch(e){}};

const GRAD=['linear-gradient(160deg,#0d1320,#1b2b4a 60%,#2d1b4e)','linear-gradient(160deg,#000,#1a1a1a 50%,#003b2f)','linear-gradient(160deg,#2b0a3d,#7b1e5a 60%,#e8505b)','linear-gradient(160deg,#021b36,#0b6e99 70%,#36d1dc)','linear-gradient(160deg,#111,#3a0d0d 60%,#b3202a)'];
const CATS=[
 ['01 - Information Gathering',['nmap','dmitry','recon-ng','theharvester','whois']],
 ['02 - Vulnerability Analysis',['nikto','lynis','openvas']],
 ['03 - Web Application Analysis',['burpsuite','dirb','gobuster','wpscan','sqlmap']],
 ['05 - Password Attacks',['john','hashcat','hydra','crunch']],
 ['06 - Wireless Attacks',['airmon-ng','airodump-ng','aircrack-ng','reaver','wifite']],
 ['08 - Exploitation Tools',['msfconsole','searchsploit']],
 ['09 - Sniffing & Spoofing',['wireshark','ettercap','bettercap','tcpdump']],
 ['11 - Forensics',['binwalk','foremost','autopsy']],
 ['13 - Social Engineering Tools',['setoolkit']]];

const CSS=`
#kdsk{position:fixed;inset:0;z-index:99990;display:none;flex-direction:column;background-size:cover;background-position:center;color:#e8eef7;font:14px/1.35 system-ui,sans-serif;user-select:none;-webkit-user-select:none;touch-action:manipulation;overflow:hidden}
#kdsk.on{display:flex}
#kdsk .pn{height:36px;flex:none;display:flex;align-items:center;gap:6px;padding:0 8px;background:rgba(10,14,24,.82);backdrop-filter:blur(8px);position:relative;z-index:5}
#kdsk .pn button,#kdsk .tb button{background:none;border:0;color:inherit;font:inherit;padding:4px 8px;border-radius:6px}
#kdsk .pn button:active,#kdsk .tb button:active{background:rgba(255,255,255,.18)}
#kdsk .sp{flex:1}
#kdsk .off{opacity:.35}
#kdsk .ar{flex:1;position:relative;overflow:hidden}
#kdsk .ic{position:absolute;left:8px;top:8px;display:grid;grid-template-columns:repeat(2,76px);gap:6px}
#kdsk .ic div{text-align:center;padding:6px 2px;border-radius:8px;font-size:12px;text-shadow:0 1px 3px #000}
#kdsk .ic div b{display:block;font-size:30px;font-weight:400}
#kdsk .ic div.sel{background:rgba(80,140,255,.35)}
#kdsk .tb{height:42px;flex:none;display:flex;gap:4px;align-items:center;padding:0 6px;background:rgba(10,14,24,.82);backdrop-filter:blur(8px);overflow-x:auto}
#kdsk .tb button{background:rgba(255,255,255,.1);white-space:nowrap;max-width:140px;overflow:hidden;text-overflow:ellipsis}
#kdsk .tb button.act{background:rgba(80,140,255,.45)}
#kdsk .w{position:absolute;display:flex;flex-direction:column;background:#161c2b;border:1px solid #3a4560;border-radius:8px;box-shadow:0 8px 30px rgba(0,0,0,.6);overflow:hidden}
#kdsk .w.mx{inset:0!important;width:auto!important;height:auto!important;border-radius:0}
#kdsk .wt{height:32px;flex:none;display:flex;align-items:center;gap:6px;padding:0 4px 0 10px;background:#232c42;touch-action:none;cursor:move}
#kdsk .wt span{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:600;font-size:13px}
#kdsk .wt button{width:30px;height:26px;border:0;border-radius:5px;background:rgba(255,255,255,.1);color:#fff}
#kdsk .wt button.x{background:#c0392b}
#kdsk .wb{flex:1;overflow:auto;position:relative;user-select:text;-webkit-user-select:text}
#kdsk .rz{position:absolute;right:0;bottom:0;width:22px;height:22px;touch-action:none;cursor:nwse-resize;background:linear-gradient(135deg,transparent 55%,#8aa0c8 55%,#8aa0c8 62%,transparent 62%,transparent 72%,#8aa0c8 72%,#8aa0c8 79%,transparent 79%)}
#kdsk .mn{position:absolute;left:4px;top:38px;width:min(300px,92vw);max-height:calc(100% - 90px);overflow:auto;background:rgba(14,19,32,.97);border:1px solid #3a4560;border-radius:10px;z-index:9;display:none;padding:6px}
#kdsk .mn.on{display:block}
#kdsk .mn .ct{padding:9px 10px;border-radius:6px;font-weight:600}
#kdsk .mn .ct:active{background:rgba(255,255,255,.14)}
#kdsk .mn .tl{display:none;padding-left:12px}
#kdsk .mn .ct.o+.tl{display:block}
#kdsk .mn .tl div{padding:8px 10px;border-radius:6px;color:#9fd0ff;font-family:monospace}
#kdsk .mn .tl div:active{background:rgba(255,255,255,.14)}
#kdsk .mn hr{border:0;border-top:1px solid #3a4560;margin:6px 0}
#kdsk .tm{background:#0b0f18;color:#d6e2f5;font:13px/1.35 monospace;padding:8px;height:100%;box-sizing:border-box;overflow:auto;white-space:pre-wrap;word-break:break-all}
#kdsk .tm input{background:none;border:0;outline:0;color:#fff;font:inherit;width:calc(100% - 4ch);padding:0}
#kdsk .pg{padding:12px}
#kdsk .gr{display:grid;grid-template-columns:repeat(auto-fill,minmax(90px,1fr));gap:8px}
#kdsk .gr div{height:70px;border-radius:8px;background-size:cover;background-position:center;border:2px solid transparent}
#kdsk .gr div.s{border-color:#5aa0ff}
#kdsk .bt{background:#2c4f8f;border:0;color:#fff;border-radius:7px;padding:8px 12px;margin-top:10px}
#kdsk .qs{position:absolute;right:4px;top:38px;background:rgba(14,19,32,.97);border:1px solid #3a4560;border-radius:10px;z-index:9;padding:6px;display:none;min-width:190px}
#kdsk .qs.on{display:block}
#kdsk .qs div{padding:9px 10px;border-radius:6px}
#kdsk .qs div:active{background:rgba(255,255,255,.14)}
`;
document.head.appendChild(Object.assign(document.createElement('style'),{textContent:CSS}));

const DK=window.kmsDK={};
const root=document.createElement('div');root.id='kdsk';
root.innerHTML=`<div class="pn"><button id="kd-m">🐉 Kali</button><div class="sp"></div>
<button id="kd-wf">📶</button><button id="kd-bt">🔵</button><button id="kd-bat">🔋</button><button id="kd-ck">--:--</button></div>
<div class="ar" id="kd-ar"><div class="ic" id="kd-ic"></div></div><div class="tb" id="kd-tb"></div>
<div class="mn" id="kd-mn"></div><div class="qs" id="kd-qs"></div>`;
document.body.appendChild(root);
const ar=$('#kd-ar'),tb=$('#kd-tb'),mn=$('#kd-mn'),qs=$('#kd-qs');

/* ---------- fon ---------- */
let wall=LG('kms_dwall')||'img:wall-kali.jpg';
function applyWall(){root.style.background=wall.startsWith('img:')?`#000 url("${wall.slice(4)}") center/cover no-repeat`:wall.startsWith('data:')?`#000 url("${wall}") center/cover no-repeat`:wall}
applyWall();

/* ---------- panel: soat, wifi, bluetooth, batareya ---------- */
const st={wf:LG('kd_wf')!=='0',bt:LG('kd_bt')==='1',ssid:LG('kd_ssid')||'KaliNet_5G'};
function clock(){const d=new Date(),p=n=>String(n).padStart(2,'0');$('#kd-ck').textContent=p(d.getHours())+':'+p(d.getMinutes())}
setInterval(clock,10000);clock();
function icons(){$('#kd-wf').className=st.wf?'':'off';$('#kd-bt').className=st.bt?'':'off'}
icons();
if(navigator.getBattery)navigator.getBattery().then(b=>{const f=()=>$('#kd-bat').textContent='🔋'+Math.round(b.level*100)+'%';f();b.onlevelchange=f}).catch(()=>{});
function showQS(){
  qs.innerHTML=`<div data-q="wf">${st.wf?'📶 Wi-Fi: yoqilgan ('+st.ssid+')':'📵 Wi-Fi: o\'chiq'}</div><div data-q="bt">${st.bt?'🔵 Bluetooth: yoqilgan':'⚪ Bluetooth: o\'chiq'}</div><div data-q="net">⚙ Network settings...</div><div data-q="fon">🖼 Fonni o'zgartirish</div>`;
  qs.classList.toggle('on')}
$('#kd-wf').onclick=$('#kd-bt').onclick=()=>{mn.classList.remove('on');showQS()};
qs.onclick=e=>{const q=e.target.dataset.q;if(!q)return;
  if(q==='wf'){st.wf=!st.wf;LS('kd_wf',st.wf?'1':'0')}
  if(q==='bt'){st.bt=!st.bt;LS('kd_bt',st.bt?'1':'0')}
  if(q==='fon'){qs.classList.remove('on');openWall();return}
  if(q==='net'){qs.classList.remove('on');DK.network&&DK.network();return}
  icons();showQS();showQS()};
$('#kd-ck').onclick=()=>tst(new Date().toLocaleString());

/* ---------- ilovalar menyusi ---------- */
mn.innerHTML=`<div class="ct" data-a="term">🖥 Terminal</div><div class="ct" data-a="files">📁 Files</div><div class="ct" data-a="wall">🖼 Fon sozlamalari</div><hr>`+
 CATS.map(c=>`<div class="ct">📁 ${E(c[0])}</div><div class="tl">${c[1].map(t=>`<div data-t="${t}">${t}</div>`).join('')}</div>`).join('')+
 `<hr><div class="ct" data-a="resetfs">♻ Fayl tizimini tiklash</div><div class="ct" data-a="exit">⏻ Desktopdan chiqish</div>`;
$('#kd-m').onclick=()=>{qs.classList.remove('on');mn.classList.toggle('on')};
mn.onclick=e=>{const el=e.target,a=el.dataset.a,t=el.dataset.t;
  if(a==='term'){mn.classList.remove('on');openTerm()}
  else if(a==='wall'){mn.classList.remove('on');openWall()}
  else if(a==='files'){mn.classList.remove('on');DK.files?DK.files():tst('Fayl menejeri yuklanmadi')}
  else if(a==='resetfs'){mn.classList.remove('on');DK.resetfs&&DK.resetfs()}
  else if(a==='exit'){mn.classList.remove('on');close()}
  else if(t){mn.classList.remove('on');openTerm(t)}
  else if(el.classList.contains('ct')){const o=el.classList.contains('o');mn.querySelectorAll('.ct.o').forEach(x=>x.classList.remove('o'));if(!o)el.classList.add('o')}};
ar.addEventListener('pointerdown',e=>{mn.classList.remove('on');qs.classList.remove('on')});

/* ---------- oynalar ---------- */
let Z=10,W=[],cas=0;
function focus(w){Z++;w.el.style.zIndex=Z;W.forEach(x=>x.btn.classList.toggle('act',x===w&&!w.min))}
function win(title,body,o){
  o=o||{};const A={w:ar.clientWidth,h:ar.clientHeight},small=A.w<700;
  const w={title,min:false},el=document.createElement('div');el.className='w';
  const ww=small?A.w-8:Math.min(o.w||560,A.w-20),hh=small?A.h-8:Math.min(o.h||380,A.h-20);
  el.style.cssText=`width:${ww}px;height:${hh}px;left:${small?4:20+cas*26}px;top:${small?4:16+cas*26}px`;cas=(cas+1)%6;
  el.innerHTML=`<div class="wt"><span>${E(title)}</span><button class="mi">–</button><button class="mx">□</button><button class="x">✕</button></div><div class="wb"></div><div class="rz"></div>`;
  w.el=el;w.body=el.querySelector('.wb');if(typeof body==='string')w.body.innerHTML=body;else w.body.appendChild(body);
  ar.appendChild(el);
  w.btn=document.createElement('button');w.btn.textContent=title;tb.appendChild(w.btn);
  w.btn.onclick=()=>{if(w.min){w.min=false;el.style.display='flex';focus(w)}else if(w.btn.classList.contains('act')){w.min=true;el.style.display='none';w.btn.classList.remove('act')}else focus(w)};
  el.querySelector('.mi').onclick=()=>{w.min=true;el.style.display='none';w.btn.classList.remove('act')};
  el.querySelector('.mx').onclick=()=>el.classList.toggle('mx');
  w.close=()=>{el.remove();w.btn.remove();W=W.filter(x=>x!==w)};
  el.querySelector('.x').onclick=w.close;
  el.addEventListener('pointerdown',()=>focus(w),true);
  const tt=el.querySelector('.wt');
  tt.addEventListener('pointerdown',e=>{if(e.target.tagName==='BUTTON'||el.classList.contains('mx'))return;
    const sx=e.clientX-el.offsetLeft,sy=e.clientY-el.offsetTop;tt.setPointerCapture(e.pointerId);
    const mv=ev=>{el.style.left=Math.max(-el.offsetWidth+60,Math.min(ar.clientWidth-60,ev.clientX-sx))+'px';el.style.top=Math.max(0,Math.min(ar.clientHeight-32,ev.clientY-sy))+'px'};
    const up=()=>{tt.removeEventListener('pointermove',mv);tt.removeEventListener('pointerup',up)};
    tt.addEventListener('pointermove',mv);tt.addEventListener('pointerup',up)});
  const rz=el.querySelector('.rz');
  rz.addEventListener('pointerdown',e=>{rz.setPointerCapture(e.pointerId);e.stopPropagation();
    const sx=e.clientX,sy=e.clientY,w0=el.offsetWidth,h0=el.offsetHeight;
    const mv=ev=>{el.style.width=Math.max(220,w0+ev.clientX-sx)+'px';el.style.height=Math.max(140,h0+ev.clientY-sy)+'px'};
    const up=()=>{rz.removeEventListener('pointermove',mv);rz.removeEventListener('pointerup',up)};
    rz.addEventListener('pointermove',mv);rz.addEventListener('pointerup',up)});
  W.push(w);focus(w);return w}

/* ---------- fon oynasi ---------- */
function openWall(){
  const ex=W.find(x=>x.title==='Fon');if(ex){ex.min=false;ex.el.style.display='flex';focus(ex);return}
  const b=document.createElement('div');b.className='pg';
  const draw=()=>{b.innerHTML=`<div class="gr">`+['img:wall-kali.jpg','img:wall.jpg'].concat(GRAD).map(g=>`<div data-g="${E(g)}" class="${wall===g?'s':''}" style="background:${g.startsWith('img:')?`url(${g.slice(4)}) center/cover`:g}"></div>`).join('')+
    (wall.startsWith('data:')?`<div class="s" style="background:url(${wall}) center/cover"></div>`:'')+`</div><button class="bt" id="kd-gal">🖼 Galereyadan tanlash</button><input type="file" accept="image/*" id="kd-f" hidden>`;
    b.querySelector('#kd-gal').onclick=()=>b.querySelector('#kd-f').click();
    b.querySelector('#kd-f').onchange=e=>{const f=e.target.files[0];if(!f)return;
      const im=new Image();im.onload=()=>{const k=Math.min(1,1280/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=im.width*k;c.height=im.height*k;c.getContext('2d').drawImage(im,0,0,c.width,c.height);
        const d=c.toDataURL('image/jpeg',.8);wall=d;if(!LS('kms_dwall',d))tst("Rasm saqlanmadi (joy yetmadi), faqat shu seansda ishlaydi");applyWall();draw()};im.src=URL.createObjectURL(f)}};
  draw();b.onclick=e=>{const g=e.target.dataset&&e.target.dataset.g;if(g){wall=g;LS('kms_dwall',g);applyWall();draw()}};
  win('Fon',b,{w:420,h:360})}

/* ---------- soxta terminal ---------- */
const FS=['Desktop','Documents','Downloads','Music','Pictures','Public','Templates','Videos'];
function openTerm(cmd){return DK.term?DK.term(cmd):openTerm0(cmd)}
function openTerm0(cmd){
  const t=document.createElement('div');t.className='tm';
  const out=document.createElement('div'),pr='┌──(kali㉿kali)-[~]\n└─$ ';
  t.appendChild(out);const row=document.createElement('div');row.innerHTML='<span>└─$ </span><input autocapitalize="off" autocomplete="off" spellcheck="false">';t.appendChild(row);
  const inp=row.querySelector('input');let hist=[],hi=0;
  const put=s=>{out.appendChild(document.createTextNode(s+'\n'))};
  const w=win('Terminal',t,{w:560,h:380});
  function run(c){
    out.appendChild(document.createTextNode(pr+c+'\n'));c=c.trim();if(!c)return;hist.push(c);hi=hist.length;
    const a=c.split(/\s+/),n=a[0];
    if(n==='clear'){out.textContent='';return}
    if(n==='exit'){w.close();return}
    const R={help:'Buyruqlar: ls pwd whoami id date uname hostname echo ifconfig ping clear exit + menyudagi vositalar (nmap, hydra...)',
      ls:FS.join('  '),pwd:'/home/kali',whoami:'kali',id:'uid=1000(kali) gid=1000(kali) groups=1000(kali),27(sudo)',
      hostname:'kali',date:new Date().toString(),uname:'Linux kali 6.8.11-amd64 #1 SMP PREEMPT_DYNAMIC Kali 6.8.11-1kali2 x86_64 GNU/Linux',
      ifconfig:'wlan0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n        inet 192.168.1.23  netmask 255.255.255.0  broadcast 192.168.1.255\n        ether 02:42:ac:11:00:02  txqueuelen 1000'};
    if(R[n]!==undefined)put(R[n]);
    else if(n==='echo')put(a.slice(1).join(' '));
    else if(n==='ping'){const h=a[1]||'localhost';put(`PING ${h} (192.168.1.1) 56(84) bytes of data.`);for(let i=1;i<=4;i++)put(`64 bytes from ${h}: icmp_seq=${i} ttl=64 time=${(Math.random()*20+2).toFixed(1)} ms`);}
    else if(CATS.some(c=>c[1].includes(n)))put(`Usage: ${n} [OPTIONS] <target>`);
    else put(`zsh: command not found: ${n}`);
    t.scrollTop=t.scrollHeight}
  inp.addEventListener('keydown',e=>{if(e.key==='Enter'){const v=inp.value;inp.value='';run(v)}
    else if(e.key==='ArrowUp'&&hist.length){hi=Math.max(0,hi-1);inp.value=hist[hi]}
    else if(e.key==='ArrowDown'){hi=Math.min(hist.length,hi+1);inp.value=hist[hi]||''}});
  t.onclick=()=>{if(!getSelection().toString())inp.focus()};
  put('Kali Maktab Desktop. `help` deb yozing.\nESLATMA: bu haqiqiy tizim emas. Barcha buyruqlar, natijalar, tarmoqlar, Wi-Fi/Bluetooth qurilmalari va fayllar butunlay xayoliy; hech narsa haqiqiy tarmoq yoki qurilmaga tegmaydi.\nHaqiqiy hayotda faqat o\'zingizga tegishli yoki yozma ruxsat berilgan tizimni sinang.\n');
  if(cmd)run(cmd);else setTimeout(()=>inp.focus(),50)}

/* ---------- ish stoli ikonkalari ---------- */
const ic=$('#kd-ic');
[['🖥','Terminal',()=>openTerm()],['📁','Files',()=>DK.files&&DK.files()],['🖼','Fon',openWall],['🗂','Dasturlar',()=>mn.classList.add('on')],['⏻','Chiqish',()=>close()]].forEach(([i,n,f])=>{
  const d=document.createElement('div');d.innerHTML=`<b>${i}</b>${n}`;let last=0;
  d.onclick=()=>{ic.querySelectorAll('.sel').forEach(x=>x.classList.remove('sel'));d.classList.add('sel');const now=Date.now();if(now-last<450){f();d.classList.remove('sel')}last=now};
  ic.appendChild(d)});

function open(){root.classList.add('on');if(!W.length)setTimeout(()=>openTerm(),50)}
function close(){root.classList.remove('on')}
window.kmsDesktop={open,close};
Object.assign(DK,{win,CATS,E,tst,openWall,root,st,icons,get ar(){return ar}});

/* ---------- Sozlamalar ichida tugma ---------- */
const kst=$('#kst');
if(kst){
  const inject=()=>{const box=kst.firstElementChild;if(box&&!box.querySelector('#kd-open'))box.insertAdjacentHTML('beforeend',`<details class="kd" open><summary>🖥 Kali Desktop</summary><p class="mu"><small>Kali Linux ish stoli simulyatori: oynalar, terminal, fon va ilovalar menyusi.</small></p><div class="kr" style="border:0"><button class="b" id="kd-open">🖥 Kali Desktop</button></div></details>`)};
  new MutationObserver(inject).observe(kst,{childList:true});
  kst.addEventListener('click',e=>{if(e.target&&e.target.id==='kd-open'){try{closeOverlays()}catch(x){}open()}});
}
})();
