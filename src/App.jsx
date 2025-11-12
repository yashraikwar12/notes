import { useEffect, useState } from "react";

function App() {
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!topic.trim() || !notes.trim()) return;

    if (editIndex !== null) {
      const updated = [...data];
      updated[editIndex] = { topic, notes };
      setData(updated);
      setEditIndex(null);
    } else {
      setData([...data, { topic, notes }]);
    }

    setTopic("");
    setNotes("");
  };

  const handleDelete = (id) => {
    setData(data.filter((_, index) => index !== id));
    setTopic('')
    setNotes('')
  };

  const handleEdit = (id) => {
    const { topic, notes } = data[id];
    setTopic(topic);
    setNotes(notes);
    setEditIndex(id);
  };

  return (
    <div className="w-screen min-h-screen flex flex-col md:flex-row bg-gray-800 text-white p-8 gap-10">
      {/* Left Section - Form */}
      <div className="md:w-1/2 w-full">
        <h1 className="text-3xl font-semibold mb-8">Notes App</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-md">
          <input
            type="text"
            placeholder="Enter topic here..."
            className="outline-none border-b border-gray-500 bg-transparent p-3"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />

          <textarea
            placeholder="Enter note here..."
            className="outline-none border-b border-gray-500 bg-transparent p-3 h-[20vh] resize-none overflow-auto"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-white text-gray-800 px-6 py-2 rounded font-medium active:scale-95 self-start"
          >
            {editIndex !== null ? "Update Note" : "Add Note"}
          </button>
        </form>
      </div>

      {/* Right Section - Notes List */}
      <div className="md:w-1/2 w-full">
        {data.length > 0 ? (
          <h2 className="text-2xl  font-semibold mb-6">Recent Notes</h2>
        ) : (
          <h2 className="text-2xl  font-semibold mb-6">No Notes yet !!!</h2>
        )}

        <div className="flex flex-col gap-4">
          {data.map((val, index) => (
            <div
              key={index}
              className="relative bg-gray-700 rounded p-6 w-full md:w-[90%] lg:w-[80%]"
            >
              <h3 className="text-xl font-semibold mb-2 wrap-break-word pr-20">
                {val.topic}
              </h3>
              <p className="text-base mb-4 wrap-break-word pr-20">
                <span className="font-medium">Notes:</span>{" "}
                <span className="font-thin">{val.notes}</span>
              </p>

              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-gray-800 px-4 py-1 rounded text-sm active:scale-95"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-gray-800 px-4 py-1 rounded text-sm active:scale-95"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
