# ClearAudio

A modern, fast, and responsive YouTube-to-MP3 converter built with React and Vite. ClearAudio provides a clean user experience for converting supported YouTube content into MP3 audio.

> **Responsible use:** Only download or convert content that you have the legal right or permission to use.

---

## ✨ Features

- 🎵 Convert supported YouTube videos to MP3
- ⚡ Fast conversion workflow
- 🎚️ Multiple audio quality options:
  - 128 kbps — Small
  - 192 kbps — Balanced
  - 256 kbps — High
  - 320 kbps — Maximum
- 📋 One-click clipboard paste
- 🌓 Dark and light theme support
- 📱 Fully responsive design
- 🔒 Rights/permission confirmation before conversion
- ✅ Clear success and error states
- 🔄 Convert another video without refreshing the page
- 🎨 Modern YouTube-inspired visual style
- 📄 Dedicated informational pages
- 🚀 Vite-powered development and production builds

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend UI |
| Vite | Development and build tooling |
| JavaScript | Application logic |
| Axios | API requests |
| Lucide React | Icons |
| CSS | Responsive styling and themes |
| RapidAPI | YouTube conversion API |

---

## 📂 Project Structure

```text
clearaudio/
├── public/
│   ├── favicon.png
│   ├── robots.txt
│   └── sitemap.xml
│
├── src/
│   ├── components/
│   │   ├── ConverterCard.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── FAQOverview.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── LegalOverview.jsx
│   │   └── SupportedFormats.jsx
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .env
├── .gitignore
├── index.html
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the project

```bash
cd clearaudio
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create your environment file

Create a `.env` file in the project root:

```env
VITE_RAPIDAPI_KEY=your_rapidapi_key_here
```

Never commit your real API key to GitHub.

### 5. Start the development server

```bash
npm run dev
```

Vite will provide a local development URL, normally:

```text
http://localhost:5173
```

---

## 🔑 API Configuration

ClearAudio uses a RapidAPI YouTube conversion service.

The frontend reads the API key from:

```env
VITE_RAPIDAPI_KEY
```

Make sure the required RapidAPI subscription/API access is configured for the service used by the project.

For security, keep secrets out of source code and do not upload `.env` to GitHub.

---

## 🎧 Audio Quality

ClearAudio provides four quality choices:

| Quality | Description |
|---|---|
| 128 kbps | Smaller file size |
| 192 kbps | Balanced quality and size |
| 256 kbps | Higher audio quality |
| 320 kbps | Maximum available quality |

Higher bitrate generally produces a larger file.

---

## 🔄 Conversion Flow

The application follows a simple conversion process:

```text
Paste YouTube URL
        ↓
Confirm usage rights
        ↓
Select audio quality
        ↓
Click "Convert to MP3"
        ↓
API processes the request
        ↓
Conversion completed
        ↓
Download MP3
```

---

## 📱 Responsive Design

ClearAudio is designed to work across:

- Desktop
- Laptop
- Tablet
- Mobile phones

The interface adapts navigation, spacing, cards, forms, tables, and content sections for smaller screens.

---

## 🌓 Theme System

ClearAudio supports both:

- Dark mode
- Light mode

The visual system uses a consistent set of CSS variables for:

- Page background
- Cards
- Navigation
- Text
- Borders
- Inputs
- Buttons
- Accent colors
- Shadows
- Theme-specific surfaces

The primary visual direction is inspired by the modern YouTube aesthetic while maintaining its own ClearAudio identity.

---

## 📄 Pages

ClearAudio includes the following main sections/pages:

### Home

The main YouTube-to-MP3 converter interface.

### How It Works

Explains the basic conversion workflow and how users can use the converter.

### Supported Formats

Provides information about supported YouTube links and conversion formats.

### FAQ

Answers common questions about the service and conversion process.

### Legal

Provides responsible-use and rights-related information.

---

## 🧩 Main Components

### `ConverterCard.jsx`

Handles:

- YouTube URL input
- Clipboard paste
- Audio quality selection
- Rights confirmation
- Conversion state
- Error messages
- Download action
- Reset/conversion-again flow

