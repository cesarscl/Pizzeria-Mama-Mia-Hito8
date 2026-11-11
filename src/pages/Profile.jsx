import { useEffect, useState } from "react"
import { useUser } from "../context/UserContext"

const Profile = () => {
  const { email, logout, getProfile } = useUser()
  const [error, setError] = useState("")

  // Al entrar, consulta el perfil del usuario autenticado (GET /api/auth/me)
  useEffect(() => {
    let ignore = false
    getProfile().catch((err) => {
      if (!ignore) setError(err.message)
    })
    return () => {
      ignore = true
    }
  }, [getProfile])

  return (
    <main className="container my-5" style={{ maxWidth: "480px" }}>
      <div className="card shadow-sm text-center">
        <div className="card-body py-4">
          <div className="display-4 mb-2">👤</div>
          <h2 className="h4 mb-3">Mi perfil</h2>
          <p className="text-secondary small mb-1">Email</p>
          <p className="fs-5 fw-semibold mb-4">{email}</p>
          {error && <div className="alert alert-warning small">{error}</div>}
          <button className="btn btn-dark" onClick={logout}>🔒 Cerrar sesión</button>
        </div>
      </div>
    </main>
  )
}

export default Profile
