/* Kali Maktab: Kali Linux (XFCE / Kali-Dark) uslubidagi mavzu.
   Emoji o'rniga SVG ikonkalar, panel, oyna sarlavhasi, menyu va terminal ranglari.
   Eslatma: bu rasmiy Kali logotipi emas, unga o'xshash original chizma. */
(()=>{
const root=document.getElementById('kdsk');if(!root)return;
const $=(s,r)=>(r||root).querySelector(s);
const E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---------- gradientlar (bir marta) ---------- */
const DEFS=`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<linearGradient id="ktBlue" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cc0ff"/><stop offset="1" stop-color="#2563d9"/></linearGradient>
<linearGradient id="ktFolder" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fcbff"/><stop offset="1" stop-color="#3a86f0"/></linearGradient>
<linearGradient id="ktDark" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b4252"/><stop offset="1" stop-color="#1a1e27"/></linearGradient>
<linearGradient id="ktOrange" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffb23e"/><stop offset=".55" stop-color="#f0476e"/><stop offset="1" stop-color="#6a3fd6"/></linearGradient>
<linearGradient id="ktRed" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff7b72"/><stop offset="1" stop-color="#c62f3a"/></linearGradient>
<linearGradient id="ktGray" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5b667a"/><stop offset="1" stop-color="#2c3444"/></linearGradient>
<linearGradient id="ktClaw" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6fb4ff"/><stop offset="1" stop-color="#2f6fe8"/></linearGradient>
<clipPath id="ktClipW"><rect x="6" y="10" width="52" height="44" rx="6"/></clipPath>
</defs></svg>`;
root.insertAdjacentHTML('afterbegin',DEFS);

/* ---------- ikonkalar (viewBox 64x64) ---------- */
const S='stroke-linecap="round" stroke-linejoin="round"';
const I={
terminal:`<rect x="5" y="9" width="54" height="46" rx="8" fill="url(#ktDark)" stroke="#0b0d12" stroke-width="1.5"/><path d="M5 17a8 8 0 0 1 8-8h38a8 8 0 0 1 8 8v2H5z" fill="#4b5365"/><circle cx="13" cy="14" r="2" fill="#ff7b72"/><circle cx="20" cy="14" r="2" fill="#f2b84b"/><circle cx="27" cy="14" r="2" fill="#3ec28f"/><path d="M13 29l9 7-9 7" stroke="#4da3ff" stroke-width="4" fill="none" ${S}/><path d="M28 45h15" stroke="#fff" stroke-width="4" ${S}/>`,
folder:`<path d="M6 16a5 5 0 0 1 5-5h14l6 6h22a5 5 0 0 1 5 5v31a5 5 0 0 1-5 5H11a5 5 0 0 1-5-5z" fill="#2a64c8"/><path d="M6 26a5 5 0 0 1 5-5h42a5 5 0 0 1 5 5v25a5 5 0 0 1-5 5H11a5 5 0 0 1-5-5z" fill="url(#ktFolder)"/>`,
wall:`<rect x="6" y="10" width="52" height="44" rx="6" fill="url(#ktBlue)"/><circle cx="45" cy="23" r="5" fill="#ffe08a"/><g clip-path="url(#ktClipW)"><path d="M6 48L22 29 34 41 42 33 58 49V54H6Z" fill="#0f2e66"/></g><rect x="6" y="10" width="52" height="44" rx="6" fill="none" stroke="#1b4aa8" stroke-width="1.5"/>`,
apps:`<rect x="6" y="6" width="52" height="52" rx="13" fill="url(#ktDark)" stroke="#0b0d12" stroke-width="1.5"/>${[18,32,46].map(y=>[18,32,46].map((x,i)=>`<circle cx="${x}" cy="${y}" r="4.2" fill="${(x+y)%28==0?'#4da3ff':'#e8edf7'}"/>`).join('')).join('')}`,
exit:`<circle cx="32" cy="32" r="26" fill="url(#ktRed)"/><path d="M32 15v17" stroke="#fff" stroke-width="5" ${S}/><path d="M21 22a16 16 0 1 0 22 0" stroke="#fff" stroke-width="5" fill="none" ${S}/>`,
firefox:`<circle cx="32" cy="32" r="27" fill="#14306b"/><circle cx="32" cy="32" r="25" fill="url(#ktBlue)"/><g stroke="#fff" stroke-opacity=".55" stroke-width="1.8" fill="none"><ellipse cx="32" cy="32" rx="11" ry="25"/><path d="M7 32h50M11 20h42M11 44h42"/></g><circle cx="32" cy="32" r="25" fill="none" stroke="#bfe0ff" stroke-width="1.5" stroke-opacity=".6"/><path d="M45 19L35.5 35.5 28.5 28.5z" fill="#ff5d5d"/><path d="M19 45l9.5-16.5 7 7z" fill="#f4f6fb"/><circle cx="32" cy="32" r="3" fill="#14306b" stroke="#fff" stroke-width="1.5"/>`,
network:`<circle cx="32" cy="32" r="26" fill="url(#ktBlue)"/><g stroke="#fff" stroke-width="3" ${S}><path d="M32 32L32 14M32 32L16 42M32 32L48 42"/></g><circle cx="32" cy="32" r="6" fill="#fff"/><circle cx="32" cy="14" r="5" fill="#fff"/><circle cx="16" cy="42" r="5" fill="#fff"/><circle cx="48" cy="42" r="5" fill="#fff"/>`,
monitor:`<rect x="6" y="8" width="52" height="38" rx="5" fill="#161b26" stroke="#6b7690" stroke-width="2.5"/><path d="M12 38l10-12 8 7 10-16 12 10" stroke="#3ddc97" stroke-width="3" fill="none" ${S}/><path d="M22 56h20M32 46v10" stroke="#8d9db9" stroke-width="3.5" ${S}/>`,
calc:`<rect x="12" y="5" width="40" height="54" rx="7" fill="url(#ktGray)" stroke="#1a1f2a" stroke-width="1.5"/><rect x="17" y="11" width="30" height="13" rx="2.5" fill="#9be7c4"/>${[30,40,50].map(y=>[18,29,40].map((x,i)=>`<rect x="${x}" y="${y}" width="7" height="6" rx="2" fill="${(y==50&&i==2)?'#ff9a3d':'#e8edf7'}"/>`).join('')).join('')}`,
docs:`<path d="M3 15v38c9-3 20-3 29 2 9-5 20-5 29-2V15" fill="#2a64c8"/><path d="M32 14C25 10 14 10 6 13v38c8-3 19-3 26 1z" fill="#f1f5ff"/><path d="M32 14c7-4 18-4 26-1v38c-8-3-19-3-26 1z" fill="#d3e0fa"/><path d="M12 22c5-1 10-1 14 1M12 30c5-1 10-1 14 1M38 23c4-2 9-2 14-1M38 31c4-2 9-2 14-1" stroke="#7d93c4" stroke-width="2" fill="none" ${S}/>`,
missions:`<circle cx="30" cy="34" r="24" fill="#f4f6fb"/><circle cx="30" cy="34" r="18" fill="#e5484d"/><circle cx="30" cy="34" r="12" fill="#f4f6fb"/><circle cx="30" cy="34" r="6" fill="#e5484d"/><path d="M30 34L54 10" stroke="#2f3643" stroke-width="3" ${S}/><path d="M54 10l-1 8 7-7zM54 10l-8 1 7 7z" fill="#4da3ff"/>`,
wireshark:`<rect x="5" y="5" width="54" height="54" rx="14" fill="url(#ktBlue)"/><path d="M15 47c4-15 13-27 27-34-3 9-3 20 3 34-9-6-20-6-30 0z" fill="#fff"/><path d="M12 53c10-4 28-4 40 0" stroke="#bfe0ff" stroke-width="3" fill="none" ${S}/>`,
msf:`<path d="M32 5l23 13v28L32 59 9 46V18z" fill="url(#ktRed)"/><path d="M20 42V25l12 11 12-11v17" stroke="#fff" stroke-width="4.5" fill="none" ${S}/>`,
guide:`<path d="M32 12L4 26l28 14 28-14z" fill="#e8edf7"/><path d="M16 35v10c0 5 32 5 32 0V35l-16 8z" fill="#8d9db9"/><path d="M56 28v15" stroke="#f2b84b" stroke-width="3" ${S}/><circle cx="56" cy="46" r="3.5" fill="#f2b84b"/>`,
lock:`<rect x="14" y="28" width="36" height="28" rx="5" fill="currentColor"/><path d="M22 28v-8a10 10 0 0 1 20 0v8" stroke="currentColor" stroke-width="5" fill="none"/>`,
check:`<circle cx="32" cy="32" r="26" fill="#3ec28f"/><path d="M20 33l8 8 16-17" stroke="#fff" stroke-width="6" fill="none" ${S}/>`,
kbd:`<rect x="4" y="16" width="56" height="32" rx="6" stroke="currentColor" stroke-width="4" fill="none"/><path d="M12 26h4M22 26h4M32 26h4M42 26h4M50 26h2M16 38h32" stroke="currentColor" stroke-width="4" ${S}/>`,
speaker:`<path d="M8 25h11l16-12v38L19 39H8z" fill="currentColor"/><path d="M43 23a13 13 0 0 1 0 18M50 15a24 24 0 0 1 0 34" stroke="currentColor" stroke-width="4" fill="none" ${S}/>`,
headset:`<path d="M10 40V32a22 22 0 0 1 44 0v8" stroke="currentColor" stroke-width="5" fill="none"/><rect x="6" y="36" width="12" height="20" rx="5" fill="currentColor"/><rect x="46" y="36" width="12" height="20" rx="5" fill="currentColor"/>`,
phone:`<rect x="18" y="4" width="28" height="56" rx="6" stroke="currentColor" stroke-width="4" fill="none"/><circle cx="32" cy="52" r="2.5" fill="currentColor"/>`,
watch:`<rect x="18" y="16" width="28" height="32" rx="8" stroke="currentColor" stroke-width="4" fill="none"/><path d="M24 16l2-10h12l2 10M24 48l2 10h12l2-10M32 26v7l5 3" stroke="currentColor" stroke-width="4" fill="none" ${S}/>`,
car:`<path d="M6 42l7-18c1-3 3-4 6-4h26c3 0 5 1 6 4l7 18v8H6z" stroke="currentColor" stroke-width="4" fill="none" ${S}/><circle cx="18" cy="50" r="5" fill="currentColor"/><circle cx="46" cy="50" r="5" fill="currentColor"/>`,
tablet:`<rect x="10" y="6" width="44" height="52" rx="6" stroke="currentColor" stroke-width="4" fill="none"/><path d="M28 51h8" stroke="currentColor" stroke-width="4" ${S}/>`,
ports:`<path d="M12 18h40v22l-6 8H18l-6-8z" stroke="currentColor" stroke-width="4.5" fill="none" ${S}/><path d="M22 28v8M30 28v8M38 28v8" stroke="currentColor" stroke-width="4" ${S}/>`,
activity:`<path d="M4 34h14l8-22 12 40 8-18h14" stroke="currentColor" stroke-width="5" fill="none" ${S}/>`,
file:`<path d="M14 4h26l12 12v44H14z" fill="#f4f6fb"/><path d="M40 4v12h12z" fill="#c5cde0"/><path d="M21 28h22M21 36h22M21 44h14" stroke="#8d9db9" stroke-width="3" ${S}/>`,
archive:`<rect x="10" y="10" width="44" height="46" rx="6" fill="#c9a24a"/><path d="M28 10h8v22h-8z" fill="#6b5420"/><rect x="26" y="30" width="12" height="9" rx="2" fill="#f2d27a"/>`,
script:`<path d="M14 4h26l12 12v44H14z" fill="#e8f0ff"/><path d="M40 4v12h12z" fill="#b9c8ea"/><path d="M24 30l-6 6 6 6M40 30l6 6-6 6M35 28l-6 16" stroke="#2f6fe8" stroke-width="3.5" fill="none" ${S}/>`,
kali:`<path d="M12 7Q42 20 46 58Q30 32 12 7Z" fill="url(#ktClaw)"/><path d="M25 5Q52 17 57 47Q42 25 25 5Z" fill="url(#ktClaw)"/><path d="M37 4Q58 13 61 32Q51 17 37 4Z" fill="url(#ktClaw)"/>`,
app:`<rect x="6" y="6" width="52" height="52" rx="13" fill="url(#ktBlue)"/><circle cx="32" cy="32" r="10" fill="#fff"/>`,
reset:`<path d="M50 30a18 18 0 1 1-6-13" stroke="#8d9db9" stroke-width="5" fill="none" ${S}/><path d="M50 8v12H38" stroke="#8d9db9" stroke-width="5" fill="none" ${S}/>`,
gear:`<circle cx="32" cy="32" r="11" stroke="#8d9db9" stroke-width="5" fill="none"/><g stroke="#8d9db9" stroke-width="6" ${S}><path d="M32 6v8M32 50v8M6 32h8M50 32h8M13.6 13.6l5.7 5.7M44.7 44.7l5.7 5.7M13.6 50.4l5.7-5.7M44.7 19.3l5.7-5.7"/></g>`,
wifi:`<path d="M7 25a35 35 0 0 1 50 0M15 34a23 23 0 0 1 34 0M23 43a11 11 0 0 1 18 0" stroke="currentColor" stroke-width="5" fill="none" ${S}/><circle cx="32" cy="53" r="4" fill="currentColor"/>`,
wifi_off:`<path d="M7 25a35 35 0 0 1 50 0M15 34a23 23 0 0 1 34 0M23 43a11 11 0 0 1 18 0" stroke="currentColor" stroke-width="5" fill="none" opacity=".45" ${S}/><circle cx="32" cy="53" r="4" fill="currentColor" opacity=".45"/><path d="M10 8l44 48" stroke="currentColor" stroke-width="5" ${S}/>`,
bt:`<path d="M18 22l26 20-12 10V12l12 10-26 20" stroke="currentColor" stroke-width="5" fill="none" ${S}/>`
};
const svg=(k,s,extra)=>`<svg viewBox="0 0 64 64" width="${s}" height="${s}" aria-hidden="true"${extra||''}>${I[k]||I.app}</svg>`;
window.kmsSvg=svg;window.kmsSig=d=>{const l=d>-55?4:d>-67?3:d>-77?2:1;return `<svg viewBox="0 0 64 64" width="22" height="22" aria-hidden="true" style="flex:none">${[0,1,2,3].map(i=>`<rect x="${8+i*13}" y="${42-i*11}" width="9" height="${14+i*11}" rx="2" fill="currentColor" opacity="${i<l?1:.25}"/>`).join('')}</svg>`};
const batSvg=p=>{const c=p<=20?'#ff7b72':'#3ec28f';return `<svg viewBox="0 0 64 64" width="22" height="22" aria-hidden="true"><rect x="3" y="18" width="50" height="28" rx="5" stroke="currentColor" stroke-width="4" fill="none"/><rect x="55" y="26" width="6" height="12" rx="2" fill="currentColor"/><rect x="8" y="23" width="${Math.max(2,Math.round(40*p/100))}" height="18" rx="2" fill="${c}"/></svg>`};
const pager=n=>`<svg viewBox="0 0 44 24" width="34" height="19" aria-hidden="true">${[0,1,2,3].map(i=>`<rect x="${1+i*11}" y="3" width="9" height="18" rx="2.5" fill="${i+1==n?'#4da3ff':'none'}" stroke="${i+1==n?'#4da3ff':'#8d9db9'}" stroke-width="1.6"/>`).join('')}</svg>`;

/* matn -> ikonka kaliti */
const NAME=[['terminal','terminal'],['files','folder'],['file','folder'],['fon','wall'],['wallpaper','wall'],['dastur','apps'],['chiqish','exit'],['firefox','firefox'],['browser','firefox'],['network','network'],['monitor','monitor'],['calc','calc'],['docs','docs'],['mission','missions'],['wireshark','wireshark'],['metasploit','msf'],['msf','msf'],["qo'llanma",'guide'],['qo‘llanma','guide'],['mousepad','docs'],['editor','docs']];
const keyFor=t=>{t=String(t).toLowerCase();for(const[n,k]of NAME)if(t.includes(n))return k;return 'app'};
const EMO={'🖥':'terminal','📁':'folder','🖼':'wall','🗂':'apps','⏻':'exit','🐉':'kali','🎯':'missions','🦈':'wireshark','💣':'msf','🌐':'firefox','🎓':'guide','♻':'reset','⚙':'gear','📶':'wifi','📵':'wifi_off','🔵':'bt','⚪':'bt','📝':'docs','📕':'docs','🧮':'calc','📊':'monitor','📡':'network','📄':'file','📦':'archive','📜':'script'};

/* ---------- CSS ---------- */
const url=s=>`url("data:image/svg+xml,${encodeURIComponent(s)}")`;
const gl=(d,c)=>url(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='${c}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>${d}</svg>`);
const G={mi:'<path d="M7 16h10"/>',mx:'<rect x="7" y="7" width="10" height="10" rx="1.5"/>',x:'<path d="M8 8l8 8M16 8l-8 8"/>'};
const CSS=`
#kdsk{font-family:"Cantarell","Noto Sans","Segoe UI",system-ui,sans-serif}
#kdsk .kti,#kdsk .kti *,#kdsk .ic div b,#kdsk .ic div b *{pointer-events:none}
#kdsk .kti{display:inline-flex;vertical-align:middle;margin-right:8px;flex:none}
/* panel */
#kdsk .pn{height:34px;padding:0 6px;gap:2px;background:rgba(22,24,30,.97);backdrop-filter:blur(10px);border-bottom:1px solid #07080b;box-shadow:0 1px 8px rgba(0,0,0,.45);color:#d7dbe4}
#kdsk .pn button{display:inline-flex;align-items:center;gap:6px;height:28px;padding:0 8px;border-radius:5px;font-size:13px;color:#d7dbe4}
#kdsk .pn button:active{background:rgba(255,255,255,.14)}
#kdsk .pn button svg{display:block;flex:none}
#kdsk .pn #kd-m{padding:0 10px 0 6px;font-weight:700;letter-spacing:.2px}
#kdsk .pn #kd-ck{font-variant-numeric:tabular-nums;font-weight:600;padding-left:10px}
#kdsk .pn #kd-ws{padding:0 6px}
/* ish stoli */
#kdsk .ic{grid-template-columns:repeat(2,84px);gap:4px 2px;left:6px;top:10px}
#kdsk .ic div{padding:6px 2px 5px;border:1px solid transparent;border-radius:6px;font-size:12px;color:#fff;text-shadow:0 1px 2px #000,0 0 6px rgba(0,0,0,.8)}
#kdsk .ic div b{width:50px;height:50px;margin:0 auto 4px;font-size:0;filter:drop-shadow(0 3px 4px rgba(0,0,0,.55))}
#kdsk .ic div b svg{width:100%;height:100%;display:block}
#kdsk .ic div.sel{background:rgba(77,155,255,.3);border-color:rgba(120,180,255,.55)}
/* oyna */
#kdsk .w{background:#1b1d23;border:1px solid #06070a;border-radius:9px 9px 5px 5px;box-shadow:0 12px 42px rgba(0,0,0,.7),0 0 0 1px rgba(255,255,255,.05)}
#kdsk .wt{position:relative;height:32px;gap:2px;padding:0 5px 0 8px;background:linear-gradient(#30343c,#262930);border-bottom:1px solid #0d0e12;flex-direction:row}
#kdsk .wt .kti{position:absolute;left:10px;top:8px;margin:0}
#kdsk .wt span{flex:1;text-align:center;font-size:12.5px;font-weight:600;color:#c9cfdb;padding:0 54px}
#kdsk .wt button{order:3;width:26px;height:26px;border-radius:50%;background-color:transparent;background-repeat:no-repeat;background-position:center;background-size:22px;font-size:0;color:transparent;padding:0}
#kdsk .wt button.mi{background-image:${gl(G.mi,'#b9c0cf')}}
#kdsk .wt button.mx{background-image:${gl(G.mx,'#b9c0cf')}}
#kdsk .wt button.x{background-image:${gl(G.x,'#b9c0cf')};background-color:transparent}
#kdsk .wt button:active{background-color:rgba(255,255,255,.16)}
#kdsk .wt button.x:active{background-color:#e5484d;background-image:${gl(G.x,'#fff')}}
#kdsk .wb{background:#1b1d23}
/* vazifalar paneli */
#kdsk .tb{height:42px;gap:4px;background:rgba(22,24,30,.97);border-top:1px solid #07080b;box-shadow:0 -1px 8px rgba(0,0,0,.4)}
#kdsk .tb button{display:inline-flex;align-items:center;height:32px;padding:0 12px 0 9px;font-size:12.5px;background:rgba(255,255,255,.06);border-radius:6px;color:#d7dbe4}
#kdsk .tb button .kti{margin-right:7px}
#kdsk .tb button.act{background:rgba(77,155,255,.18);box-shadow:inset 0 -2px 0 #4d9bff}
/* menyu */
#kdsk .mn,#kdsk .qs{background:rgba(22,24,30,.98);border:1px solid #2b2f38;border-radius:10px;box-shadow:0 14px 40px rgba(0,0,0,.65);top:36px}
#kdsk .mn .ct,#kdsk .qs div{display:flex;align-items:center;font-weight:500;color:#e3e7ef}
#kdsk .mn .ct .kti,#kdsk .qs div .kti{margin-right:10px}
#kdsk .mn hr{border-top-color:#2b2f38}
#kdsk .mn .tl div{color:#6fb4ff}
/* terminal */
#kdsk .tm{background:#121419;color:#e4e8f0;font:13px/1.4 "JetBrains Mono","DejaVu Sans Mono",ui-monospace,monospace}
#kdsk .tm input{color:#fff;caret-color:#6fb4ff}
#kdsk .tm .kf{color:#5f8bff}
#kdsk .tm .ku{color:#4dc2ff;font-weight:700}
#kdsk .tm .kp{color:#fff;font-weight:700}
#kdsk .tm .pl{color:#5f8bff}
#kdsk .tm .pl+span{color:#4dc2ff;font-weight:700}
#kdsk .tm .rd{color:#ff7b72}
/* qatlamlar: oynalar z-index'i oshib boradi, shuning uchun menyu/dialoglar doim tepada */
#kdsk .mn,#kdsk .qs{z-index:900000}
#kdsk .cm{z-index:900001}
#kdsk .dl{z-index:900002}
#kdsk .fg{touch-action:manipulation}
#kdsk .fg .it b{display:flex;justify-content:center;font-size:0;height:46px}
#kdsk .fg .it b svg{pointer-events:none}
/* Network oynasi */
#kdsk .nt{background:#1b1d23;color:#dbe0ea}
#kdsk .nt svg{pointer-events:none;flex:none}
#kdsk .nt .ntabs{background:#22252c;border-bottom:1px solid #0d0e12}
#kdsk .nt .ntabs button{display:flex;align-items:center;justify-content:center;gap:6px;color:#9aa3b5;font-size:12.5px;padding:10px 2px}
#kdsk .nt .ntabs button.on{color:#fff;border-color:#3d8bff}
#kdsk .nt .pn2{padding:10px 12px}
#kdsk .nt .sw{padding:4px 2px 12px}
#kdsk .nt .ttl{display:flex;align-items:center;gap:8px}
#kdsk .nt .ttl small,#kdsk .nt .ttl2 small{color:#7f8aa0;font:11px monospace}
#kdsk .nt .ttl2{font-weight:700;margin:2px 0 6px}
#kdsk .nt .sw button.tg,#kdsk .nt button.tg{position:relative;width:42px;height:24px;border-radius:12px;padding:0;background:#3a3f4b;font-size:0;color:transparent;flex:none;border:0}
#kdsk .nt button.tg::after{content:"";position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:#fff;transition:left .15s}
#kdsk .nt button.tg.on{background:#2f6fe8}
#kdsk .nt button.tg.on::after{left:21px}
#kdsk .nt .row{padding:9px 6px;gap:10px;border-bottom:1px solid #2a2e37;color:#dbe0ea}
#kdsk .nt .row.cn{background:rgba(77,155,255,.1)}
#kdsk .nt .row small{color:#8d9db9;font-size:11px;line-height:1.35}
#kdsk .nt .row small.ip{color:#4dc2ff}
#kdsk .nt .mu{color:#8d9db9}#kdsk .nt .mu.s{font-size:12px;padding:0 4px 6px}
#kdsk .nt .bt2{background:#2a3347;border:1px solid #3a4560;border-radius:6px;color:#dbe0ea;padding:6px 14px}
#kdsk .nt .pkw{overflow-x:auto}
#kdsk .nt table.ss{font:11px/1.6 "JetBrains Mono","DejaVu Sans Mono",monospace;white-space:nowrap}
#kdsk .nt table.ss th{color:#8d9db9;font-weight:600}
#kdsk .nt table.ss tr.dim td{color:#566074}
#kdsk .nt pre.nm{font:11px/1.45 "JetBrains Mono","DejaVu Sans Mono",monospace;background:#121419;color:#e4e8f0;padding:8px;border-radius:6px;height:auto;margin:0;overflow-x:auto}
#kdsk .nt .pk{font:11px/1.5 "JetBrains Mono","DejaVu Sans Mono",monospace;white-space:pre;color:#12272e;padding:0 4px;min-width:max-content}
#kdsk .nt .pk.h{background:#2a3040;color:#dbe0ea;font-weight:700}
#kdsk .nt .pk.tcp,#kdsk .nt .pk.tls{background:#e7e6ff}
#kdsk .nt .pk.dns{background:#daeeff}
#kdsk .nt .pk.http{background:#e4ffc7}
#kdsk .nt .pk.icmp{background:#fce0ff}
#kdsk .nt .pk.arp{background:#faf0d7}
#kdsk .nt canvas{background:#121419}
`;
document.head.appendChild(Object.assign(document.createElement('style'),{textContent:CSS}));

/* ---------- panel ---------- */
const m=$('#kd-m');if(m){m.innerHTML=svg('kali',22);m.setAttribute('aria-label','Kali menyu')}
const wf=$('#kd-wf'),bt=$('#kd-bt');
if(wf)wf.innerHTML=svg('wifi',20);if(bt)bt.innerHTML=svg('bt',18);
/* wifi holatiga qarab ikonka (desktop kodi faqat class o'zgartiradi) */
const syncNet=()=>{if(wf){const off=wf.classList.contains('off');const k=off?'wifi_off':'wifi';if(wf.dataset.k!==k){wf.dataset.k=k;wf.innerHTML=svg(k,20)}}};
if(wf)new MutationObserver(syncNet).observe(wf,{attributes:true,attributeFilter:['class']});syncNet();
const bat=$('#kd-bat');
const renderBat=()=>{if(!bat||bat.querySelector('svg'))return;const d=(bat.textContent.match(/\d+/)||[''])[0];const p=d===''?100:Math.min(100,+d);bat.innerHTML=batSvg(p)+(d===''?'':`<span>${p}%</span>`)};
if(bat){new MutationObserver(renderBat).observe(bat,{childList:true});renderBat()}
const ws=$('#kd-ws');
const renderWs=()=>{if(!ws||ws.querySelector('svg'))return;const n=+(ws.textContent.match(/\d/)||[1])[0];ws.innerHTML=pager(n)};
if(ws){new MutationObserver(renderWs).observe(ws,{childList:true});renderWs()}

/* ---------- ish stoli ikonkalari ---------- */
const ic=$('#kd-ic');
const doIcons=()=>{if(!ic)return;ic.querySelectorAll(':scope>div:not([data-kt])').forEach(d=>{d.dataset.kt=1;const b=d.querySelector('b');if(!b)return;const label=d.textContent.slice(b.textContent.length).trim();b.innerHTML=svg(keyFor(label),52)})};
if(ic){new MutationObserver(doIcons).observe(ic,{childList:true});doIcons()}

/* ---------- menyu va tezkor sozlamalar: boshidagi emoji -> SVG ---------- */
const emoItems=box=>{if(!box)return;box.querySelectorAll(':scope>.ct,:scope>div').forEach(el=>{if(el.dataset.kt||el.classList.contains('tl'))return;
  const t=el.textContent,ch=Array.from(t)[0];const k=EMO[ch]||EMO[ch&&ch.replace(/️/g,'')];if(!k)return;
  el.dataset.kt=1;const rest=t.slice(ch.length).replace(/^️/,'').trim();
  el.innerHTML=`<i class="kti">${svg(k,22)}</i>${E(rest)}`})};
const mn=$('#kd-mn'),qs=$('#kd-qs');
[mn,qs].forEach(b=>{if(b){emoItems(b);new MutationObserver(()=>emoItems(b)).observe(b,{childList:true})}});

/* ---------- oyna sarlavhasi va vazifalar paneli ---------- */
const ar=$('#kd-ar'),tb=$('#kd-tb');
const decWin=w=>{const wt=w.querySelector(':scope>.wt');if(!wt||wt.dataset.kt)return;wt.dataset.kt=1;
  const sp=wt.querySelector('span');if(!sp)return;const t=sp.textContent;
  wt.insertAdjacentHTML('afterbegin',`<i class="kti">${svg(keyFor(t),17)}</i>`);
  if(t==='Terminal')sp.textContent='kali@kali: ~'};
const decBtn=b=>{if(b.dataset.kt||b.querySelector('.kti'))return;b.dataset.kt=1;b.insertAdjacentHTML('afterbegin',`<i class="kti">${svg(keyFor(b.textContent),17)}</i>`)};
/* terminal prompti ranglari */
const PR=/^┌──\(kali㉿kali\)-\[(.*)\]$/;
const colorLine=l=>{let r=PR.exec(l);if(r)return `<span class="kf">┌──(</span><span class="ku">kali㉿kali</span><span class="kf">)-[</span><span class="kp">${E(r[1])}</span><span class="kf">]</span>`;
  if(l.startsWith('└─$'))return `<span class="kf">└─</span><span class="ku">$</span>${E(l.slice(3))}`;return E(l)};
const colorPrompt=el=>{if(el.dataset&&el.dataset.kt)return;const t=el.textContent;if(!t.startsWith('┌──(kali㉿kali)'))return;el.dataset.kt=1;el.innerHTML=t.split('\n').map(colorLine).join('\n')};
if(ar){
  new MutationObserver(ms=>ms.forEach(r=>r.addedNodes.forEach(n=>{
    if(n.nodeType===3){const p=n.parentElement;if(p&&p.classList.contains('pl')){const t=n.textContent;if(PR.test(t)){p.innerHTML=colorLine(t)}}return}
    if(n.nodeType!==1)return;
    if(n.classList.contains('w'))decWin(n);
    else if(n.classList.contains('it')&&n.parentElement&&n.parentElement.classList.contains('fg')){const b=n.querySelector('b');if(b&&!b.dataset.kt){b.dataset.kt=1;const k=EMO[b.textContent.replace(/\uFE0F/g,'')];if(k)b.innerHTML=svg(k,46)}}
    else if(n.parentElement&&n.parentElement.parentElement&&n.parentElement.parentElement.classList.contains('tm'))colorPrompt(n);
  }))).observe(ar,{childList:true,subtree:true});
  ar.querySelectorAll('.w').forEach(decWin);
}
if(tb){new MutationObserver(ms=>ms.forEach(r=>r.addedNodes.forEach(n=>{if(n.nodeType===1&&n.tagName==='BUTTON')decBtn(n)}))).observe(tb,{childList:true});tb.querySelectorAll('button').forEach(decBtn)}
})();
