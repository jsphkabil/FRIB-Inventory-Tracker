import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus } from 'lucide-react';
import { Location } from '../data/inventory';

interface AddItemDialogProps {
  locations: Location[];
  onAddItem: (name: string, count: number, location: string) => void;
}

export function AddItemDialog({ locations, onAddItem }: AddItemDialogProps) {
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [initialCount, setInitialCount] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!itemName.trim() || !initialCount || !selectedLocation) {
      return;
    }

    const count = parseInt(initialCount);
    if (isNaN(count) || count < 0) {
      return;
    }

    onAddItem(itemName.trim(), count, selectedLocation);
    
    // Reset form
    setItemName('');
    setInitialCount('');
    setSelectedLocation('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">
          <Plus className="w-4 h-4 mr-2" />
          Add New Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Inventory Item</DialogTitle>
            <DialogDescription>
              Add a new item to your IT inventory. Enter the item name and initial count.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="item-name">Item Name *</Label>
              <Input
                id="item-name"
                placeholder="e.g., Wireless Mouse"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="initial-count">Initial Count *</Label>
              <Input
                id="initial-count"
                type="number"
                min="0"
                placeholder="0"
                value={initialCount}
                onChange={(e) => setInitialCount(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="item-location">Location *</Label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation} required>
                <SelectTrigger id="item-location">
                  <SelectValue placeholder="Select a location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Item</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
