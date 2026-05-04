import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshDistortMaterial, MeshTransmissionMaterial } from '@react-three/drei';

function AbstractShapes() {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.05;
    groupRef.current.rotation.x = t * 0.02;
  });

  return (
    <group ref={groupRef}>
      {/* Central Complex Shape */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[0, 0, 0]} scale={1.5}>
          <torusKnotGeometry args={[1, 0.3, 256, 64]} />
          <MeshTransmissionMaterial 
            backside
            samples={4}
            thickness={1}
            roughness={0.1}
            chromaticAberration={1}
            anisotropy={0.3}
            distortion={0.5}
            distortionScale={0.5}
            temporalDistortion={0.1}
            color="#6fa87a"
          />
        </mesh>
      </Float>

      {/* Floating Orbs */}
      <Float speed={2} rotationIntensity={2} floatIntensity={3}>
        <mesh position={[-4, 2, -2]} scale={0.8}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial 
            color="#ffffff"
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0}
            metalness={0.8}
            roughness={0.2}
            distort={0.4}
            speed={2}
          />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[4, -2, -3]} scale={1.2}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial 
            color="#1a1a1a"
            metalness={0.9}
            roughness={0.1}
            wireframe
          />
        </mesh>
      </Float>
      
      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[-2, -3, 1]} scale={0.5}>
          <octahedronGeometry args={[1, 0]} />
          <MeshTransmissionMaterial 
            thickness={0.5}
            roughness={0}
            transmission={1}
            ior={1.5}
            color="#528c5e"
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function Background3D() {
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#6fa87a" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#ffffff" />
        <spotLight position={[0, 5, 0]} intensity={2} penumbra={1} color="#528c5e" />
        
        <AbstractShapes />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
