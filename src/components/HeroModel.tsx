
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Float, Environment } from '@react-three/drei';
import { Group, Mesh } from 'three';
import { useIsMobile } from '@/hooks/use-mobile';

// Remove any data-lov attributes from 3D components
function Laptop(props: {[key: string]: any}) {
  const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf');
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  // Clean up props by extracting only the ones needed for the group
  const { position, rotation, scale } = props;
  
  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <primitive object={scene} scale={0.6} position={[0, -1, 0]} />
    </group>
  );
}

function CubeSphere(props: {[key: string]: any}) {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  // Clean up props by extracting only the ones needed for the mesh
  const { position, rotation, scale } = props;

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <sphereGeometry args={[0.7, 16, 16]} />
      <meshStandardMaterial 
        color="#4361ee" 
        metalness={0.6}
        roughness={0.2}
        wireframe
      />
    </mesh>
  );
}

export const HeroModel = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="h-[280px] sm:h-[320px] lg:h-[380px] w-full rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
      <Canvas camera={{ position: [0, 0, isMobile ? 12 : 10], fov: isMobile ? 35 : 25 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={isMobile ? 1 : 1.5}>
          <Laptop position={[0, 0, 0]} scale={isMobile ? 0.8 : 1} />
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
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default HeroModel;
