import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Wallet, Receipt, ArrowDownLeft, ArrowUpRight, Download, CreditCard, Clock, CheckCircle2, TrendingUp, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Billing() {
  const [activeTab, setActiveTab] = useState("invoices");
  
  // Mock Data
  const [invoices, setInvoices] = useState([
    { id: "INV-2026-001", client: "Dhaka Green Energy", type: "Biogas Supply", amount: 45000, date: "2026-10-01", status: "Paid" },
    { id: "INV-2026-002", client: "EcoFuel Corp", type: "Fertilizer (Slurry)", amount: 28000, date: "2026-09-28", status: "Pending" },
    { id: "INV-2026-003", client: "AgroTech BD", type: "Biogas Supply", amount: 12500, date: "2026-09-25", status: "Paid" },
    { id: "INV-2026-004", client: "Local Kitchens Inc", type: "Biogas Supply", amount: 8500, date: "2026-09-20", status: "Paid" },
  ]);

  const [payouts, setPayouts] = useState([
    { id: "PAY-SUP-101", supplier: "Rahim Uddin", amount: 750, date: "2026-10-01", status: "Pending" },
    { id: "PAY-SUP-102", supplier: "Korim Bepari", amount: 425, date: "2026-10-01", status: "Pending" },
    { id: "PAY-SUP-104", supplier: "Sufia Begum", amount: 225, date: "2026-09-30", status: "Pending" },
    { id: "PAY-SUP-103", supplier: "Abdul Ali", amount: 1050, date: "2026-09-28", status: "Paid" },
    { id: "PAY-SUP-105", supplier: "Jamal Hossain", amount: 1500, date: "2026-09-25", status: "Paid" },
  ]);

  // Derived metrics
  const totalBalance = 450000;
  const pendingRevenue = invoices.filter(i => i.status === "Pending").reduce((acc, curr) => acc + curr.amount, 0);
  const pendingPayouts = payouts.filter(p => p.status === "Pending").reduce((acc, curr) => acc + curr.amount, 0);
  const thisMonthRevenue = 85200;

  const handlePayAllSuppliers = () => {
    setPayouts(prev => prev.map(p => ({ ...p, status: "Paid" })));
  };

  const handleSendReminder = (id) => {
    // In a real app, this would trigger an API call
    alert(`Payment reminder sent for invoice ${id}`);
  };

  const getStatusBadge = (status) => {
    if (status === "Paid") {
      return <Badge className="bg-emerald-500/10 text-emerald-500 border-none hover:bg-emerald-500/20 px-2.5 py-0.5 rounded-md"><CheckCircle2 className="w-3 h-3 mr-1" /> Paid</Badge>;
    }
    return <Badge className="bg-amber-500/10 text-amber-500 border-none hover:bg-amber-500/20 px-2.5 py-0.5 rounded-md"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Billing & Finance</h2>
          <p className="text-muted-foreground mt-1">Manage revenue, invoices, and supplier payouts.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 text-foreground rounded-xl">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-900/20">
            <Plus className="w-4 h-4 mr-2" />
            Create Invoice
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/5 backdrop-blur-2xl border-white/10 shadow-2xl shadow-black/40 hover:-translate-y-1 transition-all duration-300 rounded-2xl delay-0 animate-in fade-in zoom-in-95 fill-mode-both">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Current Balance</CardTitle>
            <div className="p-2 bg-emerald-500/10 rounded-lg"><Wallet className="w-4 h-4 text-emerald-500" /></div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">৳ {totalBalance.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <TrendingUp className="w-3 h-3 text-emerald-500 mr-1" />
              <span className="text-emerald-500 font-medium mr-1">+2.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-2xl border-white/10 shadow-2xl shadow-black/40 hover:-translate-y-1 transition-all duration-300 rounded-2xl delay-75 animate-in fade-in zoom-in-95 fill-mode-both">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Monthly Revenue</CardTitle>
            <div className="p-2 bg-blue-500/10 rounded-lg"><ArrowDownLeft className="w-4 h-4 text-blue-500" /></div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">৳ {thisMonthRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              Target achieved: 85%
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-2xl border-white/10 shadow-2xl shadow-black/40 hover:-translate-y-1 transition-all duration-300 rounded-2xl delay-150 animate-in fade-in zoom-in-95 fill-mode-both">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Pending Invoices</CardTitle>
            <div className="p-2 bg-amber-500/10 rounded-lg"><Receipt className="w-4 h-4 text-amber-500" /></div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">৳ {pendingRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">To be collected</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-2xl border-white/10 shadow-2xl shadow-black/40 hover:-translate-y-1 transition-all duration-300 rounded-2xl delay-200 animate-in fade-in zoom-in-95 fill-mode-both">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Supplier Payouts</CardTitle>
            <div className="p-2 bg-red-500/10 rounded-lg"><ArrowUpRight className="w-4 h-4 text-red-500" /></div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">৳ {pendingPayouts.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Pending payments to farmers</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <Card className="bg-white/5 backdrop-blur-2xl border-white/10 shadow-2xl shadow-black/40 rounded-2xl overflow-hidden mt-8">
        
        {/* Custom Tabs Header */}
        <div className="flex border-b border-white/10">
          <button 
            onClick={() => setActiveTab("invoices")}
            className={cn(
              "px-8 py-4 text-sm font-semibold transition-all relative bg-transparent",
              activeTab === "invoices" ? "text-emerald-500" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Client Invoices
            {activeTab === "invoices" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />}
          </button>
          <button 
            onClick={() => setActiveTab("payouts")}
            className={cn(
              "px-8 py-4 text-sm font-semibold transition-all relative bg-transparent",
              activeTab === "payouts" ? "text-emerald-500" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Supplier Payouts
            {activeTab === "payouts" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />}
          </button>
        </div>

        <CardContent className="p-0">
          
          {/* Tab 1: Invoices */}
          {activeTab === "invoices" && (
            <div className="animate-in fade-in duration-300">
              <div className="p-6 flex justify-between items-center border-b border-white/5">
                <h3 className="font-semibold text-lg">Recent Invoices</h3>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-transparent border-b border-white/10">
                    <TableRow className="border-none hover:bg-transparent">
                      <TableHead className="pl-6">Invoice ID</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right pr-6">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((inv) => (
                      <TableRow key={inv.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <TableCell className="font-medium pl-6 text-muted-foreground">{inv.id}</TableCell>
                        <TableCell className="font-semibold text-foreground">{inv.client}</TableCell>
                        <TableCell className="text-muted-foreground">{inv.type}</TableCell>
                        <TableCell className="text-muted-foreground">{inv.date}</TableCell>
                        <TableCell className="font-bold text-foreground">৳ {inv.amount.toLocaleString()}</TableCell>
                        <TableCell>{getStatusBadge(inv.status)}</TableCell>
                        <TableCell className="text-right pr-6">
                          {inv.status === "Pending" ? (
                            <Button onClick={() => handleSendReminder(inv.id)} variant="ghost" size="sm" className="text-amber-500 hover:text-amber-400 hover:bg-amber-500/10">
                              Remind
                            </Button>
                          ) : (
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-white/10">
                              <Download className="w-4 h-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* Tab 2: Supplier Payouts */}
          {activeTab === "payouts" && (
            <div className="animate-in fade-in duration-300">
              <div className="p-6 flex justify-between items-center border-b border-white/5">
                <h3 className="font-semibold text-lg">Pending & Completed Payouts</h3>
                {pendingPayouts > 0 && (
                  <Button onClick={handlePayAllSuppliers} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg h-9">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Pay All Pending (৳ {pendingPayouts.toLocaleString()})
                  </Button>
                )}
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-transparent border-b border-white/10">
                    <TableRow className="border-none hover:bg-transparent">
                      <TableHead className="pl-6">Payout ID</TableHead>
                      <TableHead>Supplier Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right pr-6">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payouts.map((pay) => (
                      <TableRow key={pay.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <TableCell className="font-medium pl-6 text-muted-foreground">{pay.id}</TableCell>
                        <TableCell className="font-semibold text-foreground">{pay.supplier}</TableCell>
                        <TableCell className="text-muted-foreground">{pay.date}</TableCell>
                        <TableCell className="font-bold text-foreground">৳ {pay.amount.toLocaleString()}</TableCell>
                        <TableCell>{getStatusBadge(pay.status)}</TableCell>
                        <TableCell className="text-right pr-6">
                           {pay.status === "Pending" ? (
                             <Button onClick={() => setPayouts(prev => prev.map(p => p.id === pay.id ? {...p, status: "Paid"} : p))} variant="outline" size="sm" className="bg-transparent border-white/10 hover:bg-emerald-500/20 hover:text-emerald-500 hover:border-emerald-500/50">
                               Pay Now
                             </Button>
                           ) : (
                             <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-white/10">
                              <Receipt className="w-4 h-4" />
                            </Button>
                           )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

        </CardContent>
      </Card>
      
    </div>
  );
}
