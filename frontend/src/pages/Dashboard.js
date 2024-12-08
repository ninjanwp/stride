import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Row, Col, Card } from 'react-bootstrap';

const BOARD_ID = 1; // You'll want to make this dynamic later

function Dashboard() {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: []
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/boards/${BOARD_ID}/items`);
      const items = await response.json();
      
      const organized = {
        todo: items.filter(item => item.status_name === 'To Do'),
        inProgress: items.filter(item => item.status_name === 'In Progress'),
        done: items.filter(item => item.status_name === 'Done')
      };
      
      setTasks(organized);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const updateItemStatus = async (itemId, statusId) => {
    try {
      await fetch(`http://localhost:3001/api/items/${itemId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ statusId }),
      });
    } catch (error) {
      console.error('Error updating item status:', error);
    }
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const items = Array.from(tasks[source.droppableId]);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      setTasks({
        ...tasks,
        [source.droppableId]: items
      });
    } else {
      const sourceItems = Array.from(tasks[source.droppableId]);
      const destItems = Array.from(tasks[destination.droppableId]);
      const [removedItem] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removedItem);

      setTasks({
        ...tasks,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destItems
      });
    }
  };

  return (
    <div>
      <h1 className="mb-4">Sprint Board</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Row>
          {['todo', 'inProgress', 'done'].map((column) => (
            <Col key={column} md={4}>
              <Card className="mb-4">
                <Card.Header>
                  {column === 'todo' && 'To Do'}
                  {column === 'inProgress' && 'In Progress'}
                  {column === 'done' && 'Done'}
                </Card.Header>
                <Card.Body>
                  <Droppable droppableId={column}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{ minHeight: '500px' }}
                      >
                        {tasks[column].map((task, index) => (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                          >
                            {(provided) => (
                              <Card
                                className="mb-2"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Card.Body>{task.content}</Card.Body>
                              </Card>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </DragDropContext>
    </div>
  );
}

export default Dashboard; 