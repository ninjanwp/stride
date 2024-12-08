const db = require('../db');

const getItems = async (boardId) => {
  const query = `
    SELECT i.*, s.name as status_name, m.first_name, m.last_name
    FROM item i
    JOIN status s ON i.status_id = s.id
    JOIN member m ON i.assigned_to_id = m.id
    WHERE i.board_id = $1
  `;
  const result = await db.query(query, [boardId]);
  return result.rows;
};

const updateItemStatus = async (itemId, statusId) => {
  const query = `
    UPDATE item 
    SET status_id = $1
    WHERE id = $2
    RETURNING *
  `;
  const result = await db.query(query, [statusId, itemId]);
  return result.rows[0];
};

module.exports = {
  getItems,
  updateItemStatus,
}; 