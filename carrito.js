// Carrito de compras
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para agregar productos al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    
    if (!producto) return;
    
    const itemExistente = carrito.find(item => item.id === id);
    
    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }
    
    guardarCarrito();
    actualizarCarritoUI();
    mostrarNotificacion(`${producto.nombre} agregado al carrito`);
}

// Función para guardar carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para actualizar la UI del carrito
function actualizarCarritoUI() {
    const contador = document.getElementById('carrito-contador');
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    contador.textContent = totalItems;
    
    // Actualizar modal si está abierto
    if (document.querySelector('#carritoModal.show')) {
        actualizarModalCarrito();
    }
}

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje) {
    // Crear notificación
    const notificacion = document.createElement('div');
    notificacion.className = 'position-fixed top-0 end-0 p-3';
    notificacion.style.zIndex = '9999';
    notificacion.innerHTML = `
        <div class="toast show" role="alert">
            <div class="toast-header bg-success text-white">
                <i class="fas fa-check-circle me-2"></i>
                <strong class="me-auto">Supermercado Yaruquíes</strong>
                <button type="button" class="btn-close btn-close-white" onclick="this.parentElement.parentElement.remove()"></button>
            </div>
            <div class="toast-body">
                ${mensaje}
            </div>
        </div>
    `;
    
    document.body.appendChild(notificacion);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        if (notificacion.parentNode) {
            notificacion.remove();
        }
    }, 3000);
}

// Función para actualizar el modal del carrito
function actualizarModalCarrito() {
    const container = document.getElementById('carrito-items');
    const totalElement = document.getElementById('carrito-total');
    
    if (carrito.length === 0) {
        container.innerHTML = '<p class="text-center">Tu carrito está vacío</p>';
        totalElement.textContent = '0.00';
        return;
    }
    
    let html = '';
    let total = 0;
    
    carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        
        html += `
            <div class="carrito-item row align-items-center">
                <div class="col-md-2">
                    <img src="${item.imagen}" alt="${item.nombre}" class="img-fluid rounded" style="width: 60px; height: 60px; object-fit: cover;">
                </div>
                <div class="col-md-4">
                    <h6>${item.nombre}</h6>
                    <small class="text-muted">$${item.precio.toFixed(2)} c/u</small>
                </div>
                <div class="col-md-3">
                    <div class="input-group input-group-sm">
                        <button class="btn btn-outline-secondary" onclick="actualizarCantidad(${item.id}, ${item.cantidad - 1})">-</button>
                        <input type="text" class="form-control text-center" value="${item.cantidad}" readonly>
                        <button class="btn btn-outline-secondary" onclick="actualizarCantidad(${item.id}, ${item.cantidad + 1})">+</button>
                    </div>
                </div>
                <div class="col-md-2">
                    <h6>$${subtotal.toFixed(2)}</h6>
                </div>
                <div class="col-md-1">
                    <button class="btn btn-danger btn-sm" onclick="removerDelCarrito(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    totalElement.textContent = total.toFixed(2);
}

// Función para actualizar cantidad
function actualizarCantidad(id, nuevaCantidad) {
    if (nuevaCantidad < 1) {
        removerDelCarrito(id);
        return;
    }
    
    const item = carrito.find(item => item.id === id);
    if (item) {
        item.cantidad = nuevaCantidad;
        guardarCarrito();
        actualizarCarritoUI();
    }
}

// Función para remover del carrito
function removerDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarCarrito();
    actualizarCarritoUI();
}

// Función para proceder al pago (RF-03: Módulo de registro de ventas)
function procederPago() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    // Simular registro de venta
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    
    // Generar número de factura simulado
    const facturaNumero = 'FAC-' + Date.now();
    
    alert(`¡Compra exitosa!\n\nNúmero de factura: ${facturaNumero}\nTotal: $${total.toFixed(2)}\n\nGracias por tu compra en Supermercado Yaruquíes`);
    
    // Limpiar carrito después de la compra
    carrito = [];
    guardarCarrito();
    actualizarCarritoUI();
    
    // Cerrar modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('carritoModal'));
    modal.hide();
}

// Inicializar carrito al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    actualizarCarritoUI();
    
    // Configurar botón del carrito
    const carritoBtn = document.getElementById('carrito-btn');
    if (carritoBtn) {
        carritoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            actualizarModalCarrito();
            const modal = new bootstrap.Modal(document.getElementById('carritoModal'));
            modal.show();
        });
    }
});