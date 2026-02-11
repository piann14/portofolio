# Favian Rafif N - Portfolio Website

Portfolio website pribadi yang modern dan responsive dibangun dengan HTML, CSS, dan JavaScript.

## 🚀 Live Demo
Portfolio Anda sudah dihosting di: **https://[username].github.io/[repository-name]/**

## 📝 Cara Update Portfolio

### 1. **Lakukan Perubahan**
- Edit file `index.html`, `styles.css`, atau `script.js`
- Tambahkan gambar baru di folder `foto projects`
- Update informasi kontak, email, atau nomor telepon

### 2. **Commit ke GitHub**
```bash
# Tambahkan semua perubahan
git add .

# Commit dengan pesan yang jelas
git commit -m "Update portfolio: [deskripsi perubahan]"

# Push ke GitHub
git push origin main
```

### 3. **Auto Deploy**
- GitHub Actions akan otomatis deploy perubahan Anda
- Website akan update dalam 1-2 menit
- Check live demo untuk melihat hasil

## 🛠️ Struktur Project
```
Portofolio/
├── index.html          # Halaman utama
├── styles.css          # Styling dan animasi
├── script.js           # Interaktivitas JavaScript
├── pp.jpeg            # Foto profil
├── foto projects/      # Gambar-gambar project
└── .github/
    └── workflows/
        └── deploy.yml  # Auto deployment
```

## 🎯 Fitur Portfolio
- ✅ Design modern dengan animasi yang smooth
- ✅ Fully responsive untuk semua device
- ✅ Hero section dengan foto profil
- ✅ Skills section dengan filter
- ✅ Project showcase dengan gambar
- ✅ Contact form yang functional
- ✅ Social media integration
- ✅ Auto deployment ke GitHub Pages

## 📱 Cara Test Lokal
```bash
# Buka file di browser
# Double klik index.html atau drag ke browser
```

## 🔧 Quick Update Commands
```bash
# Update nomor telepon
# Edit di index.html line 416 dan 484

# Update email
# Edit di index.html line 119, 463, dan 480

# Update Instagram
# Edit di index.html line 76

# Update foto profil
# Ganti file pp.jpeg
```

## 🌐 GitHub Pages Settings
1. Go to repository Settings
2. Scroll ke "GitHub Pages"
3. Source: "Deploy from a branch"
4. Branch: "main"
5. Folder: "/ (root)"
6. Save

Portfolio Anda akan otomatis update setiap kali push ke main branch! 🚀

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
