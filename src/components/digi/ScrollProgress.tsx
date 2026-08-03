import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "./scroll";

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          ref.current,
          { scaleX: 0 },
          { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: true } },
        );
      });
    },
    { scope: ref },
  );

  return (
    <div
      data-testid="scroll-progress-track"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]"
      aria-hidden
    >
      <div
        ref={ref}
        data-testid="scroll-progress-bar"
        className="h-full w-full origin-left scale-x-0"
        style={{ background: "var(--gradient-accent)" }}
      />
    </div>
  );
}
