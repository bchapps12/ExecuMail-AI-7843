export const APP_NAME = 'Executive Mail';
export const STORAGE_KEYS = {
  USER_SETTINGS: 'user_settings',
  AUTH_TOKEN: 'auth_token',
  EMAIL_CACHE: 'email_cache',
  DRAFTS: 'drafts'
};

export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  GMAIL: '/api/gmail',
  SETTINGS: '/api/settings',
  SUMMARIES: '/api/summaries'
};

export const EMAIL_CACHE_DURATION = 1000 * 60 * 30; // 30 minutes
export const EMAILS_PER_PAGE = 10;