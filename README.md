# Voluntas Radio

Este proyecto es una aplicación web progresiva (PWA) para la Revista Voluntas, que ofrece tanto programas de radio como acceso a las revistas publicadas.

## Características

- **Radio Online**: Un reproductor de audio para escuchar los programas de radio de Voluntas.
- **Archivo de Programas**: Listado de todos los shows de radio disponibles.
- **Revistas Digitales**: Acceso a las diferentes publicaciones de la revista.
- **Instalable (PWA)**: La aplicación se puede instalar en dispositivos móviles y de escritorio para un acceso más rápido y una experiencia de usuario mejorada.

## Stack Tecnológico

- **Frontend**: [Vue 3](https://vuejs.org/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Routing**: [Vue Router](https://router.vuejs.org/)
- **Estilos**: [Sass](https://sass-lang.com/)

## Scripts del Proyecto

### Instalar dependencias
```bash
npm install
```

### Iniciar en modo desarrollo
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:3000` (o el puerto que indique Vite).

### Compilar para producción
```bash
npm run build
```
Los archivos compilados se generan en la carpeta `dist/`.

### Desplegar en GitHub Pages
```bash
npm run deploy
```
Este comando primero compila el proyecto y luego lo despliega en la rama `gh-pages`.
