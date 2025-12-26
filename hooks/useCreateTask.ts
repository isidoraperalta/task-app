import { useState } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as ExpoLocation from 'expo-location';
import { Location } from '@/types/types';
import { useAuth } from '@/hooks/useAuth';
import { taskService } from '@/services/taskService';
import { imageService } from '@/services/imageService';

export function useCreateTask() {
  const router = useRouter();
  const { token } = useAuth();
  const [title, setTitle] = useState<string>('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleTakePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Permiso denegado',
          'Necesitamos acceso a la cámara para capturar fotos de tus tareas.',
          [{ text: 'OK' }]
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const capturedImageUri = result.assets[0].uri;
        setImageUri(capturedImageUri);

        await handleUploadImage(capturedImageUri);
        await handleGetLocation();
      }
    } catch (error) {
      console.error('Error al capturar foto:', error);
      Alert.alert(
        'Error',
        'Ocurrió un error al intentar capturar la foto. Por favor, intenta nuevamente.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleUploadImage = async (uri: string) => {
    try {
      setIsUploadingImage(true);
      
      if (!token) {
        throw new Error('No hay token de autenticación');
      }

      const imageUrl = await imageService.uploadImage(token, uri);
      setUploadedImageUrl(imageUrl);
      
      Alert.alert(
        'Imagen subida',
        `Imagen subida exitosamente: ${imageUrl}`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Error al subir imagen:', error);
      Alert.alert(
        'Error',
        'No se pudo subir la imagen al servidor. La tarea se guardará con la imagen local.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleGetLocation = async () => {
    try {
      setIsLoadingLocation(true);

      const { status } = await ExpoLocation.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Permisos de ubicación',
          'Los permisos de ubicación fueron denegados. La tarea se guardará sin coordenadas GPS.',
          [{ text: 'OK' }]
        );
        return;
      }

      const currentLocation = await ExpoLocation.getCurrentPositionAsync({
        accuracy: ExpoLocation.Accuracy.Balanced,
        timeInterval: 0,
        distanceInterval: 0,
      });

      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

    } catch (error: any) {
      console.log('No se pudo obtener la ubicación. La tarea se guardará sin ubicación.');
      console.error('Tipo de error:', error?.code || 'desconocido');
      console.error('Mensaje de error:', error?.message || error);
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleSaveTask = async () => {
    try {
      setIsSaving(true);

      if (!title.trim()) {
        Alert.alert(
          'Título requerido',
          'Por favor ingresa un título para la tarea.',
          [{ text: 'OK' }]
        );
        return;
      }

      if (!token) {
        Alert.alert(
          'Error de autenticación',
          'No hay un usuario autenticado. Por favor inicia sesión.',
          [{ text: 'OK' }]
        );
        return;
      }

      await taskService.createTask(token, {
        title: title.trim(),
        completed: false,
        location: location || undefined,
        photoUri: uploadedImageUrl || imageUri || undefined,
      });

      router.back();

    } catch (error) {
      console.error('Error al guardar tarea:', error);
      Alert.alert(
        'Error',
        'Ocurrió un error al guardar la tarea. Por favor, intenta nuevamente.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsSaving(false);
    }
  };

  const isValid = title.trim().length > 0;

  return {
    title,
    imageUri,
    uploadedImageUrl,
    location,
    isLoadingLocation,
    isSaving,
    isUploadingImage,
    setTitle,
    setImageUri,
    setLocation,
    handleTakePhoto,
    handleGetLocation,
    handleSaveTask,
    isValid,
  };
}
