// "use client";

// import { useEffect, useRef, useState, type RefObject } from "react";
// import * as THREE from "three";
// import { Canvas, useThree } from "@react-three/fiber";
// import { useGLTF } from "@react-three/drei";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const MODEL_URL = "/model/PC.glb";

// type Breakpoint = "mobile" | "tablet" | "desktop";

// function getBreakpoint(width: number): Breakpoint {
//   if (width < 640) return "mobile";
//   if (width < 1024) return "tablet";
//   return "desktop";
// }

// /**
//  * Every offset below is a FRACTION of the camera's visible width/height,
//  * not a raw world-unit number. That's what actually fixes "too small" /
//  * "flies off screen": raw units like `x: 6` only look right for one
//  * specific fov/aspect/distance combo, and are wrong (often way outside
//  * the frustum) on every other screen. Fractions always stay in-frame.
//  */
// interface FractionalPose {
//   xFrac: number; // -1..1, fraction of half the visible width
//   yFrac: number; // -1..1, fraction of half the visible height
//   zStep: number; // extra depth, in "camera distances", positive = further away
//   rotX: number;
//   rotY: number;
//   rotZ: number;
//   scaleFactor: number; // multiplier on the auto-fit base scale
// }

// interface SectionPose {
//   trigger: string;
//   pose: FractionalPose;
// }

// const IDLE_POSE: FractionalPose = {
//   xFrac: 0.5, // Top-Right: far right
//   yFrac: 0, // Top-Right: far up (positive = up)
//   zStep: 0,
//   rotX: 3,
//   rotY: 0, // Starts facing forward
//   rotZ: 0,
//   scaleFactor: 1,
// };

// const SECTIONS: SectionPose[] = [
//   // Hero: Top-Right (uses IDLE_POSE)
//   { trigger: "#hero", pose: IDLE_POSE },

//   // Bio: Middle-Left (arrow ↙)
//   {
//     trigger: "#bio",
//     pose: {
//       xFrac: -0.85,
//       yFrac: 0.0, // vertically centered
//       zStep: 0.15,
//       rotX: 0.1,
//       rotY: 1.0, // turns to face left
//       rotZ: 0,
//       scaleFactor: 0.9,
//     },
//   },

//   // Projects: Middle-Right (arrow ↘)
//   {
//     trigger: "#projects",
//     pose: {
//       xFrac: 0.85,
//       yFrac: -0.3, // slightly lower than center
//       zStep: 0.25,
//       rotX: -0.1,
//       rotY: 1.8, // turns to face right
//       rotZ: 0.05,
//       scaleFactor: 0.8,
//     },
//   },

//   // Footer: Bottom-Left (arrow ↙)
//   {
//     trigger: "#footer",
//     pose: {
//       xFrac: -0.85,
//       yFrac: -0.85, // very bottom
//       zStep: 0.2,
//       rotX: 0.1,
//       rotY: 3.5, // turns sharply to face left
//       rotZ: 0,
//       scaleFactor: 0.85,
//     },
//   },
// ];
// // Extra scale multiplier per breakpoint so the model doesn't overwhelm
// // narrow screens where there's much less side-margin to hide it in.
// const BREAKPOINT_SCALE: Record<Breakpoint, number> = {
//   mobile: 0.5,
//   tablet: 0.72,
//   desktop: 1,
// };

// const BASE_DISTANCE = 6; // world units the model idles in front of the camera

// /** Visible width/height (world units) of the camera frustum at a given distance. */
// function getVisibleSizeAtDistance(
//   camera: THREE.PerspectiveCamera,
//   distance: number,
// ): { width: number; height: number } {
//   const fovRad = (camera.fov * Math.PI) / 180;
//   const height = 2 * Math.tan(fovRad / 2) * distance;
//   const width = height * camera.aspect;
//   return { width, height };
// }

// function resolvePose(
//   camera: THREE.PerspectiveCamera,
//   baseScale: number,
//   pose: FractionalPose,
//   breakpoint: Breakpoint = "desktop",
// ) {
//   const distance = BASE_DISTANCE + pose.zStep * BASE_DISTANCE;
//   const { width, height } = getVisibleSizeAtDistance(camera, distance);
//   // Clamp fractions a touch so the model never clips off the edge of
//   // narrow viewports, then apply the breakpoint-specific scale-down.
//   const xFrac = Math.max(-0.92, Math.min(0.92, pose.xFrac));
//   const yFrac = Math.max(-0.88, Math.min(0.88, pose.yFrac));
//   return {
//     x: xFrac * (width / 2),
//     y: yFrac * (height / 2),
//     z: -distance,
//     scale: baseScale * pose.scaleFactor * BREAKPOINT_SCALE[breakpoint],
//   };
// }

