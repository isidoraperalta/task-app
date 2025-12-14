import { API_URL } from '@/constants/api';

export interface LoginResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    };
    token: string;
  };
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    console.log('🔐 Login attempt:', { email, url: `${API_URL}/auth/login` });

    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ Error response:', errorText);
      throw new Error('Credenciales incorrectas');
    }

    const data = await response.json();
    console.log('✅ Login success:', { token: data.data?.token ? 'present' : 'missing', user: data.data?.user });
    return data;
  },

  async register(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

      console.log(response.ok);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ Register error:', errorText);
    
      if (response.status === 400) {
        throw new Error('Credenciales inválidas');
      }

      if (response.status === 409) {
        throw new Error('Este email ya está registrado');
      }
      throw new Error('Error al registrar usuario');
    }

    return response.json();
  },
};