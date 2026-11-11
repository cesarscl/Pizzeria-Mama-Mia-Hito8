import { useState } from "react"
import { CartContext } from "./CartContext"

const CartProvider = ({ children }) => {
  // Cada item: { id, name, price, img, count }
  const [cart, setCart] = useState([])

  // Agrega una pizza; si ya está en el carrito, suma 1 a su cantidad
  const addToCart = ({ id, name, price, img }) => {
    setCart((prev) =>
      prev.some((pizza) => pizza.id === id)
        ? prev.map((pizza) => (pizza.id === id ? { ...pizza, count: pizza.count + 1 } : pizza))
        : [...prev, { id, name, price, img, count: 1 }]
    )
  }

  const increase = (id) => {
    setCart((prev) => prev.map((pizza) => (pizza.id === id ? { ...pizza, count: pizza.count + 1 } : pizza)))
  }

  // Al llegar a 0 la pizza se elimina del carrito
  const decrease = (id) => {
    setCart((prev) =>
      prev
        .map((pizza) => (pizza.id === id ? { ...pizza, count: pizza.count - 1 } : pizza))
        .filter((pizza) => pizza.count > 0)
    )
  }

  // Quita la pizza del carrito sin importar su cantidad
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((pizza) => pizza.id !== id))
  }

  // Vacía el carrito (después de una compra exitosa)
  const clearCart = () => setCart([])

  // Total compartido por Navbar y Cart
  const total = cart.reduce((acc, pizza) => acc + pizza.price * pizza.count, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, increase, decrease, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