// interface ModelProps {
//   groupRef: RefObject<THREE.Group | null>;
//   onReady: (group: THREE.Group) => void;
// }

// function Model({ groupRef, onReady }: ModelProps) {
//   const { scene } = useGLTF(MODEL_URL);
//   const firedRef = useRef(false);

//   useEffect(() => {
//     if (!groupRef.current || firedRef.current) return;
//     firedRef.current = true;
//     onReady(groupRef.current);
//   }, [groupRef, onReady]);

//   return (
//     <group ref={groupRef}>
//       <primitive object={scene} />
//     </group>
//   );
// }

// useGLTF.preload(MODEL_URL);

// interface SceneProps {
//   onGroupReady: (group: THREE.Group, camera: THREE.PerspectiveCamera) => void;
// }

// function Scene({ onGroupReady }: SceneProps) {
//   const groupRef = useRef<THREE.Group>(null);
//   const { camera } = useThree();

//   const handleReady = (group: THREE.Group): void => {
//     onGroupReady(group, camera as THREE.PerspectiveCamera);
//   };

//   return (
//     <>
//       <ambientLight intensity={1.2} />
//       <directionalLight position={[5, 10, 7]} intensity={3.5} />
//       <directionalLight position={[-5, -3, -5]} intensity={1} />
//       <Model groupRef={groupRef} onReady={handleReady} />
//     </>
//   );
// }

// export default function PC() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [breakpoint, setBreakpoint] = useState<Breakpoint>("desktop");

//   const groupRef = useRef<THREE.Group | null>(null);
//   const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
//   const gsapCtxRef = useRef<gsap.Context | null>(null);
//   const baseScaleRef = useRef(1);

//   // Picks the right camera fov per screen tier, purely aesthetic.
//   useEffect(() => {
//     setBreakpoint(getBreakpoint(window.innerWidth));
//     const handleTierChange = () =>
//       setBreakpoint(getBreakpoint(window.innerWidth));
//     window.addEventListener("resize", handleTierChange);
//     window.addEventListener("orientationchange", handleTierChange);
//     return () => {
//       window.removeEventListener("resize", handleTierChange);
//       window.removeEventListener("orientationchange", handleTierChange);
//     };
//   }, []);

//   const layout = (
//     group: THREE.Group,
//     camera: THREE.PerspectiveCamera,
//     breakpoint: Breakpoint,
//   ): void => {
//     const box = new THREE.Box3().setFromObject(group);
//     const sphere = box.getBoundingSphere(new THREE.Sphere());
//     const radius = sphere.radius || 1;
//     // Target: the model's radius should read as ~22% of the visible frustum
//     // height at its idle depth, regardless of the model's native scale.
//     const targetRadius =
//       getVisibleSizeAtDistance(camera, BASE_DISTANCE).height * 0.22;
//     baseScaleRef.current = targetRadius / radius;

//     const idle = resolvePose(
//       camera,
//       baseScaleRef.current,
//       IDLE_POSE,
//       breakpoint,
//     );
//     group.position.set(idle.x, idle.y, idle.z);
//     group.rotation.set(IDLE_POSE.rotX, IDLE_POSE.rotY, IDLE_POSE.rotZ);
//     group.scale.setScalar(idle.scale);

//     gsapCtxRef.current?.revert();
//     gsapCtxRef.current = null;

//     const prefersReducedMotion = window.matchMedia(
//       "(prefers-reduced-motion: reduce)",
//     ).matches;
//     if (prefersReducedMotion) return;

//     gsapCtxRef.current = gsap.context(() => {
//       // IMPORTANT: gsap.to() captures its "from" value at the moment the
//       // tween is *built*, not when its ScrollTrigger becomes active. Since
//       // every section's tween used to get built in this same synchronous
//       // loop (all at mount time), sections after the first were all
//       // silently starting from the same frozen initial snapshot instead of
//       // from wherever the previous section had actually animated the model
//       // to — that's what caused the snap-back/jump when crossing from one
//       // section into the next.
//       //
//       // Fix: use gsap.fromTo() with an explicitly tracked "previous target"
//       // so every section's start state is *provably* identical to the
//       // previous section's end state — position, rotation, and scale all
//       // carry over exactly, with the same ease/scrub feel throughout, so
//       // the whole page reads as one continuous, cinematic motion instead of
//       // a chain of separate clips.
//       let prevTarget = resolvePose(
//         camera,
//         baseScaleRef.current,
//         IDLE_POSE,
//         breakpoint,
//       );
//       let prevRot = {
//         x: IDLE_POSE.rotX,
//         y: IDLE_POSE.rotY,
//         z: IDLE_POSE.rotZ,
//       };

