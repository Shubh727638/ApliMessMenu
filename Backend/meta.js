// Builds the social-preview (<meta>) tags injected into the served HTML so that
// links shared on WhatsApp, Facebook, Twitter, etc. show a rich card. Crawlers
// read the raw server HTML and do not run React, so these must be set server-side.
const store = require('./store');

const SITE = {
  name: 'Apli Mess Menu',
  title: 'Apli Mess Menu — Find mess menus near you',
  description:
    'Compare daily menus, prices, timings and ratings of messes and tiffin services near you.',
};

const escapeHtml = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const rupee = (n) => (typeof n === 'number' ? `₹${n.toLocaleString('en-IN')}` : null);

function originOf(req) {
  const proto = (req.headers['x-forwarded-proto'] || req.protocol || 'http').split(',')[0];
  return `${proto}://${req.get('host')}`;
}

async function metaFor(req) {
  const origin = originOf(req);
  const url = origin + req.originalUrl;
  let title = SITE.title;
  let description = SITE.description;

  const messMatch = req.path.match(/^\/mess\/([^/]+)\/?$/);
  if (messMatch) {
    try {
      const mess = await store.getMess(decodeURIComponent(messMatch[1]));
      if (mess) {
        const bits = [
          rupee(mess.monthlyPrice) && `${rupee(mess.monthlyPrice)}/month`,
          mess.area,
          mess.type === 'non-veg' ? 'Veg & Non-veg' : 'Pure Veg',
        ].filter(Boolean);
        title = `${mess.name} — ${mess.area || SITE.name}`;
        const menuPreview = (mess.menu?.lunch || []).slice(0, 4).join(', ');
        description =
          `${bits.join(' · ')}.` + (menuPreview ? ` Today's lunch: ${menuPreview}.` : '');
      }
    } catch {
      /* fall back to site defaults */
    }
  }

  const image = `${origin}/og-default.jpg`;
  // Only og/twitter tags: the static <title>/<meta description> stay as the
  // baseline, and these drive the shared-link preview card.
  return `<meta property="og:site_name" content="${escapeHtml(SITE.name)}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${escapeHtml(url)}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />`;
}

module.exports = { metaFor };
