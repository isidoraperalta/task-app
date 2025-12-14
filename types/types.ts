export interface Location {
  latitude: number;
  longitude: number;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  photoUri?: string;
  location?: Location;
  createdAt: string;
  updatedAt: string;
  userId: string;
}