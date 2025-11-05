import { skills } from '@/lib/data';

export default function Skills() {
  const skillCategories = {
    frontend: skills.filter((s) => s.category === 'frontend'),
    tools: skills.filter((s) => s.category === 'tools'),
  };

  const levelColors = {
    expert: 'bg-green-500',
    advanced: 'bg-blue-500',
    intermediate: 'bg-yellow-500',
    beginner: 'bg-gray-400',
  };

  return (
    <section id="skills" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Skills
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Frontend
            </h3>
            <div className="space-y-4">
              {skillCategories.frontend.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-900">
                      {skill.name}
                    </span>
                    <span className="text-sm text-gray-600 capitalize">
                      {skill.level}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        levelColors[skill.level]
                      }`}
                      style={{
                        width:
                          skill.level === 'expert'
                            ? '100%'
                            : skill.level === 'advanced'
                              ? '80%'
                              : skill.level === 'intermediate'
                                ? '60%'
                                : '40%',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Tools & Others
            </h3>
            <div className="space-y-4">
              {skillCategories.tools.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-900">
                      {skill.name}
                    </span>
                    <span className="text-sm text-gray-600 capitalize">
                      {skill.level}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        levelColors[skill.level]
                      }`}
                      style={{
                        width:
                          skill.level === 'expert'
                            ? '100%'
                            : skill.level === 'advanced'
                              ? '80%'
                              : skill.level === 'intermediate'
                                ? '60%'
                                : '40%',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

