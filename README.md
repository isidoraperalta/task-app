# Task App

Aplicación móvil para gestionar tareas con fotos y ubicación GPS conectada a backend.

## 🎥 Video Demostrativo

[![Ver video en Loom](https://cdn.loom.com/sessions/thumbnails/5168949dadd54dbf891748c6e14ecc06-5ef3f95c0a145170-full-play.gif)](https://www.loom.com/share/5168949dadd54dbf891748c6e14ecc06)

## 🚀 Instalación

```bash
npm install
```

## ⚙️ Configuración

Crea archivo `.env` con:

```
EXPO_PUBLIC_API_URL=https://todo-list.dobleb.cl
```

## ▶️ Ejecutar

```bash
npx expo start
```

Presiona `a` para Android, `i` para iOS o `w` para web

## 🔐 Autenticación

- **Registro**: Crea cuenta con email y contraseña
- **Login**: Inicia sesión con credenciales registradas
- **JWT**: Autenticación con tokens seguros

## ✨ Funcionalidades

- Registro y login de usuarios
- Crear tareas con título
- Capturar fotos con la cámara
- Obtener ubicación GPS automáticamente
- Marcar tareas como completadas
- Eliminar tareas
- Sincronización con backend en tiempo real
- Datos asociados por usuario

## 📁 Estructura

```
task-app/
├── app/              # Pantallas (login, register, tareas, crear)
├── components/       # Componentes reutilizables
├── contexts/         # AuthContext con JWT
├── hooks/            # Custom hooks (useAuth, useTasks, etc.)
├── services/         # API services (auth, tasks)
├── constants/        # Configuración API
└── types/            # Tipos TypeScript
```

## 🛠️ Tecnologías

- React Native
- Expo
- TypeScript
- Backend REST API
- JWT Authentication
- expo-image-picker
- expo-location
- AsyncStorage (solo para tokens)

## 🌐 Backend

- **API**: https://todo-list.dobleb.cl
- **Docs**: https://todo-list.dobleb.cl/docs
- **Autenticación**: JWT Bearer tokens
- **Endpoints**: /auth/login, /auth/register, /todos
