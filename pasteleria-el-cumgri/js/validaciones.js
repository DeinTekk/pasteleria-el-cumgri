// Archivo de validaciones JavaScript para PASTELERIA EL CUMGRI

// Clase para manejar validaciones de formularios
class ValidadorFormularios {
    constructor() {
        this.errores = {};
    }

    // Validar campo requerido
    validarRequerido(valor, nombreCampo) {
        if (!valor || valor.trim() === '') {
            this.errores[nombreCampo] = `${nombreCampo} es requerido`;
            return false;
        }
        delete this.errores[nombreCampo];
        return true;
    }

    // Validar longitud mínima
    validarLongitudMinima(valor, minimo, nombreCampo) {
        if (valor && valor.length < minimo) {
            this.errores[nombreCampo] = `${nombreCampo} debe tener al menos ${minimo} caracteres`;
            return false;
        }
        delete this.errores[nombreCampo];
        return true;
    }

    // Validar longitud máxima
    validarLongitudMaxima(valor, maximo, nombreCampo) {
        if (valor && valor.length > maximo) {
            this.errores[nombreCampo] = `${nombreCampo} no puede exceder ${maximo} caracteres`;
            return false;
        }
        delete this.errores[nombreCampo];
        return true;
    }

    // Validar email
    validarEmail(email, nombreCampo = 'Email') {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            this.errores[nombreCampo] = 'Email no tiene un formato válido';
            return false;
        }
        delete this.errores[nombreCampo];
        return true;
    }

    // Validar emails específicos según requerimientos
    validarEmailEspecifico(email, nombreCampo = 'Email') {
        const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
        const esValido = dominiosPermitidos.some(dominio => email.endsWith(dominio));
        
        if (!esValido) {
            this.errores[nombreCampo] = 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl y @gmail.com';
            return false;
        }
        delete this.errores[nombreCampo];
        return true;
    }

    // Validar RUN chileno
    validarRUN(run, nombreCampo = 'RUN') {
        // Eliminar puntos y guión
        const runLimpio = run.replace(/\./g, '').replace('-', '');
        
        if (runLimpio.length < 7 || runLimpio.length > 9) {
            this.errores[nombreCampo] = 'RUN debe tener entre 7 y 9 caracteres';
            return false;
        }

        const cuerpo = runLimpio.slice(0, -1);
        const dv = runLimpio.slice(-1).toUpperCase();

        // Validar que el cuerpo sean solo números
        if (!/^\d+$/.test(cuerpo)) {
            this.errores[nombreCampo] = 'RUN debe contener solo números y dígito verificador';
            return false;
        }

        // Calcular dígito verificador
        let suma = 0;
        let multiplicador = 2;

        for (let i = cuerpo.length - 1; i >= 0; i--) {
            suma += parseInt(cuerpo[i]) * multiplicador;
            multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
        }

        const resto = suma % 11;
        const dvCalculado = resto === 0 ? '0' : resto === 1 ? 'K' : (11 - resto).toString();

        if (dv !== dvCalculado) {
            this.errores[nombreCampo] = 'RUN no es válido';
            return false;
        }

        delete this.errores[nombreCampo];
        return true;
    }

    // Validar contraseña
    validarContrasena(contrasena, nombreCampo = 'Contraseña') {
        if (contrasena.length < 4 || contrasena.length > 10) {
            this.errores[nombreCampo] = 'La contraseña debe tener entre 4 y 10 caracteres';
            return false;
        }
        delete this.errores[nombreCampo];
        return true;
    }

    // Validar número entero
    validarEntero(valor, nombreCampo, minimo = null, maximo = null) {
        const numero = parseInt(valor);
        
        if (isNaN(numero) || !Number.isInteger(numero)) {
            this.errores[nombreCampo] = `${nombreCampo} debe ser un número entero`;
            return false;
        }

        if (minimo !== null && numero < minimo) {
            this.errores[nombreCampo] = `${nombreCampo} debe ser mayor o igual a ${minimo}`;
            return false;
        }

        if (maximo !== null && numero > maximo) {
            this.errores[nombreCampo] = `${nombreCampo} debe ser menor o igual a ${maximo}`;
            return false;
        }

        delete this.errores[nombreCampo];
        return true;
    }

    // Validar número decimal
    validarDecimal(valor, nombreCampo, minimo = null, maximo = null) {
        const numero = parseFloat(valor);
        
        if (isNaN(numero)) {
            this.errores[nombreCampo] = `${nombreCampo} debe ser un número válido`;
            return false;
        }

        if (minimo !== null && numero < minimo) {
            this.errores[nombreCampo] = `${nombreCampo} debe ser mayor o igual a ${minimo}`;
            return false;
        }

        if (maximo !== null && numero > maximo) {
            this.errores[nombreCampo] = `${nombreCampo} debe ser menor o igual a ${maximo}`;
            return false;
        }

        delete this.errores[nombreCampo];
        return true;
    }

    // Validar fecha
    validarFecha(fecha, nombreCampo = 'Fecha') {
        const fechaObj = new Date(fecha);
        
        if (isNaN(fechaObj.getTime())) {
            this.errores[nombreCampo] = 'Fecha no es válida';
            return false;
        }

        delete this.errores[nombreCampo];
        return true;
    }

    // Mostrar errores en el formulario
    mostrarErrores(formularioId) {
        // Limpiar errores anteriores
        const formulario = document.getElementById(formularioId);
        if (!formulario) return;

        const mensajesError = formulario.querySelectorAll('.error-message');
        mensajesError.forEach(mensaje => mensaje.classList.remove('show'));

        const camposError = formulario.querySelectorAll('.form-control.error');
        camposError.forEach(campo => campo.classList.remove('error'));

        // Mostrar nuevos errores
        Object.keys(this.errores).forEach(nombreCampo => {
            const campo = formulario.querySelector(`[name="${nombreCampo}"], #${nombreCampo}`);
            const mensajeError = formulario.querySelector(`#error-${nombreCampo}`);

            if (campo) {
                campo.classList.add('error');
            }

            if (mensajeError) {
                mensajeError.textContent = this.errores[nombreCampo];
                mensajeError.classList.add('show');
            }
        });
    }

    // Limpiar errores
    limpiarErrores() {
        this.errores = {};
    }

    // Verificar si hay errores
    tieneErrores() {
        return Object.keys(this.errores).length > 0;
    }
}

