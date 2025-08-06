# Solo Business Cards - Development Stack Documentation

## Project Overview
**Project Name:** Solo Business Cards  
**Type:** Digital Business Card Platform  
**Version:** 0.0.0  
**Repository:** https://github.com/robuc33/Solo-Biz-Cards-Dev-Repo-4.git

## Core Framework & Runtime

### Frontend Framework
- **Next.js 15.4.5** - React-based full-stack framework
  - App Router architecture (using `app/` directory)
  - Server-side rendering (SSR) and static site generation (SSG)
  - API routes for backend functionality
  - Built-in optimization for images, fonts, and scripts

### JavaScript Runtime
- **React 19.1.1** - Latest React with concurrent features
- **React DOM 19.1.1** - DOM rendering library
- **TypeScript 5.5.3** - Static type checking

## Styling & UI Framework

### CSS Framework
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
  - Custom color scheme with Solo brand colors
  - Dark mode support via class strategy
  - Custom animations and keyframes
  - Responsive design utilities

### UI Component Library
- **Radix UI** - Comprehensive headless UI component library
  - Accordion, Alert Dialog, Avatar, Checkbox
  - Context Menu, Dialog, Dropdown Menu
  - Navigation Menu, Popover, Select, Tabs
  - Toast notifications, Tooltips, and more
  - All components are accessible and customizable

### Component System
- **shadcn/ui** - Pre-built component system
  - Built on top of Radix UI primitives
  - Customizable with Tailwind CSS
  - Copy-paste component architecture
  - Located in `components/ui/` directory

## State Management & Data Fetching

### Data Fetching
- **TanStack Query (React Query) 5.56.2** - Server state management
  - Caching, synchronization, and background updates
  - Optimistic updates and error handling

### Form Management
- **React Hook Form 7.53.0** - Performant form library
- **Hookform Resolvers 3.9.0** - Validation resolvers
- **Zod 3.23.8** - TypeScript-first schema validation

## Utility Libraries

### Date & Time
- **date-fns 3.6.0** - Modern date utility library

### Styling Utilities
- **clsx 2.1.1** - Conditional className utility
- **tailwind-merge 2.5.2** - Merge Tailwind classes intelligently
- **class-variance-authority 0.7.1** - Component variant management

### Icons & Graphics
- **Lucide React 0.462.0** - Beautiful icon library
- **QR Code Libraries:**
  - **qrcode 1.5.4** - QR code generation
  - **qrcode.react 4.2.0** - React QR code components

### Maps & Geolocation
- **Leaflet 1.9.4** - Interactive maps library
- **@types/leaflet 1.9.20** - TypeScript definitions

### UI Enhancements
- **Embla Carousel React 8.3.0** - Carousel/slider component
- **html2canvas 1.4.1** - Screenshot generation
- **input-otp 1.2.4** - OTP input component
- **react-day-picker 8.10.1** - Date picker component
- **react-resizable-panels 2.1.3** - Resizable panel layouts
- **Recharts 2.12.7** - Chart and data visualization
- **Sonner 1.5.0** - Toast notification system
- **Vaul 0.9.3** - Drawer component for mobile

### Command Interface
- **cmdk 1.0.0** - Command menu component

## Development Tools

### TypeScript Configuration
- **Strict mode:** Partially enabled
- **Target:** ES2017
- **Module Resolution:** Bundler
- **JSX:** Preserve (handled by Next.js)
- **Path Mapping:** `@/*` for root directory access

### Code Quality
- **ESLint 8.57.0** - JavaScript/TypeScript linting
- **@next/eslint-plugin-next 14.0.0** - Next.js specific rules
- **eslint-config-next 14.0.0** - Next.js ESLint configuration

### CSS Processing
- **PostCSS 8.5.6** - CSS transformation tool
- **Autoprefixer 10.4.21** - Automatic vendor prefixing
- **@tailwindcss/typography 0.5.15** - Typography plugin

### Build Tools
- **Next.js built-in bundler** (based on Webpack)
- **SWC** - Fast TypeScript/JavaScript compiler (built into Next.js)

