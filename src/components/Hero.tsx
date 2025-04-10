
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

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
    <section id="home" className="min-h-screen flex items-center relative pt-24 pb-16 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-blue-300 filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-purple-300 filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-pink-300 filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2 animate-fade-in [animation-delay:0.2s] opacity-0">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-blue-400 opacity-20 animate-pulse"></div>
              <div className="flex items-center mb-8 relative z-10">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-xl shadow-blue-200/50 float">
                  <img 
                    src="/lovable-uploads/30764350-52b7-4dba-bc8e-13e3f5f93409.png" 
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
            <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-6 flex items-center">
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
                <a href="/Manojkumar_Rajendran_Resume.pdf" download className="flex items-center">
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
          <div className="md:w-1/2 mt-8 md:mt-0 animate-fade-in [animation-delay:0.5s] opacity-0">
            <div className="glass-card p-8 relative card-3d shadow-2xl bg-white/40 backdrop-blur-md border border-white/80 rounded-2xl">
              <div className="absolute -right-6 -top-6 w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold rotate-12">
                <span>Pro</span>
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
                <p className="text-gray-600 py-1">Namakkal, Tamilnadu</p>
                <p className="text-gray-600 py-1">6383185800</p>
                <p className="text-gray-600 py-1">manojkumaroprofessional.com</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Professional Links</h3>
                <ul className="space-y-3">
                  <li>
                    <a 
                      href="https://portfolio.io/manojkumar" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="link-button flex items-center transform hover:translate-x-2 transition-transform text-blue-600 hover:text-indigo-600"
                    >
                      Portfolio
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://github.com/manojkumar" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="link-button flex items-center transform hover:translate-x-2 transition-transform text-blue-600 hover:text-indigo-600"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://linkedin.com/in/manojkumar" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="link-button flex items-center transform hover:translate-x-2 transition-transform text-blue-600 hover:text-indigo-600"
                    >
                      LinkedIn
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
