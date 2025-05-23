import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext';

export default function Profile() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      {/* Encabezado de perfil */}
      <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
        <div className="relative w-32 h-32 mr-6">
          <img 
            src={`/assets/avatars/${user?.avatar || 'default-avatar.png'}`} 
            alt="Avatar del usuario" 
            className="w-full h-full rounded-full object-cover border-4 border-gray-300"
          />
          <button className="absolute bottom-0 right-0 bg-blue-600 text-white text-sm px-3 py-1 rounded-full hover:bg-blue-700">
            Cambiar
          </button>
        </div>

        <div className="text-center md:text-left mt-4 md:mt-0">
          <h1 className="text-3xl font-semibold">{user?.name || 'Usuario'}</h1>
          <p className="text-gray-600">Edad: {user?.age || '--'} años</p>
          <p className="text-gray-600">Nivel: {user?.level ? user.level.toUpperCase() : 'PRINCIPIANTE'}</p>
        </div>
      </div>

      {/* Configuración */}
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold mb-2">Configuración</h2>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-1">Accesibilidad</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="accent-blue-600" />
                Usar fuente OpenDyslexic
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-blue-600" />
                Alto contraste
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="accent-blue-600" />
                Mostrar imágenes de apoyo
              </label>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-1">Preferencias</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Velocidad de lectura:</label>
                <select defaultValue="normal" className="w-full border border-gray-300 rounded px-3 py-2">
                  <option value="slow">Lenta</option>
                  <option value="normal">Normal</option>
                  <option value="fast">Rápida</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Tamaño de texto:</label>
                <select defaultValue="medium" className="w-full border border-gray-300 rounded px-3 py-2">
                  <option value="small">Pequeño</option>
                  <option value="medium">Mediano</option>
                  <option value="large">Grande</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="mt-8 flex justify-between flex-col md:flex-row gap-4">
        <button className="w-full md:w-auto bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
          Guardar cambios
        </button>
        <button 
          className="w-full md:w-auto bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
          onClick={() => setUser(null)}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
