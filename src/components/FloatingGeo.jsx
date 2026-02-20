import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function FloatingGeo() {
    const groupRef = useRef();
    const innerRef = useRef();
    const outerRef = useRef();
    const [hovered, setHovered] = useState(false);
    const mouse = useRef({ x: 0, y: 0 });

    const { viewport } = useThree();

    useFrame((state) => {
        const time = state.clock.elapsedTime;

        // Track mouse position
        mouse.current.x = THREE.MathUtils.lerp(
            mouse.current.x,
            (state.pointer.x * viewport.width) / 6,
            0.05
        );
        mouse.current.y = THREE.MathUtils.lerp(
            mouse.current.y,
            (state.pointer.y * viewport.height) / 6,
            0.05
        );

        if (groupRef.current) {
            groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.15 + mouse.current.y * 0.1;
            groupRef.current.rotation.y = time * 0.15 + mouse.current.x * 0.1;
            groupRef.current.position.y = Math.sin(time * 0.4) * 0.3;
        }

        if (innerRef.current) {
            innerRef.current.rotation.x = time * 0.3;
            innerRef.current.rotation.z = time * 0.2;
        }

        if (outerRef.current) {
            outerRef.current.rotation.y = -time * 0.1;
            outerRef.current.rotation.z = time * 0.05;
        }
    });

    const scale = hovered ? 1.08 : 1;

    return (
        <group ref={groupRef} scale={scale}>
            {/* Inner solid icosahedron */}
            <mesh ref={innerRef}>
                <icosahedronGeometry args={[1.5, 1]} />
                <meshStandardMaterial
                    color="#7c3aed"
                    emissive="#7c3aed"
                    emissiveIntensity={0.3}
                    metalness={0.8}
                    roughness={0.2}
                    transparent
                    opacity={0.15}
                />
            </mesh>

            {/* Outer wireframe icosahedron */}
            <mesh
                ref={outerRef}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <icosahedronGeometry args={[2.2, 1]} />
                <meshStandardMaterial
                    color="#06b6d4"
                    emissive="#06b6d4"
                    emissiveIntensity={0.5}
                    wireframe
                    transparent
                    opacity={0.6}
                />
            </mesh>

            {/* Glowing center core */}
            <mesh>
                <sphereGeometry args={[0.3, 32, 32]} />
                <meshStandardMaterial
                    color="#ec4899"
                    emissive="#ec4899"
                    emissiveIntensity={2}
                    toneMapped={false}
                />
            </mesh>

            {/* Ring around the structure */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2.8, 0.015, 16, 100]} />
                <meshStandardMaterial
                    color="#7c3aed"
                    emissive="#7c3aed"
                    emissiveIntensity={1}
                    toneMapped={false}
                />
            </mesh>

            {/* Second ring at an angle */}
            <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
                <torusGeometry args={[3.2, 0.01, 16, 100]} />
                <meshStandardMaterial
                    color="#06b6d4"
                    emissive="#06b6d4"
                    emissiveIntensity={0.8}
                    transparent
                    opacity={0.5}
                    toneMapped={false}
                />
            </mesh>
        </group>
    );
}
