/* Kali Maktab: robotning erkin harakati — oynadan oynaga sakrash, yurish, yugurish,
   hissiyotlar. Harakatlar tasodifiy, lekin ko'pincha foydalanuvchi harakatiga bog'liq
   (bosilgan joy, terminalda yozish, sichqoncha, robot hissiyoti). */
(function(){
const rb=document.getElementById('rb'),R=window.RBX;if(!rb||!R||typeof S==='undefined')return;
const rnd=(a,b)=>a+Math.random()*(b-a),pick=a=>a[Math.floor(Math.random()*a.length)],cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const CANCEL={};let tok=0,myTok=0,busy=false,cur='',plat=null,lastIn=Date.now(),nextAct=Date.now()+4500,focusT=0,pend=null,ownUntil=0,lookT=0,ptr={x:innerWidth/2,y:innerHeight/2};
const FEET=()=>R.h()*.98,alive=()=>myTok===tok;
function vis(o){const s=rb.style;s.setProperty('--sx',o.sx==null?1:o.sx);s.setProperty('--sy',o.sy==null?1:o.sy);s.setProperty('--tr',(o.r||0)+'deg');s.setProperty('--tx',(o.tx||0)+'px');s.setProperty('--ty',(o.ty||0)+'px')}
function pose(p){if(p){if(rb.dataset.p!==p)rb.dataset.p=p}else if(rb.dataset.p!==undefined)delete rb.dataset.p}
function anim(ms,fn){return new Promise((res,rej)=>{const my=tok,t0=performance.now();const f=t=>{if(my!==tok)return rej(CANCEL);const k=Math.min(1,(t-t0)/ms);fn(k);k<1?requestAnimationFrame(f):res()};requestAnimationFrame(f)})}
const sleep=ms=>new Promise((res,rej)=>{const my=tok;setTimeout(()=>my===tok?res():rej(CANCEL),ms)});
function cancel(){tok++;busy=false;cur='';vis({});pose(null);rb.classList.remove('mvg')}
async function run(name,fn){if(busy)return false;busy=true;cur=name;const my=++tok;myTok=my;
try{await fn()}catch(e){if(e!==CANCEL)console.error(e)}finally{if(tok===my){busy=false;cur='';vis({});pose(null);rb.classList.remove('mvg');try{R.store()}catch(e){}}}return true}
/* ---------- "oynalar" (tayanch yuzalar) ---------- */
const SEL='.kd .w,#pane>*,#tsec>*,.chips,.warn,.tabs,#pane,.cm,.ch,.card,.pn,aside,section,pre,.kr,.wb,.inl,#out,.qs,details,.opt,h1,h2,h3';
const curTop=p=>p.el&&p.el.isConnected?p.el.getBoundingClientRect().top:p.el?-9999:innerHeight-4;
function plats(){const W=R.w(),H=R.h(),vw=innerWidth,vh=innerHeight,out=[],seen={},pe=rb.style.pointerEvents;rb.style.pointerEvents='none';
try{document.querySelectorAll(SEL).forEach(el=>{if(el.closest('#rb,#rbp,.rbb,.rbd,#rbc'))return;const r=el.getBoundingClientRect();
if(r.width<W*1.3||r.height<18||r.top<H*.98+6||r.top>vh-H*.6||r.right<60||r.left>vw-60)return;
const cs=getComputedStyle(el);if(cs.visibility==='hidden'||cs.display==='none'||+cs.opacity<.3)return;
const l=Math.max(r.left,0),rr=Math.min(r.right,vw);if(rr-l<W*1.3)return;
const e=document.elementFromPoint(cl((l+rr)/2,2,vw-2),r.top+3);if(!e||!(e===el||el.contains(e)))return;
const key=Math.round(r.top/8)+':'+Math.round(l/60);if(seen[key])return;seen[key]=1;
out.push({el,l,r:rr,top:r.top,wt:Math.min(4,r.width*r.height/60000+1)})})}catch(e){}
rb.style.pointerEvents=pe;out.push({el:null,l:0,r:vw,top:vh-4,wt:.8});return out}
const stand=(p,cx)=>[cx-R.w()/2,curTop(p)-FEET()+2];
function reach(a,b){if(a===b)return false;const W=R.w(),lo=a.l+W*.4,hi=a.r-W*.4,blo=b.l+W*.4,bhi=b.r-W*.4;if(hi<lo||bhi<blo)return false;
const gx=Math.max(0,blo-hi,lo-bhi);return gx<=340&&a.top-b.top<=700&&b.top-a.top<=800}
function hopPoints(a,b,cx){const W=R.w(),lo=a.l+W*.4,hi=a.r-W*.4,blo=b.l+W*.4,bhi=b.r-W*.4,ol=Math.max(lo,blo),oh=Math.min(hi,bhi);let off,land;
if(ol<=oh){off=cl(cx+rnd(-60,60),ol,oh);land=cl(off+rnd(-90,90),blo,bhi)}
else if(hi<blo){off=hi;land=blo+rnd(0,Math.min(100,bhi-blo))}else{off=lo;land=bhi-rnd(0,Math.min(100,bhi-blo))}return{off,land}}
function bfs(ps,s,t){if(s===t)return[s];const q=[[s]],seen=new Set([s]);while(q.length){const path=q.shift();if(path.length>4)continue;const a=path[path.length-1];
for(const b of ps){if(seen.has(b)||!reach(a,b))continue;seen.add(b);const np=path.concat(b);if(b===t)return np;q.push(np)}}return null}
/* ---------- harakat bo'laklari ---------- */
async function walk(p,tcx,fast){const W=R.w(),cx0=R.x+W/2,dx=tcx-cx0,dist=Math.abs(dx);if(dist<20)return;const dir=dx>0?1:-1,sp=fast?210:85,ms=dist/sp*1000;
pose(dir>0?'rp':'lp');rb.classList.add('mvg');
await anim(ms,k=>{const ph=k*ms/1000*(fast?15:9),sn=Math.abs(Math.sin(ph)),[x,y]=stand(p,cx0+dx*k);R.at(x,y);vis({r:Math.sin(ph)*(fast?7:4)+(fast?dir*6:0),ty:-sn*(fast?6:4),sy:1+sn*.03})});
vis({});pose(null);rb.classList.remove('mvg');plat={el:p.el}}
async function jump(a,b,tcx){const W=R.w(),cx0=R.x+W/2,dx=tcx-cx0;pose(dx>40?'fr':dx<-40?'fl':'bk');rb.classList.add('mvg');
await anim(170,k=>vis({sy:1-.22*Math.sin(k*Math.PI/2),sx:1+.12*k,ty:6*k}));
const y0=R.y,y1=curTop(b)-FEET()+2,up=Math.max(0,y0-y1),lift=Math.max(55,up+45),ms=cl(520+Math.hypot(dx,y1-y0)*.55+up*.6,640,1250);
await anim(ms,k=>{const y=curTop(b)-FEET()+2,yy=y0+(y-y0)*k-4*lift*k*(1-k);R.at(cx0+dx*k-W/2,yy);
vis({sy:k<.5?1+.1*Math.sin(k*Math.PI):.97,sx:k<.5?.94:1.03,r:up>260?360*Math.min(1,k*1.25):cl(dx/40,-1,1)*10*(1-k)});if(k>.6&&Math.abs(dx)<40)pose('idle')});
const[x,y]=stand(b,tcx);R.at(x,y);pose(dx>40?'fr':dx<-40?'fl':'idle');
await anim(230,k=>{const s=Math.sin(k*Math.PI)*(1-k);vis({sy:1-.22*s,sx:1+.13*s})});
vis({});rb.classList.remove('mvg');pose(null);plat={el:b.el};try{R.store()}catch(e){}}
async function fall(p){const W=R.w(),cx=R.x+W/2,y0=R.y,y1=curTop(p)-FEET()+2,dy=y1-y0;
if(dy<6){R.at(cx-W/2,y1);plat={el:p.el};return}
pose('idle');rb.classList.add('mvg');await anim(Math.sqrt(2*dy/2600)*1000,k=>{R.at(cx-W/2,y0+dy*k*k);vis({sy:1+.08*k,sx:1-.04*k})});
const[x,y]=stand(p,cx);R.at(x,y);await anim(250,k=>{const s=Math.sin(k*Math.PI)*(1-k);vis({sy:1-.24*s,sx:1+.14*s})});
vis({});rb.classList.remove('mvg');pose(null);plat={el:p.el}}
async function hop(n,h){for(let i=0;i<(n||1);i++)await anim(430,k=>{const j=4*k*(1-k),e=Math.min(k,1-k)*8;vis({ty:-(h||24)*j,sy:1+.06*j-.1*(1-Math.min(1,e)),sx:1-.03*j})});vis({})}
async function settle(){const W=R.w(),ps=plats(),cx=R.x+W/2,feet=R.y+FEET();
const at=ps.find(p=>p.el&&Math.abs(p.top-feet)<12&&cx>=p.l+W*.2&&cx<=p.r-W*.2);if(at){plat={el:at.el};return}
const below=ps.filter(p=>cx>=p.l+W*.2&&cx<=p.r-W*.2&&p.top>=feet-10).sort((a,b)=>a.top-b.top)[0];
if(below)await fall(below);else{const f=ps[ps.length-1];await fall(f)}}
async function goTo(tgt,tcx){const ps=plats(),cur0=ps.find(p=>plat&&p.el===plat.el);if(!cur0){plat=null;return false}
const t=ps.find(p=>p.el===tgt.el)||tgt,path=bfs(ps,cur0,t);if(!path)return false;
for(let i=0;i<path.length-1;i++){const a=path[i],b=path[i+1],cx=R.x+R.w()/2,pt=hopPoints(a,b,cx);if(Math.abs(pt.off-cx)>24)await walk(a,pt.off,false);await jump(a,b,pt.land)}
const last=path[path.length-1];if(Math.abs(tcx-(R.x+R.w()/2))>24)await walk(last,tcx,false);return true}
/* ---------- tasodifiy xatti-harakatlar ---------- */
const MOODS=[['happy',20],['wink',12],['love',6],['think',10],['star',6],['proud',8],['blush',5],['wow',6],['sus',6],['squint',4],['tired',3],['dizzy',2],['sad',2]];
function wpick(L){let t=L.reduce((s,x)=>s+x[1],0),r=Math.random()*t;for(const x of L){if((r-=x[1])<0)return x[0]}return L[0][0]}
const QUIPS=["Qani, aylanib kelay!","Bu oyna qulay ekan.","Yuqoridan ko'rinish zo'r!","Sizni kuzatib turibman 👀","Biroz mashq qilay!"];
function setM(n,ms){ownUntil=performance.now()+80;R.setMood(n,ms)}
async function emote(){const m=wpick(MOODS),ms=rnd(1600,2800);setM(m,ms);
if(Math.random()<.1&&!R.talking&&Date.now()-lastIn<20000)R.say(pick(QUIPS),m,2600);
if(m==='happy'||m==='star'||m==='proud')await hop(Math.random()<.5?2:1,22);
else if(m==='wow'){await hop(1,30)}
else if(m==='love'||m==='blush')await anim(ms,k=>vis({r:Math.sin(k*Math.PI*4)*6,ty:-Math.abs(Math.sin(k*Math.PI*2))*3}));
else if(m==='think'||m==='sus'||m==='squint')await anim(ms,k=>vis({r:Math.sin(k*Math.PI)*(m==='think'?-7:7)}));
else if(m==='dizzy')await anim(ms,k=>vis({r:Math.sin(k*Math.PI*8)*8}));
else await sleep(ms);vis({})}
async function look(){const n=Math.floor(rnd(2,4));for(let i=0;i<n;i++){pose(pick(['fr','fl','fr','fl','bk']));await sleep(rnd(550,1000))}pose(null)}
async function wander(far){const ps=plats(),c=ps.find(p=>plat&&p.el===plat.el);if(!c){plat=null;return}
const W=R.w(),cx=R.x+W/2;const L=ps.filter(p=>p!==c&&(far?bfs(ps,c,p):reach(c,p)));
if(!L.length)return walk(c,rnd(c.l+W*.4,Math.max(c.l+W*.4,c.r-W*.4)),false);
const sc=L.map(p=>p.wt/(1+Math.abs(p.top-c.top)/220+Math.abs((p.l+p.r)/2-cx)/400)),T=L.reduce((s,_,i)=>s+sc[i],0);let r=Math.random()*T,b=L[0];for(let i=0;i<L.length;i++){if((r-=sc[i])<0){b=L[i];break}}
await goTo(b,cl(rnd(b.l,b.r),b.l+W*.4,b.r-W*.4))}
async function toward(fx,fy,face){if(!plat)await settle();const ps=plats(),W=R.w(),cx=R.x+W/2;if(!ps.length)return;
const best=ps.map(p=>({p,s:Math.max(0,p.l+W*.4-fx,fx-(p.r-W*.4))+Math.abs(p.top-fy)*.6+(p.el?0:150)})).sort((a,b)=>a.s-b.s)[0].p;
const side=cx>fx?1:-1,tcx=cl(fx+side*W*1.1,best.l+W*.4,best.r-W*.4);
if(!(await goTo(best,tcx)))return;pose(fx>R.x+R.w()/2?'fr':'fl');await sleep(face||1400);pose(null)}
async function act(){const idle=Date.now()-lastIn,talk=R.talking,
A=[['walk',26],['jump',talk?0:(idle<6000?10:24)],['emote',18],['look',14],['run',talk||idle<6000?0:6],['hop',8],['spin',3],['follow',talk||idle<9000||idle>45000?0:8]];
let t=A.reduce((s,x)=>s+x[1],0),r=Math.random()*t,n='walk';for(const x of A){if((r-=x[1])<0){n=x[0];break}}
nextAct=Date.now()+(idle<8000?rnd(2500,6000):rnd(3500,9000));
await run(n,async()=>{if(!plat){await settle();return}
const ps=plats(),c=ps.find(p=>p.el===plat.el),W=R.w();if(!c){plat=null;return}
if(n==='walk'||n==='run'){if(talk)return;await walk(c,rnd(c.l+W*.4,Math.max(c.l+W*.4,c.r-W*.4)),n==='run')}
else if(n==='jump')await wander(Math.random()<.4);
else if(n==='emote')await emote();else if(n==='look')await look();else if(n==='hop')await hop(Math.random()<.5?2:3,24);
else if(n==='spin'){rb.classList.add('fl');setTimeout(()=>rb.classList.remove('fl'),950);await sleep(1000)}
else if(n==='follow')await toward(ptr.x,ptr.y,1800)})}
/* ---------- foydalanuvchi harakatlariga javob ---------- */
function focusOn(fx,fy,kind){if(!R.on()||R.hid||R.drag||R.busy)return;const now=Date.now();
if(now-focusT<(kind==='type'?15000:6000))return;if(kind==='click'&&Math.random()>.5)return;focusT=now;
if(busy){if(['walk','run','look','emote','hop'].includes(cur))cancel();else{pend={fx,fy,kind};return}}
run('focus',()=>toward(fx,fy,kind==='type'?2200:1400))}
document.addEventListener('pointerdown',e=>{lastIn=Date.now();if(rb.contains(e.target))return;focusOn(e.clientX,e.clientY,'click')},true);
['keydown','wheel','touchstart'].forEach(ev=>addEventListener(ev,()=>{lastIn=Date.now()},{passive:true,capture:true}));
const ti=document.getElementById('ti');if(ti)ti.addEventListener('input',()=>{lastIn=Date.now();const r=ti.getBoundingClientRect();focusOn(r.left+r.width*.5,r.top,'type')});
addEventListener('pointermove',e=>{ptr.x=e.clientX;ptr.y=e.clientY;if(lookT)return;lookT=setTimeout(()=>{lookT=0;
if(busy||R.drag||R.hid||!plat||R.mood!=='idle')return;const dx=ptr.x-(R.x+R.w()/2);
if(Math.abs(dx)>150&&Math.abs(ptr.y-(R.y+R.h()/2))<420){pose(dx>0?'fr':'fl');setTimeout(()=>{if(!busy)pose(null)},2200)}},180)},{passive:true});
/* robot hissiyotiga reaksiya */
new MutationObserver(()=>{if(performance.now()<ownUntil||!R.on()||R.hid||R.drag||busy||!plat)return;const m=rb.dataset.m;
if(['happy','star','love','proud'].includes(m)&&Math.random()<.6)run('hop',()=>hop(2,24));
else if(m==='wow')run('hop',()=>hop(1,30))
else if(m==='angry')run('stomp',()=>anim(650,k=>vis({tx:Math.sin(k*Math.PI*10)*3,r:Math.sin(k*Math.PI*10)*2})))}).observe(rb,{attributes:true,attributeFilter:['data-m']});
/* robotni sudrash: harakatni to'xtatadi, qo'yib yuborilgach yiqiladi */
rb.addEventListener('pointerdown',()=>{cancel();plat=null;lastIn=Date.now()},true);
rb.addEventListener('pointerup',()=>{nextAct=Date.now()+1800});
/* tayanch yuzani kuzatib borish (scroll, o'lcham o'zgarishi) */
setInterval(()=>{if(!R.on()||R.hid||R.drag||document.hidden)return;if(busy&&R.busy){cancel();return}
if(busy||!plat)return;const t=curTop(plat);if(plat.el&&(!plat.el.isConnected||t<30||t>innerHeight-20)){plat=null;return}
const y=t-FEET()+2;if(Math.abs(R.y-y)>.8)R.at(R.x,y)},120);
setInterval(()=>{if(document.hidden||!R.on()||R.hid||R.drag||R.busy||busy)return;
if(pend){const p=pend;pend=null;focusT=0;return focusOn(p.fx,p.fy,p.kind)}
if(Date.now()<nextAct)return;if(R.mood==='sleepy'&&Date.now()-lastIn>45000)return;act()},700);
window.RBM={now:()=>{nextAct=0},get plat(){return plat},get busy(){return busy},get cur(){return cur},plats};
})();
