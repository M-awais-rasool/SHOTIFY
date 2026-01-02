# Shotify - App Store Screenshot Generator

A modern, minimal, dark-themed web platform to generate App Store and Play Store screenshots. Built with Go backend and React frontend.

![Shotify](https://via.placeholder.com/1200x630/0B0B0B/3B82F6?text=Shotify)

## Features

- 🎨 **Modern Dark Theme** - Professional, developer-focused UI
- 📱 **Multi-Platform Support** - iOS App Store & Google Play screenshots
- 🖼️ **Visual Editor** - Drag, resize, and customize layers
- 📦 **Batch Export** - Export multiple sizes as ZIP
- 🔄 **Real-time Preview** - See changes instantly
- 💾 **Cloud Storage** - Images stored on S3
- 🔐 **JWT Authentication** - Secure user accounts

## Tech Stack

### Backend
- Go 1.21+
- Gin Framework
- MongoDB
- AWS S3 / MinIO
- JWT Authentication

### Frontend
- React 18 + Vite
- TypeScript
- Konva.js (Canvas Editor)
- Zustand (State Management)
- TailwindCSS
- JSZip + FileSaver

## Project Structure

```
shotify/
├── backend/
│   ├── cmd/
│   │   └── main.go
│   ├── internal/
│   │   ├── config/
│   │   ├── handler/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── repository/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── pkg/
│   │   ├── database/
│   │   ├── logger/
│   │   └── storage/
│   ├── go.mod
│   ├── go.sum
│   ├── Makefile
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── layouts/
    │   ├── lib/
    │   ├── pages/
    │   ├── stores/
    │   ├── styles/
    │   └── types/
    ├── package.json
    └── vite.config.ts
```

## Getting Started

### Prerequisites

- Go 1.21+
- Node.js 18+
- MongoDB
- AWS S3 bucket (or MinIO for local development)

### Backend Setup

```bash
cd backend

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
# - MONGO_URI
# - JWT_SECRET
# - AWS credentials

# Install dependencies
go mod download

# Run the server
make run
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

### Environment Variables

#### Backend (.env)

```env
PORT=8080
ENVIRONMENT=development
MONGO_URI=mongodb://localhost:27017
DATABASE_NAME=shotify
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=shotify-uploads
# For MinIO (local development)
# AWS_ENDPOINT=http://localhost:9000
ALLOWED_ORIGINS=http://localhost:5173
```

#### Frontend (.env)

```env
VITE_API_URL=/api
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Templates
- `GET /api/get-templates` - Get all templates
- `GET /api/get-template-byId/:id` - Get template by ID

### Projects (Protected)
- `POST /api/create-project` - Create new project
- `GET /api/get-projects` - Get user's projects
- `GET /api/get-project-byId/:id` - Get project by ID
- `PUT /api/update-project/:id` - Update project
- `DELETE /api/delete-projects/:id` - Delete project

### Uploads (Protected)
- `POST /api/uploads/image` - Upload image to S3

## Design System

### Colors
- Background: `#0B0B0B`
- Surface: `#111111`
- Border: `#1F1F1F`
- Text Primary: `#FFFFFF`
- Text Secondary: `#B3B3B3`
- Accent Blue: `#3B82F6`
- Accent Green: `#22C55E`

### Typography
- Font: Inter
- Headings: Semi-bold (600)
- Body: Regular (400)
- Buttons: Medium (500)

## Development

### Running with MinIO (Local S3)

```bash
# Start MinIO
docker run -p 9000:9000 -p 9001:9001 \
  -e MINIO_ROOT_USER=minioadmin \
  -e MINIO_ROOT_PASSWORD=minioadmin \
  minio/minio server /data --console-address ":9001"

# Create bucket via MinIO Console (http://localhost:9001)
# Update backend .env:
# AWS_ENDPOINT=http://localhost:9000
# AWS_ACCESS_KEY_ID=minioadmin
# AWS_SECRET_ACCESS_KEY=minioadmin
```

### Building for Production

```bash
# Backend
cd backend
make build-prod

# Frontend
cd frontend
npm run build
```

## License

MIT License
