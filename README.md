# Favian Rafif N - Portfolio Website

Portfolio website modern dan responsif yang dibangun dengan HTML, CSS, dan JavaScript dengan backend Node.js.

## 🌐 Live Demo
[https://username.github.io/portfolio](https://username.github.io/portfolio)

## ✨ Features
- **Modern Design** dengan animasi yang smooth
- **Responsive** untuk semua ukuran layar
- **Contact Form** yang benar-benar mengirim email
- **Project Gallery** dengan filter kategori
- **Skills Section** dengan progress bar animasi
- **Backend API** dengan Express.js

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3 dengan CSS Variables
- JavaScript (ES6+)
- Font Awesome Icons

### Backend
- Node.js
- Express.js
- Nodemailer (Email Service)
- CORS & Security Headers

## 📁 Project Structure
```
portfolio/
├── index.html          # Main frontend
├── styles.css          # Styling
├── script.js          # JavaScript logic
├── package.json       # Backend dependencies
├── server.js          # Express API server
└── .env              # Environment variables
```

## 🚀 Cara Menjalankan

### Frontend (Static)
1. Clone repository
2. Buka `index.html` di browser

### Backend (API)
1. Install dependencies:
   ```bash
   npm install
   ```

2. Setup environment variables:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

3. Jalankan server:
   ```bash
   npm start
   ```

4. API available di: `http://localhost:3000`

## 📧 API Endpoints

### Get Projects
- `GET /api/projects` - Semua projects
- `GET /api/projects/:category` - Filter by category

### Get Skills
- `GET /api/skills` - Semua skills data

### Contact Form
- `POST /api/contact` - Kirim pesan email

## 🌍 Deployment

### Frontend (GitHub Pages)
1. Push ke GitHub
2. Aktifkan GitHub Pages di Settings
3. Website live di: `https://username.github.io/portfolio`

### Backend (Vercel/Railway)
1. Push backend files ke GitHub
2. Connect ke Vercel/Railway
3. Setup environment variables
4. Deploy!

## 📧 Email Setup

Untuk contact form berfungsi:
1. Buat App Password Gmail
2. Masukkan di `.env` file
3. Update `EMAIL_USER` dan `EMAIL_PASS`

## 🤝 Kontribusi
Welcome untuk fork dan pull request!

## 📄 License
MIT License - feel free to use untuk project Anda!

---

**Made with ❤️ by Favian Rafif N**
