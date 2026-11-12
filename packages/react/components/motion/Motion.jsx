import React from 'react';

// Motion primitives over tokens/motion.css. Reveal puts an entrance, an ambient loop or hover feedback on any element;
// Stagger gives consecutive children their place in the stagger without wrapping them (flex and grid stay intact).
const COMBINED = { float: 'pop-float', pulse: 'pop-pulse', 'pulse-primary': 'pop-pulse-primary' };
const names = (...parts) => parts.filter(Boolean).join(' ');

export function Reveal({ as: Tag = 'div', variant = 'rise', order = 0, scene, loop, hover, className, style, children, ...rest }) {
  const entrance = Boolean(variant) && variant !== 'none';
  // An entrance and a loop both own `animation`; only pop has combined classes. Any other pair keeps the entrance.
  const entranceName = entrance && variant === 'pop' && COMBINED[loop] ? COMBINED[loop] : variant;
  return (
    <Tag
      className={names(
        entrance && 'motion', entrance && `motion-${entranceName}`, !entrance && loop && `motion-loop-${loop}`,
        scene && `motion-scene-${scene}`, hover && `motion-hover-${hover}`, className,
      )}
      style={entrance && order ? { '--motion-order': order, ...style } : style} {...rest}>
      {children}
    </Tag>
  );
}

export function Stagger({ children, variant = 'rise', from = 0, step = 1, scene }) {
  let position = 0;
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    const order = from + step * position;
    position += 1;
    return React.cloneElement(child, {
      className: names('motion', `motion-${variant}`, scene && `motion-scene-${scene}`, child.props.className),
      style: order ? { '--motion-order': order, ...child.props.style } : child.props.style,
    });
  });
}
