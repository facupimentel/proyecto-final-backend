const finalizarCompra = document.getElementById("finalizar-compra");

const compraRealizada = () => {
  finalizarCompra.addEventListener("click", async () => {
    const urlParts = window.location.pathname.split("/");
    const cartId = urlParts[urlParts.length - 1]; // Extrae el último segmento como cart_id

    if (!cartId) {
      alert("Error: No se encontró el ID del carrito.");
      return;
    }

    alert("Compra realizada, muchas gracias");

    const response = await fetch(`/api/carts/${cartId}/clear`, {
      method: "DELETE",
    });

    if (response.ok) {
      window.location.reload();
    } else {
      alert("Error al vaciar el carrito");
    }
  });
};

compraRealizada();
