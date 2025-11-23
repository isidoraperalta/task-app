import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task } from '@/types/types';

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  
  const handleDelete = () => {
    Alert.alert(
      'Eliminar tarea',
      '¿Estás seguro de que deseas eliminar esta tarea?',
      [
        { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
        {
          text: 'Eliminar',
          onPress: () => onDelete(task.id),
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Pressable
          style={styles.checkbox}
          onPress={() => onToggle(task.id)}
          accessible={true}
          accessibilityLabel={`Marcar tarea como ${task.completed ? 'pendiente' : 'completada'}`}
        >
          <Ionicons
            name={task.completed ? 'checkbox' : 'checkbox-outline'}
            size={24}
            color={task.completed ? '#34C759' : '#8E8E93'}
          />
        </Pressable>

        <Text
          style={[
            styles.title,
            task.completed && styles.titleCompleted,
          ]}
          numberOfLines={2}
        >
          {task.title}
        </Text>

        <Pressable
          style={styles.deleteButton}
          onPress={handleDelete}
          accessible={true}
          accessibilityLabel="Eliminar tarea"
        >
          <Ionicons name="trash-outline" size={20} color="#FF3B30" />
        </Pressable>
      </View>

      {task.imageUri && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: task.imageUri }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      )}

      {task.location && (
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={14} color="#8E8E93" />
          <Text style={styles.locationText}>
            {task.location.latitude}, {task.location.longitude}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    padding: 4,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: '#8E8E93',
  },
  deleteButton: {
    padding: 4,
  },
  imageContainer: {
    marginTop: 8,
    borderRadius: 6,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 120,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 4,
  },

  // Texto de ubicación (coordenadas)
  locationText: {
    fontSize: 12,
    color: '#8E8E93',
  },
});
