import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  age: number;
  lifespan: number;
  sprite: THREE.Sprite;
}

const trailConfig = {
  trailLength: 25,
  trailSize: 0.5,
  trailColor: new THREE.Color('#C8A97E'),
  particleCount: 100,
  particleSize: 0.075,
  particleColor: new THREE.Color('#52B788'),
  spawnRate: 2,
  lifespan: 1.0,
  gravity: 0.0,
  fadeOut: true,
  velocityScale: 1.0,
  spread: 0.25,
};

function createTexturedParticle(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.3, 'rgba(230, 230, 230, 0.5)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  return new THREE.CanvasTexture(canvas);
}

function createParticleMaterial(): THREE.SpriteMaterial {
  return new THREE.SpriteMaterial({
    color: trailConfig.particleColor,
    map: createTexturedParticle(),
    transparent: true,
    opacity: 0.65,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}

function createTrailGeometry(positions: number[]): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.computeBoundingSphere();
  if (geometry.boundingSphere) {
    geometry.boundingSphere.center.set(0, 0, 0);
    geometry.boundingSphere.radius = 1000;
  }
  return geometry;
}

export default function GoldenCursorTrail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check if touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';

    // Raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const mousePosition = new THREE.Vector3();
    const prevMousePosition = new THREE.Vector3();
    const mouseVelocity = new THREE.Vector3();

    // Trail
    const trailPositions: number[] = [];
    const particles: Particle[] = [];
    let spawnTimer = 0;
    const clock = new THREE.Clock();

    // Trail mesh
    const trailMaterial = new THREE.LineBasicMaterial({
      color: trailConfig.trailColor,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const trailGeometry = createTrailGeometry([]);
    const trailMesh = new THREE.Line(trailGeometry, trailMaterial);
    trailMesh.frustumCulled = false;
    scene.add(trailMesh);

    // Mouse move
    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersectPoint = new THREE.Vector3();
      raycaster.ray.intersectPlane(mousePlane, intersectPoint);

      if (intersectPoint) {
        mouseVelocity.copy(intersectPoint).sub(prevMousePosition);
        mousePosition.copy(intersectPoint);
        prevMousePosition.copy(intersectPoint);
      }
    };

    // Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', onResize);

    // Spawn particles
    const spawnParticles = () => {
      if (mouseVelocity.length() < 0.01) return;

      const direction = mouseVelocity.clone().normalize();
      const speed = mouseVelocity.length();

      for (let i = 0; i < trailConfig.spawnRate; i++) {
        const particle: Particle = {
          position: mousePosition.clone(),
          velocity: direction
            .clone()
            .multiplyScalar(speed * trailConfig.velocityScale)
            .add(
              new THREE.Vector3(
                (Math.random() - 0.5) * trailConfig.spread,
                (Math.random() - 0.5) * trailConfig.spread,
                (Math.random() - 0.5) * trailConfig.spread
              )
            ),
          age: 0,
          lifespan: trailConfig.lifespan * (0.8 + Math.random() * 0.4),
          sprite: new THREE.Sprite(createParticleMaterial()),
        };

        particle.sprite.scale.setScalar(trailConfig.particleSize);
        particle.sprite.position.copy(particle.position);
        scene.add(particle.sprite);
        particles.push(particle);
      }
    };

    // Update trail
    const updateTrail = () => {
      trailPositions.unshift(mousePosition.x, mousePosition.y, mousePosition.z);

      if (trailPositions.length > trailConfig.trailLength * 3) {
        trailPositions.length = trailConfig.trailLength * 3;
      }

      trailMesh.geometry.dispose();
      trailMesh.geometry = createTrailGeometry([...trailPositions]);
    };

    // Update particles
    const updateParticles = (dt: number) => {
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.age += dt;

        if (particle.age >= particle.lifespan) {
          scene.remove(particle.sprite);
          particle.sprite.material.dispose();
          particles.splice(i, 1);
          continue;
        }

        particle.velocity.z += trailConfig.gravity * dt;
        particle.position.add(particle.velocity.clone().multiplyScalar(dt));
        particle.sprite.position.copy(particle.position);

        if (trailConfig.fadeOut) {
          (particle.sprite.material as THREE.SpriteMaterial).opacity =
            0.65 * (1 - particle.age / particle.lifespan);
        }
      }
    };

    // Animate
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      const dt = clock.getDelta();

      spawnTimer++;
      if (spawnTimer >= 1) {
        spawnTimer = 0;
        spawnParticles();
      }

      updateTrail();
      updateParticles(dt);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      trailGeometry.dispose();
      trailMaterial.dispose();
      particles.forEach((p) => {
        scene.remove(p.sprite);
        p.sprite.material.dispose();
      });
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
    />
  );
}
