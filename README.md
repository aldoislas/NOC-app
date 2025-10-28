# NOC App - Network Operations Center

Aplicación de monitoreo de servicios (NOC - Network Operations Center) desarrollada con Node.js y TypeScript. Utiliza trabajos cron para verificar periódicamente la disponibilidad de URLs y registra los resultados en archivos de log.

## 📋 Descripción

Esta aplicación implementa un sistema de monitoreo que:
- Verifica la disponibilidad de URLs/servicios de forma periódica
- Registra eventos en archivos de log clasificados por severidad
- Utiliza arquitectura limpia con separación de responsabilidades
- Implementa patrones de diseño como Repository y Datasource

## 🏗️ Arquitectura

El proyecto sigue los principios de Clean Architecture:

```
src/
├── domain/              # Lógica de negocio y reglas
│   ├── datasources/     # Interfaces de fuentes de datos
│   ├── entities/        # Entidades del dominio
│   ├── repository/      # Interfaces de repositorios
│   └── use-cases/       # Casos de uso
├── infrastructure/      # Implementaciones técnicas
│   ├── datasources/     # Implementaciones de datasources
│   └── repositories/    # Implementaciones de repositories
├── presentation/        # Capa de presentación
│   ├── cron/           # Servicios de trabajos programados
│   └── server.ts       # Configuración del servidor
└── config/             # Configuración de la aplicación
    └── plugins/        # Plugins de configuración (env vars)
```

## 🚀 Requisitos Previos

- **Node.js**: v18 o superior
- **npm**: v8 o superior
- **TypeScript**: v5.9.3 (incluido en devDependencies)

## 📦 Instalación

1. Clona el repositorio (o navega a la carpeta del proyecto)

2. Instala las dependencias:
```bash
npm install
```

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Puerto de la aplicación
PORT=3000

# Configuración de correo electrónico
MAILER_EMAIL=tu-email@ejemplo.com
MAILER_SECRET_KEY=tu-clave-secreta

# Entorno de ejecución
PROD=false
```

#### Descripción de Variables:

- **PORT**: Puerto en el que se ejecutará la aplicación (número)
- **MAILER_EMAIL**: Email válido para notificaciones (debe ser un email válido)
- **MAILER_SECRET_KEY**: Clave secreta para el servicio de correo
- **PROD**: Indica si está en producción (true/false)

### Archivo .env de Ejemplo

Puedes crear un archivo `.env.template` como referencia:

```env
PORT=3000
MAILER_EMAIL=ejemplo@correo.com
MAILER_SECRET_KEY=tu_clave_aqui
PROD=false
```

## 🎯 Scripts Disponibles

### Desarrollo

```bash
# Ejecutar en modo desarrollo
npm run dev

# Ejecutar en modo desarrollo con watch (auto-reload)
npm run dev:watch
```

### Producción

```bash
# Compilar el proyecto
npm run build

# Compilar y ejecutar en producción
npm start
```

### Otros

```bash
# Ejecutar tests
npm test
```

## 🔧 Uso

### Iniciar la aplicación

```bash
npm run dev
```

La aplicación:
1. Cargará las variables de entorno desde el archivo `.env`
2. Iniciará el servidor
3. Configurará un trabajo cron que se ejecuta cada 10 segundos
4. Verificará la disponibilidad de las URLs configuradas
5. Registrará los resultados en archivos de log

### Logs

Los logs se guardan en la carpeta `logs/` clasificados por nivel:

- **logs-all.log**: Todos los logs
- **logs-medium.log**: Logs de nivel medio
- **logs-high.log**: Logs de nivel alto (errores críticos)

## 📝 Personalización

### Cambiar la URL a Monitorear

Edita el archivo `src/presentation/server.ts`:

```typescript
const url = 'https://tu-url-a-monitorear.com';
```

### Cambiar la Frecuencia del Cron

En `src/presentation/server.ts`, modifica el patrón cron:

```typescript
// Formato: segundos minutos horas día mes día-semana
CronService.createJob('*/10 * * * * *', () => {
  // Se ejecuta cada 10 segundos
});
```

Ejemplos de patrones cron:
- `*/10 * * * * *` - Cada 10 segundos
- `* * * * *` - Cada minuto
- `0 */5 * * * *` - Cada 5 minutos
- `0 0 * * * *` - Cada hora

## 🛠️ Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución
- **TypeScript**: Lenguaje de programación
- **dotenv**: Gestión de variables de entorno
- **env-var**: Validación de variables de entorno
- **cron**: Programación de tareas
- **ts-node**: Ejecución de TypeScript en desarrollo
- **nodemon**: Auto-reload en desarrollo

## 📚 Dependencias

### Producción
```json
{
  "cron": "^4.3.3",
  "dotenv": "^17.2.3",
  "env-var": "^7.5.0"
}
```

### Desarrollo
```json
{
  "@types/node": "^24.9.1",
  "nodemon": "^3.1.10",
  "rimraf": "^6.0.1",
  "ts-node": "^10.9.2",
  "typescript": "^5.9.3"
}
```

## 🐛 Solución de Problemas

### Error: "env.get is not a function"

Este error ocurre cuando la importación de `env-var` no es correcta. Asegúrate de que en `src/config/plugins/envs.plugin.ts` la importación sea:

```typescript
import env from 'env-var';
```

Y no:
```typescript
import * as env from 'env-var'; // ❌ Incorrecto
```

### Error: Variables de entorno requeridas

Si recibes un error indicando que faltan variables de entorno:
1. Verifica que el archivo `.env` existe en la raíz del proyecto
2. Asegúrate de que todas las variables requeridas están definidas
3. Verifica que los valores sean del tipo correcto (número, email, booleano, etc.)

### Warnings de Node.js

Si ves warnings sobre `--experimental-loader` o `fs.Stats constructor`, son advertencias normales en Node.js v23+ y no afectan el funcionamiento de la aplicación.

## 📄 Licencia

ISC

## 👤 Autor

Proyecto desarrollado como parte del curso de Node.js

---

**Nota**: Este proyecto es parte de un curso educativo de Node.js y TypeScript enfocado en arquitectura limpia y buenas prácticas de desarrollo.

