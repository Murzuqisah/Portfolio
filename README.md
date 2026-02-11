# Portfolio

This is a personal web portfolio that showcases my background, projects, resume, and contact information. Built with Node.js, HTML/CSS, and JavaScript with custom middleware and Vercel deployment.

---

## Live Demo

[Joel Adero](https://https://joel-amos.vercel.app/)

---

## Project Structure

```
.
├── config/
│   └── env.js                  # Environment variables and config setup
├── middleware/                 # Custom middleware for auth, error handling, rate limiting
│   ├── auth.js
│   ├── errorHandlers.js
│   ├── rateLimiter.js
│   └── security.js
├── public/
│   ├── css/
│   │   ├── error.css
│   │   ├── global.css
│   │   ├── mobile-style.css
│   │   └── style.css
│   ├── images/                 # Image assets
│   ├── JS/                     # Client-side JS scripts
│   │   ├── contact-form.js
│   │   ├── cv-download.js
│   │   ├── index-time.js
│   │   └── script.js
│   ├── views/
│   │   ├── 404.html
│   │   ├── 500.html
│   │   └── index.html
│   └── Joel_Adero_CV.pdf       # Resume file
├── routes/                     # Application routes
├── index.js                    # Entry point
├── .gitignore
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
└── vercel.json                 # Vercel deployment config
```

---

## Features

- Downloadable PDF Resume
- Responsive layout with mobile styles
- Contact form functionality
- Custom 404 and 500 error pages
- Middleware for auth, rate limiting & security
- Deployed on Vercel

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Murzuqisah/portfolio.git
cd portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Locally

```bash
npm start
```

The site should be available at `http://localhost:3000`.

---

## Environment Variables

Create a `.env` file or update `config/env.js` with necessary configuration values such as email service credentials if needed.

---

## Contact

- **Email**: <amosjoel91@gmail.com>
- **LinkedIn**: [linkedin.com/in/joeladero](https://linkedin.com/in/joeladero)
- **GitHub**: [github.com/Murzuqisah](https://github.com/Murzuqisah)

---

## License

This project is open-sourced under the MIT License.
