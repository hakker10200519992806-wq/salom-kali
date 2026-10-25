# Kali Maktab — APK (GitHub Actions orqali)

APK ichida ilova o'z nomi va ikonkasini bosh ekran uchun ham o'zgartira oladi.

## APK olish
1. Shu papkadagi **barcha fayllar** (`.github` papkasi bilan) GitHub repozitoriyga yuklanadi.
   `.github/workflows/build-apk.yml` yo'q bo'lsa — GitHub'da *Add file → Create new file* orqali shu nom bilan yarating va `build-apk.yml.copy` ichidagini joylang.
2. Repozitoriyda **Actions → Build APK → Run workflow** (yoki `main` ga push qiling).
3. 5–10 daqiqadan keyin tugagan ish ichidan **Artifacts → KaliMaktab-apk** ni yuklab oling, ichida `app-debug.apk`.

> Har bir yig'ishda debug imzo yangidan yaratiladi. Eski o'rnatilgan ilovani avval o'chirib, keyin yangisini o'rnating.

## Ilova ichida
**⚙ Sozlamalar → 📱 Ilova nomi va ikonkasi**
- Nom yozing, tayyor ikonka yoki galereyadan rasm tanlang (ilova ichida darhol almashadi).
- **🏠 Asosiy ikonkani almashtirish** — faqat bosh ekrandagi ilova rasmi almashadi, nomi o'zgarmaydi (`presets.json` dagi `default` nomi).
  Tayyor ikonka tanlanmagan bo'lsa — asl (terminal) ikonka qaytadi. Galereya rasmi bu usulda ishlamaydi.
- **📌 Bosh ekranga yorliq** — siz yozgan nom va tanlagan rasm (galereya ham) bilan bosh ekranga qo'shimcha ikonka qo'yadi. Telefon tasdiq so'raydi.

## Bosh ekran widgetlari (APK)
APK o'rnatilgach bosh ekranda uzoq bosing → **Vidjetlar** → *Kali Maktab* ichidan tanlang:

| Widget | O'lcham | Nima qiladi |
|---|---|---|
| **Kali: Bugungi buyruq** | 2×2 dan 4×2 gacha (kattalashtiriladi) | Har kuni yangi buyruq va izoh. Katta o'lchamda namunaviy buyruq ham chiqadi. Bosilsa — buyruq terminalda ishga tushadi. Internet kerak emas. |
| **Kali: Shpargalka** | 4×2 | 40 ta eng ko'p ishlatiladigan buyruq, aylantiriladigan ro'yxat. Qatorni bosish buyruqni terminalda ishga tushiradi. |
| **Kali: Tezkor tugmalar** | 4×1 | Terminal, Test, Mashq, Takrorlash — ilovaning shu bo'limini ochadi. |
| **Kali: Sanoq** | 2×2 | Imtihon yoki CTF kunigacha necha kun qolgani. Sana: **⚙ Sozlamalar → ⏳ Imtihon / CTF sanasi**. |

Eslatmalar:
- Kunlik buyruq yarim tundan keyin almashadi (telefon vaqti bo'yicha) va ilova ichidagi «Bugungi buyruq» bilan bir xil.
- Buyruqlar ro'yxati yig'ish paytida `www/index.html` va `www/plus.js` dan avtomatik olinadi (`native/extract_commands.js`),
  yangi dars qo'shsangiz widgetda ham chiqadi. Shpargalka ro'yxati — `native/cheatsheet.json` (o'zingiz tahrirlang).
- «Test», «Mashq», «Takrorlash» bo'limlari ilovada barcha darslar o'qilmaguncha (yoki PRO kod kiritilmaguncha) qulflangan — widgetdan ham shu qoida amal qiladi.
- Veb qismi: `www/widgets.js` (widgetdan kelgan amalni bajaradi, sana sozlamasi). Brauzerda ham `#w=test`, `#w=terminal`, `#w=chal`, `#w=review` bilan ishlaydi.

## Cheklovlar (Android qoidalari)
- Asosiy ikonka uchun rasm oldindan tayyorlangan ro'yxatdan tanlanadi (`presets.json`), nomi doim `default` nomi. Erkin nom/rasm faqat «Yorliq» orqali.
- Asosiy ikonka almashganda ba'zi launcherlar eski ikonkani bosh ekrandan olib tashlaydi, yangisi ilovalar ro'yxatida chiqadi. Yangilanishi bir necha soniya olishi mumkin.
- «Yorliq» Android 8+ va yorliqni qo'llaydigan launcher talab qiladi. Eski asosiy ikonka yashirilmaydi.

## Nom va ikonkalarni o'zgartirish
`presets.json` ni tahrirlang: `label` — nom, `icon` — `www/` ichidagi rasm yo'li (kvadrat, kamida 192 px tavsiya).
Yangi rasm qo'shsangiz `www/icons/` ga joylab, shu faylga yozing. Ilova ichidagi 15 ta tayyor ikonka tartibi `p0…p14` bilan bir xil bo'lishi kerak.
Asosiy (boshlang'ich) nom va ikonka: `default`.

## Tuzilma
- `www/` — veb ilova
- `presets.json` — nom/ikonka ro'yxati
- `native/` — Android qismi (`patch_android.py` yig'ish vaqtida avtomatik ishlaydi): launcher plagini, `widgets/` (Java), `res/` (widget layoutlari), `cheatsheet.json`
- `.github/workflows/build-apk.yml` — APK yig'ish
