import { useState, useEffect } from 'react';
import { Task } from '@/types/types';
import { taskService } from '@/services/taskService';
import { useAuth } from './useAuth';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  const loadTasks = async () => {
    if (!token) return;
    
    setIsLoading(true);
    try {
      const data = await taskService.getTasks(token);
      setTasks(data);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTask = async (taskId: string) => {
    if (!token) return;

    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    try {
      const updatedTask = await taskService.updateTask(token, taskId, {
        completed: !task.completed
      });
      setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t));
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const deleteTask = async (taskId: string) => {
    if (!token) return;

    try {
      await taskService.deleteTask(token, taskId);
      setTasks(prev => prev.filter(t => t.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [token]);

  return {
    tasks,
    isLoading,
    loadTasks,
    toggleTask,
    deleteTask,
  };
};