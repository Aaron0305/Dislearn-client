// src/contexts/UserContext.jsx
import { createContext, useState } from 'react'

export const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    id: 1,
    name: 'Ana',
    completedExercises: 15,
    streak: 3,
    // ...otros campos de usuario
  })

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}