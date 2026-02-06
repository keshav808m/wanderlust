# Wanderlust

A modern hotel listing web application built with Node.js, Express, MongoDB, and EJS. Browse, list, and book hotels with ease.

**Live Demo:** https://wanderlust-j8du.onrender.com/listings

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

- **User Authentication** - Secure login/signup with Passport.js
- **Hotel Listings** - Browse and search hotel listings
- **Create & Manage Listings** - Add, edit, and delete hotel listings
- **Image Upload** - Upload and manage hotel images via Cloudinary
- **Session Management** - Persistent user sessions with express-session
- **Validation** - Server-side validation with Joi schema validation
- **Flash Messages** - User-friendly feedback messages
- **Responsive Design** - Works on desktop and mobile devices

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | EJS, CSS, JavaScript |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Authentication** | Passport.js, Passport-Local |
| **File Upload** | Cloudinary, Multer |
| **Session Management** | Express-session, Connect-Mongo |
| **Validation** | Joi |
| **Other** | Axios, Dotenv, Cookie-Parser |

---

## 📦 Installation

### Prerequisites
- Node.js 22.18.0 or higher
- MongoDB (local or MongoDB Atlas)
- Cloudinary account (for image uploads)

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/keshav808m/wanderlust.git
cd wanderlust
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file in the root directory with the following:
```env
MONGODB_URL=your_mongodb_connection_string
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
SESSION_SECRET=your_session_secret
```

4. **Run the application**
```bash
node app.js
```

5. **Open in browser**
Navigate to `http://localhost:3000/listings` (or your configured port)

---

## 📁 Project Structure

```
wanderlust/
├── app.js                    # Main application file
├── package.json              # Project dependencies
├── cloudConfig.js            # Cloudinary configuration
├── middleware.js             # Custom middleware
├── schema.js                 # Joi validation schemas
├── controler/                # Controller logic
├── models/                   # MongoDB schemas/models
├── routes/                   # API routes
├── views/                    # EJS templates
├── public/                   # Static assets (CSS, JS, images)
├── utils/                    # Utility functions
├── init/                     # Database initialization
└── .gitignore               # Git ignore rules
```

---

## 🚀 Usage

1. **Browse Hotels** - Visit the homepage to see all available hotel listings
2. **Create Listing** - Log in and create a new hotel listing
3. **Edit/Delete** - Manage your listings (edit or delete as needed)
4. **Upload Images** - Add beautiful images to your listings via Cloudinary
5. **User Authentication** - Sign up and log in securely

---

## 📚 Dependencies

Key dependencies used in this project:

- **express** (^5.1.0) - Web framework
- **mongoose** (^8.18.1) - MongoDB ODM
- **ejs** (^3.1.10) - Templating engine
- **passport** (^0.7.0) - Authentication middleware
- **cloudinary** (^1.41.3) - Image management
- **joi** (^18.0.1) - Schema validation
- **multer** (^2.0.2) - File upload handling

For a complete list, see [package.json](./package.json)

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Keshav** - [GitHub Profile](https://github.com/keshav808m)

---

## 🙏 Acknowledgments

- Built as a learning project for full-stack web development
- Special thanks to the open-source community

Feel free to reach out with any questions or suggestions!