//       SECTIONS.forEach(({ trigger, pose }) => {
//         const target = resolvePose(
//           camera,
//           baseScaleRef.current,
//           pose,
//           breakpoint,
//         );
//         const scrollTrigger = {
//           trigger,
//           start: "top 85%",
//           end: "top 15%",
//           scrub: 0.6,
//         };

//         gsap.fromTo(
//           group.position,
//           { x: prevTarget.x, y: prevTarget.y, z: prevTarget.z },
//           {
//             x: target.x,
//             y: target.y,
//             z: target.z,
//             scrollTrigger,
//             ease: "power1.inOut",
//           },
//         );
//         gsap.fromTo(
//           group.rotation,
//           { x: prevRot.x, y: prevRot.y, z: prevRot.z },
//           {
//             x: pose.rotX,
//             y: pose.rotY,
//             z: pose.rotZ,
//             scrollTrigger,
//             ease: "power1.inOut",
//           },
//         );
//         gsap.fromTo(
//           group.scale,
//           { x: prevTarget.scale, y: prevTarget.scale, z: prevTarget.scale },
//           {
//             x: target.scale,
//             y: target.scale,
//             z: target.scale,
//             scrollTrigger,
//             ease: "power1.inOut",
//           },
//         );

//         prevTarget = target;
//         prevRot = { x: pose.rotX, y: pose.rotY, z: pose.rotZ };
//       });
//     });
//   };

//   const handleGroupReady = (
//     group: THREE.Group,
//     camera: THREE.PerspectiveCamera,
//   ): void => {
//     groupRef.current = group;
//     cameraRef.current = camera;
//     layout(group, camera, breakpoint);
//   };

//   // Re-run layout on resize so the model stays correctly sized/positioned
//   // even when the window changes without crossing a breakpoint.
//   useEffect(() => {
//     let resizeTimeout: ReturnType<typeof setTimeout> | undefined;
//     const handleResize = (): void => {
//       clearTimeout(resizeTimeout);
//       resizeTimeout = setTimeout(() => {
//         const group = groupRef.current;
//         const camera = cameraRef.current;
//         if (!group || !camera) return;
//         const nextBreakpoint = getBreakpoint(window.innerWidth);
//         // Let react-three-fiber apply the new aspect/fov to the camera first.
//         requestAnimationFrame(() => layout(group, camera, nextBreakpoint));
//       }, 150);
//     };
//     window.addEventListener("resize", handleResize);
//     window.addEventListener("orientationchange", handleResize);
//     return () => {
//       clearTimeout(resizeTimeout);
//       window.removeEventListener("resize", handleResize);
//       window.removeEventListener("orientationchange", handleResize);
//     };
//   }, []);

//   // Also re-run layout whenever the breakpoint tier itself changes (e.g.
//   // rotating a tablet across the tablet/desktop line, or resizing a
//   // desktop browser window down into the tablet range) so the
//   // breakpoint-specific scale-down actually takes effect.
//   useEffect(() => {
//     const group = groupRef.current;
//     const camera = cameraRef.current;
//     if (!group || !camera) return;
//     layout(group, camera, breakpoint);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [breakpoint]);

//   useEffect(() => {
//     return () => {
//       gsapCtxRef.current?.revert();
//     };
//   }, []);

//   const fov = breakpoint === "mobile" ? 55 : breakpoint === "tablet" ? 50 : 45;

