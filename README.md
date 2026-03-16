# Task Manager Application

A full-stack web platform designed to help users efficiently organize and manage their personal or professional tasks. The system provides a secure and intuitive environment where users can create projects, structure their work, and track progress in real time, improving productivity and task management.

## Features

### Core Functionality
- **Multi-Project Management**: Users can create and manage multiple projects
- **Board System**: Each project contains boards representing different workflows
- **List Organization**: Create lists within boards (e.g., "Backend", "Frontend", "Design")
- **Task Management**: Add tasks with:
  - Priority levels (Low, Medium, High)
  - Detailed descriptions
  - Deadline tracking
- **Drag & Drop**: Move tasks between lists to reflect their current status

### Technical Stack
- **Backend**: C# ASP.NET Core
- **Frontend**: Angular 21
- **Database**: Entity Framework Core with SQL Server/SQLite

## Architecture

### Project Structure
```
Task-Manager-Application/
├── Full-Stack Task Manager/    # ASP.NET Core Backend
│   ├── Controllers/            # API Controllers
│   ├── Database/               # Database context and configuration
│   ├── Dto/                    # Data Transfer Objects
│   ├── Entity/                 # Database entities
│   ├── Models/                 # Business models
│   ├── Reposity/               # Repository pattern implementation
│   ├── Service/                # Business logic services
│   ├── Migrations/             # EF Core migrations
│   └── Program.cs              # Application entry point
│
└── TaskManager/                # Angular Frontend
    ├── src/
    │   ├── app/                # Angular components and services
    │   ├── assets/             # Static assets
    │   └── styles.css          # Global styles
    ├── angular.json            # Angular configuration
    └── package.json            # Frontend dependencies
```

### API Endpoints

#### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | Get all projects |
| POST | `/api/projects` | Create new project |
| PUT | `/api/projects/{id}` | Update project |
| DELETE | `/api/projects/{id}` | Delete project |

#### Boards
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/boards/project/{projectId}` | Get boards by project |
| POST | `/api/boards` | Create new board |
| PUT | `/api/boards/{id}` | Update board |
| DELETE | `/api/boards/{id}` | Delete board |

#### Lists
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/lists/board/{boardId}` | Get lists by board |
| POST | `/api/lists` | Create new list |
| PUT | `/api/lists/{id}` | Update list |
| DELETE | `/api/lists/{id}` | Delete list |

#### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks/list/{listId}` | Get tasks by list |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/{id}` | Update task |
| PUT | `/api/tasks/{id}/move` | Move task to different list |
| DELETE | `/api/tasks/{id}` | Delete task |

## Getting Started

### Prerequisites
- .NET 8.0 SDK or later
- Node.js 18+ 
- Angular CLI 21+
- SQL Server or SQLite (for development)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd "Full-Stack Task Manager"
```

2. Restore dependencies:
```bash
dotnet restore
```

3. Update database connection string in `appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Your connection string here"
  }
}
```

4. Apply migrations:
```bash
dotnet ef database update
```

5. Run the backend:
```bash
dotnet run
```

The API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd TaskManager
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

4. Open your browser at `http://localhost:4200`

## Additional Features

### Task Priorities
- **Low**: General tasks with no immediate deadline
- **Medium**: Important tasks that need attention
- **High**: Urgent tasks requiring immediate action

### Visual Indicators
- Color-coded priority levels
- Deadline warnings for overdue tasks
- Progress tracking within boards

### User Experience
- Responsive design for all screen sizes
- Real-time updates
- Intuitive drag-and-drop interface
- Clean and modern UI

## API Documentation

Once the backend is running, you can access the Swagger documentation at:
`http://localhost:5000/swagger`

## Technology Highlights

### Backend
- ASP.NET Core 8.0
- Entity Framework Core 8.0
- Repository Pattern
- Dependency Injection
- CORS enabled for frontend integration

### Frontend
- Angular 21
- Reactive Forms
- HTTP Client for API communication
- Modern CSS with Flexbox/Grid
- Component-based architecture

## License

This project is for educational and personal use.
