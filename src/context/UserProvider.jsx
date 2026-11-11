import { useCallback, useState } from "react"
import { UserContext } from "./UserContext"
import { API_URL } from "../utils/helpers"

// Mensajes del backend traducidos al español
const ERRORS = {
  "Email and password are required": "Todos los campos son obligatorios.",
  "Invalid email": "El email no es válido.",
  "Password must be at least 6 characters": "La contraseña debe tener al menos 6 caracteres.",
  "User not found": "El usuario no existe.",
  "Invalid password": "La contraseña es incorrecta.",
  "User already exists": "El usuario ya está registrado.",
}

const NETWORK_ERROR = "No se pudo conectar con el servidor. Intenta nuevamente."

// Lee la respuesta del backend; si viene con error lanza un Error con el mensaje
const parseResponse = async (res) => {
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(ERRORS[data.error] || data.error || "Ocurrió un error, intenta nuevamente.")
  return data
}

// Envía email y password a /api/auth/login o /api/auth/register
const authRequest = async (path, email, password) => {
  let res
  try {
    res = await fetch(`${API_URL}/api/auth/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
  } catch {
    throw new Error(NETWORK_ERROR)
  }
  return parseResponse(res)
}

const UserProvider = ({ children }) => {
  // Token JWT y email del usuario. Se guardan en localStorage para no perder la sesión al recargar.
  const [token, setToken] = useState(() => localStorage.getItem("token"))
  const [email, setEmail] = useState(() => localStorage.getItem("email"))

  const saveSession = ({ token, email }) => {
    setToken(token)
    setEmail(email)
    localStorage.setItem("token", token)
    localStorage.setItem("email", email)
  }

  // POST /api/auth/login -> { email, token }
  const login = async (email, password) => {
    const data = await authRequest("login", email, password)
    saveSession(data)
  }

  // POST /api/auth/register -> { email, token }
  const register = async (email, password) => {
    const data = await authRequest("register", email, password)
    saveSession(data)
  }

  // Cierra la sesión: elimina el token y el email del estado
  const logout = useCallback(() => {
    setToken(null)
    setEmail(null)
    localStorage.removeItem("token")
    localStorage.removeItem("email")
  }, [])

  // GET /api/auth/me (requiere el token JWT) -> { email, id }
  const getProfile = useCallback(async () => {
    let res
    try {
      res = await fetch(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    } catch {
      throw new Error(NETWORK_ERROR)
    }
    // Token inválido o vencido: se cierra la sesión
    if (res.status === 401) {
      logout()
      throw new Error("Tu sesión expiró, inicia sesión nuevamente.")
    }
    const data = await parseResponse(res)
    setEmail(data.email)
    return data
  }, [token, logout])

  return (
    <UserContext.Provider value={{ token, email, login, register, logout, getProfile }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
