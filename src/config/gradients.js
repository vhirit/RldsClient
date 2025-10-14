// Brand gradient definitions for consistent use across the application

export const brandGradients = {
  // Deep navy -> blue panel gradient (Option B)
  panel: 'linear-gradient(135deg, #0f1f3b 0%, #153e74 5%, #256dbe 50%, #4facfe 100%)',
  // Soft panel bg if needed
  panelSoft: 'linear-gradient(135deg, rgba(15,31,59,0.04) 0%, rgba(21,62,116,0.06) 35%, rgba(37,109,190,0.06) 70%, rgba(79,172,254,0.08) 100%)',
  
  // Common UI gradients
  primary: 'linear-gradient(135deg, #0f1f3b 0%, #256dbe 100%)',
  secondary: 'linear-gradient(135deg, #153e74 0%, #4facfe 100%)',
  
  // Status gradients
  success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  warning: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  error: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  info: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
  
  // Background gradients
  bgLight: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  bgBlue: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
  bgPurple: 'linear-gradient(135deg, #e9d5ff 0%, #ddd6fe 100%)',
  
  // Avatar/Profile gradients
  avatar: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
  profileHeader: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)',
};

export const brandTextGradients = {
  // Accent gradient for text (teal -> violet) used in section kicker labels
  accent: 'linear-gradient(90deg, #4facfe 0%, #a445b2 60%, #6a11cb 100%)',
  
  // Primary text gradient
  primary: 'linear-gradient(90deg, #0f1f3b 0%, #256dbe 100%)',
  
  // Hero/Title gradients
  hero: 'linear-gradient(90deg, #1e40af 0%, #7c3aed 100%)',
  title: 'linear-gradient(90deg, #0f172a 0%, #334155 100%)',
};

// CSS-in-JS compatible gradients
export const gradientStyles = {
  panel: { background: brandGradients.panel },
  panelSoft: { background: brandGradients.panelSoft },
  primary: { background: brandGradients.primary },
  secondary: { background: brandGradients.secondary },
  success: { background: brandGradients.success },
  warning: { background: brandGradients.warning },
  error: { background: brandGradients.error },
  info: { background: brandGradients.info },
  bgLight: { background: brandGradients.bgLight },
  bgBlue: { background: brandGradients.bgBlue },
  bgPurple: { background: brandGradients.bgPurple },
  avatar: { background: brandGradients.avatar },
  profileHeader: { background: brandGradients.profileHeader },
};

// Tailwind-compatible gradient classes mapping
export const gradientClasses = {
  // Replace common gradient classes with our brand gradients
  'bg-gradient-to-r from-blue-600 to-purple-600': 'brand-gradient-primary',
  'bg-gradient-to-br from-blue-500 to-purple-600': 'brand-gradient-avatar',
  'bg-gradient-to-r from-gray-50 to-white': 'brand-gradient-panel-soft',
  'bg-gradient-to-br from-gray-50 to-blue-50/20': 'brand-gradient-bg-light',
  'bg-gradient-to-r from-blue-50 to-indigo-50': 'brand-gradient-bg-blue',
};

export const palette = {
  gradients: brandGradients,
  text: brandTextGradients,
  styles: gradientStyles,
  classes: gradientClasses,
};

export default palette;