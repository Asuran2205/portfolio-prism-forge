
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import { Group } from 'three';
import { useIsMobile } from '@/hooks/use-mobile';

type SkillFaceProps = { 
  position: [number, number, number];
  rotation: [number, number, number];
  skill: string;
  color: string;
};

const SkillFace = ({ position, rotation, skill, color }: SkillFaceProps) => {
  const groupRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.scale.x = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.04;
      groupRef.current.scale.y = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.04;
    }
  });

  return (
    <group position={position} rotation={rotation} ref={groupRef}>
      <mesh>
        <boxGeometry args={[2, 2, 0.1]} />
        <MeshWobbleMaterial 
          color={color} 
          transparent 
          opacity={0.9} 
          factor={0.1}
          speed={2}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.2}
        />
        <Html 
          position={[0, 0, 0.06]} 
          center
          distanceFactor={10}
          transform
          occlude
        >
          <div className="flex justify-center items-center w-[100px] h-[100px] text-white font-bold text-lg select-none">
            {skill}
          </div>
        </Html>
      </mesh>
    </group>
  );
};

const RotatingCube = () => {
  const groupRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <SkillFace position={[0, 0, 1]} rotation={[0, 0, 0]} skill="React" color="#61DAFB" />
      <SkillFace position={[0, 0, -1]} rotation={[0, Math.PI, 0]} skill="Django" color="#092E20" />
      <SkillFace position={[1, 0, 0]} rotation={[0, Math.PI / 2, 0]} skill="Python" color="#3776AB" />
      <SkillFace position={[-1, 0, 0]} rotation={[0, -Math.PI / 2, 0]} skill="JS" color="#F7DF1E" />
      <SkillFace position={[0, 1, 0]} rotation={[-Math.PI / 2, 0, 0]} skill="HTML" color="#E34F26" />
      <SkillFace position={[0, -1, 0]} rotation={[Math.PI / 2, 0, 0]} skill="CSS" color="#1572B6" />

      {/* Orbiting particles */}
      <group>
        {[...Array(8)].map((_, i) => (
          <mesh 
            key={i} 
            position={[
              Math.sin(i * Math.PI / 4) * 2.5, 
              Math.cos(i * Math.PI / 4) * 2.5, 
              0
            ]}
            scale={0.1}
          >
            <sphereGeometry args={[1, 16, 16]} />
            <MeshDistortMaterial 
              color={i % 2 ? "#61DAFB" : "#F7DF1E"} 
              speed={4}
              distort={0.5} 
              emissive={i % 2 ? "#61DAFB" : "#F7DF1E"}
              emissiveIntensity={1}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};

const SkillsCube = () => {
  const isMobile = useIsMobile();

  return (
    <div className="h-[250px] sm:h-[280px] md:h-[300px] w-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-indigo-900">
      <Canvas camera={{ position: [0, 0, isMobile ? 6 : 5], fov: isMobile ? 60 : 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#61DAFB" />
        <RotatingCube />
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={isMobile ? 0.3 : 0.5}
        />
      </Canvas>
    </div>
  );
};

export default SkillsCube;
