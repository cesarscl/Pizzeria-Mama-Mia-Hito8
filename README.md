# Pizzería Mamma Mia!

Hito 8 - Cierre proyecto React (JWT) | Desafío Latam - Fullstack JS

## Accesos

- **Demo (Vercel):** [pizzeria-mama-mia-hito7.vercel.app](https://pizzeria-mama-mia-hito7.vercel.app/)
- **Backend / API (Render):** [pizzeria-backend-laiv.onrender.com/api/pizzas](https://pizzeria-backend-laiv.onrender.com/api/pizzas)
- **Repositorio:** [cesarscl/Pizzeria-Mama-Mia-Hito6](https://github.com/cesarscl/Pizzeria-Mama-Mia-Hito6)

> El backend está en el plan gratuito de Render y podría estar inactivo al momento de la evaluación: la primera carga puede tardar cerca de un minuto. Además, Render puede borrar los usuarios registrados cuando el servidor se reinicia; si el login dice que el usuario no existe, regístrate de nuevo.

## Hito 8: autenticación con JWT

- [x] `UserContext` tiene los métodos `login` y `register`, que consumen `POST /api/auth/login` y `POST /api/auth/register` y guardan el `token` JWT y el `email` en sus estados.
- [x] `logout` elimina el `token` y el `email` del estado.
- [x] `getProfile` obtiene el perfil del usuario autenticado con `GET /api/auth/me` (header `Authorization: Bearer <token>`).
- [x] Las páginas **Login** y **Register** usan esos métodos para acceder al sistema y muestran los errores del backend.
- [x] **Profile** muestra el email del usuario autenticado y un botón para cerrar sesión.
- [x] El botón **Logout** del Navbar cierra la sesión.
- [x] **Cart** envía el carrito a `POST /api/checkouts` con el token y muestra un mensaje de éxito al completar la compra.

> La sesión se guarda en `localStorage`, así que se mantiene al recargar la página. Para probar: regístrate con un email y una contraseña de al menos 6 caracteres.

## Hitos anteriores

| Hito | Contenido |
|---|---|
| 1 | Componentes y props: Navbar, Header, CardPizza y Footer |
| 2 | Formularios de Register y Login con validaciones (`useState`) |
| 3 | Menú con `.map()` y carrito con `+` / `-` y total |
| 4 | Pizzas desde la API con `useEffect` y `fetch` (Home y detalle `p001`) |
| 5 | Rutas con React Router, carpeta `pages`, Profile y NotFound |
| 6 | Carrito global con Context API (`CartContext`): añadir, `+` / `-` / 🗑 y mismo total en Navbar y Cart |
| 7 | `useParams` en Pizza (`/pizza/:id`), `UserContext` con token y rutas protegidas (`/profile`, `/login`, `/register`) |

## Rutas

| Ruta | Página |
|---|---|
| `/` | Home |
| `/register` | Register (sin sesión) |
| `/login` | Login (sin sesión) |
| `/cart` | Cart |
| `/pizza/:id` | Pizza (ej. `/pizza/p001` … `/pizza/p006`) |
| `/profile` | Profile (requiere sesión) |
| `/404` y rutas inexistentes | NotFound |

## Estructura

```
src/
├── main.jsx        → UserProvider > CartProvider > BrowserRouter > App
├── App.jsx         → Navbar + Routes (con rutas protegidas) + Footer
├── components/     → Navbar, Header, CardPizza, Message, Footer
├── context/        → CartContext.js + CartProvider.jsx, UserContext.js + UserProvider.jsx
├── pages/          → Home, Pizza, Register, Login, Cart, Profile, NotFound
├── utils/helpers.js
└── pizzas.js
```

## Cómo correrlo en local

```bash
git clone https://github.com/cesarscl/Pizzeria-Mama-Mia-Hito6.git
cd Pizzeria-Mama-Mia-Hito6
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173). Por defecto usa el backend de Render; para usar el backend local del material de apoyo (`npm start`, puerto 5000), crea un archivo `.env.local` con `VITE_API_URL=http://localhost:5000`.

## Notas

- Las imágenes del material de apoyo (Firebase) responden error 402; se reemplazan por fotos de [Unsplash](https://unsplash.com/).
- `vercel.json` permite entrar directo o recargar en cualquier ruta en Vercel.

## Tecnologías

React 19 · Vite · React Router 7 · Bootstrap 5

## Autor

Cesar Ormeño — Desafío Latam, Fullstack JS, Módulo 04
