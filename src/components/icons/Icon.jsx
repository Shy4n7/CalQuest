// Custom SVG Icon Component
const Icon = ({ name, size = 24, color = 'currentColor', className = '' }) => {
    const icons = {
        // Logo
        logo: (
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 70 Q 50 30, 70 70" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
                <circle cx="50" cy="45" r="4" fill={color} />
                <path d="M 45 60 L 50 50 L 55 60" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <circle cx="50" cy="50" r="35" stroke={color} strokeWidth="2" fill="none" opacity="0.3" />
            </svg>
        ),

        // Calculus concepts
        derivative: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 18 Q 8 12, 12 14 T 20 10" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
                <line x1="14" y1="8" x2="18" y2="12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="12" cy="14" r="1.5" fill={color} />
            </svg>
        ),

        integral: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 18 Q 10 12, 14 14 T 18 10" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M6 18 L 6 10 Q 10 12, 14 14 T 18 10 L 18 18 Z" fill={color} opacity="0.2" />
                <path d="M8 6 Q 8 4, 9 4 Q 10 4, 10 6 L 10 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </svg>
        ),

        limit: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" fill="none" />
                <circle cx="12" cy="12" r="6" stroke={color} strokeWidth="1.5" fill="none" opacity="0.4" strokeDasharray="2 2" />
                <path d="M 18 6 L 12 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="18" cy="6" r="1.5" fill={color} />
            </svg>
        ),

        // UI Icons
        book: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6 C 4 4, 6 4, 12 4 C 18 4, 20 4, 20 6 L 20 18 C 20 19, 18 20, 12 20 C 6 20, 4 19, 4 18 Z" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
                <line x1="12" y1="4" x2="12" y2="20" stroke={color} strokeWidth="1.5" />
                <line x1="8" y1="9" x2="10" y2="9" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),

        trophy: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 6 L 8 4 L 16 4 L 16 6" stroke={color} strokeWidth="2" strokeLinecap="round" />
                <path d="M7 6 L 7 10 C 7 13, 9 15, 12 15 C 15 15, 17 13, 17 10 L 17 6 Z" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
                <line x1="12" y1="15" x2="12" y2="18" stroke={color} strokeWidth="2" />
                <line x1="9" y1="18" x2="15" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" />
                <path d="M 6 7 C 4 7, 3 8, 3 9 C 3 10, 4 11, 6 11" stroke={color} strokeWidth="1.5" fill="none" />
                <path d="M 18 7 C 20 7, 21 8, 21 9 C 21 10, 20 11, 18 11" stroke={color} strokeWidth="1.5" fill="none" />
            </svg>
        ),

        flame: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3 C 10 7, 8 10, 8 13 C 8 16, 10 18, 12 18 C 14 18, 16 16, 16 13 C 16 10, 14 7, 12 3 Z" stroke={color} strokeWidth="2" fill={color} opacity="0.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 8 C 11 10, 10 11, 10 13 C 10 14.5, 11 15.5, 12 15.5 C 13 15.5, 14 14.5, 14 13 C 14 11, 13 10, 12 8 Z" fill={color} />
            </svg>
        ),

        star: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2 L 14.5 9 L 22 9.5 L 16.5 14.5 L 18 22 L 12 18 L 6 22 L 7.5 14.5 L 2 9.5 L 9.5 9 Z" stroke={color} strokeWidth="2" fill={color} opacity="0.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),

        target: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill="none" />
                <circle cx="12" cy="12" r="5" stroke={color} strokeWidth="2" fill="none" />
                <circle cx="12" cy="12" r="2" fill={color} />
            </svg>
        ),

        quiz: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill="none" />
                <path d="M 10 10 C 10 8, 11 7, 12 7 C 13 7, 14 8, 14 9 C 14 10, 13 10.5, 12 11 L 12 13" stroke={color} strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="16" r="1" fill={color} />
            </svg>
        ),

        check: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 6 12 L 10 16 L 18 8" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),

        lock: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="11" width="12" height="9" rx="2" stroke={color} strokeWidth="2" fill="none" />
                <path d="M 9 11 L 9 7 C 9 5, 10 4, 12 4 C 14 4, 15 5, 15 7 L 15 11" stroke={color} strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="15" r="1.5" fill={color} />
            </svg>
        ),

        home: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 3 12 L 12 3 L 21 12 L 21 20 L 15 20 L 15 15 L 9 15 L 9 20 L 3 20 Z" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),

        user: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="8" r="4" stroke={color} strokeWidth="2" fill="none" />
                <path d="M 6 20 C 6 16, 8 14, 12 14 C 16 14, 18 16, 18 20" stroke={color} strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),

        arrow: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 5 12 L 19 12" stroke={color} strokeWidth="2" strokeLinecap="round" />
                <path d="M 14 7 L 19 12 L 14 17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),

        lightbulb: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 9 18 L 9 16 C 7 15, 6 13, 6 10 C 6 7, 8 4, 12 4 C 16 4, 18 7, 18 10 C 18 13, 17 15, 15 16 L 15 18" stroke={color} strokeWidth="2" strokeLinecap="round" />
                <line x1="9" y1="18" x2="15" y2="18" stroke={color} strokeWidth="2" />
                <line x1="10" y1="21" x2="14" y2="21" stroke={color} strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    }

    const iconSvg = icons[name] || icons.star

    return (
        <span
            className={`inline-flex items-center justify-center ${className}`}
            style={{ width: size, height: size }}
            aria-hidden="true"
        >
            {iconSvg}
        </span>
    )
}

export default Icon
