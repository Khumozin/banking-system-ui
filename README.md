# Banking System UI

A modern banking application built with Angular 20 that allows users to manage bank accounts, perform financial transactions, and track transaction history with an intuitive interface and real-time data tables.

## Features

### Account Management
- View all accounts in a sortable, filterable data table
- Create new accounts with initial balance
- View detailed account information and transaction history
- Animated balance display with smooth number transitions
- Copy account IDs to clipboard

### Transaction Management
- View all transactions with advanced filtering
- Make deposits to any account
- Transfer funds between accounts
- Filter by status (PENDING, COMPLETED, FAILED)
- Filter by type (DEPOSIT, TRANSFER)
- Real-time transaction status updates

### UI Features
- Responsive sidebar navigation with collapsible menu
- Light/dark mode theme toggle
- Advanced data tables with pagination and column visibility controls
- Toast notifications for user feedback
- South African Rand (ZAR) currency formatting

## Tech Stack

- **Angular** 20.2 with standalone components and signals
- **TailwindCSS** 4.1 for utility-first styling
- **Spartan UI** headless component library
- **TanStack Query** for server state management
- **TanStack Table** for advanced data tables
- **number-flow** for animated number transitions
- **ng-icons** with Lucide icon set

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:4200](http://localhost:4200) to view the app.

## Commands

```bash
npm start          # Start dev server
npm run build      # Build for production
npm test           # Run tests
npm run watch      # Build with watch mode
```

## Project Structure

```
src/app/
├── core/
│   ├── components/      # Layout components (sidebar, header, etc.)
│   ├── services/        # Core services (theme, etc.)
│   └── interceptors/    # HTTP interceptors
├── features/
│   ├── accounts/        # Account management feature
│   ├── transactions/    # Transaction management feature
│   └── notifications/   # Notifications feature
└── shared/
    ├── ui/              # Shared UI components
    ├── directives/      # Custom directives
    └── constants/       # App constants
```

## Architecture Highlights

- **Standalone Components** - No NgModules, leveraging Angular's latest APIs
- **Signals** - Modern state management with Angular signals
- **Lazy Loading** - Features loaded on-demand via routing
- **Zoneless Change Detection** - Optimized for performance
- **Reactive Forms** - Type-safe form handling
- **Dialog-based UX** - Modal dialogs for create/edit operations

---

Built with [Angular CLI](https://angular.dev/tools/cli)
