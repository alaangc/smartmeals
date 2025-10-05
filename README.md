# SmartMeals

Planificación inteligente de comidas personalizada para tu estilo de vida.

## Descripción

SmartMeals es una aplicación web que te ayuda a crear planes de comidas personalizados adaptados a tus objetivos, preferencias dietéticas y alergias. Organiza tu semana completa con desayuno, almuerzo y cena, y accede a recetas detalladas con ingredientes, instrucciones y tiempos de preparación.

## Características

- 🍽️ **Planes Personalizados**: Recibe planes de comidas adaptados a tus necesidades
- 📅 **Organización Semanal**: Planifica toda tu semana de manera eficiente
- 👨‍🍳 **Recetas Detalladas**: Accede a recetas completas con instrucciones paso a paso
- 🔐 **Autenticación con Google**: Inicio de sesión seguro con tu cuenta de Google

## Tecnologías

- [Next.js 14](https://nextjs.org/) - Framework de React
- [TypeScript](https://www.typescriptlang.org/) - Tipado estático
- [Tailwind CSS](https://tailwindcss.com/) - Estilos
- [NextAuth.js](https://next-auth.js.org/) - Autenticación
- [Anthropic AI](https://www.anthropic.com/) - Generación de planes de comidas con IA

## Empezando

### Prerequisitos

- Node.js 18+ instalado
- Cuenta de Google Cloud (para OAuth)
- API Key de Anthropic (opcional, para generación con IA)

### Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/smartmeals.git
cd smartmeals
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales:
- `NEXTAUTH_URL`: URL de tu aplicación (http://localhost:3000 en desarrollo)
- `NEXTAUTH_SECRET`: Secreto para NextAuth (genera uno con `openssl rand -base64 32`)
- `GOOGLE_CLIENT_ID`: ID de cliente de Google OAuth
- `GOOGLE_CLIENT_SECRET`: Secreto de cliente de Google OAuth
- `ANTHROPIC_API_KEY`: Tu API key de Anthropic (opcional)

4. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Configurar Google OAuth

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google+
4. Crea credenciales OAuth 2.0
5. Agrega `http://localhost:3000/api/auth/callback/google` como URI de redirección autorizada
6. Copia el Client ID y Client Secret a tu `.env.local`

## Deploy en Vercel

La forma más fácil de desplegar tu aplicación Next.js es usar [Vercel](https://vercel.com):

1. Sube tu código a GitHub
2. Importa el proyecto en Vercel
3. Configura las variables de entorno en la configuración del proyecto
4. Vercel automáticamente detectará Next.js y configurará el build

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tu-usuario/smartmeals)

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Crea el build de producción
- `npm start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## Licencia

Este proyecto es de código abierto y está disponible bajo la [Licencia MIT](LICENSE).

## Soporte

Para preguntas o problemas, por favor abre un issue en el repositorio.
