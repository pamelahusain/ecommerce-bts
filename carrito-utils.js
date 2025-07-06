function actualizarCantidadCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const totalCantidad = carrito.reduce((acc, prod) => acc + (prod.cantidad || 1), 0);
    const spanCantidad = document.getElementById("cantidad-carrito");
    if (spanCantidad) {
      spanCantidad.textContent = `(${totalCantidad})`;
    }
  }
  
  document.addEventListener("DOMContentLoaded", actualizarCantidadCarrito);
  