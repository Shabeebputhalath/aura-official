/**
 * useLiquidReveal — Lumora liquid-cursor reveal, spec-exact.
 *
 * Image mapping (DO NOT SWAP):
 *   baseSrc  = "after.jpg"  → <img> layer, always visible (LCP)
 *   brushSrc = "before.jpg" → painted on canvas along cursor trail
 *
 * stamp(x, y) — 4 steps per spec:
 *   1. clearRect brushCanvas (diam × diam)
 *   2. source-over: radial gradient (1 → 0.82 @ 0.55 → 0) fills brushCanvas
 *   3. source-in:   drawImage(coverCanvas, x-c, y-c, diam, diam → 0,0,diam,diam)
 *      clips brushSrc pixels to the soft gradient shape
 *   4. source-over on mainCanvas: drawImage(brushCanvas, x-c, y-c)
 *
 * tick() per frame:
 *   points? → idle=0, drawing=true : idle++, drawing=false
 *   fade = drawing ? decay : min(decay + idle*0.004, 0.5)
 *   destination-out fillRect at fade → decays existing trail
 *   stamp each queued point, clear queue
 *   idle===120 → hard clearRect
 */

import { useEffect, useRef } from 'react';

const BRUSH_RADIUS       = 143;   // CSS px
const DECAY              = 0.016;
const MAX_DPR            = 2;
const INTERP_STEP_FACTOR = 0.3;   // step = max(radius * 0.3, 1)
const MAX_INTERP         = 60;
const IDLE_CLEAR         = 120;

interface Options {
  baseSrc:      string;          // after.jpg — always-visible base
  brushSrc:     string;          // before.jpg — painted on trail
  containerRef: React.RefObject<HTMLElement>;
  canvasRef:    React.RefObject<HTMLCanvasElement>;
}

