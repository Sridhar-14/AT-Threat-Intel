// Environment configuration
const isDevelopment = import.meta.env.DEV;

export const config = {
  apiBaseUrl: isDevelopment ? null : (import.meta.env.VITE_API_BASE_URL || 'https://api.learn.niituniversity.in'),
  isDevelopment
};