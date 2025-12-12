# Todo App Frontend (React)

A modern, responsive React frontend for managing todos with user authentication.

## Features

- **User Authentication**: Sign up and sign in functionality
- **Todo Management**: Create, view, and delete todos
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Beautiful UI**: Modern gradient design with smooth animations
- **Token-based Auth**: JWT token management for secure API calls

## Project Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Login.jsx          # Login/Signup page
│   │   └── Dashboard.jsx      # Todo management page
│   ├── api/
│   │   └── api.js             # API client with axios
│   ├── App.jsx                # Main app component
│   ├── index.css              # Global styles
│   └── main.jsx               # Entry point
├── index.html                 # HTML template
├── vite.config.js            # Vite configuration
└── package.json              # Dependencies
```

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development Mode
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Prerequisites

- Node.js 14+ installed
- Backend server running on `http://localhost:8000`
- PostgreSQL database configured in backend

## How to Use

1. **Sign Up**: Create a new account with your email and password
2. **Sign In**: Login with your credentials
3. **Add Todo**: Enter a title and optional description, then click "Add Todo"
4. **View Todos**: All your todos will be displayed in the dashboard
5. **Delete Todo**: Click the "Delete" button on any todo to remove it
6. **Logout**: Click the logout button to exit

## Technologies Used

- **React 18**: UI library
- **Vite**: Build tool and dev server
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **CSS3**: Styling with gradients and animations

## API Endpoints

The frontend communicates with the backend through these endpoints:

- `POST /signup` - Create a new account
- `POST /signin` - Login to account
- `POST /add` - Create a new todo
- `GET /get` - Fetch all todos
- `DELETE /delete` - Delete a todo

## Environment Configuration

The API base URL is set to `http://localhost:8000` in `src/api/api.js`. Modify this if your backend runs on a different port.

## Features in Detail

### Authentication
- Secure login/signup with JWT tokens
- Tokens stored in localStorage for persistence
- Automatic logout functionality
- Error handling for failed authentication

### Todo Management
- Add todos with title and description
- Real-time todo list updates
- Delete todos with confirmation
- Error and success notifications

## Notes

- Make sure your backend server is running before starting the frontend
- Clear browser cache if you encounter issues
- Check browser console for any error messages