export function useLiquidReveal({ brushSrc, containerRef, canvasRef }: Options) {
  const S = useRef({
    brushImg:    null as HTMLImageElement | null,
    coverCanvas: null as HTMLCanvasElement | null,
    brushCanvas: null as HTMLCanvasElement | null,
    brushCtx:    null as CanvasRenderingContext2D | null,
    dpr:    Math.min(window.devicePixelRatio, MAX_DPR),
    radius: 0,
    diam:   0,
    w: 0,
    h: 0,
    last:    null as { x: number; y: number } | null,
    points:  [] as { x: number; y: number }[],
    idle:    0,
    drawing: false,
    rafId:   0,
    reducedMotion: false,
    ready:   false,
  });

  // ── 1. Load brush image ─────────────────────────────────────────
  useEffect(() => {
    const s = S.current;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    s.reducedMotion = mq.matches;
    const onMq = (e: MediaQueryListEvent) => { s.reducedMotion = e.matches; };
    mq.addEventListener('change', onMq);

    const img = new Image();
    img.crossOrigin = 'anonymous';   // prevent canvas taint from CDN URLs
    img.src = brushSrc;
    img.onload = () => {
      s.brushImg = img;
      buildCoverCanvas();
      s.ready = true;
    };
    img.onerror = () => {
      // Retry without crossOrigin (same-origin assets)
      const fallback = new Image();
      fallback.src = brushSrc;
      fallback.onload = () => { s.brushImg = fallback; buildCoverCanvas(); s.ready = true; };
    };

    return () => {
      mq.removeEventListener('change', onMq);
      cancelAnimationFrame(s.rafId);
    };
  }, [brushSrc]);

  // ── 2. Cover canvas — brushSrc drawn object-fit:cover ──────────
  function buildCoverCanvas() {
    const s = S.current;
    if (!s.brushImg || s.w === 0 || s.h === 0) return;

    const cv  = document.createElement('canvas');
    cv.width  = s.w;
    cv.height = s.h;
    const ctx = cv.getContext('2d')!;

    const iw    = s.brushImg.naturalWidth;
    const ih    = s.brushImg.naturalHeight;
    const scale = Math.max(s.w / iw, s.h / ih);
    const dw    = iw * scale;
    const dh    = ih * scale;
    ctx.drawImage(s.brushImg, (s.w - dw) / 2, (s.h - dh) / 2, dw, dh);

    s.coverCanvas = cv;
  }

  // ── 3. Brush canvas — diam × diam stamp pad ────────────────────
  function buildBrushCanvas() {
    const s  = S.current;
    s.radius = BRUSH_RADIUS * s.dpr;
    s.diam   = Math.ceil(s.radius * 2);

    const bc  = document.createElement('canvas');
    bc.width  = s.diam;
    bc.height = s.diam;
    s.brushCanvas = bc;
    s.brushCtx    = bc.getContext('2d')!;
  }

  // ── 4. ResizeObserver ───────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    const canvas    = canvasRef.current;
    if (!container || !canvas) return;

    const onResize = () => {
      const s    = S.current;
      const rect = container.getBoundingClientRect();

      s.dpr = Math.min(window.devicePixelRatio, MAX_DPR);
      s.w   = Math.round(rect.width  * s.dpr);
      s.h   = Math.round(rect.height * s.dpr);

      canvas.width        = s.w;
      canvas.height       = s.h;
      canvas.style.width  = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      buildBrushCanvas();
      buildCoverCanvas();

      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, s.w, s.h);

      s.points  = [];
      s.idle    = 0;
      s.drawing = false;
      s.last    = null;
    };

    const ro = new ResizeObserver(onResize);
    ro.observe(container);
    onResize();

    return () => ro.disconnect();
  }, []);

  // ── 5. stamp(x, y) ─────────────────────────────────────────────
  function stamp(x: number, y: number) {
    const s = S.current;
    const canvas = canvasRef.current;
    if (!canvas || !s.brushCtx || !s.brushCanvas || !s.coverCanvas) return;

    const mainCtx = canvas.getContext('2d')!;
    const bCtx    = s.brushCtx;
    const r       = s.radius;
    const c       = r;          // center of brush canvas
    const d       = s.diam;

    // Step 1 — clear brush canvas
    bCtx.clearRect(0, 0, d, d);

    // Step 2 — soft radial gradient mask (source-over)
    bCtx.globalCompositeOperation = 'source-over';
    bCtx.globalAlpha = 1;
    const grad = bCtx.createRadialGradient(c, c, 0, c, c, r);
    grad.addColorStop(0,    'rgba(255,255,255,1)');
    grad.addColorStop(0.55, 'rgba(255,255,255,0.82)');
    grad.addColorStop(1,    'rgba(255,255,255,0)');
    bCtx.fillStyle = grad;
    bCtx.fillRect(0, 0, d, d);

    // Step 3 — clip brushSrc pixels to the gradient shape (source-in)
    // Source rect on coverCanvas may extend outside bounds — that's fine;
    // the browser clips the drawImage source region automatically.
    bCtx.globalCompositeOperation = 'source-in';
    bCtx.drawImage(
      s.coverCanvas,
      x - c, y - c, d, d,    // src region in coverCanvas (canvas px)
      0, 0,  d, d             // dst region in brushCanvas
    );
    bCtx.globalCompositeOperation = 'source-over';

    // Step 4 — stamp brush canvas onto main canvas (source-over)
    mainCtx.globalCompositeOperation = 'source-over';
    mainCtx.globalAlpha = 1;
    mainCtx.drawImage(s.brushCanvas, x - c, y - c);
  }

  // ── 6. rAF tick loop ────────────────────────────────────────────
  useEffect(() => {
    const s = S.current;

    function tick() {
      s.rafId = requestAnimationFrame(tick);

      const canvas = canvasRef.current;
      if (!canvas || s.reducedMotion || !s.ready) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const { w, h } = s;
      const hasPoints = s.points.length > 0;

      if (hasPoints) {
        s.idle    = 0;
        s.drawing = true;
      } else {
        s.idle++;
        s.drawing = false;

        if (s.idle === IDLE_CLEAR) {
          // Hard clear — no residue
          ctx.clearRect(0, 0, w, h);
          s.last = null;
        }
        if (s.idle >= IDLE_CLEAR) return;
      }

      // Decay existing trail
      const fade = s.drawing
        ? DECAY
        : Math.min(DECAY + s.idle * 0.004, 0.5);

      ctx.globalCompositeOperation = 'destination-out';
      ctx.globalAlpha              = fade;
      ctx.fillStyle                = 'rgba(0,0,0,1)';
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha              = 1;
      ctx.globalCompositeOperation = 'source-over';

      // Stamp all queued points this frame
      if (hasPoints) {
        const pts = s.points.splice(0);
        for (const { x, y } of pts) stamp(x, y);
      }
    }

    s.rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(s.rafId);
  }, []);

  // ── 7. Pointer events — window-level, mouse/pen only ───────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const s = S.current;

    function onPointerMove(e: PointerEvent) {
      if (e.pointerType === 'touch') return;   // touch-only & hybrid: ignore
      if (s.reducedMotion || !s.ready) return;

      const rect = container!.getBoundingClientRect();
      const cx   = (e.clientX - rect.left) * s.dpr;
      const cy   = (e.clientY - rect.top)  * s.dpr;
      const r    = s.radius;

      // Spec: ignore points more than radius outside the canvas; reset last
      if (cx < -r || cx > s.w + r || cy < -r || cy > s.h + r) {
        s.last = null;
        return;
      }

      // Interpolate from last → current
      if (s.last !== null) {
        const dx   = cx - s.last.x;
        const dy   = cy - s.last.y;
        const dist = Math.hypot(dx, dy);
        const step = Math.max(r * INTERP_STEP_FACTOR, 1);
        const n    = Math.min(Math.ceil(dist / step), MAX_INTERP);

        for (let i = 1; i <= n; i++) {
          const t = i / (n + 1);
          s.points.push({
            x: s.last.x + dx * t,
            y: s.last.y + dy * t,
          });
        }
      }

      s.points.push({ x: cx, y: cy });
      s.last = { x: cx, y: cy };
      s.idle = 0;
    }

    function onPointerLeave(e: PointerEvent) {
      if (e.pointerType === 'touch') return;
      s.last = null;
    }

    // window-level so fast sweeps never miss points
    window.addEventListener('pointermove',  onPointerMove);
    container.addEventListener('pointerleave', onPointerLeave);

    return () => {
      window.removeEventListener('pointermove',  onPointerMove);
      container.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);
}