//   return (
//     <div
//       ref={containerRef}
//       aria-hidden="true"
//       style={{
//         position: "fixed",
//         inset: 0,
//         pointerEvents: "none",
//         // Was z-index: 10, which sat *above* every section's text (since
//         // fixed elements stack above normal-flow content regardless of DOM
//         // order). Negative z-index puts it behind all normal in-flow
//         // content instead, so it now reads as a background companion that
//         // peeks around your text rather than covering it.
//         zIndex: 10,
//       }}
//     >
//       <Canvas
//         gl={{
//           alpha: true,
//           antialias: true,
//           powerPreference: "high-performance",
//         }}
//         camera={{ fov, position: [0, 0, 0], near: 0.1, far: 1000 }}
//         dpr={[1, 2]}
//         style={{ width: "100%", height: "100%" }}
//       >
//         <Scene onGroupReady={handleGroupReady} />
//       </Canvas>
//     </div>
//   );
// }

"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MODEL_URL = "/model/PC.glb";

type Breakpoint = "mobile" | "tablet" | "desktop" | "wide";

function getBreakpoint(width: number): Breakpoint {
  if (width < 640) return "mobile";
  if (width < 1024) return "tablet";
  if (width < 1600) return "desktop";
  return "wide";
}

/**
 * Every offset below is a FRACTION of the camera's visible width/height,
 * not a raw world-unit number. That's what actually fixes "too small" /
 * "flies off screen": raw units like `x: 6` only look right for one
 * specific fov/aspect/distance combo, and are wrong (often way outside
 * the frustum) on every other screen. Fractions always stay in-frame, and
 * resolvePose() below additionally tightens the clamp further for any pose
 * with scaleFactor > 1 (the "big reveal" moment in Skills) so a bigger
 * model can never poke past the screen edge.
 */
interface FractionalPose {
  xFrac: number; // -1..1, fraction of half the visible width
  yFrac: number; // -1..1, fraction of half the visible height
  zStep: number; // extra depth, in "camera distances", positive = further away
  rotX: number;
  rotY: number;
  rotZ: number;
  scaleFactor: number; // multiplier on the auto-fit base scale
}

interface SectionPose {
  trigger: string;
  pose: FractionalPose;
}

// Hero: small, tucked bottom-right, facing forward.
const IDLE_POSE: FractionalPose = {
  xFrac: 0.8,
  yFrac: 0.68,
  zStep: 0,
  rotX: 0,
  rotY: 0,
  rotZ: 0,
  scaleFactor: 0.55,
};

/**
 * Path traced from the reference screenshot: small in the Hero corner →
 * sweeps to the opposite bottom corner in Bio → tucks bottom-left by the
 * Projects card → a big, prominent reveal on the right side through Skills
 * → small again up near the email line in Footer. rotY keeps climbing
 * (never resets) across every stop so the spin direction never reverses —
 * that's what reads as one continuous turn instead of separate poses.
 */
const SECTIONS: SectionPose[] = [
  { trigger: "#hero", pose: IDLE_POSE },

  // Bio: bottom-left, small.
  {
    trigger: "#bio",
    pose: {
      xFrac: -0.8,
      yFrac: 0.7,
      zStep: 0.05,
      rotX: 0.05,
      rotY: 0.8,
      rotZ: 0,
      scaleFactor: 0.5,
    },
  },

  // Projects: bottom-left of the card, small.
  {
    trigger: "#projects",
    pose: {
      xFrac: -0.72,
      yFrac: 0.68,
      zStep: 0.1,
      rotX: -0.05,
      rotY: 1.5,
      rotZ: 0,
      scaleFactor: 0.55,
    },
  },

  // Skills: the big moment — right side, large and prominent.
  {
    trigger: "#skills",
    pose: {
      xFrac: 0.65,
      yFrac: 0.12,
      zStep: -0.05,
      rotX: 0,
      rotY: 2.4,
      rotZ: 0.08,
      scaleFactor: 1.3,
    },
  },

  // Footer: small again, upper-right near the email line.
  {
    trigger: "#footer",
    pose: {
      xFrac: 0.68,
      yFrac: -0.35,
      zStep: 0.05,
      rotX: 0,
      rotY: 3.1,
      rotZ: 0,
      scaleFactor: 0.5,
    },
  },
];

// Extra scale multiplier per screen tier so the model doesn't overwhelm
// narrow phones (where there's much less margin to hide it in) and doesn't
// read as tiny/lost on very large or ultra-wide monitors.
const BREAKPOINT_SCALE: Record<Breakpoint, number> = {
  mobile: 0.5,
  tablet: 0.72,
  desktop: 1,
  wide: 1.15,
};

/**
 * Short viewports (landscape phones, small laptop windows with lots of
 * browser chrome) have plenty of width but very little height. Sizing
 * purely off width tiers can let the model dominate a screen that's only
 * 350-450px tall, so this damps scale down further in that case,
 * independent of the width tier.
 */
