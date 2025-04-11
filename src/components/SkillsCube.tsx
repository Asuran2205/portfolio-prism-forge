
import { useIsMobile } from '@/hooks/use-mobile';

type SkillItemProps = {
  skill: string;
  color: string;
};

const SkillItem = ({ skill, color }: SkillItemProps) => {
  return (
    <div 
      className="flex justify-center items-center p-4 rounded-lg shadow-md transition-transform hover:scale-105"
      style={{ backgroundColor: color }}
    >
      <span className="font-bold text-white text-lg">{skill}</span>
    </div>
  );
};

const SkillsCube = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="h-[250px] sm:h-[280px] md:h-[300px] w-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-indigo-900 p-4 flex items-center justify-center">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl">
        <SkillItem skill="React" color="#61DAFB" />
        <SkillItem skill="Django" color="#092E20" />
        <SkillItem skill="Python" color="#3776AB" />
        <SkillItem skill="JS" color="#F7DF1E" />
        <SkillItem skill="HTML" color="#E34F26" />
        <SkillItem skill="CSS" color="#1572B6" />
      </div>
    </div>
  );
};

export default SkillsCube;
