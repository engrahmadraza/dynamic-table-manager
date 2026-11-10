# Dynamic Table Manager

An interactive, browser-based table builder. Users can create tables with custom columns, add and edit rows, mark fields as mandatory, and delete rows or tables, all without a page reload.

## Features

- Create tables with a custom name
- Define columns with three data types: **Text**, **Number**, and **Boolean**
- Add, remove, and rename columns before creating a table
- Mark columns as mandatory (`isMandatory`) for form validation
- Add a single row or multiple rows at once
- Edit existing rows through a modal
- Delete individual rows or entire tables, with a confirmation dialog
- Form validation with Bootstrap's `is-invalid` feedback styling

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES6+, DOM manipulation)
- Bootstrap 5.3.8 (CDN) for layout, components, and modals
- Font Awesome 6.5.1 (CDN), if icons are used

## Project Structure

```
dynamic-table-manager/
├── index.html      # Page layout and modals
├── main.js         # Application logic (table, column, and row management)
├── style.css       # Custom styles
```

## How It Works

1. **Table state:** All data is stored in a JavaScript array called `tables`. Each table has a name, a list of column definitions, and a list of row objects.
2. **Rendering:** The `display_table()` function rebuilds the table UI from the `tables` array every time data changes.
3. **Row forms:** `createFormRow()` generates input fields based on each column's type. Mandatory fields are marked with a red asterisk.
4. **Validation:** Fields are checked before saving, and invalid inputs get the `is-invalid` class.

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/dynamic-table-manager.git
   ```
2. Open the folder in VS Code.
3. Run the project with the **Live Server** extension, or open `index.html` directly in a browser.

> **Note:** Data is stored in memory only. Refreshing the page clears all tables and rows.

## Possible Improvements

- Persist data with `localStorage`
- Sort and filter rows
- Export tables to CSV or JSON

## License

Add a license here (for example, MIT).

## Author

**Your Name** · [GitHub](https://github.com/<engrahmadraza>)
