    import { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import BotonCerrarSesion from './BotonCerrSesion';
    import ConfirmacionCierre from './ConfirmacionCierre';

    export default function Cerrar({ setUser }) {
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Limpiar almacenamiento local
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        
        // Actualizar estado global (si usas props)
        if (setUser) setUser(null);
        
        // Redirigir
        navigate('/');
    };

    return (
        <>
        <BotonCerrarSesion onClick={() => setMostrarConfirmacion(true)} />
        
        {mostrarConfirmacion && (
            <ConfirmacionCierre 
            onConfirm={handleLogout}
            onCancel={() => setMostrarConfirmacion(false)}
            />
        )}
        </>
    );
    }