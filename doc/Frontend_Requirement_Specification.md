# Frontend Requirement Specification (FRS)
## Smart Community Biogas Plant - Dashboard Prototype

### 1. Overview
This document outlines the requirements for a modern, highly responsive, and data-driven single-page application (SPA) prototype for a Biogas Plant Management System. The prototype is intended to be presented to competition judges, focusing on clean architecture, realistic data visualization, and an impressive user interface.

### 2. Tech Stack & Libraries
- **Core Framework:** React JS (initialized via Vite)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (Cards, Buttons, Tables, Dialogs, etc.)
- **Icons:** Lucide React
- **Data Visualization:** Recharts (For responsive, animated charts)
- **Routing:** React Router DOM (v6)
- **Typography:** Inter or Roboto font family

### 3. Architectural Constraints & Design
- **Environment:** Frontend-only application. No backend integration.
- **Data Source:** All dynamic data managed via a centralized `mockData.js` file.
- **Component Architecture:** Atomic design principles separating layouts, pages, and UI components.
- **State Management:** Standard React Hooks (`useState`, `useEffect`). A custom `useDashboardData` hook will simulate API latency for realistic loading states.
- **Theme & Aesthetics:**
  - Minimalist, highly modern, and clean design tailored for desktop presentations.
  - **Visual Effects:** Utilize **Glass effect (Glassmorphism)** (backdrop blur, semi-transparent backgrounds) where appropriate (e.g., in modals, floating cards, sidebars, or dropdowns) to make the UI more attractive and premium.
  - **Background:** Off-white/Light Gray (`slate-50`).
  - **Primary Accent:** Emerald/Teal Green (representing eco-friendly energy).
  - **Warning/Error:** Amber/Red.

### 4. Layout & Navigation (`src/layouts/DashboardLayout.jsx`)
- **Sidebar (Left):**
  - **Brand:** "BioSmart" logo with a green leaf/energy icon.
  - **Navigation Links:**
    - Dashboard (Active)
    - Supply Chain
    - Billing (Placeholder page)
    - Maintenance (Placeholder page)
  - **Footer:** User Profile ("Admin") and Settings icon.
- **Top Header:**
  - Dynamic Page Title.
  - Search Bar (mock functionality).
  - Notification Bell with a red badge indicating '3' unread alerts. Clicking it triggers a Popover/Dropdown displaying `recentAlerts`.

### 5. Pages Specifications

#### 5.1 Main Dashboard (`src/pages/Dashboard.jsx`)
The primary screen for the presentation.
- **Section A: KPI Cards Grid (Top)**
  - 4 clean cards using `shadcn/ui`.
  - Display values, units, labels, and trend indicators (green arrow up, red arrow down).
- **Section B: Real-time IoT Visualizer (Middle Left - 1/3 width)**
  - Visual gauges or circular progress bars for:
    - Gas Pressure
    - Digester Temperature
    - Storage Capacity
  - Color-coded statuses (e.g., Green = Normal, Orange/Red = Warning/Critical >80%).
- **Section C: Production Analytics (Middle Right - 2/3 width)**
  - AreaChart or BarChart using `Recharts`.
  - Comparison of `wasteInput` vs `gasOutput` over the last 7 days.
  - Custom tooltip on hover.
- **Section D: System Activity Log (Bottom)**
  - Scrollable list of system events and alerts.
  - Icons denoting severity (e.g., `TriangleAlert` for warnings, `CheckCircle` for info).

#### 5.2 Supply Chain & Inventory (`src/pages/SupplyChain.jsx`)
Demonstrates community impact and waste collection logistics.
- **Top Section:** "Add New Input" Button triggering a Modal/Dialog.
  - **Form Fields:** 
    - Supplier ID / Name
    - Waste Type (Dropdown: Cow Dung / Poultry)
    - Quantity (kg)
    - Date of Collection
    - Expected Payment Amount
- **Data Table:** Modern `shadcn/ui` table.
  - Columns: Supplier ID, Name, Waste Type, Quantity (kg), Date, Payment Status (Badge: Paid/Pending).
