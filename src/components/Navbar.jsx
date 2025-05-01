/**
 * Componente principal de navegación que incluye menú responsive y efectos de scroll
 * @param {Object} user - Objeto con información del usuario actual
 * @param {Function} setUser - Función para actualizar el estado del usuario
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ user, setUser }) {
  // Estado para controlar el menú móvil
  const [isOpen, setIsOpen] = useState(false);
  // Estado para detectar scroll y cambiar estilos
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  /**
   * Efecto para detectar el scroll y cambiar la apariencia de la navbar
   * Se activa cuando el scroll supera los 20px
   */
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#809BCE] backdrop-blur-lg shadow-2xl border-b-4 border-[#EAC4D5]'
        : 'bg-gradient-to-r from-[#EAC4D5] via-[#B8E0D2] to-[#809BCE] backdrop-blur-md border-b-4 border-[#EAC4D5]'
    }`}>
      {/* Contenedor principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              to="/" 
              className="group flex items-center"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#809BCE] via-[#EAC4D5] to-[#B8E0D2] flex items-center justify-center mr-2 group-hover:scale-110 transition-all duration-300 border-4 border-[#EAC4D5] shadow-2xl">
                <span className="text-white font-extrabold text-lg drop-shadow-xl">DK</span>
              </div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#809BCE] via-[#EAC4D5] to-[#B8E0D2] text-3xl md:text-4xl font-extrabold group-hover:from-[#EAC4D5] group-hover:to-[#809BCE] transition-all duration-300 drop-shadow-xl">
                DislexiaKids
              </span>
            </Link>
          </div>
          
          {/* Menu para escritorio */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex space-x-1">
              <NavLink to="/" active={location.pathname === "/"}>Inicio</NavLink>
              <NavLink to="/exercises" active={location.pathname.startsWith("/exercises")}>Ejercicios</NavLink>
              <NavLink to="/progress" active={location.pathname.startsWith("/progress")}>Progreso</NavLink>
            </div>
            
            <div className="ml-6 flex items-center">
              {user ? (
                <button
                  onClick={() => setUser(null)}
                  className="relative overflow-hidden px-6 py-2 rounded-full group border-4 border-[#EAC4D5] shadow-2xl"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#EAC4D5] to-[#809BCE] group-hover:from-[#809BCE] group-hover:to-[#EAC4D5] transition-all duration-300"></span>
                  <span className="relative flex items-center text-[#809BCE] font-bold">
                    <span className="mr-2">👋</span>
                    <span className="font-medium">Cerrar sesión</span>
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => setUser({ name: 'Niño' })}
                  className="relative overflow-hidden px-6 py-2 rounded-full group border-4 border-[#809BCE] shadow-2xl"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#809BCE] to-[#EAC4D5] group-hover:from-[#EAC4D5] group-hover:to-[#809BCE] transition-all duration-300"></span>
                  <span className="absolute -inset-x-1 -bottom-1 h-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent blur-sm"></span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1/6 bg-white/50 blur-sm rounded-full"></span>
                  <span className="relative flex items-center text-white font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V3zm1 0v16h12V3H4z" clipRule="evenodd" />
                      <path fillRule="evenodd" d="M7 7a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    Iniciar
                  </span>
                </button>
              )}
            </div>
          </div>
          
          {/* Botón de menú móvil */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-black inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú principal</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Menú móvil - Se muestra/oculta según el estado isOpen */}
      <div className={`md:hidden absolute w-full transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <div className="bg-gradient-to-b from-[#EAC4D5] via-[#B8E0D2] to-[#809BCE] backdrop-blur-md px-4 py-3 space-y-2 shadow-2xl border-b-4 border-[#EAC4D5]">
          <NavLinkMobile to="/" active={location.pathname === "/"} onClick={() => setIsOpen(false)}>Inicio</NavLinkMobile>
          <NavLinkMobile to="/exercises" active={location.pathname.startsWith("/exercises")} onClick={() => setIsOpen(false)}>Ejercicios</NavLinkMobile>
          <NavLinkMobile to="/progress" active={location.pathname.startsWith("/progress")} onClick={() => setIsOpen(false)}>Progreso</NavLinkMobile>
          
          <div className="pt-2 pb-3">
            {user ? (
              <button
                onClick={() => {
                  setUser(null);
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center px-4 py-3 rounded-xl bg-gradient-to-r from-[#EAC4D5] to-[#809BCE] text-[#809BCE] font-bold hover:from-[#809BCE] hover:to-[#EAC4D5] transition-all duration-300 border-4 border-[#EAC4D5] shadow-2xl"
              >
                <span className="mr-2">👋</span> Cerrar sesión
              </button>
            ) : (
              <button
                onClick={() => {
                  setUser({ name: 'Niño' });
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center px-4 py-3 rounded-xl bg-gradient-to-r from-[#809BCE] to-[#EAC4D5] text-white font-bold hover:from-[#EAC4D5] hover:to-[#809BCE] transition-all duration-300 border-4 border-[#809BCE] shadow-2xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V3zm1 0v16h12V3H4z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M7 7a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                Iniciar
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

/**
 * Componente para los enlaces de navegación en versión desktop
 * @param {string} to - Ruta de destino
 * @param {ReactNode} children - Contenido del enlace
 * @param {boolean} active - Si el enlace está activo
 */
function NavLink({ to, children, active }) {
  return (
    <Link
      to={to}
      className={`group relative px-4 py-2 font-bold transition-all duration-300 ${
        active 
          ? 'text-black'
          : 'text-[#809BCE] hover:text-black'
      }`}
    >
      <span>{children}</span>
      <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-black transition-all duration-300 origin-left ${
        active ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
      }`}></span>
      <span className={`absolute bottom-0 right-0 w-1 h-1 rounded-full bg-black transition-all duration-300 delay-200 ${
        active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      }`}></span>
    </Link>
  );
}

/**
 * Componente para los enlaces de navegación en versión móvil
 * @param {string} to - Ruta de destino
 * @param {ReactNode} children - Contenido del enlace
 * @param {Function} onClick - Función para manejar el click (generalmente cierra el menú)
 * @param {boolean} active - Si el enlace está activo
 */
function NavLinkMobile({ to, children, onClick, active }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`block px-4 py-3 rounded-lg font-bold transition-all duration-200 hover:pl-6 ${
        active 
          ? 'text-black bg-[#EAC4D5]/40'
          : 'text-[#809BCE] hover:text-black hover:bg-[#EAC4D5]/20'
      }`}
    >
      {children}
    </Link>
  );
}