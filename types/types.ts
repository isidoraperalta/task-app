export interface Location {
  latitude: string;
  longitude: string;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  imageUri: string;
  location: Location;
  createdAt: string;
  userId: string;
}