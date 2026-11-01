// Runtime configuration. Override with REACT_APP_* variables in FrontEnd/.env
export const API_BASE = (process.env.REACT_APP_API_URL || '').replace(/\/$/, '');

export const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN || 'dev-fbkinoo8f2q6g3nk.us.auth0.com';
export const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID || 'hRR9Ch4YfsiWa8sBu2sLF54O9hbXOzpQ';

export const CONTACT = {
  email: 'shubhamzarekar33@gmail.com',
  phone: '+91 72763 86900',
  phoneHref: 'tel:+917276386900',
  whatsapp: 'https://wa.me/917276386900',
  instagram: 'https://www.instagram.com/shubh_zarekar',
};
