import { useState, useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Card } from './components/ui/card';
import { Search, Package } from 'lucide-react';
import { InventoryCalculator } from './components/InventoryCalculator';
import { AddItemDialog } from './components/AddItemDialog';
import { DeployComputerDialog } from './components/DeployComputerDialog';
import { LOCATIONS, INITIAL_INVENTORY, InventoryItem } from './data/inventory';
import { toast } from 'sonner';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedItemId, setSelectedItemId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter items by location and search query
  const filteredItems = useMemo(() => {
    let items = inventory;

    if (selectedLocation) {
      items = items.filter(item => item.location === selectedLocation);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item => item.name.toLowerCase().includes(query));
    }

    return items;
  }, [inventory, selectedLocation, searchQuery]);

  const selectedItem = inventory.find(item => item.id === selectedItemId);

  const handleUpdateCount = (newCount: number) => {
    setInventory(prev => 
      prev.map(item => 
        item.id === selectedItemId 
          ? { ...item, count: newCount }
          : item
      )
    );
  };

  const handleAddItem = (name: string, count: number, location: string) => {
    const newItem: InventoryItem = {
      id: Date.now().toString(),
      name,
      count,
      location,
    };
    setInventory(prev => [...prev, newItem]);
    toast.success(`Added "${name}" to inventory`);
  };

  const handleDeleteItem = () => {
    const itemName = selectedItem?.name;
    setInventory(prev => prev.filter(item => item.id !== selectedItemId));
    setSelectedItemId('');
    toast.success(`Removed "${itemName}" from inventory`);
  };

  const handleDeploy = (deployments: { id: string; quantity: number }[]) => {
    const deployedItems: string[] = [];
    
    setInventory(prev => 
      prev.map(item => {
        const deployment = deployments.find(d => d.id === item.id);
        if (deployment) {
          deployedItems.push(`${item.name} (${deployment.quantity})`);
          return { ...item, count: Math.max(0, item.count - deployment.quantity) };
        }
        return item;
      })
    );

    const totalQty = deployments.reduce((sum, d) => sum + d.quantity, 0);
    toast.success(`Computer deployed with ${totalQty} items`, {
      description: deployedItems.join(', '),
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <Toaster />
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-semibold">IT Help Room Inventory</h1>
          <p className="text-muted-foreground">Track and manage IT equipment across all locations</p>
        </div>

        {/* Search and Filter Section */}
        <Card className="p-6">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {/* Search Bar */}
            <div className="space-y-2">
              <Label htmlFor="search">Search Items</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="search"
                  type="text"
                  placeholder="Type to search for items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Location Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="location">Filter by Location</Label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger id="location">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {LOCATIONS.map(location => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <DeployComputerDialog inventory={inventory} onDeploy={handleDeploy} />
            <AddItemDialog locations={LOCATIONS} onAddItem={handleAddItem} />
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Items List */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Available Items ({filteredItems.length})
            </h2>
            
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {filteredItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No items found. Try adjusting your search or filter.
                </div>
              ) : (
                filteredItems.map(item => {
                  const location = LOCATIONS.find(loc => loc.id === item.location);
                  const isSelected = item.id === selectedItemId;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedItemId(item.id)}
                      className={`w-full text-left p-4 rounded-lg border transition-colors ${
                        isSelected 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {location?.name}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold">{item.count}</div>
                          <div className="text-xs text-muted-foreground">in stock</div>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </Card>

          {/* Calculator Interface */}
          <div>
            {selectedItem ? (
              <InventoryCalculator
                itemName={selectedItem.name}
                currentCount={selectedItem.count}
                onUpdateCount={handleUpdateCount}
                onDeleteItem={handleDeleteItem}
              />
            ) : (
              <Card className="p-12 text-center">
                <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No Item Selected</h3>
                <p className="text-muted-foreground">
                  Select an item from the list to update its inventory count
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Summary Stats */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Inventory Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {LOCATIONS.map(location => {
              const locationItems = inventory.filter(item => item.location === location.id);
              const totalCount = locationItems.reduce((sum, item) => sum + item.count, 0);
              
              return (
                <div key={location.id} className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-semibold">{totalCount}</div>
                  <div className="text-sm text-muted-foreground mt-1">{location.name}</div>
                  <div className="text-xs text-muted-foreground">{locationItems.length} items</div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}