// Instancia global del validador
const validador = new ValidadorFormularios();

// Funciones específicas para validación de formularios

// Validar formulario de registro
function validarFormularioRegistro() {
    validador.limpiarErrores();

    const run = document.getElementById('run')?.value || '';
    const nombre = document.getElementById('nombre')?.value || '';
    const apellidos = document.getElementById('apellidos')?.value || '';
    const email = document.getElementById('email')?.value || '';
    const fechaNacimiento = document.getElementById('fechaNacimiento')?.value || '';
    const region = document.getElementById('region')?.value || '';
    const comuna = document.getElementById('comuna')?.value || '';
    const direccion = document.getElementById('direccion')?.value || '';
    const contrasena = document.getElementById('contrasena')?.value || '';
    const confirmarContrasena = document.getElementById('confirmarContrasena')?.value || '';

    // Validaciones
    validador.validarRequerido(run, 'RUN');
    if (run) validador.validarRUN(run, 'RUN');

    validador.validarRequerido(nombre, 'Nombre');
    validador.validarLongitudMaxima(nombre, 50, 'Nombre');

    validador.validarRequerido(apellidos, 'Apellidos');
    validador.validarLongitudMaxima(apellidos, 100, 'Apellidos');

    validador.validarRequerido(email, 'Email');
    if (email) {
        validador.validarEmail(email, 'Email');
        validador.validarEmailEspecifico(email, 'Email');
        validador.validarLongitudMaxima(email, 100, 'Email');
    }

    if (fechaNacimiento) {
        validador.validarFecha(fechaNacimiento, 'Fecha de Nacimiento');
    }

    validador.validarRequerido(region, 'Región');
    validador.validarRequerido(comuna, 'Comuna');

    validador.validarRequerido(direccion, 'Dirección');
    validador.validarLongitudMaxima(direccion, 300, 'Dirección');

    validador.validarRequerido(contrasena, 'Contraseña');
    if (contrasena) validador.validarContrasena(contrasena, 'Contraseña');

    validador.validarRequerido(confirmarContrasena, 'Confirmar Contraseña');
    if (contrasena !== confirmarContrasena) {
        validador.errores['Confirmar Contraseña'] = 'Las contraseñas no coinciden';
    }

    validador.mostrarErrores('formularioRegistro');
    return !validador.tieneErrores();
}

// Validar formulario de login
function validarFormularioLogin() {
    validador.limpiarErrores();

    const email = document.getElementById('email')?.value || '';
    const contrasena = document.getElementById('contrasena')?.value || '';

    // Validaciones
    validador.validarRequerido(email, 'Email');
    if (email) {
        validador.validarLongitudMaxima(email, 100, 'Email');
        validador.validarEmailEspecifico(email, 'Email');
    }

    validador.validarRequerido(contrasena, 'Contraseña');
    if (contrasena) validador.validarContrasena(contrasena, 'Contraseña');

    validador.mostrarErrores('formularioLogin');
    return !validador.tieneErrores();
}

// Validar formulario de contacto
function validarFormularioContacto() {
    validador.limpiarErrores();

    const nombre = document.getElementById('nombre')?.value || '';
    const email = document.getElementById('email')?.value || '';
    const comentario = document.getElementById('comentario')?.value || '';

    // Validaciones
    validador.validarRequerido(nombre, 'Nombre');
    validador.validarLongitudMaxima(nombre, 100, 'Nombre');

    if (email) {
        validador.validarLongitudMaxima(email, 100, 'Email');
        validador.validarEmailEspecifico(email, 'Email');
    }

    validador.validarRequerido(comentario, 'Comentario');
    validador.validarLongitudMaxima(comentario, 500, 'Comentario');

    validador.mostrarErrores('formularioContacto');
    return !validador.tieneErrores();
}

