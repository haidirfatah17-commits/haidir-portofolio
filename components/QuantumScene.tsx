import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Stars, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

// 1. DYNAMIC NEON FLOATING PARTICLE
const FloatingOrb = ({ position, color, scale = 1, distort = 0.4, speed = 2 }: { position: [number, number, number]; color: string; scale?: number; distort?: number; speed?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      // Smooth hovering motion
      ref.current.position.y = position[1] + Math.sin(t * 1.5 + position[0]) * 0.25;
      ref.current.rotation.x = t * 0.3;
      ref.current.rotation.y = t * 0.25;
    }
  });

  return (
    <Sphere ref={ref} args={[1, 64, 64]} position={position} scale={scale}>
      <MeshDistortMaterial
        color={color}
        envMapIntensity={1.5}
        clearcoat={1}
        clearcoatRoughness={0.1}
        metalness={0.6}
        roughness={0.15}
        distort={distort}
        speed={speed}
      />
    </Sphere>
  );
};

// 2. ROTATING DESIGN ORBITS (Representing bezier handles and vectors)
const DesignerOrbits = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.y = t * 0.15;
      groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer cyan vector ring */}
      <Torus args={[2.8, 0.03, 16, 100]} rotation={[Math.PI / 2.5, 0, 0]}>
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.3} wireframe />
      </Torus>
      
      {/* Inner purple path ring */}
      <Torus args={[2.0, 0.02, 16, 80]} rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
        <meshBasicMaterial color="#a855f7" transparent opacity={0.3} wireframe />
      </Torus>

      {/* Blue horizon ring */}
      <Torus args={[3.5, 0.015, 8, 60]} rotation={[Math.PI / 6, -Math.PI / 5, 0]}>
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.2} wireframe />
      </Torus>
    </group>
  );
};

// 3. FULL BACKGROUND HERO 3D SCENE
export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#06b6d4" />
        <pointLight position={[-10, -10, -10]} intensity={1.0} color="#a855f7" />
        <spotLight position={[0, 8, 2]} angle={0.6} intensity={2} color="#3b82f6" />
        
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
          {/* Main shifting glass shape representing creative imagination */}
          <FloatingOrb position={[0, 0, 0]} color="#7c3aed" scale={1.2} distort={0.4} speed={1.5} />
          <DesignerOrbits />
        </Float>
        
        {/* Floating background design tokens */}
        <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1}>
          <FloatingOrb position={[-3.2, 1.2, -2]} color="#06b6d4" scale={0.45} distort={0.6} speed={3} />
          <FloatingOrb position={[3.2, -1.2, -3]} color="#3b82f6" scale={0.55} distort={0.5} speed={2} />
          <FloatingOrb position={[1.5, 2.2, -2.5]} color="#ec4899" scale={0.3} distort={0.3} speed={2} />
        </Float>

        <Stars radius={100} depth={50} count={600} factor={4} saturation={1} fade speed={1.5} />
      </Canvas>
    </div>
  );
};

// 4. INTERACTIVE 3D DESIGN STUDIO CANVAS (Crystalline Prism representing structure/layouts)
const InteractiveCrystal = () => {
  const crystalRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (crystalRef.current) {
      const t = state.clock.getElapsedTime();
      crystalRef.current.rotation.y = t * 0.25;
      crystalRef.current.rotation.x = t * 0.15;
      // Soft hovering
      crystalRef.current.position.y = Math.sin(t * 1.2) * 0.15;
    }
  });

  return (
    <Icosahedron ref={crystalRef} args={[1.2, 1]} position={[0, 0, 0]}>
      <meshStandardMaterial
        color="#3b82f6"
        wireframe
        transparent
        opacity={0.6}
        emissive="#1d4ed8"
        emissiveIntensity={0.5}
      />
    </Icosahedron>
  );
};

export const QuantumComputerScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#a855f7" />
        <pointLight position={[-5, -5, -5]} intensity={1.0} color="#22d3ee" />
        <spotLight position={[0, 5, 0]} intensity={2} color="#3b82f6" />
        
        <Float rotationIntensity={0.5} floatIntensity={0.3} speed={1.5}>
          {/* Icosahedron crystal representing 3D spatial alignment & structural grids */}
          <InteractiveCrystal />
          
          {/* Floating tiny satellites */}
          <mesh position={[1.8, 0.8, -0.5]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#22d3ee" />
          </mesh>
          <mesh position={[-1.8, -0.8, 0.5]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#a855f7" />
          </mesh>
        </Float>
        
        <Stars radius={50} depth={20} count={300} factor={3} saturation={0.5} fade speed={1} />
      </Canvas>
    </div>
  );
};
