import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular la carga de datos del usuario desde un API o localStorage
    const fetchUser = () => {
      setTimeout(() => {
        // Datos de ejemplo para el usuario
        const mockUser = {
          id: 1,
          name: 'Ana García',
          email: 'ana.garcia@ejemplo.com',
          completedExercises: 24,
          streak: 7,
          improvement: 15,
          badges: ['fast-learner', 'consistency-master', 'reading-pro'],
          progress: {
            reading: 78,
            writing: 65,
            comprehension: 82
          }
        };
        
        setUser(mockUser);
        setLoading(false);
      }, 1000);
    };
    
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};