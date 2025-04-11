
import { useIsMobile } from '@/hooks/use-mobile';

export const HeroModel = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="h-[280px] sm:h-[320px] lg:h-[380px] w-full rounded-xl overflow-hidden bg-gradient-to-br from-blue-900/10 to-indigo-900/10 flex items-center justify-center">
      <div className="glass-card p-6 rounded-lg bg-white/30 backdrop-blur-sm border border-white/50 text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-3">Full Stack Developer</h3>
        <p className="text-gray-700">
          Specializing in React, Django, and MongoDB
        </p>
      </div>
    </div>
  );
};

export default HeroModel;
