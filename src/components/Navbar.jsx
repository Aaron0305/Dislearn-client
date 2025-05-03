import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ user, setUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
        ? 'bg-[#95B8D1]/95 backdrop-blur-lg shadow-lg shadow-[#809BCE]/20' 
        : 'bg-gradient-to-r from-[#EAC4D5]/95 to-[#B8E0D2]/95 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="group flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#95B8D1] to-[#EAC4D5] flex items-center justify-center mr-2 group-hover:scale-110 transition-all duration-300">
                <span className="text-white font-bold text-sm">DK</span>
              </div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#95B8D1] to-[#EAC4D5] text-xl md:text-2xl font-extrabold group-hover:from-[#809BCE] group-hover:to-[#EAC4D5] transition-all duration-300">
                DislexiaKids
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex space-x-1">
              <NavLink to="/">Inicio</NavLink>
              <NavLink to="/exercises">Ejercicios</NavLink>
              <NavLink to="/progress">Progreso</NavLink>
              <NavLink to="/login">inicio de sesión</NavLink>
            </div>
            <div className="ml-6 flex items-center">
              {user ? (
                <button
                  onClick={() => setUser(null)}
                  className="relative overflow-hidden px-6 py-2 rounded-full group"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#EAC4D5] to-[#B8E0D2] group-hover:from-[#EAC4D5] group-hover:to-[#95B8D1] transition-all duration-300"></span>
                  <span className="relative flex items-center">
                    <span className="mr-2">👋</span>
                    <span className="font-medium">Cerrar sesión</span>
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => setUser({ name: 'Niño' })}
                  className="relative overflow-hidden px-6 py-2 rounded-full group"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#95B8D1] to-[#B8E0D2] group-hover:from-[#809BCE] group-hover:to-[#B8E0D2] transition-all duration-300"></span>
                  <span className="absolute -inset-x-1 -bottom-1 h-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent blur-sm"></span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1/6 bg-white/20 blur-sm rounded-full"></span>
                  <span className="relative flex items-center text-white font-medium">
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
      <div className={`md:hidden absolute w-full transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <div className="bg-gradient-to-b from-[#B8E0D2]/95 to-[#95B8D1]/95 backdrop-blur-md px-4 py-3 space-y-2 shadow-lg shadow-[#809BCE]/10">
          <NavLinkMobile to="/" onClick={() => setIsOpen(false)}>Inicio</NavLinkMobile>
          <NavLinkMobile to="/exercises" onClick={() => setIsOpen(false)}>Ejercicios</NavLinkMobile>
          <NavLinkMobile to="/progress" onClick={() => setIsOpen(false)}>Progreso</NavLinkMobile>
          <div className="pt-2 pb-3">
            {user ? (
              <button
                onClick={() => {
                  setUser(null);
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center px-4 py-3 rounded-xl bg-gradient-to-r from-[#EAC4D5] to-[#B8E0D2] text-white font-medium hover:from-[#EAC4D5] hover:to-[#95B8D1] transition-all duration-300"
              >
                <span className="mr-2">👋</span> Cerrar sesión
              </button>
            ) : (
              <button
                onClick={() => {
                  setUser({ name: 'Niño' });
                  setIsOpen(false);
                }}
                className="w-full flex items-center justifycenter px-4 py-3 rounded-xl bg-gradient-to-r from-[#95B8D1] to-[#B8E0D2] text-white font-medium hover:from-[#809BCE] hover:to-[#B8E0D2] transition-all duration-300"
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

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="group relative px-4 py-2 text-white hover:text-black transition-all duration-300"
    >
      <span>{children}</span>
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black opacity-0 transform scale-x-0 group-hover:opacity-100 group-hover:scale-x-100 transition-all duration-300 origin-left"></span>
      <span className="absolute bottom-0 right-0 w-1 h-1 rounded-full bg-black opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200"></span>
    </Link>
  );
}

function NavLinkMobile({ to, children, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-all duration-200 hover:pl-6"
    >
      {children}
    </Link>
  );
}