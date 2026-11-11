import { useState } from "react"
import { useCart } from "../context/CartContext"
import { useUser } from "../context/UserContext"
import Message from "../components/Message"
import { API_URL, formatPrice, handleImgError } from "../utils/helpers"

const Cart = () => {
  const { cart, increase, decrease, removeFromCart, clearCart, total } = useCart()
  const { token } = useUser()
  const [message, setMessage] = useState({ type: "", text: "" })
  const [loading, setLoading] = useState(false)

  // Envía el carrito al backend (POST /api/checkouts) con el token JWT
  const handleCheckout = async () => {
    setLoading(true)
    setMessage({ type: "", text: "" })
    try {
      const res = await fetch(`${API_URL}/api/checkouts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cart }),
      })
      if (!res.ok) throw new Error()
      clearCart()
      setMessage({ type: "success", text: "¡Compra realizada con éxito! Gracias por tu pedido 🍕" })
    } catch {
      setMessage({ type: "error", text: "No se pudo realizar la compra. Intenta nuevamente." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container my-5" style={{ maxWidth: "640px" }}>
      <h5 className="mb-3">Detalles del pedido:</h5>

      {cart.length === 0 && !message.text && <p className="text-secondary">Tu carrito está vacío.</p>}

      <ul className="list-unstyled">
        {cart.map((pizza) => (
          <li key={pizza.id} className="d-flex align-items-center gap-3 mb-3">
            <img
              src={pizza.img}
              alt={`Pizza ${pizza.name}`}
              width="60"
              height="45"
              className="rounded"
              style={{ objectFit: "cover" }}
              onError={handleImgError(pizza.id)}
            />
            <span className="text-capitalize flex-grow-1">{pizza.name}</span>
            <span className="fw-semibold">${formatPrice(pizza.price)}</span>
            <button className="btn btn-outline-danger btn-sm" onClick={() => decrease(pizza.id)}>-</button>
            <span className="fw-bold" style={{ minWidth: "1.5rem", textAlign: "center" }}>{pizza.count}</span>
            <button className="btn btn-outline-primary btn-sm" onClick={() => increase(pizza.id)}>+</button>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => removeFromCart(pizza.id)}
              aria-label={`Eliminar ${pizza.name} del carrito`}
              title="Eliminar del carrito"
            >
              🗑
            </button>
          </li>
        ))}
      </ul>

      <h3 className="mt-4">Total: ${formatPrice(total)}</h3>
      <button className="btn btn-dark mt-2" disabled={!token || cart.length === 0 || loading} onClick={handleCheckout}>
        {loading ? "Procesando..." : "Pagar"}
      </button>
      {!token && <p className="text-secondary small mt-2 mb-0">Inicia sesión para poder pagar.</p>}
      <Message type={message.type} text={message.text} />
    </main>
  )
}

export default Cart
