
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { Group } from 'three';

const SkillFace = ({ position, rotation, skill, color }: { 
  position: [number, number, number], 
  rotation: [number, number, number], 
  skill: string,
  color: string
}) => {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[2, 2, 0.1]} />
        <meshStandardMaterial color={color} transparent opacity={0.8} />
        <Html 
          position={[0, 0, 0.06]} 
          center
          distanceFactor={10}
          transform
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
    </group>
  );
};

const SkillsCube = () => {
  return (
    <div className="h-[300px] w-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-indigo-900">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <RotatingCube />
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default SkillsCube;
