import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getChores, assignChore } from "../api/api";

const Chores = () => {
  const dispatch = useDispatch();
  const [chores, setChores] = useState([]);
  const [newChore, setNewChore] = useState({ task: "", assignee: "" });

  useEffect(() => {
    const fetchChores = async () => {
      try {
        const response = await getChores();
        setChores(response.data);
      } catch (error) {
        console.error("Error fetching chores:", error);
      }
    };
    fetchChores();
  }, []);

  const handleAssignChore = async (e) => {
    e.preventDefault();
    try {
      await assignChore(newChore);
      setNewChore({ task: "", assignee: "" });
      const response = await getChores();
      setChores(response.data);
    } catch (error) {
      console.error("Error assigning chore:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Chore System</h1>
      <form onSubmit={handleAssignChore} className="bg-white p-6 rounded-lg shadow mb-6">
        <input
          type="text"
          value={newChore.task}
          onChange={(e) => setNewChore({ ...newChore, task: e.target.value })}
          placeholder="Chore Name"
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="text"
          value={newChore.assignee}
          onChange={(e) => setNewChore({ ...newChore, assignee: e.target.value })}
          placeholder="Assignee"
          className="w-full p-2 border rounded mb-4"
        />
        <button type="submit" className="bg-purple-500 text-white p-2 rounded hover:bg-purple-600">
          Assign Chore
        </button>
      </form>
      <ul>
        {chores.map((chore) => (
          <li key={chore._id} className="text-gray-600">{chore.task} - {chore.assignee}</li>
        ))}
      </ul>
    </div>
  );
};

export default Chores;