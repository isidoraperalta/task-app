import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface WelcomeCardProps {
  username: string;
}

export function WelcomeCard({ username }: WelcomeCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="person-circle-outline" size={100} color="#007AFF" />
      </View>

      <Text style={styles.welcomeTitle}>¡Hola, {username}!</Text>
      <Text style={styles.welcomeSubtitle}>
        Bienvenido a tu gestor de tareas
      </Text>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle-outline" size={24} color="#007AFF" />
        <Text style={styles.infoText}>
          Ve al tab "Tareas" para ver y crear tus tareas con fotos y ubicación
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 32,
    textAlign: 'center',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    maxWidth: 320,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#000000',
    marginLeft: 12,
    lineHeight: 20,
  },
});
