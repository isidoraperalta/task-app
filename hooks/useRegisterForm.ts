import { useState } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { authService } from '@/services/authService';
import { useAuth } from './useAuth';

export const useRegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleRegister = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Por favor ingresa un email');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Error', 'Por favor ingresa una contraseña');
      return;
    }
    setIsLoading(true);

    try {
      await authService.register(email.trim(), password);
      // Auto-login after successful registration
      await login(email.trim(), password);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'No se pudo crear la cuenta');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    handleRegister,
  };
};