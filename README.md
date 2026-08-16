# Move Studio Platform Test

Sitio estatico independiente que simula la web real de una academia ficticia que aloja una zona HoySeBaila Platform dentro de su propio layout.

Este proyecto representa solamente el escenario:

```text
web existente de una academia + zona Platform embebida
```

Move Studio conserva su chrome exterior, pero la zona de agenda renderiza el contenido publicado desde `publishedConfig.page`.

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
        `-- main.js
```

## Paginas Incluidas

- `index.html`: home publica de Move Studio.
- `actividades.html`: grilla editorial ficticia propia de Move Studio.
- `nosotros.html`: historia y equipo ficticio.
- `contacto.html`: datos y formulario demo sin envio real.
- `integracion.html`: pagina de agenda de Move Studio con la zona Platform publicada embebida.

## Responsabilidades

Move Studio controla:

- header y navegacion;
- footer;
- layout y responsive de la web cliente.

HoySeBaila Platform aporta la zona editable/publicada:

- Hero;
- Weekly Schedule;
- Activity List;
- Contacto;
- orden, visibilidad, textos, CTA, fondos e imagenes definidos en Platform;
- Activity Detail;
- inscripcion;
- auth;
- barra personal;
- drawers;
- mapas;
- deep links;
- theme de la integracion.

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

## Zona Platform Embebida

`integracion.html` usa el snippet oficial de HoySeBaila Platform. El cliente no aloja JavaScript propio de Platform:

```html
<div
  data-hsb-platform="plt_NQwdwtkVAGtHs5uJ"
  data-hsb-render="site">
</div>

<script
  async
  src="https://dev.hoysebaila.uy/platform/embed.js">
</script>
```

El snippet debe permanecer estable. HoySeBaila evoluciona `embed.js` del lado de HSB y los clientes reciben las mejoras automaticamente, sin mantener archivos propios ni versionar codigo de Platform en su sitio.

Para instalar otra integracion, se modifica solamente la clave publica:

```html
data-hsb-platform="plt_xxxxxxxxxxxx"
```

## Validacion Manual

En `integracion.html`, revisar:

- El contenido Platform publicado coincide con el editor de HSB sin controles.
- Hero, Horarios, Actividades y Contacto salen de `publishedConfig.page`.
- Weekly Schedule carga y permite seleccionar dias.
- Activity List carga y responde al ancho real del contenedor.
- Activity Detail abre en drawer sin salir de Move Studio.
- Modal de horario abre desde Weekly Schedule.
- Inscripcion y login usan los flujos reales de Platform.
- La barra personal aparece cuando corresponde.
- Deep links compartidos abren directamente el drawer correcto.
- El theme light/dark proviene de la configuracion Platform.
- Desktop y mobile usan el mismo renderer Platform publicado dentro del chrome de Move Studio.

## Publicar En Hosting Estatico

El proyecto no requiere build. Se puede publicar subiendo la carpeta completa a cualquier hosting estatico.

Para produccion, revisar solamente la clave publica de Platform del snippet.

## Notas

- Move Studio es una academia ficticia.
- El contenido editorial de la zona Platform pertenece a la configuracion publicada de Platform.
- El formulario de contacto no envia datos.
- La pagina de integracion incluye `noindex` para evitar indexacion accidental durante pruebas.
