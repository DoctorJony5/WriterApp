import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectManager } from '../lib/ProjectManager';
import type { EssayTemplate, StoryTemplate, PoemTemplate, DiaryTemplate } from '../types/templates';
import EssayTemplateComponent from '../templates/EssayTemplate';
import StoryTemplateComponent from '../templates/StoryTemplate';
import PoemTemplateComponent from '../templates/PoemTemplate';
import DiaryTemplateComponent from '../templates/DiaryTemplate';
import ThemeSwitcher from '../components/ThemeSwitcher';

type ProjectType = EssayTemplate | StoryTemplate | PoemTemplate | DiaryTemplate;

export default function Editor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectType | null>(null);

  useEffect(() => {
    if (!id) return;
    const projects = projectManager.getProjects();
    const found = projects.find(p => p.id === id);
    if (found) {
      setProject(found as ProjectType);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  if (!project) {
    return <div className="p-6">Loading...</div>;
  }

  const handleSave = (content: string, additionalData?: any) => {
    const updatedProject = {
      ...project,
      content,
      ...additionalData
    };
    projectManager.saveProject(updatedProject);
  };

  const renderTemplate = () => {
    switch (project.type) {
      case 'essay':
        return (
          <EssayTemplateComponent
            template={project}
            onSave={(content, sources) => handleSave(content, { sources })}
          />
        );
      case 'story':
        return (
          <StoryTemplateComponent
            template={project}
            onSave={(content, characters, worldBuilding) =>
              handleSave(content, { characters, worldBuilding })
            }
          />
        );
      case 'poem':
        return (
          <PoemTemplateComponent
            template={project}
            onSave={(content, style, verses) =>
              handleSave(content, { style, verses })
            }
          />
        );
      case 'diary':
        return (
          <DiaryTemplateComponent
            template={project}
            onSave={(content, mood, tags) =>
              handleSave(content, { mood, tags })
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <nav className="bg-white dark:bg-gray-800 border-b px-4 py-2 flex justify-between items-center">
        <button
          onClick={() => navigate('/')}
          className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
        >
          ← Back to Dashboard
        </button>
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold">{project?.title}</h1>
          <ThemeSwitcher />
        </div>
      </nav>
      <main className="flex-1 overflow-hidden">
        {renderTemplate()}
      </main>
    </div>
  );
}