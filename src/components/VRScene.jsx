import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { VRButton, XR, Hands } from '@react-three/xr';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import { useRef } from 'react';

const SpinningBox = (props) => {
  const mesh = useRef();
  useFrame(() => (mesh.current.rotation.y += 0.01));
  return (
    <mesh {...props} ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

const VRExperience = () => {
  return (
    <>
      <VRButton />
      <Canvas style={{ height: '100vh', width: '100vw' }}>
        <XR>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          
          <Text
            position={[0, 2, -3]}
            fontSize={1}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            My Development Journey
          </Text>

          <SpinningBox position={[-2, 0, -5]} />
          <SpinningBox position={[2, 0, -5]} />

          <OrbitControls />
          <Hands />
          <Stars />
        </XR>
      </Canvas>
    </>
  );
};

export default VRExperience;
