// Archivo JavaScript principal para PASTELERIA EL CUMGRI

// Funciones de utilidad
function formatearPrecio(precio) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(precio);
}

function formatearFecha(fecha) {
    return new Intl.DateTimeFormat('es-CL').format(fecha);
}

// Función para mostrar/ocultar elementos
function toggleElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.toggle('hidden');
    }
}

// Función para scroll suave
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Función para filtrar productos por categoría
function filtrarProductosPorCategoria(categoria) {
    if (categoria === 'todos' || !categoria) {
        return productos;
    }
    return productos.filter(producto => producto.categoria === categoria);
}

// Función para buscar productos
function buscarProductos(termino) {
    const terminoLower = termino.toLowerCase();
    return productos.filter(producto => 
        producto.nombre.toLowerCase().includes(terminoLower) ||
        producto.descripcion.toLowerCase().includes(terminoLower) ||
        producto.categoria.toLowerCase().includes(terminoLower)
    );
}

// Función para obtener parámetros de URL
function obtenerParametroURL(nombre) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nombre);
}

// Función para mostrar productos en una grilla
function mostrarProductos(productosArray, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (productosArray.length === 0) {
        container.innerHTML = '<p class="text-center">No se encontraron productos.</p>';
        return;
    }

    container.innerHTML = productosArray.map(producto => `
        <div class="producto-card fade-in-up">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen" 
                 onclick="verDetalleProducto('${producto.codigo}')">
            <div class="producto-info">
                <h3 class="producto-nombre">${producto.nombre}</h3>
                <div class="producto-precio">${formatearPrecio(producto.precio)}</div>
                <p class="producto-descripcion">${producto.descripcion.substring(0, 100)}...</p>
                <div class="producto-acciones">
                    <button class="btn btn-secondary" onclick="verDetalleProducto('${producto.codigo}')">
                        Ver Detalle
                    </button>
                    <button class="btn btn-primary" onclick="agregarAlCarrito('${producto.codigo}')">
                        Agregar al Carrito
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Función para ver detalle de producto
function verDetalleProducto(codigoProducto) {
    window.location.href = `producto-detalle.html?codigo=${codigoProducto}`;
}

// Función para cargar categorías en un select
function cargarCategorias(selectId) {
    const select = document.getElementById(selectId);
    if (!select) return;

    select.innerHTML = '<option value="">Seleccionar categoría</option>';
    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        select.appendChild(option);
    });
}

// Función para mostrar mensaje de éxito
function mostrarMensajeExito(mensaje) {
    mostrarMensaje(mensaje, 'success');
}

// Función para mostrar mensaje de error
function mostrarMensajeError(mensaje) {
    mostrarMensaje(mensaje, 'error');
}

// Función genérica para mostrar mensajes
function mostrarMensaje(mensaje, tipo = 'info') {
    const mensajeDiv = document.createElement('div');
    mensajeDiv.className = `mensaje mensaje-${tipo}`;
    mensajeDiv.textContent = mensaje;
    
    const colores = {
        success: '#4CAF50',
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196F3'
    };

    mensajeDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colores[tipo] || colores.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    `;

    document.body.appendChild(mensajeDiv);

    setTimeout(() => {
        mensajeDiv.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            mensajeDiv.remove();
        }, 300);
    }, 4000);
}

// Función para validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Función para validar emails específicos según requerimientos
function validarEmailEspecifico(email) {
    const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
    return dominiosPermitidos.some(dominio => email.endsWith(dominio));
}

// Función para validar RUN chileno
function validarRUN(run) {
    // Eliminar puntos y guión
    run = run.replace(/\./g, '').replace('-', '');
    
    if (run.length < 7 || run.length > 9) {
        return false;
    }

    const cuerpo = run.slice(0, -1);
    const dv = run.slice(-1).toUpperCase();

    // Validar que el cuerpo sean solo números
    if (!/^\d+$/.test(cuerpo)) {
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

    return dv === dvCalculado;
}

// Función para formatear RUN
function formatearRUN(run) {
    // Eliminar caracteres no válidos
    run = run.replace(/[^0-9kK]/g, '');
    
    if (run.length <= 1) return run;
    
    const cuerpo = run.slice(0, -1);
    const dv = run.slice(-1);
    
    // Agregar puntos cada 3 dígitos desde la derecha
    const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
    return `${cuerpoFormateado}-${dv}`;
}

// Función para calcular edad
function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    
    return edad;
}

// Función para verificar si es cumpleaños
function esCumpleanos(fechaNacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    
    return hoy.getMonth() === nacimiento.getMonth() && 
           hoy.getDate() === nacimiento.getDate();
}

// Función para manejar errores de carga de imágenes
function manejarErrorImagen(img) {
    img.src = 'images/placeholder.jpg';
    img.alt = 'Imagen no disponible';
}

// Función para lazy loading de imágenes
function implementarLazyLoading() {
    const imagenes = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    imagenes.forEach(img => imageObserver.observe(img));
}

// Función para animar elementos al hacer scroll
function animarElementosScroll() {
    const elementos = document.querySelectorAll('.fade-in-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
            }
        });
    });

    elementos.forEach(el => observer.observe(el));
}

// Función para inicializar la aplicación
function inicializarApp() {
    // Implementar lazy loading
    implementarLazyLoading();
    
    // Animar elementos al scroll
    animarElementosScroll();
    
    // Manejar errores de imágenes
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', () => manejarErrorImagen(img));
    });
    
    // Actualizar contador del carrito
    if (typeof actualizarContadorCarrito === 'function') {
        actualizarContadorCarrito();
    }
}

// Estilos adicionales para animaciones
const estilosAdicionales = document.createElement('style');
estilosAdicionales.textContent = `
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .producto-acciones {
        display: flex;
        gap: 0.5rem;
        margin-top: 1rem;
    }
    
    .producto-acciones .btn {
        flex: 1;
        text-align: center;
        font-size: 0.9rem;
        padding: 0.5rem;
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
    
    .mensaje {
        font-weight: 500;
        line-height: 1.4;
    }
`;
document.head.appendChild(estilosAdicionales);

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializarApp);

