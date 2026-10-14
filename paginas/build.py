#!/usr/bin/env python3
"""Genera los bloques listos para pegar en WordPress (bloque «HTML personalizado»).

Cada archivo de wordpress/ es autocontenido: fuentes + CSS + HTML + JS.
Uso: python3 paginas/build.py
"""
import pathlib
import re

RAIZ = pathlib.Path(__file__).resolve().parent
SRC = RAIZ / "src"
SALIDA = RAIZ / "wordpress"

UPLOADS = "https://aic360.es/wp-content/uploads/2026/10"
FLECHA = ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" '
          'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
          '<path d="M5 12h14M13 6l6 6-6 6"/></svg>')
FUENTES = ('<link rel="preconnect" href="https://fonts.googleapis.com">'
           '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
           '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&amp;display=swap">')

# Direcciones de cada página. Si alguna cambia, se modifica aquí y se vuelve a generar.
WEB = "https://aic360.es"
ENLACES = {
    "inicio": WEB + "/",
    "servicios": WEB + "/?page_id=36",
    "industrial": WEB + "/?page_id=40",
    "edificacion": WEB + "/?page_id=42",
    "obracivil": WEB + "/?page_id=46",
    "contacto": WEB + "/?page_id=49",
}

TITULOS = {
    "01-inicio": "Inicio (página principal)",
    "02-servicios": "Servicios (page_id=36)",
    "03-industrial-terciario": "Industrial y terciario (page_id=40)",
    "04-edificacion": "Edificación (page_id=42)",
    "05-obra-civil": "Obra civil (page_id=46)",
    "06-contacto": "Contacto (page_id=49)",
}


def css_min(css: str) -> str:
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    css = re.sub(r"\s+", " ", css)
    css = re.sub(r"\s*([{};,>])\s*", r"\1", css)
    css = css.replace(";}", "}")
    return css.strip()


def sin_lineas_vacias(txt: str) -> str:
    return "\n".join(l.rstrip() for l in txt.splitlines() if l.strip())


def main():
    css = css_min((SRC / "base.css").read_text(encoding="utf-8"))
    js = sin_lineas_vacias((SRC / "base.js").read_text(encoding="utf-8"))
    SALIDA.mkdir(exist_ok=True)
    for pagina in sorted((SRC / "pages").glob("*.html")):
        html = pagina.read_text(encoding="utf-8")
        html = html.replace("@@", UPLOADS).replace("{{flecha}}", FLECHA)
        for clave, url in ENLACES.items():
            html = html.replace("{{" + clave + "}}", url)
        html = sin_lineas_vacias(html)
        assert "{{" not in html and "@@" not in html, pagina.name
        bloque = "\n".join([
            f"<!-- aic360 | {TITULOS[pagina.stem]} | Pegar entero en un bloque «HTML personalizado» -->",
            FUENTES,
            f"<style>{css}</style>",
            html,
            f"<script>\n{js}\n</script>",
        ])
        (SALIDA / pagina.name).write_text(bloque + "\n", encoding="utf-8")
        print(f"{pagina.name}: {len(bloque.encode()) // 1024} KB")


if __name__ == "__main__":
    main()
