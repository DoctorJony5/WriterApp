import { useState } from 'react';
import BaseTemplateComponent from './BaseTemplate';
import type { StoryTemplate } from '../types/templates';

interface StoryTemplateProps {
  template: StoryTemplate;
  onSave: (
    content: string,
    characters: StoryTemplate['characters'],
    worldBuilding: StoryTemplate['worldBuilding']
  ) => void;
}

export default function StoryTemplateComponent({ template, onSave }: StoryTemplateProps) {
  const [characters, setCharacters] = useState(template.characters);
  const [worldBuilding, setWorldBuilding] = useState(template.worldBuilding);
  const [activeTab, setActiveTab] = useState<'characters' | 'world'>('characters');

  const handleAddCharacter = () => {
    setCharacters([...characters, { name: '', description: '' }]);
  };

  const handleUpdateCharacter = (
    index: number,
    field: keyof (typeof characters)[0],
    value: string
  ) => {
    const updated = [...characters];
    updated[index] = { ...updated[index], [field]: value };
    setCharacters(updated);
  };

  const handleAddWorldDetail = () => {
    const key = `Detail ${Object.keys(worldBuilding).length + 1}`;
    setWorldBuilding({ ...worldBuilding, [key]: '' });
  };

  const handleUpdateWorldDetail = (key: string, value: string) => {
    setWorldBuilding({ ...worldBuilding, [key]: value });
  };

  const handleSave = (content: string) => {
    onSave(content, characters, worldBuilding);
  };

  return (
    <div className="h-full grid grid-cols-[1fr_300px] gap-4">
      <BaseTemplateComponent template={template} onSave={handleSave} />

      <div className="border-l p-4 overflow-y-auto">
        {/* Tabs */}
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setActiveTab('characters')}
            className={`px-3 py-2 rounded ${
              activeTab === 'characters'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
            }`}
          >
            Characters
          </button>
          <button
            onClick={() => setActiveTab('world')}
            className={`px-3 py-2 rounded ${
              activeTab === 'world'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
            }`}
          >
            World
          </button>
        </div>

        {/* Content */}
        {activeTab === 'characters' ? (
          <div className="space-y-4">
            <button
              onClick={handleAddCharacter}
              className="w-full px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded"
            >
              Add Character
            </button>
            {characters.map((character, index) => (
              <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                <input
                  type="text"
                  value={character.name}
                  onChange={(e) => handleUpdateCharacter(index, 'name', e.target.value)}
                  placeholder="Character name"
                  className="w-full mb-2 p-2 border rounded"
                />
                <textarea
                  value={character.description}
                  onChange={(e) => handleUpdateCharacter(index, 'description', e.target.value)}
                  placeholder="Character description"
                  className="w-full p-2 border rounded h-24 resize-none"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <button
              onClick={handleAddWorldDetail}
              className="w-full px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded"
            >
              Add World Detail
            </button>
            {Object.entries(worldBuilding).map(([key, value]) => (
              <div key={key} className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                <input
                  type="text"
                  value={key}
                  placeholder="Detail name"
                  className="w-full mb-2 p-2 border rounded"
                  readOnly
                />
                <textarea
                  value={value}
                  onChange={(e) => handleUpdateWorldDetail(key, e.target.value)}
                  placeholder="Detail description"
                  className="w-full p-2 border rounded h-24 resize-none"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
