import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext';
import './ProfilePage.css'

export default function Profile() {
  const { user, setUser } = useContext(UserContext)

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="avatar-container">
          <img 
            src={`/assets/avatars/${user?.avatar || 'default-avatar.png'}`} 
            alt="Avatar del usuario" 
            className="profile-avatar"
          />
          <button className="edit-avatar">Cambiar</button>
        </div>
        
        <div className="profile-info">
          <h1>{user?.name || 'Usuario'}</h1>
          <p>Edad: {user?.age || '--'} años</p>
          <p>Nivel: {user?.level ? user.level.toUpperCase() : 'PRINCIPIANTE'}</p>
        </div>
      </div>
      
      <div className="profile-settings">
        <h2>Configuración</h2>
        
        <div className="setting-group">
          <h3>Accesibilidad</h3>
          <div className="setting-option">
            <label>
              <input type="checkbox" defaultChecked /> Usar fuente OpenDyslexic
            </label>
          </div>
          <div className="setting-option">
            <label>
              <input type="checkbox" /> Alto contraste
            </label>
          </div>
          <div className="setting-option">
            <label>
              <input type="checkbox" defaultChecked /> Mostrar imágenes de apoyo
            </label>
          </div>
        </div>
        
        <div className="setting-group">
          <h3>Preferencias</h3>
          <div className="setting-option">
            <label>
              Velocidad de lectura:
              <select defaultValue="normal">
                <option value="slow">Lenta</option>
                <option value="normal">Normal</option>
                <option value="fast">Rápida</option>
              </select>
            </label>
          </div>
          <div className="setting-option">
            <label>
              Tamaño de texto:
              <select defaultValue="medium">
                <option value="small">Pequeño</option>
                <option value="medium">Mediano</option>
                <option value="large">Grande</option>
              </select>
            </label>
          </div>
        </div>
      </div>
      
      <div className="profile-actions">
        <button className="save-button">Guardar cambios</button>
        <button className="logout-button" onClick={() => setUser(null)}>
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}