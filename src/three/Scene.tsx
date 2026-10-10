import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useIsWebGLAvailable } from '@/lib/useIsWebGLAvailable'
import { useReducedMotion } from '@/lib/useReducedMotion'

// One row per year of my career (2017 → 2026), one column per week.
const ROWS = 10
const COLS = 52
const GAP = 0.2
const COUNT = ROWS * COLS

const BASE = new THREE.Color('#1f1f1c')
const MID = new THREE.Color('#6f8a1c')
const HOT = new THREE.Color('#d4ff3a')
const EMBER = new THREE.Color('#ff6a3d')

/** Deterministic pseudo-random so the "history" is identical on every visit. */
function hash(i: number) {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

function Terrain() {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const color = useMemo(() => new THREE.Color(), [])
  const target = useRef(new THREE.Vector3())
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), [])
  const ray = useMemo(() => new THREE.Raycaster(), [])

  // Activity grows over the years — later rows are denser, like a real career.
  const activity = useMemo(() => {
    const a = new Float32Array(COUNT)
    for (let r = 0; r < ROWS; r++) {
      const growth = 0.25 + (r / (ROWS - 1)) * 0.75
      for (let c = 0; c < COLS; c++) {
        const n = hash(r * COLS + c)
        a[r * COLS + c] = n < 0.18 ? 0 : Math.pow(n, 1.6) * growth
      }
    }
    return a
  }, [])

  useFrame((state) => {
    if (!mesh.current) return
    const { pointer, camera } = state
    const t = state.clock.elapsedTime

    ray.setFromCamera(pointer, camera)
    const hit = new THREE.Vector3()
    if (ray.ray.intersectPlane(plane, hit)) target.current.lerp(hit, 0.08)

    const w = (COLS - 1) * GAP
    const d = (ROWS - 1) * GAP
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const i = r * COLS + c
        const x = c * GAP - w / 2
        const z = r * GAP - d / 2
        const dist = Math.hypot(x - target.current.x, z - target.current.z)
        const lift = Math.max(0, 1 - dist / 1.4)
        const wave = Math.sin(c * 0.25 - t * 1.2 + r * 0.6) * 0.5 + 0.5
        // A slow "deploy" sweep travels across the weeks.
        const sweep = Math.max(0, 1 - Math.abs(((t * 6) % (COLS + 20)) - 10 - c) / 4)
        const h = 0.04 + activity[i] * 0.9 + wave * 0.08 + lift * lift * 0.9 + sweep * 0.25 * (activity[i] > 0 ? 1 : 0.3)

        dummy.position.set(x, h / 2, z)
        dummy.scale.set(1, h, 1)
        dummy.updateMatrix()
        mesh.current.setMatrixAt(i, dummy.matrix)

        const k = Math.min(1, activity[i] * 1.1 + lift * 0.9 + sweep * 0.5)
        if (k < 0.5) color.copy(BASE).lerp(MID, k * 2)
        else color.copy(MID).lerp(HOT, (k - 0.5) * 2)
        if (lift > 0.75) color.lerp(EMBER, (lift - 0.75) * 2)
        mesh.current.setColorAt(i, color)
      }
    }
    mesh.current.instanceMatrix.needsUpdate = true
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true

    // Gentle camera drift that follows the pointer.
    camera.position.x += (pointer.x * 1.2 - camera.position.x) * 0.03
    camera.position.y += (4.2 + pointer.y * 0.6 - camera.position.y) * 0.03
    camera.lookAt(0, 0, 0)
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]}>
      <boxGeometry args={[GAP * 0.78, 1, GAP * 0.78]} />
      <meshStandardMaterial roughness={0.45} metalness={0.1} />
    </instancedMesh>
  )
}

function StaticFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="grid grid-cols-[repeat(26,minmax(0,1fr))] gap-1 opacity-60 [transform:perspective(800px)_rotateX(55deg)]">
        {Array.from({ length: 26 * 6 }, (_, i) => (
          <span
            key={i}
            className="h-3 w-3 rounded-[2px]"
            style={{ background: hash(i) > 0.55 ? '#d4ff3a' : hash(i) > 0.3 ? '#4d5f14' : '#1f1f1c' }}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * Hero backdrop: my career rendered as a 3D contribution graph — ten rows of
 * years, fifty-two weeks each. Bars rise toward the pointer and a deploy
 * sweep rolls across. Falls back to a flat CSS grid without WebGL or when
 * reduced motion is requested.
 */
export function Scene({ className }: { className?: string }) {
  const webgl = useIsWebGLAvailable()
  const reduced = useReducedMotion()

  if (!webgl || reduced) {
    return (
      <div className={className}>
        <StaticFallback />
      </div>
    )
  }

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 4.2, 6.2], fov: 40 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <fog attach="fog" args={['#0b0b0a', 6, 12]} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 8, 3]} intensity={1.6} />
        <pointLight position={[-4, 2, -2]} intensity={6} color="#d4ff3a" distance={10} />
        <Terrain />
      </Canvas>
    </div>
  )
}
