'use client';

import { m } from 'framer-motion';
import { ReactNode } from 'react';

interface StaggerContainerProps {
    children: ReactNode;
    delay?: number;
    staggerDelay?: number;
    className?: string;
}

export default function StaggerContainer({
    children,
    delay = 0,
    staggerDelay = 0.1,
    className = '',
}: StaggerContainerProps) {
    return (
        <m.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            variants={{
                hidden: {},
                show: {
                    transition: {
                        staggerChildren: staggerDelay,
                        delayChildren: delay,
                    },
                },
            }}
            className={className}
        >
            {children}
        </m.div>
    );
}

interface StaggerItemProps {
    children: ReactNode;
    className?: string;
}

export function StaggerItem({ children, className = '' }: StaggerItemProps) {
    return (
        <m.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.5,
                        ease: 'easeOut',
                    },
                },
            }}
            className={className}
        >
            {children}
        </m.div>
    );
}
