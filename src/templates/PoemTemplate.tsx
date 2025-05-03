import { useState } from 'react';
import BaseTemplateComponent from './BaseTemplate';
import type { PoemTemplate } from '../types/templates';

interface PoemTemplateProps {
  template: PoemTemplate;
  onSave: (content: string, style: string | undefined, verses: number) => void;
}

export default function PoemTemplateComponent({ template, onSave }: PoemTemplateProps) {
  const [style, setStyle] = useState(template.style);
  const [verses, setVerses] = useState(template.verses);

  const handleSave = (content: string) => {
    // Count verses by line breaks
    const verseCount = content.split('\n\n').length;
    setVerses(verseCount);
    onSave(content, style, verseCount);
  };

  const poemStyles = [
    'Free Verse',
    'Haiku',
    'Sonnet',
    'Limerick',
    'Ballad',
    'Blank Verse'
  ];

  return (
    <div className="h-full grid grid-cols-[1fr_250px] gap-4">
      <BaseTemplateComponent
        template={template}
        onSave={handleSave}
      />
      <div className="border-l p-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Style</h2>
          <select
            value={style || ''}
            onChange={(e) => setStyle(e.target.value || undefined)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select style</option>
            {poemStyles.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Structure</h2>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            <p>Verses: {verses}</p>
            <p className="mt-2 italic">Separate verses with blank lines</p>
          </div>
        </div>
      </div>
    </div>
  );
}