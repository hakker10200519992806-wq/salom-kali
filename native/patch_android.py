#!/usr/bin/env python3
"""
`npx cap add android` dan keyin ishga tushadi. Android loyihasiga qo'shadi:
  1) presets.json dagi har bir ikonka uchun mipmap resurslar (oddiy + adaptive) va nom (strings);
  2) AndroidManifest.xml: har bir preset uchun <activity-alias>, asosiy ikonka ilovaning o'z ikonkasi;
  3) LauncherPlugin.java (nom/ikonka almashtirish) va uni ro'yxatdan o'tkazuvchi MainActivity.java;
  4) bosh ekran widgetlari: Bugungi buyruq, Shpargalka, Tezkor tugmalar, Sanoq
     (Java sinflar, layout/xml resurslar, manifest yozuvlari va assets/commands.json, cheatsheet.json).
Skript qayta ishga tushsa ham xavfsiz (idempotent).
"""
import json
import json as _json
import re
import shutil
import subprocess
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
ANDROID = ROOT / "android"
MAIN = ANDROID / "app" / "src" / "main"
RES = MAIN / "res"
WWW = ROOT / "www"

NS = "http://schemas.android.com/apk/res/android"
A = "{%s}" % NS
# (oddiy ikonka px, adaptive foreground px) = 48dp / 108dp
DENSITIES = {
    "mdpi": (48, 108),
    "hdpi": (72, 162),
    "xhdpi": (96, 216),
    "xxhdpi": (144, 324),
    "xxxhdpi": (192, 432),
}
ID_RE = re.compile(r"^[a-z][a-z0-9_]*$")


def fail(msg):
    print("XATO: " + msg, file=sys.stderr)
    sys.exit(1)


def xml_esc(s):
    """Android string resurs uchun matnni xavfsiz yozish."""
    s = s.replace("\\", "\\\\").replace("'", "\\'").replace('"', '\\"')
    s = s.replace("&", "&amp;").replace("<", "&lt;")
    if s[:1] in ("@", "?"):
        s = "\\" + s
    return s


def load_square(path):
    im = Image.open(path).convert("RGBA")
    bg = Image.new("RGBA", im.size, (255, 255, 255, 255))
    bg.alpha_composite(im)
    im = bg.convert("RGB")
    w, h = im.size
    m = min(w, h)
    l, t = (w - m) // 2, (h - m) // 2
    return im.crop((l, t, l + m, t + m))