function getShortViewportFactor(): number {
  if (typeof window === "undefined") return 1;
  const vh = window.innerHeight;
  if (vh < 420) return 0.6;
  if (vh < 600) return 0.8;
  return 1;
}

const BASE_DISTANCE = 6; // world units the model idles in front of the camera

/** Visible width/height (world units) of the camera frustum at a given distance. */
function getVisibleSizeAtDistance(
  camera: THREE.PerspectiveCamera,
  distance: number,
): { width: number; height: number } {
  const fovRad = (camera.fov * Math.PI) / 180;
  const height = 2 * Math.tan(fovRad / 2) * distance;
  const width = height * camera.aspect;
  return { width, height };
}

function resolvePose(
  camera: THREE.PerspectiveCamera,
  baseScale: number,
  pose: FractionalPose,
  breakpoint: Breakpoint = "desktop",
) {
  const distance = BASE_DISTANCE + pose.zStep * BASE_DISTANCE;
  const { width, height } = getVisibleSizeAtDistance(camera, distance);
  // Clamp fractions so the model never clips off the edge of the
  // viewport. Any pose that's visually bigger than the base size (the
  // Skills "reveal" moment, scaleFactor > 1) gets a noticeably tighter
  // clamp, since a larger object needs more margin to stay fully on
  // screen at the same position fraction.
  const isOversized = pose.scaleFactor > 1;
  const maxX = isOversized ? 0.68 : 0.9;
  const maxY = isOversized ? 0.62 : 0.85;
  const xFrac = Math.max(-maxX, Math.min(maxX, pose.xFrac));
  const yFrac = Math.max(-maxY, Math.min(maxY, pose.yFrac));
  return {
    x: xFrac * (width / 2),
    y: yFrac * (height / 2),
    z: -distance,
    scale:
      baseScale *
      pose.scaleFactor *
      BREAKPOINT_SCALE[breakpoint] *
      getShortViewportFactor(),
  };
}

interface ModelProps {
  groupRef: RefObject<THREE.Group | null>;
  onReady: (group: THREE.Group) => void;
}

function Model({ groupRef, onReady }: ModelProps) {
  const { scene } = useGLTF(MODEL_URL);
  const firedRef = useRef(false);

  useEffect(() => {
    if (!groupRef.current || firedRef.current) return;
    firedRef.current = true;
    onReady(groupRef.current);
  }, [groupRef, onReady]);

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(MODEL_URL);

interface SceneProps {
  onGroupReady: (group: THREE.Group, camera: THREE.PerspectiveCamera) => void;
}

function Scene({ onGroupReady }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const handleReady = (group: THREE.Group): void => {
    onGroupReady(group, camera as THREE.PerspectiveCamera);
  };

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 10, 7]} intensity={3.5} />
      <directionalLight position={[-5, -3, -5]} intensity={1} />
      <Model groupRef={groupRef} onReady={handleReady} />
    </>
  );
}

