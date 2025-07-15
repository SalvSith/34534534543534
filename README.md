# Gerald of Rivendell - Figma Card Component

A beautiful React card component built with TypeScript, Vite, and Tailwind CSS. This project recreates a sophisticated card UI design featuring a character modal with interactive elements and rich typography.

## ✨ Features

- **Modern React + TypeScript** - Built with latest React 18 and TypeScript for type safety
- **Vite Build System** - Fast development and optimized production builds
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Custom Typography** - HvD Trial Brandon Grotesque font family
- **Responsive Design** - Works across different screen sizes
- **Interactive Components** - Modal interface with tabs, search, and card grid
- **Lucide Icons** - Beautiful, consistent icon system

## 🎨 Design

This component showcases:
- Character information display with rich text formatting
- Image galleries with card layouts
- Interactive tabs (All, Text, Image, Audio, Video)
- Search functionality
- Attachment and save capabilities
- Custom styled buttons and form elements

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd TestInfinite
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
  components/
    CardComboModal.tsx    # Main card component
  App.tsx                 # Root component
  main.tsx                # Entry point
  index.css               # Global styles and fonts
public/
  fonts/                  # Custom font files
  *.svg                   # Icon assets
```

## 🎯 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will automatically detect Vite and deploy
4. Your app will be live with automatic deployments on every push

### Manual Deploy

1. Build the project: `npm run build`
2. Deploy the `dist/` folder to your hosting service

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Customization

The component uses Tailwind CSS for styling. You can customize:

- **Colors**: Modify the color palette in `tailwind.config.js`
- **Typography**: Update font families and weights
- **Layout**: Adjust component spacing and sizing
- **Content**: Modify the character data and card content

## 📝 License

This project is for educational and portfolio purposes.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

Built with ❤️ using React, TypeScript, and Tailwind CSS 