  import { createContext, useState, useEffect, useContext } from 'react';

  export const UserContext = createContext();

  export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    }, []);

    const login = (userData) => {
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    };

    const logout = () => {
      localStorage.removeItem('user');
      setUser(null);
    };

    return (
      <UserContext.Provider value={{ user, loading, login, logout }}>
        {children}
      </UserContext.Provider>
    );
  };

  // Hook personalizado useUser
  export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error('useUser must be used within a UserProvider');
    }
    return context;
  }