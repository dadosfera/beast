import React from 'react';
// Eva Icons (default pack in Beast) via window.eva (CDN: https://unpkg.com/eva-icons@1.1.3/eva.min.js)
// plus Dadosfera custom icons registered on window.BeastCustomIcons (assets/icons/custom-icons.js).
export function Icon({ icon, status, size = 'var(--icon-font-size)', style, className, ...rest }) {
  const color = status ? `var(--color-${status}-default)` : 'currentColor';
  let svg = '';
  const custom = typeof window !== 'undefined' && window.BeastCustomIcons && window.BeastCustomIcons[icon];
  const eva = typeof window !== 'undefined' && window.eva && window.eva.icons && window.eva.icons[icon];
  if (custom) svg = custom;
  else if (eva) svg = eva.toSvg({ width: '100%', height: '100%', fill: 'currentColor' });
  return (
    <span className={className} aria-hidden="true" {...rest}
      style={{ display: 'inline-flex', width: size, height: size, fontSize: size, lineHeight: 1, color, flexShrink: 0, verticalAlign: 'middle', ...style }}
      dangerouslySetInnerHTML={{ __html: svg }} />
  );
}
