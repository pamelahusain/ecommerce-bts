const productos = [
  {
    id: 1,
    nombre: "Llavero de peluche BT21",
    descripcion: "Llavero de peluche en 7 modelos diferentes.",
    precio: 10000,
    imagen: "https://http2.mlstatic.com/D_NQ_NP_920538-MLA74440737644_022024-O.webp"
  },
  {
    id: 2,
    nombre: "Playera de BTS",
    descripcion: "Playera de algodón, en talles xs, s, m, l, xl, xxl y xxxl",
    precio: 20000,
    imagen: "https://i.pinimg.com/736x/5a/79/a9/5a79a9ee5f7b08862af57a3b09a1220d.jpg"
  }
];

const container = document.getElementById("productos-container");
const contador = document.getElementById("cantidad-carrito");

function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  if (carrito.length === 0) {
    contador.style.display = "none";
  } else {
    const totalCantidad = carrito.reduce((acc, prod) => acc + (prod.cantidad || 1), 0);
    contador.textContent = totalCantidad;
    contador.style.display = "inline-block";
  }
}

function renderProductos() {
  container.innerHTML = ""; // Limpia el contenedor para evitar duplicados
  productos.forEach(p => {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";
    card.innerHTML = `
      <div class="card h-100 p-3">
        <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}">
        <div class="card-body">
          <h5 class="card-title">${p.nombre}</h5>
          <p class="card-text">${p.descripcion}</p>
          <p><strong>Precio: $${p.precio}</strong></p>
          <button class="btn btn-custom agregar-carrito" data-id="${p.id}">Agregar al carrito</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function agregarAlCarrito(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const producto = productos.find(p => p.id === id);
  if (!producto) return;

  const productoEnCarrito = carrito.find(item => item.id === id);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad = (productoEnCarrito.cantidad || 1) + 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
  alert("Producto agregado al carrito 💜");
  window.open("carrito.html", "_blank");
}

document.addEventListener("DOMContentLoaded", () => {
  renderProductos();
  actualizarContadorCarrito();

  document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("agregar-carrito")) {
      const idStr = e.target.dataset.id;
      if (!idStr) return;
      const id = parseInt(idStr, 10);
      if (isNaN(id)) return;
      agregarAlCarrito(id);
    }
  });
});