- **Leaderboard Widget:** Side panel showing "Top 3 Contributors of the Month" for gamification.

#### 5.3 Placeholder Pages
- **Billing (`src/pages/Billing.jsx`):** Simple construction/placeholder layout.
- **Maintenance (`src/pages/Maintenance.jsx`):** Simple construction/placeholder layout.

### 6. Mock Data Schema (`src/data/mockData.js`)
```javascript
export const mockDashboardData = {
  kpiMetrics: {
    totalGasProduced: { value: 1250, unit: "m³", trend: "+5.2%", label: "Gas Produced Today" },
    activeSuppliers: { value: 48, unit: "Farmers", trend: "+2", label: "Active Waste Suppliers" },
    revenueGenerated: { value: 15400, unit: "BDT", trend: "+12%", label: "Est. Daily Revenue" },
    co2Saved: { value: 210, unit: "kg", trend: "+8%", label: "CO2 Emissions Prevented" }
  },
  
  realtimeSensors: {
    gasPressure: { current: 1.4, max: 2.0, status: "Optimal", unit: "bar" },
    digesterTemp: { current: 36, max: 40, status: "Normal", unit: "°C" },
    storageCapacity: { current: 82, max: 100, status: "Warning", unit: "%" }
  },

  productionChart: [
    { day: "Mon", wasteInput: 500, gasOutput: 200, fertilizerOutput: 300 },
    { day: "Tue", wasteInput: 550, gasOutput: 220, fertilizerOutput: 320 },
    { day: "Wed", wasteInput: 520, gasOutput: 210, fertilizerOutput: 310 },
    { day: "Thu", wasteInput: 580, gasOutput: 240, fertilizerOutput: 340 },
    { day: "Fri", wasteInput: 600, gasOutput: 250, fertilizerOutput: 350 },
    { day: "Sat", wasteInput: 590, gasOutput: 245, fertilizerOutput: 345 },
    { day: "Sun", wasteInput: 610, gasOutput: 260, fertilizerOutput: 350 }
  ],

  recentAlerts: [
    { id: 1, type: "warning", message: "Storage tank nearing maximum capacity (>80%)", time: "10 mins ago" },
    { id: 2, type: "info", message: "Farmer Rafiq supplied 50kg poultry waste", time: "1 hour ago" },
    { id: 3, type: "critical", message: "H2S Scrubber pressure drop detected", time: "2 hours ago" }
  ],
  suppliersList: [
    { id: "SUP-101", name: "Rahim Uddin", wasteType: "Cow Dung", quantity: 150, date: "2026-10-01", paymentStatus: "Paid", expectedPayment: "750 BDT" },
    { id: "SUP-102", name: "Korim Bepari", wasteType: "Poultry Waste", quantity: 85, date: "2026-10-01", paymentStatus: "Pending", expectedPayment: "425 BDT" },
    { id: "SUP-103", name: "Abdul Ali", wasteType: "Cow Dung", quantity: 210, date: "2026-09-30", paymentStatus: "Paid", expectedPayment: "1050 BDT" },
    { id: "SUP-104", name: "Sufia Begum", wasteType: "Poultry Waste", quantity: 45, date: "2026-09-30", paymentStatus: "Pending", expectedPayment: "225 BDT" },
    { id: "SUP-105", name: "Jamal Hossain", wasteType: "Cow Dung", quantity: 300, date: "2026-09-29", paymentStatus: "Paid", expectedPayment: "1500 BDT" }
  ],

  topContributors: [
    { rank: 1, id: "SUP-105", name: "Jamal Hossain", totalSupplied: 1250, badge: "Gold", unit: "kg" },
    { rank: 2, id: "SUP-103", name: "Abdul Ali", totalSupplied: 980, badge: "Silver", unit: "kg" },
    { rank: 3, id: "SUP-101", name: "Rahim Uddin", totalSupplied: 850, badge: "Bronze", unit: "kg" }
  ]
};
```

### 7. Interactions & Animations
- Ensure hover states on all interactive elements (buttons, table rows, cards).
- Standard entry animations (`fade-in`, `slide-up` via Tailwind) on Dashboard load to make the presentation dynamic.
