import { useState } from "react"
import Message from "../components/Message"
import { useUser } from "../context/UserContext"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState({ type: "", text: "" })
  const [loading, setLoading] = useState(false)
  const { login } = useUser()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email.trim() || !password.trim()) {
      setMessage({ type: "error", text: "Todos los campos son obligatorios." })
      return
    }
    if (password.length < 6) {
      setMessage({ type: "error", text: "La contraseña debe tener al menos 6 caracteres." })
      return
    }

    // Login con el backend: al guardar el token, la ruta redirige al home
    setLoading(true)
    setMessage({ type: "", text: "" })
    try {
      await login(email, password)
    } catch (err) {
      setMessage({ type: "error", text: err.message })
      setLoading(false)
    }
  }

  return (
    <main className="container my-5" style={{ maxWidth: "480px" }}>
      <h2 className="mb-3">Login</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="login-email" className="form-label">Email</label>
          <input
            id="login-email"
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="login-password" className="form-label">Password</label>
          <input
            id="login-password"
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Ingresando..." : "Login"}
        </button>
      </form>
      <Message type={message.type} text={message.text} />
    </main>
  )
}

export default Login
