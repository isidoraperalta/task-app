import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/hooks/useAuth';
import { TaskList } from '@/components/TaskList';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { Task } from '@/types/types';

export default function TaskListScreen() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const router = useRouter();
    const { user } = useAuth();

    const loadTasks = async () => {
        try {
            if (!user) {
                setTasks([]);
                return;
            }
            const storageKey = `@tasks_${user}`;
            const tasksJson = await AsyncStorage.getItem(storageKey);
            if (tasksJson) {
                const loadedTasks = JSON.parse(tasksJson);
                setTasks(loadedTasks);
            } else {
                setTasks([]);
            }
        } catch (error) {
            console.error('Error al cargar tareas:', error);
            setTasks([]);
        }
    };

    const handleToggleTask = async (taskId: string) => {
        try {
            if (!user) return;

            const storageKey = `@tasks_${user}`;

            const tasksJson = await AsyncStorage.getItem(storageKey);
            if (!tasksJson) return;

            const allTasks = JSON.parse(tasksJson) as Task[];

            const updatedTasks = allTasks.map(task =>
                task.id === taskId
                    ? { ...task, completed: !task.completed }
                    : task
            );

            await AsyncStorage.setItem(storageKey, JSON.stringify(updatedTasks));

            setTasks(updatedTasks);
        } catch (error) {
            console.error('Error al cambiar estado de tarea:', error);
        }
    };

    const handleDeleteTask = async (taskId: string) => {
        try {
            if (!user) return;

            const storageKey = `@tasks_${user}`;

            const tasksJson = await AsyncStorage.getItem(storageKey);
            if (!tasksJson) return;

            const allTasks = JSON.parse(tasksJson) as Task[];

            const updatedTasks = allTasks.filter(task => task.id !== taskId);

            await AsyncStorage.setItem(storageKey, JSON.stringify(updatedTasks));

            setTasks(updatedTasks);
        } catch (error) {
            console.error('Error al eliminar tarea:', error);
        }
    };

    const handleCreateTask = () => {
        router.push('/create');
    };

    useFocusEffect(
        React.useCallback(() => {
            loadTasks();
        }, [user])
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Mis Tareas</Text>
            </View>
            <TaskList
                tasks={tasks}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
            />
            <FloatingActionButton onPress={handleCreateTask} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
    },
    header: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000000',
    },
});
