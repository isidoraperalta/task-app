import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

interface LoginFormProps {
  username: string;
  onUsernameChange: (text: string) => void;
  password: string;
  onPasswordChange: (text: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
}

export function LoginForm({
  username,
  onUsernameChange,
  password,
  onPasswordChange,
  onSubmit,
  isLoading = false,
}: LoginFormProps) {
  return (
    <View style={styles.form}>
      <Text style={styles.label}>Email</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingresa tu email"
        value={username}
        onChangeText={onUsernameChange}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        returnKeyType="next"
        editable={!isLoading}
      />

      <Text style={styles.label}>Contraseña</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingresa tu contraseña"
        value={password}
        onChangeText={onPasswordChange}
        secureTextEntry
        returnKeyType="done"
        onSubmitEditing={onSubmit}
        editable={!isLoading}
      />

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
          isLoading && styles.buttonDisabled,
        ]}
        onPress={onSubmit}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: '100%',
    maxWidth: 400,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    marginBottom: 24,
  },

  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },

  buttonPressed: {
    opacity: 0.8,
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
