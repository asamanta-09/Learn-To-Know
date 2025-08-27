# LearnToKnow - Educational Platform

<div align="center">
  <img src="client/public/learn-to-know-white.svg" alt="LearnToKnow Logo" width="200"/>
  <h3>Empowering Education Through Technology</h3>
</div>

## 📖 Overview

LearnToKnow is a comprehensive educational platform that connects students, teachers, and administrators in a seamless learning environment. The platform facilitates course creation, management, and learning through various modes including online, offline, and hybrid courses.

## ✨ Features

### 🎓 For Students
- **User Registration & Authentication**: Secure signup with email verification
- **Course Discovery**: Browse online and offline courses by topic
- **Course Details**: View comprehensive course information including prerequisites, outcomes, and demo videos
- **Learning Resources**: Access study materials and reference videos
- **Profile Management**: Complete profile with academic details
- **Password Recovery**: Secure password reset via email OTP

### 👨‍🏫 For Teachers
- **Course Creation**: Create and manage courses with rich content
- **Course Management**: Upload course materials, videos, and resources
- **Analytics Dashboard**: View course statistics and enrollment data
- **Profile Management**: Professional profile with teaching credentials
- **Multi-mode Support**: Create online, offline, and hybrid courses

### 👨‍💼 For Administrators
- **Content Management**: Upload and manage study materials (PDFs, images)
- **Reference Videos**: Add YouTube video playlists for additional learning
- **User Management**: Oversee student and teacher accounts
- **Analytics**: Comprehensive platform statistics and insights
- **System Administration**: Full platform control and monitoring

### 🔐 Security Features
- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Different permissions for students, teachers, and admins
- **Password Encryption**: Bcrypt hashing for secure password storage
- **Email Verification**: OTP-based email verification for new accounts
- **Protected Routes**: Middleware-based route protection

## 🛠️ Technology Stack

### Frontend
- **React 19.1.1** - Modern React with latest features
- **Vite 7.1.2** - Fast build tool and development server
- **React Router DOM 7.8.2** - Client-side routing
- **React Toastify 11.0.5** - User-friendly notifications
- **Ionicons 8.0.13** - Beautiful icon library
- **ApexCharts 5.3.4** - Interactive charts and analytics

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 5.1.0** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose 8.18.0** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt 6.0.0** - Password hashing
- **Multer 2.0.2** - File upload handling
- **Nodemailer 7.0.5** - Email functionality
- **Cloudinary 2.7.0** - Cloud image and file storage

### Development Tools
- **ESLint** - Code linting
- **Nodemon** - Development server with auto-restart
- **Prettier** - Code formatting

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database
- Cloudinary account (for file storage)
- Email service (for OTP functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/asamanta-09/learntoknow.git
   cd learntoknow
   ```

2. **Install dependencies**
   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Environment Setup**

   Create `.env` file in the server directory:
   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string

   # JWT Secrets
   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret

   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret

   # Email (Nodemailer)
   MAIL_USER=your_email
   MAIL_PASS=your_email_password

   # Server
   PORT=8000
   ```

   Create `.env` file in the client directory:
   ```env
   VITE_BACKEND_URL=backend_url
   ```

4. **Run the application**
   ```bash
   # Start the server (from server directory)
   npm run dev

   # Start the client (from client directory)
   npm run dev or npm start
   ```

5. **Access the application**
   - Frontend: https://ltk.vercel.app
   - Backend: https://learn-to-know-backend.vercel.app

## 📁 Project Structure

```
learntoknow/
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Admin/     # Admin-specific components
│   │   │   ├── Student/   # Student-specific components
│   │   │   ├── Teacher/   # Teacher-specific components
│   │   │   └── Front-Page/ # Landing page components
│   │   ├── api/          # API configuration
│   │   └── main.jsx      # Application entry point
│   └── package.json
├── server/                # Backend Node.js application
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   ├── middlewares/  # Custom middlewares
│   │   ├── utils/        # Utility functions
│   │   └── index.js      # Server entry point
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /student/login` - Student login
- `POST /student/signUp` - Student registration
- `POST /teacher/login` - Teacher login
- `POST /teacher/signUp` - Teacher registration
- `POST /admin/login` - Admin login

### Courses
- `POST /course/createCourse` - Create new course (Teacher)
- `GET /course/getOnlineCourses` - Get online courses (Student)
- `GET /course/getOfflineCourses` - Get offline courses (Student)
- `GET /course/getOnlineCoursesByTeacher` - Get teacher's online courses
- `GET /course/getOfflineCoursesByTeacher` - Get teacher's offline courses

### Content Management
- `POST /notes/create` - Upload study materials (Admin)
- `GET /notes/view` - Get study materials (Student)
- `POST /playlist/create` - Upload reference videos (Admin)
- `GET /playlist/view` - Get reference videos (Student)

## 🎨 Key Features Implementation

### Responsive Design
- Responsive navigation with hamburger menu
- Adaptive layouts for all screen sizes

### File Management
- Cloudinary integration for image and file storage
- Support for PDF uploads for study materials
- Image thumbnails for courses and content

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Vercel)
1. Configure Vercel for Node.js deployment
2. Set environment variables
3. Deploy API routes

### Database
- Use MongoDB Atlas for cloud database
- Configure connection string in environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👥 Author

- **Ankan** - - [asamanta-09](https://github.com/asamanta-09)

## 📞 Support

For support, email learntoknow.co@gmail.com or create an issue in this repository.

---

<div align="center">
  <p>Made with ❤️ for the education community</p>
  <p>Learning is a journey, not a destination</p>
</div>
