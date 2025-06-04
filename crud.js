function crearPersona() {
    var nombre = document.getElementById("nombre").value.trim(); // .trim() para quitar espacios al inicio/final
    var profesion = document.getElementById("profesion").value.trim();

    // Validar que los campos no estén vacíos
    if (nombre === "" || profesion === "") {
        alert("Por favor, ingresa el nombre y la profesión.");
        return; // Detener la función si los campos están vacíos
    }

    var personas = localStorage.getItem("personas");

    // Si no hay personas guardadas o es nulo/vacío, crear un nuevo array
    if (!personas || personas === "null" || personas === "") { // Mejoramos la condición
        personas = [];
    } else {
        personas = JSON.parse(personas);
    }

    // Verificar si la persona existe (para actualizar o añadir)
    var personaIndex = -1;
    for (var i = 0; i < personas.length; i++) {
        if (personas[i].nombre === nombre) {
            personaIndex = i;
            break;
        }
    }

    // Si la persona NO existe (personaIndex es -1), agregar al arreglo
    if (personaIndex === -1) { // ¡Corregido: era personaIndex == 1, ahora es -1!
        personas.push({
            nombre: nombre,
            profesion: profesion
        });
        alert("Persona creada exitosamente.");
    } else {
        // Si la persona ya existe, actualizar su profesión
        personas[personaIndex].profesion = profesion;
        alert("Profesión de " + nombre + " actualizada.");
    }

    // Guardar el arreglo actualizado en localStorage
    localStorage.setItem("personas", JSON.stringify(personas));

    // Mostrar datos y limpiar campos después de crear/actualizar
   // mostrarDatos();
    limpiar();
}


function mostrarDatos() {
    var personas = localStorage.getItem("personas");
    var tablaPersonas = document.getElementById("tablaPersonas"); 

    if (!personas || personas === "null" || personas === "") {
        // ¡Corregido 'colpsan' a 'colspan' y las etiquetas td!
        tablaPersonas.innerHTML = "<tr><td colspan='4'>No se encontraron datos.</td></tr>";

    } else {
        personas = JSON.parse(personas);
        // ¡Corregido el HTML de la cabecera y el cierre de etiquetas!
        var tablaHTML = "<tr><th>Número</th><th>Nombre</th><th>Profesión</th><th>Acciones</th></tr>";
        personas.forEach(function(usuario, indice) {
            // ¡Corregidas las etiquetas td y el cierre de la fila tr!
            tablaHTML += "<tr><td>" + (indice + 1) + "</td><td>" +
                usuario.nombre + "</td><td>" + usuario.profesion + "</td><td>" +
                "<button onclick='eliminarPersona(" + indice + ")'>Eliminar</button>" +
                "<button onclick='actualizarPersona(" + indice + ")'>Modificar</button>" + // Quitada una "+" extra
                "</td></tr>"; // Cierre correcto de <td> y </tr>
        });
        tablaPersonas.innerHTML = tablaHTML;
    }
}

function limpiar() {
    document.getElementById("nombre").value = "";
    document.getElementById("profesion").value = "";
}


function actualizarPersona(indice) { // La función ahora recibe el índice
    var personas = localStorage.getItem("personas"); // ¡Corregido "persoans" a "personas"!
    if (!personas) {
        alert("No hay datos para actualizar.");
        return;
    }
    personas = JSON.parse(personas);

    // Asegurarse de que el índice es válido
    if (indice < 0 || indice >= personas.length) {
        alert("Índice de persona no válido para actualizar.");
        return;
    }

    var usuario = personas[indice];

    // Usar prompt para obtener los nuevos valores
    var nuevoNombre = prompt("Modifica el nombre:", usuario.nombre); // Valor inicial
    var nuevaProfesion = prompt("Modifica la profesión:", usuario.profesion); // Valor inicial

    // Validar que no se cancelen los prompts y que los campos no estén vacíos
    if (nuevoNombre !== null && nuevoNombre.trim() !== "" &&
        nuevaProfesion !== null && nuevaProfesion.trim() !== "") {

        personas[indice].nombre = nuevoNombre.trim();
        personas[indice].profesion = nuevaProfesion.trim();

        localStorage.setItem("personas", JSON.stringify(personas));
        mostrarDatos();
        limpiar();
        alert("Persona actualizada exitosamente.");
    } else {
        alert("Actualización cancelada o campos vacíos.");
    }
}


function eliminarPersona(indice) { // La función ahora recibe el índice
    // Confirmación antes de eliminar
    if (!confirm("¿Estás seguro de que quieres eliminar esta persona?")) {
        return; // Si el usuario cancela, no hacemos nada
    }

    var personas = localStorage.getItem("personas"); // ¡Corregido "persoans" a "personas"!
    if (!personas) {
        alert("No hay datos para eliminar.");
        return;
    }
    personas = JSON.parse(personas);

    // Asegurarse de que el índice es válido
    if (indice < 0 || indice >= personas.length) {
        alert("Índice de persona no válido para eliminar.");
        return;
    }

    personas.splice(indice, 1); // Elimina 1 elemento desde el índice dado
    localStorage.setItem("personas", JSON.stringify(personas));
    mostrarDatos();
    limpiar();
    alert("Persona eliminada exitosamente.");
}