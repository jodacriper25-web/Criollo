// Base de datos simulada de productos (RF-02: CRUD de productos)
const productos = [
    {
        id: 1,
        nombre: "Arroz Integral",
        precio: 2.50,
        descripcion: "Arroz integral de alta calidad, rico en fibra y nutrientes.",
        categoria: "Granos",
        imagen: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
        stock: 50,
        oferta: true,
        destacado: true
    },
    {
        id: 2,
        nombre: "Aceite de Oliva",
        precio: 5.75,
        descripcion: "Aceite de oliva extra virgen, 1 litro.",
        categoria: "Aceites",
        imagen: "https://images.unsplash.com/photo-1533050487297-09b450131914?w-400",
        stock: 30,
        oferta: false,
        destacado: true
    },
    {
        id: 3,
        nombre: "Leche Deslactosada",
        precio: 1.80,
        descripcion: "Leche deslactosada, 1 litro, envasada.",
        categoria: "Lácteos",
        imagen: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w-400",
        stock: 100,
        oferta: true,
        destacado: true
    },
    {
        id: 4,
        nombre: "Azúcar Morena",
        precio: 1.25,
        descripcion: "Azúcar morena orgánica, 1kg.",
        categoria: "Endulzantes",
        imagen: "https://images.unsplash.com/photo-1582920980148-8d1d0b8b8b8b?w-400",
        stock: 40,
        oferta: false,
        destacado: false
    },
    {
        id: 5,
        nombre: "Café Molido",
        precio: 4.20,
        descripcion: "Café molido premium, 500g.",
        categoria: "Bebidas",
        imagen: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w-400",
        stock: 25,
        oferta: true,
        destacado: true
    },
    {
        id: 6,
        nombre: "Atún en Lata",
        precio: 1.50,
        descripcion: "Atún enlatado en agua, 180g.",
        categoria: "Conservas",
        imagen: "https://images.unsplash.com/photo-1588615411919-ca8b4b56d3e6?w-400",
        stock: 60,
        oferta: false,
        destacado: false
    }
];

// Función para cargar productos destacados (RF-06: Catálogo público)
function cargarProductosDestacados() {
    const container = document.getElementById('productos-destacados');
    const destacados = productos.filter(p => p.destacado);
    
    destacados.forEach(producto => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';
        col.innerHTML = `
            <div class="card producto-card h-100">
                ${producto.oferta ? '<span class="badge bg-danger badge-oferta">OFERTA</span>' : ''}
                <img src="${producto.imagen}" class="card-img-top producto-img" alt="${producto.nombre}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text flex-grow-1">${producto.descripcion}</p>
                    <div class="mt-auto">
                        <p class="producto-precio">$${producto.precio.toFixed(2)}</p>
                        <div class="d-flex justify-content-between">
                            <button class="btn btn-sm btn-outline-success" onclick="verDetalles(${producto.id})">
                                <i class="fas fa-info-circle"></i> Detalles
                            </button>
                            <button class="btn btn-sm btn-warning" onclick="agregarAlCarrito(${producto.id})">
                                <i class="fas fa-cart-plus"></i> Agregar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}

// Función para cargar ofertas (RF-06: Catálogo público)
function cargarOfertas() {
    const container = document.getElementById('ofertas-container');
    const ofertas = productos.filter(p => p.oferta);
    
    ofertas.forEach(producto => {
        const col = document.createElement('div');
        col.className = 'col-md-6 mb-4';
        col.innerHTML = `
            <div class="card producto-card h-100 border-warning">
                <div class="row g-0 h-100">
                    <div class="col-md-4">
                        <img src="${producto.imagen}" class="img-fluid rounded-start h-100 w-100" alt="${producto.nombre}" style="object-fit: cover;">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body d-flex flex-column h-100">
                            <h5 class="card-title text-warning">${producto.nombre}</h5>
                            <p class="card-text">${producto.descripcion}</p>
                            <div class="mt-auto">
                                <p class="text-decoration-line-through text-muted mb-1">$${(producto.precio * 1.2).toFixed(2)}</p>
                                <p class="producto-precio mb-2">$${producto.precio.toFixed(2)}</p>
                                <button class="btn btn-warning btn-sm" onclick="agregarAlCarrito(${producto.id})">
                                    <i class="fas fa-cart-plus"></i> Agregar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}

// Función para ver detalles del producto
function verDetalles(id) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        alert(`Detalles de ${producto.nombre}:\n\nPrecio: $${producto.precio}\nCategoría: ${producto.categoria}\nStock disponible: ${producto.stock}\n\n${producto.descripcion}`);
    }
}

// Inicialización cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    cargarProductosDestacados();
    cargarOfertas();
    
    // Sistema de alertas de stock (RF-05: Sistema de alertas)
    const productosBajoStock = productos.filter(p => p.stock < 30);
    if (productosBajoStock.length > 0) {
        console.log('Alertas de stock bajo:');
        productosBajoStock.forEach(p => {
            console.log(`${p.nombre}: Stock bajo (${p.stock} unidades)`);
        });
    }
});