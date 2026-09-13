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
Component Architecture
Reusable UI primitives such as:
- Buttons
- Inputs
- Cards
- Tables
- Badges
- Modals
- Avatars
are separated from business-specific components.
This allows individual pages to focus on application logic while shared components handle presentation and reusable interactions.
🧠 State Management
Vertex uses a combination of React Context and local component state.
Global State
AppDataContext manages the application's main datasets:
- Customers
- Products
- Transactions
It also exposes functions for creating, updating, and deleting records.
ThemeContext manages the application's global dark/light theme.
ToastContext manages application notifications and feedback messages.
Local State
Individual pages use React state for temporary UI concerns such as:
- Search terms
- Filters
- Modal visibility
- Form values
- Sorting
- UI toggles
This separation keeps global application data independent from page-specific UI state.
💾 Mock Data
Vertex is intentionally frontend-only and does not require a backend or database.
The application uses strongly typed local mock data to simulate a real SaaS management platform.
The initial datasets are stored in:
src/data/mockData.ts
The mock data is loaded into React Context and managed through application state.
CRUD operations update the in-memory state, allowing users to:
- Add records
- Edit records
- Delete records
- Search records
- Filter records
- Sort records
Because the data is stored in memory, refreshing the browser resets the application to the original mock dataset.
This approach allows the project to demonstrate realistic frontend behavior without requiring a backend service.
📊 Dashboard
The main dashboard provides an overview of business performance.
It includes:
- KPI metrics
- Revenue visualization
- Recent transactions
- Business performance indicators
- Responsive dashboard cards
Dashboard metrics are rendered from structured mock data rather than hardcoded UI elements.
📈 Analytics
The Analytics page uses Recharts to visualize business data.
Charts include:
- Revenue trends
- Performance metrics
- Business analytics
- Transaction-related data
Recharts was chosen because it integrates naturally with React through composable components.
For example, charts can be constructed using components such as:
<ResponsiveContainer>
  <LineChart data={data}>
    <XAxis />
    <Tooltip />
    <Line />
  </LineChart>
</ResponsiveContainer>
Using ResponsiveContainer also allows charts to adapt to different screen sizes.
👥 Customer Management
The Customers page provides a complete frontend CRUD workflow.
Users can:
- View customers
- Search customers
- Filter customers by status
- Add customers
- Edit customers
- Delete customers
- View customer information
Example Flow
When a user adds a customer:
User interaction
      ↓
Form state updates
      ↓
Form submission
      ↓
AppDataContext.addCustomer()
      ↓
Customers state updates
      ↓
React re-renders
      ↓
New customer appears in the table
      ↓
Success toast is displayed
No page reload is required.
📦 Product Management
The Products page provides frontend product and inventory management.
Users can:
- View products
- Search products
- Filter products
- Add products
- Edit products
- Delete products
- View inventory status
Product statuses are represented using type-safe status values and dynamic badges.
Example statuses include:
- in_stock
- low_stock
- out_of_stock
The UI changes the status badge based on the product's current state.
💳 Transactions
The Transactions page provides a structured transaction management interface.
Features include:
- Transaction listing
- Search
- Filtering
- Sorting
- Transaction status indicators
- Responsive table layout
Transaction data is generated from the application's local mock dataset.
⚙️ Settings
The Settings page provides a frontend simulation of user preferences and application settings.
It includes:
- Profile settings
- Notification preferences
- Appearance settings
- Security preferences
- Toggle controls
- Save functionality
- Success notifications
The settings interface demonstrates controlled form inputs and React state management.
🌓 Dark & Light Mode
Vertex supports both dark and light themes.
The theme is managed globally using ThemeContext.
The application:
- Detects the user's system preference
- Stores the selected theme locally
- Applies the theme across the application
- Updates the interface without requiring a page reload
Tailwind CSS is used to apply theme-specific styling throughout the UI.
📱 Responsive Design
Vertex follows a mobile-first responsive design approach using Tailwind CSS.
The interface adapts across:
- Desktop
- Laptop
- Tablet
- Mobile
Responsive Features
- Collapsible mobile sidebar
- Responsive dashboard cards
- Mobile-friendly forms
- Responsive charts
- Horizontally scrollable data tables
- Adaptive header navigation
- Responsive spacing and typography
The goal is to keep the application usable rather than simply shrinking the desktop interface on smaller screens.
♿ Accessibility
Accessibility was considered throughout the interface.
The application includes:
- Semantic HTML
- Form labels
- Keyboard interactions
- Visible focus states
- Accessible buttons
- Appropriate ARIA attributes
- Keyboard-friendly navigation
- Responsive layouts
Keyboard Shortcut
The global search input supports:
Cmd + K
on macOS and:
Ctrl + K
on Windows/Linux.
🔎 Search & Filtering
Search and filtering are implemented using React state and derived data.
Instead of storing a separate filtered dataset, the application stores the user's search/filter values and derives the visible records from the original data.
For example:
Raw customer data
       ↓
