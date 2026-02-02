# Respuestas de la Actividad CI/CD

## FASE 3 — Desplegar con GitHub Actions

**¿Qué significa CI? ¿Qué significa CD? ¿Por qué GitHub Actions sí es CI/CD?**
- **CI (Continuous Integration):** Integración Continua. Es la práctica de integrar cambios de código frecuentemente en un repositorio compartido, automatizando la construcción (build) y pruebas para detectar errores lo antes posible.
- **CD (Continuous Deployment):** Despliegue Continuo. Es la automatización del lanzamiento del software validado a un entorno de producción sin intervención manual.
- **Por qué GitHub Actions:** Cumple ambos porque el archivo `deploy.yml` configura un pipeline que detecta cambios (push), ejecuta la construcción del proyecto (CI) y automáticamente publica los artefactos resultantes en GitHub Pages (CD).

**¿Qué hace el YAML en el workflow? ¿Por qué GitHub Pages requiere configurar “base:” en vite.config.js?**
- **YAML:** Define la estructura del workflow: los eventos que lo disparan (`on:`), el entorno virtual (`runs-on:`), y los pasos secuenciales (`steps:`) como instalar dependencias, construir el proyecto y desplegarlo.
- **Base Path:** GitHub Pages aloja el proyecto en un subdirectorio (`usuario.github.io/nombre-repo/`). Sin `base: '/nombre-repo/'`, Vite asume que la raíz es `/`, causando que las rutas de scripts y estilos fallen (ej. buscando `/assets` en lugar de `/nombre-repo/assets`).

---

## FASE 4 — Cloudflare Pages

**¿Qué son Workers o Functions? ¿Qué significa serverless?**
- **Workers/Functions:** Son scripts que se ejecutan directamente en la red de distribución (edge) de Cloudflare más cercana al usuario, permitiendo lógica dinámica sin servidores tradicionales.
- **Serverless:** "Sin servidor" significa que el desarrollador no gestiona la infraestructura (S.O., actualizaciones, escalado). Solo sube el código y el proveedor (Cloudflare) se encarga de ejecutarlo y escalar automáticamente, cobrando solo por uso.

**¿Por qué ahora la “base:” de Vite es “/”? ¿Problemas con GitHub Actions?**
- **Base "/":** Cloudflare Pages asigna un subdominio dedicado (ej. `mi-app.pages.dev`) que actúa como la raíz del sitio, por lo que no necesita prefijos de subdirectorio.
- **Compatibilidad:** Si cambiamos `base: '/'` para Cloudflare, dejará de funcionar bien en GitHub Pages. 
- **Solución:** Usar una condicional en `vite.config.js` para detectar el entorno:
  ```javascript
  base: process.env.CF_PAGES ? '/' : '/mi-app-vite/',
  ```

**¿Qué significa que el contenido se sirve desde una CDN global? ¿Por qué es más próximo a producción?**
- **CDN Global:** El contenido se replica en cientos de servidores alrededor del mundo. Cuando un usuario accede, recibe los datos del servidor más cercano físicamente, reduciendo drásticamente la latencia.
- **Producción Real:** Cloudflare Pages ofrece infraestructura de grado empresarial: HTTPS automático, protección DDoS, dominios personalizados y soporte real de backend (Functions), lo que simula un entorno profesional mucho más fielmente que el hospedaje estático básico de GitHub Pages.
