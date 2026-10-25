/* Yo'nalish: hozircha faqat Kali terminal buyruqlari ko'rinadi.
   Python darslari o'chirilmaydi — window.PYD ga olib qo'yiladi va keyin alohida
   "Python (noldan)" yo'nalishi sifatida qaytariladi. Qayta yoqish: PY_VISIBLE=true. */
(function(){
if(typeof D==='undefined')return;
const PY_VISIBLE=false,isPy=c=>/^Python/i.test(c||'');
if(PY_VISIBLE)return;
window.PYD=window.PYD||[];
for(let i=D.length-1;i>=0;i--){if(isPy(D[i].c)){PYD.unshift(D[i]);D.splice(i,1)}}
/* ro'yxatni yangilash (Darslar bo'limi ochiq bo'lsa) */
try{const t=document.querySelector('.tabs button.on');t&&t.click()}catch(e){}
})();
