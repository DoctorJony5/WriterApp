import { useState } from 'react';
import BaseTemplateComponent from './BaseTemplate';
import type { EssayTemplate } from '../types/templates';

interface EssayTemplateProps {
  template: EssayTemplate;
  onSave: (content: string, sources: EssayTemplate['sources']) => void;
}

export default function EssayTemplateComponent({ template, onSave }: EssayTemplateProps) {
  const [sources, setSources] = useState(template.sources);

  const handleAddSource = () => {
    setSources([...sources, { title: '', url: '', citations: [] }]);
  };

  const handleUpdateSource = (index: number, field: keyof typeof sources[0], value: string) => {
    const newSources = [...sources];
    newSources[index] = { ...newSources[index], [field]: value };
    setSources(newSources);
  };

  const handleSave = (content: string) => {
    onSave(content, sources);
  };

  return (
    <div className="h-full grid grid-cols-[1fr_300px] gap-4">
      <BaseTemplateComponent
        template={template}
        onSave={handleSave}
      />
      <div className="border-l p-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Sources</h2>
          <button
            onClick={handleAddSource}
            className="w-full px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded"
          >
            Add Source
          </button>
        </div>
        <div className="space-y-4">
          {sources.map((source, index) => (
            <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
              <input
                type="text"
                value={source.title}
                onChange={(e) => handleUpdateSource(index, 'title', e.target.value)}
                placeholder="Source title"
                className="w-full mb-2 p-2 border rounded"
              />
              <input
                type="url"
                value={source.url}
                onChange={(e) => handleUpdateSource(index, 'url', e.target.value)}
                placeholder="URL"
                className="w-full p-2 border rounded"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}