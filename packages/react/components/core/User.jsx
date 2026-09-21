import React from 'react';

// NbUser: avatar (picture or initials) with name + title. shape rectangle | semi-round | round.
const SIZE = { tiny: '1.5rem', small: '2rem', medium: 'var(--user-medium-size)', large: '3rem', giant: '4rem' };
const NAME_FS = { tiny: '.75rem', small: '.875rem', medium: 'var(--text-paragraph-font-size)', large: '1.125rem', giant: '1.25rem' };
export function User({ name = '', title, picture, size = 'medium', shape = 'round', onlyPicture, color, badgeText, badgeStatus = 'primary', style }) {
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map((s) => s[0].toUpperCase()).join('');
  const radius = shape === 'round' ? '50%' : shape === 'semi-round' ? '.75rem' : 'var(--border-radius)';
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', fontFamily: 'var(--font-family-primary)', ...style }}>
      <div style={{ position: 'relative', width: SIZE[size], height: SIZE[size], flexShrink: 0 }}>
        <div style={{ width: '100%', height: '100%', borderRadius: radius, border: '1px solid var(--border-basic-color-3)', background: picture ? `url(${picture}) center/cover` : color || 'var(--background-basic-color-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: color ? '#fff' : 'var(--text-basic-color)', fontSize: NAME_FS[size], fontWeight: 400, overflow: 'hidden' }}>
          {!picture && initials}
        </div>
        {badgeText && <span style={{ position: 'absolute', top: 0, right: 0, transform: 'translate(30%,-30%)', padding: '.125rem .3rem', borderRadius: 'var(--border-radius)', background: `var(--color-${badgeStatus}-default)`, color: '#fff', fontSize: '.625rem', fontWeight: 700, lineHeight: '.75rem' }}>{badgeText}</span>}
      </div>
      {!onlyPicture && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
          <span style={{ fontSize: NAME_FS[size], color: 'var(--text-basic-color)', whiteSpace: 'nowrap' }}>{name}</span>
          {title && <span style={{ fontSize: 'var(--text-caption-font-size)', lineHeight: 'var(--text-caption-line-height)', color: 'var(--text-basic-color)', whiteSpace: 'nowrap' }}>{title}</span>}
        </div>
      )}
    </div>
  );
}
