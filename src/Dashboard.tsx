import { useTheme, ThemeProvider } from '../themes/ThemeContext';
import { Link } from 'react-router-dom';

const dummyProjects = [
  { id: '1', title: 'Untitled Romance Story 003', type: 'Story', updated: 'May 3, 2025', minutes: 0 },
];

const Dashboard = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="p-6 text-left space-y-4">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Writing Projects</h1>
        <div className="flex gap-2">
          <button onClick={() => setTheme('light')} title="Light" className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700">🌞</button>
          <button onClick={() => setTheme('dark')} title="Dark" className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700">🌙</button>
          <button onClick={() => setTheme('blue')} title="Blue" className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-700">💧</button>
        </div>
      </header>

      <button className="px-4 py-2 bg-[var(--primary)] text-white rounded hover:bg-[var(--hover)] transition">
        Create New Project
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
        {dummyProjects.map((proj) => (
          <Link
            key={proj.id}
            to={`/project/${proj.id}`}
            className="border rounded-xl p-4 hover:shadow-lg transition bg-white dark:bg-gray-800 text-inherit"
          >
            <h2 className="text-xl font-semibold">{proj.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Last modified: {proj.updated}</p>
            <p className="text-sm">Time spent: {proj.minutes} minutes</p>
            <span className="mt-2 inline-block text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
              {proj.type}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
