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

interface ProjectTools {
  todos: TodoItem[];
  notes: ProjectNote[];
}

export interface BaseTemplate {
  id: string;
  title: string;
  content: string;
  lastModified: Date;
  timeSpent: number;
  type: 'essay' | 'story' | 'poem' | 'diary';
  tools?: ProjectTools;
}

export interface EssayTemplate extends BaseTemplate {
  type: 'essay';
  sources: Array<{
    title: string;
    url: string;
    citations: string[];
  }>;
}

export interface StoryTemplate extends BaseTemplate {
  type: 'story';
  characters: Array<{
    name: string;
    description: string;
    imageUrl?: string;
  }>;
  worldBuilding: Record<string, string>;
}

export interface PoemTemplate extends BaseTemplate {
  type: 'poem';
  style?: string;
  verses: number;
}

export interface DiaryTemplate extends BaseTemplate {
  type: 'diary';
  mood?: string;
  tags: string[];
}