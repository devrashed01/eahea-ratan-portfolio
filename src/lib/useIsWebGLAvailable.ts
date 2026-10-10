import { useState } from 'react'

function detectWebGL(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

/** One-time WebGL support check, used to decide whether to mount the 3D <Canvas>. */
export function useIsWebGLAvailable() {
  const [available] = useState(detectWebGL)
  return available
}
