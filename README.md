# Move Studio Platform Test

Sitio estatico independiente que simula la web real de una academia ficticia que instala componentes HoySeBaila Platform en su propio layout.

Este proyecto representa solamente el escenario:

```text
web existente de una academia + componentes HoySeBaila Platform embebidos
```

No usa el renderer ni la configuracion editorial de paginas completas generadas por Platform.

## Estructura

```text
move-studio-platform-test/
|-- index.html
|-- actividades.html
|-- nosotros.html
|-- contacto.html
|-- integracion.html
`-- assets/
    |-- css/
    |   `-- styles.css
    `-- js/
        |-- main.js
        |-- hsb-platform.config.js
        `-- hsb-platform.js
```

## Paginas Incluidas

- `index.html`: home publica de Move Studio.
- `actividades.html`: grilla editorial ficticia propia de Move Studio.
- `nosotros.html`: historia y equipo ficticio.
- `contacto.html`: datos y formulario demo sin envio real.
- `integracion.html`: pagina de agenda de Move Studio con componentes Platform embebidos.

## Responsabilidades

Move Studio controla:

- header y navegacion;
- hero;
- titulos, textos y CTAs editoriales;
- secciones de contenido;
- footer;
- layout y responsive de la web cliente.

HoySeBaila Platform aporta unicamente la experiencia embebida:

- Weekly Schedule;
- Activity List;
- Activity Detail;
- inscripcion;
- auth;
- barra personal;
- drawers;
- mapas;
- deep links;
- theme interno de los componentes.

## Ejecutar Localmente

Como es un sitio estatico, se puede abrir `index.html` directamente en el navegador.

Para probarlo con servidor local, desde esta carpeta:

```bash
python -m http.server 8080
```

Si Python no esta disponible:

```bash
npx serve . -l 8080
```

Luego abrir:

```text
http://localhost:8080/integracion.html
```

## Configuracion De Platform

La URL base y la clave de la Integracion de Platform estan centralizadas en:

```text
assets/js/hsb-platform.config.js
```

Para cambiar de entorno o integracion:

```js
window.HSB_PLATFORM = {
  baseUrl: "https://dev.hoysebaila.uy",
  platformKey: "plt_xxxxxxxxxxxx"
};
```

## Slots Embebidos

`integracion.html` declara espacios propios del sitio cliente:

```html
<div data-hsb-platform-slot="weekly-schedule"></div>
<div data-hsb-platform-slot="activity-list"></div>
```

`assets/js/hsb-platform.js` los adapta al contrato oficial del embed, agrega la clave `plt_`, define el modulo correspondiente y carga:

```html
<script src="https://dev.hoysebaila.uy/platform/embed.js"></script>
```

## Validacion Manual

En `integracion.html`, revisar:

- Weekly Schedule carga y permite seleccionar dias.
- Activity List carga y responde al ancho real del contenedor.
- Activity Detail abre en drawer sin salir de Move Studio.
- Modal de horario abre desde Weekly Schedule.
- Inscripcion y login usan los flujos reales de Platform.
- La barra personal aparece cuando corresponde.
- Deep links compartidos abren directamente el drawer correcto.
- El theme light/dark proviene de la configuracion Platform.
- Desktop y mobile usan la misma pagina y los mismos componentes reales.

## Publicar En Hosting Estatico

El proyecto no requiere build. Se puede publicar subiendo la carpeta completa a cualquier hosting estatico.

Para produccion, revisar solamente `assets/js/hsb-platform.config.js` y cambiar `baseUrl` y `platformKey` si corresponde.

## Notas

- Move Studio es una academia ficticia.
- El contenido editorial pertenece a Move Studio.
- El formulario de contacto no envia datos.
- La pagina de integracion incluye `noindex` para evitar indexacion accidental durante pruebas.
