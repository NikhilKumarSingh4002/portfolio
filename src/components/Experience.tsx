import { Canvas } from '@react-three/fiber'
import { Environment, Float, MeshTransmissionMaterial } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'

interface FloatingShapeProps {
    position: [number, number, number]
    color: string
    speed?: number
    rotationIntensity?: number
    floatIntensity?: number
}

function FloatingShape({ position, color, speed = 1, rotationIntensity = 1, floatIntensity = 1 }: FloatingShapeProps) {
    const geometry = useMemo(() => {
        const geometries = [
            new THREE.IcosahedronGeometry(1, 0),
            new THREE.OctahedronGeometry(1, 0),
            new THREE.TorusGeometry(0.8, 0.2, 16, 50),
        ]
        return geometries[Math.floor(Math.random() * geometries.length)]
    }, [])

    return (
        <Float speed={speed} rotationIntensity={rotationIntensity} floatIntensity={floatIntensity} position={position}>
            <mesh geometry={geometry}>
                <MeshTransmissionMaterial
                    backside
                    samples={16}
                    thickness={0.2}
                    chromaticAberration={0.05}
                    anisotropy={0.1}
                    distortion={0.1}
                    distortionScale={0.1}
                    temporalDistortion={0.1}
                    clearcoat={1}
                    attenuationDistance={0.5}
                    attenuationColor={color}
                    color={color}
                    background={new THREE.Color('#000000')}
                />
            </mesh>
        </Float>
    )
}

export default function Experience() {
    return (
        <Canvas camera={{ position: [0, 0, 15], fov: 30 }}>
            {/* Lights */}
            <ambientLight intensity={1.5} />
            <directionalLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
            <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ff0000" />
            <Environment preset="city" />

            {/* Floating Objects */}
            <group>
                <FloatingShape position={[-3, 2, 0]} color="#0aff99" speed={1.5} rotationIntensity={1.5} floatIntensity={2} />
                <FloatingShape position={[3, -2, -2]} color="#ff0055" speed={2} rotationIntensity={1} floatIntensity={1.5} />
                <FloatingShape position={[0, 4, -5]} color="#00ccff" speed={1.2} rotationIntensity={2} floatIntensity={1} />
                <FloatingShape position={[-4, -3, 2]} color="#ffffff" speed={1.8} rotationIntensity={1.2} floatIntensity={1.8} />
                <FloatingShape position={[4, 3, 1]} color="#ffcc00" speed={1.4} rotationIntensity={1.8} floatIntensity={1.2} />
            </group>
        </Canvas>
    )
}
