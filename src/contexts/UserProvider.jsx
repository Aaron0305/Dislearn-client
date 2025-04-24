import { useState, useEffect } from 'react';
import { UserContext } from './UserContext';

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simular carga de usuario
    const mockUser = {
      id: 1,
      name: 'Usuario Ejemplo',
      avatar: 'default-avatar.png',
      level: 'beginner',
      completedExercises: 0,
      score: 0
    };
    setUser(mockUser);
  }, []);

  const updateUser = (newData) => {
    setUser(prev => ({ ...prev, ...newData }));
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Exportación por defecto para compatibilidad
export default UserProvider;