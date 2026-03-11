'use client';

import { m } from 'framer-motion';
import { ReactNode } from 'react';

export default function DetailFadeIn({ children }: { children: ReactNode }) {
    return (
        <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            {children}
        </m.div>
    );
}
