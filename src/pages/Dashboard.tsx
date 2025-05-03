import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { projectManager } from '../lib/ProjectManager';
import type { EssayTemplate, StoryTemplate, PoemTemplate, DiaryTemplate } from '../types/templates';
import ThemeSwitcher from '../components/ThemeSwitcher';

type ProjectType = EssayTemplate | StoryTemplate | PoemTemplate | DiaryTemplate;

export default function Dashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectType, setNewProjectType] = useState<'essay' | 'story' | 'poem' | 'diary'>('essay');

  useEffect(() => {
    setProjects(projectManager.getProjects());
  }, []);

  const handleCreateProject = () => {
    if (!newProjectTitle.trim()) return;

    const project = projectManager.createProject(newProjectType, newProjectTitle.trim());
    projectManager.saveProject(project);
    setProjects(projectManager.getProjects());
    setShowNewProjectModal(false);
    setNewProjectTitle('');
  };

  const handleDeleteProject = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this project?')) {
      projectManager.deleteProject(projectId);
      setProjects(projectManager.getProjects());
    }
  };

  const getProjectIcon = (type: ProjectType['type']) => {
    switch (type) {
      case 'essay': return '📝';
      case 'story': return '📚';
      case 'poem': return '🎭';
      case 'diary': return '📔';
      default: return '📄';
    }
  };

  return (
    <div className="p-6">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Writing Projects</h1>
        <ThemeSwitcher />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => navigate(`/project/${project.id}`)}
            className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
          >
            <button
              onClick={(e) => handleDeleteProject(e, project.id)}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              title="Delete project"
            >
              ×
            </button>
            <div className="aspect-video bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-4xl">
              {getProjectIcon(project.type)}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                <p>Last modified: {format(project.lastModified, 'MMM d, yyyy')}</p>
                <p>Time spent: {Math.round(project.timeSpent / 60)} minutes</p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
                </p>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={() => setShowNewProjectModal(true)}
          className="aspect-video flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
        >
          <span className="text-gray-600 dark:text-gray-300">Create New Project</span>
        </button>
      </div>

      {showNewProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Create New Project</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="projectTitle" className="block text-sm font-medium mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  id="projectTitle"
                  value={newProjectTitle}
                  onChange={(e) => setNewProjectTitle(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Enter project title"
                />
              </div>
              <div>
                <label htmlFor="projectType" className="block text-sm font-medium mb-1">
                  Project Type
                </label>
                <select
                  id="projectType"
                  value={newProjectType}
                  onChange={(e) => setNewProjectType(e.target.value as any)}
                  className="w-full p-2 border rounded"
                >
                  <option value="essay">Essay</option>
                  <option value="story">Story</option>
                  <option value="poem">Poem</option>
                  <option value="diary">Diary</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setShowNewProjectModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateProject}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  disabled={!newProjectTitle.trim()}
                >
                  Create Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}