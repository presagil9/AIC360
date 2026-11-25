#!/usr/bin/env python3
"""Genera docs/Rediseno-web-aic360.pdf con los colores corporativos de aic360.

Uso: python3 docs/src/build_pdf.py   (necesita el paquete «markdown» y Playwright)
"""
import base64
import pathlib

import subprocess

import markdown

SRC = pathlib.Path(__file__).resolve().parent
DOCS = SRC.parent

PALETA = [
    ("Naranja", "#F39200", "#1C1C1B"),
    ("Carbón", "#1C1C1B", "#FFFFFF"),
    ("Petróleo", "#007B8B", "#FFFFFF"),
    ("Turquesa", "#2BB6B8", "#1C1C1B"),
]

CSS = """
@page { size: A4; margin: 22mm 18mm 20mm; }
@page :first { margin: 0; }
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; font-family: "Archivo", "Liberation Sans", Arial, sans-serif; font-size: 10.5pt;
       line-height: 1.55; color: #1C1C1B; }
a { color: #007B8B; text-decoration: none; border-bottom: 1px solid #2BB6B8; }
.portada { height: 297mm; width: 210mm; position: relative; display: flex; flex-direction: column;
           justify-content: space-between; padding: 26mm 20mm 22mm; page-break-after: always;
           background: #FFFFFF; overflow: hidden; }
.portada img { width: 70mm; }
.portada .barras { position: absolute; left: 0; right: 0; bottom: 16mm; }
.portada .barras i { display: block; height: 14mm; }
.portada .barras i:nth-child(1) { background: #1C1C1B; width: 100%; }
.portada .barras i:nth-child(2) { background: #007B8B; width: 82%; }
.portada .barras i:nth-child(3) { background: #2BB6B8; width: 64%; }
.portada h1 { font-size: 36pt; line-height: 1.05; margin: 0 0 8mm; font-weight: 800; letter-spacing: -.01em;
              max-width: 15ch; }
.portada .sub { font-size: 13pt; color: #3c3f40; max-width: 48ch; margin: 0; }
.portada .linea { width: 30mm; height: 2.2mm; background: #F39200; margin-bottom: 8mm; }
.portada .meta { font-size: 10pt; color: #5e6366; margin-bottom: 52mm; }
.portada .meta b { color: #1C1C1B; }
h2 { font-size: 19pt; font-weight: 800; margin: 10mm 0 4mm; padding-top: 3mm; color: #1C1C1B;
     page-break-after: avoid; border-top: 2.2mm solid #F39200; width: 100%; }
h3 { font-size: 12.5pt; font-weight: 700; color: #007B8B; margin: 7mm 0 2.5mm; page-break-after: avoid; }
p { margin: 0 0 3mm; }
ul, ol { margin: 0 0 3mm; padding-left: 6mm; }
li { margin-bottom: 1.2mm; }
li::marker { color: #F39200; font-weight: 700; }
ul:has(> li.tarea, > li.hecho) { list-style: none; padding-left: 0; }
li.tarea, li.hecho { padding-left: 7mm; position: relative; }
li.tarea::before, li.hecho::before { content: ""; position: absolute; left: 0; top: 1.3mm; width: 3.6mm; height: 3.6mm;
                       border: 1.4px solid #007B8B; border-radius: 1px; }
li.hecho { color: #5e6366; }
li.hecho::before { background: #007B8B; }
li.hecho::after { content: ""; position: absolute; left: 1.15mm; top: 1.7mm; width: 1.1mm; height: 2.1mm;
                            border: solid #fff; border-width: 0 1.5px 1.5px 0; transform: rotate(45deg); }
table { width: 100%; border-collapse: collapse; margin: 2mm 0 5mm; font-size: 9.2pt; page-break-inside: auto; }
tr { page-break-inside: avoid; }
th { background: #1C1C1B; color: #fff; text-align: left; font-weight: 700; padding: 2.2mm 2.6mm;
     border-bottom: 1mm solid #F39200; }
td { padding: 2mm 2.6mm; border-bottom: 1px solid #DCDFDF; vertical-align: top; }
tr:nth-child(even) td { background: #F3F4F3; }
code { font-family: inherit; font-size: .95em; color: #007B8B; background: #EAF6F6; padding: 0 1mm; border-radius: 1px; }
strong { color: #1C1C1B; }
.paleta { display: grid; grid-template-columns: repeat(4, 1fr); gap: 3mm; margin: 2mm 0 4mm; }
.paleta div { height: 24mm; padding: 3mm; display: flex; flex-direction: column; justify-content: flex-end;
              font-size: 9pt; line-height: 1.25; border-radius: 1px; }
.paleta b { font-size: 10.5pt; }
"""


