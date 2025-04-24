import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">Dislearn</Link>
      <div className="nav-links">
        <Link to="/exercises">Ejercicios</Link>
        <Link to="/progress">Progreso</Link>
        <Link to="/profile">Perfil</Link>
      </div>
    </nav>
  )
}