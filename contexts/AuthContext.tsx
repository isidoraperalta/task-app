import { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  user: string | null;
  login: (username: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<string | null>(null);

  const login = async (username: string) => {
    try {
      await AsyncStorage.setItem('@auth_user', username);
      setUser(username);
    } catch (error) {
      console.error('Error al guardar usuario:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@auth_user');

      setUser(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const checkAuth = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('@auth_user');

      if (savedUser) {
        setUser(savedUser);
      }
    } catch (error) {
      console.error('Error al verificar autenticación:', error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = {
    user,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
