// Shared docs-site chrome: header (logo + main menu), footer. Values from docs/app/@theme.
const DS = window.BeastDadosferaDesignSystem_d7d0ae;
const MAIN_MENU = [{ title: 'Introdução', route: 'docs' }, { title: 'Branding', route: 'cores' }, { title: 'Componentes', route: 'componentes' }, { title: 'Recursos', route: 'recursos' }];

function DocsHeader({ light, route, go, showSearch }) {
  const { Search, Icon } = DS;
  const fg = light ? '#ffffff' : '#000';
  const itemFg = light ? '#ffffff' : '#8994a3';
  const activeFg = light ? '#ffffff' : 'var(--color-primary-default)';
  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '4.25rem', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '0.875rem 1.125rem', paddingLeft: light ? 0 : '1.125rem', width: light ? undefined : '16rem' }}>
        {!light && <button onClick={() => go('docs')} style={{ border: 0, background: 'transparent', marginRight: 8, display: 'none' }}><Icon icon="menu-2" /></button>}
        <a href="#home" onClick={(e) => { e.preventDefault(); go('home'); }} style={{ display: 'flex', textDecoration: 'none' }}>
          <img src="../../../design-system/assets/img/beast-logo-1.png" style={{ maxWidth: 180, height: 44, filter: light ? 'brightness(0) invert(1)' : 'none' }} alt="Beast" />
        </a>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: light ? 'flex-start' : 'space-around', padding: '0.875rem 1.125rem' }}>
        <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, minWidth: light ? undefined : '28rem', justifyContent: light ? 'flex-start' : 'space-around', flex: 1 }}>
          {MAIN_MENU.map((m) => { const active = route === m.route || (m.route === 'componentes' && /^comp/.test(route || '')); return (
            <li key={m.title} style={{ marginTop: light ? 0 : '.25rem' }}>
              <a href={'#' + m.route} onClick={(e) => { e.preventDefault(); go(m.route); }} style={{ display: 'block', padding: '0.675rem 1rem', fontSize: '0.95rem', fontWeight: active && !light ? 700 : 400, color: active ? activeFg : itemFg, textDecoration: 'none' }}>{m.title}</a>
            </li>
          ); })}
        </ul>
        {showSearch && <div style={{ marginLeft: 'auto', color: '#8994a3' }}><Search placeholder="Buscar na documentação" /></div>}
      </div>
    </div>
  );
}

function DocsFooter({ light }) {
  const { Icon } = DS;
  const fg = light ? '#919fb1' : '#8994a3';
  const col = { listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '.5rem', fontSize: '.875rem', color: fg };
  const title = { color: light ? '#fff' : '#0d1c2e', fontWeight: 700, fontSize: '.9375rem' };
  return (
    <footer style={{ maxWidth: 960, margin: '0 auto', padding: '1.25rem 0', display: 'grid', gridTemplateColumns: '120px 1fr 1fr 1.6fr', gap: 24, alignItems: 'start' }}>
      <div><a href="https://www.dadosfera.ai/" target="_blank" rel="noreferrer"><img src="../../../design-system/assets/img/dadosfera-somente-d.svg" style={{ width: 56 }} alt="Dadosfera" /></a></div>
      <ul style={col}><li style={title}>Dadosfera</li><li><a href="https://www.dadosfera.ai/" target="_blank" rel="noreferrer" style={{ color: fg, textDecoration: 'none' }}>Homepage</a></li><li><a href="https://www.dadosfera.ai/plataforma/" target="_blank" rel="noreferrer" style={{ color: fg, textDecoration: 'none' }}>Plataforma</a></li><li><a href="https://docs.dadosfera.ai/" target="_blank" rel="noreferrer" style={{ color: fg, textDecoration: 'none' }}>Documentação</a></li></ul>
      <ul style={col}><li style={title}>Nos siga</li><li style={{ display: 'flex', gap: 12, color: '#cdd6e3' }}><Icon icon="github" size="1.5rem" /><Icon icon="linkedin" size="1.5rem" /><Icon icon="facebook" size="1.5rem" /></li></ul>
      <ul style={col}><li style={title}>Contato</li><li><a href="mailto:produto@dadosfera.ai" style={{ color: fg, textDecoration: 'none' }}>produto@dadosfera.ai</a></li><li style={{ fontSize: '.75rem', lineHeight: 1.5 }}>© 2022 Essa documentação é baseada no Nebular Docs,<br />criada por Akveo LLC,<br />que, por sua vez, está licenciada sob CC BY 4.0</li></ul>
    </footer>
  );
}
Object.assign(window, { DocsHeader, DocsFooter, MAIN_MENU });
