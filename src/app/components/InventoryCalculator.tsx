import { useState, useEffect } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';

interface InventoryCalculatorProps {
  itemName: string;
  currentCount: number;
  onUpdateCount: (newCount: number) => void;
  onDeleteItem: () => void;
}

export function InventoryCalculator({ itemName, currentCount, onUpdateCount, onDeleteItem }: InventoryCalculatorProps) {
  const [newCount, setNewCount] = useState(currentCount);

  // Sync with currentCount when it changes externally
  useEffect(() => {
    setNewCount(currentCount);
  }, [currentCount]);

  const handleIncrement = () => {
    setNewCount(prev => prev + 1);
  };

  const handleDecrement = () => {
    setNewCount(prev => Math.max(0, prev - 1));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty string for clearing, otherwise parse as number
    if (value === '') {
      setNewCount(0);
    } else {
      const parsed = parseInt(value, 10);
      if (!isNaN(parsed) && parsed >= 0) {
        setNewCount(parsed);
      }
    }
  };

  const handleUpdate = () => {
    onUpdateCount(newCount);
  };

  const hasChanges = newCount !== currentCount;

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Header with item name and delete button */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-semibold text-xl">{itemName}</h3>
            <p className="text-muted-foreground mt-1">Current Count: <span className="font-semibold text-foreground">{currentCount}</span></p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                <Trash2 className="w-5 h-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Item?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{itemName}" from the inventory? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDeleteItem} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* Plus/Minus Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            size="lg"
            onClick={handleDecrement}
            className="h-14 text-2xl"
          >
            <Minus className="w-6 h-6" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={handleIncrement}
            className="h-14 text-2xl"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>

        {/* New Count Input */}
        <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
          <span className="font-medium text-muted-foreground">New Count:</span>
          <Input
            type="number"
            min="0"
            value={newCount}
            onChange={handleInputChange}
            className="w-24 text-center text-lg font-semibold"
          />
        </div>

        {/* Update Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleUpdate}
            disabled={!hasChanges}
            size="lg"
          >
            Update Count
          </Button>
        </div>
      </div>
    </Card>
  );
}