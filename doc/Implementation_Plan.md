# Project Implementation Plan
## Smart Community Biogas Plant - Dashboard Prototype

To build this prototype seamlessly and exactly according to the requirements, we will divide the work into **6 logical phases**. By following this step-by-step approach, we can easily track our progress and ensure nothing is missed.

---

### Phase 1: Project Initialization & Configuration
*Objective: Set up the core foundation of the project.*
1. **Initialize Vite Project:** Setup React with Vite (using `npx create-vite`).
2. **Install Dependencies:** Install Tailwind CSS, `react-router-dom`, `recharts`, `lucide-react`, and `clsx`/`tailwind-merge`.
3. **Configure shadcn/ui:** Initialize `shadcn/ui` and configure the `components.json` and base CSS (using slate and emerald/teal color scales).
4. **Font Configuration:** Add **Inter** or **Roboto** font via Google Fonts in `index.html` and configure it in `tailwind.config.js`.

### Phase 2: Mock Data & State Management
*Objective: Prepare the data layer so our components have realistic data to consume.*
1. **Create Mock Data File:** Build `src/data/mockData.js` exactly as defined in the requirement specification.
2. **Custom Hook Setup:** Create a custom hook `src/hooks/useDashboardData.js` that simulates an API call (with a small `setTimeout` delay) to fetch the mock data and manage loading/error states.

### Phase 3: Global Layout & Theming (Architecture Setup)
*Objective: Build the outer shell (skeleton) of the application.*
1. **Setup Routing:** Configure `react-router-dom` in `App.jsx` with routes for Dashboard, Supply Chain, Billing, and Maintenance.
2. **Build Sidebar Component:** Create the left navigation menu with active state styling.
3. **Build Top Header Component:** Create the header with a dynamic page title, mock search bar, and notification bell (with dropdown).
4. **Create DashboardLayout:** Combine the Sidebar and Header into a reusable `DashboardLayout.jsx` wrapper for all pages.
5. **Implement Glassmorphism Base:** Setup utility classes in `index.css` or Tailwind for the glass effect (backdrop blur, semi-transparent borders).

### Phase 4: Core UI Components Generation
*Objective: Generate reusable micro-components using `shadcn/ui`.*
1. **Generate shadcn Components:** Add required base components (Card, Button, Table, Dialog, Badge, Popover).
2. **Build KPI Cards:** Create a reusable `StatCard` component for the top grid.
3. **Build Charts:** Create the `ProductionChart` component using Recharts.
4. **Build Sensor Widgets:** Create visual circular progress bars/gauges for real-time IoT sensors.

### Phase 5: Page Assembly
*Objective: Put the pieces together to create fully functional pages.*
1. **Main Dashboard Page:** Assemble KPI Cards, Charts, Sensor Widgets, and Activity Log into a clean grid layout.
2. **Supply Chain Page:** Assemble the Data Table, Top Contributors leaderboard, and build the "Add New Input" Modal form.
3. **Placeholder Pages:** Create basic empty states for Billing and Maintenance pages.

### Phase 6: Polish, Animations & Final Review
*Objective: Make the UI feel premium and dynamic.*
1. **Apply Animations:** Add simple CSS or Tailwind animations (`animate-in fade-in slide-in-from-bottom`) to cards and charts when they mount.
2. **Refine Interactions:** Ensure hover states on buttons and table rows look good. Apply Glassmorphism on modals, tooltips, and dropdowns.
3. **Responsive Check:** Verify that the layout doesn't break on standard desktop and tablet screens.

---
**Next Step:** Once you approve this plan, we will start executing **Phase 1**.
