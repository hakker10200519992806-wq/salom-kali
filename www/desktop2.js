/* Kali Maktab Desktop 2-bosqich: virtual fayl tizimi (saqlanadi), Files (Thunar), matn muharriri, terminal + soxta tarmoq buyruqlari. */
(()=>{
const T=window.kmsT,DK=window.kmsDK;if(!T||!DK)return;
const {win,E,tst,root}=DK,C=T.C,$=s=>root.querySelector(s);
const LG=k=>{try{return localStorage.getItem(k)}catch(e){return null}},LS=(k,v)=>{try{localStorage.setItem(k,v);return true}catch(e){return false}};
const join=(a,b)=>a==='/'?'/'+b:a+'/'+b,dirOf=p=>p.slice(0,p.lastIndexOf('/'))||'/',baseOf=p=>p.slice(p.lastIndexOf('/')+1);
const CSS=`
#kdsk .fm{display:flex;flex-direction:column;height:100%;background:#1a2133}
#kdsk .fb{display:flex;gap:4px;padding:5px;background:#202a40;align-items:center}
#kdsk .fb button{background:#2d3a58;border:0;color:#fff;border-radius:6px;padding:5px 9px}
#kdsk .fb input{flex:1;min-width:0;background:#0f1522;border:1px solid #3a4560;color:#fff;border-radius:6px;padding:5px 8px;font:12px monospace}
#kdsk .fpl{display:flex;gap:4px;padding:4px 5px;overflow-x:auto;background:#182036;flex:none}
#kdsk .fpl button{background:none;border:1px solid #3a4560;color:#bcd;border-radius:12px;padding:2px 9px;white-space:nowrap;font-size:12px}
#kdsk .fg{flex:1;overflow:auto;padding:8px;display:grid;grid-template-columns:repeat(auto-fill,minmax(82px,1fr));grid-auto-rows:min-content;gap:6px;align-content:start;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none}
#kdsk .it{text-align:center;padding:6px 3px;border-radius:8px;border:1px solid transparent}
#kdsk .it b{display:block;font-size:34px;font-weight:400;line-height:1.1}
#kdsk .it span{display:block;font-size:12px;word-break:break-word;max-height:2.7em;overflow:hidden}
#kdsk .it.s{background:rgba(80,140,255,.35);border-color:#5aa0ff}
#kdsk .em{grid-column:1/-1;text-align:center;color:#789;padding:30px}
#kdsk .fs{font-size:12px;color:#9ab;padding:4px 8px;background:#182036;flex:none}
#kdsk .cm{position:absolute;z-index:50;background:#f2f2f2;color:#111;border-radius:6px;box-shadow:0 6px 22px rgba(0,0,0,.6);min-width:170px;padding:4px 0;font-size:14px}
#kdsk .cm div{padding:9px 16px}#kdsk .cm div:active{background:#4a90e2;color:#fff}#kdsk .cm hr{border:0;border-top:1px solid #ccc;margin:3px 0}
#kdsk .dl{position:absolute;inset:0;z-index:60;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center}
#kdsk .dl>div{background:#202a40;border:1px solid #4a5a80;border-radius:10px;padding:14px;width:min(340px,90vw)}
#kdsk .dl input{width:100%;box-sizing:border-box;background:#0f1522;border:1px solid #3a4560;color:#fff;border-radius:6px;padding:8px;margin:8px 0;font:14px monospace}
#kdsk .dl button{background:#2c4f8f;border:0;color:#fff;border-radius:7px;padding:8px 14px;margin:6px 6px 0 0}
#kdsk .dl pre{white-space:pre-wrap;font:13px monospace;margin:6px 0}
#kdsk .ed{display:flex;flex-direction:column;height:100%}
#kdsk .ed textarea{flex:1;background:#0b0f18;color:#e6edf7;border:0;outline:0;padding:8px;font:13px/1.4 monospace;resize:none}
#kdsk .ed .fb{justify-content:flex-start}
#kdsk .tm .rd{color:#ff7b72}`;
document.head.appendChild(Object.assign(document.createElement('style'),{textContent:CSS}));

/* ---------- virtual fayl tizimi: saqlash / tiklash ---------- */
const d=T.d,f=T.f;
function seed(){
  const k=T.node('/home/kali').c;
  ['Downloads','Pictures','Music','Videos','Templates','Public'].forEach(n=>{if(!k[n])k[n]=d({})});
  k.Desktop.c['README.txt']=f("Kali Maktab Desktop\nBu simulyator: fayllar shu qurilmada saqlanadi.\nTerminal: nano, mkdir, cat, ls ... Files bilan bir xil fayl tizimi.\n");
  const v=T.node('/var');v.c.log=d({syslog:f('Oct 17 09:01:02 kali systemd[1]: Started Session 1 of User kali.\nOct 17 09:01:05 kali NetworkManager[612]: <info> device (wlan0): state change: activated\n'),'auth.log':f('Oct 17 09:00:58 kali login[540]: pam_unix(login:session): session opened for user kali\nOct 17 09:12:40 kali sudo: kali : TTY=pts/0 ; USER=root ; COMMAND=/usr/bin/nmap 192.168.56.101\n')});
  T.node('/etc').c['os-release']=f('PRETTY_NAME="Kali GNU/Linux Rolling"\nNAME="Kali GNU/Linux"\nID=kali\nVERSION="2025.3"\n');
  const e=T.node('/');e.c.root=e.c.root||d({});e.c.usr=e.c.usr||d({share:d({wordlists:d({'rockyou.txt':f('123456\npassword\nparol123\nkalimaktab\nqwerty\nletmein\n')})})});}
let last='';
function flush(){const s=JSON.stringify(T.fs);if(s!==last){last=s;LS('kms_vfs',s);refreshFM()}}
{const sv=LG('kms_vfs');let ok=false;
 if(sv)try{const o=JSON.parse(sv);if(o&&o.t==='d'&&o.c&&o.c.home){T.fs=o;ok=true}}catch(e){}
 if(!ok)seed();
 if(!T.node(T.cwd)||T.node(T.cwd).t!=='d')T.cwd='/home/kali';
 last=JSON.stringify(T.fs);LS('kms_vfs',last)}
setInterval(flush,1500);
DK.resetfs=()=>ask2('Fayl tizimini boshlang\'ich holatga qaytarish? Barcha o\'zgarishlar o\'chadi.',null,()=>{try{localStorage.removeItem('kms_vfs')}catch(e){}location.reload()});

/* ---------- dialoglar ---------- */
function dlg(html,btns){const o=document.createElement('div');o.className='dl';o.innerHTML=`<div>${html}<div class="bb"></div></div>`;
  btns.forEach(([t,fn])=>{const b=document.createElement('button');b.textContent=t;b.onclick=()=>{const v=o.querySelector('input')?o.querySelector('input').value:'';o.remove();fn&&fn(v)};o.querySelector('.bb').appendChild(b)});
  root.appendChild(o);const i=o.querySelector('input');if(i){i.focus();i.select();i.onkeydown=e=>{if(e.key==='Enter')o.querySelector('.bb button').click()}}}
function ask(title,val,ok){dlg(`<b>${E(title)}</b><input value="${E(val||'')}" autocapitalize="off" spellcheck="false">`,[['OK',ok],['Cancel']])}
function ask2(text,_,ok){dlg(`<b>${E(text)}</b>`,[['OK',ok],['Cancel']])}

/* ---------- fayl amallari ---------- */
const bad=n=>!n||/[\/\0]/.test(n)||n==='.'||n==='..';
function freeName(dn,name){if(!(name in dn.c))return name;let i=0,b=name,x='';const m=/^(.*?)(\.[^.]+)?$/.exec(name);b=m[1];x=m[2]||'';let c;do{c=b+(i?` (copy ${i})`:' (copy)')+x;i++}while(c in dn.c);return c}
const clone=n=>JSON.parse(JSON.stringify(n));
let clip=null;
function mkdir(dir,name){const n=T.node(dir);if(bad(name))return tst('Noto\'g\'ri nom');if(name in n.c)return tst('Bu nom band');n.c[name]=d({});flush()}
function mkfile(dir,name){const n=T.node(dir);if(bad(name))return tst('Noto\'g\'ri nom');if(name in n.c)return tst('Bu nom band');n.c[name]=f('');flush()}
function rename(p,nn){const dn=T.node(dirOf(p)),o=baseOf(p);if(bad(nn))return tst('Noto\'g\'ri nom');if(nn in dn.c)return tst('Bu nom band');dn.c[nn]=dn.c[o];delete dn.c[o];flush()}
function del(p){delete T.node(dirOf(p)).c[baseOf(p)];flush()}
function paste(dir){if(!clip)return;const src=T.node(clip.p);if(!src){clip=null;return tst('Manba topilmadi')}
  if(src.t==='d'&&(join(dir,'x').startsWith(clip.p+'/')||dir===clip.p))return tst('Papkani o\'z ichiga ko\'chirib bo\'lmaydi');
  const dn=T.node(dir);if(clip.cut){const nm=baseOf(clip.p);if(dirOf(clip.p)===dir){clip=null;return}const fn=freeName(dn,nm);dn.c[fn]=src;delete T.node(dirOf(clip.p)).c[nm];clip=null}
  else dn.c[freeName(dn,baseOf(clip.p))]=clone(src);flush()}
const sizeOf=n=>n.t==='f'?new TextEncoder().encode(n.v||'').length:Object.values(n.c).reduce((a,x)=>a+sizeOf(x),0);
const perm=n=>{const m=n.m;if(!m)return n.t==='d'?'drwxr-xr-x':'-rw-r--r--';if(m==='+x')return '-rwxr-xr-x';if(!/^\d{3}$/.test(m))return n.t==='d'?'drwxr-xr-x':'-rwxr-xr-x';return (n.t==='d'?'d':'-')+[...m].map(c=>'rwx'.split('').map((l,j)=>c&(4>>j)?l:'-').join('')).join('')};
function props(p){const n=T.node(p);if(!n)return;dlg(`<b>${E(baseOf(p)||'/')}</b><pre>Type: ${n.t==='d'?'folder':'file'}\nLocation: ${E(dirOf(p))}\nSize: ${sizeOf(n)} bytes${n.t==='d'?`\nItems: ${Object.keys(n.c).length}`:''}\nPermissions: ${perm(n)}\nOwner: kali:kali</pre>`,[['Close']])}

/* ---------- matn muharriri ---------- */
function openEditor(p){const n=T.node(p);if(!n||n.t!=='f')return;
  const b=document.createElement('div');b.className='ed';b.innerHTML=`<div class="fb"><button>💾 Save</button><span style="font:12px monospace;color:#9ab">${E(p)}</span></div><textarea spellcheck="false"></textarea>`;
  const ta=b.querySelector('textarea');ta.value=n.v||'';
  const save=()=>{const nn=T.node(p);if(nn&&nn.t==='f'){nn.v=ta.value;flush();tst('Saved')}else tst('Fayl topilmadi')};
  b.querySelector('button').onclick=save;ta.onkeydown=e=>{if((e.ctrlKey||e.metaKey)&&e.key==='s'){e.preventDefault();save()}};
  win('Mousepad — '+baseOf(p),b,{w:520,h:360})}

/* ---------- Files (Thunar) ---------- */
let fms=[];
function refreshFM(){fms=fms.filter(w=>w.el.isConnected);fms.forEach(w=>w.render&&w.render())}
const ico=k=>/\.pdf$/i.test(k)?'📕':/\.(png|jpe?g|gif|webp)$/i.test(k)?'🖼':/\.(zip|tar|gz|tgz)$/i.test(k)?'📦':/\.(sh|py)$/i.test(k)?'📜':'📄';
function menu(x,y,items){root.querySelectorAll('.cm').forEach(m=>m.remove());const m=document.createElement('div');m.className='cm';
  m.innerHTML=items.map(i=>i==='-'?'<hr>':`<div data-k="${i[0]}">${E(i[1])}</div>`).join('');root.appendChild(m);
  const R=root.getBoundingClientRect();m.style.left=Math.max(4,Math.min(x-R.left,R.width-m.offsetWidth-4))+'px';m.style.top=Math.max(4,Math.min(y-R.top,R.height-m.offsetHeight-4))+'px';
  m.addEventListener('pointerdown',e=>e.stopPropagation());
  m.onclick=e=>{const k=e.target.dataset.k;if(!k)return;m.remove();items.find(i=>i[0]===k)[2]()};
  const off=e=>{if(!m.contains(e.target)){m.remove();document.removeEventListener('pointerdown',off,true)}};setTimeout(()=>document.addEventListener('pointerdown',off,true),30)}
function openFM(start){
  let path=start||'/home/kali',sel=null,hid=false,lastTap={n:null,t:0},timer,lp=0,mt=0,sx=0,sy=0;
  const b=document.createElement('div');b.className='fm';
  b.innerHTML=`<div class="fb"><button data-a="up">⬆</button><button data-a="home">🏠</button><input class="fp" autocapitalize="off" spellcheck="false"><button data-a="new">➕</button><button data-a="hid">👁</button></div>
<div class="fpl">${[['🏠 Home','/home/kali'],['🖥 Desktop','/home/kali/Desktop'],['📄 Documents','/home/kali/Documents'],['⬇ Downloads','/home/kali/Downloads'],['🧪 lab','/home/kali/lab'],['💽 File System','/']].map(([t,p])=>`<button data-p="${p}">${t}</button>`).join('')}</div><div class="fg"></div><div class="fs"></div>`;
  const g=b.querySelector('.fg'),pi=b.querySelector('.fp'),fsb=b.querySelector('.fs');
  const w=win('Files',b,{w:600,h:420});fms.push(w);
  const cur=()=>T.node(path);
  function render(){const n=cur();if(!n||n.t!=='d'){path='/home/kali';return render()}
    const ks=Object.keys(n.c).filter(k=>hid||k[0]!=='.').sort((a,c)=>(n.c[c].t==='d')-(n.c[a].t==='d')||a.localeCompare(c));
    if(sel&&!(sel in n.c))sel=null;
    g.innerHTML=ks.map(k=>`<div class="it${sel===k?' s':''}" data-n="${E(k)}"><b>${n.c[k].t==='d'?'📁':ico(k)}</b><span>${E(k)}</span></div>`).join('')||'<div class="em">Folder is empty</div>';
    pi.value=path;fsb.textContent=sel?`"${sel}" selected`:`${ks.length} items`}
  w.render=render;
  const go=p=>{path=T.norm(p);sel=null;render()};
  function open(k){const p=join(path,k),n=T.node(p);if(!n)return;if(n.t==='d')go(p);else if(DK.openFile&&/\.(pdf|png|jpe?g|gif|webp)$/i.test(k))DK.openFile(p);else if(/\.(zip|tar|gz)$/i.test(k))tst('Arxivlarni ochib bo\'lmaydi');else openEditor(p)}
  function termHere(p){T.cwd=p;DK.term()}
  function ctx(x,y,k){
    const p=k?join(path,k):path,n=k?T.node(p):null;
    if(k)return menu(x,y,[['o','Open',()=>open(k)],...(n.t==='d'?[['t','Open Terminal Here',()=>termHere(p)]]:[['e','Edit (Mousepad)',()=>openEditor(p)]]),'-',['x','Cut',()=>{clip={p,cut:1};tst('Cut')}],['c','Copy',()=>{clip={p,cut:0};tst('Copied')}],...(n.t==='d'&&clip?[['v','Paste Into Folder',()=>{paste(p);render()}]]:[]),'-',['r','Rename...',()=>ask('Rename',k,v=>{rename(p,v.trim());render()})],['d','Delete',()=>ask2(`Delete "${k}"?`,0,()=>{del(p);render()})],'-',['p','Properties...',()=>props(p)]]);
    menu(x,y,[['n','New Folder...',()=>ask('New Folder','New Folder',v=>{mkdir(path,v.trim());render()})],['f','New Empty File...',()=>ask('New File','new.txt',v=>{mkfile(path,v.trim());render()})],['i','Import from device...',()=>DK.importFile&&DK.importFile(path,render)],'-',...(clip?[['v','Paste',()=>{paste(path);render()}]]:[]),['t','Open Terminal Here',()=>termHere(path)],['h',hid?'Hide Hidden Files':'Show Hidden Files',()=>{hid=!hid;render()}],'-',['p','Properties...',()=>props(path)]])}
  g.addEventListener('pointerdown',e=>{sx=e.clientX;sy=e.clientY;clearTimeout(timer);const it=e.target.closest('.it'),x=e.clientX,y=e.clientY;
    timer=setTimeout(()=>{lp=Date.now();if(it){sel=it.dataset.n;render()}ctx(x,y,it?it.dataset.n:null)},520)});
  g.addEventListener('pointermove',e=>{if(Math.abs(e.clientX-sx)>10||Math.abs(e.clientY-sy)>10)clearTimeout(timer)});
  ['pointerup','pointercancel','pointerleave'].forEach(t=>g.addEventListener(t,()=>clearTimeout(timer)));
  g.addEventListener('contextmenu',e=>{e.preventDefault();if(Date.now()-lp<900)return;const it=e.target.closest('.it');if(it){sel=it.dataset.n;render()}ctx(e.clientX,e.clientY,it?it.dataset.n:null)});
  g.addEventListener('click',e=>{if(Date.now()-lp<900)return;const it=e.target.closest('.it');
    if(!it){sel=null;render();return}const k=it.dataset.n,now=Date.now();
    if(lastTap.n===k&&now-lastTap.t<450){lastTap={n:null,t:0};open(k)}else{lastTap={n:k,t:now};sel=k;render()}});
  b.querySelector('.fb').addEventListener('click',e=>{const a=e.target.dataset.a;if(!a)return;
    if(a==='up')go(dirOf(path));else if(a==='home')go('/home/kali');else if(a==='hid'){hid=!hid;render()}
    else if(a==='new'){const r=e.target.getBoundingClientRect();ctx(r.left,r.bottom,null)}});
  b.querySelector('.fpl').addEventListener('click',e=>{const p=e.target.dataset.p;if(p)go(p)});
  pi.addEventListener('keydown',e=>{if(e.key==='Enter'){const n=T.node(pi.value);if(n&&n.t==='d')go(pi.value);else{tst('Papka topilmadi');pi.value=path}}});
  render()}
DK.files=openFM;Object.assign(DK,{dlg,ask,ask2,openEditor,flush,join});

/* ---------- terminal ---------- */
const ER=/command not found|topilmadi|yo'q|rad etildi|kerak$/;
function proc(l){let o='',ok=true,op=';';const ps=l.split(/(&&|;)/);
  for(let i=0;i<ps.length;i+=2){if(i)op=ps[i-1];if(op=='&&'&&!ok)continue;let r;try{r=ps[i].split('|').reduce((x,s)=>T.run(s.trim(),x),'')}catch(e){r='xato: '+e.message}ok=!ER.test(r);if(r)o+=(o?'\n':'')+r}return o}
function complete(v){const m=/^(.*?)(\S*)$/.exec(v),pre=m[1],tok=m[2],first=!pre.trim();let c=[];
  if(first)c=[...new Set([...Object.keys(C),...T.D.map(x=>x.n)])].filter(x=>x.startsWith(tok));
  else{const i=tok.lastIndexOf('/'),dp=i>=0?tok.slice(0,i+1):'',n=T.node(dp||'.'),bs=tok.slice(i+1);if(n&&n.t==='d')c=Object.keys(n.c).filter(k=>k.startsWith(bs)).map(k=>dp+k+(n.c[k].t==='d'?'/':''))}
  return{pre,c}}
function openTerm(cmd){
  const t=document.createElement('div');t.className='tm';const out=document.createElement('div'),row=document.createElement('div');
  row.innerHTML='<div class="pl"></div><span>└─$ </span><input autocapitalize="off" autocomplete="off" spellcheck="false">';t.append(out,row);
  const inp=row.querySelector('input'),pl=row.querySelector('.pl');let hi=T.HS.length;
  const upd=()=>{pl.textContent=`┌──(kali㉿kali)-[${T.PS()}]`};upd();
  const put=(s,c)=>{const e=document.createElement('div');if(c)e.className=c;e.textContent=s;out.appendChild(e)};
  const w=win('Terminal',t,{w:580,h:400});
  function run(c){put(`┌──(kali㉿kali)-[${T.PS()}]\n└─$ ${c}`);c=c.trim();if(c){if(c==='clear'){out.innerHTML=''}else if(c==='exit'){w.close();return}else{T.HS.push(c);hi=T.HS.length;const o=proc(c);if(o)put(o,ER.test(o)?'rd':'')}}upd();flush();t.scrollTop=t.scrollHeight}
  inp.addEventListener('keydown',e=>{
    if(e.key==='Enter'){const v=inp.value;inp.value='';run(v)}
    else if(e.key==='ArrowUp'){e.preventDefault();hi=Math.max(0,hi-1);inp.value=T.HS[hi]||''}
    else if(e.key==='ArrowDown'){e.preventDefault();hi=Math.min(T.HS.length,hi+1);inp.value=T.HS[hi]||''}
    else if(e.key==='Tab'){e.preventDefault();const{pre,c}=complete(inp.value);if(c.length===1)inp.value=pre+c[0]+(c[0].endsWith('/')?'':' ');else if(c.length>1){let p=c[0];c.forEach(x=>{while(!x.startsWith(p))p=p.slice(0,-1)});const m=/^(.*?)(\S*)$/.exec(inp.value);inp.value=pre+p;put(c.join('  '))}}
    else if(e.ctrlKey&&e.key==='l'){e.preventDefault();out.innerHTML=''}});
  t.onclick=()=>{if(!getSelection().toString())inp.focus()};
  put("Kali Maktab Desktop terminali. Darslardagi barcha buyruqlar ishlaydi; fayllar Files bilan umumiy.");
  if(cmd)run(cmd);else setTimeout(()=>inp.focus(),50)}
DK.term=openTerm;

/* ---------- soxta tarmoq / vositalar buyruqlari ---------- */
const LABMSG="Faqat 192.168.56.0/24 laboratoriya manzillari mavjud.";
const ipOf=a=>a.find(x=>/\d+\.\d+\.\d+\.\d+/.test(x));
const lab=(a,fn,use)=>{const m=ipOf(a.join(' ').split(/[\s@:\/]+/).concat(a));const ip=(a.join(' ').match(/\d+\.\d+\.\d+\.\d+/)||[])[0];if(!ip)return use;if(!ip.startsWith('192.168.56.'))return LABMSG;return fn(ip)};
const NETS=[['A4:2B:B0:11:22:33',-42,6,'WPA2','CCMP','PSK','KaliNet_5G'],['02:11:22:AA:BB:CC',-55,1,'WPA2','CCMP','PSK','LabWiFi'],['02:5E:77:10:20:30',-68,11,'WPA2','CCMP','PSK','Maktab_Guest'],['02:9C:00:5D:6E:7F',-74,3,'OPN','','','Cafe_Free']];
const X={
 ifconfig:()=>`eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n        inet 192.168.56.10  netmask 255.255.255.0  broadcast 192.168.56.255\n        ether 08:00:27:3a:5c:11  txqueuelen 1000  (Ethernet)\n\nlo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536\n        inet 127.0.0.1  netmask 255.0.0.0\n\nwlan0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n        inet 192.168.1.23  netmask 255.255.255.0  broadcast 192.168.1.255\n        ether 02:42:ac:11:00:02  txqueuelen 1000  (Ethernet)`,
 iwconfig:()=>`lo        no wireless extensions.\n\neth0      no wireless extensions.\n\nwlan0     IEEE 802.11  ESSID:"KaliNet_5G"\n          Mode:Managed  Frequency:5.18 GHz  Access Point: A4:2B:B0:11:22:33\n          Bit Rate=433.3 Mb/s   Tx-Power=20 dBm\n          Link Quality=62/70  Signal level=-48 dBm`,
 netstat:a=>`Active Internet connections ${a.join('').includes('l')?'(only servers)':'(w/o servers)'}\nProto Recv-Q Send-Q Local Address           Foreign Address         State${a.join('').includes('p')?'       PID/Program name':''}\ntcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN${a.join('').includes('p')?'      612/sshd':''}\ntcp        0      0 127.0.0.1:631           0.0.0.0:*               LISTEN${a.join('').includes('p')?'      540/cupsd':''}\ntcp        0      0 192.168.56.10:44122     93.184.216.34:443       ESTABLISHED${a.join('').includes('p')?' 2201/firefox':''}\nudp        0      0 0.0.0.0:68              0.0.0.0:*                          ${a.join('').includes('p')?'  601/dhclient':''}`,
 'airmon-ng':a=>a[0]==='start'?`Found 2 processes that could cause trouble.\n  PID Name\n  601 dhclient\n  655 wpa_supplicant\n\nPHY\tInterface\tDriver\t\tChipset\nphy0\twlan0\t\tath9k_htc\tAtheros AR9271\n\n\t\t(mac80211 monitor mode vif enabled for [phy0]wlan0 on [phy0]wlan0mon)\n\t\t(mac80211 station mode vif disabled for [phy0]wlan0)`:a[0]==='stop'?'(mac80211 station mode vif enabled on [phy0]wlan0)':'PHY\tInterface\tDriver\t\tChipset\n\nphy0\twlan0\t\tath9k_htc\tAtheros AR9271 802.11n',
 'airodump-ng':a=>!a.includes('wlan0mon')?"airodump-ng: interfeys kerak (monitor rejimida). Avval: airmon-ng start wlan0, so'ng: airodump-ng wlan0mon":` CH  6 ][ Elapsed: 12 s ][ ${new Date().toISOString().slice(0,16).replace('T',' ')}\n\n BSSID              PWR  Beacons  #Data  CH  ENC  CIPHER AUTH ESSID\n\n`+NETS.map(n=>` ${n[0]}  ${n[1]}      ${40+Math.floor(Math.random()*90)}     ${Math.floor(Math.random()*60)}   ${String(n[2]).padStart(2)}  ${n[3].padEnd(4)} ${n[4].padEnd(6)} ${n[5].padEnd(4)} ${n[6]}`).join('\n')+'',
 'aircrack-ng':a=>{const cp=a.find(x=>/\.cap$/.test(x));return cp?`Reading packets, please wait...\nOpening ${cp}\nPlease specify a dictionary (option -w).`.replace('Please specify a dictionary (option -w).',a.includes('-w')?`\n                              Aircrack-ng 1.7\n\n      [00:00:03] 6/6 keys tested (2154.20 k/s)\n\n                         KEY FOUND! [ kalimaktab ]`:'Lug\'at kerak: -w /usr/share/wordlists/rockyou.txt'):"aircrack-ng: .cap fayl kerak. Masalan: aircrack-ng -w /usr/share/wordlists/rockyou.txt lab.cap"},
 hydra:a=>lab(a,ip=>`Hydra v9.5 (c) 2023 by van Hauser/THC - for legal purposes only\n[DATA] max 4 tasks per 1 server, overall 4 tasks, 6 login tries\n[DATA] attacking ssh://${ip}:22/\n[22][ssh] host: ${ip}   login: ali   password: parol123\n1 of 1 target successfully completed, 1 valid password found`,"hydra: nishon manzil kerak. Masalan: hydra -l ali -P /usr/share/wordlists/rockyou.txt ssh://192.168.56.101"),
 nikto:a=>lab(a,ip=>`- Nikto v2.5.0\n+ Target IP:          ${ip}\n+ Target Port:        80\n+ Server: Apache/2.4.54 (Debian)\n+ /: The anti-clickjacking X-Frame-Options header is not present.\n+ /icons/README: Apache default file found.\n+ /login.php: Admin login page found.\n+ 7850 requests: 0 error(s) and 3 item(s) reported`,"nikto: nishon kerak. Masalan: nikto -h 192.168.56.101"),
 sqlmap:a=>lab(a,ip=>`[*] starting @ 10:21:07\n[INFO] testing connection to the target URL\n[INFO] GET parameter 'id' appears to be injectable\n[INFO] back-end DBMS: MySQL >= 5.0\navailable databases [2]:\n[*] information_schema\n[*] labdb`,"sqlmap: URL kerak. Masalan: sqlmap -u http://192.168.56.101/item.php?id=1"),
 gobuster:a=>lab(a,ip=>`Gobuster v3.6\n===============================================================\n/admin                (Status: 301) [Size: 312]\n/images               (Status: 301) [Size: 313]\n/login.php            (Status: 200) [Size: 1423]\nFinished`,"gobuster: dir -u http://192.168.56.101 -w lugat.txt"),
 ssh:a=>lab(a,ip=>`${(a.find(x=>x.includes('@'))||'ali@x').split('@')[0]}@${ip}'s password: \nWelcome to Ubuntu 22.04 LTS (lab VM)\nLast login: Fri Oct 16 18:02:11 2026\nConnection to ${ip} closed.`,"ssh: ulanish uchun user@192.168.56.101 kerak"),
 john:a=>`Using default input encoding: UTF-8\nLoaded 1 password hash (sha512crypt)\nparol123         (ali)\n1g 0:00:00:02 DONE\nSession completed.`,
 hashcat:a=>`hashcat (v6.2.6) starting\nSession..........: hashcat\nStatus...........: Cracked\nRecovered........: 1/1 (100.00%) Digests\n5f4dcc3b5aa765d61d8327deb882cf99:password`,
 nmcli:a=>/wifi/.test(a.join(' '))?'IN-USE  BSSID              SSID          CHAN  SIGNAL  SECURITY\n*       A4:2B:B0:11:22:33  KaliNet_5G     36    88      WPA2\n        02:11:22:AA:BB:CC  LabWiFi         1    70      WPA2\n        02:5E:77:10:20:30  Maktab_Guest   11    52      WPA2\n        02:9C:00:5D:6E:7F  Cafe_Free       3    41      --':'wlan0: connected to KaliNet_5G\neth0: connected to Wired connection 1\nlo: unmanaged',
 bluetoothctl:a=>'Agent registered\n[bluetooth]# scan on\n[NEW] Device 5C:F3:70:AA:01:02 JBL Flip 5\n[NEW] Device 24:18:C6:33:44:55 Redmi Buds\n[NEW] Device 9C:B6:D0:12:34:56 Kali-Phone',
 hcitool:a=>'Scanning ...\n\t5C:F3:70:AA:01:02\tJBL Flip 5\n\t24:18:C6:33:44:55\tRedmi Buds',
 iwlist:a=>'wlan0     Scan completed :\n'+NETS.map((n,i)=>`          Cell ${String(i+1).padStart(2,'0')} - Address: ${n[0]}\n                    Channel:${n[2]}\n                    Quality=${Math.max(10,110+n[1])}/70  Signal level=${n[1]} dBm\n                    ESSID:"${n[6]}"`).join('\n'),
 id:()=>'uid=1000(kali) gid=1000(kali) groups=1000(kali),27(sudo),100(users)',hostname:()=>'kali',uptime:()=>' 10:42:17 up 1:12,  1 user,  load average: 0.12, 0.09, 0.05',
 top:()=>'top - 10:42:17 up 1:12,  1 user,  load average: 0.12, 0.09, 0.05\nTasks: 142 total,   1 running, 141 sleeping\n%Cpu(s):  3.1 us,  1.0 sy, 95.5 id\nMiB Mem :   3921.0 total,   1650.2 free\n\n  PID USER      %CPU %MEM COMMAND\n 1432 kali       2.3  4.1 firefox-esr\n  812 root       0.7  1.8 Xorg\n  655 root       0.3  0.5 NetworkManager',
 kill:a=>'',jobs:()=>'',nohup:a=>'nohup: ignoring input and appending output to \'nohup.out\'',alias:()=>"alias ll='ls -l'\nalias la='ls -A'\nalias grep='grep --color=auto'",
 env:()=>'USER=kali\nHOME=/home/kali\nSHELL=/usr/bin/zsh\nLANG=en_US.UTF-8\nPATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',export:()=>'',
 passwd:()=>"passwd: parol o'zgartirilmadi.",crontab:a=>a.includes('-l')?'no crontab for kali':'crontab: bu yerda ishlamaydi',script:()=>'Script started, output log file is \'typescript\'.',
 journalctl:()=>'Oct 17 09:01:02 kali systemd[1]: Started Session 1 of User kali.\nOct 17 09:01:05 kali NetworkManager[612]: <info> device (wlan0): activated\nOct 17 09:12:40 kali sudo[2001]: kali : COMMAND=/usr/bin/nmap 192.168.56.101',
 nslookup:a=>`Server:\t\t192.168.1.1\nAddress:\t192.168.1.1#53\n\nNon-authoritative answer:\nName:\t${a[0]||'example.com'}\nAddress: 93.184.216.34`,whois:a=>`Domain Name: ${(a[0]||'EXAMPLE.COM').toUpperCase()}\nRegistrar: Example Registrar, Inc.\nCreation Date: 1995-08-14`,
 mtr:a=>`Start: ${new Date().toISOString().slice(0,16)}\nHOST: kali                Loss%   Snt   Last   Avg\n  1.|-- 192.168.1.1        0.0%    10    1.2   1.4\n  2.|-- 10.20.0.1          0.0%    10    8.5   9.1\n  3.|-- ${a[0]||'example.com'}   0.0%    10   24.0  25.3`,
 whatweb:a=>lab(a,ip=>`http://${ip} [200 OK] Apache[2.4.54], HTTPServer[Debian Linux], Title[Lab Server]`,'whatweb: nishon kerak. Masalan: whatweb 192.168.56.101'),
 tshark:a=>'Capturing on \'eth0\'\n    1 0.000000 192.168.56.10 → 192.168.56.1 DNS 74 Standard query A example.com\n    2 0.012311 192.168.56.1 → 192.168.56.10 DNS 90 Standard query response\n    3 0.013102 192.168.56.10 → 93.184.216.34 TCP 74 49152 → 443 [SYN]\n3 packets captured',
 openssl:a=>a[0]==='rand'?[...Array(16)].map(()=>Math.floor(Math.random()*256).toString(16).padStart(2,'0')).join(''):a[0]==='version'?'OpenSSL 3.5.0 8 Apr 2025':'openssl: faqat rand va version',
 exiftool:a=>`ExifTool Version Number : 12.76\nFile Name               : ${a[0]||'rasm.jpg'}\nMIME Type               : image/jpeg\nImage Size              : 1280x720\nGPS Position            : 41.311081 N, 69.240562 E `,
 nyx:()=>'nyx: Tor boshqaruv monitori\nTor 0.4.8 | circuits: 3 | bandwidth: 112 KB/s',
 rsync:a=>'sending incremental file list\n\nsent 1,204 bytes  received 35 bytes  2,478.00 bytes/sec',scp:a=>lab(a,ip=>`${a.find(x=>!x.startsWith('-'))||'fayl'}   100%  1204   1.2MB/s   00:00`,'scp: manzil kerak. Masalan: scp fayl.txt ali@192.168.56.101:/tmp/'),
 msfconsole:()=>'Metasploit Framework 6.4\nmsf6 > (interaktiv rejim mavjud emas)',searchsploit:a=>`Exploit Title                                   | Path\n------------------------------------------------ | ---------------------------\n${a[0]||'apache'} 2.4.x - Example   | linux/remote/00000.txt`};
Object.keys(X).forEach(k=>{if(!C[k]||['ping','ssh'].indexOf(k)<0&&!C[k])C[k]=X[k]});
C.ssh=X.ssh;
C.mv=C.mv||(a=>{const ar=a.filter(x=>x[0]!='-');if(ar.length<2)return 'operand yetishmayapti';const s=T.node(ar[0]);if(!s)return `${ar[0]}: fayl topilmadi`;const dn=T.node(ar[1]);const[sp,sk]=T.par(ar[0]);if(dn&&dn.t==='d'){dn.c[baseOf(T.norm(ar[0]))]=s}else{const[p,k]=T.par(ar[1]);if(!p||p.t!=='d')return 'manzil topilmadi';p.c[k]=s}delete sp.c[sk];return ''});
C.wget=C.wget||(a=>{const u=a.find(x=>/^https?:/.test(x));if(!u)return 'wget: URL kerak';const n=u.split('/').filter(Boolean).pop()||'index.html',[p,k]=T.par(n);p.c[k]=f(u+'\n');return `--${new Date().toISOString()}--  ${u}\nSaving to: '${n}'\n\n${n}  100%  1.2K  --.-KB/s in 0s\n\n'${n}' saved [34/34]`});
C.file=C.file||(a=>a.map(p=>{const n=T.node(p);return n?`${p}: ${n.t==='d'?'directory':'ASCII text'}`:`${p}: fayl topilmadi`}).join('\n'));
C.strings=C.strings||((a,i)=>{const n=a[0]&&T.node(a[0]);return n&&n.t==='f'?n.v.split('\n').filter(x=>x.length>3).join('\n'):'fayl topilmadi'});
C.hexdump=C.hexdump||(a=>{const n=T.node(a.filter(x=>x[0]!='-')[0]||'');if(!n||n.t!=='f')return 'fayl topilmadi';const by=[...new TextEncoder().encode(n.v)];let o='';for(let i=0;i<by.length;i+=16){const c=by.slice(i,i+16);o+=i.toString(16).padStart(8,'0')+'  '+c.map(x=>x.toString(16).padStart(2,'0')).join(' ').padEnd(48)+' |'+c.map(x=>x>31&&x<127?String.fromCharCode(x):'.').join('')+'|\n'}return o.trimEnd()});
C.locate=C.locate||(a=>{const q=a[0];if(!q)return 'locate: nom kerak';const r=[];(function w(n,p){for(const k in n.c){const q2=join(p,k);if(k.includes(q))r.push(q2);if(n.c[k].t==='d')w(n.c[k],q2)}})(T.fs,'/');return r.join('\n')||'topilmadi'});
C.ln=C.ln||(a=>{const ar=a.filter(x=>x[0]!='-');const s=T.node(ar[0]);if(!s||s.t!=='f')return `${ar[0]}: fayl topilmadi`;const[p,k]=T.par(ar[1]||'');if(!p)return 'manzil topilmadi';p.c[k]=f(s.v);return ''});
C.mat2=C.mat2||(a=>{const s=a[0]&&T.node(a[0]);if(!s||s.t!=='f')return 'fayl topilmadi';const n=a[0].replace(/(\.[^.]+)?$/,'.cleaned$1'),[p,k]=T.par(n);p.c[k]=f(s.v);return `[+] Cleaning ${a[0]}\n[+] ${n} created`});
C.nano=a=>{const p=a.filter(x=>x[0]!='-')[0];if(!p)return 'nano: fayl nomi kerak. Masalan: nano notes.txt';let n=T.node(p);if(!n){const[pp,k]=T.par(p);if(!pp||pp.t!=='d')return `nano: ${p}: papka topilmadi`;pp.c[k]=f('');n=pp.c[k]}if(n.t!=='f')return `nano: ${p}: bu fayl emas`;if(!root.classList.contains('on'))return "nano: matn muharriri faqat 🖥 Kali Desktop ichida ochiladi (Sozlamalar → Kali Desktop).";openEditor(T.norm(p));return ''};
DK.CATS.forEach(c=>c[1].forEach(t=>{if(!C[t])C[t]=a=>`Usage: ${t} [OPTIONS] <target>`}));
})();
