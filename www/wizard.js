/* Kali Maktab: Sehrgar robot (voxel rasmlar) — Kali-bot o'rniga tanlash mumkin.
   Hissiyotlar robotning o'z mood() tizimidan olinadi (rb.dataset.m), shuning uchun
   talabchanlik, gap pufagi, ovoz va harakatlar (sakrash, ta'zim, raqs...) o'zgarmaydi. */
(function(){
const rb=document.getElementById('rb');if(!rb)return;
const box=rb.querySelector('.rbf');if(!box||typeof S==='undefined')return;
const POSES=['fr','fl','rp','lp','bk'];
const MAP={idle:'idle',flat:'idle',load:'idle',happy:'greet',wink:'dance',love:'yon',blush:'uyal',star:'overjoyed',proud:'proud',wow:'shocked',dizzy:'shocked',think:'pens',squint:'pens2',sus:'mis',money:'mis',sleepy:'sleep',tired:'exhaust',sick:'exhaust',sad:'sad',cry:'sad',angry:'angry',hack:'laptop'};
const EM={love:'💖',money:'🪙',sick:'🤒',dizzy:'💫',cry:'💧',star:'⭐'};
/* kiyim rangi: asl (ko'k) rasmdagi ko'k piksellar shu rangga almashtiriladi */
const OUT={blue:["Ko'k",null],green:['Yashil',{h:130,s:.85,lo:.28,hi:.72}],yellow:['Sariq',{h:48,s:.95,lo:.62,hi:1}],red:['Qizil',{h:2,s:.9,lo:.32,hi:.82}],purple:['Binafsha',{h:275,s:.75,lo:.25,hi:.7}],brown:['Jigarrang',{h:26,s:.62,lo:.2,hi:.52}],black:['Qora',{h:225,s:.12,lo:.06,hi:.3}],white:['Oq',{h:225,s:.05,lo:.7,hi:1}]};
const st=document.createElement('style');
st.textContent=`#rb .rbs,#rb .rbe{display:none}
#rb.wz .rbf>svg{display:none!important}
#rb.wz .rbs{display:block;width:100%;height:auto;pointer-events:none;transform:scale(1.22) translate(var(--tx,0px),var(--ty,0px)) rotate(var(--tr,0deg)) scale(var(--sx,1),var(--sy,1));transform-origin:50% 92%;filter:drop-shadow(0 8px 10px rgba(0,0,0,.28))}
#rb.wz .rbe{display:block;position:absolute;right:-6px;top:-8px;font-size:22px;line-height:1;pointer-events:none;filter:drop-shadow(0 2px 3px rgba(0,0,0,.4));animation:wze 1.6s ease-in-out infinite alternate}
@keyframes wze{to{transform:translateY(-5px)}}
#rb.wz.nod .rbs{animation:wzn .45s ease-in-out 3}@keyframes wzn{50%{transform:scale(1.22) translateY(7px)}}
#rb.wz.shk .rbs{animation:wzk .3s ease-in-out 4}@keyframes wzk{25%{transform:scale(1.22) rotate(-12deg)}75%{transform:scale(1.22) rotate(12deg)}}
#rb.wz[data-m=dizzy] .rbs{animation:wzd .5s ease-in-out infinite alternate}@keyframes wzd{from{transform:scale(1.22) rotate(-6deg)}to{transform:scale(1.22) rotate(6deg)}}
#rb.mvg .rbf{animation:none!important}
@media(prefers-reduced-motion:reduce){#rb .rbs,#rb .rbe{animation:none!important}}`;
document.head.appendChild(st);
const img=document.createElement('img');img.className='rbs';img.alt='';img.draggable=false;box.prepend(img);
const em=document.createElement('span');em.className='rbe';rb.appendChild(em);
const wiz=()=>S.rbs!=='bot',outf=()=>OUT[S.rbo]?S.rbo:'blue';
const file=n=>'robot/w_'+n+'.webp',imgs={},cache={};let token=0,broken=false;
const load=n=>imgs[n]||(imgs[n]=new Promise((ok,no)=>{const i=new Image();i.onload=()=>ok(i);i.onerror=no;i.src=file(n)}));
function recolor(d,p){const a=d.data;for(let i=0;i<a.length;i+=4){if(a[i+3]<8)continue;const r=a[i]/255,g=a[i+1]/255,b=a[i+2]/255,mx=Math.max(r,g,b),mn=Math.min(r,g,b),dl=mx-mn;if(!dl)continue;const s=dl/mx;if(s<.25)continue;let h=mx==r?((g-b)/dl)%6:mx==g?(b-r)/dl+2:(r-g)/dl+4;h=(h<0?h+6:h)*60;if(h<200||h>255)continue;
const t=Math.min(1,Math.max(0,(mx-.3)/.45)),v=p.lo+t*(p.hi-p.lo),ns=Math.min(1,p.s*(.6+.4*Math.min(1,s/.9))),c=v*ns,hp=p.h/60,x=c*(1-Math.abs(hp%2-1)),m=v-c;
let R=0,G=0,B=0;if(hp<1){R=c;G=x}else if(hp<2){R=x;G=c}else if(hp<3){G=c;B=x}else if(hp<4){G=x;B=c}else if(hp<5){R=x;B=c}else{R=c;B=x}
a[i]=(R+m)*255;a[i+1]=(G+m)*255;a[i+2]=(B+m)*255}}
async function url(n,o){const p=OUT[o][1];if(!p)return file(n);const k=n+'|'+o;if(cache[k])return cache[k];const im=await load(n);
try{const c=document.createElement('canvas');c.width=im.naturalWidth;c.height=im.naturalHeight;const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(im,0,0);const d=x.getImageData(0,0,c.width,c.height);recolor(d,p);x.putImageData(d,0,0);return cache[k]=c.toDataURL('image/png')}catch(e){return file(n)}}
async function sync(){if(!wiz())return;const m=rb.dataset.m||'idle',po=rb.dataset.p,my=++token,u=await url(po&&POSES.includes(po)?po:(MAP[m]||'idle'),outf());if(my!==token)return;if(img.getAttribute('src')!==u)img.src=u;em.textContent=EM[m]||''}
function apply(){rb.classList.toggle('wz',wiz()&&!broken);sync()}
img.onerror=()=>{broken=true;rb.classList.remove('wz')};
new MutationObserver(sync).observe(rb,{attributes:true,attributeFilter:['data-m','data-p']});
apply();setTimeout(()=>Object.keys(MAP).map(k=>MAP[k]).concat(POSES).forEach(n=>load(n).catch(()=>{})),1500);
/* sozlamalar paneli */
const pn=document.getElementById('rbp');
function inject(){if(!pn||pn.querySelector('.wzs'))return;const w=wiz(),o=outf(),sec=document.createElement('div');sec.className='wzs';
const mv=window.RBX?RBX.on():true;sec.innerHTML=`<div class="mu">Robot turi</div><div class="rbsw"><button class="b${w?'':' on'}" data-wz="bot">Kali-bot</button><button class="b${w?' on':''}" data-wz="wiz">Sehrgar</button></div>`+(w?`<div class="mu">Kiyim rangi</div><div class="rbsw">${Object.keys(OUT).map(k=>`<button class="b${o==k?' on':''}" data-wo="${k}">${OUT[k][0]}</button>`).join('')}</div>`:'')+`<label class="mu"><input type="checkbox" data-wm ${mv?'checked':''}> Robot o'zi yursin va sakrasin</label>`;
const f=pn.querySelector('label.mu');f?f.after(sec):pn.appendChild(sec);
if(w){const hide=e=>{e.style.display='none';e.dataset.wzh=1};
pn.querySelectorAll('div.mu').forEach(e=>{if(!sec.contains(e)&&/Rangi|Aksessuarlar/.test(e.textContent))hide(e)});
pn.querySelectorAll(':scope > .rbsw').forEach(hide);
pn.querySelectorAll('input[data-a]').forEach(i=>hide(i.closest('label')))}}
function refresh(){pn.querySelectorAll('[data-wzh]').forEach(e=>{e.style.display='';delete e.dataset.wzh});const s=pn.querySelector('.wzs');s&&s.remove();inject()}
if(pn){new MutationObserver(inject).observe(pn,{childList:true});inject();
pn.addEventListener('change',e=>{if(e.target.dataset&&e.target.dataset.wm!==undefined){S.rbm=e.target.checked?1:0;try{save()}catch(x){}}});
pn.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-wz],[data-wo]');if(!b)return;
if(b.dataset.wz){S.rbs=b.dataset.wz;broken=false}else S.rbo=b.dataset.wo;
try{save()}catch(x){}apply();refresh()})}
})();
