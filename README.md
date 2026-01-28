# CallFlux AI - Frontend

> **Multi-tenant AI calling dashboard for SMBs**

A modern, feature-rich React application for managing AI-powered calling campaigns, agents, and contacts. Built with a focus on premium design aesthetics and seamless user experience.

![CallFlux AI](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0.7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-Private-red?style=for-the-badge)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Key Features](#-key-features)
- [Design System](#-design-system)
- [Components](#-components)
- [Routing](#-routing)
- [Development Guidelines](#-development-guidelines)
- [Contributing](#-contributing)

---

## ✨ Features

### Core Functionality
- 🏢 **Multi-tenant Architecture** - Workspace-based isolation for different organizations
- 🤖 **AI Agent Management** - Create, configure, and deploy AI calling agents
- 📞 **Campaign Management** - Launch and monitor calling campaigns with real-time status
- 📊 **Analytics Dashboard** - Comprehensive metrics and insights
- 💰 **Billing & Credits** - Wallet-based credit system with usage tracking
- 👥 **Contact Management** - Import, organize, and manage contact lists
- 📝 **Call Logs** - Detailed call history with sentiment analysis
- ⚙️ **Settings & Configuration** - Customizable workspace settings

### User Experience
- 🎨 **Premium Dark Mode UI** - Sleek, modern interface with glassmorphism effects
- ✨ **Smooth Animations** - Micro-interactions and transitions throughout
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile
- 🔐 **Authentication Flow** - Secure login, registration, and workspace selection
- 🎯 **Intuitive Navigation** - Clean sidebar navigation with active state indicators

---

## 🛠 Tech Stack

### Core Technologies
- **React 18.3.1** - Modern React with hooks and concurrent features
- **Vite 6.0.7** - Lightning-fast build tool and dev server
- **React Router DOM 6.28.0** - Client-side routing
- **TailwindCSS 3.4.17** - Utility-first CSS framework

### UI Libraries
- **@headlessui/react 2.2.0** - Unstyled, accessible UI components
- **@heroicons/react 2.2.0** - Beautiful hand-crafted SVG icons
- **Recharts 2.15.0** - Composable charting library

### State Management
- **@tanstack/react-query 5.64.0** - Powerful data synchronization and caching

### Development Tools
- **PostCSS** - CSS transformations
- **Autoprefixer** - Automatic vendor prefixing

---

## 📁 Project Structure

```
Call/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Badge.jsx
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Drawer.jsx
│   │   ├── FormField.jsx
│   │   ├── Modal.jsx
│   │   ├── Select.jsx
│   │   ├── StatCard.jsx
│   │   └── Table.jsx
│   ├── context/           # React context providers
│   │   └── AuthContext.jsx
│   ├── features/          # Feature-based modules
│   │   ├── agents/        # AI agent management
│   │   ├── auth/          # Authentication flows
│   │   ├── billing/       # Billing and credits
│   │   ├── calls/         # Call logs and details
│   │   ├── campaigns/     # Campaign management
│   │   ├── contacts/      # Contact management
│   │   ├── dashboard/     # Main dashboard
│   │   └── settings/      # Settings and configuration
│   ├── layouts/           # Layout components
│   │   ├── AppLayout.jsx  # Main app layout with sidebar
│   │   └── AuthLayout.jsx # Authentication layout
│   ├── lib/               # Utilities and helpers
│   │   └── mockData.js    # Mock data for development
│   ├── App.jsx            # Main app component with routes
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles and design tokens
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── vite.config.js         # Vite configuration
└── postcss.config.js      # PostCSS configuration
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** or **pnpm**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Call
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production-ready bundle |
| `npm run preview` | Preview production build locally |

---

## 🎯 Key Features

### 1. Dashboard
- **Real-time Statistics** - Wallet balance, call minutes, total calls, answer rate
- **Active Campaigns** - Quick overview with play/pause controls
- **Top Agents** - Performance leaderboard
- **Recent Calls** - Latest call activity with sentiment analysis

### 2. Agent Management
- Create and configure AI calling agents
- Multi-language support
- Voice selection and customization
- Agent approval workflow
- Performance tracking

### 3. Campaign Management
- Create campaigns with contact lists
- Assign AI agents to campaigns
- Real-time campaign status (Running, Paused, Completed)
- Progress tracking and analytics
- Campaign controls (start, pause, stop)

### 4. Call Logs
- Comprehensive call history
- Sentiment analysis (Positive, Neutral, Negative)
- Call recordings and transcripts
- Duration and status tracking
- Detailed call information drawer

### 5. Contact Management
- Import contacts via CSV
- Manual contact addition
- Contact list organization
- Bulk operations

### 6. Billing System
- Wallet-based credit system
- Usage tracking (minutes, calls)
- Add credits functionality
- Transaction history
- Cost per minute tracking

---

## 🎨 Design System

### Color Palette

#### Primary Colors (Purple)
```css
primary-500: #8b5cf6  /* Main brand color */
primary-600: #7c3aed  /* Hover states */
primary-700: #6d28d9  /* Active states */
```

#### Accent Colors (Pink/Magenta)
```css
accent-500: #d946ef  /* Accent highlights */
accent-600: #c026d3  /* Accent hover */
```

#### Surface Colors (Dark Theme)
```css
surface-950: #030303  /* Background */
surface-900: #09090b  /* Card backgrounds */
surface-800: #18181b  /* Elevated surfaces */
surface-700: #27272a  /* Borders */
surface-500: #71717a  /* Placeholders */
```

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800

### Animations
- **fade-in** - Smooth fade-in effect (0.3s)
- **slide-up** - Slide up with fade (0.3s)
- **slide-in-right** - Slide from right (0.3s)
- **pulse-slow** - Slow pulsing effect (3s)
- **shimmer** - Shimmer loading effect (2s)

### Shadows
- **glow** - Subtle purple glow effect
- **glow-lg** - Large purple glow effect
- **inner-glow** - Inner glow for depth

---

## 🧩 Components

### Core Components

#### `<Badge />`
Versatile badge component with multiple variants
- Variants: `success`, `error`, `warning`, `info`, `gray`, `purple`
- Sizes: `sm`, `md`, `lg`
- Optional dot indicator

#### `<Button />`
Customizable button component
- Variants: `primary`, `secondary`, `outline`, `ghost`, `danger`
- Sizes: `sm`, `md`, `lg`
- Loading state support
- Icon support

#### `<Card />`
Container component with header support
- `<Card>` - Main container
- `<CardHeader>` - Header section
- `<CardTitle>` - Title component

#### `<Modal />`
Full-featured modal dialog
- Backdrop with blur effect
- Smooth animations
- Header and footer sections
- Customizable width

#### `<Drawer />`
Slide-out drawer component
- Right-side slide animation
- Backdrop support
- Header and footer sections
- Customizable width

#### `<FormField />`
Form input component
- Label and error message support
- Multiple input types
- Validation state styling

#### `<Select />`
Custom select dropdown (Headless UI)
- Searchable options
- Keyboard navigation
- Custom styling

#### `<StatCard />`
Dashboard statistics card
- Icon support
- Trend indicators
- Gradient backgrounds
- Animated values

#### `<Table />`
Data table component
- Sortable columns
- Hover effects
- Responsive design

---

## 🗺 Routing

### Authentication Routes
- `/login` - User login
- `/register` - New user registration
- `/workspaces` - Workspace selection

### Application Routes (Multi-tenant)
All app routes are prefixed with `/app/:workspaceId`

- `/app/:workspaceId/dashboard` - Main dashboard
- `/app/:workspaceId/agents` - Agent management
- `/app/:workspaceId/campaigns` - Campaign management
- `/app/:workspaceId/calls` - Call logs
- `/app/:workspaceId/contacts` - Contact management
- `/app/:workspaceId/billing` - Billing and credits
- `/app/:workspaceId/settings` - Settings

### Route Protection
Routes are organized with nested layouts:
- `<AuthLayout>` - For authentication pages
- `<AppLayout>` - For authenticated app pages with sidebar

---

## 💻 Development Guidelines

### Code Style
- Use functional components with hooks
- Follow React best practices
- Use Tailwind utility classes for styling
- Keep components small and focused
- Use meaningful variable and function names

### Component Structure
```jsx
// 1. Imports
import { useState } from 'react'
import Button from '../../components/Button'

// 2. Component definition
export default function MyComponent() {
    // 3. Hooks
    const [state, setState] = useState(null)
    
    // 4. Event handlers
    const handleClick = () => {
        // ...
    }
    
    // 5. Render
    return (
        <div>
            {/* JSX */}
        </div>
    )
}
```

### Styling Guidelines
- Use Tailwind utility classes
- Follow the design system colors
- Use custom animations from config
- Maintain consistent spacing
- Ensure responsive design

### State Management
- Use React Query for server state
- Use Context API for global state (auth)
- Use local state for component-specific state
- Avoid prop drilling

---

## 🤝 Contributing

### Development Workflow
1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

### Commit Message Format
```
type(scope): description

[optional body]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

---

## 📄 License

This project is private and proprietary.

---

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Tailwind Labs** - For TailwindCSS
- **Headless UI** - For accessible components
- **Heroicons** - For beautiful icons

---

## 📞 Support

For support and questions, please contact the development team.

---

**Built with ❤️ by the CallFlux AI Team**
