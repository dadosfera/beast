import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '../core/Icon.jsx';
import { Button } from '../core/Button.jsx';
import { User } from '../core/User.jsx';

// NbChat / NbChatMessage / NbChatForm. Card-like frame with a status header; own messages are primary bubbles on the right, replies basic-2 on the left.
export function Chat({ title, messages = [], onSend, status = 'primary', size, scrollBottom = true, placeholder = 'Digite uma mensagem', style }) {
  const [text, setText] = useState('');
  const bodyRef = useRef(null);
  useEffect(() => { if (scrollBottom && bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; }, [messages.length]);
  const H = { tiny: '13.5rem', small: '21.1875rem', medium: '28.875rem', large: '36.5625rem', giant: '44.25rem' };
  const basic = status === 'basic';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: size ? H[size] : '28rem', background: 'var(--background-basic-color-1)', borderRadius: 'var(--border-radius)', boxShadow: 'var(--shadow)', fontFamily: 'var(--font-family-primary)', overflow: 'hidden', ...style }}>
      <div style={{ padding: 'var(--chat-padding)', background: basic ? 'var(--background-basic-color-1)' : `var(--color-${status}-default)`, color: basic ? 'var(--text-basic-color)' : 'var(--text-control-color)', fontSize: 'var(--text-subtitle-font-size)', fontWeight: 600, lineHeight: 'var(--text-subtitle-line-height)', borderBottom: basic ? '1px solid var(--divider-color)' : 0 }}>{title}</div>
      <div ref={bodyRef} style={{ flex: 1, overflowY: 'auto', padding: 'var(--chat-padding)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.map((m, i) => <ChatMessage key={i} {...m} />)}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); if (text.trim()) { onSend && onSend(text.trim()); setText(''); } }} style={{ display: 'flex', gap: '.5rem', padding: 'var(--chat-padding)', borderTop: '1px solid var(--divider-color)' }}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder={placeholder} style={{ flex: 1, padding: 'var(--input-medium-padding)', border: '1px solid var(--input-border-color)', borderRadius: 'var(--border-radius)', fontFamily: 'inherit', fontSize: 'var(--text-subtitle-font-size)', fontWeight: 600, outline: 0 }} />
        <Button status={status} type="submit" icon="paper-plane-outline" />
      </form>
    </div>
  );
}
export function ChatMessage({ message, sender, date, reply, avatar, files = [], quote, type = 'text' }) {
  return (
    <div style={{ display: 'flex', gap: '.5rem', flexDirection: reply ? 'row-reverse' : 'row', alignItems: 'flex-end' }}>
      <User name={sender || ''} picture={avatar} onlyPicture size="medium" color="var(--color-basic-500)" />
      <div style={{ maxWidth: '70%', display: 'flex', flexDirection: 'column', alignItems: reply ? 'flex-end' : 'flex-start', gap: '.25rem' }}>
        <div style={{ padding: '.75rem 1rem', borderRadius: '.5rem', background: reply ? 'var(--color-primary-default)' : 'var(--background-basic-color-2)', color: reply ? 'var(--text-control-color)' : 'var(--text-basic-color)', fontSize: 'var(--text-paragraph-font-size)', lineHeight: 'var(--text-paragraph-line-height)' }}>
          {quote && <div style={{ padding: '.5rem .75rem', marginBottom: '.5rem', borderLeft: '3px solid var(--color-basic-500)', background: 'var(--background-basic-color-2)', color: 'var(--text-hint-color)', fontSize: 'var(--text-paragraph-2-font-size)' }}>{quote}</div>}
          {files.map((f, i) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.25rem', color: reply ? '#fff' : 'var(--text-hint-color)' }}><Icon icon={f.icon || 'file-text-outline'} size="1.25rem" /><a href={f.url || '#'} style={{ color: 'inherit' }}>{f.name}</a></div>)}
          {message}
        </div>
        <span style={{ fontSize: 'var(--text-caption-font-size)', color: 'var(--text-hint-color)' }}>{sender}{date ? ` · ${date}` : ''}</span>
      </div>
    </div>
  );
}
