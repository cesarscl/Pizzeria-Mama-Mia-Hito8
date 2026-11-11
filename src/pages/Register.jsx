import { useState } from "react"
import Message from "../components/Message"
import { useUser } from "../context/UserContext"

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState({ type: "", text: "" })
  const [loading, setLoading] = useState(false)
  const { register } = useUser()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setMessage({ type: "error", text: "Todos los campos son obligatorios." })
      return
    }
    if (password.length < 6) {
      setMessage({ type: "error", text: "La contraseña debe tener al menos 6 caracteres." })
      return
    }
    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "La contraseña y su confirmación deben ser iguales." })
      return
    }

    // Registro con el backend: al guardar el token, la ruta redirige al home
    setLoading(true)
    setMessage({ type: "", text: "" })
    try {
      await register(email, password)
    } catch (err) {
      setMessage({ type: "error", text: err.message })
      setLoading(false)
    }
  }

  return (
    <main className="container my-5" style={{ maxWidth: "480px" }}>
      <h2 className="mb-3">Register</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="register-email" className="form-label">Email</label>
          <input
            id="register-email"
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="register-password" className="form-label">Password</label>
          <input
            id="register-password"
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="register-confirm" className="form-label">Confirm password</label>
          <input
            id="register-confirm"
            type="password"
            className="form-control"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Registrando..." : "Register"}
        </button>
      </form>
      <Message type={message.type} text={message.text} />
    </main>
  )
}

export default Register
