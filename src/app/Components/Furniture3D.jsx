"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF } from "@react-three/drei";

function Model() {
  const gltf = useGLTF("/models/chair.glb"); 
  return <primitive object={gltf.scene} scale={1} />;
}

export default function Furniture3D() {
  return (
    <Canvas style={{ height: "500px", width: "100%" }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <Stage>
        <Model />
      </Stage>
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
