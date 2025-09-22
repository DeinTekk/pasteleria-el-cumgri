// Datos de productos para PASTELERIA EL CUMGRI
const productos = [
    // Tortas Cuadradas
    {
        codigo: "TC001",
        categoria: "Tortas Cuadradas",
        nombre: "Torta Cuadrada de Chocolate",
        precio: 45000,
        descripcion: "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.",
        imagen: "images/torta-chocolate.jpg",
        stock: 10,
        stockCritico: 3
    },
    {
        codigo: "TC002",
        categoria: "Tortas Cuadradas",
        nombre: "Torta Cuadrada de Frutas",
        precio: 50000,
        descripcion: "Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.",
        imagen: "images/torta-cumpleanos.jpg",
        stock: 8,
        stockCritico: 2
    },
    
    // Tortas Circulares
    {
        codigo: "TT001",
        categoria: "Tortas Circulares",
        nombre: "Torta Circular de Vainilla",
        precio: 40000,
        descripcion: "Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión.",
        imagen: "images/hero-bolivian-cake.jpg",
        stock: 12,
        stockCritico: 4
    },
    {
        codigo: "TT002",
        categoria: "Tortas Circulares",
        nombre: "Torta Circular de Manjar",
        precio: 42000,
        descripcion: "Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos.",
        imagen: "images/pasteles-bolivianos.jpg",
        stock: 6,
        stockCritico: 2
    },
    
    // Postres Individuales
    {
        codigo: "PI001",
        categoria: "Postres Individuales",
        nombre: "Mousse de Chocolate",
        precio: 5000,
        descripcion: "Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate.",
        imagen: "images/mousse-chocolate.jpg",
        stock: 20,
        stockCritico: 5
    },
    {
        codigo: "PI002",
        categoria: "Postres Individuales",
        nombre: "Tiramisú Clásico",
        precio: 5500,
        descripcion: "Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida.",
        imagen: "images/tiramisu.jpg",
        stock: 15,
        stockCritico: 3
    },
    
    // Productos Sin Azúcar
    {
        codigo: "PSA001",
        categoria: "Productos Sin Azúcar",
        nombre: "Torta Sin Azúcar de Naranja",
        precio: 48000,
        descripcion: "Torta ligera y deliciosa, endulzada naturalmente, ideal para quienes buscan opciones más saludables.",
        imagen: "images/torta-chocolate.jpg",
        stock: 5,
        stockCritico: 1
    },
    {
        codigo: "PSA002",
        categoria: "Productos Sin Azúcar",
        nombre: "Cheesecake Sin Azúcar",
        precio: 47000,
        descripcion: "Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa.",
        imagen: "images/postres-individuales.jpg",
        stock: 4,
        stockCritico: 1
    },
    
    // Pastelería Tradicional
    {
        codigo: "PT001",
        categoria: "Pastelería Tradicional",
        nombre: "Empanada de Manzana",
        precio: 3000,
        descripcion: "Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda.",
        imagen: "images/pasteles-bolivianos.jpg",
        stock: 25,
        stockCritico: 8
    },
    {
        codigo: "PT002",
        categoria: "Pastelería Tradicional",
        nombre: "Tarta de Santiago",
        precio: 6000,
        descripcion: "Tradicional tarta española hecha con almendras, azúcar, y huevos, una delicia para los amantes de los postres clásicos.",
        imagen: "images/hero-bolivian-cake.jpg",
        stock: 10,
        stockCritico: 3
    },
    
    // Productos Sin Gluten
    {
        codigo: "PG001",
        categoria: "Productos Sin Gluten",
        nombre: "Brownie Sin Gluten",
        precio: 4000,
        descripcion: "Rico y denso, este brownie es perfecto para quienes necesitan evitar el gluten sin sacrificar el sabor.",
        imagen: "images/torta-chocolate.jpg",
        stock: 12,
        stockCritico: 4
    },
    {
        codigo: "PG002",
        categoria: "Productos Sin Gluten",
        nombre: "Pan Sin Gluten",
        precio: 3500,
        descripcion: "Suave y esponjoso, ideal para sándwiches o para acompañar cualquier comida.",
        imagen: "images/postres-individuales.jpg",
        stock: 8,
        stockCritico: 2
    },
    
    // Productos Veganos
    {
        codigo: "PV001",
        categoria: "Productos Veganos",
        nombre: "Torta Vegana de Chocolate",
        precio: 50000,
        descripcion: "Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal, perfecta para veganos.",
        imagen: "images/torta-chocolate.jpg",
        stock: 6,
        stockCritico: 2
    },
    {
        codigo: "PV002",
        categoria: "Productos Veganos",
        nombre: "Galletas Veganas de Avena",
        precio: 4500,
        descripcion: "Crujientes y sabrosas, estas galletas son una excelente opción para un snack saludable y vegano.",
        imagen: "images/postres-individuales.jpg",
        stock: 18,
        stockCritico: 5
    },
    
    // Tortas Especiales
    {
        codigo: "TE001",
        categoria: "Tortas Especiales",
        nombre: "Torta Especial de Cumpleaños",
        precio: 55000,
        descripcion: "Diseñada especialmente para celebraciones, personalizable con decoraciones y mensajes únicos.",
        imagen: "images/torta-cumpleanos.jpg",
        stock: 4,
        stockCritico: 1
    },
    {
        codigo: "TE002",
        categoria: "Tortas Especiales",
        nombre: "Torta Especial de Boda",
        precio: 60000,
        descripcion: "Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda.",
        imagen: "images/hero-bolivian-cake.jpg",
        stock: 2,
        stockCritico: 1
    }
];

const categorias = [
    "Tortas Cuadradas",
    "Tortas Circulares", 
    "Postres Individuales",
    "Productos Sin Azúcar",
    "Pastelería Tradicional",
    "Productos Sin Gluten",
    "Productos Veganos",
    "Tortas Especiales"
];

