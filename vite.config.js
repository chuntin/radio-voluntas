const normalizeBase = (base) => {
  if (!base || base === '/') return '/';

  const withLeadingSlash = base.startsWith('/') ? base : `/${base}`;
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`;
};

const base = normalizeBase(process.env.VITE_BASE_URL || process.env.BASE_URL || '/');

module.exports = {
  base,
};
