import { useState, useEffect } from 'react';

function Home() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [editId, setEditId] = useState(null);

  // Fetch items on mount
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/items');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;

    if (editId) {
      // Update item
      try {
        const response = await fetch(`http://localhost:5000/api/items/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title }),
        });
        if (response.ok) {
          const updatedItem = await response.json();
          setItems(items.map((item) => (item.id === editId ? updatedItem : item)));
          setTitle('');
          setEditId(null);
        }
      } catch (error) {
        console.error('Error updating item:', error);
      }
    } else {
      // Create item
      try {
        const response = await fetch('http://localhost:5000/api/items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title }),
        });
        if (response.ok) {
          const newItem = await response.json();
          setItems([...items, newItem]);
          setTitle('');
        }
      } catch (error) {
        console.error('Error creating item:', error);
      }
    }
  };

  const handleEdit = (item) => {
    setTitle(item.title);
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/items/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setItems(items.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Simple CRUD App</h1>
      
      {/* Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <button type="submit">
          {editId ? 'Update' : 'Add'}
        </button>
      </form>

      {/* List */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map((item) => (
          <li key={item.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}>
            {item.title}
            <button onClick={() => handleEdit(item)} style={{ marginLeft: '10px' }}>
              Edit
            </button>
            <button onClick={() => handleDelete(item.id)} style={{ marginLeft: '10px' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;