Search term
       +
Status filter
       ↓
Array.filter()
       ↓
Filtered customers
       ↓
Rendered table
This keeps the data flow predictable and avoids unnecessary duplicated state.
🧩 Reusable Components
Vertex uses reusable UI primitives to maintain consistency throughout the application.
Examples include:
Button
Input
Card
Badge
Table
Modal
Avatar
Components accept typed props and can be customized when needed.
The project also uses a cn() utility built with:
- clsx
- tailwind-merge
This allows Tailwind classes to be combined safely without creating unnecessary style conflicts.
🔄 Client-Side Routing
Vertex uses React Router v7 for client-side navigation.
The application is structured around a shared dashboard layout with nested routes.
The layout contains:
- Sidebar
- Header
- Main content area
Individual pages are rendered inside the shared layout, allowing navigation without full page reloads.
🔐 TypeScript
TypeScript is used throughout the project to provide type safety and predictable data structures.
Centralized models are defined in:
src/types/index.ts
Examples include:
- Customer
- Product
- Transaction
- MetricData
The application also uses:
- Typed component props
- Union types
- Typed form events
- Typed state
- Utility types such as Omit
Example:
type CustomerStatus = "active" | "inactive" | "churned";
This prevents invalid values from being passed around the application.
📐 Data Flow
Vertex follows a predictable React data flow:
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
For example, adding a customer updates the global customer state inside AppDataContext. Components consuming that context automatically receive the updated data and re-render.
🚀 Getting Started
Prerequisites
Make sure you have Node.js installed.
Clone the repository
git clone https://github.com/Novadgaf-stack/vertex.git
Navigate into the project
cd vertex
Install dependencies
npm install
Start the development server
npm run dev
The application will be available at the local development URL provided by Vite.
📜 Available Scripts
Development
npm run dev
Starts the development server with hot module replacement.
Production Build
npm run build
Creates an optimized production build.
Preview
npm run preview
Runs a local preview of the production build.
⚡ Performance Considerations
Vertex uses several frontend performance practices:
- Vite's fast development and optimized production bundling
- Component-based rendering
- Tree-shakeable SVG icons through Lucide React
- Tailwind CSS production optimization
- Responsive chart rendering
- Local state management without unnecessary external dependencies
For significantly larger datasets, additional optimization could include:
- Memoizing expensive derived calculations
- Server-side data fetching
- Virtualized tables
- True server-side pagination
- Data caching
🔮 Future Improvements
Vertex is currently a frontend-only prototype.
If connected to a production backend, the application could be extended with:
- Authentication and authorization
- Persistent database storage
- REST or GraphQL APIs
- Server-side data fetching
- Real-time updates
- Role-based permissions
- Persistent user preferences
- Advanced analytics
- Production notification systems
The current Context-based data layer could be replaced with API/data-fetching logic while keeping most of the reusable UI components intact.
🎯 Project Goals
Vertex was built as a frontend engineering project to demonstrate the ability to transform a product concept into a functional, responsive application.
The main goals were to demonstrate:
- Type-safe React development
- Reusable component architecture
- React state management
- CRUD workflows
- Responsive web design
- Data visualization
- Interactive forms
- Client-side routing
- Theme management
- Maintainable frontend architecture
- User-focused interface design
👨‍💻 Author
Isaac Akinkunmi
Frontend / Full-Stack Developer
GitHub: @Novadgaf-stack
📄 License
This project is for portfolio and demonstration purposes.
