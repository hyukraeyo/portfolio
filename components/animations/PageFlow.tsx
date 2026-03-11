'use client';

import type { PropsWithChildren } from 'react';
import { LayoutGroup, m } from 'framer-motion';

const FLOW_EASE = [0.22, 1, 0.36, 1] as const;
const FLOW_DURATION = 0.82;

export function PageFlow({ children }: PropsWithChildren) {
  return <LayoutGroup id="home-flow">{children}</LayoutGroup>;
}

export function PageFlowItem({ children }: PropsWithChildren) {
  return (
    <m.div
      layout
      transition={{
        layout: { duration: FLOW_DURATION, ease: FLOW_EASE },
      }}
    >
      {children}
    </m.div>
  );
}
