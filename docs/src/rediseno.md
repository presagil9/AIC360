## Objetivo

Queremos rehacer aic360.es con una estructura y un estilo parecidos a los de [areaconstruccion.com](https://www.areaconstruccion.com/), pero con la marca, los proyectos y los textos de aic360.

Este documento reúne todo lo necesario antes de empezar el diseño: qué páginas tendrá la web, qué contenidos tiene que aportar aic360, qué decisiones de diseño y técnicas hay que tomar, y en qué orden se hará el trabajo. Cada punto pendiente lleva una casilla para ir marcándolo.

No se trata de copiar la web de referencia. Usamos su organización y su forma de presentar los proyectos como modelo; los textos, las fotos y el diseño final serán propios de aic360.

Los colores serán los corporativos de aic360, los del logotipo: naranja, carbón, petróleo y turquesa. La sección «Diseño» detalla la paleta.

## Cómo es la web de referencia

La web de Área Construcción se organiza alrededor de sus proyectos: cada obra tiene su propia página y se agrupa por sector. Es una web WordPress hecha con el constructor Bricks. La revisamos el 23 de noviembre de 2026.

### Menú

Botón «Menú» desplegable, también en ordenador: Quiénes somos · Sectores que trabajamos · Descubre cómo lo hacemos · Blog · Contacto · Trabaja con nosotros · Descargar dossier.

### Portada, de arriba abajo

1. Foto aérea a pantalla completa con el lema «Construyendo tu satisfacción, día a día».
2. Franja de color con cuatro cifras animadas: +20 años, 1 millón de m², +300 aperturas comerciales, +1.500 habitaciones de hotel.
3. Presentación breve en dos columnas: título a la izquierda y texto a la derecha.
4. «Nuestros proyectos»: seis proyectos destacados en rejilla de tamaños distintos, con nombre y sector.
5. Banda de color a todo el ancho con la llamada: «¿Quieres empezar tu proyecto con nosotros?».
6. «Nuestra misión», con foto.
7. «Descarga nuestro Dossier de Obras», con botón de descarga del PDF.
8. Carrusel de logos de clientes: «Trabajamos con los mejores aliados».
9. Opiniones de clientes (todavía con texto de relleno en su web).
10. Últimas publicaciones de Instagram.
11. Sellos de calidad (certificaciones).
12. Pie con las tres oficinas, menú, legales y un formulario de contacto.

### Páginas internas

| Página | Qué contiene |
| --- | --- |
| Quiénes somos | Cifras (facturación, cartera, 110 empleados), historia, cronología por años desde 2003, responsabilidad social, «Por qué elegirnos» (plazos, costes, posventa) y fichas del equipo directivo |
| Sectores | Cinco sectores (industrial, comercial, hotelero, residencial y obra pública), cada uno con su página |
| Página de sector | Texto corto, botón «Descargar catálogo sector» y rejilla con todos los proyectos de ese sector (20 en industrial) |
| Ficha de proyecto | Nombre, galería de fotos grande, campos de ubicación y capital invertido, y «Otros proyectos» |
| Descubre cómo lo hacemos | Valores (calidad, confianza, compromiso, cercanía) y proceso en cinco pasos, del primer contacto a la posventa |
| Blog | Artículos con fecha, filtro por categoría y orden por título o fecha |
| Contacto | Oficinas, mapa y enlace a ofertas de empleo |

### Estilo

- Un solo color de marca muy presente en franjas, botones y pie. En nuestra web ese papel lo hacen el naranja y el carbón de aic360.
- Tipografía Poppins, títulos en negrita.
- Fotos con una esquina muy redondeada, que es su rasgo más reconocible.
- Mucho espacio en blanco y fotos de obra grandes.
- Formulario con el plugin Forminator y caché con WP Rocket.

### Lo que no debemos copiar

- Opiniones de clientes con texto de relleno a la vista.
- Apartados de logos y sellos que en algunas cargas aparecen vacíos.
- Enlace «Trabaja con nosotros» que da error 404.
- Bloques de pasos repetidos tres veces en «Cómo lo hacemos».

## Mapa de la nueva web

La nueva web pasa de 6 páginas sueltas a una estructura con fichas de proyecto, como la de referencia. Las direcciones que ya existen se mantienen.

| Página | Dirección | Contenido |
| --- | --- | --- |
| Inicio | `/` | Foto aérea, cifras, presentación, proyectos destacados, llamada a contactar, dossier, logos de clientes, sellos y oficinas |
| Quiénes somos | `/quienes-somos/` (nueva) | Historia, cronología, equipo, valores y por qué elegirnos |
| Servicios | `/servicios/` | Las tres áreas con acceso a cada una |
| Industrial y terciario | `/industrial-y-terciario/` | Texto del área y rejilla con sus proyectos |
| Edificación | `/edificacion/` | Texto del área y rejilla con sus proyectos |
| Obra civil | `/obra-civil/` | Texto del área y rejilla con sus proyectos |
| Ficha de proyecto | `/proyecto/nombre-del-proyecto/` (nueva) | Galería, cliente, ubicación, superficie, año, descripción y otros proyectos |
| Cómo trabajamos | `/como-trabajamos/` (nueva) | Proceso de obra paso a paso y valores |
| Blog o noticias | `/blog/` (opcional) | Artículos y novedades de obra |
| Trabaja con nosotros | `/empleo/` (opcional) | Ofertas y formulario para enviar el CV |
| Contacto | `/contacto/` | Oficinas, mapa y formulario |
| Legales | `/aviso-legal/`, `/politica-de-privacidad/`, `/politica-de-cookies/` | Textos legales obligatorios |

Menú propuesto: Quiénes somos · Servicios (con las tres áreas como submenú) · Proyectos · Cómo trabajamos · Contacto · botón «Descargar dossier».

Con los 19 proyectos del dossier de 2026 ya hay contenido para 19 fichas: 9 de industrial y terciario, 6 de edificación y 4 de obra civil.

## Contenidos que tiene que aportar aic360

El contenido es lo que más retrasa una web. Esta es la lista de lo que necesitamos de aic360; cada casilla se marca cuando esté entregado.

### Empresa

- [x] Logotipo en alta calidad (SVG o PNG con fondo transparente), en color y en blanco.
- [ ] Año de fundación y fechas clave para la cronología.
- [ ] Cifras reales que se puedan publicar: años de experiencia, m² construidos, número de obras, empleados, facturación si se quiere mostrar.
- [ ] Misión y valores, aunque sea en borrador.
- [x] Equipo: nombre, cargo y foto de las personas que se quieran mostrar.
- [ ] Certificaciones o sellos (ISO 9001, 14001, 45001, clasificación de contratista…) con sus logotipos.
- [ ] Permiso de los clientes para usar su logotipo: Verallia, AGQ Labs, Engie, Buenabuelo, Óptica 2000 y otros.

### Proyectos (una ficha por obra)

- [ ] Nombre del proyecto y área (industrial y terciario, edificación u obra civil).
- [ ] Cliente, o «cliente privado» si no se puede nombrar.
- [ ] Ubicación (municipio y provincia).
- [ ] Superficie en m² y año de finalización.
- [ ] Presupuesto, solo si se quiere publicar.
- [ ] Dos o tres frases sobre qué se hizo.
- [ ] Entre 4 y 10 fotos por proyecto, sin marcas de agua, de al menos 2.000 px de ancho.
- [ ] Elegir 6 proyectos destacados para la portada.

### Contacto y legal

- [ ] Teléfono de cada oficina (en la web actual no aparece ninguno).
- [ ] Correos de contacto: general, empleo y protección de datos.
- [ ] Razón social y CIF para el aviso legal.
- [ ] Perfiles de LinkedIn e Instagram (el dossier muestra los dos iconos).
- [ ] Dossier en PDF, comprimido por debajo de 10 MB, para descargar. El actual pesa 23 MB.

### Opcional

- [ ] Opiniones de clientes con nombre y empresa, con su permiso.
- [ ] Vídeo aéreo de obra para la portada.
- [ ] Ofertas de empleo, si se quiere la sección de empleo.

## Diseño

La nueva web usa los colores corporativos de aic360, los del logotipo. De la web de referencia tomamos la idea: la estructura, el orden de las secciones y la forma de presentar los proyectos. Su rojo no se usa en ningún sitio.

### Paleta corporativa

@@PALETA@@

| Color | Código | En el logo | Uso en la web |
| --- | --- | --- | --- |
| Naranja | #F39200 | «360» | Botones, cifras destacadas, líneas de acento y llamadas a la acción |
| Carbón | #1C1C1B | «aic» y barra superior | Textos, cabecera, franja de cifras y pie de página |
| Petróleo | #007B8B | Barra central | Enlaces, iconos y fondos de secciones |
| Turquesa | #2BB6B8 | Barra inferior | Detalles, estados activos y fondos suaves |
| Blanco y gris claro | #FFFFFF / #F3F4F3 | Fondo | Fondo general y separación entre secciones |

El naranja se reserva para lo que tiene que llamar la atención. Sobre fondo blanco, los textos y enlaces van en carbón o petróleo, porque el naranja no se lee bien en letra pequeña.

### Cómo aplicamos la idea de la referencia

| Elemento | Idea de la referencia | Versión aic360 |
| --- | --- | --- |
| Portada | Foto aérea a pantalla completa con el lema | Foto o vídeo aéreo de obra, lema en blanco y botón naranja |
| Franja de cifras | Bloque de color bajo la portada | Franja carbón con las cifras en naranja, como la del dossier |
| Rejilla de proyectos | Fotos de tamaños alternos, nombre y sector debajo | Igual, con cliente y m², y el área en petróleo |
| Forma de las fotos | Una esquina muy redondeada | Recurso propio basado en las tres barras del logo |
| Llamada a contactar | Banda de color a todo el ancho | Banda naranja con texto carbón |
| Tipografía | Poppins | Una sola familia geométrica, cercana a la del logo, por decidir |
| Menú | Botón «Menú» también en ordenador | Menú visible en ordenador y botón en móvil, sobre fondo blanco o carbón |
| Pie | Oficinas, legales y formulario | Fondo carbón: oficinas, teléfonos, legales, redes y botón naranja de contacto |

Antes de diseñar todas las páginas se prepara una maqueta de la portada y de una ficha de proyecto para aprobarla.

## Parte técnica

El cambio más importante es que los proyectos dejen de estar escritos en HTML dentro de cada página. Pasan a ser un tipo de contenido «Proyectos» que aic360 puede añadir desde el escritorio de WordPress, rellenando campos y subiendo fotos.

### Cómo construirla

| Opción | Ventajas | Inconvenientes |
| --- | --- | --- |
| Tema propio AIC360 (ya iniciado en el repositorio) con tipo de contenido Proyectos | Sin licencias, rápido, diseño exclusivo | Los cambios de diseño grandes requieren un desarrollador |
| Constructor visual (Bricks, como la referencia, o Elementor) | Se editan las páginas arrastrando bloques | Licencia anual de pago y web más pesada |

Recomendación: el tema propio, porque ya está empezado y aic360 solo necesitará editar proyectos y textos, no el diseño.

### Plugins necesarios

| Función | Plugin recomendado | Coste |
| --- | --- | --- |
| Formulario de contacto y empleo | Forminator o Contact Form 7 | Gratis |
| Aviso de cookies | Complianz | Gratis |
| SEO (títulos, descripciones, sitemap) | Rank Math o Yoast SEO | Gratis |
| Velocidad y caché | WP Rocket (el de la referencia) o LiteSpeed Cache si el hosting lo permite | WP Rocket es de pago |
| Optimización de imágenes | Imagify o ShortPixel | Gratis con límite |
| Copias de seguridad | UpdraftPlus | Gratis |
| Redirecciones de las direcciones antiguas | Redirection | Gratis |

### Requisitos

- Enlaces permanentes con el nombre de la entrada (Ajustes → Enlaces permanentes), para tener direcciones como `/proyecto/centro-logistico-verallia/`.
- Certificado SSL activo: la web ya responde por https.
- Fuentes alojadas en el propio servidor, no cargadas desde Google, para cumplir el RGPD.
- Fotos subidas a un máximo de 2.560 px y comprimidas.
- Aviso legal, política de privacidad y política de cookies publicados antes del lanzamiento.
- Web de pruebas (staging) para diseñar sin tocar la web pública.

## Lo que ya tenemos

Buena parte del material ya existe y se reaprovecha.

- **Dossier de proyectos 2026:** 19 proyectos con cliente y superficie, que son la base de las fichas.
- **Fotos ya subidas a WordPress:** 5 de edificación, 11 industriales y 9 de obra civil, en la biblioteca de medios (carpeta 2026/10). Faltan fotos asignadas a cada proyecto concreto. Dos de las industriales están generadas con IA y conviene sustituirlas por fotos reales.
- **Textos de las 6 páginas actuales:** presentación, áreas, proceso de trabajo y preguntas frecuentes, que se pueden revisar y reutilizar.
- **Colores y logo** sacados del dossier: carbón, naranja y dos turquesas.
- **Base del tema AIC360** en el repositorio de GitHub, con los colores y tipografías definidos.
- **Direcciones de las páginas** ya creadas: /servicios/, /industrial-y-terciario/, /edificacion/, /obra-civil/ y /contacto/.
- **Oficinas:** Sevilla (Torneo Parque Empresarial, Avda. de la Arquitectura 3, Torre 7) y Villaverde del Río (C/ San Sebastián 2). Correo info@aic360.es.

## Pasos y decisiones pendientes

El orden importa: sin contenidos no se puede cerrar el diseño, y sin diseño aprobado no conviene programar.

### Orden de trabajo

1. Aprobar este documento y tomar las decisiones de abajo.
2. Reunir los contenidos de la sección «Contenidos que tiene que aportar aic360», empezando por las fichas de proyecto y sus fotos.
3. Maqueta de la portada y de una ficha de proyecto, para revisarla y aprobarla.
4. Montar una web de pruebas con el tema, el tipo de contenido Proyectos y los plugins.
5. Cargar los 19 proyectos del dossier y el resto de páginas.
6. Revisar en ordenador, tablet y móvil; comprobar enlaces, formularios, velocidad y textos legales.
7. Publicar, redirigir las direcciones antiguas y dar de alta la web en Google Search Console.

### Decisiones pendientes

- [ ] ¿Tema propio o constructor visual de pago?
- [ ] ¿Qué secciones opcionales queremos: blog, empleo, opiniones, Instagram?
- [ ] ¿Qué cifras de empresa se publican?
- [ ] ¿Se muestra el equipo con fotos?
- [ ] ¿Qué 6 proyectos van en la portada?
- [ ] ¿Se pueden publicar los logotipos de los clientes?
- [ ] ¿Un solo idioma o también inglés?
- [ ] ¿Quién mantendrá la web y añadirá proyectos nuevos?
