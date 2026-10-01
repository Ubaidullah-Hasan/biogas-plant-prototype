import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import SupplyChain from "./pages/SupplyChain";
import Billing from "./pages/Billing";
import Maintenance from "./pages/Maintenance";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/supply-chain" element={<SupplyChain />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/maintenance" element={<Maintenance />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
