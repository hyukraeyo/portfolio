'use client';

import { projects } from '@/lib/data';
import Link from 'next/link';

export default function Projects() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Projects
        </h2>

        {/* Featured Projects */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64 bg-gradient-to-br from-blue-400 to-purple-500">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {project.title}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.liveUrl && (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Live Demo →
                    </Link>
                  )}
                  {project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-700 font-medium"
                    >
                      GitHub →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6">
            {otherProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.githubUrl && (
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    GitHub →
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

