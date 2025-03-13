import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import ExcelJS from 'exceljs';
import path from 'path';

// Connect to SQLite Database
const dbPath = path.resolve('warehouse.db');

async function connectDB() {
  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
}

// Import Data from Excel
async function importExcel() {
  const db = await connectDB();
  const workbook = new ExcelJS.Workbook();

  try {
    // Load Excel file
    await workbook.xlsx.readFile('assignment_data.xlsx');

    // Log the sheet names for confirmation
    console.log('✅ Available Sheets:', workbook.worksheets.map((ws) => ws.name));

    // Helper function to insert data
    const insertData = async (query, values) => {
      try {
        await db.run(query, values);
      } catch (error) {
        console.error('❌ Insert Error:', error.message);
      }
    };

    // Function to process sheets
    const processSheet = (sheetName, insertQuery, mapRowValues) => {
      const sheet = workbook.getWorksheet(sheetName);

      if (!sheet) {
        console.error(`❌ Worksheet "${sheetName}" not found`);
        return;
      }

      sheet.eachRow(async (row, rowNumber) => {
        if (rowNumber > 1) {
          const values = mapRowValues(row.values.slice(1));

          // Ensure all values are defined before inserting
          if (values.every((val) => val !== undefined)) {
            await insertData(insertQuery, values);
          } else {
            console.warn(`❗ Skipping incomplete row in "${sheetName}":`, values);
          }
        }
      });
    };

    // Ensure correct sheet names
    const comparisonSheetName = workbook.getWorksheet('2') ? '2' : workbook.worksheets[0].name;
    const productSheetName = workbook.getWorksheet('6') ? '6' : workbook.worksheets[1].name;
    const salesSheetName = workbook.getWorksheet('4') ? '4' : workbook.worksheets[2].name;

    // Process Comparison Data
    processSheet(
      comparisonSheetName,
      'INSERT INTO comparison (month, last_year, this_year) VALUES (?, ?, ?)',
      (values) => values.slice(0, 3)
    );

    // Process Products Data
    processSheet(
      productSheetName,
      'INSERT INTO products (product, sold_amount, unit_price, revenue, rating) VALUES (?, ?, ?, ?, ?)',
      (values) => values.slice(0, 5)
    );

    // Process Sales Data
    processSheet(
      salesSheetName,
      'INSERT INTO sales (date, web_sales, offline_sales) VALUES (?, ?, ?)',
      (values) => values.slice(0, 3)
    );

    console.log('✅ Excel data imported successfully!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await db.close();
  }
}

importExcel();
