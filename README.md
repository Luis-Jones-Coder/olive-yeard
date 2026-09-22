# Olive Yard Properties Website

Sitio web estático preparado para abrir en Visual Studio Code y publicar mediante GitHub Pages.

## Contenido del proyecto


- `index.html`: estructura de la web y sus secciones.
- `styles.css`: diseño responsive, transiciones y estilos del visor 3D.
- `app.js`: navegación, vídeos, formulario y carga del modelo 3D.
- `assets/`: imágenes, vídeos, modelo GLB y visor 3D.

## Abrir en Visual Studio Code

1. Descomprime el archivo ZIP.
2. Abre Visual Studio Code.
3. Selecciona **File > Open Folder**.
4. Selecciona la carpeta `Olive-Yard-Properties-Website`.
5. Para verla localmente, instala la extensión **Live Server**.
6. Haz clic derecho sobre `index.html` y selecciona **Open with Live Server**.

No abras `index.html` directamente mediante `file://`, porque algunos navegadores restringen la carga del modelo 3D. Utiliza Live Server.

## Subir el proyecto a GitHub desde Visual Studio Code

1. Abre la pestaña **Source Control**.
2. Pulsa **Initialize Repository**.
3. Añade los archivos con el botón **+**.
4. Escribe un mensaje, por ejemplo: `Initial Olive Yard Properties website`.
5. Pulsa **Commit**.
6. Pulsa **Publish Branch** y elige si el repositorio será público o privado.

También puedes utilizar la terminal integrada:

```bash
git init
git add .
git commit -m "Initial Olive Yard Properties website"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
git push -u origin main
```

## Activar GitHub Pages

1. En GitHub, abre el repositorio.
2. Entra en **Settings > Pages**.
3. En **Build and deployment**, selecciona **Deploy from a branch**.
4. Selecciona la rama `main` y la carpeta `/ (root)`.
5. Pulsa **Save**.

GitHub mostrará la dirección pública cuando termine la publicación.

## Editar la información

- Textos, navegación y datos de contacto: `index.html`.
- Colores, tamaños y disposición: `styles.css`.
- Comportamiento y animaciones: `app.js`.
- Imágenes, vídeos y casa 3D: carpeta `assets`.

## Nota sobre GitHub

Todos los archivos del proyecto están por debajo del límite individual de 100 MB de GitHub. Los vídeos y el modelo 3D están incluidos en el ZIP.
