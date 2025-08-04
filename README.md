# 🌟 Digital Business Card Platform

A modern, feature-rich platform for creating and managing digital business cards with analytics, sharing capabilities, and monetization features.

## ✨ Features

### 🎨 Card Creation & Design
- **Drag-and-drop card builder** with intuitive interface
- **Multiple templates and layouts** for different industries
- **Custom branding** with color schemes and logo uploads
- **QR code generation** for instant sharing
- **Mobile-responsive design** that looks great on all devices
- **Real-time preview** during editing

### 📊 Analytics & Tracking
- **View tracking** and detailed analytics
- **Lead generation** with contact forms
- **Performance metrics** and engagement insights
- **Revenue tracking** and commission reporting
- **Contact management** with export functionality

### 🔗 Sharing & Integration
- **Multiple sharing methods** (QR code, link, email)
- **Email signature generation** with customizable layouts
- **Social media integration** (LinkedIn, Twitter, Instagram, etc.)
- **Custom domains** for professional branding
- **API access** for advanced integrations

### 💰 Monetization
- **Referral program** with multi-level commissions
- **Pro feature upgrades** with advanced capabilities
- **Accessories marketplace** for physical products
- **White-label solutions** for businesses

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Routing**: React Router v6
- **State Management**: TanStack Query
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **QR Codes**: QRCode.js
- **Icons**: Lucide React
- **Animations**: Tailwind CSS + CSS animations

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, or bun package manager

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun dev
```

### Environment Setup
The application runs entirely on the frontend with local storage for data persistence. No backend configuration required for basic functionality.

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui base components
│   ├── landing/         # Landing page components
│   ├── dashboard/       # Dashboard-specific components
│   ├── onboarding/      # Card creation wizard
│   └── card-display/    # Public card viewing
├── pages/               # Route components
│   ├── dashboard/       # Dashboard pages
│   └── [other-pages]    # Public pages
├── hooks/               # Custom React hooks
├── lib/                 # Utilities and helpers
├── types/               # TypeScript type definitions
├── utils/               # Business logic utilities
└── styles/              # Global styles and CSS
```

## 🎯 Key Pages & Routes

### Public Routes
- `/` - Landing page with features and pricing
- `/onboarding` - Card creation wizard
- `/pricing` - Pricing plans and features
- `/members` - Public member directory
- `/card/:cardId` - Public card display

### Dashboard Routes
- `/dashboard` - Main dashboard with analytics
- `/dashboard/cards` - Card management
- `/dashboard/cards/:id` - Card details and editing
- `/dashboard/settings` - User preferences
- `/dashboard/contacts` - Lead management
- `/dashboard/referrals` - Referral tracking
- `/dashboard/systems` - Admin panel

## 🎨 Design System

The application uses a comprehensive design system built on:
- **Semantic color tokens** defined in `index.css`
- **Component variants** using class-variance-authority
- **Responsive design** with mobile-first approach
- **Dark/light mode** support
- **Consistent spacing** and typography scales

## 📱 Features Overview

### For End Users
1. **Quick Card Creation** - 3-minute setup process
2. **Professional Templates** - Industry-specific designs
3. **Easy Sharing** - QR codes, links, and social integration
4. **Contact Management** - Track leads and interactions
5. **Performance Analytics** - View counts and engagement metrics

### For Business Owners
1. **White-label Solutions** - Custom branding options
2. **Referral Programs** - Monetize user referrals
3. **Advanced Analytics** - Revenue and performance tracking
4. **API Integration** - Connect with existing systems
5. **Custom Domains** - Professional web presence

## 🔧 Development Guidelines

### Code Style
- Use TypeScript for all new components
- Follow React functional component patterns
- Implement proper error boundaries
- Use semantic HTML and ARIA attributes
- Maintain component modularity and reusability

### State Management
- Use TanStack Query for server state
- Local state with useState/useReducer
- Context for theme and global settings
- Local storage for user preferences

### Styling
- Use Tailwind utility classes
- Leverage design system tokens
- Create component variants for reusability
- Ensure responsive design across all components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🚀 Deployment

**Using Lovable (Recommended)**

Simply open [Lovable](https://lovable.dev/projects/2b319606-231f-4cde-acb8-36f735cec2fb) and click on Share → Publish.

**Manual Deployment**

The application can be deployed to any static hosting service:
- Vercel (recommended)
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

Build command: `npm run build` or `bun run build`
Output directory: `dist/`

## 🌐 Custom Domain

You can connect a custom domain by navigating to Project > Settings > Domains and clicking Connect Domain.

Read more: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@yourdomain.com or join our Discord community.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
