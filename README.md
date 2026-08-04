# Move Studio Platform Test

Sitio estatico independiente para simular la web real de una academia ficticia que integra componentes de HoySeBaila Platform.

El proyecto no usa React, Vue, Angular ni frameworks. Esta hecho con HTML, CSS y JavaScript puro para poder publicarse en cualquier hosting estatico.

## Estructura

```text
move-studio-platform-test/
├── index.html
├── actividades.html
├── nosotros.html
├── contacto.html
├── integracion.html
└── assets/
    ├── css/
    │   └── styles.css
    └── js/
        └── main.js
```

## Paginas incluidas

- `index.html`: home publica de Move Studio.
- `actividades.html`: grilla de actividades ficticias.
- `nosotros.html`: historia y equipo ficticio.
- `contacto.html`: datos y formulario demo sin envio real.
- `integracion.html`: pagina de pruebas para componentes embebidos.

## Ejecutar localmente

Como es un sitio estatico, se puede abrir `index.html` directamente en el navegador.

Para probarlo con servidor local, desde esta carpeta:

```bash
python -m http.server 8080
```

Luego abrir el navegador en el puerto indicado por el servidor local.

Si usas Node.js y prefieres `serve`:

```bash
npx serve .
```

## Configuracion de HoySeBaila Platform

La URL base de Platform esta centralizada en:

```text
assets/js/hsb-platform.config.js
```

El sitio carga scripts y futuras integraciones usando siempre:

```js
window.HSB_PLATFORM.baseUrl
```

Para cambiar de entorno, editar solamente `baseUrl` en ese archivo.

## Integracion con HoySeBaila Platform

La pagina `integracion.html` incluye la configuracion centralizada y el loader de Platform:

```html
<script src="assets/js/hsb-platform.config.js"></script>
<script src="assets/js/hsb-platform.js"></script>
```

`assets/js/hsb-platform.js` construye la URL de `embed.js` desde la configuracion central.

La pagina tambien incluye espacios de montaje con atributos `data-hsb-*`, por ejemplo:

```html
<div
  data-hsb-module="activity"
  data-hsb-component="list"
  data-hsb-place="pk_Ne3cDOQ0F2JuIToG4vrY4fFV">
</div>
```

El sandbox ya apunta a la clave publica del Lugar de desarrollo `Move Studio`, que tiene la integracion habilitada.

La pagina contiene contenedores de distintos tamanos y variantes para validar:

- Lista de actividades.
- Lista compacta.
- Contenedor estrecho.
- Detalle de actividad.
- Calendario.
- Reserva.
- Resumen de checkout.
- Pruebas con fondo claro y fondo oscuro.

Algunos componentes pueden no existir todavia. La estructura queda preparada para ir conectandolos durante el desarrollo de Platform.

## Publicar en hosting estatico

El proyecto puede publicarse sin build step. Solo hay que subir todos los archivos de esta carpeta.

Opciones habituales:

- GitHub Pages: subir el proyecto a un repositorio y activar Pages desde la rama principal.
- Netlify: arrastrar la carpeta al panel de deploy o conectar un repositorio.
- Cloudflare Pages: conectar el repositorio y dejar el comando de build vacio.

Para produccion, revisar solamente `assets/js/hsb-platform.config.js` y cambiar el valor de `baseUrl`.

## Notas

- Move Studio es una academia ficticia.
- El sitio no reutiliza componentes, estilos ni recursos visuales de HoySeBaila.
- El formulario de contacto no envia datos.
- `integracion.html` incluye `noindex` para evitar indexacion accidental cuando se publique.
