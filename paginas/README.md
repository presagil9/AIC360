# Páginas web de aic360 (bloques HTML para WordPress)

En `wordpress/` hay un archivo por página. Cada uno lleva todo lo necesario (fuente, estilos, contenido y JavaScript), así que no hace falta instalar ningún plugin.

| Archivo | Página de WordPress |
|---|---|
| `01-inicio.html` | Página de inicio |
| `02-servicios.html` | Servicios (`?page_id=36`) |
| `03-industrial-terciario.html` | Industrial y terciario (`?page_id=40`) |
| `04-edificacion.html` | Edificación (`?page_id=42`) |
| `05-obra-civil.html` | Obra civil (`?page_id=46`) |
| `06-contacto.html` | Contacto (`?page_id=49`) |

## Cómo pegar cada página

1. Abre la página en el editor de WordPress.
2. Borra el contenido que tenga.
3. Añade un bloque **HTML personalizado** (escribe `/html`).
4. Abre el archivo correspondiente, copia **todo** su contenido y pégalo en el bloque.
5. En el panel derecho, en *Plantilla*, elige una plantilla de **ancho completo** o **sin título** si tu tema la tiene.
6. Pulsa *Actualizar* y revisa la página publicada (la vista previa del editor no ejecuta el JavaScript).

Notas:

- Tienes que estar conectado como **administrador**: WordPress solo permite guardar `<script>` a usuarios con permiso `unfiltered_html`.
- Usa el editor de bloques (Gutenberg). El editor clásico añade etiquetas `<p>` y `<br>` que rompen la maquetación.
- Las páginas ocupan todo el ancho de la pantalla aunque el tema tenga una columna estrecha. El título que pinta el tema se oculta automáticamente, porque cada página ya tiene el suyo.
- La cabecera con el menú y el pie de página siguen siendo los del tema.
- Si usas un plugin de caché u optimización (WP Rocket, Autoptimize…), vacía la caché después de pegar.

## Enlaces entre páginas

Todos los botones y enlaces apuntan a las direcciones completas:

| Enlace | Dirección |
|---|---|
| Inicio | `https://aic360.es/` |
| Servicios | `https://aic360.es/?page_id=36` |
| Industrial y terciario | `https://aic360.es/?page_id=40` |
| Edificación | `https://aic360.es/?page_id=42` |
| Obra civil | `https://aic360.es/?page_id=46` |
| Contacto | `https://aic360.es/?page_id=49` |

- Las páginas tienen que estar **publicadas**. Si una está en borrador (por ejemplo, la de Servicios si solo se abre con `&preview=true`), quien no haya iniciado sesión verá un error 404 al pulsar su enlace.
- Si cambias una dirección (por ejemplo, al activar los enlaces permanentes bonitos), edita el bloque `ENLACES` de `build.py` y vuelve a generar las páginas.
- El menú de la cabecera es del tema: se configura en *Apariencia → Menús* (o *Apariencia → Editor → Navegación* en temas de bloques). Para que las tres áreas cuelguen de Servicios, arrástralas debajo de Servicios como subelementos.

## Imágenes

Las rutas apuntan a `https://aic360.es/wp-content/uploads/2026/10/…`, que es donde están las fotos que subiste a la biblioteca de medios. Si cambias o renombras una foto, busca su nombre en el archivo y sustitúyelo.

Las fotos de la galería abren un visor a pantalla completa: se cierra con *Esc* y se navega con las flechas del teclado o deslizando en el móvil.

## Formulario de contacto

El formulario comprueba los campos y abre el programa de correo del visitante con el mensaje ya redactado para `info@aic360.es`. Funciona sin plugins ni servidor.

Si prefieres que el mensaje se envíe directamente desde la web, instala **Contact Form 7** o **WPForms** y sustituye el `<form>…</form>` por el shortcode del plugin en un bloque *Shortcode* separado.

Revisa también el texto de la casilla de privacidad y enlázalo a tu página de política de privacidad.

## Cómo modificar las páginas

No edites directamente `wordpress/`: esos archivos se generan.

- `src/base.css`: estilos comunes (colores, tipografía, componentes).
- `src/base.js`: comportamiento (carrusel del inicio, visor, contadores, formulario, mapa).
- `src/pages/*.html`: el contenido de cada página. `@@` equivale a la carpeta de imágenes y `{{flecha}}` al icono de flecha.

Después de editar, ejecuta:

```
python3 paginas/build.py
```

## Comprobaciones hechas

Cada página se ha probado en Chromium, dentro de un tema de prueba con estilos agresivos (para comprobar que los estilos del tema no se cuelan), a 1440, 1024 y 390 px de ancho:

- sin errores de JavaScript ni scroll horizontal, y ocupando todo el ancho;
- todas las imágenes visibles cargan y se revelan al hacer scroll;
- visor de galería: abrir, pasar de foto y cerrar con *Esc*;
- formulario: errores de campos obligatorios, correo mal escrito y aviso final;
- mapa: el cambio entre Sevilla y Villaverde del Río funciona;
- enlaces: se ha pulsado cada uno de los 35 enlaces internos y todos llevan a su página;
- con JavaScript desactivado el contenido se sigue viendo.
