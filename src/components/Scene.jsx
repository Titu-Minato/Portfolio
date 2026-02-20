import { Canvas } from "@react-three/fiber";
import ParticleField from "./ParticleField";
import FloatingGeo from "./FloatingGeo";
import OrbitingShapes from "./OrbitingShapes";

export default function Scene() {
    return (
        <div className="canvas-container interactive">
            <Canvas
                camera={{ position: [0, 0, 12], fov: 60 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
                style={{ background: "transparent" }}
            >
                {/* Lighting */}
                <ambientLight intensity={0.15} />
                <directionalLight
                    position={[5, 5, 5]}
                    intensity={0.5}
                    color="#7c3aed"
                />
                <directionalLight
                    position={[-5, -3, -5]}
                    intensity={0.3}
                    color="#06b6d4"
                />
                <pointLight position={[0, 0, 0]} intensity={1.5} color="#ec4899" distance={8} />
                <pointLight position={[5, 3, -3]} intensity={0.5} color="#7c3aed" distance={15} />
                <pointLight position={[-4, -2, 4]} intensity={0.4} color="#06b6d4" distance={12} />

                {/* Fog for depth */}
                <fog attach="fog" args={["#050510", 15, 50]} />

                {/* 3D Elements */}
                <FloatingGeo />
                <OrbitingShapes />
                <ParticleField count={600} />
            </Canvas>
        </div>
    );
}
