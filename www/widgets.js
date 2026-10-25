/* Kali Maktab: bosh ekran widgetlari uchun veb qismi.
   1) widgetdan kelgan amalni bajaradi (Terminal / Test / Mashq / Takrorlash / buyruqni ishga tushirish);
   2) Sozlamalarga "Imtihon / CTF sanasi" bo'limini qo'shadi (Sanoq widgeti shu sanadan foydalanadi). */
(()=>{
const $=s=>document.querySelector(s);
const E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const tst=m=>{try{toast(m)}catch(e){}};
const NAT=()=>!!(window.Capacitor&&Capacitor.isNativePlatform&&Capacitor.isNativePlatform()&&Capacitor.nativePromise);
const LA=(m,o)=>Capacitor.nativePromise("Launcher",m,o||{});

/* ---------- sana (Sanoq) ---------- */
const CK='kms_cd';let CD={t:'',d:''};
try{Object.assign(CD,JSON.parse(localStorage.getItem(CK)||'{}'))}catch(e){}
const saveCD=()=>{try{localStorage.setItem(CK,JSON.stringify(CD))}catch(e){}};
const pushCD=()=>{if(NAT())LA('setCountdown',{title:CD.t,date:CD.d}).catch(()=>{})};
function left(){
  const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(CD.d||'');if(!m)return null;
  const n=new Date(),a=Date.UTC(n.getFullYear(),n.getMonth(),n.getDate()),b=Date.UTC(+m[1],+m[2]-1,+m[3]);
  return Math.round((b-a)/864e5)}
function status(){
  const k=left(),n=CD.t||'Imtihon / CTF';
  if(k===null)return "Sana qo'yilmagan.";
  if(k>1)return `${n}: ${k} kun qoldi`;
  if(k===1)return `${n}: ertaga!`;
  if(k===0)return `${n}: bugun!`;
  return `${n}: ${-k} kun oldin tugagan`}

/* ---------- widget amallari ---------- */
function closeOverlays(){
  const s=$('#kst.open #ks-x');if(s)s.click();
  const p=$('#kmx-overlay.open #kmx-close');if(p)p.click()}
function tabGo(t){
  closeOverlays();document.body.dataset.v='l';
  const b=document.querySelector(`.tabs button[data-t="${t}"]`);if(b)b.click()}
function termGo(){
  closeOverlays();document.body.dataset.v='t';
  setTimeout(()=>{const i=$('#ti');if(i)i.focus()},80)}
function cdGo(){
  closeOverlays();
  const sb=[...document.querySelectorAll('.hd button')].find(b=>b.textContent.indexOf('Sozlamalar')>-1);
  if(!sb)return;sb.click();
  setTimeout(()=>{const d=$('#d-cd');if(d){d.open=true;d.scrollIntoView({block:'center'})}},120)}
function go(a,cmd){
  if(a==='terminal')termGo();
  else if(a==='test')tabGo('q');
  else if(a==='chal')tabGo('c');
  else if(a==='review')tabGo('r');
  else if(a==='lessons')tabGo('l');
  else if(a==='countdown')cdGo();
  else if(a==='run'&&cmd){closeOverlays();document.body.dataset.v='t';setTimeout(()=>{try{sub(cmd)}catch(e){}},120)}}

/* APK: widgetdan kelgan amalni o'qib olish (ilova ochilganda va qaytib kelganda) */
let busy=false;
async function poll(){
  if(!NAT()||busy)return;busy=true;
  try{const r=await LA('getPending');if(r&&r.action)go(r.action,r.cmd)}catch(e){}
  busy=false}
setTimeout(poll,500);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)poll()});
addEventListener('focus',poll);document.addEventListener('resume',poll);
/* brauzer/PWA: #w=test, #w=terminal, #w=review, #w=chal */
{const m=/[#&]w=(\w+)/.exec(location.hash||'');if(m)setTimeout(()=>go(m[1]),500)}
if(CD.d)setTimeout(pushCD,800);   /* sanani widgetga qayta yuborish */

/* ---------- Sozlamalar ichida sana bo'limi ---------- */
let cdOpen=false;
function section(){
  return `<details id="d-cd" class="kd"${cdOpen?' open':''}><summary>⏳ Imtihon / CTF sanasi</summary>
<label class="mu">Nomi<input id="cd-t" class="in" maxlength="20" placeholder="CTF" value="${E(CD.t||'')}"></label>
<label class="mu">Sana<input id="cd-d" class="in" type="date" value="${E(CD.d||'')}"></label>
<p class="mu" id="cd-s">${E(status())}</p>
<div class="kr" style="border:0"><button class="b" id="cd-save">Saqlash</button><button class="b" id="cd-clear">Tozalash</button></div>
<p class="mu"><small>${NAT()?"Bosh ekrandagi «Sanoq» widgeti shu sanagacha qolgan kunlarni ko'rsatadi.":"Bosh ekran widgeti faqat o'rnatilgan APK ilovada ishlaydi; sana bu yerda ham saqlanadi."}</small></p></details>`}
const kst=$('#kst');
if(kst){
  const inject=()=>{const box=kst.firstElementChild;if(box&&!box.querySelector('#d-cd'))box.insertAdjacentHTML('beforeend',section())};
  new MutationObserver(inject).observe(kst,{childList:true});
  kst.addEventListener('toggle',e=>{if(e.target&&e.target.id==='d-cd')cdOpen=e.target.open},true);
  kst.addEventListener('click',e=>{
    const id=e.target&&e.target.id;
    if(id==='cd-save'){
      const t=$('#cd-t').value.trim().slice(0,20),d=$('#cd-d').value;
      if(!d){tst("Avval sanani tanlang");return}
      CD={t,d};saveCD();pushCD();$('#cd-s').textContent=status();tst("Sana saqlandi")}
    else if(id==='cd-clear'){
      CD={t:'',d:''};saveCD();pushCD();$('#cd-t').value='';$('#cd-d').value='';$('#cd-s').textContent=status();tst("Sana tozalandi")}});
}
window.kmsGo=go;
})();