### `Header.jsx`

Provides:

- Brand/navigation
- Page navigation
- Theme controls
- Responsive mobile navigation

### `Footer.jsx`

Provides:

- Site navigation
- Supporting information
- Footer links

### `HowItWorks.jsx`

Displays the conversion steps and user guidance.

### `SupportedFormats.jsx`

Explains supported links and formats.

### `FAQOverview.jsx`

Displays frequently asked questions.

### `LegalOverview.jsx`

Displays responsible-use and legal guidance.

---

## 📦 Available Scripts

Run these commands from the project directory:

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Creates the production build.

```bash
npm run preview
```

Previews the production build locally.

---

## 🏗️ Production Build

Before deployment, create a production build:

```bash
npm run build
```

The generated production files will be placed in:

```text
dist/
```

For deployment platforms such as Netlify or Vercel, configure the required environment variable:

```text
VITE_RAPIDAPI_KEY
```

---

## 🔐 Security Notes

- Never publish your RapidAPI key in GitHub.
- Store API credentials in environment variables.
- Keep `.env` in `.gitignore`.
- Do not expose private credentials in frontend source code.
- Only process content that users are legally authorized to download or convert.

> **Important:** Vite environment variables beginning with `VITE_` are exposed to client-side code. For a production application handling sensitive credentials, consider routing API requests through a secure backend/serverless function.

---

## ⚖️ Responsible Use

ClearAudio is intended for legitimate and authorized use.

Users are responsible for ensuring that they have the necessary rights, licenses, or permissions before downloading or converting content.

Do not use the application to infringe copyright, violate platform terms, or download content without authorization.

---

## 🌐 SEO

The project includes SEO-oriented configuration such as:

- Descriptive page title
- Meta description
- Canonical URL
- Robots configuration
- Sitemap configuration
- Open Graph-ready metadata
- Structured data support

Before production deployment, replace placeholder domain values with the real deployed domain.

---

## 🎯 Project Goals

ClearAudio was designed to demonstrate practical frontend development skills through a real-world application.

The project focuses on:

- React component architecture
- State management
- API integration
- Responsive UI development
- Theme management
- Form validation
- Error handling
- User experience
- Accessibility-conscious UI patterns
- SEO fundamentals
- Production deployment preparation

---

## 🔮 Future Improvements

Potential future enhancements include:

- Backend/serverless API proxy
- Download history
- Batch conversion
- More audio formats
- Additional metadata handling
- Progress indicators
- Improved API error reporting
- Rate limiting
- Analytics
- Advanced SEO pages
- Automated testing
- Improved accessibility
- Internationalization

---

## 📸 Screenshots

Add screenshots of the application here after deployment.

Example:

```text
screenshots/
├── home-dark.png
├── home-light.png
├── conversion-success.png
└── mobile-view.png
```

---

## 🤝 Contributing

Contributions and suggestions are welcome.

To contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Test the project locally.
5. Commit your changes.
6. Open a pull request.

Example:

```bash
git checkout -b feature/new-feature
git add .
git commit -m "Add new feature"
git push origin feature/new-feature
```

---

## 📄 License

Add your preferred license here, for example:

```text
MIT License
```

If you choose a different license, replace this section with the appropriate license information.

---

## 👨‍💻 Developer

**Muhammad Hashim**

Full-Stack Web Developer | React Developer | JavaScript | AI Enthusiast

This project was created as a practical real-world web development project focused on building a polished, responsive, and production-ready user experience.

---

## ⭐ Support

If you find ClearAudio useful or helpful for learning, feel free to:

- ⭐ Star the repository
- 🍴 Fork the project
- 🐛 Report issues
- 💡 Suggest improvements
- 🤝 Contribute to the project

---

## 📌 Disclaimer

ClearAudio is a software project intended for educational and legitimate use.

The developer does not encourage copyright infringement or unauthorized downloading of protected content. Users are solely responsible for how they use the application and for complying with applicable laws, licenses, and platform policies.

---

**Built with ❤️ using React + Vite**