export default function PC() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("desktop");

  const groupRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const gsapCtxRef = useRef<gsap.Context | null>(null);
  const baseScaleRef = useRef(1);

  // Picks the right camera fov/scale tier for the current screen.
  useEffect(() => {
    setBreakpoint(getBreakpoint(window.innerWidth));
    const handleTierChange = () =>
      setBreakpoint(getBreakpoint(window.innerWidth));
    window.addEventListener("resize", handleTierChange);
    window.addEventListener("orientationchange", handleTierChange);
    return () => {
      window.removeEventListener("resize", handleTierChange);
      window.removeEventListener("orientationchange", handleTierChange);
    };
  }, []);

  const layout = (
    group: THREE.Group,
    camera: THREE.PerspectiveCamera,
    breakpoint: Breakpoint,
  ): void => {
    const box = new THREE.Box3().setFromObject(group);
    const sphere = box.getBoundingSphere(new THREE.Sphere());
    const radius = sphere.radius || 1;
    // Target: the model's radius should read as ~22% of the visible frustum
    // height at its idle depth, regardless of the model's native scale.
    const targetRadius =
      getVisibleSizeAtDistance(camera, BASE_DISTANCE).height * 0.22;
    baseScaleRef.current = targetRadius / radius;

    const idle = resolvePose(
      camera,
      baseScaleRef.current,
      IDLE_POSE,
      breakpoint,
    );
    group.position.set(idle.x, idle.y, idle.z);
    group.rotation.set(IDLE_POSE.rotX, IDLE_POSE.rotY, IDLE_POSE.rotZ);
    group.scale.setScalar(idle.scale);

    gsapCtxRef.current?.revert();
    gsapCtxRef.current = null;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    gsapCtxRef.current = gsap.context(() => {
      // Every section's tween starts from gsap.fromTo() with an explicitly
      // tracked "previous target," so each section's start state is
      // *provably* identical to the previous section's end state —
      // position, rotation, and scale all carry over exactly, with the
      // same ease/scrub feel throughout. That's what makes the whole page
      // read as one continuous, cinematic motion instead of separate clips
      // that happen to be near each other.
      let prevTarget = resolvePose(
        camera,
        baseScaleRef.current,
        IDLE_POSE,
        breakpoint,
      );
      let prevRot = {
        x: IDLE_POSE.rotX,
        y: IDLE_POSE.rotY,
        z: IDLE_POSE.rotZ,
      };

      SECTIONS.forEach(({ trigger, pose }) => {
        const target = resolvePose(
          camera,
          baseScaleRef.current,
          pose,
          breakpoint,
        );
        const scrollTrigger = {
          trigger,
          start: "top 85%",
          end: "top 15%",
          scrub: 0.6,
        };

        gsap.fromTo(
          group.position,
          { x: prevTarget.x, y: prevTarget.y, z: prevTarget.z },
          {
            x: target.x,
            y: target.y,
            z: target.z,
            scrollTrigger,
            ease: "power1.inOut",
          },
        );
        gsap.fromTo(
          group.rotation,
          { x: prevRot.x, y: prevRot.y, z: prevRot.z },
          {
            x: pose.rotX,
            y: pose.rotY,
            z: pose.rotZ,
            scrollTrigger,
            ease: "power1.inOut",
          },
        );
        gsap.fromTo(
          group.scale,
          { x: prevTarget.scale, y: prevTarget.scale, z: prevTarget.scale },
          {
            x: target.scale,
            y: target.scale,
            z: target.scale,
            scrollTrigger,
            ease: "power1.inOut",
          },
        );

        prevTarget = target;
        prevRot = { x: pose.rotX, y: pose.rotY, z: pose.rotZ };
      });
    });
  };

  const handleGroupReady = (
    group: THREE.Group,
    camera: THREE.PerspectiveCamera,
  ): void => {
    groupRef.current = group;
    cameraRef.current = camera;
    layout(group, camera, breakpoint);
  };

  // Re-run layout on resize so the model stays correctly sized/positioned
  // even when the window changes without crossing a breakpoint.
  useEffect(() => {
    let resizeTimeout: ReturnType<typeof setTimeout> | undefined;
    const handleResize = (): void => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const group = groupRef.current;
        const camera = cameraRef.current;
        if (!group || !camera) return;
        const nextBreakpoint = getBreakpoint(window.innerWidth);
        // Let react-three-fiber apply the new aspect/fov to the camera first.
        requestAnimationFrame(() => layout(group, camera, nextBreakpoint));
      }, 150);
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  // Also re-run layout whenever the breakpoint tier itself changes (e.g.
  // rotating a tablet across the tablet/desktop line, or resizing a
  // desktop browser window down into a smaller tier) so the
  // breakpoint-specific scale-down actually takes effect.
  useEffect(() => {
    const group = groupRef.current;
    const camera = cameraRef.current;
    if (!group || !camera) return;
    layout(group, camera, breakpoint);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breakpoint]);

  useEffect(() => {
    return () => {
      gsapCtxRef.current?.revert();
    };
  }, []);

  const fov =
    breakpoint === "mobile"
      ? 55
      : breakpoint === "tablet"
        ? 50
        : breakpoint === "desktop"
          ? 45
          : 40;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        // Fixed elements stack above normal-flow content regardless of DOM
        // order, so a positive z-index here would sit ON TOP of every
        // section's text. Negative z-index puts it behind all normal
        // in-flow content instead, so it reads as a background companion
        // peeking around your text rather than covering it.
        zIndex: 100,
      }}
    >
      <Canvas
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        camera={{ fov, position: [0, 0, 0], near: 0.1, far: 1000 }}
        dpr={[1, 2]}
        style={{ width: "100%", height: "100%" }}
      >
        <Scene onGroupReady={handleGroupReady} />
      </Canvas>
    </div>
  );
}
