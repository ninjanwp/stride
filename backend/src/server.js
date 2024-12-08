require('dotenv').config();
const express = require('express');
const cors = require('cors');
const itemService = require('./services/itemService');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/boards/:boardId/items', async (req, res) => {
  try {
    const items = await itemService.getItems(req.params.boardId);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/items/:itemId/status', async (req, res) => {
  try {
    const item = await itemService.updateItemStatus(req.params.itemId, req.body.statusId);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/test-db', async (req, res) => {
  try {
    // First, let's check our environment variables
    const config = {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    };
    
    console.log('DB Config:', { ...config, password: '****' }); // Logs config without exposing password
    
    const result = await db.query('SELECT NOW()');
    res.json({
      successful_connection: true,
      message: 'Database connected successfully',
      timestamp: result.rows[0].now,
      config: { ...config, password: '****' }
    });
  } catch (err) {
    res.status(500).json({
      successful_connection: false,
      message: 'Database connection failed',
      error: err.message,
      stack: err.stack
    });
  }
});

app.get('/api/debug/tables', async (req, res) => {
  try {
    // Get all table names
    const tablesQuery = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `;
    const tables = await db.query(tablesQuery);
    
    // Get sample data from each table
    const result = {};
    for (const table of tables.rows) {
      const tableName = table.table_name;
      const dataQuery = `SELECT * FROM ${tableName} LIMIT 5`;
      const tableData = await db.query(dataQuery);
      
      result[tableName] = {
        count: tableData.rows.length,
        sample: tableData.rows
      };
    }
    
    res.json({
      database: process.env.DB_NAME,
      successful_connection: true,
      tableCount: tables.rows.length,
      tables: result
    });
  } catch (err) {
    res.status(500).json({
      successful_connection: false,
      message: 'Failed to fetch table information',
      error: err.message
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 