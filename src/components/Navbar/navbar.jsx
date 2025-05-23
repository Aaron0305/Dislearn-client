import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <div className="flex space-x-7">
                        <Link to="/" className="text-lg font-semibold text-gray-700">DisLearn</Link>
                    </div>
                    <div className="flex space-x-4">
                        <Link to="/" className="text-gray-700 hover:text-pink-500 px-3 py-2 rounded-md transition duration-300">
                            Inicio
                        </Link>
                        <Link to="/ejercicios" className="text-gray-700 hover:text-pink-500 px-3 py-2 rounded-md transition duration-300">
                            Ejercicios
                        </Link>
                        {user ? (
                            <>
                                <Link to="/proceso" className="text-gray-700 hover:text-pink-500 px-3 py-2 rounded-md transition duration-300">
                                    Proceso
                                </Link>
                                <Link to="/cambiar-contrasena" className="text-gray-700 hover:text-pink-500 px-3 py-2 rounded-md transition duration-300">
                                    Cambiar Contraseña
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition duration-300"
                                >
                                    Cerrar Sesión
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                            >
                                Iniciar Sesión
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
