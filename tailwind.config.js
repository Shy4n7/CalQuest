/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#6B8DD6',      // Warm periwinkle blue
                secondary: '#8B7EC8',    // Soft purple
                accent: '#E8A87C',       // Warm peach
                background: '#0a0e27',   // Deep night blue-black
                surface: '#1a1535',      // Purple-tinted dark
                surfaceLight: '#2a2545', // Lighter surface
                textPrimary: '#E8E6F0',  // Soft white with warmth
                textSecondary: '#A8A4B8', // Muted lavender-gray
                success: '#7EC8A3',      // Soft mint green
                error: '#E88B8B',        // Soft coral red
                glow: '#9BB8E8',         // Soft blue glow
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                heading: ['Poppins', 'system-ui', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-out',
                'slide-in': 'slideIn 0.3s ease-out',
                'scale-up': 'scaleUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                'confetti': 'confetti 1s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideIn: {
                    '0%': { transform: 'translateY(-20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                scaleUp: {
                    '0%': { transform: 'scale(0.9)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                confetti: {
                    '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
                    '100%': { transform: 'translateY(-100px) rotate(360deg)', opacity: '0' },
                },
            },
        },
    },
    plugins: [],
}
