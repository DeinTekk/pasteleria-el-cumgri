// Funcionalidad del carrito de compras
class CarritoCompras {
    constructor() {
        this.items = this.cargarCarrito();
        this.actualizarUI();
    }

    // Cargar carrito desde localStorage
    cargarCarrito() {
        const carritoGuardado = localStorage.getItem('carritoElCumgri');
        return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    }

    // Guardar carrito en localStorage
    guardarCarrito() {
        localStorage.setItem('carritoElCumgri', JSON.stringify(this.items));
    }

    // Agregar producto al carrito
    agregarProducto(codigoProducto, cantidad = 1) {
        const producto = productos.find(p => p.codigo === codigoProducto);
        if (!producto) {
            console.error('Producto no encontrado:', codigoProducto);
            return false;
        }

        const itemExistente = this.items.find(item => item.codigo === codigoProducto);
        
        if (itemExistente) {
            itemExistente.cantidad += cantidad;
        } else {
            this.items.push({
                codigo: producto.codigo,
                nombre: producto.nombre,
                precio: producto.precio,
                imagen: producto.imagen,
                cantidad: cantidad
            });
        }

        this.guardarCarrito();
        this.actualizarUI();
        this.mostrarNotificacion(`${producto.nombre} agregado al carrito`);
        return true;
    }

    // Eliminar producto del carrito
    eliminarProducto(codigoProducto) {
        this.items = this.items.filter(item => item.codigo !== codigoProducto);
        this.guardarCarrito();
        this.actualizarUI();
    }

    // Actualizar cantidad de un producto
    actualizarCantidad(codigoProducto, nuevaCantidad) {
        const item = this.items.find(item => item.codigo === codigoProducto);
        if (item) {
            if (nuevaCantidad <= 0) {
                this.eliminarProducto(codigoProducto);
            } else {
                item.cantidad = nuevaCantidad;
                this.guardarCarrito();
                this.actualizarUI();
            }
        }
    }

    // Obtener total del carrito
    obtenerTotal() {
        return this.items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    }

    // Obtener cantidad total de items
    obtenerCantidadTotal() {
        return this.items.reduce((total, item) => total + item.cantidad, 0);
    }

    // Vaciar carrito
    vaciarCarrito() {
        this.items = [];
        this.guardarCarrito();
        this.actualizarUI();
    }

    // Actualizar UI del carrito
    actualizarUI() {
        this.actualizarContador();
        this.actualizarSidebar();
    }

    // Actualizar contador del carrito
    actualizarContador() {
        const contador = document.getElementById('cartCount');
        if (contador) {
            contador.textContent = this.obtenerCantidadTotal();
        }
    }

    // Actualizar sidebar del carrito
    actualizarSidebar() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        
        if (!cartItems || !cartTotal) return;

        if (this.items.length === 0) {
            cartItems.innerHTML = '<p class="text-center text-secondary">Tu carrito está vacío</p>';
        } else {
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item">
                    <img src="${item.imagen}" alt="${item.nombre}" class="cart-item-image">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.nombre}</div>
                        <div class="cart-item-price">$${item.precio.toLocaleString('es-CL')}</div>
                        <div class="cart-item-quantity">
                            <button onclick="carrito.actualizarCantidad('${item.codigo}', ${item.cantidad - 1})">-</button>
                            <span>${item.cantidad}</span>
                            <button onclick="carrito.actualizarCantidad('${item.codigo}', ${item.cantidad + 1})">+</button>
                            <button onclick="carrito.eliminarProducto('${item.codigo}')" style="margin-left: 10px; color: red;">🗑️</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        cartTotal.textContent = `Total: $${this.obtenerTotal().toLocaleString('es-CL')}`;
    }

    // Mostrar notificación
    mostrarNotificacion(mensaje) {
        // Crear elemento de notificación
        const notificacion = document.createElement('div');
        notificacion.className = 'notificacion';
        notificacion.textContent = mensaje;
        notificacion.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-chocolate);
            color: white;
            padding: 1rem;
            border-radius: 8px;
            z-index: 3000;
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notificacion);

        // Eliminar notificación después de 3 segundos
        setTimeout(() => {
            notificacion.remove();
        }, 3000);
    }
}

// Instancia global del carrito
const carrito = new CarritoCompras();

// Funciones globales para usar en HTML
function agregarAlCarrito(codigoProducto, cantidad = 1) {
    carrito.agregarProducto(codigoProducto, cantidad);
}

function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    
    if (sidebar && overlay) {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('show');
    }
}

function actualizarContadorCarrito() {
    carrito.actualizarContador();
}

function proceedToCheckout() {
    if (carrito.items.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    // Aquí se implementaría la lógica de checkout
    alert('Funcionalidad de checkout en desarrollo. Total: $' + carrito.obtenerTotal().toLocaleString('es-CL'));
}

// Aplicar descuentos especiales
function aplicarDescuentos(usuario) {
    let descuento = 0;
    let mensaje = '';

    // Descuento para mayores de 50 años
    if (usuario && usuario.edad >= 50) {
        descuento = 0.5; // 50%
        mensaje = 'Descuento del 50% aplicado (Mayor de 50 años)';
    }
    // Descuento con código FELICES50
    else if (usuario && usuario.codigoDescuento === 'FELICES50') {
        descuento = 0.1; // 10%
        mensaje = 'Descuento del 10% aplicado (Código FELICES50)';
    }
    // Torta gratis para estudiantes Duoc en cumpleaños
    else if (usuario && usuario.esEstudianteDuoc && usuario.esCumpleanos) {
        // Lógica para torta gratis
        mensaje = 'Torta de cumpleaños gratis aplicada (Estudiante Duoc)';
    }

    return { descuento, mensaje };
}

// Estilos CSS para las notificaciones
const estilosNotificacion = document.createElement('style');
estilosNotificacion.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .cart-item-quantity {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 0.5rem;
    }
    
    .cart-item-quantity button {
        background: var(--color-chocolate);
        color: white;
        border: none;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .cart-item-quantity span {
        min-width: 20px;
        text-align: center;
        font-weight: bold;
    }
`;
document.head.appendChild(estilosNotificacion);

