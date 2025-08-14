# Website Portfolio

A modern portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.?

## Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **GSAP** for animations
- **Headless UI** and **Heroicons** for components
- **SWR** for data fetching
- **Google APIs** integration ready

## Project Structure

```
src/
├── app/          # Next.js 14 App Router pages
├── components/   # Reusable React components
├── lib/          # Utility functions and helpers
├── types/        # TypeScript type definitions
├── styles/       # Additional CSS files
└── pages/api/    # API routes
```

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser.

## GitHub Setup

To push to GitHub:

1. Create a new repository on GitHub named `website-portfolio`
2. Add the remote origin:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/website-portfolio.git
   ```
3. Push to GitHub:
   ```bash
   git push -u origin main
   ```

## Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Enable automatic deployments on the `main` branch
3. Your app will be automatically deployed on every push to main

## Dependencies

### Core

- Next.js 14 with TypeScript
- React 18
- Tailwind CSS

### UI & Animation

- GSAP for animations
- Headless UI for accessible components
- Heroicons for icons
- clsx for conditional styling

### Data & API

- SWR for data fetching
- Google APIs
- dotenv for environment variables
