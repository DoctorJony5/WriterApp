import { useEffect, useState } from 'react';
import { BaseTemplate } from '../types/templates';
import RichTextEditor from '../components/RichTextEditor';
import ProjectTools from '../components/ProjectTools';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { useTimeTracking } from '../hooks/useTimeTracking';
import { format } from 'date-fns';

interface TemplateProps {
  template: BaseTemplate;
  onSave: (content: string, metadata?: any) => void;
}



export default function BaseTemplateComponent({ template, onSave }: TemplateProps) {
  const [content, setContent] = useState(template.content);
  const [lastSaved, setLastSaved] = useState(format(new Date(), 'MMMM dd, yyyy'));
  const [wordCount, setWordCount] = useState(0);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showTools, setShowTools] = useState(false);

  const timeSpent = useTimeTracking(template.timeSpent, (newTime) => {
    onSave(content);
    template.timeSpent = newTime;
  });

  useEffect(() => {
    const textContent = content.replace(/<[^>]+>/g, '').trim();
    const words = textContent.split(/\s+/).length;
    setWordCount(words || 0);
  }, [content]);

  const handleSave = () => {
    onSave(content);
    setLastSaved(format(new Date(), 'MMMM dd, yyyy'));
  };

  const handleToolsUpdate = (toolsData: any) => {
    onSave(content, { tools: toolsData });
  };

  useKeyboardShortcuts([
    {
      key: 's',
      ctrl: true,
      handler: () => handleSave(),
      preventDefault: true
    },
    {
      key: '?',
      shift: true,
      handler: () => setShowShortcuts(true),
      preventDefault: true
    },
    {
      key: 't',
      ctrl: true,
      handler: () => setShowTools(prev => !prev),
      preventDefault: true
    },
    {
      key: 'Escape',
      handler: () => {
        setShowShortcuts(false);
        setShowTools(false);
      }
    }
  ]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <div>
          <h1 className="text-2xl font-bold">{template.title}</h1>
          <div className="text-sm text-gray-500 space-y-1">
            <p>Last saved: {lastSaved.toLocaleString()}</p>
            <p>Time spent: {Math.floor(timeSpent / 60)}m {timeSpent % 60}s</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Words: {wordCount}</span>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={() => setShowTools(prev => !prev)}
            className={`p-2 rounded ${
              showTools ? 'bg-gray-200 dark:bg-gray-700' : 'text-gray-600 hover:text-gray-800'
            }`}
            title="Toggle Tools (Ctrl+T)"
          >
            🛠️
          </button>
          <button
            onClick={() => setShowShortcuts(true)}
            className="p-2 text-gray-600 hover:text-gray-800"
            title="Show Keyboard Shortcuts"
          >
            ?
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        <div className={`flex-1 ${showTools ? 'w-2/3' : 'w-full'} transition-all duration-300`}>
          <div className="h-full p-4">
            <RichTextEditor
              content={content}
              onChange={setContent}
              placeholder="Start writing..."
            />
          </div>
        </div>
        
        {showTools && (
          <div className="w-1/3 border-l">
            <ProjectTools
              onSave={handleToolsUpdate}
              initialTodos={template.tools?.todos || []}
              initialNotes={template.tools?.notes || []}
            />
          </div>
        )}
      </div>

      {showShortcuts && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Keyboard Shortcuts</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Save</span>
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Ctrl + S</kbd>
              </div>
              <div className="flex justify-between">
                <span>Bold</span>
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Ctrl + B</kbd>
              </div>
              <div className="flex justify-between">
                <span>Italic</span>
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Ctrl + I</kbd>
              </div>
              <div className="flex justify-between">
                <span>Underline</span>
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Ctrl + U</kbd>
              </div>
              <div className="flex justify-between">
                <span>Show/Hide Shortcuts</span>
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Shift + ?</kbd>
              </div>
            </div>
            <div className="mt-6 text-right">
              <button
                onClick={() => setShowShortcuts(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}