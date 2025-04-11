
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Group, Mesh } from 'three';
import { useIsMobile } from '@/hooks/use-mobile';

// Type definition for component props
type ThreeDObjectProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
};

// Developer character component
function DeveloperCharacter({ position, rotation, scale }: ThreeDObjectProps) {
  const groupRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });
  
  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Head */}
      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#f8d9c6" />
      </mesh>
      
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.4, 1, 16, 16]} />
        <meshStandardMaterial color="#1A1F2C" />
      </mesh>
      
      {/* Arms */}
      <mesh position={[-0.6, 0.1, 0]} rotation={[0, 0, -0.5]}>
        <capsuleGeometry args={[0.15, 0.7, 16, 16]} />
        <meshStandardMaterial color="#8E9196" />
      </mesh>
      <mesh position={[0.6, 0.1, 0]} rotation={[0, 0, 0.5]}>
        <capsuleGeometry args={[0.15, 0.7, 16, 16]} />
        <meshStandardMaterial color="#8E9196" />
      </mesh>
    </group>
  );
}

// Skill orb component
function SkillOrb({ position, rotation, scale, color, name }: ThreeDObjectProps & { color: string, name: string }) {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <sphereGeometry args={[0.4, 16, 16]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
      {/* Logo/icon representation */}
      <mesh position={[0, 0, 0.2]}>
        {name === "React" && (
          // React atom
          <torusGeometry args={[0.25, 0.05, 8, 20]} />
        )}
        {name === "Django" && (
          // Django simplified "D"
          <boxGeometry args={[0.2, 0.3, 0.05]} />
        )}
        {name === "MongoDB" && (
          // MongoDB leaf shape
          <sphereGeometry args={[0.2, 8, 8]} />
        )}
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </mesh>
  );
}

// Orbital path component
function OrbitalPath({ radius, color }: { radius: number, color: string }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  );
}

// Revolving skill component
function RevolvingSkill({ radius, speed, color, name }: { radius: number, speed: number, color: string, name: string }) {
  const groupRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * speed;
    }
  });
  
  return (
    <group ref={groupRef}>
      <SkillOrb 
        position={[radius, 0, 0]} 
        color={color} 
        name={name} 
      />
    </group>
  );
}

export const HeroModel = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="h-[280px] sm:h-[320px] lg:h-[380px] w-full rounded-xl overflow-hidden bg-gradient-to-br from-blue-900/10 to-indigo-900/10">
      <Canvas camera={{ position: [0, 1, isMobile ? 8 : 6], fov: isMobile ? 45 : 40 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[0, 0, 0]} intensity={0.5} color="#4361ee" />
        
        {/* Central developer character */}
        <DeveloperCharacter position={[0, -0.5, 0]} scale={isMobile ? 0.8 : 1} />
        
        {/* Orbital paths */}
        <OrbitalPath radius={2.5} color="#D3E4FD" />
        <OrbitalPath radius={3.5} color="#F2FCE2" />
        <OrbitalPath radius={4.5} color="#F97316" />
        
        {/* Revolving skills */}
        <RevolvingSkill radius={2.5} speed={0.5} color="#61DAFB" name="React" />
        <RevolvingSkill radius={3.5} speed={0.3} color="#092E20" name="Django" />
        <RevolvingSkill radius={4.5} speed={0.2} color="#F97316" name="MongoDB" />
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2.2}
          autoRotate
          autoRotateSpeed={0.5}
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default HeroModel;
