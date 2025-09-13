/**
 * Premium Design System - Swiss Minimalism Inspired
 * Colors, spacing, and typography for a luxury professional platform
 */

export const designSystem = {
  colors: {
    // Primary palette - sophisticated grays and whites
    primary: {
      50: '#fafafa',   // Almost white
      100: '#f5f5f5',  // Light gray
      200: '#e5e5e5',  // Border gray
      300: '#d4d4d4',  // Medium gray
      400: '#a3a3a3',  // Text gray
      500: '#737373',  // Primary text
      600: '#525252',  // Dark text
      700: '#404040',  // Darker text
      800: '#262626',  // Very dark
      900: '#171717',  // Almost black
    },
    // Accent - subtle blue for CTAs and highlights
    accent: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      500: '#0ea5e9',  // Primary accent
      600: '#0284c7',  // Hover state
      700: '#0369a1',  // Active state
    },
    // Success - refined green
    success: {
      50: '#f0fdf4',
      500: '#22c55e',
      600: '#16a34a',
    },
    // Neutral backgrounds
    background: {
      primary: '#ffffff',
      secondary: '#fafafa',
      tertiary: '#f5f5f5',
    }
  },
  
  spacing: {
    // Perfect spacing scale - not too tight, not too loose
    xs: '0.5rem',    // 8px
    sm: '1rem',      // 16px
    md: '1.5rem',    // 24px
    lg: '2rem',      // 32px
    xl: '3rem',      // 48px
    '2xl': '4rem',   // 64px
    '3xl': '6rem',   // 96px
    '4xl': '8rem',   // 128px
  },
  
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',   // 12px
      sm: '0.875rem',  // 14px
      base: '1rem',    // 16px
      lg: '1.125rem',  // 18px
      xl: '1.25rem',   // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',   // 48px
      '6xl': '3.75rem', // 60px
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    }
  },
  
  shadows: {
    // Subtle, elegant shadows
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
  
  borderRadius: {
    sm: '0.375rem',  // 6px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    '2xl': '1.5rem', // 24px
  }
}

// Utility classes for consistent styling
export const premiumStyles = {
  container: 'max-w-7xl mx-auto px-6',
  section: 'py-24',
  card: 'bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300',
  button: {
    primary: 'bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200',
    secondary: 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-3 rounded-lg transition-colors duration-200',
    accent: 'bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200',
  },
  text: {
    heading: 'text-gray-900 font-semibold',
    subheading: 'text-gray-600 font-medium',
    body: 'text-gray-700',
    muted: 'text-gray-500',
  }
}