## Project Structure

```
├── app/                          # Next.js App Router pages
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── card/[cardId]/           # Dynamic card routes
│   ├── dashboard/               # Dashboard pages
│   ├── members/                 # Member pages
│   ├── new-onboarding/          # Onboarding flow
│   ├── opportunities/           # Opportunities page
│   ├── pricing/                 # Pricing page
│   └── test/                    # Test pages
├── components/                   # Reusable components
│   ├── ui/                      # shadcn/ui components
│   ├── dashboard/               # Dashboard-specific components
│   ├── landing/                 # Landing page components
│   ├── onboarding/              # Onboarding components
│   └── card-display/            # Card display components
├── hooks/                       # Custom React hooks
├── lib/                         # Utility functions
├── types/                       # TypeScript type definitions
├── utils/                       # Helper utilities
├── public/                      # Static assets
└── src/                         # Additional source files
```

## Configuration Files

### Next.js Configuration (`next.config.js`)
- Image optimization settings
- TypeScript error handling
- ESLint integration
- Custom domains for localhost

### Tailwind Configuration (`tailwind.config.ts`)
- Custom color palette with Solo branding
- Dark mode support
- Custom animations and keyframes
- Responsive breakpoints
- Component-specific styling

### TypeScript Configuration (`tsconfig.json`)
- Modern ES features support
- Path mapping for clean imports
- Strict null checks enabled
- Next.js plugin integration

## Development Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run type-check # TypeScript type checking
```

## Development Server

- **Local URL:** http://localhost:3000
- **Network URL:** http://10.5.0.2:3000
- **Hot Reload:** Enabled
- **Fast Refresh:** Enabled for React components

## Key Features Supported

1. **Digital Business Cards** - Create and manage digital business cards
2. **QR Code Generation** - Generate QR codes for card sharing
3. **Dashboard** - User dashboard with analytics and management
4. **Responsive Design** - Mobile-first responsive layout
5. **Dark Mode** - Theme switching capability
6. **Maps Integration** - Location-based features
7. **Charts & Analytics** - Data visualization
8. **Form Handling** - Advanced form management with validation
9. **Image Processing** - Screenshot and image manipulation
10. **Accessibility** - WCAG compliant components

## Browser Support

- Modern browsers supporting ES2017+
- Mobile browsers (iOS Safari, Chrome Mobile)
- Desktop browsers (Chrome, Firefox, Safari, Edge)

## Performance Optimizations

- **Next.js Image Optimization** - Automatic image optimization
- **Code Splitting** - Automatic code splitting by Next.js
- **Tree Shaking** - Dead code elimination
- **Bundle Analysis** - Built-in bundle analyzer
- **Caching** - React Query for server state caching
- **Static Generation** - Pre-rendered pages where possible

## Security Features

- **TypeScript** - Type safety to prevent runtime errors
- **ESLint** - Code quality and security linting
- **Next.js Security Headers** - Built-in security headers
- **Input Validation** - Zod schema validation

## Maintenance & Updates

**⚠️ IMPORTANT:** This documentation should be updated whenever the codebase is modified, including:
- Adding or removing dependencies in `package.json`
- Updating configuration files (`next.config.js`, `tailwind.config.ts`, `tsconfig.json`, etc.)
- Adding new major features or architectural changes
- Updating framework versions or development tools
- Changes to project structure or build processes

### Update Checklist
When making changes to the codebase, ensure to:
- [ ] Update dependency versions in the relevant sections
- [ ] Document new features or capabilities
- [ ] Update configuration details if modified
- [ ] Refresh the "Last Updated" timestamp
- [ ] Verify development server status

### Automation Suggestions
Consider implementing:
- Git hooks to remind developers to update this documentation
- Automated dependency scanning to detect version changes
- CI/CD pipeline checks to ensure documentation stays current

---

*Last Updated: January 6, 2025*
*Development Server Status: ✅ Running on http://localhost:3000*
*Next Update Required: When any dependencies or configurations change*
