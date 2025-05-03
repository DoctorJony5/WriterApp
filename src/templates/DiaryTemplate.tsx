import { useState } from 'react';
import BaseTemplateComponent from './BaseTemplate';
import type { DiaryTemplate } from '../types/templates';

interface DiaryTemplateProps {
  template: DiaryTemplate;
  onSave: (content: string, mood: string | undefined, tags: string[]) => void;
}

export default function DiaryTemplateComponent({ template, onSave }: DiaryTemplateProps) {
  const [mood, setMood] = useState(template.mood);
  const [tags, setTags] = useState(template.tags);
  const [newTag, setNewTag] = useState('');

  const moods = [
    '😊 Happy',
    '😔 Sad',
    '😌 Calm',
    '😤 Angry',
    '🤔 Thoughtful',
    '😴 Tired',
    '😃 Excited',
    '😰 Anxious'
  ];

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = (content: string) => {
    onSave(content, mood, tags);
  };

  return (
    <div className="h-full grid grid-cols-[1fr_250px] gap-4">
      <BaseTemplateComponent
        template={template}
        onSave={handleSave}
      />
      <div className="border-l p-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Mood</h2>
          <select
            value={mood || ''}
            onChange={(e) => setMood(e.target.value || undefined)}
            className="w-full p-2 border rounded"
          >
            <option value="">How are you feeling?</option>
            {moods.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Tags</h2>
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm flex items-center gap-1"
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              placeholder="Add a tag"
              className="flex-1 p-2 border rounded"
            />
            <button
              onClick={handleAddTag}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}