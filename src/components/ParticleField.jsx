import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ParticleField({ count = 800 }) {
    const mesh = useRef();

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        const colors = new Float32Array(count * 3);

        const palette = [
            new THREE.Color("#7c3aed"),
            new THREE.Color("#06b6d4"),
            new THREE.Color("#ec4899"),
            new THREE.Color("#6366f1"),
            new THREE.Color("#8b5cf6"),
        ];

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            // Spread particles in a large sphere
            const radius = 15 + Math.random() * 35;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi);

            sizes[i] = Math.random() * 3 + 0.5;

            const color = palette[Math.floor(Math.random() * palette.length)];
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
        }

        return { positions, sizes, colors };
    }, [count]);

    useFrame((state) => {
        if (!mesh.current) return;
        const time = state.clock.elapsedTime;
        mesh.current.rotation.y = time * 0.02;
        mesh.current.rotation.x = Math.sin(time * 0.01) * 0.1;

        const posArray = mesh.current.geometry.attributes.position.array;
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            posArray[i3 + 1] += Math.sin(time * 0.3 + i * 0.01) * 0.003;
        }
        mesh.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={particles.positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={particles.colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                vertexColors
                transparent
                opacity={0.7}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}