// Validar formulario de producto (admin)
function validarFormularioProducto() {
    validador.limpiarErrores();

    const codigo = document.getElementById('codigo')?.value || '';
    const nombre = document.getElementById('nombre')?.value || '';
    const descripcion = document.getElementById('descripcion')?.value || '';
    const precio = document.getElementById('precio')?.value || '';
    const stock = document.getElementById('stock')?.value || '';
    const stockCritico = document.getElementById('stockCritico')?.value || '';
    const categoria = document.getElementById('categoria')?.value || '';

    // Validaciones
    validador.validarRequerido(codigo, 'Código');
    validador.validarLongitudMinima(codigo, 3, 'Código');

    validador.validarRequerido(nombre, 'Nombre');
    validador.validarLongitudMaxima(nombre, 100, 'Nombre');

    if (descripcion) {
        validador.validarLongitudMaxima(descripcion, 500, 'Descripción');
    }

    validador.validarRequerido(precio, 'Precio');
    if (precio) validador.validarDecimal(precio, 'Precio', 0);

    validador.validarRequerido(stock, 'Stock');
    if (stock) validador.validarEntero(stock, 'Stock', 0);

    if (stockCritico) {
        validador.validarEntero(stockCritico, 'Stock Crítico', 0);
    }

    validador.validarRequerido(categoria, 'Categoría');

    validador.mostrarErrores('formularioProducto');
    return !validador.tieneErrores();
}

// Validar formulario de usuario (admin)
function validarFormularioUsuario() {
    validador.limpiarErrores();

    const run = document.getElementById('run')?.value || '';
    const nombre = document.getElementById('nombre')?.value || '';
    const apellidos = document.getElementById('apellidos')?.value || '';
    const email = document.getElementById('email')?.value || '';
    const fechaNacimiento = document.getElementById('fechaNacimiento')?.value || '';
    const tipoUsuario = document.getElementById('tipoUsuario')?.value || '';
    const region = document.getElementById('region')?.value || '';
    const comuna = document.getElementById('comuna')?.value || '';
    const direccion = document.getElementById('direccion')?.value || '';

    // Validaciones
    validador.validarRequerido(run, 'RUN');
    if (run) validador.validarRUN(run, 'RUN');

    validador.validarRequerido(nombre, 'Nombre');
    validador.validarLongitudMaxima(nombre, 50, 'Nombre');

    validador.validarRequerido(apellidos, 'Apellidos');
    validador.validarLongitudMaxima(apellidos, 100, 'Apellidos');

    validador.validarRequerido(email, 'Email');
    if (email) {
        validador.validarEmail(email, 'Email');
        validador.validarEmailEspecifico(email, 'Email');
        validador.validarLongitudMaxima(email, 100, 'Email');
    }

    if (fechaNacimiento) {
        validador.validarFecha(fechaNacimiento, 'Fecha de Nacimiento');
    }

    validador.validarRequerido(tipoUsuario, 'Tipo de Usuario');
    validador.validarRequerido(region, 'Región');
    validador.validarRequerido(comuna, 'Comuna');

    validador.validarRequerido(direccion, 'Dirección');
    validador.validarLongitudMaxima(direccion, 300, 'Dirección');

    validador.mostrarErrores('formularioUsuario');
    return !validador.tieneErrores();
}

// Función para formatear RUN en tiempo real
function formatearRUNInput(input) {
    let valor = input.value.replace(/[^0-9kK]/g, '');
    
    if (valor.length <= 1) {
        input.value = valor;
        return;
    }
    
    const cuerpo = valor.slice(0, -1);
    const dv = valor.slice(-1);
    
    // Agregar puntos cada 3 dígitos desde la derecha
    const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
    input.value = `${cuerpoFormateado}-${dv}`;
}

// Función para validar en tiempo real
function validarCampoTiempoReal(input, tipoValidacion) {
    const valor = input.value;
    const nombreCampo = input.name || input.id;
    
    // Limpiar error anterior para este campo
    delete validador.errores[nombreCampo];
    
    switch(tipoValidacion) {
        case 'email':
            if (valor) {
                validador.validarEmail(valor, nombreCampo);
                validador.validarEmailEspecifico(valor, nombreCampo);
            }
            break;
        case 'run':
            if (valor) {
                validador.validarRUN(valor, nombreCampo);
            }
            break;
        case 'contrasena':
            if (valor) {
                validador.validarContrasena(valor, nombreCampo);
            }
            break;
    }
    
    // Mostrar/ocultar error para este campo específico
    const mensajeError = document.querySelector(`#error-${nombreCampo}`);
    if (mensajeError) {
        if (validador.errores[nombreCampo]) {
            mensajeError.textContent = validador.errores[nombreCampo];
            mensajeError.classList.add('show');
            input.classList.add('error');
        } else {
            mensajeError.classList.remove('show');
            input.classList.remove('error');
        }
    }
}

