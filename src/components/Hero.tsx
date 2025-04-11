import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import resume from '@/assets/Manojkumar_Resume.pdf'
import logo from '@/assets/images/profile_picture.jpeg'
import HeroModel from './HeroModel';
import AnimatedBackground from './AnimatedBackground';

const Hero = () => {
  const [typingText, setTypingText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const phrases = ["Full Stack Developer", "Python Expert", "React Developer", "Django Specialist"];
  const typingSpeed = 150;
  const deletingSpeed = 100;
  const pauseTime = 1500;

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentPhrase = phrases[currentPhraseIndex];
      
      if (!isDeleting) {
        setTypingText(currentPhrase.substring(0, typingText.length + 1));
        
        if (typingText === currentPhrase) {
          setIsDeleting(true);
          clearTimeout(timeout);
          setTimeout(() => {
            setIsDeleting(true);
          }, pauseTime);
        }
      } else {
        setTypingText(currentPhrase.substring(0, typingText.length - 1));
        
        if (typingText === '') {
          setIsDeleting(false);
          setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);
    
    return () => clearTimeout(timeout);
  }, [typingText, isDeleting, currentPhraseIndex, phrases]);

  return (
    <section id="home" className="min-h-screen flex items-center relative pt-24 pb-16 overflow-hidden">
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2 animate-fade-in [animation-delay:0.2s] opacity-0">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-blue-400 opacity-20 animate-pulse"></div>
              <div className="flex items-center mb-8 relative z-10">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-xl shadow-blue-200/50 float">
                  <img 
                    src={logo} 
                    alt="Manojkumar Rajendran" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-6">
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Manojkumar
                    <span className="block font-extrabold">Rajendran</span>
                  </h1>
                </div>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-6 flex">
              <span className="mr-2">I'm a</span>
              <span className="typing bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">{typingText}</span>
              <span className="animate-pulse text-purple-600">|</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl leading-relaxed">
              Passionate about building impactful web applications with Django and React. 
              From concept to deployment, I bring ideas to life with clean code and user-focused design.
            </p>
            <div className="flex flex-wrap gap-4 mb-10 md:mb-0">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <a href={resume} download className="flex items-center">
                  Download Resume
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-blue-400 text-blue-600 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all hover:bg-blue-50"
              >
                <a href="#contact" className="flex items-center">
                  Contact Me
                </a>
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 w-full mt-8 lg:mt-0 animate-fade-in [animation-delay:0.5s] opacity-0">
            <div className="glass-card p-6 lg:p-8 relative card-3d shadow-2xl bg-white/70 backdrop-blur-md border border-white/80 rounded-2xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-blue-500/20">
              <HeroModel />
              
              <div className="mt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
                <p className="text-gray-600 py-1">Namakkal, Tamilnadu</p>
                <p className="text-gray-600 py-1">6383185800</p>
                <p className="text-gray-600 py-1">manojkumar0professional.com</p>

                <h3 className="text-xl font-bold text-gray-800 mt-6 mb-4">Professional Links</h3>
                <ul className="space-y-3">
                  <li>
                    <a 
                      href="https://github.com/MANOJKUMAR0404" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="link-button flex items-center transform hover:translate-x-2 transition-transform text-blue-600 hover:text-indigo-600"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.linkedin.com/in/manojkumar-rajendran-909057185" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="link-button flex items-center transform hover:translate-x-2 transition-transform text-blue-600 hover:text-indigo-600"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.instagram.com/stu_developer/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="link-button flex items-center transform hover:translate-x-2 transition-transform text-blue-600 hover:text-indigo-600"
                    >
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#about" className="text-blue-500 hover:text-indigo-600 transition-colors">
            <div className="p-2 rounded-full bg-white/50 backdrop-blur-sm shadow-md">
              <ArrowDown size={32} />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
