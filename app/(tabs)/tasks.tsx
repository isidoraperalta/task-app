import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import { useTasks } from '@/hooks/useTasks';
import { TaskList } from '@/components/TaskList';
import { FloatingActionButton } from '@/components/FloatingActionButton';

export default function TaskListScreen() {
    const router = useRouter();
    const { tasks, isLoading, loadTasks, toggleTask, deleteTask } = useTasks();

    const handleCreateTask = () => {
        router.push('/create');
    };

    useFocusEffect(
        React.useCallback(() => {
            loadTasks();
        }, [])
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Mis Tareas</Text>
            </View>
            <TaskList
                tasks={tasks}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
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
