# Vertex

A modern, responsive SaaS administration dashboard built to demonstrate production-style frontend development with React, TypeScript, and Tailwind CSS.

Vertex simulates the internal management interface of a SaaS business, providing tools for monitoring business performance, managing customers and products, tracking transactions, and analyzing revenue.

## ✨ Features

- 📊 Interactive dashboard with KPI metrics
- 📈 Interactive revenue and analytics visualizations
- 👥 Customer management with CRUD operations
- 📦 Product management with inventory status
- 💳 Transaction management and filtering
- 🔎 Search and filtering functionality
- ↕️ Sortable data tables
- 🌓 Dark and light mode
- 📱 Responsive desktop, tablet, and mobile layouts
- 🔔 Toast notifications and feedback states
- 🧩 Reusable component architecture
- ⌨️ Keyboard-friendly interactions
- 📝 Interactive forms and modals
- 📱 Mobile navigation
- 🎨 Consistent design system

## 🛠️ Tech Stack

- **React 19** — Core UI library
- **TypeScript** — Type-safe application development
- **Vite** — Development server and build tooling
- **React Router v7** — Client-side routing
- **Tailwind CSS v4** — Styling and responsive design
- **Recharts** — Data visualization
- **Lucide React** — Interface icons
- **clsx** — Conditional class handling
- **tailwind-merge** — Safe Tailwind class merging

## 🏗️ Architecture

Vertex follows a modular, component-based architecture designed to keep UI components reusable and application logic organized.

```text
src/
├── components/
│   ├── ui/
│   ├── layout/
│   └── dashboard/
│
├── contexts/
│   ├── AppDataContext.tsx
│   ├── ThemeContext.tsx
│   └── ToastContext.tsx
│
├── data/
│   └── mockData.ts
│
├── pages/
│   ├── Dashboard.tsx
│   ├── Analytics.tsx
│   ├── Customers.tsx
│   ├── Products.tsx
│   ├── Transactions.tsx
│   └── Settings.tsx
│
├── types/
│   └── index.ts
│
└── lib/
    └── utils.ts
```

## 🧩 Component Architecture

Reusable UI primitives (such as Buttons, Inputs, Cards, Tables, Badges, Modals, and Avatars) are separated from business-specific components. This allows individual pages to focus on application logic while shared components handle presentation and reusable interactions.

The project utilizes a `cn()` utility built with `clsx` and `tailwind-merge` to safely combine Tailwind classes without creating style conflicts.

## 🧠 State Management

Vertex uses a combination of React Context and local component state to handle data efficiently.

### Global State
- **AppDataContext**: Manages the application's main datasets (Customers, Products, Transactions) and exposes functions for creating, updating, and deleting records.
- **ThemeContext**: Manages the global dark/light theme.
- **ToastContext**: Manages application notifications and feedback messages.

### Local State
Individual pages use React state for temporary UI concerns such as search terms, filters, modal visibility, form values, sorting, and UI toggles. This separation keeps global application data independent from page-specific UI state.

## 💾 Mock Data

Vertex is intentionally frontend-only and does not require a backend or database. It uses strongly typed local mock data to simulate a real SaaS platform.

- Data is loaded into React Context and managed through application state.
- CRUD operations update the in-memory state (Add, Edit, Delete, Search, Filter, Sort).
- Because data is stored in memory, refreshing the browser resets the application to the original dataset.

## 📱 Core Modules

### 📊 Dashboard & Analytics
The dashboard provides an overview of business performance, including KPI metrics, revenue visualization, and recent transactions rendered from structured mock data. The Analytics page utilizes **Recharts** for composable, responsive visualizations (like `<ResponsiveContainer>` and `<LineChart>`) of revenue trends and performance metrics.

### 👥 Customer Management
A complete frontend CRUD workflow. Users can view, search, filter, add, edit, and delete customers. 
*Flow: User Interaction → Form Updates → Submission → Context Update → React Re-render → Success Toast (No page reload required).*

### 📦 Product Management
Provides frontend inventory management. Includes type-safe dynamic badges for statuses such as `in_stock`, `low_stock`, and `out_of_stock`.

### 💳 Transactions
A structured management interface featuring transaction listing, search, filtering, sorting, and responsive table layouts.

### ⚙️ Settings
A frontend simulation of user preferences, including profile settings, notification preferences, appearance settings, and toggle controls demonstrating controlled form inputs.

## 🎨 UX & Design Features

- **🌓 Dark & Light Mode**: Managed globally via `ThemeContext`. Detects system preference, stores selection locally, and applies it instantly via Tailwind CSS.
- **📱 Responsive Design**: Built mobile-first. Features collapsible sidebars, adaptive headers, horizontally scrollable tables, and responsive charts spanning desktop to mobile.
- **♿ Accessibility**: Includes semantic HTML, form labels, visible focus states, appropriate ARIA attributes, and keyboard interactions (e.g., `Cmd + K` / `Ctrl + K` for global search).
- **🔎 Search & Filtering**: Implemented using derived data. Instead of duplicating state, the app stores search/filter values and dynamically derives visible records (Array.filter) from the original data.

## 📐 Data Flow

Vertex follows a predictable, unidirectional React data flow:

```text
Mock Data
    ↓
React Context
    ↓
Component
    ↓
User Interaction
    ↓
State Update
    ↓
React Re-render
    ↓
Updated UI
```

## 🚀 Getting Started

**Prerequisites:** Make sure you have Node.js installed.

```bash
# Clone the repository
git clone https://github.com/Novadgaf-stack/vertex.git

# Navigate into the project
cd vertex

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 📜 Available Scripts

- `npm run dev` — Starts the development server with hot module replacement.
- `npm run build` — Creates an optimized production build.
- `npm run preview` — Runs a local preview of the production build.

## ⚡ Performance Considerations

Vertex uses several frontend performance practices, including Vite's optimized bundling, component-based rendering, tree-shakeable SVG icons (Lucide), and fast local state management. For significantly larger datasets, future optimizations could include memoizing expensive derived calculations, virtualized tables, and true server-side pagination.

## 🔮 Future Improvements

As a frontend-only prototype, Vertex could be extended with a production backend to include:
- Authentication, authorization, and role-based permissions
- Persistent database storage with REST or GraphQL APIs
- Server-side data fetching and real-time updates
- Advanced analytics and production notification systems

## 🎯 Project Goals

Vertex was built as a frontend engineering project to demonstrate the ability to transform a product concept into a functional, responsive application emphasizing type-safe React development, reusable architecture, CRUD workflows, responsive design, and maintainable data flow.

## 👨‍💻 Author

**Isaac Akinkunmi**  
Frontend / Full-Stack Developer  
GitHub: [@Novadgaf-stack](https://github.com/Novadgaf-stack)

## 📄 License

This project is for portfolio and demonstration purposes.