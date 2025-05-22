import { useEffect, useState } from 'react';
import { db } from './firebase';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc
} from 'firebase/firestore';

function App() {
  const [planes, setPlanes] = useState([]);
  const [newPlane, setNewPlane] = useState('');
  const [newCountry, setNewCountry] = useState('');
  const [editId, setEditId] = useState(null);
  const [editPlane, setEditPlane] = useState('');
  const [editCountry, setEditCountry] = useState('');

  const planesRef = collection(db, 'planes');

  const fetchPlanes = async () => {
    const data = await getDocs(planesRef);
    setPlanes(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  const addPlane = async () => {
    if (!newPlane || !newCountry) return;
    await addDoc(planesRef, {
      name: newPlane,
      country: newCountry
    });
    setNewPlane('');
    setNewCountry('');
    fetchPlanes();
  };

  const deletePlane = async (id) => {
    await deleteDoc(doc(db, 'planes', id));
    fetchPlanes();
  };

  const startEdit = (plane) => {
    setEditId(plane.id);
    setEditPlane(plane.name);
    setEditCountry(plane.country);
  };

  const updatePlane = async () => {
    if (!editPlane || !editCountry) return;
    await updateDoc(doc(db, 'planes', editId), {
      name: editPlane,
      country: editCountry
    });
    setEditId(null);
    setEditPlane('');
    setEditCountry('');
    fetchPlanes();
  };

  useEffect(() => {
    fetchPlanes();
  }, []);

  return (
    <div className="app">
      <h1>WWII Planes</h1>

      <input
        placeholder="Plane name"
        value={newPlane}
        onChange={(e) => setNewPlane(e.target.value)}
      />
      <input
        placeholder="Country"
        value={newCountry}
        onChange={(e) => setNewCountry(e.target.value)}
      />
      <button onClick={addPlane}>Add Plane</button>

      <ul>
        {planes.map((plane) => (
          <li key={plane.id}>
            {editId === plane.id ? (
              <>
                <input
                  value={editPlane}
                  onChange={(e) => setEditPlane(e.target.value)}
                />
                <input
                  value={editCountry}
                  onChange={(e) => setEditCountry(e.target.value)}
                />
                <button onClick={updatePlane}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </>
            ) : (
              <>
                ✈️ <strong>{plane.name}</strong> - {plane.country}
                <button onClick={() => startEdit(plane)}>Edit</button>
              </>
            )}
            <button onClick={() => deletePlane(plane.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
