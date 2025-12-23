'use client';

import {
  motion,
  useAnimate,
  useMotionValue,
  useTransform,
  animate as fmAnimate,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// --- Constants ---
const DOT_SIZE = 32;
const DOT_R = DOT_SIZE / 2;
const STROKE = DOT_SIZE;

const VIEW = 100;
const BOX = 80;
const GAP = 90;

const COLORS = {
  BLUE: '#5c7ebf', // Muted Steel Blue
  GREEN: '#689a7c', // Sage Green
  YELLOW: '#d98c5f', // Sandstone / Terracotta
};

type Xform = { s: number; tx: number; ty: number };
type Phase = 'idle' | 'drawing' | 'done';

// --- Utilities ---
const raf = () => new Promise<void>((r) => requestAnimationFrame(() => r()));

function safeGetBBox(el: SVGPathElement) {
  try {
    const b = el.getBBox();
    if (!Number.isFinite(b.width) || !Number.isFinite(b.height)) return null;
    if (b.width <= 0 || b.height <= 0) return null;
    return b;
  } catch {
    return null;
  }
}

function calcNormalizeXformFromBBox(bbox: DOMRect): Xform {
  const margin = STROKE / 2 + 4;
  const avail = VIEW - margin * 2;
  const s = Math.min(avail / bbox.width, avail / bbox.height);
  const c0x = bbox.x + bbox.width / 2;
  const c0y = bbox.y + bbox.height / 2;
  const tx = 50 - c0x * s;
  const ty = 50 - c0y * s;
  return { s, tx, ty };
}

async function waitForPathReady(
  ref: React.RefObject<SVGPathElement | null>,
  maxFrames = 120
) {
  for (let i = 0; i < maxFrames; i++) {
    const el = ref.current;
    if (el) {
      const bbox = safeGetBBox(el);
      if (bbox) return { el, bbox };
    }
    await raf();
  }
  return null;
}

function getPathStart(pathEl: SVGPathElement, xf: Xform) {
  const len = pathEl.getTotalLength();
  const pt = pathEl.getPointAtLength(Math.min(0.001, len));
  return { x: pt.x * xf.s + xf.tx, y: pt.y * xf.s + xf.ty };
}

function useDotFollowPath(
  pathRef: React.RefObject<SVGPathElement | null>,
  progress: ReturnType<typeof useMotionValue<number>>,
  x: ReturnType<typeof useMotionValue<number>>,
  y: ReturnType<typeof useMotionValue<number>>,
  xfRef: React.MutableRefObject<Xform>,
  enabled: boolean
) {
  useEffect(() => {
    if (!enabled) return;
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    const setPos = (p: number) => {
      const pt = path.getPointAtLength(len * p);
      const xf = xfRef.current;
      x.set(pt.x * xf.s + xf.tx);
      y.set(pt.y * xf.s + xf.ty);
    };
    setPos(progress.get());
    const unsub = progress.on('change', setPos);
    return () => unsub();
  }, [enabled, pathRef, progress, x, y, xfRef]);
}

// --- Main Component ---
export default function LogoAnimation({
  className = '',
}: {
  className?: string;
}) {
  const [scope, domAnimate] = useAnimate<HTMLDivElement>();
  const runIdRef = useRef(0);
  const [isInteractive, setIsInteractive] = useState(false);

  // Path Definitions
  const J_PATH = 'M 25 35 L 75 35 L 50 35 L 25 75 L 50 35 L 75 75';
  const H_PATH =
    'M 50 25 L 50 30 L 50 35 L 25 35 L 75 35 L 50 35 L 50 38 A 20 20 0 0 1 50 78 A 20 20 0 0 1 50 38';
  const R_PATH =
    'M 22 22 L 65 22 Q 78 22 78 35 L 78 40 Q 78 48 65 48 L 35 52 Q 22 52 22 60 L 22 65 Q 22 78 35 78 L 78 78';

  const jPathRef = useRef<SVGPathElement>(null);
  const hPathRef = useRef<SVGPathElement>(null);
  const rPathRef = useRef<SVGPathElement>(null);

  const jXfRef = useRef<Xform>({ s: 1, tx: 0, ty: 0 });
  const hXfRef = useRef<Xform>({ s: 1, tx: 0, ty: 0 });
  const rXfRef = useRef<Xform>({ s: 1, tx: 0, ty: 0 });

  const [jMatrix, setJMatrix] = useState('matrix(1 0 0 1 0 0)');
  const [hMatrix, setHMatrix] = useState('matrix(1 0 0 1 0 0)');
  const [rMatrix, setRMatrix] = useState('matrix(1 0 0 1 0 0)');

  const [jScale, setJScale] = useState(1);
  const [hScale, setHScale] = useState(1);
  const [rScale, setRScale] = useState(1);

  const [jLen, setJLen] = useState(0);
  const [hLen, setHLen] = useState(0);
  const [rLen, setRLen] = useState(0);

  const jProg = useMotionValue(0);
  const hProg = useMotionValue(0);
  const rProg = useMotionValue(0);

  const jDashOffset = useMotionValue(0);
  const hDashOffset = useMotionValue(0);
  const rDashOffset = useMotionValue(0);

  useEffect(() => {
    if (jLen > 0) {
      jDashOffset.set(jLen);
      return jProg.on('change', (v) => jDashOffset.set((1 - v) * jLen));
    }
  }, [jLen, jProg, jDashOffset]);

  useEffect(() => {
    if (hLen > 0) {
      hDashOffset.set(hLen);
      return hProg.on('change', (v) => hDashOffset.set((1 - v) * hLen));
    }
  }, [hLen, hProg, hDashOffset]);

  useEffect(() => {
    if (rLen > 0) {
      rDashOffset.set(rLen);
      return rProg.on('change', (v) => rDashOffset.set((1 - v) * rLen));
    }
  }, [rLen, rProg, rDashOffset]);

  const jX = useMotionValue(50);
  const jY = useMotionValue(50);
  const hX = useMotionValue(50);
  const hY = useMotionValue(50);
  const rX = useMotionValue(50);
  const rY = useMotionValue(50);

  const [followJ, setFollowJ] = useState(false);
  const [followH, setFollowH] = useState(false);
  const [followR, setFollowR] = useState(false);

  const [jPhase, setJPhase] = useState<Phase>('idle');
  const [hPhase, setHPhase] = useState<Phase>('idle');
  const [rPhase, setRPhase] = useState<Phase>('idle');

  const jPenOpacity = useTransform(jProg, [0, 0.03, 0.97, 1], [0, 1, 1, 0]);
  const hPenOpacity = useTransform(hProg, [0, 0.03, 0.97, 1], [0, 1, 1, 0]);
  const rPenOpacity = useTransform(rProg, [0, 0.03, 0.97, 1], [0, 1, 1, 0]);

  useDotFollowPath(jPathRef, jProg, jX, jY, jXfRef, followJ);
  useDotFollowPath(hPathRef, hProg, hX, hY, hXfRef, followH);
  useDotFollowPath(rPathRef, rProg, rX, rY, rXfRef, followR);

  const jDotOpacity =
    jPhase === 'idle' ? 1 : jPhase === 'done' ? 0 : jPenOpacity;
  const hDotOpacity =
    hPhase === 'idle' ? 1 : hPhase === 'done' ? 0 : hPenOpacity;
  const rDotOpacity =
    rPhase === 'idle' ? 1 : rPhase === 'done' ? 0 : rPenOpacity;

  const hoverProps = (color: string) => ({
    animate: { scale: 1, y: 0 },
    whileHover: {
      scale: 1.1,
      y: -10,
    },
    transition: { type: 'spring' as const, stiffness: 400, damping: 15 },
  });

  useEffect(() => {
    const myRunId = ++runIdRef.current;
    const stale = () => runIdRef.current !== myRunId;

    const run = async () => {
      const jReady = await waitForPathReady(jPathRef);
      const hReady = await waitForPathReady(hPathRef);
      const rReady = await waitForPathReady(rPathRef);
      if (stale() || !jReady || !hReady || !rReady) return;

      jXfRef.current = calcNormalizeXformFromBBox(jReady.bbox);
      hXfRef.current = calcNormalizeXformFromBBox(hReady.bbox);
      rXfRef.current = calcNormalizeXformFromBBox(rReady.bbox);

      setJMatrix(
        `matrix(${jXfRef.current.s} 0 0 ${jXfRef.current.s} ${jXfRef.current.tx} ${jXfRef.current.ty})`
      );
      setHMatrix(
        `matrix(${hXfRef.current.s} 0 0 ${hXfRef.current.s} ${hXfRef.current.tx} ${hXfRef.current.ty})`
      );
      setRMatrix(
        `matrix(${rXfRef.current.s} 0 0 ${rXfRef.current.s} ${rXfRef.current.tx} ${rXfRef.current.ty})`
      );

      setJScale(jXfRef.current.s);
      setHScale(hXfRef.current.s);
      setRScale(rXfRef.current.s);

      setJLen(jReady.el.getTotalLength() * jXfRef.current.s);
      setHLen(hReady.el.getTotalLength() * hXfRef.current.s);
      setRLen(rReady.el.getTotalLength() * rXfRef.current.s);

      setFollowJ(false);
      setFollowH(false);
      setFollowR(false);
      setJPhase('idle');
      setHPhase('idle');
      setRPhase('idle');
      jProg.set(0);
      hProg.set(0);
      rProg.set(0);
      jX.set(50);
      jY.set(50);
      hX.set(50);
      hY.set(50);
      rX.set(50);
      rY.set(50);
      setIsInteractive(false);

      await domAnimate([
        [
          '.item-1, .item-2, .item-3',
          { x: 0, y: -120, opacity: 0 },
          { duration: 0 },
        ],
        ['.j-group, .h-group, .r-group', { opacity: 0 }, { duration: 0 }],
      ]);
      if (stale()) return;

      await domAnimate([
        [
          '.item-1',
          { y: 0, opacity: 1 },
          { duration: 0.9, type: 'spring', bounce: 0.5 },
        ],
        [
          '.item-2',
          { y: 0, opacity: 1 },
          { duration: 0.9, type: 'spring', bounce: 0.5, at: 0.12 },
        ],
        [
          '.item-3',
          { y: 0, opacity: 1 },
          { duration: 0.9, type: 'spring', bounce: 0.5, at: 0.24 },
        ],
      ]);
      if (stale()) return;

      await new Promise((r) => setTimeout(r, 80));

      await domAnimate([
        [
          '.item-1',
          { x: -GAP },
          { duration: 0.5, type: 'spring', bounce: 0.4 },
        ],
        [
          '.item-2',
          { x: 0 },
          { duration: 0.5, type: 'spring', bounce: 0.4, at: 0.05 },
        ],
        [
          '.item-3',
          { x: GAP },
          { duration: 0.5, type: 'spring', bounce: 0.4, at: 0.1 },
        ],
      ]);
      if (stale()) return;

      const OVERLAP_THRESHOLD = 0.65;

      // J Drawing
      const jStart = getPathStart(jReady.el, jXfRef.current);
      await Promise.all([
        fmAnimate(jX, jStart.x, { duration: 0.35, ease: 'easeInOut' }).finished,
        fmAnimate(jY, jStart.y, { duration: 0.35, ease: 'easeInOut' }).finished,
      ]);
      await domAnimate('.j-group', { opacity: 1 }, { duration: 0.01 });
      setJPhase('drawing');
      setFollowJ(true);
      const jAnimation = fmAnimate(jProg, 1, {
        duration: 1.1,
        ease: 'easeInOut',
      });
      await new Promise<void>((r) => {
        const u = jProg.on('change', (v) => {
          if (v >= OVERLAP_THRESHOLD) {
            u();
            r();
          }
        });
      });

      // H Drawing
      const hStart = getPathStart(hReady.el, hXfRef.current);
      await Promise.all([
        fmAnimate(hX, hStart.x, { duration: 0.25, ease: 'easeInOut' }).finished,
        fmAnimate(hY, hStart.y, { duration: 0.25, ease: 'easeInOut' }).finished,
      ]);
      await domAnimate('.h-group', { opacity: 1 }, { duration: 0.01 });
      setHPhase('drawing');
      setFollowH(true);
      const hAnimation = fmAnimate(hProg, 1, {
        duration: 1.0,
        ease: 'easeInOut',
      });
      await new Promise<void>((r) => {
        const u = hProg.on('change', (v) => {
          if (v >= OVERLAP_THRESHOLD) {
            u();
            r();
          }
        });
      });

      // R Drawing
      const rStart = getPathStart(rReady.el, rXfRef.current);
      await Promise.all([
        fmAnimate(rX, rStart.x, { duration: 0.25, ease: 'easeInOut' }).finished,
        fmAnimate(rY, rStart.y, { duration: 0.25, ease: 'easeInOut' }).finished,
      ]);
      await domAnimate('.r-group', { opacity: 1 }, { duration: 0.01 });
      setRPhase('drawing');
      setFollowR(true);
      const rAnimation = fmAnimate(rProg, 1, {
        duration: 1.1,
        ease: 'easeInOut',
      });

      await Promise.all([
        jAnimation.finished,
        hAnimation.finished,
        rAnimation.finished,
      ]);
      setJPhase('done');
      setHPhase('done');
      setRPhase('done');
      setIsInteractive(true);
    };

    run();
  }, [domAnimate, jProg, hProg, rProg, jX, jY, hX, hY, rX, rY]);

  return (
    <div
      ref={scope}
      className={className}
      role="img"
      aria-label="JHR Logo Animation: 프론트엔드 개발자 정혁래의 정체성을 담은 ㅈ, ㅎ, ㄹ 애니메이션"
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '180px',
        width: '100%',
      }}
    >
      {/* ㅈ (Blue) */}
      <motion.div
        className="logo-item item-1"
        style={{ position: 'absolute', zIndex: 3 }}
        {...(isInteractive ? hoverProps(COLORS.BLUE) : {})}
      >
        <svg width={BOX} height={BOX} viewBox={`0 0 ${VIEW} ${VIEW}`}>
          <title>ㅈ</title>
          <motion.circle
            cx={jX}
            cy={jY}
            r={DOT_R}
            fill={COLORS.BLUE}
            style={{ opacity: jDotOpacity }}
          />
          <motion.g className="j-group">
            <motion.path
              ref={jPathRef}
              d={J_PATH}
              transform={jMatrix}
              stroke={COLORS.BLUE}
              strokeWidth={STROKE / jScale}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              strokeDasharray={jLen || 0}
              style={{ strokeDashoffset: jDashOffset }}
            />
          </motion.g>
        </svg>
      </motion.div>

      {/* ㅎ (Green) */}
      <motion.div
        className="logo-item item-2"
        style={{ position: 'absolute', zIndex: 2 }}
        {...(isInteractive ? hoverProps(COLORS.GREEN) : {})}
      >
        <svg width={BOX} height={BOX} viewBox={`0 0 ${VIEW} ${VIEW}`}>
          <title>ㅎ</title>
          <motion.circle
            cx={hX}
            cy={hY}
            r={DOT_R}
            fill={COLORS.GREEN}
            style={{ opacity: hDotOpacity }}
          />
          <motion.g className="h-group">
            <motion.path
              ref={hPathRef}
              d={H_PATH}
              transform={hMatrix}
              stroke={COLORS.GREEN}
              strokeWidth={STROKE / hScale}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              strokeDasharray={hLen || 0}
              style={{ strokeDashoffset: hDashOffset }}
            />
          </motion.g>
        </svg>
      </motion.div>

      {/* ㄹ (Yellow) */}
      <motion.div
        className="logo-item item-3"
        style={{ position: 'absolute', zIndex: 1 }}
        {...(isInteractive ? hoverProps(COLORS.YELLOW) : {})}
      >
        <svg width={BOX} height={BOX} viewBox={`0 0 ${VIEW} ${VIEW}`}>
          <title>ㄹ</title>
          <motion.circle
            cx={rX}
            cy={rY}
            r={DOT_R}
            fill={COLORS.YELLOW}
            style={{ opacity: rDotOpacity }}
          />
          <motion.g className="r-group">
            <motion.path
              ref={rPathRef}
              d={R_PATH}
              transform={rMatrix}
              stroke={COLORS.YELLOW}
              strokeWidth={STROKE / rScale}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              strokeDasharray={rLen || 0}
              style={{ strokeDashoffset: rDashOffset }}
            />
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
}
