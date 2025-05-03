import { useTheme } from '../themes/ThemeContext';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded-lg ${
          theme === 'light' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
        title="Light theme"
      >
        ☀️
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded-lg ${
          theme === 'dark' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
        title="Dark theme"
      >
        🌙
      </button>
      <button
        onClick={() => setTheme('blue')}
        className={`p-2 rounded-lg ${
          theme === 'blue' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
        title="Blue theme"
      >
        💧
      </button>
    </div>
  );
}