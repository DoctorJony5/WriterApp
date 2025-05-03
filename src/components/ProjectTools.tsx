import { useState } from 'react';

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

interface ProjectNote {
  id: string;
  text: string;
  timestamp: Date;
}

interface ProjectToolsProps {
  onSave: (data: { todos: TodoItem[], notes: ProjectNote[] }) => void;
  initialTodos?: TodoItem[];
  initialNotes?: ProjectNote[];
}

export default function ProjectTools({ onSave, initialTodos = [], initialNotes = [] }: ProjectToolsProps) {
  const [activeTab, setActiveTab] = useState<'checklist' | 'notes'>('checklist');
  const [todos, setTodos] = useState<TodoItem[]>(initialTodos);
  const [notes, setNotes] = useState<ProjectNote[]>(initialNotes);
  const [newTodo, setNewTodo] = useState('');
  const [newNote, setNewNote] = useState('');

  const handleAddTodo = () => {
    if (!newTodo.trim()) return;
    
    const todo: TodoItem = {
      id: crypto.randomUUID(),
      text: newTodo.trim(),
      completed: false
    };
    
    const updatedTodos = [...todos, todo];
    setTodos(updatedTodos);
    setNewTodo('');
    onSave({ todos: updatedTodos, notes });
  };

  const handleToggleTodo = (id: string) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    onSave({ todos: updatedTodos, notes });
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    
    const note: ProjectNote = {
      id: crypto.randomUUID(),
      text: newNote.trim(),
      timestamp: new Date()
    };
    
    const updatedNotes = [note, ...notes];
    setNotes(updatedNotes);
    setNewNote('');
    onSave({ todos, notes: updatedNotes });
  };

  return (
    <div className="h-full flex flex-col border-l">
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab('checklist')}
          className={`flex-1 px-4 py-2 text-sm font-medium ${
            activeTab === 'checklist'
              ? 'border-b-2 border-blue-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Checklist
        </button>
        <button
          onClick={() => setActiveTab('notes')}
          className={`flex-1 px-4 py-2 text-sm font-medium ${
            activeTab === 'notes'
              ? 'border-b-2 border-blue-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Notes
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {activeTab === 'checklist' ? (
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
                placeholder="Add new task..."
                className="flex-1 p-2 border rounded"
              />
              <button
                onClick={handleAddTodo}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <ul className="space-y-2">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded"
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleTodo(todo.id)}
                    className="w-4 h-4"
                  />
                  <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                    {todo.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddNote()}
                placeholder="Add a note..."
                className="flex-1 p-2 border rounded"
              />
              <button
                onClick={handleAddNote}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <div className="space-y-3">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="p-3 bg-gray-50 dark:bg-gray-800 rounded"
                >
                  <p className="mb-2">{note.text}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(note.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}