import { API_URL } from '@/constants/api';

interface ImageUploadResponse {
  success: boolean;
  data: {
    url: string;
    filename: string;
  };
}

export const imageService = {
  async uploadImage(token: string, imageUri: string): Promise<string> {
    const formData = new FormData();
    
    const imageFile = {
      uri: imageUri,
      type: 'image/jpeg',
      name: `image_${Date.now()}.jpg`,
    } as any;
    
    formData.append('image', imageFile);

    const response = await fetch(`${API_URL}/images`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Error al subir imagen');
    }

    const result: ImageUploadResponse = await response.json();
    return result.data.url;
  },
};