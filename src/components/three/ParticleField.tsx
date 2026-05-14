'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function ParticleField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const count = 4000;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 100;
      if (i % 3 === 0) velocities[i / 3] = Math.random() * 0.02;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.04,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let animId: number;

    const animate = () => {
      const pos = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 1] -= velocities[i];
        if (pos[i * 3 + 1] < -50) pos[i * 3 + 1] = 50;
      }
      geometry.attributes.position.needsUpdate = true;
      points.rotation.y += 0.001;
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none opacity-40" />;
}
