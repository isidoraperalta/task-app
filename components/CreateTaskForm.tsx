import React from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Image } from 'react-native';
import { Location } from '@/types/types';

interface CreateTaskFormProps {
  title: string;
  imageUri: string | null;
  location: Location | null;
  isLoadingLocation: boolean;
  isSaving: boolean;
  isValid: boolean;
  onTitleChange: (text: string) => void;
  onTakePhoto: () => void;
  onSaveTask: () => void;
}

export function CreateTaskForm({
  title,
  imageUri,
  location,
  isLoadingLocation,
  isSaving,
  isValid,
  onTitleChange,
  onTakePhoto,
  onSaveTask,
}: CreateTaskFormProps) {
  return (
    <View style={styles.form}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Título de la tarea</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Comprar ingredientes"
          placeholderTextColor="#8E8E93"
          value={title}
          onChangeText={onTitleChange}
          autoCapitalize="sentences"
          returnKeyType="done"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Foto</Text>
        <Pressable style={styles.photoButton} onPress={onTakePhoto}>
          <Text style={styles.photoButtonText}>📷 Tomar Foto</Text>
        </Pressable>
      </View>

      {imageUri && (
        <View style={styles.imagePreviewContainer}>
          <Text style={styles.label}>Vista previa</Text>
          <Image
            source={{ uri: imageUri }}
            style={styles.imagePreview}
            resizeMode="cover"
          />
        </View>
      )}

      {isLoadingLocation && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>📍 Obteniendo ubicación...</Text>
        </View>
      )}

      {location && !isLoadingLocation && (
        <View style={styles.locationContainer}>
          <Text style={styles.label}>📍 Ubicación capturada</Text>
          <View style={styles.locationInfo}>
            <Text style={styles.locationText}>
              Latitud: {location.latitude}
            </Text>
            <Text style={styles.locationText}>
              Longitud: {location.longitude}
            </Text>
          </View>
        </View>
      )}

      <Pressable
        style={[
          styles.saveButton, 
          (!isValid || isSaving) && styles.saveButtonDisabled
        ]}
        onPress={onSaveTask}
        disabled={!isValid || isSaving}
      >
        <Text style={styles.saveButtonText}>
          {isSaving ? 'Guardando...' : 'Guardar Tarea'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 16,
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000000',
  },
  photoButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  photoButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  imagePreviewContainer: {
    marginBottom: 24,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: '#E5E5EA',
  },
  loadingContainer: {
    backgroundColor: '#FFF3CD',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FFE69C',
  },
  loadingText: {
    fontSize: 16,
    color: '#856404',
    fontWeight: '600',
    textAlign: 'center',
  },
  locationContainer: {
    marginBottom: 24,
  },
  locationInfo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  locationText: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 4,
  },
  saveButton: {
    backgroundColor: '#34C759',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonDisabled: {
    backgroundColor: '#8E8E93',
    opacity: 0.5,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
