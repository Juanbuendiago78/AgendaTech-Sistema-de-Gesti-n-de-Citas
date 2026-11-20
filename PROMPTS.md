# PROMPTS.md – AgendaTech

## Sistema de Gestión de Citas

Este documento contiene los prompts utilizados durante el desarrollo de AgendaTech, una aplicación web creada con apoyo de inteligencia artificial para el seminario Gestión de Software Ágil asistido por Inteligencia Artificial.

Se utilizó ChatGPT como herramienta de apoyo para planificar el proyecto, generar código, mejorar el diseño visual y desarrollar las funcionalidades de la aplicación.

---

## PROMPT 01 – Planificación del proyecto

**Objetivo:** Definir la idea principal de la aplicación y establecer las características iniciales del proyecto.

**¿Qué se solicitó?**

Se pidió a ChatGPT ayuda para planificar una aplicación web de gestión de citas llamada AgendaTech, definiendo su propósito, características principales, tecnologías y organización inicial.

**Resultado esperado:**

- Definición del proyecto.
- Identificación de las funcionalidades principales.
- Selección de tecnologías.
- Planificación de las etapas de desarrollo.

---

## PROMPT 02 – Creación de la estructura HTML

**Objetivo:** Construir la estructura inicial de la aplicación.

**¿Qué se solicitó?**

Se solicitó generar el archivo `index.html` con los elementos necesarios para organizar el sistema de gestión de citas.

**Elementos solicitados:**

- Menú lateral de navegación.
- Encabezado principal.
- Panel de administración.
- Tarjetas de estadísticas.
- Formulario para registrar citas.
- Tabla para visualizar los registros.
- Secciones de búsqueda y filtros.

**Resultado esperado:**

Una primera versión de AgendaTech utilizando HTML, sin depender todavía del diseño CSS ni de la lógica completa de JavaScript.

---

## PROMPT 03 – Diseño visual con CSS

**Objetivo:** Mejorar la apariencia de la aplicación.

**¿Qué se solicitó?**

Se pidió a ChatGPT transformar la estructura HTML en una interfaz moderna, profesional y tecnológica mediante CSS3.

**Características solicitadas:**

- Diseño oscuro.
- Tonos negros y azul marino.
- Detalles turquesa.
- Menú lateral moderno.
- Tarjetas de estadísticas.
- Tabla organizada.
- Formularios y botones personalizados.
- Diseño adaptable a diferentes pantallas.

**Archivo generado:** `css/styles.css`.

**Resultado esperado:**

Una interfaz visualmente organizada, manteniendo la estructura HTML existente.

---

## PROMPT 03.1 – Mejoramiento del diseño visual

**Objetivo:** Perfeccionar la primera versión del diseño.

**¿Qué se solicitó?**

Después de revisar la primera propuesta visual, se identificó que el diseño podía mejorar. Por esta razón, se solicitó una segunda revisión enfocada en la apariencia de AgendaTech.

**Mejoras solicitadas:**

- Mejorar la combinación de colores.
- Perfeccionar la distribución de los elementos.
- Mejorar la presentación de las tarjetas.
- Organizar la tabla de citas.
- Mejorar los formularios y botones.
- Adaptar la interfaz a pantallas pequeñas.
- Mantener los identificadores y las clases existentes.

**Resultado esperado:**

Una interfaz más profesional y apropiada para un sistema de administración de citas, sin modificar las funcionalidades existentes.

---

## PROMPT 04 – Implementación de las funcionalidades CRUD

**Objetivo:** Desarrollar la lógica de la aplicación utilizando JavaScript.

**¿Qué se solicitó?**

Se solicitó implementar las operaciones principales del CRUD para permitir administrar los registros de citas.

**Funcionalidades solicitadas:**

1. Crear nuevas citas.
2. Consultar y mostrar las citas registradas.
3. Actualizar citas existentes.
4. Eliminar citas con confirmación.
5. Buscar citas por nombre o documento.
6. Filtrar citas por estado.
7. Actualizar las estadísticas automáticamente.
8. Guardar los registros mediante localStorage.
9. Recuperar los registros al recargar la página.
10. Validar los campos del formulario.

**Requisitos adicionales:**

- Utilizar JavaScript puro.
- Conservar el HTML y CSS existentes.
- Organizar el código mediante funciones.
- Evitar duplicaciones al editar.
- Explicar las funciones principales.
- Mantener la conexión entre los archivos.
- Proporcionar pruebas para comprobar las funcionalidades.

**Archivo previsto:** `js/app.js`.

---

## PROMPTS DE CORRECCIÓN Y MEJORA

Durante el desarrollo también se utilizaron instrucciones adicionales para revisar los resultados obtenidos y solicitar modificaciones cuando se identificaron aspectos que necesitaban mejorar.

### Correcciones de estructura y conexiones

**Objetivo:** revisar la organización de los archivos y comprobar las conexiones entre HTML, CSS y JavaScript.

**Resultado esperado:** mantener una estructura organizada y facilitar el mantenimiento del proyecto.

### Correcciones de diseño

**Objetivo:** mejorar los aspectos visuales identificados durante las pruebas de la primera versión.

**Resultado esperado:** conseguir una interfaz más clara, organizada y adaptable.

### Correcciones de funcionalidades

**Objetivo:** identificar y solucionar errores encontrados durante las pruebas de las operaciones CRUD.

**Resultado esperado:** conseguir que las funciones de registro, consulta, edición, eliminación, búsqueda y almacenamiento trabajen correctamente.

---

## Uso responsable de la inteligencia artificial

La inteligencia artificial se utilizó como herramienta de apoyo durante las diferentes etapas del proyecto.

Los códigos generados fueron revisados y ejecutados para comprobar su funcionamiento. Cuando se identificaron problemas, se solicitaron correcciones y mejoras mediante nuevas instrucciones.

El objetivo fue comprender la función de cada archivo y aprender cómo se relacionan HTML, CSS y JavaScript dentro de una aplicación web.

## Herramientas utilizadas

- ChatGPT: generación, explicación y mejora del código.
- Visual Studio Code: edición y organización de los archivos.
- HTML5: estructura de la aplicación.
- CSS3: diseño visual.
- JavaScript: funcionalidades del sistema.
- localStorage: almacenamiento local de información, si está habilitado en la versión final.

---

**Proyecto:** AgendaTech – Sistema de Gestión de Citas.

**Seminario:** Gestión de Software Ágil asistido por Inteligencia Artificial.