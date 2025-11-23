import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCreateTask } from '@/hooks/useCreateTask';
import { CreateTaskForm } from '@/components/CreateTaskForm';

export default function CreateTaskScreen() {
  const router = useRouter();

  const {
    title,
    imageUri,
    location,
    isLoadingLocation,
    isSaving,
    setTitle,
    handleTakePhoto,
    handleSaveTask,
    isValid,
  } = useCreateTask();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Pressable style={styles.backButton} onPress={handleGoBack}>
              <Ionicons name="arrow-back" size={24} color="#007AFF" />
            </Pressable>
            <Text style={styles.headerTitle}>Nueva Tarea</Text>
          </View>

          <CreateTaskForm
            title={title}
            imageUri={imageUri}
            location={location}
            isLoadingLocation={isLoadingLocation}
            isSaving={isSaving}
            isValid={isValid}
            onTitleChange={setTitle}
            onTakePhoto={handleTakePhoto}
            onSaveTask={handleSaveTask}
          />
        </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
  },
});