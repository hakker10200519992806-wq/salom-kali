/* Kali Maktab — qo'shimcha darslar: Linux asoslari, Tarmoq, Kriptografiya, Forensika, Himoya, Veb xavfsizlik */
const A=(c,n,dd,x)=>D.push({c,n,d:dd,x});

/* forensika uchun virtual log fayli */
if(!fs.c.var.c.log)fs.c.var.c.log=d({});
fs.c.var.c.log.c['auth.log']=f("Oct 17 09:12:01 kali sshd[812]: Accepted password for kali from 192.168.56.1 port 51422\nOct 17 09:14:47 kali sudo: kali : TTY=pts/0 ; PWD=/home/kali ; USER=root ; COMMAND=/usr/bin/apt update\nOct 17 10:02:11 kali sshd[930]: Failed password for invalid user admin from 203.0.113.9 port 40210\nOct 17 10:02:14 kali sshd[930]: Failed password for invalid user admin from 203.0.113.9 port 40210\nOct 17 10:05:33 kali sshd[944]: Accepted publickey for kali from 192.168.56.1 port 51500\n");

/* yangi buyruqlar */
Object.assign(C,{
su:a=>a[0]?"Password: \nsu: autentifikatsiya xatosi":"usage: su [username]",
umask:()=>"0022",
groups:()=>"kali sudo",
arp:()=>"Address                  HWtype  HWaddress           Flags Mask            Iface\n192.168.56.1             ether   08:00:27:11:22:33   C                     eth0",
md5sum:a=>a[0]&&node(a[0])?"d41d8cd98f00b204e9800998ecf8427e  "+a[0]:"md5sum: fayl topilmadi",
gpg:a=>a.includes("--gen-key")||a.includes("--full-generate-key")?"gpg: kalit juftligi yaratildi":a.includes("-c")||a.includes("--symmetric")?"gpg: shifrlandi (.gpg fayl yaratildi)":"gpg: --gen-key yoki -c dan foydalaning",
binwalk:a=>a[0]?`DECIMAL   HEXADECIMAL  DESCRIPTION\n0         0x0          ${a[0]} — ichki tuzilma aniqlanmadi (lab namunasi)`:"binwalk: fayl kerak",
xxd:a=>{const n=node(a[0]||"");return !n||n.t!="f"?"xxd: fayl topilmadi":[...n.v].slice(0,16).map(c=>c.charCodeAt(0).toString(16).padStart(2,"0")).join(" ")},
last:()=>"kali     pts/0        192.168.56.1     Fri Oct 17 09:12   still logged in\nkali     pts/0        192.168.56.1     Thu Oct 16 18:40 - 19:02  (00:22)",
ufw:a=>a[0]=="status"?"Status: active\nTo                         Action      From\n22/tcp                     ALLOW       Anywhere":a[0]=="enable"?"Xavfsizlik devori yoqildi":"ufw: enable | disable | status",
iptables:a=>a.includes("-L")?"Chain INPUT (policy ACCEPT)\ntarget     prot opt source               destination":"iptables: -L bilan qoidalarni ko'ring",
fail2ban:()=>"fail2ban-client: Status\n|- Number of jail:\t1\n`- Jail list:\tsshd",
});

/* Linux asoslari */
A("Linux asoslari","su","Boshqa foydalanuvchiga (odatda root) o'tadi, parol so'raydi.",[["su root","root foydalanuvchiga o'tish"]]);
A("Linux asoslari","umask","Yangi fayl/papka uchun standart ruxsatlar niqobini ko'rsatadi.",[["umask","joriy niqob"]]);
A("Linux asoslari","groups","Joriy foydalanuvchi a'zo bo'lgan guruhlarni ko'rsatadi.",[["groups","guruhlar ro'yxati"]]);

/* Tarmoq asoslari */
A("Tarmoq asoslari","arp","Lokal tarmoqdagi IP↔MAC manzil jadvalini ko'rsatadi.",[["arp -a","ARP jadvali"]]);
A("Tarmoq asoslari","OSI modeli","Tarmoq aloqasi 7 qatlamda ishlaydi: Fizik, Kanal, Tarmoq, Transport, Sessiya, Taqdimot, Ilova. ping, curl, ssh kabi buyruqlar shu qatlamlarning birida ishlaydi.",[]);
A("Tarmoq asoslari","Portlar va protokollar","Har bir xizmat o'z portida ishlaydi: HTTP — 80, HTTPS — 443, SSH — 22, DNS — 53. Port — qurilmadagi 'eshik' raqami.",[]);
A("Tarmoq asoslari","IP va MAC farqi","IP manzil — tarmoqdagi mantiqiy manzil (o'zgaradi), MAC manzil — tarmoq kartasining zavod raqami (o'zgarmaydi). arp -a ikkalasini bog'laydi.",[]);
A("Tarmoq asoslari","Wireshark dars rejimi","Wireshark paketlarni ushlab, manba/manzil, protokol va ma'lumotni ko'rsatadi. Desktop ilovadagi Wireshark simulyatorida (Missiyalar bo'limi) paketlarni filtrlashni mashq qiling.",[]);

