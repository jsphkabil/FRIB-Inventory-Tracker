export interface InventoryItem {
  id: string;
  name: string;
  count: number;
  location: string;
}

export interface Location {
  id: string;
  name: string;
}

export const LOCATIONS: Location[] = [
  { id: 'helpdesk', name: 'Help Desk' },
  { id: 'storage', name: 'Storage Room' },
  { id: 'lab1', name: 'Computer Lab 1' },
  { id: 'lab2', name: 'Computer Lab 2' },
  { id: 'server', name: 'Server Room' },
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  // Help Desk items
  { id: '1', name: 'Wireless Mouse', count: 15, location: 'helpdesk' },
  { id: '2', name: 'USB Keyboard', count: 12, location: 'helpdesk' },
  { id: '3', name: 'HDMI Cable (6ft)', count: 8, location: 'helpdesk' },
  { id: '4', name: 'USB-C Charger', count: 10, location: 'helpdesk' },
  { id: '5', name: 'Laptop Bag', count: 5, location: 'helpdesk' },
  
  // Storage Room items
  { id: '6', name: 'Dell Monitor 24"', count: 20, location: 'storage' },
  { id: '7', name: 'HP Monitor 27"', count: 15, location: 'storage' },
  { id: '8', name: 'Ethernet Cable (25ft)', count: 30, location: 'storage' },
  { id: '9', name: 'Power Strip 6-outlet', count: 18, location: 'storage' },
  { id: '10', name: 'Extension Cord', count: 12, location: 'storage' },
  
  // Computer Lab 1 items
  { id: '11', name: 'Wireless Adapter', count: 25, location: 'lab1' },
  { id: '12', name: 'Webcam HD', count: 8, location: 'lab1' },
  { id: '13', name: 'Headset with Microphone', count: 10, location: 'lab1' },
  { id: '14', name: 'USB Hub 4-port', count: 6, location: 'lab1' },
  
  // Computer Lab 2 items
  { id: '15', name: 'VGA Cable', count: 14, location: 'lab2' },
  { id: '16', name: 'DVI Cable', count: 10, location: 'lab2' },
  { id: '17', name: 'Display Port Cable', count: 8, location: 'lab2' },
  { id: '18', name: 'Laptop Stand', count: 12, location: 'lab2' },
  
  // Server Room items
  { id: '19', name: 'Cat6 Ethernet Cable (3ft)', count: 50, location: 'server' },
  { id: '20', name: 'Network Switch 24-port', count: 4, location: 'server' },
  { id: '21', name: 'Rack Mount Kit', count: 6, location: 'server' },
  { id: '22', name: 'UPS Battery Backup', count: 8, location: 'server' },
  { id: '23', name: 'Server Rails', count: 10, location: 'server' },
];
