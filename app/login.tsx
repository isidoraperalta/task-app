import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLoginForm } from '@/hooks/useLoginForm';
import { LoginForm } from '@/components/LoginForm';
import { DEV_PASSWORD } from '@/constants/auth';

export default function LoginScreen() {
  const { username, setUsername, password, setPassword, isLoading, handleLogin } = useLoginForm();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Task App</Text>
          <Text style={styles.subtitle}>Gestiona tus tareas con fotos y ubicación</Text>
          <LoginForm
            username={username}
            onUsernameChange={setUsername}
            password={password}
            onPasswordChange={setPassword}
            onSubmit={handleLogin}
            isLoading={isLoading}
          />
          <Text style={styles.info}>Usa cualquier nombre de usuario y la contraseña: {DEV_PASSWORD}</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },

  keyboardView: {
    flex: 1,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 48,
    textAlign: 'center',
  },

  info: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 24,
    paddingHorizontal: 32,
  },
});
