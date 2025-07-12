# 🚀 SkillSeekho

SkillSeekho is a collaborative skill-exchange platform where users can connect with others to teach and learn new skills. Whether you're a coder, artist, designer, or language enthusiast, SkillSeekho empowers you to grow with peers through direct, one-on-one learning experiences.

---

## 🧭 Table of Contents

* [🌐 Live Demo](#-live-demo)
* [📸 Screenshots](#-screenshots)
* [🛠️ Tech Stack](#️-tech-stack)
* [✨ Features](#-features)
* [📦 Getting Started](#-getting-started)
* [📁 Folder Structure](#-folder-structure)
* [🧭 Roadmap](#-roadmap)
* [🤝 Contributing](#-contributing)
* [📄 License](#-license)
* [🙌 Acknowledgements](#-acknowledgements)

---

## 🌐 Live Demo

🔗 [Visit SkillSeekho](https://skillswap-seven.vercel.app/)

---

## 📸 Screenshots

> *Coming soon: UI previews, flow diagrams, and mobile views.*

---

## 🛠️ Tech Stack

### Frontend

* ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge\&logo=html5\&logoColor=white)
* ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge\&logo=css3\&logoColor=white)
* ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)
* ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)
* ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge\&logo=nextdotjs\&logoColor=white)
* ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge\&logo=tailwindcss\&logoColor=white)
* ![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge\&logo=bootstrap\&logoColor=white)

### Backend

* ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=nodedotjs\&logoColor=white)
* ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge\&logo=express\&logoColor=white)

### Database

* ![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge\&logo=mysql\&logoColor=white)

### Deployment & Version Control

* ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge\&logo=vercel\&logoColor=white)
* ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge\&logo=netlify\&logoColor=white)
* ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge\&logo=git\&logoColor=white)
* ![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge\&logo=github\&logoColor=white)

---

## ✨ Features

* 🧠 Post and discover skills (teach/learn)
* 🔍 Advanced filtering to find relevant users
* 🔁 Skill swap request and approval system
* 📱 Fully responsive and mobile-friendly
* 🧾 Public user profiles with skill tags
* 💬 Post-session feedback system
* 🔒 Secure and structured backend using Express.js

---

## 📦 Getting Started

### Prerequisites

* Node.js and npm
* MySQL server (local or cloud)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/skillseekho.git

# Navigate into the project
cd skillseekho

# Install dependencies
npm install

# Run the development server
npm run dev
```

> ⚠️ Don’t forget to configure your `.env` file with DB credentials and any required API keys.

---

## 📁 Folder Structure

```
skillseekho/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── styles/
├── server/          # Express backend
├── .env
└── README.md
```

---

## 🧭 Roadmap

Here's what's planned and already implemented:

* **Core Swap Feature** — Users can create and browse skill swap listings.
* **Mobile-Responsive UI** — Works smoothly on phones, tablets, and desktops.
* **Skill Filtering** — Search users based on what they offer or want.
* **Real-Time Chat System** — Instant messaging using WebSocket (under development).
* **Calendar Integration** — Schedule availability and manage swap timings.
* **Video Call Integration** — Allow skill sessions directly on the platform.
* **Skill Certification & Reviews** — Community-verified credibility and badges.

---

## 🤝 Contributing

We love community contributions! To get started:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Make changes and commit (`git commit -m 'Add new feature'`)
4. Push the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

You can also raise issues, suggest features, or improve documentation.

---

## 📄 License

Licensed under the **MIT License** — use freely for personal and commercial projects.

---

## 🙌 Acknowledgements

* [Shields.io](https://shields.io/) for badge generation
* [Vercel](https://vercel.com/) & [Netlify](https://netlify.com/) for deployment infrastructure
* [TailwindCSS](https://tailwindcss.com/) and [Bootstrap](https://getbootstrap.com/) for design frameworks
* [Simple Icons](https://simpleicons.org/) for badge icons

---

> Made with 💙 by our team.
=======
# SkillSwap Platform

A platform where users can exchange skills with each other. Users can offer skills they have and request skills they want to learn from others.

## Team: 0325
**Email:** yadavaman8511005211@gmail.com

## Features

- **User Authentication**: Register, login, and manage user profiles
- **Skill Management**: Add, edit, and manage skills you offer or want to learn
- **Skill Swapping**: Request skill exchanges with other users
- **Rating System**: Rate and review other users after skill exchanges
- **Profile Management**: Public/private profiles with ratings and swap history

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MySQL** database
- **JWT** for authentication
- **bcrypt** for password hashing
- **CORS** enabled for frontend communication

### Frontend
- **React** with Vite
- **Axios** for API communication
- **Bootstrap** for styling
- **Context API** for state management

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd SkillSeekho
```

### 2. Database Setup
1. Create a MySQL database named `skillswap`
2. Import the database schema:
```bash
mysql -u root -p skillswap < backend/skillswap.sql
```

### 3. Backend Setup
```bash
cd backend
npm install
```

3. Configure environment variables:
   - Copy `config.env` and update the database credentials:
```env
PORT=8000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=skillswap
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:8000`

### 4. Frontend Setup
```bash
cd frontend
npm install
```

2. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile

### Users
- `GET /api/users` - Get all public users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/:id/skills` - Get user's skills
- `GET /api/users/:id/swaps` - Get user's swap history

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/type/:type` - Get skills by type (offered/wanted)
- `GET /api/skills/my-skills` - Get current user's skills
- `POST /api/skills` - Add new skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill
- `GET /api/skills/search/:query` - Search skills

### Swaps
- `GET /api/swaps/my-swaps` - Get current user's swaps
- `GET /api/swaps/:id` - Get swap by ID
- `POST /api/swaps` - Create new swap request
- `PUT /api/swaps/:id/status` - Update swap status
- `DELETE /api/swaps/:id` - Delete swap
- `GET /api/swaps/pending/requests` - Get pending requests

### Feedback
- `GET /api/feedback/user/:userId` - Get user reviews
- `POST /api/feedback` - Create new review

## Usage

### For Users

1. **Registration**: Create an account with your name, email, and password
2. **Profile Setup**: Add your location and bio to your profile
3. **Add Skills**: 
   - Add skills you can offer to others
   - Add skills you want to learn from others
4. **Browse Skills**: Find other users offering skills you want
5. **Request Swaps**: Send swap requests to other users
6. **Manage Requests**: Accept or reject incoming swap requests
7. **Rate Exchanges**: Leave reviews after completed skill exchanges

### For Developers

The application is structured with:
- **Backend**: RESTful API with proper authentication and authorization
- **Frontend**: React components with context-based state management
- **Database**: MySQL with proper relationships and constraints

## Project Structure

```
SkillSeekho/
├── backend/
│   ├── routes/          # API route handlers
│   ├── server.js        # Main server file
│   ├── config.env       # Environment configuration
│   └── skillswap.sql    # Database schema
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── context/     # React context providers
│   │   ├── services/    # API service functions
│   │   └── App.jsx      # Main app component
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is created for educational purposes.

## Support

For support, email: yadavaman8511005211@gmail.com
>>>>>>> 1f40fbd (Update backend and frontend routes, components, and configs)
