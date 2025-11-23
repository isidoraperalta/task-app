# Task App

Aplicación móvil para gestionar tareas con fotos y ubicación GPS.

## 🎥 Video Demostrativo

[![Ver video en Loom](https://cdn.loom.com/sessions/thumbnails/5168949dadd54dbf891748c6e14ecc06-5ef3f95c0a145170-full-play.gif)](https://www.loom.com/share/5168949dadd54dbf891748c6e14ecc06)

## 🚀 Instalación

```bash
npm install
npx expo install expo-router expo-image-picker expo-location @react-native-async-storage/async-storage
```

## ▶️ Ejecutar

```bash
npx expo start
```

Presiona `a` para Android, `i` para iOS o `w` para web

## 🔐 Credenciales

Ingresa cualquier nombre de usuario con la contraseña **1234**

Ejemplo:

- Usuario: `juan`
- Contraseña: `1234`

## ✨ Funcionalidades

- Crear tareas con título
- Capturar fotos con la cámara
- Obtener ubicación GPS automáticamente
- Marcar tareas como completadas
- Eliminar tareas
- Guardar datos localmente

## 📁 Estructura

```
task-app/
├── app/              # Pantallas (login, tareas, crear)
├── components/       # Componentes reutilizables
├── contexts/         # AuthContext
├── hooks/            # Custom hooks
└── types/            # Tipos TypeScript
```

## 🛠️ Tecnologías

- React Native
- Expo
- TypeScript
- AsyncStorage
- expo-image-picker
- expo-location
