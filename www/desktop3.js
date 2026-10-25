/* Kali Maktab Desktop 3-bosqich: PDF/hujjat ko'rgich, rasm ko'rgich, kalkulyator, tizim monitori, soxta Network (Wi-Fi, Bluetooth, portlar, trafik). */
(()=>{
const T=window.kmsT,DK=window.kmsDK;if(!T||!DK||!DK.dlg)return;
const {win,E,tst,root,st,icons}=DK,$=(s,r)=>(r||root).querySelector(s);
const LG=k=>{try{return localStorage.getItem(k)}catch(e){return null}},LS=(k,v)=>{try{localStorage.setItem(k,v);return true}catch(e){return false}};
const rnd=(a,b)=>Math.floor(Math.random()*(b-a+1))+a,pick=a=>a[rnd(0,a.length-1)];
const CSS=`
#kdsk .iv{display:flex;flex-direction:column;height:100%;background:#1a2133}
#kdsk .vw{display:flex;flex-direction:column;height:100%;background:#525659}
#kdsk .vw .vtb{display:flex;align-items:center;gap:4px;padding:0 8px;height:46px;background:#323639;color:#e8eaed;flex:none;box-shadow:0 1px 4px rgba(0,0,0,.55);z-index:2;font:13px Inter,system-ui,sans-serif}
#kdsk .vw .vtb button{width:32px;height:32px;border:0;border-radius:50%;background:none;color:#e8eaed;display:flex;align-items:center;justify-content:center;padding:0;margin:0;flex:none}
#kdsk .vw .vtb button:hover{background:rgba(255,255,255,.13)}
#kdsk .vw .vtb select{flex:1;min-width:0;background:none;color:#e8eaed;border:0;font:500 14px Inter,system-ui,sans-serif;padding:4px 2px;text-overflow:ellipsis;margin:0}
#kdsk .vw .vtb select option{color:#000}
#kdsk .vw .vtb .pn{width:36px;height:26px;box-sizing:border-box;background:#202124;color:#e8eaed;border:1px solid #5f6368;border-radius:4px;text-align:center;font:13px Inter,system-ui,sans-serif;padding:0;margin:0;outline:0}
#kdsk .vw .vtb .pn:focus{border-color:#8ab4f8}
#kdsk .vw .vtb .pt{color:#bdc1c6;white-space:nowrap;margin-left:2px}
#kdsk .vw .vtb .zl{min-width:46px;text-align:center;color:#e8eaed;font-size:12.5px;cursor:pointer}
#kdsk .vw .vtb .sp{width:1px;height:22px;background:#5f6368;margin:0 3px;flex:none}
#kdsk .vb{flex:1;overflow:auto;background:#525659;padding:10px 0 14px;text-align:center;position:relative}
#kdsk .vb canvas{max-width:none;box-shadow:0 1px 4px rgba(0,0,0,.55)}
#kdsk .vb .pgw{margin:0 auto 10px;position:relative;box-shadow:0 1px 4px rgba(0,0,0,.55);background:#fff}
#kdsk .vb .pgi{width:595px;height:842px;background:#fff;color:#1b1f24;transform-origin:0 0;position:absolute;left:0;top:0;text-align:left;overflow:hidden;font-family:"Helvetica Neue",Arial,"Liberation Sans",system-ui,sans-serif}
#kdsk .vb .pgi .hd{position:absolute;left:48px;right:48px;top:24px;display:flex;justify-content:space-between;font-size:9px;color:#6b7280;border-bottom:.6px solid #d1d5db;padding-bottom:4px}
#kdsk .vb .pgi .ft{position:absolute;left:0;right:0;bottom:24px;text-align:center;font-size:9.5px;color:#6b7280}
#kdsk .vb .pgi .bdy{position:absolute;left:48px;top:56px;width:499px;height:730px;overflow:hidden}
#kdsk .vb .mz{position:absolute;visibility:hidden;left:-4000px;top:0;width:499px}
#kdsk .vb .bdy,#kdsk .vb .mz{font:12px/1.5 "Helvetica Neue",Arial,"Liberation Sans",system-ui,sans-serif;color:#1b1f24}
#kdsk .vb .bk{padding-bottom:9px;box-sizing:content-box}
#kdsk .vb .chap{padding:10px 0 16px;border-bottom:2px solid #1d4ed8;margin-bottom:14px}
#kdsk .vb .chap small{display:block;font-size:10px;letter-spacing:2px;color:#6b7280;font-weight:600}
#kdsk .vb .chap h2{margin:2px 0 0;font-size:27px;line-height:1.15;color:#0f2a5c;font-weight:700}
#kdsk .vb .sh{padding:6px 0 4px}
#kdsk .vb .sh span{display:inline-block;background:#1d4ed8;color:#fff;font-size:11px;font-weight:700;letter-spacing:1px;padding:3px 10px;border-radius:3px}
#kdsk .vb .cn{font:700 13.5px "Liberation Mono","DejaVu Sans Mono",Consolas,monospace;color:#0f2a5c}
#kdsk .vb .cd{font-size:11.5px;color:#374151;margin:1px 0 5px}
#kdsk .vb .cx{background:#f6f8fa;border:1px solid #e1e4e8;border-left:3px solid #1d4ed8;border-radius:3px;padding:5px 9px}
#kdsk .vb .cl{font:11px/1.55 "Liberation Mono","DejaVu Sans Mono",Consolas,monospace;color:#111;white-space:pre-wrap;word-break:break-all}
#kdsk .vb .cl .pr{color:#1d4ed8;font-weight:700}
#kdsk .vb .cl .cc{color:#6b7280;margin-left:14px;font-style:italic}
#kdsk .vb .rw{display:grid;grid-template-columns:56% 44%;gap:8px;padding:3px 7px;border-bottom:.6px solid #e5e7eb;font-size:10.5px;line-height:1.4;box-sizing:border-box;padding-bottom:3px}
#kdsk .vb .rw.z{background:#f6f8fa}
#kdsk .vb .rw code{font:10.5px/1.4 "Liberation Mono","DejaVu Sans Mono",Consolas,monospace;color:#0f2a5c;background:none;word-break:break-all;padding:0}
#kdsk .vb .rw span{color:#374151}
#kdsk .vb .rh{background:#e8eefc;font-weight:700;font-size:9.5px;letter-spacing:1px;text-transform:uppercase;color:#1e3a8a}
#kdsk .vb .ttl{padding:6px 0 14px;border-bottom:2px solid #1d4ed8;margin-bottom:10px}
#kdsk .vb .ttl .k{font-size:10px;letter-spacing:3px;color:#6b7280;font-weight:700}
#kdsk .vb .ttl h1{margin:2px 0 2px;font-size:30px;color:#0f2a5c;line-height:1.1}
#kdsk .vb .ttl .s{font-size:11.5px;color:#4b5563}
#kdsk .vb .ln{font:11px/1.45 "Liberation Mono","DejaVu Sans Mono",Consolas,monospace;white-space:pre-wrap;padding-bottom:0}
#kdsk .vb .tr{display:flex;align-items:baseline;gap:6px;font-size:12.5px;padding:3px 0}
#kdsk .vb .tr i{flex:1;border-bottom:1px dotted #9ca3af;transform:translateY(-3px)}
#kdsk .vb .tr b{font-weight:600;color:#0f2a5c}
#kdsk .vb .cv{position:absolute;left:0;top:0;right:0;bottom:0;display:flex;flex-direction:column;justify-content:center;padding:0 64px;background:linear-gradient(160deg,#0a1630,#123a80);color:#fff}
#kdsk .vb .cv .k{font-size:15px;letter-spacing:6px;font-weight:700;margin-top:26px;color:#9cc2ff}
#kdsk .vb .cv h1{font-size:54px;font-weight:300;margin:6px 0 10px;line-height:1.05}
#kdsk .vb .cv .s{font-size:15px;color:#c7d6f2}
#kdsk .vb .cv .f{position:absolute;left:64px;right:64px;bottom:48px;font-size:10.5px;color:#9fb4d9;border-top:1px solid rgba(255,255,255,.25);padding-top:10px}
#kdsk .ib{flex:1;overflow:auto;background:#0b0f18;display:flex}
#kdsk .ib img{margin:auto;display:block}
#kdsk .ig{display:flex;gap:4px;padding:4px;overflow-x:auto;background:#182036;flex:none}
#kdsk .ig img{height:46px;width:46px;object-fit:cover;border-radius:6px;border:2px solid transparent;flex:none}
#kdsk .ig img.s{border-color:#5aa0ff}
#kdsk .ca{padding:8px;background:#161c2b;height:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:6px}
#kdsk .ca input{background:#0b0f18;border:1px solid #3a4560;color:#fff;border-radius:8px;font:22px monospace;text-align:right;padding:10px;width:100%;box-sizing:border-box}
#kdsk .ca .bs{font:11px monospace;color:#8fb;text-align:right;min-height:14px}
#kdsk .ca .kp{flex:1;display:grid;grid-template-columns:repeat(4,1fr);gap:5px}
#kdsk .ca .kp button{background:#2d3a58;border:0;color:#fff;border-radius:8px;font:18px sans-serif;min-height:38px}
#kdsk .ca .kp button.o{background:#3b5ba5}#kdsk .ca .kp button.e{background:#1f8a4c}
#kdsk .mo{padding:8px;height:100%;box-sizing:border-box;overflow:auto;background:#101626;font:12px monospace}
#kdsk .mo canvas{width:100%;height:110px;background:#0a0e18;border-radius:6px;display:block;margin-bottom:6px}
#kdsk .mo table,#kdsk .nt table{width:100%;border-collapse:collapse}
#kdsk .mo td,#kdsk .mo th,#kdsk .nt td,#kdsk .nt th{padding:3px 6px;text-align:left;border-bottom:1px solid #26314a}
#kdsk .nt{display:flex;flex-direction:column;height:100%;background:#161c2b}
#kdsk .nt .ntabs{display:flex;background:#202a40;flex:none}
#kdsk .nt .ntabs button{flex:1;background:none;border:0;color:#9ab;padding:9px 2px;border-bottom:2px solid transparent}
#kdsk .nt .ntabs button.on{color:#fff;border-color:#5aa0ff}
#kdsk .nt .pn2{flex:1;overflow:auto;padding:10px}
#kdsk .nt .row{display:flex;align-items:center;gap:8px;padding:10px 8px;border-bottom:1px solid #26314a;border-radius:6px}
#kdsk .nt .row:active{background:rgba(255,255,255,.1)}
#kdsk .nt .row span.g{flex:1}#kdsk .nt .row small{display:block;color:#8aa}
#kdsk .nt .sw{display:flex;align-items:center;justify-content:space-between;padding:6px 4px 10px}
#kdsk .nt .sw button,#kdsk .nt .bt2{background:#2c4f8f;border:0;color:#fff;border-radius:14px;padding:6px 14px}
#kdsk .nt canvas{width:100%;height:150px;background:#0a0e18;border-radius:8px;display:block}
#kdsk .nt pre{font:11px/1.35 monospace;color:#7fe0a0;margin:6px 0 0;height:120px;overflow:hidden;white-space:pre}`;
document.head.appendChild(Object.assign(document.createElement('style'),{textContent:CSS}));

/* ---------- ichki hujjatlar (darslik / shpargalka) ---------- */
function docText(kind){let o='',last='';
  T.D.forEach(x=>{if(!x||!x.n||!x.x||!x.x.length)return;if(x.c!==last){last=x.c;o+=`\n=== ${String(x.c).toUpperCase()} ===\n\n`}
    if(kind==='cheat')o+=`${x.x[0][0].padEnd(34)} # ${x.x[0][1]}\n`;
    else o+=`${x.n}\n  ${x.d}\n`+x.x.map(e=>`    $ ${e[0]}   # ${e[1]}`).join('\n')+'\n\n'});
  return (kind==='cheat'?'KALI MAKTAB: SHPARGALKA\n(har bir buyruq uchun asosiy misol)\n':'KALI MAKTAB: DARSLIK\n(buyruqlar, izohlar va misollar)\n')+o}
{const ver='2',dn=T.node('/home/kali/Documents');
 if(LG('kd_docs')!==ver&&dn&&dn.t==='d'){dn.c['Kali_Shpargalka.pdf']=T.f(docText('cheat'));dn.c['Kali_Darslik.pdf']=T.f(docText('book'));LS('kd_docs',ver);DK.flush&&DK.flush()}}

/* ---------- hujjat / PDF ko'rgich ---------- */
let pdfjs=null;
function loadPdfjs(){if(window.pdfjsLib)return Promise.resolve(window.pdfjsLib);if(pdfjs)return pdfjs;
  return pdfjs=new Promise((res,rej)=>{const s=document.createElement('script'),B='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/';s.src=B+'pdf.min.js';
    s.onload=()=>{pdfjsLib.GlobalWorkerOptions.workerSrc=B+'pdf.worker.min.js';res(pdfjsLib)};s.onerror=()=>{pdfjs=null;rej(new Error('offline'))};document.head.appendChild(s)})}
const wrap=(t,n)=>{const o=[];String(t).split('\n').forEach(l=>{while(l.length>n){let i=l.lastIndexOf(' ',n);if(i<n*.5)i=n;o.push(l.slice(0,i));l=l.slice(i).trimStart()}o.push(l)});return o};
const b64=d=>{const s=atob(d.split(',')[1]),u=new Uint8Array(s.length);for(let i=0;i<s.length;i++)u[i]=s.charCodeAt(i);return u};
const A4W=595,A4H=842,BH=730;
const vi=k=>`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${{open:'<path d="M3 7h6l2 2h10v10H3z"/>',up:'<path d="M6 15l6-6 6 6"/>',down:'<path d="M6 9l6 6 6-6"/>',minus:'<path d="M5 12h14"/>',plus:'<path d="M12 5v14M5 12h14"/>'}[k]}</svg>`;
const cap=s=>{s=String(s).toLowerCase();return s.charAt(0).toUpperCase()+s.slice(1)};
function parseDoc(text){
  const L=String(text).split('\n'),h=L[0]||'';
  const kind=/^KALI MAKTAB: DARSLIK/.test(h)?'book':/^KALI MAKTAB: SHPARGALKA/.test(h)?'cheat':'text';
  const P={kind,sub:'',blocks:[]};
  if(kind==='text'){P.blocks=wrap(text,92).map(x=>({t:'ln',x}));return P}
  P.sub=/^\(.*\)$/.test(L[1]||'')?L[1].slice(1,-1):'';
  let cur=null,si=0,z=0;
  for(let i=2;i<L.length;i++){const l=L[i];if(!l.trim())continue;let m;
    if(m=/^=== (.+) ===$/.exec(l)){si++;z=0;cur=null;P.blocks.push({t:'sec',x:m[1],i:si});if(kind==='cheat')P.blocks.push({t:'rowh'});continue}
    if(kind==='book'){
      if(/^ {4}\$ /.test(l)){const s=l.slice(6),k=s.indexOf('   # ');if(cur)cur.ex.push(k<0?[s,'']:[s.slice(0,k),s.slice(k+5)]);continue}
      if(/^ {2}\S/.test(l)){if(cur)cur.d+=(cur.d?' ':'')+l.trim();continue}
      cur={t:'cmd',n:l.trim(),d:'',ex:[]};P.blocks.push(cur)}
    else{const k=l.search(/\s# /);const c=k<0?l.trim():l.slice(0,k).trim(),mm=k<0?'':l.slice(k).trim().replace(/^#\s?/,'');P.blocks.push({t:'row',c,m:mm,z:(z++)%2})}}
  return P}
function bhtml(b,P){
  if(b.t==='sec')return P.kind==='book'?`<div class="bk chap"><small>${b.i}-BOB</small><h2>${E(cap(b.x))}</h2></div>`:`<div class="bk sh"><span>${E(b.x)}</span></div>`;
  if(b.t==='cmd')return `<div class="bk"><div class="cn">${E(b.n)}</div>${b.d?`<div class="cd">${E(b.d)}</div>`:''}${b.ex.length?`<div class="cx">${b.ex.map(e=>`<div class="cl"><span class="pr">$</span> ${E(e[0])}${e[1]?`<span class="cc"># ${E(e[1])}</span>`:''}</div>`).join('')}</div>`:''}</div>`;
  if(b.t==='rowh')return `<div class="bk rw rh"><span>Buyruq</span><span>Izoh</span></div>`;
  if(b.t==='row')return `<div class="bk rw${b.z?' z':''}"><code>${E(b.c)}</code><span>${E(b.m)}</span></div>`;
  if(b.t==='ttl')return `<div class="bk ttl"><div class="k">KALI MAKTAB</div><h1>Shpargalka</h1><div class="s">${E(b.s)}</div></div>`;
  return `<div class="bk ln">${E(b.x)||'&nbsp;'}</div>`}
function openViewer(src){
  const b=document.createElement('div');b.className='vw';
  b.innerHTML=`<div class="vtb"><button data-a="o" title="Open">${vi('open')}</button><select></select><span class="sp"></span><button data-a="p" title="Previous page">${vi('up')}</button><input class="pn" value="1" inputmode="numeric"><span class="pt">/ 0</span><button data-a="n" title="Next page">${vi('down')}</button><span class="sp"></span><button data-a="m" title="Zoom out">${vi('minus')}</button><span class="zl" title="Fit to width">100%</span><button data-a="l" title="Zoom in">${vi('plus')}</button></div><div class="vb"></div><input type="file" accept=".pdf,application/pdf" hidden>`;
  const vb=$('.vb',b),sel=$('select',b),pn=$('.pn',b),pt=$('.pt',b),zl=$('.zl',b),fi=$('input[type=file]',b);
  const docs=[['Shpargalka',()=>docText('cheat')],['Darslik',()=>docText('book')]];
  sel.innerHTML=docs.map((d,i)=>`<option value="${i}">${d[0]}.pdf</option>`).join('');
  let mode='t',cur=0,pdf=null,zoom=1,title='',htmls=[],pEls=[],lastW=0;
  const total=()=>mode==='t'?htmls.length:(pdf?pdf.numPages:0);
  const setTxt=(name,text)=>{mode='t';pdf=null;title=name;src={text};cur=0;zoom=1;build()};
  function build(){
    const P=parseDoc(src.text),nm=String(title||'').replace(/\.pdf$/i,''),run=P.kind==='book'?'Kali Maktab — Darslik':P.kind==='cheat'?'Kali Maktab — Shpargalka':nm;
    const bl=P.blocks.slice();if(P.kind==='cheat')bl.unshift({t:'ttl',s:P.sub});
    vb.innerHTML='';const mz=document.createElement('div');mz.className='mz';mz.innerHTML=bl.map(x=>bhtml(x,P)).join('');vb.appendChild(mz);
    const hs=[...mz.children].map((e,i)=>e.offsetHeight+(bl[i].t==='sec'?14:bl[i].t==='ttl'?10:0));mz.remove();
    const secAt=[];let sc='';bl.forEach((x,i)=>{if(x.t==='sec')sc=x.x;secAt[i]=sc});
    const pages=[];let cp=[],h=0;
    const flush=()=>{if(cp.length)pages.push(cp)};
    bl.forEach((x,i)=>{const brk=x.t==='sec'&&P.kind==='book';
      if(cp.length&&(brk||h+hs[i]>BH)){let carry=[];
        if(!brk)while(cp.length>1&&(bl[cp[cp.length-1]].t==='sec'||bl[cp[cp.length-1]].t==='rowh'))carry.unshift(cp.pop());
        flush();cp=carry;h=carry.reduce((a,j)=>a+hs[j],0)}
      cp.push(i);h+=hs[i]});flush();
    const secs=[];pages.forEach((p,pi)=>p.forEach(i=>{if(bl[i].t==='sec')secs.push([bl[i],pi])}));
    const tocN=P.kind==='book'?Math.max(1,Math.ceil(secs.length/30)):0,off=P.kind==='book'?1+tocN:0;
    const wrapPg=(inner,n,sec)=>`<div class="hd"><span>${E(run)}</span><span>${E(sec?(P.kind==='book'?cap(sec):sec):'')}</span></div><div class="bdy">${inner}</div><div class="ft">${n}</div>`;
    htmls=[];
    if(P.kind==='book'){
      htmls.push(`<div class="cv">${window.kmsSvg?window.kmsSvg('kali',84):''}<div class="k">KALI MAKTAB</div><h1>Darslik</h1><div class="s">${E(P.sub)}</div><div class="f">Kali Linux terminal buyruqlari bo‘yicha o‘quv qo‘llanma · faqat lab tarmog‘ida ishlating</div></div>`);
      for(let t=0;t<tocN;t++){const part=secs.slice(t*30,t*30+30);
        htmls.push(wrapPg((t===0?`<div class="bk chap"><small>MUNDARIJA</small><h2>Mundarija</h2></div>`:'')+part.map(s=>`<div class="tr"><span>${s[0].i}. ${E(cap(s[0].x))}</span><i></i><b>${s[1]+off+1}</b></div>`).join(''),htmls.length+1,'Mundarija'))}}
    pages.forEach(p=>htmls.push(wrapPg(p.map(i=>bhtml(bl[i],P)).join(''),htmls.length+1,secAt[p[0]])));
    renderPages();show()}
  function renderPages(){
    const keep=cur;vb.innerHTML='';lastW=vb.clientWidth;const sc=Math.max(.25,(vb.clientWidth-16)/A4W*zoom);pEls=[];
    htmls.forEach(h=>{const w=document.createElement('div');w.className='pgw';w.style.cssText=`width:${A4W*sc}px;height:${A4H*sc}px`;w.innerHTML=`<div class="pgi" style="transform:scale(${sc})">${h}</div>`;vb.appendChild(w);pEls.push(w)});
    zl.textContent=Math.round(zoom*100)+'%';goPage(keep,true)}
  function goPage(i,quiet){i=Math.max(0,Math.min(i,total()-1));cur=i;pn.value=i+1;pt.textContent='/ '+total();if(mode==='t'&&pEls[i])vb.scrollTop=pEls[i].offsetTop-8}
  vb.addEventListener('scroll',()=>{if(mode!=='t'||!pEls.length)return;const y=vb.scrollTop+vb.clientHeight*.35;let k=0;for(let i=0;i<pEls.length;i++){if(pEls[i].offsetTop<=y)k=i;else break}
    if(k!==cur){cur=k;pn.value=k+1}});
  async function show(){pn.value=cur+1;pt.textContent='/ '+total();zl.textContent=Math.round(zoom*100)+'%';
    if(mode==='t')return;
    const page=await pdf.getPage(cur+1),v1=page.getViewport({scale:1}),sc=(vb.clientWidth-16)/v1.width*zoom,v=page.getViewport({scale:sc}),c=document.createElement('canvas');c.width=v.width;c.height=v.height;vb.innerHTML='';vb.appendChild(c);vb.scrollTop=0;await page.render({canvasContext:c.getContext('2d'),viewport:v}).promise}
  async function setPdf(data,name){try{const lib=await loadPdfjs();pdf=await lib.getDocument({data}).promise;mode='p';cur=0;zoom=1;title=name;sel.innerHTML=`<option>${E(name)}</option>`;show()}catch(e){tst("PDF ochilmadi (pdf.js uchun internet kerak): "+e.message)}}
  const w=win('Document Viewer',b,{w:560,h:480});
  sel.onchange=()=>docs[sel.value]&&setTxt(docs[sel.value][0]+'.pdf',docs[sel.value][1]());
  const step=d=>{if(mode==='t'){goPage(cur+d)}else{cur=Math.max(0,Math.min(total()-1,cur+d));show()}};
  const zm=z=>{zoom=Math.max(.5,Math.min(3,z));if(mode==='t')renderPages();else show()};
  b.querySelector('.vtb').addEventListener('click',e=>{const t=e.target.closest('[data-a]');
    if(t){const a=t.dataset.a;if(a==='p')step(-1);else if(a==='n')step(1);else if(a==='m')zm(zoom-.15);else if(a==='l')zm(zoom+.15);else if(a==='o')fi.click()}
    else if(e.target===zl)zm(1)});
  pn.addEventListener('keydown',e=>{if(e.key==='Enter'){const n=(parseInt(pn.value,10)||1)-1;if(mode==='t')goPage(n);else{cur=Math.max(0,Math.min(total()-1,n));show()}pn.blur()}});
  pn.addEventListener('focus',()=>setTimeout(()=>pn.select(),0));
  fi.onchange=async()=>{const f=fi.files[0];if(!f)return;setPdf(new Uint8Array(await f.arrayBuffer()),f.name)};
  if(src&&src.pdf)setPdf(src.pdf,src.name);else if(src&&src.text!==undefined){sel.innerHTML=`<option>${E(src.name||'document')}</option>`+sel.innerHTML;sel.selectedIndex=0;setTxt(src.name,src.text)}else{sel.value=0;setTxt('Shpargalka.pdf',docs[0][1]())}
  new ResizeObserver(()=>{if(mode==='t'&&htmls.length&&Math.abs(vb.clientWidth-lastW)>4)renderPages()}).observe(vb)}
DK.docs=()=>openViewer();

/* ---------- rasm ko'rgich ---------- */
function openImg(url){
  const b=document.createElement('div');b.className='iv';
  b.innerHTML=`<div class="fb"><button data-a="o">📂</button><button data-a="i">⊕</button><button data-a="d">⊖</button><button data-a="f">Fit</button><span style="font:12px monospace;color:#9ab" class="z"></span></div><div class="ib"><img></div><div class="ig"></div><input type="file" accept="image/*" hidden>`;
  const im=$('img',b),ig=$('.ig',b),fi=$('input',b),zl=$('.z',b);let z=1;
  const G=['wall.jpg',...Array.from({length:15},(_,i)=>`icons/p${i}.jpg`)];
  ig.innerHTML=G.map(g=>`<img src="${g}" data-g="${g}">`).join('');
  const show=u=>{im.src=u;z=1;ap();ig.querySelectorAll('img').forEach(x=>x.classList.toggle('s',x.dataset.g===u))};
  const ap=()=>{im.style.width=(z*100)+'%';im.style.maxWidth=z<=1?'100%':'none';zl.textContent=Math.round(z*100)+'%'};
  ig.onclick=e=>{if(e.target.dataset.g)show(e.target.dataset.g)};
  b.querySelector('.fb').addEventListener('click',e=>{const a=e.target.dataset.a;if(a==='i'){z=Math.min(5,z+.25);ap()}else if(a==='d'){z=Math.max(.25,z-.25);ap()}else if(a==='f'){z=1;ap()}else if(a==='o')fi.click()});
  fi.onchange=()=>{const f=fi.files[0];if(f)show(URL.createObjectURL(f))};
  win('Image Viewer',b,{w:480,h:420});show(url||'wall.jpg')}
DK.images=openImg;

/* ---------- fayl ochish va qurilmadan import ---------- */
DK.openFile=p=>{const n=T.node(p);if(!n||n.t!=='f')return;const v=n.v||'',nm=p.split('/').pop();
  if(/\.pdf$/i.test(nm)){if(v.startsWith('data:application/pdf'))openViewer({pdf:b64(v),name:nm});else openViewer({text:v,name:nm})}
  else if(/\.(png|jpe?g|gif|webp)$/i.test(nm)){if(v.startsWith('data:image'))openImg(v);else tst('Bu rasm fayli emas (bo\'sh yoki matn). "Import from device" bilan rasm qo\'shing.')}
  else DK.openEditor(p)};
DK.importFile=(dir,done)=>{const fi=document.createElement('input');fi.type='file';fi.onchange=()=>{const f=fi.files[0];if(!f)return;
  const dn=T.node(dir);if(!dn)return;let nm=f.name;if(nm in dn.c)nm=Date.now()%10000+'_'+nm;
  const put=v=>{dn.c[nm]=T.f(v);DK.flush();done&&done();tst('Imported: '+nm)};
  if(/^image\//.test(f.type)){const im=new Image();im.onload=()=>{const k=Math.min(1,900/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=im.width*k;c.height=im.height*k;c.getContext('2d').drawImage(im,0,0,c.width,c.height);put(c.toDataURL('image/jpeg',.75))};im.src=URL.createObjectURL(f)}
  else if(f.type==='application/pdf'||/\.pdf$/i.test(nm)){if(f.size>1.5e6)return tst('PDF juda katta (1.5 MB gacha)');const r=new FileReader();r.onload=()=>put(r.result);r.readAsDataURL(f)}
  else{if(f.size>2e5)return tst('Fayl juda katta (200 KB gacha)');const r=new FileReader();r.onload=()=>put(r.result);r.readAsText(f)}};fi.click()};
DK.textEditor=()=>{const dn=T.node('/home/kali/Documents');if(!dn)return;let i=1,n;do{n=`untitled${i>1?'-'+i:''}.txt`;i++}while(n in dn.c);dn.c[n]=T.f('');DK.flush();DK.openEditor('/home/kali/Documents/'+n)};

/* ---------- kalkulyator ---------- */
function calc(s){s=s.replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-').replace(/\s+/g,'');let i=0;
  const num=()=>{const m=/^(0x[0-9a-f]+|0b[01]+|\d+\.?\d*|\.\d+)/i.exec(s.slice(i));if(!m)throw 0;i+=m[0].length;return Number(m[0])};
  const fac=()=>{if(s[i]==='-'){i++;return -fac()}if(s[i]==='+'){i++;return fac()}let v;
    if(s[i]==='('){i++;v=ex();if(s[i]!==')')throw 0;i++}else if(s.startsWith('sqrt(',i)){i+=5;v=Math.sqrt(ex());if(s[i]!==')')throw 0;i++}else v=num();
    while(s[i]==='%'){i++;v/=100}if(s[i]==='^'){i++;v=Math.pow(v,fac())}return v};
  const tm=()=>{let v=fac();while(s[i]==='*'||s[i]==='/'){const o=s[i++],r=fac();v=o==='*'?v*r:v/r}return v};
  const ex=()=>{let v=tm();while(s[i]==='+'||s[i]==='-'){const o=s[i++],r=tm();v=o==='+'?v+r:v-r}return v};
  const v=ex();if(i!==s.length||!isFinite(v))throw 0;return v}
function openCalc(){
  const b=document.createElement('div');b.className='ca';
  b.innerHTML=`<input inputmode="none" autocomplete="off"><div class="bs"></div><div class="kp"></div>`;
  const inp=$('input',b),bs=$('.bs',b),kp=$('.kp',b);
  const K=['C','⌫','(',')','7','8','9','÷','4','5','6','×','1','2','3','−','0','.','^','+','√','%','0x','='];
  kp.innerHTML=K.map(k=>`<button class="${/[÷×−+^%]/.test(k)?'o':k==='='?'e':''}">${k}</button>`).join('');
  const ev=()=>{try{const v=calc(inp.value);inp.value=String(+v.toPrecision(12));bs.textContent=Number.isInteger(v)&&Math.abs(v)<2**53?`HEX ${v.toString(16).toUpperCase()}  BIN ${v.toString(2)}  OCT ${v.toString(8)}`:''}catch(e){bs.textContent='xato'}};
  kp.onclick=e=>{const k=e.target.textContent;if(e.target.tagName!=='BUTTON')return;
    if(k==='C'){inp.value='';bs.textContent=''}else if(k==='⌫')inp.value=inp.value.slice(0,-1);else if(k==='=')ev();else if(k==='√')inp.value+='sqrt(';else inp.value+=k};
  inp.onkeydown=e=>{if(e.key==='Enter')ev()};
  win('Calculator',b,{w:300,h:420})}

/* ---------- tizim monitori ---------- */
function openMon(){
  const b=document.createElement('div');b.className='mo';b.innerHTML=`<canvas width="400" height="110"></canvas><div class="inf"></div><table class="pt"></table>`;
  const cv=$('canvas',b),cx=cv.getContext('2d'),inf=$('.inf',b),pt=$('.pt',b),N=60,cpu=Array(N).fill(8),ram=Array(N).fill(44);let c0=10,r0=44,up=0;
  const P=['Xorg','firefox-esr','zsh','NetworkManager','python3','sshd','kworker/0:1','nmap'];
  win('System Monitor',b,{w:460,h:420});
  const t=setInterval(()=>{if(!b.isConnected){clearInterval(t);return}
    c0=Math.max(2,Math.min(95,c0+rnd(-8,8)+(Math.random()<.06?rnd(15,35):0)));r0=Math.max(35,Math.min(70,r0+rnd(-1,1)));up++;cpu.push(c0);cpu.shift();ram.push(r0);ram.shift();
    cx.clearRect(0,0,400,110);cx.strokeStyle='#1d2a44';for(let y=0;y<=110;y+=22){cx.beginPath();cx.moveTo(0,y);cx.lineTo(400,y);cx.stroke()}
    [[cpu,'#4ade80'],[ram,'#60a5fa']].forEach(([a,col])=>{cx.strokeStyle=col;cx.lineWidth=2;cx.beginPath();a.forEach((v,i)=>{const x=i*400/(N-1),y=110-v*1.1;i?cx.lineTo(x,y):cx.moveTo(x,y)});cx.stroke()});
    inf.innerHTML=`<span style="color:#4ade80">■ CPU ${c0}%</span>  <span style="color:#60a5fa">■ RAM ${r0}% (${(3921*r0/100|0)} / 3921 MiB)</span><br>Uptime: ${Math.floor(up/60)}m ${up%60}s · load ${(c0/60).toFixed(2)} · ↓ ${rnd(10,900)} KB/s ↑ ${rnd(2,120)} KB/s<br><br>`;
    const rows=P.map(n=>[n,Math.max(0,c0*Math.random()*(n==='nmap'?0.15:.6)).toFixed(1),(Math.random()*5+(n==='firefox-esr'?8:.5)).toFixed(1)]).sort((a,b)=>b[1]-a[1]).slice(0,6);
    pt.innerHTML='<tr><th>Process</th><th>CPU%</th><th>MEM%</th></tr>'+rows.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')},1000)}

/* ---------- Network: Wi-Fi, Bluetooth, portlar, trafik ---------- */
const SSIDS=['KaliNet_5G','LabWiFi','Maktab_Guest','Cafe_Free','TP-Link_A4F2','HUAWEI-9C31','Beeline_Home','UzOnline_77','Xiaomi_Mi8','DIRECT-roku','AndroidAP_12'];
const PW={KaliNet_5G:'kali1234',LabWiFi:'kalimaktab',Maktab_Guest:'guest2026'};
const SV=(k,n)=>window.kmsSvg?window.kmsSvg(k,n):'',SG=d=>window.kmsSig?window.kmsSig(d):'';
const BT=[['JBL Flip 5','speaker'],['Redmi Buds 4','headset'],['Kali-Phone','phone'],['Logitech K380','kbd'],['Mi Band 7','watch'],['Car Audio','car'],['Galaxy Tab S8','tablet']];
const WMAC='02:42:ac:11:00:02',HMAC='00:1A:7D:DA:71:13';
const hash=t=>{let h=0;for(const c of t)h=(h*31+c.charCodeAt(0))>>>0;return h};
const OUI=['F4:F2:6D','C8:3A:35','4C:ED:FB','A4:2B:B0','50:C7:BF','E8:94:F6'];
function nfo(n){const h=hash(n),ch=[1,6,11,36,40,44,149,157][h%8],g5=ch>14;return{ch,fr:g5?5000+ch*5:2407+ch*5,rate:g5?[433,866,1300][h%3]:[54,144,300][h%3],bssid:OUI[h%6]+':'+[h>>>8,h>>>16,h>>>4].map(v=>(v&255).toString(16).padStart(2,'0').toUpperCase()).join(':')}}
const SVC={ssh:['sshd',611,'0.0.0.0'],http:['apache2',824,'*'],ipp:['cupsd',702,'127.0.0.1'],'http-proxy':['java',1190,'0.0.0.0'],dhcpc:['dhclient',503,'0.0.0.0']};
const mac=()=>Array.from({length:6},()=>rnd(0,255).toString(16).padStart(2,'0').toUpperCase()).join(':');
function openNet(tab0){
  const b=document.createElement('div');b.className='nt';
  b.innerHTML=`<div class="ntabs"><button data-t="w">${SV('wifi',16)}Wi-Fi</button><button data-t="b">${SV('bt',15)}Bluetooth</button><button data-t="p">${SV('ports',16)}Ports</button><button data-t="t">${SV('activity',16)}Traffic</button></div><div class="pn2"></div>`;
  const pn=$('.pn2',b);let tab=tab0||'w',nets=[],btd=[],timers=[],paired=JSON.parse(LG('kd_btp')||'[]'),conn=LG('kd_btc')||'',ports=JSON.parse(LG('kd_ports')||'null')||[[22,'tcp','ssh',1],[80,'tcp','http',0],[631,'tcp','ipp',1],[8080,'tcp','http-proxy',0],[68,'udp','dhcpc',1]];
  const clear=()=>{timers.forEach(t=>{clearInterval(t);clearTimeout(t)});timers=[]};
  function scanW(){nets=[...SSIDS].sort(()=>Math.random()-.5).slice(0,rnd(6,9)).map(n=>({n,s:-rnd(34,86),sec:n==='Cafe_Free'?'OPN':pick(['WPA2','WPA2','WPA3'])}));{const i=nets.findIndex(x=>x.n===st.ssid);if(i<0)nets[0]={n:st.ssid,s:-rnd(38,52),sec:'WPA2'};else{nets[i].s=-rnd(38,52);nets[i].sec='WPA2'}}nets.sort((a,b)=>b.s-a.s)}
  const sw=(on,id,sub)=>`<div class="sw"><span class="ttl">${SV(id==='w'?'wifi':'bt',20)}<b>${id==='w'?'Wi-Fi':'Bluetooth'}</b><small>${sub}</small></span><button class="tg${on?' on':''}" data-sw="${id}" aria-label="toggle">${on?'ON':'OFF'}</button></div>`;
  function $$(){b.querySelectorAll(".ntabs button").forEach(x=>x.classList.toggle('on',x.dataset.t===tab));
    if(tab==='w'){if(!nets.length)scanW();pn.innerHTML=sw(st.wf,'w','wlan0 · '+WMAC)+(st.wf?nets.map(x=>{const i=nfo(x.n),pct=Math.max(1,Math.min(100,2*(x.s+100))),cn=x.n===st.ssid;
        return `<div class="row${cn?' cn':''}" data-n="${E(x.n)}">${SG(x.s)}<span class="g">${E(x.n)}<small>${x.sec==='OPN'?'Open':x.sec} · ${i.fr} MHz · Ch ${i.ch} · ${i.rate} Mbit/s</small><small>${i.bssid} · ${pct}% · ${x.s} dBm</small>${cn?'<small class="ip">Connected · wlan0 · 192.168.1.23/24 · gw 192.168.1.1 · dns 192.168.1.1</small>':''}</span>${x.sec==='OPN'?'':SV('lock',15)}${cn?SV('check',18):''}</div>`}).join('')+'<button class="bt2" data-a="rs" style="margin-top:10px">Rescan</button>':'<p class="mu">Wi-Fi is disabled.</p>')}
    else if(tab==='b'){pn.innerHTML=sw(st.bt,'b','hci0 · '+HMAC)+(st.bt?`<div class="mu s">${btd.length?'Devices':'Searching…'}</div>`+btd.map(x=>`<div class="row" data-m="${x[2]}">${SV(x[1],28)}<span class="g">${E(x[0])}<small>${x[2]} · RSSI ${x[3]} dBm</small>${conn===x[2]?'<small class="ip">Connected</small>':paired.includes(x[2])?'<small class="ip">Paired · Trusted</small>':''}</span>${conn===x[2]?SV('check',18):''}</div>`).join('')+'<button class="bt2" data-a="rb" style="margin-top:10px">Search</button>':'<p class="mu">Bluetooth is disabled.</p>');
      if(st.bt&&!btd.length)scanB()}
    else if(tab==='p'){pn.innerHTML=`<div class="ttl2">Listening sockets <small>ss -tulpn</small></div><div class="pkw"><table class="ss"><tr><th>Netid</th><th>State</th><th>Local Address:Port</th><th>Process</th><th></th></tr>${ports.map((p,i)=>{const v=SVC[p[2]]||['?',0,'0.0.0.0'];return `<tr class="${p[3]?'':'dim'}" data-i="${i}"><td>${p[1]}</td><td>${p[3]?(p[1]==='udp'?'UNCONN':'LISTEN'):'—'}</td><td>${v[2]}:${p[0]}</td><td>${p[3]?v[0]+','+v[1]:'—'}</td><td><button class="tg${p[3]?' on':''}" data-pi="${i}" aria-label="toggle">${p[3]?'open':'closed'}</button></td></tr>`}).join('')}</table></div><p class="mu s">Tap a switch to open or close a port.</p><div class="ttl2" style="margin-top:14px">Lab VM <small>192.168.56.101</small></div><div class="pkw"><pre class="nm">$ nmap -sV 192.168.56.101\nNmap scan report for 192.168.56.101\nHost is up (0.0012s latency).\nPORT     STATE    SERVICE VERSION\n22/tcp   open     ssh     OpenSSH 8.4p1 Debian 5 (protocol 2.0)\n80/tcp   open     http    Apache httpd 2.4.54 ((Debian))\n3306/tcp filtered mysql\nMAC Address: 08:00:27:3E:5A:1C (Oracle VirtualBox virtual NIC)\nService Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel</pre></div>`}
    else{pn.innerHTML='<canvas width="420" height="150"></canvas><div class="ct2" style="font:12px monospace;padding:6px 0"></div><div class="pkw"><div class="pk h">No.  Time      Source           Destination      Protocol Len  Info</div><div class="pl2"></div></div>';trafficRun()}}
  function scanB(){btd=[];const pool=[...BT].sort(()=>Math.random()-.5).slice(0,rnd(3,5)).map(x=>[x[0],x[1],mac(),-rnd(38,82)]);pool.forEach((d,i)=>timers.push(setTimeout(()=>{if(tab!=='b'||!b.isConnected)return;btd.push(d);const y=pn.scrollTop;$$();pn.scrollTop=y},700*(i+1))))}
  function trafficRun(){const cv=$('canvas',pn),cx=cv.getContext('2d'),ct=$('.ct2',pn),pl=$('.pl2',pn);let ps=[],rx=0,tx=0,log=[],no=0,tt=0;const t0=Date.now(),ME='192.168.1.23',GW='192.168.1.1';
    const HX=()=>rnd(0,65535).toString(16).padStart(4,'0'),HOSTS=['kali.org','http.kali.org','deb.debian.org','example.com','google.com','github.com','mozilla.org'],IPS=['93.184.216.34','142.250.74.14','140.82.121.4','104.18.32.7','1.1.1.1'];
    const P=(c,s,d,pr,l,i)=>({c,s,d,pr,l,i});
    function flow(){const h=pick(HOSTS),ip=pick(IPS),sp=rnd(40000,65000),k=rnd(0,5);
      if(k===0)return [P('dns',ME,GW,'DNS',rnd(70,90),`Standard query 0x${HX()} A ${h}`),P('dns',GW,ME,'DNS',rnd(90,130),`Standard query response 0x${HX()} A ${h} A ${ip}`)];
      if(k===1)return [P('tcp',ME,ip,'TCP',74,`${sp} → 443 [SYN] Seq=0 Win=64240 Len=0 MSS=1460 SACK_PERM`),P('tcp',ip,ME,'TCP',74,`443 → ${sp} [SYN, ACK] Seq=0 Ack=1 Win=65535 Len=0 MSS=1460`),P('tcp',ME,ip,'TCP',66,`${sp} → 443 [ACK] Seq=1 Ack=1 Win=64256 Len=0`)];
      if(k===2)return [P('tls',ME,ip,'TLSv1.3',517,`Client Hello (SNI=${h})`),P('tls',ip,ME,'TLSv1.3',1514,'Server Hello, Change Cipher Spec, Application Data'),P('tls',ME,ip,'TLSv1.3',rnd(100,700),'Application Data')];
      if(k===3)return [P('http',ME,'93.184.216.34','HTTP',rnd(300,420),'GET / HTTP/1.1'),P('http','93.184.216.34',ME,'HTTP',rnd(500,1400),'HTTP/1.1 200 OK  (text/html)')];
      if(k===4)return [P('icmp',ME,GW,'ICMP',98,`Echo (ping) request  id=0x${HX()}, seq=${rnd(1,60)}/256, ttl=64`),P('icmp',GW,ME,'ICMP',98,'Echo (ping) reply    ttl=64')];
      return [P('arp','02:42:ac:11:00:02','Broadcast','ARP',42,`Who has ${GW}? Tell ${ME}`),P('arp','a4:2b:b0:5e:9d:11','02:42:ac:11:00:02','ARP',42,`${GW} is at a4:2b:b0:5e:9d:11`)]}
    timers.push(setInterval(()=>{if(!b.isConnected||tab!=='t'){return}
      if(Math.random()<.5)ps.push({x:60,y:rnd(30,120),v:rnd(3,6),o:1});if(Math.random()<.5)ps.push({x:360,y:rnd(30,120),v:-rnd(3,6),o:0});
      cx.clearRect(0,0,420,150);cx.fillStyle='#4dc2ff';cx.font='13px monospace';cx.fillText('kali',4,18);cx.fillText('internet',336,18);cx.strokeStyle='#2b3550';cx.strokeRect(58,24,304,110);
      ps=ps.filter(p=>p.x>55&&p.x<365);ps.forEach(p=>{p.x+=p.v;cx.fillStyle=p.o?'#60a5fa':'#f59e0b';cx.fillRect(p.x,p.y,7,4);p.o?tx+=rnd(40,900):rx+=rnd(40,1400)});
      ct.textContent=st.wf?`↓ RX ${(rx/1024).toFixed(1)} KB   ↑ TX ${(tx/1024).toFixed(1)} KB   (${st.ssid})`:'Wi-Fi is disabled: no traffic'}
    ,60));
    timers.push(setInterval(()=>{if(!b.isConnected||tab!=='t'||!st.wf)return;flow().forEach(q=>{no++;tt=Math.max(tt+rnd(20,900)/1e5,(Date.now()-t0)/1000);log.push(`<div class="pk ${q.c}">${String(no).padEnd(4)} ${tt.toFixed(6).padStart(9)} ${E(q.s).padEnd(16)} ${E(q.d).padEnd(16)} ${q.pr.padEnd(8)} ${String(q.l).padEnd(4)} ${E(q.i)}</div>`)});while(log.length>12)log.shift();pl.innerHTML=log.join('')},700))}
  b.querySelector(".ntabs").onclick=e=>{const t=e.target.dataset.t;if(t){tab=t;clear();$$()}};
  pn.onclick=e=>{const a=e.target.dataset,r=e.target.closest('.row');
    if(a.sw){const k=a.sw==='w'?'wf':'bt';st[k]=!st[k];LS('kd_'+k,st[k]?'1':'0');icons();if(a.sw==='w')nets=[];btd=[];clear();$$()}
    else if(a.a==='rs'){scanW();$$()}else if(a.a==='rb'){clear();btd=[];$$()}
    else if(a.pi!==undefined){ports[a.pi][3]^=1;LS('kd_ports',JSON.stringify(ports));$$()}
    else if(r&&r.dataset.n){const n=nets.find(x=>x.n===r.dataset.n);if(!n||n.n===st.ssid)return;
      const ok=()=>{st.ssid=n.n;LS('kd_ssid',n.n);tst('Connected: '+n.n);$$()};
      if(n.sec==='OPN')ok();else DK.ask('Password for '+n.n,'',v=>{const pw=PW[n.n]||'wifi'+n.n.length;if(v===pw)ok();else DK.dlg('<b>Authentication failed</b><pre>Noto\'g\'ri parol. (Maslahat: parolni dars buyruqlari bilan topishni mashq qiling, masalan LabWiFi.)</pre>',[['OK']])})}
    else if(r&&r.dataset.m){const m=r.dataset.m;if(conn===m){conn='';LS('kd_btc','')}else{if(!paired.includes(m)){paired.push(m);LS('kd_btp',JSON.stringify(paired))}conn=m;LS('kd_btc',m)}$$()}};
  win('Network',b,{w:460,h:440});$$()}
DK.network=openNet;

/* ---------- menyu va ish stoli ikonkalari ---------- */
const APPS={editor:DK.textEditor,docs:openViewer,imgs:()=>openImg(),calc:openCalc,mon:openMon,net:()=>openNet()};
const mn=$('#kd-mn');
$('[data-a=files]',mn).insertAdjacentHTML('afterend',[['editor','📝 Text Editor'],['docs','📕 Document Viewer'],['imgs','🖼 Image Viewer'],['calc','🧮 Calculator'],['mon','📊 System Monitor'],['net','📡 Network']].map(([a,t])=>`<div class="ct" data-a="${a}">${t}</div>`).join(''));
mn.addEventListener('click',e=>{const a=e.target.dataset&&e.target.dataset.a;if(a&&APPS[a]){e.stopPropagation();mn.classList.remove('on');APPS[a]()}},true);
const ic=$('#kd-ic');
[['📡','Network','net'],['📊','Monitor','mon'],['🧮','Calc','calc'],['📕','Docs','docs']].forEach(([i,n,a])=>{const d=document.createElement('div');d.innerHTML=`<b>${i}</b>${n}`;let last=0;
  d.onclick=()=>{ic.querySelectorAll('.sel').forEach(x=>x.classList.remove('sel'));d.classList.add('sel');const now=Date.now();if(now-last<450){APPS[a]();d.classList.remove('sel')}last=now};ic.appendChild(d)});
})();