/* Kriptografiya */
A("Kriptografiya","md5sum","Fayl yoki matn uchun MD5 xesh (hash) hisoblaydi. Zamonaviy xavfsizlikda zaif hisoblanadi.",[["md5sum notes.txt","MD5 xesh"]]);
A("Kriptografiya","gpg","Fayllarni shifrlash va raqamli imzolash dasturi.",[["gpg -c sir.txt","parol bilan shifrlash"]]);
A("Kriptografiya","binwalk","Fayl ichidagi yashirin formatlar/fayllarni qidiradi (steganografiya tahlili).",[["binwalk rasm.jpg","ichki tuzilma"]]);
A("Kriptografiya","Sezar shifri","Har bir harfni alifboda necha pog'ona siljitib shifrlash usuli. 3 siljishda 'kali' → 'ndol'. Eng oddiy va eng oson buziladigan shifr.",[]);
A("Kriptografiya","XOR shifrlash","Ikki bitni taqqoslab (bir xil bo'lsa 0, farqli bo'lsa 1) shifrlaydi. Bir xil kalit bilan qayta XOR qilinsa — asl matn qaytadi.",[]);
A("Kriptografiya","Parol kuchi","Kuchli parol: uzun (12+), katta-kichik harf, raqam va belgidan iborat, lug'atdagi so'z emas. hashcat/john kabi vositalar zaif parolni tez topadi.",[]);
A("Kriptografiya","Salt nima","Hash hisoblashdan oldin parolga qo'shiladigan tasodifiy qiymat. Bir xil parollar har xil hash chiqarishini ta'minlaydi, rainbow table hujumidan himoya qiladi.",[]);

/* Raqamli forensika */
A("Raqamli forensika","xxd","Fayl baytlarini o'n oltilik (hex) va matn ko'rinishida ko'rsatadi.",[["xxd notes.txt","hex dump"]]);
A("Raqamli forensika","last","Tizimga oxirgi kirgan foydalanuvchilar ro'yxatini ko'rsatadi.",[["last","kirish tarixi"]]);
A("Raqamli forensika","auth.log tahlili","Kirish urinishlari /var/log/auth.log da saqlanadi. grep bilan muvaffaqiyatsiz urinishlarni toping.",[["grep Failed /var/log/auth.log","muvaffaqiyatsiz kirishlar"],["grep Accepted /var/log/auth.log","muvaffaqiyatli kirishlar"]]);
A("Raqamli forensika","Metadata tahlili","Rasm va hujjat fayllarida EXIF metadata (joylashuv, sana, qurilma modeli) yashiringan bo'lishi mumkin — forensikada muhim dalil.",[]);
A("Raqamli forensika","Mini-tergov","Log fayllari, metadata va fayl vaqtlarini birlashtirib 'kim, qachon, nima qildi' savoliga javob topish — raqamli forensikaning asosiy vazifasi.",[]);

/* Himoya (blue team) */
A("Himoya (Blue team)","ufw","Oddiy (Uncomplicated) Linux xavfsizlik devori — portlarni ochish/yopish.",[["ufw status","holatni ko'rish"],["ufw enable","yoqish"]]);
A("Himoya (Blue team)","iptables","Linux yadrosining xavfsizlik devori qoidalarini ko'rsatadi/boshqaradi.",[["iptables -L","joriy qoidalar"]]);
A("Himoya (Blue team)","fail2ban","Muvaffaqiyatsiz kirish urinishlari ko'p bo'lsa, IP manzilni vaqtincha bloklaydi.",[["fail2ban-client status","holat"]]);
A("Himoya (Blue team)","SSH kalit bilan kirish","Parol o'rniga ochiq/yopiq kalit juftligi bilan kirish — qo'pol kuch (brute-force) hujumidan ancha xavfsiz.",[]);
A("Himoya (Blue team)","Fishingni tanish","Soxta xat/sayt orqali parol yoki ma'lumot o'g'irlash usuli. Belgilari: shoshiltiruvchi til, soxta domen (masalan paypaI.com \u2260 paypal.com), umumiy murojaat, SMS/OTP kod so'rash, g'ayrioddiy yutuq va'dasi. \ud83d\udc09 Kali Desktop \u2192 \ud83d\udce7 Pochta qutisi ilovasida amaliy simulyatsiya: soxta xatlarni o'qing, qizil belgilangan joylarni bosib sababini ko'ring, xatni \"ishonchli\" yoki \"fishing\" deb baholang va aldansangiz nima bo'lishini bosqichma-bosqich ko'ring.",[]);
A("Himoya (Blue team)","Ikki bosqichli tasdiqlash (2FA)","Parolga qo'shimcha ikkinchi tasdiqlash (SMS kod, autentifikator ilova) — parol o'g'irlansa ham hisobni himoya qiladi.",[]);
A("Himoya (Blue team)","Parol menejeri","Har bir xizmat uchun alohida kuchli parolni saqlaydigan va eslaydigan dastur.",[]);
A("Himoya (Blue team)","Yangilanishlar","Dasturiy ta'minotni muntazam yangilash ma'lum zaifliklarni yopadi — eng oddiy va eng samarali himoya.",[]);

/* Veb xavfsizlik */
A("Veb xavfsizlik","Cookie","Brauzerda saqlanadigan kichik ma'lumot, sessiyani (login holatini) eslab qolish uchun ishlatiladi.",[]);
A("Veb xavfsizlik","OWASP Top 10","Veb-ilovalardagi eng keng tarqalgan 10 xavfsizlik zaifligi ro'yxati (masalan Injection, Broken Authentication). Maktab-Market lab sahifasida sinab ko'ring.",[]);
A("Veb xavfsizlik","SQL Injection","Foydalanuvchi kiritgan ma'lumotga SQL buyruq qo'shib, ma'lumotlar bazasini aldash usuli. Himoya: tayyor so'rovlar (prepared statements).",[]);
A("Veb xavfsizlik","XSS (Cross-Site Scripting)","Saytga begona JavaScript kodini kiritib, boshqa foydalanuvchida ishga tushirish hujumi. Himoya: kiritilgan ma'lumotni ekranga chiqarishdan oldin tozalash (escape).",[]);
