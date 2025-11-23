import { useState } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from './useAuth';
import { DEV_PASSWORD } from '@/constants/auth';

export const useLoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!username.trim()) {
      Alert.alert('Error', 'Por favor ingresa un nombre de usuario');
      return;
    }
    if (password !== DEV_PASSWORD) {
      Alert.alert('Error', `Contraseña incorrecta. La contraseña es: ${DEV_PASSWORD}`);
      return;
    }
    setIsLoading(true);

    try {
      await login(username.trim());
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Error', 'No se pudo iniciar sesión. Intenta de nuevo.');
      console.error('Error en login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    isLoading,
    handleLogin,
  };
}
