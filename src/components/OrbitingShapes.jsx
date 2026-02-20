import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function OrbitingShape({ geometry, color, radius, speed, offset, size }) {
    const meshRef = useRef();

    useFrame((state) => {
        const time = state.clock.elapsedTime;
        const angle = time * speed + offset;

        if (meshRef.current) {
            meshRef.current.position.x = Math.cos(angle) * radius;
            meshRef.current.position.z = Math.sin(angle) * radius;
            meshRef.current.position.y = Math.sin(angle * 1.5 + offset) * 1.5;
            meshRef.current.rotation.x = time * 0.5;
            meshRef.current.rotation.y = time * 0.3;
        }
    });

    return (
        <mesh ref={meshRef} scale={size}>
            {geometry}
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.4}
                wireframe
                transparent
                opacity={0.5}
            />
        </mesh>
    );
}

export default function OrbitingShapes() {
    return (
        <group>
            <OrbitingShape
                geometry={<torusKnotGeometry args={[0.4, 0.15, 64, 8, 2, 3]} />}
                color="#7c3aed"
                radius={6}
                speed={0.2}
                offset={0}
                size={0.8}
            />
            <OrbitingShape
                geometry={<octahedronGeometry args={[0.5]} />}
                color="#06b6d4"
                radius={8}
                speed={0.15}
                offset={Math.PI * 0.7}
                size={0.7}
            />
            <OrbitingShape
                geometry={<dodecahedronGeometry args={[0.4]} />}
                color="#ec4899"
                radius={10}
                speed={0.1}
                offset={Math.PI * 1.4}
                size={0.6}
            />
            <OrbitingShape
                geometry={<tetrahedronGeometry args={[0.4]} />}
                color="#6366f1"
                radius={7}
                speed={0.25}
                offset={Math.PI * 0.3}
                size={0.5}
            />
        </group>
    );
}