def edge_color(im):
    w, h = im.size
    px = im.load()
    pts = []
    for i in range(w):
        pts += [px[i, 0], px[i, h - 1]]
    for j in range(h):
        pts += [px[0, j], px[w - 1, j]]
    return tuple(sorted(p[k] for p in pts)[len(pts) // 2] for k in range(3))


def make_icons(icon_id, src):
    im = load_square(src)
    edge = edge_color(im)
    for d, (legacy, fg) in DENSITIES.items():
        out = RES / ("mipmap-" + d)
        out.mkdir(parents=True, exist_ok=True)
        im.resize((legacy, legacy), Image.LANCZOS).save(out / ("ic_%s.png" % icon_id), optimize=True)
        canvas = Image.new("RGB", (fg, fg), edge)
        inner = round(fg * 72 / 108)
        canvas.paste(im.resize((inner, inner), Image.LANCZOS), ((fg - inner) // 2, (fg - inner) // 2))
        canvas.save(out / ("ic_%s_fg.png" % icon_id), optimize=True)
    v26 = RES / "mipmap-anydpi-v26"
    v26.mkdir(parents=True, exist_ok=True)
    (v26 / ("ic_%s.xml" % icon_id)).write_text(
        '<?xml version="1.0" encoding="utf-8"?>\n'
        '<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">\n'
        '    <background android:drawable="@color/ic_%s_bg"/>\n'
        '    <foreground android:drawable="@mipmap/ic_%s_fg"/>\n'
        "</adaptive-icon>\n" % (icon_id, icon_id),
        encoding="utf-8",
    )
    return "#%02x%02x%02x" % edge


# ---------------------------------------------------------------- widgetlar
WIDGET_CLASSES = ["KaliWidgets", "KaliMidnightReceiver", "DailyWidget", "CountdownWidget",
                  "QuickWidget", "CheatWidget", "CheatService"]
WIDGET_STRINGS = {
    "kw_daily_label": "Kali: Bugungi buyruq",
    "kw_daily_desc": "Qo'shiladi: har kuni yangi Kali buyrug'i va qisqa izohi. Bosilsa buyruq terminalda ochiladi. 2x2 dan 4x2 gacha kattalashtiriladi.",
    "kw_cheat_label": "Kali: Shpargalka",
    "kw_cheat_desc": "Qo'shiladi: eng ko'p ishlatiladigan 40 ta buyruqning aylantiriladigan ro'yxati. Qatorni bosish buyruqni terminalda ishga tushiradi. O'lcham: 4x2.",
    "kw_quick_label": "Kali: Tezkor tugmalar",
    "kw_quick_desc": "Qo'shiladi: 4 ta tugma (Terminal, Test, Mashq, Takrorlash). Har biri ilovaning shu bo'limini bir bosishda ochadi. O'lcham: 4x1.",
    "kw_cd_label": "Kali: Sanoq",
    "kw_cd_desc": "Qo'shiladi: imtihon yoki CTF kunigacha necha kun qolgani. Sana: Sozlamalar ichida. O'lcham: 2x2.",
}


def extract_commands():
    """Buyruqlar ro'yxatini veb ilovadagi D massivi bilan bir xil tartibda oladi
    (index.html + plus.js ichidagi ma'lumotlar; extract_commands.js orqali)."""
    try:
        r = subprocess.run(["node", str(Path(__file__).parent / "extract_commands.js"), str(WWW)],
                           capture_output=True, text=True, check=True, timeout=60)
        cmds = _json.loads(r.stdout)
    except Exception as e:
        fail("buyruqlar ro'yxatini o'qib bo'lmadi (node kerak): %s" % e)
    if not cmds:
        fail("buyruqlar ro'yxati bo'sh chiqdi")
    return cmds


def add_widgets(pkg, jdir, app, tree_strings):
    """Widget resurslari, Java sinflari, assets va manifest yozuvlari."""
    # resurslar (layout, xml, drawable)
    src_res = Path(__file__).parent / "res"
    for sub in src_res.iterdir():
        if sub.is_dir():
            dst = RES / sub.name
            dst.mkdir(parents=True, exist_ok=True)
            for f in sub.iterdir():
                shutil.copy2(f, dst / f.name)
    # nomlar
    (RES / "values" / "zz_widgets.xml").write_text(
        '<?xml version="1.0" encoding="utf-8"?>\n<resources>\n'
        + "\n".join('    <string name="%s">%s</string>' % (k, xml_esc(v)) for k, v in WIDGET_STRINGS.items())
        + "\n</resources>\n", encoding="utf-8")
    # Java
    for name in WIDGET_CLASSES:
        tpl = (Path(__file__).parent / "widgets" / (name + ".java.tpl")).read_text(encoding="utf-8")
        (jdir / (name + ".java")).write_text(tpl.replace("__PACKAGE__", pkg), encoding="utf-8")
    # assets (internet kerak emas)
    assets = MAIN / "assets"
    assets.mkdir(parents=True, exist_ok=True)
    cmds = extract_commands()
    (assets / "commands.json").write_text(_json.dumps(cmds, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    cheat = _json.loads((Path(__file__).parent / "cheatsheet.json").read_text(encoding="utf-8"))
    (assets / "cheatsheet.json").write_text(_json.dumps(cheat, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")

    # manifest
    mine = {".DailyWidget", ".CountdownWidget", ".QuickWidget", ".CheatWidget", ".CheatService", ".KaliMidnightReceiver"}
    for tag in ("receiver", "service"):
        for old in list(app.findall(tag)):
            if old.get(A + "name", "") in mine:
                app.remove(old)

    def provider(cls, label, info):
        r = ET.SubElement(app, "receiver")
        r.set(A + "name", "." + cls)
        r.set(A + "label", "@string/" + label)
        r.set(A + "exported", "true")
        f = ET.SubElement(r, "intent-filter")
        ET.SubElement(f, "action").set(A + "name", "android.appwidget.action.APPWIDGET_UPDATE")
        md = ET.SubElement(r, "meta-data")
        md.set(A + "name", "android.appwidget.provider")
        md.set(A + "resource", "@xml/" + info)

    provider("DailyWidget", "kw_daily_label", "kw_daily_info")
    provider("CheatWidget", "kw_cheat_label", "kw_cheat_info")
    provider("QuickWidget", "kw_quick_label", "kw_quick_info")
    provider("CountdownWidget", "kw_cd_label", "kw_countdown_info")
    sv = ET.SubElement(app, "service")
    sv.set(A + "name", ".CheatService")
    sv.set(A + "permission", "android.permission.BIND_REMOTEVIEWS")
    sv.set(A + "exported", "false")
    rc = ET.SubElement(app, "receiver")
    rc.set(A + "name", ".KaliMidnightReceiver")
    rc.set(A + "exported", "false")


def main():
    if not ANDROID.is_dir():
        fail("android/ papkasi yo'q. Avval `npx cap add android` ni ishga tushiring.")
    cfg = json.loads((ROOT / "capacitor.config.json").read_text(encoding="utf-8"))
    pkg = cfg["appId"]
    pj = json.loads((ROOT / "presets.json").read_text(encoding="utf-8"))

    items = [{"id": "default", **pj["default"]}] + list(pj["presets"])
    seen = set()
    for it in items:
        if not ID_RE.match(it["id"]):
            fail("presets.json: noto'g'ri id %r (faqat a-z, 0-9, _ va harf bilan boshlansin)" % it["id"])
        if it["id"] in seen:
            fail("presets.json: takroriy id %r" % it["id"])
        seen.add(it["id"])
        if not (WWW / it["icon"]).is_file():
            fail("presets.json: rasm topilmadi: www/%s" % it["icon"])

    # 1) resurslar
    colors, strings = [], []
    for it in items:
        c = make_icons(it["id"], WWW / it["icon"])
        colors.append('    <color name="ic_%s_bg">%s</color>' % (it["id"], c))
        # har bir ikonkaning o'z nomi bor (presets.json dagi label): ikonka bilan birga nom ham almashadi
        strings.append('    <string name="alias_label_%s">%s</string>' % (it["id"], xml_esc(it["label"])))
    (RES / "values").mkdir(parents=True, exist_ok=True)
    (RES / "values" / "zz_presets.xml").write_text(
        '<?xml version="1.0" encoding="utf-8"?>\n<resources>\n'
        + "\n".join(colors) + "\n" + "\n".join(strings) + "\n</resources>\n",
        encoding="utf-8",
    )

    # 2) manifest
    mf = MAIN / "AndroidManifest.xml"
    ET.register_namespace("android", NS)
    ET.register_namespace("tools", "http://schemas.android.com/tools")
    tree = ET.parse(mf)
    app = tree.getroot().find("application")
    if app is None:
        fail("AndroidManifest.xml ichida <application> topilmadi")
    act = None
    for a in app.findall("activity"):
        if a.get(A + "name", "").endswith("MainActivity"):
            act = a
            break
    if act is None:
        fail("AndroidManifest.xml ichida MainActivity topilmadi")
    target = act.get(A + "name")

    for f in list(act.findall("intent-filter")):
        if any(c.get(A + "name") == "android.intent.category.LAUNCHER" for c in f.findall("category")):
            act.remove(f)
    for old in list(app.findall("activity-alias")):
        if old.get(A + "name", "").startswith(".Alias_"):
            app.remove(old)

    app.set(A + "icon", "@mipmap/ic_default")
    app.set(A + "roundIcon", "@mipmap/ic_default")

    for it in items:
        el = ET.SubElement(app, "activity-alias")
        el.set(A + "name", ".Alias_" + it["id"])
        el.set(A + "targetActivity", target)
        el.set(A + "enabled", "true" if it["id"] == "default" else "false")
        el.set(A + "exported", "true")
        el.set(A + "icon", "@mipmap/ic_" + it["id"])
        el.set(A + "label", "@string/alias_label_" + it["id"])
        f = ET.SubElement(el, "intent-filter")
        ET.SubElement(f, "action").set(A + "name", "android.intent.action.MAIN")
        ET.SubElement(f, "category").set(A + "name", "android.intent.category.LAUNCHER")
    # widgetlar bosilganda ochilgan ilova yangi intentni qabul qilishi uchun
    act.set(A + "launchMode", "singleTask")

    # 3) Java
    jdir = MAIN / "java" / Path(*pkg.split("."))
    if not (jdir / "MainActivity.java").is_file():
        found = list((MAIN / "java").rglob("MainActivity.java"))
        if not found:
            fail("MainActivity.java topilmadi")
        jdir = found[0].parent

    # 4) widgetlar (manifest yozuvlari ham shu yerda qo'shiladi)
    add_widgets(pkg, jdir, app, None)
    try:
        ET.indent(tree, space="    ")
    except AttributeError:
        pass
    tree.write(mf, encoding="utf-8", xml_declaration=True)
    ids = ", ".join('"%s"' % it["id"] for it in items)
    tpl = (Path(__file__).parent / "LauncherPlugin.java.tpl").read_text(encoding="utf-8")
    (jdir / "LauncherPlugin.java").write_text(
        tpl.replace("__PACKAGE__", pkg).replace("__IDS__", ids), encoding="utf-8")
    (jdir / "MainActivity.java").write_text(
        "package %s;\n\n"
        "import android.os.Bundle;\n"
        "import com.getcapacitor.BridgeActivity;\n\n"
        "public class MainActivity extends BridgeActivity {\n"
        "    @Override\n"
        "    public void onCreate(Bundle savedInstanceState) {\n"
        "        registerPlugin(LauncherPlugin.class);\n"
        "        super.onCreate(savedInstanceState);\n"
        "    }\n"
        "}\n" % pkg,
        encoding="utf-8",
    )
    print("OK: %d ta ikonka (alias), 4 ta widget qo'shildi, paket: %s" % (len(items), pkg))


if __name__ == "__main__":
    main()
