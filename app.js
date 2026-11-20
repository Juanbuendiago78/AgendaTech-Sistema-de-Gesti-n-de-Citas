
"use strict";

/* =====================================================
   AgendaTech - JavaScript CRUD
   Crear, consultar, actualizar y eliminar citas.
   Almacenamiento mediante localStorage.
===================================================== */

const CLAVE_ALMACENAMIENTO = "agendatech_citas";

let citas = [];

/* =====================================================
   1. INICIAR LA APLICACIÓN
===================================================== */

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciarAplicacion);
} else {
    iniciarAplicacion();
}

function iniciarAplicacion() {

    // Obtener elementos del HTML.
    const formulario = document.getElementById("formulario-cita");
    const tabla = document.getElementById("tabla-citas");

    if (!formulario || !tabla) {
        console.error("AgendaTech: no se encontró el formulario o la tabla.");
        return;
    }

    const campoId = document.getElementById("cita-id");
    const nombre = document.getElementById("nombre");
    const documento = document.getElementById("documento");
    const telefono = document.getElementById("telefono");
    const fecha = document.getElementById("fecha");
    const hora = document.getElementById("hora");
    const estado = document.getElementById("estado");
    const motivo = document.getElementById("motivo");

    const buscar = document.getElementById("buscar-cita");
    const filtro = document.getElementById("filtro-estado");
    const mensajeVacio = document.getElementById("mensaje-sin-citas");

    const total = document.getElementById("total-citas");
    const pendientes = document.getElementById("citas-pendientes");
    const confirmadas = document.getElementById("citas-confirmadas");
    const canceladas = document.getElementById("citas-canceladas");

    const botonGuardar = document.getElementById("btn-guardar");
    const tituloFormulario = document.getElementById("titulo-formulario");

    const sidebar = document.getElementById("sidebar");
    const botonMenu = document.getElementById("menu-toggle");

    const enlaces = document.querySelectorAll(".nav-link");

    // Recuperar los registros guardados.
    citas = cargarCitas();

    // Conectar los eventos.
    formulario.addEventListener("submit", guardarFormulario);

    formulario.addEventListener("reset", () => {
        setTimeout(limpiarFormulario, 0);
    });

    if (buscar) {
        buscar.addEventListener("input", mostrarCitas);
    }

    if (filtro) {
        filtro.addEventListener("change", mostrarCitas);
    }

    tabla.addEventListener("click", manejarBotonesTabla);

    if (botonMenu && sidebar) {
        botonMenu.addEventListener("click", () => {
            const abierto = sidebar.classList.toggle("sidebar-open");
            botonMenu.setAttribute("aria-expanded", String(abierto));
        });
    }

    enlaces.forEach((enlace) => {
        enlace.addEventListener("click", () => {
            enlaces.forEach((item) => {
                item.classList.remove("active");
                item.removeAttribute("aria-current");
            });

            enlace.classList.add("active");
            enlace.setAttribute("aria-current", "page");

            if (sidebar && botonMenu) {
                sidebar.classList.remove("sidebar-open");
                botonMenu.setAttribute("aria-expanded", "false");
            }
        });
    });

    /* ================================================
       2. GUARDAR INFORMACIÓN EN LOCALSTORAGE
    ================================================ */

    function guardarEnAlmacenamiento() {
        try {
            localStorage.setItem(
                CLAVE_ALMACENAMIENTO,
                JSON.stringify(citas)
            );

            return true;

        } catch (error) {
            console.error("Error al guardar:", error);

            alert(
                "No se pudieron guardar los datos. " +
                "Comprueba el almacenamiento del navegador."
            );

            return false;
        }
    }

    /* ================================================
       3. RECUPERAR INFORMACIÓN
    ================================================ */

    function cargarCitas() {
        try {
            const datos = localStorage.getItem(CLAVE_ALMACENAMIENTO);

            if (!datos) {
                return [];
            }

            const registros = JSON.parse(datos);

            if (!Array.isArray(registros)) {
                return [];
            }

            return registros.filter((cita) =>
                cita &&
                typeof cita.id === "string" &&
                typeof cita.nombre === "string" &&
                typeof cita.documento === "string" &&
                typeof cita.telefono === "string" &&
                typeof cita.fecha === "string" &&
                typeof cita.hora === "string" &&
                typeof cita.motivo === "string" &&
                ["pendiente", "confirmada", "cancelada", "completada"]
                    .includes(cita.estado)
            );

        } catch (error) {
            console.error("Error al recuperar las citas:", error);
            return [];
        }
    }

    /* ================================================
       4. GENERAR IDENTIFICADOR
    ================================================ */

    function generarId() {
        if (window.crypto && window.crypto.randomUUID) {
            return window.crypto.randomUUID();
        }

        return "cita-" + Date.now() + "-" +
            Math.random().toString(16).slice(2);
    }

    /* ================================================
       5. VALIDAR INFORMACIÓN
    ================================================ */

    function validarFecha(valor) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(valor)) {
            return false;
        }

        const partes = valor.split("-").map(Number);
        const comprobacion = new Date(
            partes[0],
            partes[1] - 1,
            partes[2]
        );

        return (
            comprobacion.getFullYear() === partes[0] &&
            comprobacion.getMonth() === partes[1] - 1 &&
            comprobacion.getDate() === partes[2]
        );
    }

    function validarDatos(datos) {

        if (
            !datos.nombre ||
            !datos.documento ||
            !datos.telefono ||
            !datos.fecha ||
            !datos.hora ||
            !datos.estado ||
            !datos.motivo
        ) {
            alert("Debes completar todos los campos.");
            return false;
        }

        if (datos.nombre.length < 3 || datos.nombre.length > 100) {
            alert("El nombre debe tener entre 3 y 100 caracteres.");
            nombre.focus();
            return false;
        }

        if (datos.documento.length > 30) {
            alert("El documento no puede superar 30 caracteres.");
            documento.focus();
            return false;
        }

        const numeroTelefono = datos.telefono.replace(/\D/g, "");

        if (
            numeroTelefono.length < 7 ||
            numeroTelefono.length > 15
        ) {
            alert("Ingresa un número de teléfono válido.");
            telefono.focus();
            return false;
        }

        if (!validarFecha(datos.fecha)) {
            alert("Selecciona una fecha válida.");
            fecha.focus();
            return false;
        }

        if (!/^\d{2}:\d{2}$/.test(datos.hora)) {
            alert("Selecciona una hora válida.");
            hora.focus();
            return false;
        }

        const estadosPermitidos = [
            "pendiente",
            "confirmada",
            "cancelada",
            "completada"
        ];

        if (!estadosPermitidos.includes(datos.estado)) {
            alert("Selecciona un estado válido.");
            estado.focus();
            return false;
        }

        if (datos.motivo.length > 500) {
            alert("El motivo no puede superar 500 caracteres.");
            motivo.focus();
            return false;
        }

        return true;
    }

    /* ================================================
       6. REGISTRAR Y ACTUALIZAR CITAS
    ================================================ */

    function guardarFormulario(evento) {
        evento.preventDefault();

        if (!formulario.reportValidity()) {
            return;
        }

        const datos = {
            nombre: nombre.value.trim().replace(/\s+/g, " "),
            documento: documento.value.trim(),
            telefono: telefono.value.trim(),
            fecha: fecha.value,
            hora: hora.value,
            estado: estado.value,
            motivo: motivo.value.trim()
        };

        if (!validarDatos(datos)) {
            return;
        }

        const idActual = campoId.value;

        // ACTUALIZAR una cita existente.
        if (idActual) {

            const posicion = citas.findIndex(
                (cita) => cita.id === idActual
            );

            if (posicion === -1) {
                alert("No se encontró la cita que deseas actualizar.");
                prepararNuevoRegistro();
                return;
            }

            const citaAnterior = citas[posicion];

            citas[posicion] = {
                ...citaAnterior,
                ...datos,
                id: idActual
            };

            if (!guardarEnAlmacenamiento()) {
                citas[posicion] = citaAnterior;
                return;
            }

            alert("La cita se actualizó correctamente.");

        } else {

            // CREAR una cita nueva.
            const nuevaCita = {
                id: generarId(),
                ...datos,
                creadoEn: new Date().toISOString()
            };

            citas.push(nuevaCita);

            if (!guardarEnAlmacenamiento()) {
                citas.pop();
                return;
            }

            alert("La cita se registró correctamente.");
        }

        prepararNuevoRegistro();
        mostrarCitas();
        actualizarEstadisticas();
    }

    /* ================================================
       7. MOSTRAR CITAS EN LA TABLA
    ================================================ */

    function mostrarCitas() {

        const texto = buscar
            ? buscar.value.trim().toLowerCase()
            : "";

        const estadoSeleccionado = filtro
            ? filtro.value
            : "";

        const resultado = citas.filter((cita) => {

            const coincideTexto =
                cita.nombre.toLowerCase().includes(texto) ||
                cita.documento.toLowerCase().includes(texto);

            const coincideEstado =
                estadoSeleccionado === "" ||
                cita.estado === estadoSeleccionado;

            return coincideTexto && coincideEstado;
        });

        // Eliminar solamente las filas creadas por JavaScript.
        tabla.querySelectorAll("tr[data-cita-id]").forEach((fila) => {
            fila.remove();
        });

        // Mostrar mensaje cuando no hay resultados.
        if (mensajeVacio) {
            mensajeVacio.hidden = resultado.length > 0;

            const celda = mensajeVacio.querySelector("td");

            if (celda) {
                celda.textContent = citas.length === 0
                    ? "No hay citas registradas."
                    : "No se encontraron citas.";
            }
        }

        // Crear las filas de la tabla.
        resultado.forEach((cita) => {
            tabla.appendChild(crearFila(cita));
        });
    }

    function crearFila(cita) {

        const fila = document.createElement("tr");
        fila.dataset.citaId = cita.id;

        agregarCelda(fila, cita.id);
        agregarCelda(fila, cita.nombre);
        agregarCelda(fila, cita.documento);
        agregarCelda(fila, cita.telefono);
        agregarCelda(fila, formatearFecha(cita.fecha));
        agregarCelda(fila, cita.hora);
        agregarCelda(fila, cita.motivo);

        // Estado.
        const celdaEstado = document.createElement("td");
        const etiqueta = document.createElement("span");

        etiqueta.className = "estado estado-" + cita.estado;
        etiqueta.textContent = capitalizar(cita.estado);

        celdaEstado.appendChild(etiqueta);
        fila.appendChild(celdaEstado);

        // Acciones.
        const celdaAcciones = document.createElement("td");

        const botonEditar = document.createElement("button");
        botonEditar.type = "button";
        botonEditar.className = "btn btn-primary";
        botonEditar.textContent = "Editar";
        botonEditar.dataset.action = "editar";
        botonEditar.dataset.id = cita.id;

        const botonEliminar = document.createElement("button");
        botonEliminar.type = "button";
        botonEliminar.className = "btn btn-secondary";
        botonEliminar.textContent = "Eliminar";
        botonEliminar.dataset.action = "eliminar";
        botonEliminar.dataset.id = cita.id;

        celdaAcciones.append(
            botonEditar,
            document.createTextNode(" "),
            botonEliminar
        );

        fila.appendChild(celdaAcciones);

        return fila;
    }

    function agregarCelda(fila, contenido) {
        const celda = document.createElement("td");
        celda.textContent = contenido;
        fila.appendChild(celda);
    }

    function formatearFecha(valor) {
        if (!validarFecha(valor)) {
            return valor;
        }

        const [anio, mes, dia] = valor.split("-").map(Number);

        return new Intl.DateTimeFormat("es-CO", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }).format(new Date(anio, mes - 1, dia));
    }

    function capitalizar(texto) {
        return texto.charAt(0).toUpperCase() + texto.slice(1);
    }

    /* ================================================
       8. EDITAR Y ELIMINAR
    ================================================ */

    function manejarBotonesTabla(evento) {

        const boton = evento.target.closest("button[data-action]");

        if (!boton || !tabla.contains(boton)) {
            return;
        }

        const id = boton.dataset.id;

        if (boton.dataset.action === "editar") {
            editarCita(id);
        }

        if (boton.dataset.action === "eliminar") {
            eliminarCita(id);
        }
    }

    function editarCita(id) {

        const cita = citas.find((registro) => registro.id === id);

        if (!cita) {
            alert("No se encontró la cita.");
            return;
        }

        campoId.value = cita.id;
        nombre.value = cita.nombre;
        documento.value = cita.documento;
        telefono.value = cita.telefono;
        fecha.value = cita.fecha;
        hora.value = cita.hora;
        estado.value = cita.estado;
        motivo.value = cita.motivo;

        if (tituloFormulario) {
            tituloFormulario.textContent = "Editar cita";
        }

        if (botonGuardar) {
            botonGuardar.textContent = "Actualizar cita";
        }

        document.getElementById("nueva-cita").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    function eliminarCita(id) {

        const cita = citas.find((registro) => registro.id === id);

        if (!cita) {
            alert("No se encontró la cita.");
            return;
        }

        const confirmar = confirm(
            "¿Estás seguro de eliminar la cita de " +
            cita.nombre + "?"
        );

        if (!confirmar) {
            return;
        }

        const copiaAnterior = [...citas];

        citas = citas.filter((registro) => registro.id !== id);

        if (!guardarEnAlmacenamiento()) {
            citas = copiaAnterior;
            return;
        }

        if (campoId.value === id) {
            prepararNuevoRegistro();
        }

        mostrarCitas();
        actualizarEstadisticas();

        alert("La cita fue eliminada correctamente.");
    }

    /* ================================================
       9. ACTUALIZAR ESTADÍSTICAS
    ================================================ */

    function actualizarEstadisticas() {

        if (total) {
            total.textContent = citas.length;
        }

        if (pendientes) {
            pendientes.textContent = citas.filter(
                (cita) => cita.estado === "pendiente"
            ).length;
        }

        if (confirmadas) {
            confirmadas.textContent = citas.filter(
                (cita) => cita.estado === "confirmada"
            ).length;
        }

        if (canceladas) {
            canceladas.textContent = citas.filter(
                (cita) => cita.estado === "cancelada"
            ).length;
        }
    }

    /* ================================================
       10. LIMPIAR FORMULARIO
    ================================================ */

    function limpiarFormulario() {
        campoId.value = "";
        estado.value = "pendiente";

        if (tituloFormulario) {
            tituloFormulario.textContent = "Registrar nueva cita";
        }

        if (botonGuardar) {
            botonGuardar.textContent = "Guardar cita";
        }
    }

    function prepararNuevoRegistro() {
        formulario.reset();
        limpiarFormulario();
    }

    /* ================================================
       11. CARGA INICIAL
    ================================================ */

    mostrarCitas();
    actualizarEstadisticas();
    prepararNuevoRegistro();
}
