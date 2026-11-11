# Instrucciones del proyecto

- Usar pnpm para instalar dependencias y ejecutar scripts; la versión está fijada en `package.json`.
- Mantener `pnpm-lock.yaml` como único archivo de bloqueo. No usar npm ni generar `package-lock.json`.
- Validar los cambios con `pnpm check` y `pnpm build`.

## Content

- Always English for the code, vars, classnames, comments, etc.
- Spanish for the web text (galician allowed when need it)
- Use coruña.fyi instead of coruna.fyi in the web text

## Sistema de diseño

- Implementar siempre los estilos con utilidades de Tailwind CSS y los tokens existentes. No usar CSS vanilla, hojas CSS específicas por componente, bloques `<style>` ni estilos inline.
- La página `/ds` (`src/pages/ds.astro`) es la fuente de verdad para el diseño del proyecto: arquitectura de la interfaz, composición, componentes, tipografía, espaciado, uso semántico de cada color y patrones de interacción.
- Consultar `/ds` antes de crear o modificar interfaces y seguir sus criterios, reutilizando los componentes y tokens existentes.
- Si hace falta introducir o cambiar un patrón de diseño, actualizar también `/ds` para mantener la documentación y la implementación alineadas.
