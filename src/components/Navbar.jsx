import { Link } from 'react-router-dom'

export default function Navbar({ user, setUser }) {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">DislexiaKids</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/exercises">Ejercicios</Link></li>
        <li><Link to="/progress">Progreso</Link></li>
        {user ? (
          <li><button onClick={() => setUser(null)}>Cerrar sesión</button></li>
        ) : (
          <li><button onClick={() => setUser({ name: 'Niño' })}>Iniciar</button></li>
        )}
      </ul>
    </nav>
  )
}