import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '../layout/Card.jsx';

// NbDialogService: a Card centered over a dimmed backdrop. Close on backdrop click / Esc when enabled.
export function Dialog({ open, onClose, title, children, footer, closeOnBackdropClick = true, hasBackdrop = true, width = '32rem', style }) {
  if (!open) return null;
  return (
    <div onMouseDown={(e) => { if (closeOnBackdropClick && e.target === e.currentTarget) onClose && onClose(); }}
      style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: hasBackdrop ? 'rgba(0,0,0,.288)' : 'transparent', zIndex: 1040, padding: '1rem' }}>
      <Card style={{ width, maxWidth: '100%', boxShadow: 'var(--shadow)', ...style }}>
        {title && <CardHeader>{title}</CardHeader>}
        <CardBody>{children}</CardBody>
        {footer && <CardFooter style={{ display: 'flex', justifyContent: 'flex-end', gap: '.5rem' }}>{footer}</CardFooter>}
      </Card>
    </div>
  );
}
