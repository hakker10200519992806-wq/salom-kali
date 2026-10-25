#!/usr/bin/env node
// www/ ichidagi buyruqlar ro'yxatini (veb ilovadagi D massivi) bir xil tartibda JSON qilib chiqaradi:
//   1) index.html: const R=`...` (asosiy ro'yxat);  2) index.html: D.push({...}) qatorlari;
//   3) plus.js / plus2.js: A("kategoriya","nom","izoh",[["buyruq","izoh"]]) qatorlari.
// Foydalanish: node extract_commands.js <www papkasi>
const fs = require("fs"), path = require("path"), vm = require("vm");
const www = path.resolve(process.argv[2] || path.join(__dirname, "..", "www"));
const read = f => (fs.existsSync(path.join(www, f)) ? fs.readFileSync(path.join(www, f), "utf8") : "");
const html = read("index.html");
const m = html.match(/const R=`([\s\S]*?)`;/);
if (!m) { console.error("const R=`...` topilmadi"); process.exit(1); }
const D = m[1].trim().split("\n").map(l => {
  const [c, n, d, x] = l.split("@@");
  return { c, n, d, x: x.split(";;").map(s => s.split("::")) };
});
const box = { D };
vm.createContext(box);
for (const l of html.split("\n")) if (l.startsWith("D.push(") && l.trimEnd().endsWith(");")) vm.runInContext(l, box);
vm.runInContext("var A=(c,n,dd,x)=>D.push({c,n,d:dd,x});", box);
for (const f of ["plus.js", "plus2.js", "lessons3.js", "lessons4.js"])
  for (const l of read(f).split("\n")) if (l.startsWith("A(") && l.trimEnd().endsWith(");")) vm.runInContext(l, box);
const out = box.D.filter(x => x && x.n && x.x && x.x.length)
  .map(x => ({ c: x.c, n: x.n, d: x.d, x: x.x.map(e => [String(e[0]), String(e[1] || "")]) }));
process.stdout.write(JSON.stringify(out));
