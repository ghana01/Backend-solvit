import React, { useState } from 'react';
import { assignChore, completeChore } from '../services/choreService';

const Chores = () => {
  const [task, setTask] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleAssignChore = async () => {
    try {
      await assignChore({ task, assignedTo });
      alert('Chore assigned successfully');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Chores</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Assigned To"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button onClick={handleAssignChore} className="bg-blue-500 text-white p-2 rounded">
          Assign Chore
        </button>
      </div>
    </div>
  );
};

export default Chores;