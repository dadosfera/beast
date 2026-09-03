import React, { useState } from 'react';
import { Icon } from '../core/Icon.jsx';
import { Button } from '../core/Button.jsx';

// NbStepper / NbStep: 2rem circular indices joined by connectors; completed = primary fill, active = primary border.
export function Stepper({ steps = [], active, defaultActive = 0, onChange, orientation = 'horizontal', linear, disableStepNavigation, showControls = true, style }) {
  const [internal, setInternal] = useState(defaultActive);
  const cur = active !== undefined ? active : internal;
  const go = (i) => { if (i < 0 || i >= steps.length) return; setInternal(i); onChange && onChange(i); };
  const vertical = orientation === 'vertical';
  return (
    <div style={{ display: 'flex', flexDirection: vertical ? 'row' : 'column', fontFamily: 'var(--font-family-primary)', ...style }}>
      <div style={{ display: 'flex', flexDirection: vertical ? 'column' : 'row', alignItems: vertical ? 'stretch' : 'center', gap: 0 }}>
        {steps.map((s, i) => {
          const done = i < cur, act = i === cur;
          return (
            <React.Fragment key={i}>
              <div onClick={() => !disableStepNavigation && (!linear || i <= cur) && go(i)} style={{ display: 'flex', flexDirection: vertical ? 'row' : 'column', alignItems: 'center', gap: '.5rem', cursor: disableStepNavigation ? 'default' : 'pointer', minWidth: vertical ? undefined : '6rem' }}>
                <span style={{ width: 'var(--stepper-step-index-width)', height: 'var(--stepper-step-index-width)', borderRadius: '50%', border: `1px solid ${done ? 'var(--color-primary-default)' : act ? 'var(--color-primary-active)' : 'var(--border-basic-color-4)'}`, background: done ? 'var(--color-primary-default)' : 'transparent', color: done ? 'var(--text-control-color)' : act ? 'var(--text-primary-active-color)' : 'var(--text-hint-color)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--text-paragraph-font-size)', flexShrink: 0 }}>
                  {done ? <Icon icon="checkmark-outline" size="1rem" /> : i + 1}
                </span>
                <span style={{ color: done ? 'var(--text-primary-color)' : act ? 'var(--text-primary-active-color)' : 'var(--text-hint-color)', fontSize: 'var(--text-paragraph-font-size)', lineHeight: 'var(--text-paragraph-line-height)', whiteSpace: 'nowrap' }}>{s.label}</span>
              </div>
              {i < steps.length - 1 && <span style={{ flex: 1, minWidth: vertical ? 0 : '2rem', minHeight: vertical ? '2rem' : 0, height: vertical ? undefined : 1, width: vertical ? 1 : undefined, margin: vertical ? '.25rem 0 .25rem calc(var(--stepper-step-index-width) / 2)' : '0 .5rem', marginBottom: vertical ? undefined : '1.5rem', background: done ? 'var(--color-primary-default)' : 'var(--stepper-connector-color)' }} />}
            </React.Fragment>
          );
        })}
      </div>
      <div style={{ padding: '1.25rem', flex: 1 }}>
        {steps[cur] && steps[cur].content}
        {showControls && (
          <div style={{ display: 'flex', gap: '.5rem', marginTop: '1rem' }}>
            <Button appearance="outline" disabled={cur === 0} onClick={() => go(cur - 1)}>Anterior</Button>
            <Button status="primary" disabled={cur === steps.length - 1} onClick={() => go(cur + 1)}>Próximo</Button>
          </div>
        )}
      </div>
    </div>
  );
}
