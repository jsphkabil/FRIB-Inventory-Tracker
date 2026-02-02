  # Helproom Inventory Management Program (Python)
  **All files in python_app folder**

  A desktop application for tracking IT equipment across multiple locations, built with Python, Tkinter, and SQLite.

  ## Features
  - View Inventory: Browse all items with search and location filtering
  - Update Counts: Use +/- buttons or type directly to update item quantities
  - Add Items: Add new items to any location
  - Delete Items: Remove items from inventory with confirmation
  - Deploy Computer: Subtract multiple items at once when setting up a new computer
  - Summary Stats: View total counts per location at a glance

  ## Upcoming Features
  - Item History
  - Expected Count
  - Low Item Report
  - Create Report
  - Auto-refresh

  ## Requirements 
  - Python 3.10 or higher
  - No additional packages requires (uses only standard library)

  ## Running the Application
  ```bash
  cd python_app
  python inventory_app.py
  ```
## Detailed Instructions
On GitHub repo click green 'Code' button > Download ZIP > Unzip > Type and enter 'cmd' in address bar(while in the folder path) >
In terminal enter 'cd python_app' > In terminal enter 'python inventory_app.py'

## Database

The application uses SQLite and automatically creates an `inventory.db` file in the same directory on first run. The database is seeded with sample data including:

- 5 locations (Help Desk, Storage Room, Computer Lab 1 & 2, Server Room)
- 23 inventory items across all locations

To reset the database, simply delete the `inventory.db` file and restart the application.

## Project Structure

```
python_app/
├── inventory_app.py   # Main application with Tkinter GUI
├── database.py        # SQLite database operations
├── requirements.txt   # Dependencies (standard library only)
└── README.md          # This file
```
  
  # Inventory Tracker App (React web-app)

  **Current version along with current setup instructions given above and in python_app folder**
  
  
  This is a code bundle for Inventory Tracker App. The original project is available at https://www.figma.com/design/TMlsMJG48JqFNrJ863EuXq/Inventory-Tracker-App.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Detailed Instructions
  - Node.js must be installed: https://nodejs.org

  Click green 'Code' button > Download ZIP > Unzip > Open a terminal inside the unzipped project folder by typing and entering 'cmd' in the address bar
  > Run 'npm i' then 'npm run dev' in terminal > Open the given link in your browser.
