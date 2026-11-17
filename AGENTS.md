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
- La página `/ds` (`src/pages/ds.astro`) documenta los fundamentos clave y de bajo nivel compartidos por el proyecto, como la tipografía, los tokens, el color y la estructura general.
- Consultar `/ds` antes de crear o modificar interfaces y seguir sus criterios, reutilizando los componentes y tokens existentes.
- Actualizar `/ds` únicamente cuando cambie un fundamento clave y compartido. No documentar automáticamente cada componente, decisión de implementación o patrón específico de una página.
