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
