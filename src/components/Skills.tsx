
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useRef } from 'react';
import SkillsCube from './SkillsCube';

const Skills = () => {
  const skillRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    skillRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      skillRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const skillCategories = [
    {
      id: "languages",
      name: "Languages",
      skills: ["Python", "JavaScript", "HTML", "CSS", "SQL", "Verilog","C", "C++"]
    },
    {
      id: "frameworks",
      name: "Frameworks & Libraries",
      skills: ["Django", "React", "Bootstrap", "Blender"]
    },
    {
      id: "tools",
      name: "Tools & Technologies",
      skills: ["Git", "REST API", "PostgreSQL", "VS Code", "Digital Electronics"]
    },
    {
      id: "others",
      name: "Other Skills",
      skills: ["3D Design", "VFX/CGI Animation", "UI/UX Design", "Problem Solving"]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">Skills & Expertise</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1">
            <SkillsCube />
          </div>
          <div className="lg:col-span-2">
            <div className="glass-card p-6 h-full flex items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Technical Proficiency</h3>
                <p className="text-gray-600 mb-6">
                  With expertise in full-stack development using React, Django, and Python, 
                  I specialize in creating responsive, user-friendly applications. 
                  My background in 3D design and VFX animation complements my development skills, 
                  allowing me to build visually stunning digital experiences.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["React", "Django", "Python", "JavaScript", "3D Design"].map((skill, i) => (
                    <Badge key={i} className="px-3 py-1 bg-blue-100 text-blue-800 hover:bg-blue-200 transition-all">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="languages" className="mt-10">
          <TabsList className="flex justify-center mb-8 bg-white p-1 rounded-lg shadow-sm">
            {skillCategories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="px-4 py-2 data-[state=active]:bg-theme-blue data-[state=active]:text-white data-[state=active]:shadow-md rounded-md transition-all duration-300"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {skillCategories.map((category) => (
            <TabsContent 
              key={category.id} 
              value={category.id}
              className="animate-fade-in"
            >
              <div className="glass-card p-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {category.skills.map((skill, index) => (
                    <div 
                      key={index} 
                      ref={(el) => (skillRefs.current.push(el))}
                      className="reveal skill-item flex flex-col items-center justify-center p-4 rounded-lg bg-white shadow-sm border border-gray-100 hover:shadow-md transition-all hover:border-blue-200"
                      style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                    >
                      <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                        <span className="text-theme-blue font-bold text-lg">{skill.charAt(0)}</span>
                      </div>
                      <span className="font-medium text-gray-800">{skill}</span>
                      
                      {/* Skill progress bar */}
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                        <div 
                          className="bg-theme-blue h-1.5 rounded-full animated-gradient" 
                          style={{ 
                            width: `${Math.floor(70 + Math.random() * 30)}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Areas of Interest</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {["Full Stack Web Development", "3D Design", "VFX/CGI Animation"].map((interest, index) => (
              <Badge 
                key={index} 
                className="px-6 py-3 text-base bg-white border border-theme-blue text-theme-blue hover:bg-theme-blue hover:text-white transition-colors transform hover:scale-105 cursor-default"
              >
                {interest}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
