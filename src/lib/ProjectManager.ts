import type { BaseTemplate, EssayTemplate, StoryTemplate, PoemTemplate, DiaryTemplate } from '../types/templates';

type ProjectType = EssayTemplate | StoryTemplate | PoemTemplate | DiaryTemplate;

class ProjectManager {
  private readonly STORAGE_KEY = 'writer-app-projects';

  getProjects(): ProjectType[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored, (key, value) => {
      if (key === 'lastModified') return new Date(value);
      return value;
    });
  }

  saveProject(project: ProjectType) {
    const projects = this.getProjects();
    const index = projects.findIndex(p => p.id === project.id);
    
    if (index >= 0) {
      projects[index] = {
        ...project,
        lastModified: new Date()
      };
    } else {
      projects.push({
        ...project,
        lastModified: new Date()
      });
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));
    return project;
  }

  deleteProject(id: string) {
    const projects = this.getProjects();
    const filtered = projects.filter(p => p.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
  }

  createProject(type: ProjectType['type'], title: string): ProjectType {
    const baseProject: BaseTemplate = {
        id: crypto.randomUUID(),
        title,
        content: '',
        lastModified: new Date(),
        timeSpent: 0,
        type: type // Add the type here
      };
      

    switch (type) {
      case 'essay':
        return {
          ...baseProject,
          type,
          sources: []
        };
      case 'story':
        return {
          ...baseProject,
          type,
          characters: [],
          worldBuilding: {}
        };
      case 'poem':
        return {
          ...baseProject,
          type,
          verses: 0
        };
      case 'diary':
        return {
          ...baseProject,
          type,
          tags: []
        };
      default:
        throw new Error(`Invalid project type: ${type}`);
    }
  }
}

export const projectManager = new ProjectManager();