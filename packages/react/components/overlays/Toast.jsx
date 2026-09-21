import React from 'react';
import { Icon } from '../core/Icon.jsx';

// NbToastr / NbToast: 1rem padding, 1px border, basic-1 icon disc; status fills the card. Container stacks toasts at a corner.
const ICONS = { primary: 'checkmark-outline', success: 'checkmark-outline', info: 'question-mark-outline', warning: 'alert-triangle-outline', danger: 'flash-outline', basic: 'email-outline', control: 'email-outline' };
export function Toast({ title, message, status = 'basic', icon, hasIcon = true, destroyByClick = true, onClose, style }) {
  const basic = status === 'basic';
  const bg = basic ? 'var(--background-basic-color-1)' : status === 'control' ? 'var(--color-control-default)' : `var(--color-${status}-default)`;
  const fg = basic || status === 'control' ? 'var(--text-basic-color)' : 'var(--text-control-color)';
  const iconColor = basic ? 'var(--text-basic-color)' : status === 'control' ? 'var(--color-basic-800)' : `var(--color-${status}-default)`;
  return (
    <div onClick={destroyByClick ? onClose : undefined} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: 'var(--toastr-padding)', minWidth: '20rem', maxWidth: '28rem', border: `var(--toastr-border-width) solid ${basic ? 'var(--border-basic-color-3)' : bg}`, borderRadius: 'var(--toastr-border-radius)', background: bg, color: fg, boxShadow: 'var(--shadow)', cursor: destroyByClick ? 'pointer' : 'default', fontFamily: 'var(--font-family-primary)', ...style }}>
      {hasIcon && <span style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: status === 'control' ? 'var(--color-control-default)' : 'var(--background-basic-color-1)', color: iconColor, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: basic ? '1px solid var(--border-basic-color-3)' : 0 }}><Icon icon={icon || ICONS[status]} size="1.5rem" /></span>}
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div style={{ fontSize: 'var(--text-subtitle-font-size)', fontWeight: 600, lineHeight: 'var(--text-subtitle-line-height)' }}>{title}</div>}
        {message && <div style={{ fontSize: 'var(--text-paragraph-2-font-size)', lineHeight: 'var(--text-paragraph-2-line-height)' }}>{message}</div>}
      </div>
    </div>
  );
}
// Positions: top-right | top-left | bottom-right | bottom-left | top-start | top-end | bottom-start | bottom-end
export function ToastContainer({ toasts = [], position = 'top-right', onClose, style }) {
  const pos = { top: position.startsWith('top') ? '1.25rem' : undefined, bottom: position.startsWith('bottom') ? '1.25rem' : undefined, right: /right|end/.test(position) ? '1.25rem' : undefined, left: /left|start/.test(position) ? '1.25rem' : undefined };
  return (
    <div style={{ position: 'fixed', ...pos, display: 'flex', flexDirection: 'column', gap: '.75rem', zIndex: 1050, ...style }}>
      {toasts.map((t) => <Toast key={t.id} {...t} onClose={() => onClose && onClose(t.id)} />)}
    </div>
  );
}
