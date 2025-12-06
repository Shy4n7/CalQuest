// Framer Motion animation variants

// Tangent line rotation animation
export const tangentLineVariants = {
    hidden: { opacity: 0, rotate: 0 },
    visible: {
        opacity: 1,
        rotate: 45,
        transition: { duration: 0.3, ease: 'easeOut' },
    },
}

// Confetti burst
export const confettiVariants = {
    initial: { opacity: 1, y: 0, scale: 1 },
    exit: {
        opacity: 0,
        y: -100,
        scale: 0,
        transition: { duration: 1 },
    },
}

// Progress bar fill
export const progressBarVariants = {
    initial: { width: '0%' },
    animate: (percent) => ({
        width: `${percent}%`,
        transition: { duration: 1, ease: 'easeOut' },
    }),
}

// Button hover effect
export const buttonVariants = {
    hover: {
        scale: 1.05,
        boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
    },
    tap: { scale: 0.95 },
}

// Card entrance
export const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: 'easeOut' },
    },
}

// Fade in animation
export const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.3 },
    },
}

// Slide in from top
export const slideInTopVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.3, ease: 'easeOut' },
    },
}

// Scale up animation
export const scaleUpVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: { duration: 0.4, type: 'spring', stiffness: 100 },
    },
}

// Stagger children animation
export const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
}

// XP counter animation
export const xpCounterVariants = {
    initial: { scale: 1 },
    increment: {
        scale: [1, 1.2, 1],
        transition: { duration: 0.3 },
    },
}

// Badge unlock animation
export const badgeUnlockVariants = {
    hidden: { scale: 0, rotate: -180, opacity: 0 },
    visible: {
        scale: 1,
        rotate: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 200,
            damping: 15,
        },
    },
}
