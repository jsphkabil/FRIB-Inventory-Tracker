import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Monitor, AlertCircle, Plus, Minus } from 'lucide-react';
import { InventoryItem } from '../data/inventory';
import { Alert, AlertDescription } from './ui/alert';

interface DeployComputerDialogProps {
  inventory: InventoryItem[];
  onDeploy: (deployments: { id: string; quantity: number }[]) => void;
}

interface DeploymentItem {
  id: string;
  name: string;
  isRequired?: boolean;
}

const DEPLOYMENT_ITEMS: DeploymentItem[] = [
  { id: 'keyboard', name: 'Keyboard', isRequired: true },
  { id: 'mouse', name: 'Mouse', isRequired: true },
  { id: 'mousepad', name: 'Mouse Pad' },
  { id: 'hdmi', name: 'HDMI Cable' },
  { id: 'display', name: 'Display Cable' },
  { id: 'power', name: 'Power Cable', isRequired: true },
  { id: 'ethernet', name: 'Ethernet Cable' },
  { id: 'monitor', name: 'Monitor' },
  { id: 'headset', name: 'Headset with Microphone' },
  { id: 'webcam', name: 'Webcam' },
  { id: 'usb-hub', name: 'USB Hub' },
  { id: 'laptop-bag', name: 'Laptop Bag' },
];

export function DeployComputerDialog({ inventory, onDeploy }: DeployComputerDialogProps) {
  const [open, setOpen] = useState(false);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [unavailableItems, setUnavailableItems] = useState<string[]>([]);

  const handleQuantityChange = (itemId: string, change: number) => {
    const deploymentItem = DEPLOYMENT_ITEMS.find(item => item.id === itemId);
    if (!deploymentItem) return;

    const inventoryItem = findInventoryItem(deploymentItem.name);
    if (!inventoryItem) return;

    const currentQty = quantities[itemId] || 0;
    const newQty = Math.max(0, Math.min(inventoryItem.count, currentQty + change));
    
    setQuantities(prev => ({
      ...prev,
      [itemId]: newQty
    }));
  };

  const findInventoryItem = (deploymentItemName: string): InventoryItem | undefined => {
    return inventory.find(item => 
      item.name.toLowerCase().includes(deploymentItemName.toLowerCase()) ||
      deploymentItemName.toLowerCase().includes(item.name.toLowerCase().split(' ')[0])
    );
  };

  const handleDeploy = () => {
    const deployments: { id: string; quantity: number }[] = [];
    const unavailable: string[] = [];

    Object.entries(quantities).forEach(([deploymentId, quantity]) => {
      if (quantity > 0) {
        const deploymentItem = DEPLOYMENT_ITEMS.find(item => item.id === deploymentId);
        if (deploymentItem) {
          const inventoryItem = findInventoryItem(deploymentItem.name);
          if (inventoryItem && inventoryItem.count >= quantity) {
            deployments.push({ id: inventoryItem.id, quantity });
          } else {
            unavailable.push(deploymentItem.name);
          }
        }
      }
    });

    if (unavailable.length > 0) {
      setUnavailableItems(unavailable);
      return;
    }

    if (deployments.length === 0) {
      return;
    }

    onDeploy(deployments);
    
    // Reset form
    setQuantities({});
    setUnavailableItems([]);
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      // Reset when closing
      setQuantities({});
      setUnavailableItems([]);
    }
  };

  const getItemAvailability = (deploymentItemName: string): { available: boolean; count: number } => {
    const inventoryItem = findInventoryItem(deploymentItemName);
    if (!inventoryItem) {
      return { available: false, count: 0 };
    }
    return { available: inventoryItem.count > 0, count: inventoryItem.count };
  };

  const totalItems = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="lg" variant="secondary">
          <Monitor className="w-4 h-4 mr-2" />
          Deploy Computer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Deploy New Computer</DialogTitle>
          <DialogDescription>
            Select the quantity of items being deployed with this computer. Required items are marked with an asterisk (*).
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {unavailableItems.length > 0 && (
            <Alert className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                The following items don't have enough stock: {unavailableItems.join(', ')}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
            {DEPLOYMENT_ITEMS.map((item) => {
              const { available, count } = getItemAvailability(item.name);
              const isDisabled = !available;
              const currentQty = quantities[item.id] || 0;
              
              return (
                <div 
                  key={item.id} 
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    isDisabled ? 'bg-muted/50 opacity-60' : currentQty > 0 ? 'bg-primary/5 border-primary' : 'hover:bg-muted/30'
                  }`}
                >
                  <div className="flex-1">
                    <Label className="text-sm font-medium leading-none">
                      {item.name}
                      {item.isRequired && <span className="text-destructive ml-1">*</span>}
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      {available ? `${count} available` : 'Out of stock'}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleQuantityChange(item.id, -1)}
                      disabled={isDisabled || currentQty === 0}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">
                      {currentQty}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleQuantityChange(item.id, 1)}
                      disabled={isDisabled || currentQty >= count}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            type="button" 
            onClick={handleDeploy}
            disabled={totalItems === 0}
          >
            Deploy ({totalItems} items)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}