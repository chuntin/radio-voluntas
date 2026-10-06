# Tutorial: cómo actualizar `db.json` en Voluntas Radio

Este documento explica **qué archivo tienes que actualizar de verdad**, cómo usar `editor-db.html`, cómo publicar cambios y qué papel tienen los dos `db.json` del proyecto.

---

## Resumen rápido

- **Archivo fuente de verdad:** `src/assets/db.json`
- **Archivo generado para publicación:** `public/db.json`
- **Editor web publicado:** `editor-db.html`
- **Comando de despliegue:** `npm run deploy`

> Regla importante: **edita y guarda siempre el contenido final en `src/assets/db.json`**.  
> `public/db.json` se genera automáticamente durante el proceso de build/deploy.

---

## 1. Qué `db.json` hay que actualizar realmente

En este proyecto existen dos rutas relacionadas con la base de datos:

### `src/assets/db.json`
Es el archivo **principal**.

- Lo usa la app Vue internamente.
- Se importa desde `src/services/radio.js`.
- Es el archivo que debes considerar como **la versión buena**.
- Es el que conviene guardar en git con commit.

### `public/db.json`
Es un archivo **derivado / generado**.

- Se usa para que `editor-db.html` pueda cargar el JSON publicado en GitHub Pages.
- **No deberías editarlo manualmente.**
- Se sobrescribe automáticamente al hacer build.

---

## 2. Flujo recomendado cuando te pasan un nuevo `db.json`

Este es el proceso normal si alguien usa el editor y te envía un `db.json` actualizado.

### Paso 1. Sustituye el archivo fuente

Reemplaza `src/assets/db.json` por el nuevo archivo.

```bash
cp ~/Downloads/db.json /home/javi/projects/voluntas/radio/src/assets/db.json
```

> Cambia `~/Downloads/db.json` por la ruta real del archivo que te hayan enviado.

### Paso 2. Haz commit del cambio

Esto es importante para que el repositorio conserve la versión correcta y para que el editor vuelva a cargar ese contenido como base la próxima vez.

```bash
cd /home/javi/projects/voluntas/radio
git add src/assets/db.json
git commit -m "Actualizar db.json"
```

### Paso 3. Publica en GitHub Pages

```bash
cd /home/javi/projects/voluntas/radio
npm run deploy
```

Con eso se actualiza:

- la app Vue
- el `db.json` público
- el `editor-db.html` publicado
- el `service worker` generado en `dist/`

---

## 3. Qué hace exactamente `npm run deploy`

Actualmente el `deploy` del proyecto construye y publica el contenido de `dist/` a GitHub Pages.

### Scripts actuales relevantes

- `build`: ejecuta Vite
- `postbuild`: hace tareas automáticas después del build
- `deploy`: vuelve a lanzar build y luego publica `dist/`

Durante `postbuild` pasan estas cosas:

1. Se genera `dist/sw.js` con una versión nueva de caché.
2. Se copia `src/assets/db.json` a `public/db.json`.
3. Se copia `dist/index.html` a `dist/404.html`.
4. Se copia `editor-db.html` a `dist/editor-db.html`.

---

## 4. Entonces, ¿tengo que ejecutar `postbuild` manualmente?

No.

`postbuild` se ejecuta **automáticamente** después de `npm run build`.

Por tanto:

```bash
npm run build
```

ya dispara también `postbuild` al terminar.

Y como `npm run deploy` incluye el build, no necesitas lanzar nada más aparte.

---

## 5. Cuándo hace falta commit y cuándo no

### Sí conviene hacer commit cuando cambia `src/assets/db.json`

Porque:

- esa es la fuente de verdad
- deja trazabilidad en git
- evita que en el futuro trabajes con una versión vieja
- el siguiente despliegue partirá del contenido correcto

### No hace falta commit de `public/db.json`

Porque:

- se genera automáticamente
- no es el origen del dato
- puede recrearse en cualquier build

### No hace falta commit de `dist/sw.js`

Porque:

- también se genera automáticamente en el build
- cambia de versión en cada despliegue
- no es un archivo fuente del proyecto

---

## 6. Cómo usar `editor-db.html`

