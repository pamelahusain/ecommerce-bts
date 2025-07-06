<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Productos - BTS Army Forever Fanstore</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
  <style>
    /* Estilos simples */
    .card { border: 2px solid #a4f5de; border-radius: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); transition: 0.3s; }
    .card:hover { transform: translateY(-5px); }
    .btn-custom { background-color: #f879a5; color: white; font-weight: bold; }
    .btn-custom:hover { background-color: #d86891; }
    #carrito-container { display: none; margin-top: 30px; }
    #carrito-container ul { list-style: none; padding-left: 0; }
    #carrito-container li { background: #fce4ec; border: 1px solid #f8bbd0; padding: 10px; margin-bottom: 10px; border-radius: 10px; }
    .carrito-item { display: flex; align-items: center; gap: 10px; }
    .carrito-item img { width: 60px; border-radius: 8px; }
    .item-info { flex-grow: 1; }
    .item-cantidad input { width: 50px; text-align: center; }
    .btn-eliminar { background: transparent; border: none; color: #d86891; font-weight: bold; cursor: pointer; font-size: 1.2rem; }
    header a.carrito-link { font-size: 1.5rem; color: #832f62; text-decoration: none; }
    header a.carrito-link:hover { color: #d86891; }
  </style>
</head>
<body>

<header class="d-flex justify-content-between align-items-center p-3 border-bottom">
  <a href="./" class="logo-header">
    <img src="./RECURSOS AUDIOVISUALES/pngwing.com.png" width="80" alt="Logo BTS Army" />
  </a>
  <h1 class="m-0">BTS ARMY FOREVER FANSTORE</h1>
  <a href="#" id="abrir-carrito" class="carrito-link" aria-label="Ver carrito">
    🛒 <span id="cantidad-carrito">(0)</span>
  </a>
</header>

<main class="container py-4">

  <h2 class="text-center mb-4">Productos</h2>
  
  <div class="row" id="productos-container"></div>
  
  <div class="text-center mt-4">
    <button id="btn-ver-carrito" class="btn btn-outline-primary" style="display:none;">Ir al carrito</button>
  </div>

  <section id="carrito-container" class="mt-5">
    <h3>Tu carrito</h3>
    <ul id="carrito-lista"></ul>
    <p id="total-carrito" class="fw-bold text-end"></p>
    <div class="text-end">
      <button id="finalizar-compra" class="btn btn-success">Finalizar compra</button>
    </div>
  </section>

</main>

<script>
  const productos = [
    { id:1, nombre:"Llavero BT21", descripcion:"Llavero de peluche en 7 modelos.", precio:10000, imagen:"https://http2.mlstatic.com/D_NQ_NP_920538-MLA74440737644_022024-O.webp" },
    { id:2, nombre:"Playera BTS", descripcion:"Playera algodón talles XS a XXXL.", precio:20000, imagen:"https://i.pinimg.com/736x/5a/79/a9/5a79a9ee5f7b08862af57a3b09a1220d.jpg" }
  ];

  const productosContainer = document.getElementById("productos-container");
  const carritoLista = document.getElementById("carrito-lista");
  const totalCarritoElem = document.getElementById("total-carrito");
  const cantidadCarritoSpan = document.getElementById("cantidad-carrito");
  const btnVerCarrito = document.getElementById("btn-ver-carrito");
  const carritoContainer = document.getElementById("carrito-container");
  const btnFinalizar = document.getElementById("finalizar-compra");
  const abrirCarritoLink = document.getElementById("abrir-carrito");

  // Renderizar productos
  function renderProductos() {
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
      productosContainer.appendChild(card);
    });
  }

  // Leer carrito de localStorage
  function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
  }

  // Guardar carrito en localStorage
  function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  // Actualizar contador carrito en header
  function actualizarContador() {
    const carrito = obtenerCarrito();
    const cantidadTotal = carrito.reduce((acc, p) => acc + (p.cantidad || 1), 0);
    cantidadCarritoSpan.textContent = `(${cantidadTotal})`;
    btnVerCarrito.style.display = carrito.length > 0 ? "inline-block" : "none";
  }

  // Agregar producto al carrito (sumando cantidad si ya existe)
  function agregarAlCarrito(id) {
    const carrito = obtenerCarrito();
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    const existente = carrito.find(p => p.id === id);
    if (existente) {
      existente.cantidad = (existente.cantidad || 1) + 1;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }
    guardarCarrito(carrito);
    actualizarContador();
    alert(`Producto "${producto.nombre}" agregado al carrito.`);
  }

  // Mostrar carrito
  function mostrarCarrito() {
    const carrito = obtenerCarrito();
    carritoLista.innerHTML = "";
    let total = 0;
    if(carrito.length === 0){
      carritoLista.innerHTML = "<li>Tu carrito está vacío.</li>";
      totalCarritoElem.textContent = "";
      btnFinalizar.style.display = "none";
      return;
    }

    carrito.forEach((p, index) => {
      total += p.precio * (p.cantidad || 1);
      const li = document.createElement("li");
      li.className = "carrito-item";
      li.innerHTML = `
        <img src="${p.imagen}" alt="${p.nombre}" />
        <div class="item-info">
          <strong>${p.nombre}</strong><br />
          Precio unitario: $${p.precio} <br />
          Cantidad: 
          <input type="number" min="1" value="${p.cantidad}" data-index="${index}" class="input-cantidad" />
        </div>
        <button class="btn-eliminar" data-index="${index}" aria-label="Eliminar ${p.nombre}">&times;</button>
      `;
      carritoLista.appendChild(li);
    });

    totalCarritoElem.textContent = `Total a pagar: $${total}`;
    btnFinalizar.style.display = "inline-block";
    carritoContainer.style.display = "block";

    agregarListenersCarrito();
  }

  // Actualizar cantidades y eliminar productos
  function agregarListenersCarrito() {
    // Cambiar cantidades
    document.querySelectorAll(".input-cantidad").forEach(input => {
      input.addEventListener("change", e => {
        let index = e.target.dataset.index;
        let val = parseInt(e.target.value);
        if(isNaN(val) || val < 1) {
          e.target.value = 1;
          val = 1;
        }
        const carrito = obtenerCarrito();
        carrito[index].cantidad = val;
        guardarCarrito(carrito);
        mostrarCarrito();
        actualizarContador();
      });
    });

    // Eliminar producto
    document.querySelectorAll(".btn-eliminar").forEach(btn => {
      btn.addEventListener("click", e => {
        const index = e.target.dataset.index;
        const carrito = obtenerCarrito();
        carrito.splice(index,1);
        guardarCarrito(carrito);
        mostrarCarrito();
        actualizarContador();
      });
    });
  }

  // Finalizar compra
  btnFinalizar.addEventListener("click", () => {
    if(confirm("¿Estás seguro de finalizar la compra?")) {
      localStorage.removeItem("carrito");
      alert("¡Gracias por tu compra! Volviendo a la página principal.");
      carritoContainer.style.display = "none";
      actualizarContador();
      productosContainer.scrollIntoView({behavior: "smooth"});
    }
  });

  // Eventos de carga y click
  document.addEventListener("DOMContentLoaded", () => {
    renderProductos();
    actualizarContador();

    // Delegación para agregar productos
    productosContainer.addEventListener("click", e => {
      if(e.target.classList.contains("agregar-carrito")) {
        const id = parseInt(e.target.getAttribute("data-id"));
        agregarAlCarrito(id);
      }
    });

    btnVerCarrito.addEventListener("click", () => {
      mostrarCarrito();
      carritoContainer.scrollIntoView({behavior: "smooth"});
    });

    abrirCarritoLink.addEventListener("click", e => {
      e.preventDefault();
      mostrarCarrito();
      carritoContainer.scrollIntoView({behavior: "smooth"});
    });
  });
</script>

</body>
</html>
