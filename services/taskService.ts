import { API_URL } from '@/constants/api';
import { Task } from '@/types/types';

interface TodoResponse {
  success: boolean;
  data: Task[];
  count: number;
}

interface SingleTodoResponse {
  success: boolean;
  data: Task;
}

export const taskService = {
  async getTasks(token: string): Promise<Task[]> {
    const response = await fetch(`${API_URL}/todos`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener tareas');
    }

    const result: TodoResponse = await response.json();
    return result.data;
  },

  async createTask(token: string, task: { title: string; completed?: boolean; location?: { latitude: number; longitude: number }; photoUri?: string }): Promise<Task> {
    const response = await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error('Error al crear tarea');
    }

    const result: SingleTodoResponse = await response.json();
    return result.data;
  },

  async updateTask(token: string, taskId: string, updates: { title?: string; completed?: boolean; location?: { latitude: number; longitude: number }; photoUri?: string }): Promise<Task> {
    const response = await fetch(`${API_URL}/todos/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar tarea');
    }

    const result: SingleTodoResponse = await response.json();
    return result.data;
  },

  async deleteTask(token: string, taskId: string): Promise<void> {
    const response = await fetch(`${API_URL}/todos/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al eliminar tarea');
    }
  },
};