def logo_b64():
    return base64.b64encode((SRC / "logo-aic360.png").read_bytes()).decode()


def cuerpo_html():
    md = (SRC / "rediseno.md").read_text(encoding="utf-8")
    md = md.replace("- [x] ", "- TAREA_HECHA ").replace("- [ ] ", "- TAREA_PENDIENTE ")
    md = md.replace("@@PALETA@@", "PALETA_AQUI")
    html = markdown.markdown(md, extensions=["tables"])
    paleta = '<div class="paleta">' + "".join(
        f'<div style="background:{c};color:{t}"><b>{n}</b>{c}</div>' for n, c, t in PALETA) + "</div>"
    html = html.replace("<p>PALETA_AQUI</p>", paleta)
    html = html.replace("<li>TAREA_HECHA ", '<li class="hecho">').replace("<li>TAREA_PENDIENTE ", '<li class="tarea">')
    return html


def main():
    html = cuerpo_html()
    doc = f"""<!doctype html><html lang="es"><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700;800&display=swap">
<style>{CSS}</style></head><body>
<section class="portada">
  <img src="data:image/png;base64,{logo_b64()}" alt="aic360">
  <div>
    <div class="linea"></div>
    <h1>Rediseño web aic360: qué necesitamos</h1>
    <p class="sub">Estructura, contenidos, diseño y pasos para rehacer aic360.es tomando como referencia la organización de areaconstruccion.com, con la identidad y los colores corporativos de aic360.</p>
  </div>
  <p class="meta"><b>aic360 · Ingeniería y construcción</b><br>Noviembre de 2026</p>
  <div class="barras"><i></i><i></i><i></i></div>
</section>
{html}
</body></html>"""
    salida_html = SRC / "rediseno.html"
    salida_html.write_text(doc, encoding="utf-8")
    js = f"""
const {{ chromium }} = require('/opt/node22/lib/node_modules/playwright');
(async () => {{
  const px = process.env.HTTPS_PROXY || process.env.https_proxy;
  const b = await chromium.launch(px ? {{ proxy: {{ server: px }} }} : {{}});
  const p = await b.newPage();
  await p.goto('file://{salida_html}', {{ waitUntil: 'networkidle', timeout: 60000 }});
  await p.evaluate(() => document.fonts.ready);
  console.log('Archivo cargada:', await p.evaluate(() => document.fonts.check('800 20px Archivo')));
  await p.pdf({{ path: '{DOCS / "Rediseno-web-aic360.pdf"}', format: 'A4', printBackground: true,
    displayHeaderFooter: true, headerTemplate: '<span></span>',
    footerTemplate: '<div style="width:100%;font-size:7.5pt;color:#5e6366;padding:0 18mm;display:flex;justify-content:space-between;font-family:Arial"><span>aic360 · Rediseño web</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>',
    margin: {{ top: '22mm', bottom: '20mm', left: '18mm', right: '18mm' }} }});
  await b.close();
}})();
"""
    subprocess.run(["node", "-e", js], check=True)
    salida_html.unlink()
    print("PDF generado:", DOCS / "Rediseno-web-aic360.pdf")


if __name__ == "__main__":
    main()
