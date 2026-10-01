import { useState, useEffect } from "react";
import { useDashboardData } from "@/hooks/useDashboardData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Loader2, Plus, Trophy, Medal, User, Recycle, Scale, Sprout, CheckCircle2 } from "lucide-react";

export default function SupplyChain() {
  const { data, loading, error } = useDashboardData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Local state to manage the newly added records on the UI
  const [localSuppliers, setLocalSuppliers] = useState([]);
  
  // Form input states
  const [newSupplierName, setNewSupplierName] = useState("");
  const [newWasteType, setNewWasteType] = useState("Cow Dung");
  const [newQuantity, setNewQuantity] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Sync initial mock data to local state
  useEffect(() => {
    if (data && data.suppliersList) {
      setLocalSuppliers(data.suppliersList);
    }
  }, [data]);

  // Unique suppliers for autocomplete
  const uniqueSuppliers = Array.from(new Map(localSuppliers.map(s => [s.name, s])).values());
  const filteredSuppliers = newSupplierName 
    ? uniqueSuppliers.filter(s => s.name.toLowerCase().includes(newSupplierName.toLowerCase()))
    : [];

  const handleSaveRecord = () => {
    if (!newSupplierName || !newQuantity) return; // Simple validation
    
    // Find if the name exists, use its ID. Otherwise generate a new one.
    const existingSupplier = localSuppliers.find(s => s.name.toLowerCase() === newSupplierName.toLowerCase().trim());
    const finalId = existingSupplier ? existingSupplier.id : `SUP-${100 + localSuppliers.length + 1}`;
    
    const qty = parseInt(newQuantity, 10);
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    
    const newRecord = {
      id: finalId,
      name: newSupplierName.trim(),
      wasteType: newWasteType,
      quantity: qty,
      date: today,
      paymentStatus: "Pending",
      expectedPayment: `${qty * 5} BDT` // Mock calculation: 5 BDT per kg
    };

    // Add new record to the top of the list
    setLocalSuppliers([newRecord, ...localSuppliers]);
    
    // Close modal and reset form
    setIsModalOpen(false);
    setNewSupplierName("");
    setNewWasteType("Cow Dung");
    setNewQuantity("");
  };

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        <p className="text-xl font-bold">Error loading data</p>
        <p>{error}</p>
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className="flex-1 flex items-center justify-center h-full min-h-[400px]">
        <div className="flex flex-col items-center gap-4 text-primary">
          <Loader2 className="w-10 h-10 animate-spin" />
          <p className="text-sm font-medium animate-pulse">Loading supply chain data...</p>
        </div>
      </div>
    );
  }

  const { topContributors } = data;

  const getBadgeColor = (status) => {
    return status === "Paid" ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20" : "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20";
  };

  const getRankIcon = (rank) => {
    switch(rank) {
      case 1: return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Medal className="w-5 h-5 text-amber-700" />;
      default: return null;
    }
  };

  return (
    <div className="p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div className="flex justify-end items-center">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30 rounded-xl px-5">
              <Plus className="w-4 h-4 mr-2" />
              Add New Input
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[420px] bg-slate-950/80 backdrop-blur-2xl border-slate-700/50 shadow-2xl p-0 overflow-visible rounded-2xl">
            
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-white/10 bg-muted/10 rounded-t-2xl">
              <DialogTitle className="text-xl font-bold flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-600">
                  <Sprout className="w-5 h-5" />
                </div>
                Record Waste Input
              </DialogTitle>
              <DialogDescription className="mt-2 text-sm text-muted-foreground">
                Log the waste collected. Type the supplier's name to see existing matches.
              </DialogDescription>
            </div>
            
            {/* Form Fields */}
            <div className="p-6 space-y-5">
              
              {/* Supplier Name with Autocomplete */}
              <div className="relative">
                <label className="text-sm font-semibold text-foreground mb-1.5 block">Supplier Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input 
                    value={newSupplierName}
                    onChange={(e) => { setNewSupplierName(e.target.value); setShowDropdown(true); }}
                    onFocus={() => setShowDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                    className="flex h-11 w-full rounded-xl border border-white/10 bg-slate-900 pl-10 pr-4 text-sm shadow-2xl shadow-black/40 transition-all focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none placeholder:text-muted-foreground/50"
                    placeholder="e.g. Rahim Uddin" 
                  />
                </div>
                {/* Autocomplete Dropdown */}
                {showDropdown && filteredSuppliers.length > 0 && (
                  <ul className="absolute z-50 w-full mt-1.5 bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl max-h-48 overflow-y-auto overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    {filteredSuppliers.map(s => (
                      <li 
                        key={s.id} 
                        className="flex justify-between items-center px-4 py-3 text-sm hover:bg-white/10 cursor-pointer transition-colors border-b border-white/10 last:border-0"
                        onClick={() => {
                          setNewSupplierName(s.name);
                          setShowDropdown(false);
                        }}
                      >
                        <span className="font-medium text-foreground">{s.name}</span> 
                        <Badge variant="outline" className="text-[10px] text-muted-foreground font-normal rounded-md">{s.id}</Badge>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Waste Type */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-1.5 block">Waste Type</label>
                <div className="relative">
                  <Recycle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <select 
                    value={newWasteType}
                    onChange={(e) => setNewWasteType(e.target.value)}
                    className="flex h-11 w-full rounded-xl border border-white/10 bg-slate-900 pl-10 pr-10 text-sm shadow-2xl shadow-black/40 transition-all focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none appearance-none"
                  >
                    <option value="Cow Dung">Cow Dung</option>
                    <option value="Poultry Waste">Poultry Waste</option>
                  </select>
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-1.5 block">Quantity</label>
                <div className="relative">
                  <Scale className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="number" 
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(e.target.value)}
                    className="flex h-11 w-full rounded-xl border border-white/10 bg-slate-900 pl-10 pr-12 text-sm shadow-2xl shadow-black/40 transition-all focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none placeholder:text-muted-foreground/50" 
                    placeholder="Enter amount" 
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    kg
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-white/10 bg-muted/10 rounded-b-2xl flex justify-end gap-3">
              <DialogClose asChild>
                <Button variant="outline" className="rounded-xl border-white/10 hover:bg-slate-900 text-muted-foreground hover:text-foreground">
                  Cancel
                </Button>
              </DialogClose>
              <Button onClick={handleSaveRecord} className="rounded-xl shadow-md hover:shadow-lg transition-all bg-emerald-600 hover:bg-emerald-700 text-white border-0 font-semibold px-5">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Save Record
              </Button>
            </div>
            
          </DialogContent>
        </Dialog>
      </div>

      {/* Main Table and Leaderboard go here... (Same as before) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Table Section */}
        <Card className="lg:col-span-2 bg-white/5 backdrop-blur-2xl shadow-2xl shadow-black/40 border-white/10 rounded-2xl overflow-hidden">
          <CardHeader className="border-b border-white/10">
            <CardTitle>Recent Waste Supply</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-transparent border-b border-white/10">
                  <TableRow className="border-none hover:bg-transparent">
                    <TableHead className="pl-6">Supplier</TableHead>
                    <TableHead>Waste Type</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Expected Payment</TableHead>
                    <TableHead className="pr-6">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {localSuppliers.map((supplier, idx) => (
                    <TableRow key={supplier.id + idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <TableCell className="font-medium pl-6">
                        <div className="text-foreground font-semibold">{supplier.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{supplier.id}</div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{supplier.wasteType}</TableCell>
                      <TableCell className="font-medium">{supplier.quantity} kg</TableCell>
                      <TableCell className="text-muted-foreground">{supplier.date}</TableCell>
                      <TableCell className="font-semibold">{supplier.expectedPayment}</TableCell>
                      <TableCell className="pr-6">
                        <Badge className={`border-none shadow-none font-semibold ${getBadgeColor(supplier.paymentStatus)} rounded-md px-2.5 py-0.5`}>
                          {supplier.paymentStatus}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard Section */}
        <Card className="lg:col-span-1 bg-white/5 backdrop-blur-2xl shadow-2xl shadow-black/40 border-white/10 rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-emerald-600" />
              Top Contributors
            </CardTitle>
            <CardDescription>Highest waste suppliers this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topContributors.map((contributor) => (
                <div key={contributor.id} className="flex items-center justify-between p-3.5 rounded-xl border border-white/10 bg-slate-900 hover:shadow-2xl shadow-black/40 transition-shadow">
                  <div className="flex items-center gap-3.5">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 border border-white/10 shadow-2xl shadow-black/40">
                      {getRankIcon(contributor.rank)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground leading-none mb-1.5">{contributor.name}</p>
                      <Badge variant="secondary" className="text-[10px] font-medium rounded-md px-1.5 py-0 bg-muted text-muted-foreground">
                        {contributor.id}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-black text-emerald-600 leading-none">{contributor.totalSupplied}</p>
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase mt-1">{contributor.unit}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