El editor está pensado para abrirse publicado bajo el mismo dominio que la web, por ejemplo:

- `https://revistavoluntas.com/editor-db.html`

### Qué hace al abrirse

Intenta cargar primero:

- `./db.json`

Y si no existe, prueba:

- `src/assets/db.json`

Además añade un parámetro de timestamp para evitar caché agresiva del navegador o del service worker.

### Resultado práctico

Si has hecho el flujo correcto:

1. actualizas `src/assets/db.json`
2. haces commit
3. haces `npm run deploy`

entonces `editor-db.html` debería abrir siempre el contenido más reciente publicado.

---

## 7. Qué pasa con la caché

Hay varios niveles de caché posibles en GitHub Pages / navegador:

- caché del navegador
- caché del service worker
- assets compilados por Vite

En este proyecto ya hay medidas para reducir problemas:

### En `editor-db.html`

- el JSON se pide con `cache: 'no-store'`
- además se añade `?t=timestamp` a la URL

Eso ayuda a que el editor no reutilice una copia vieja del `db.json`.

### En `sw.js`

- cada build genera un nombre de caché nuevo
- el service worker borra cachés antiguas al activarse

### Si aun así ves datos viejos

Prueba este orden:

1. asegúrate de haber sustituido `src/assets/db.json`
2. haz commit de ese archivo
3. ejecuta `npm run deploy`
4. recarga la página
5. si hiciera falta, haz hard refresh

---

## 8. Flujo mínimo recomendado, paso por paso

Si quieres la versión corta y segura, usa siempre esto:

### Opción A: te envían un nuevo `db.json`

```bash
cp ~/Downloads/db.json /home/javi/projects/voluntas/radio/src/assets/db.json
cd /home/javi/projects/voluntas/radio
git add src/assets/db.json
git commit -m "Actualizar db.json"
npm run deploy
```

### Opción B: tú mismo editas con `editor-db.html`

1. Abre `editor-db.html`
2. Haz los cambios
3. Descarga el nuevo `db.json`
4. Reemplaza `src/assets/db.json` con ese archivo
5. Haz commit
6. Ejecuta `npm run deploy`

Comandos:

```bash
cp ~/Downloads/db.json /home/javi/projects/voluntas/radio/src/assets/db.json
cd /home/javi/projects/voluntas/radio
git add src/assets/db.json
git commit -m "Actualizar db.json desde editor-db"
npm run deploy
```

---

## 9. Qué NO hacer

Evita estas situaciones:

### No edites solo `public/db.json`

Si haces eso, puedes publicar algo puntual, pero la fuente real seguirá desactualizada en `src/assets/db.json`.

### No confíes solo en que “en local se ve bien”

El editor y la web publicada dependen del contenido desplegado en GitHub Pages.

### No subas a mano archivos de `dist/` como si fueran fuente

`dist/` es material generado de build. Lo importante es mantener bien `src/assets/db.json`.

---

## 10. Preguntas rápidas

### ¿Cuál es el `db.json` bueno?
`src/assets/db.json`

### ¿Cuál se publica para el editor?
`public/db.json`, generado automáticamente a partir del anterior.

### ¿Tengo que actualizar los dos?
No manualmente. Solo actualiza `src/assets/db.json`.

### ¿Tengo que hacer commit?
Sí, de `src/assets/db.json` es lo recomendable.

### ¿Tengo que comitear `sw.js` generado?
No.

### ¿Tengo que ejecutar `postbuild` a mano?
No.

### ¿Qué comando uso normalmente?

```bash
npm run deploy
```

---

## 11. Archivos relacionados

- `src/assets/db.json` → fuente de datos
- `public/db.json` → copia pública generada
- `src/services/radio.js` → consume `db.json` en la app Vue
- `editor-db.html` → editor manual del JSON
- `public/sw.js` → plantilla del service worker
- `package.json` → scripts de build y deploy

---

## 12. Recomendación final

Siempre que recibas un JSON nuevo o hagas cambios desde el editor:

1. guarda el resultado en `src/assets/db.json`
2. haz commit de ese archivo
3. ejecuta `npm run deploy`

Si sigues ese proceso, la app y el editor partirán siempre del mismo estado y evitarás desajustes entre archivos.
