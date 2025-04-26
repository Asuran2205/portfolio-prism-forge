
import { Github, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useRef } from 'react';
import Weather_app from '@/assets/images/weather-app.png';
import renteverything from '@/assets/images/renteverything.png';
import KidsWebsite from '@/assets/images/KidsWebsite.png';
import bmw_website from '@/assets/images/bmw_website.png';

const Projects = () => {
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      projectRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const projects = [
    {
      title: "BMW Future Drive",
      description: "BMW Future Drive is an interactive website showcasing futuristic car concepts, featuring sleek animations, dynamic scrolling, and detailed visual elements. It offers a modern, immersive experience focused on futuristic automotive design.",
      image: bmw_website,
      technologies: ["JavaScript", "API Integration", "HTML", "CSS"],
      github: "https://github.com/Asuran2205/bmw-future-drive",
      // demo: "https://gemini-clone.example.com",
      date: "April 2025"
    },
    {
      title: "RentEverthing.Shop",
      description: "Rent Everything is a responsive landing page for a rental marketplace platform. It includes animated sections, smooth navigation, and an interactive order form that lets users list products for rent. The design focuses on clarity, ease of use, and visual appeal to attract both renters and vendors.",
      image: renteverything,
      technologies: ["JavaScript", "API Integration", "HTML", "CSS"],
      github: "https://renteverythingshop.netlify.app/",
      // demo: "https://gemini-clone.example.com",
      date: "April 2025"
    },
    {
      title: "Kids Website",
      description: "A colorful and interactive website designed for children, featuring animated elements, playful UI, and engaging visuals. It offers an enjoyable browsing experience with smooth navigation and beginner-friendly content.",
      image: KidsWebsite,
      technologies: ["FrontEnd App"],
      github: "https://manojkumar0404.github.io/kids_website/",
      date: "March 2025"
    },
    {
      title: "Weather App",
      description: "This is a simple Weather App that allows users to check current weather conditions and a 24-hour forecast for any city. It leverages the WeatherAPI to fetch and display weather data based on user input or current location.",
      image: Weather_app,
      technologies: ["JavaScript", "API Integration", "HTML", "CSS"],
      github: "https://manojkumar0404.github.io/WEATHER-APP/",
      // demo: "https://gemini-clone.example.com",
      date: "Feb 2025"
    },
    {
      title: "Google Gemini Clone",
      description: "Gemini Clone is a web application that mimics a chat interface similar to Google's Gemini. It allows users to interact with a generative language model, view suggestions, and toggle between light and dark themes. The app fetches responses from a generative language API and displays them with a typing effect.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80",
      technologies: ["JavaScript", "React", "API Integration", "CSS"],
      github: "https://github.com/MANOJKUMAR0404/GOOGLE-GEMINI",
      // demo: "https://gemini-clone.example.com",
      date: "August 2024"
    },
    {
      title: "Polls App",
      description: "TrueVote is a simple Django polling application, following the official Django documentation tutorial. TrueVote allows users to view and vote on polls created by administrators. It includes functionality to display recent polls, view poll details, vote on choices, and see poll results.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80",
      technologies: ["Python", "Django", "HTML", "CSS"],
      github: "https://github.com/MANOJKUMAR0404/Polls_django",
      // demo: "https://polls.example.com",
      date: "June 2024"
    },
    {
      title: "EduSphere",
      description: "Developed Edusphere, an e-learning website using React, Django, and Bootstrap. Demonstrated expertise in creating intuitive interfaces, integrating backend functionalities, and ensuring a smooth user experience. Highlights proficiency in leveraging modern technologies for impactful online education solutions.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
      technologies: ["React", "Django", "Bootstrap", "PostgreSQL"],
      github: "https://github.com/MANOJKUMAR0404/Edusphere",
      // demo: "https://edusphere.example.com",
      date: "Mar 2024"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => (projectRefs.current[index] = el)}
              className="reveal"
            >
              <Card className="overflow-hidden transition-all duration-500 hover:shadow-xl h-full transform hover:scale-105 group">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                    <Badge variant="outline" className="text-xs bg-blue-50">{project.date}</Badge>
                  </div>
                  <CardDescription className="line-clamp-2 mt-1">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.map((tech, i) => (
                      <Badge 
                        key={i} 
                        variant="secondary" 
                        className="bg-gray-100 text-gray-800 transition-all duration-300 hover:bg-theme-blue hover:text-white"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-theme-blue flex items-center transform hover:translate-x-1 transition-transform"
                  >
                    <Github className="h-4 w-4 mr-1" /> Code
                  </a>
                  {/* <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-theme-blue flex items-center transform hover:translate-x-1 transition-transform"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" /> Live Demo
                  </a> */}
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
