
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Environment, MeshDistortMaterial, Torus, TorusKnot } from '@react-three/drei';
import { Group, Mesh } from 'three';
import { useIsMobile } from '@/hooks/use-mobile';

// Type definition for component props
type ThreeDObjectProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
};

// Futuristic Hologram Component
function FuturisticHologram({ position, rotation, scale }: ThreeDObjectProps) {
  const groupRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });
  
  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Central sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial 
          color="#4361ee" 
          metalness={1}
          roughness={0.2}
          emissive="#4361ee"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Orbiting torus */}
      <Torus args={[1.2, 0.08, 16, 60]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial 
          color="#60efff" 
          emissive="#60efff"
          emissiveIntensity={0.5}
          metalness={1}
          roughness={0.2}
        />
      </Torus>
      
      {/* Complex shape */}
      <TorusKnot args={[0.3, 0.1, 64, 8]} position={[0, 1.2, 0]}>
        <meshStandardMaterial 
          color="#ff3d81" 
          emissive="#ff3d81"
          emissiveIntensity={0.7}
          metalness={1}
          roughness={0.2}
        />
      </TorusKnot>
    </group>
  );
}

function CubeSphere({ position, rotation, scale }: ThreeDObjectProps) {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <sphereGeometry args={[0.7, 16, 16]} />
      <meshStandardMaterial 
        color="#4361ee" 
        wireframe
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

export const HeroModel = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="h-[280px] sm:h-[320px] lg:h-[380px] w-full rounded-xl overflow-hidden bg-gradient-to-br from-blue-900/10 to-indigo-900/10">
      <Canvas camera={{ position: [0, 0, isMobile ? 12 : 10], fov: isMobile ? 35 : 25 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#60efff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ff3d81" />
        <pointLight position={[0, 0, 0]} intensity={1} color="#4361ee" />
        
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={isMobile ? 1 : 1.5}>
          <FuturisticHologram position={[0, 0, 0]} scale={isMobile ? 0.8 : 1} />
        </Float>
        
        {!isMobile && (
          <>
            <CubeSphere position={[2, 1, -2]} />
            <CubeSphere position={[-2.5, 1, -1]} scale={0.6} />
          </>
        )}
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2.2}
        />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
};

export default HeroModel;
