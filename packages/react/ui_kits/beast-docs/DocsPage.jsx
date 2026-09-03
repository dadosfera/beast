// Docs page: fixed header, 16rem sidebar with the Beast structure menu, content column of nb-cards (component demo + tabs), settings column (TOC). From docs/app/documentation + page.
function DocsPage({ route, go }) {
  const { Layout, LayoutHeader, LayoutBody, LayoutColumn, Sidebar, Menu, Card, CardHeader, CardBody, Tabset, Button, Input, Select, Checkbox, Toggle, Alert, Badge, Tag, Pagination, Icon } = DS;
  const menu = [
    { title: 'Início', children: [{ title: 'Sobre' }, { title: 'Biblioteca Angular' }], expanded: true },
    { title: 'Design System', children: [{ title: 'Cores' }, { title: 'Tipografia' }, { title: 'Recursos' }, { title: 'Tema padrão' }, { title: 'Tema dark' }], expanded: true },
    { title: 'Guias', children: [{ title: 'Instalar lib - Angular' }, { title: 'Criar página - Angular' }, { title: 'Variáveis do tema - Angular' }, { title: 'Temas Runtime - Angular' }, { title: 'Trocar tema - Angular' }, { title: 'Manutenção do projeto' }] },
    { title: 'Usabilidade', children: [{ title: 'Right-to-left (RTL)' }] },
    { title: 'Componentes', children: [{ title: 'Overview' }, { title: 'Layout' }, { title: 'Card' }, { title: 'Flip Card' }, { title: 'Reveal Card' }, { title: 'Stepper' }, { title: 'Accordion' }, { title: 'List' }, { title: 'Sidebar' }, { title: 'Menu' }, { title: 'Tabs' }, { title: 'Actions' }, { title: 'Input' }, { title: 'Button' }, { title: 'Button Group' }, { title: 'Checkbox' }, { title: 'Toggle' }, { title: 'Radio' }, { title: 'Select' }, { title: 'Autocomplete' }, { title: 'Datepicker' }, { title: 'Timepicker' }, { title: 'Tag' }, { title: 'Popover' }, { title: 'Context Menu' }, { title: 'Dialog' }, { title: 'Toastr' }, { title: 'Tooltip' }, { title: 'Window' }, { title: 'Global Search' }, { title: 'User (Avatar)' }, { title: 'Alert' }, { title: 'Icon' }, { title: 'Spinner' }, { title: 'Progress Bar' }, { title: 'Badge' }, { title: 'Pagination' }, { title: 'Chat UI' }, { title: 'Calendar' }, { title: 'Tree Grid' }], expanded: route === 'componentes' },
    { title: 'Serviços', children: [{ title: 'ThemeService' }, { title: 'MediaBreakpoints' }] },
    { title: 'Segurança', children: [{ title: 'Introdução' }, { title: 'ACL' }] },
  ];
  const [sel, setSel] = React.useState(route === 'componentes' ? 'Button' : route === 'cores' ? 'Cores' : route === 'recursos' ? 'Recursos' : 'Sobre');
  React.useEffect(() => { setSel(route === 'componentes' ? 'Button' : route === 'cores' ? 'Cores' : route === 'recursos' ? 'Recursos' : 'Sobre'); }, [route]);
  const tabs = [{ id: 'overview', title: 'Overview' }, { id: 'api', title: 'API' }, { id: 'theme', title: 'Theme' }, { id: 'examples', title: 'Examples' }];
  const H2 = ({ children }) => <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#000', margin: '0 0 1rem', fontFamily: 'var(--font-family-secondary)' }}>{children}</h2>;
  const P = ({ children }) => <p style={{ color: '#494949', margin: '0 0 1rem', lineHeight: 1.6 }}>{children}</p>;
  const Code = ({ children }) => <pre style={{ background: 'var(--docs-code-block-bg)', color: '#fff', padding: '1rem 1.25rem', borderRadius: '.25rem', fontSize: '.8125rem', lineHeight: 1.6, overflow: 'auto', margin: '0 0 1rem' }}>{children}</pre>;
  return (
    <Layout style={{ background: 'var(--docs-page-background)', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      <LayoutHeader fixed style={{ height: '4.25rem', padding: 0, boxShadow: 'none', borderBottom: '1px solid var(--border-basic-color-3)' }}>
        <div style={{ maxWidth: 1440, width: '100%', margin: '0 auto' }}><DocsHeader route={route} go={go} showSearch /></div>
      </LayoutHeader>
      <LayoutBody>
        <Sidebar fixed style={{ boxShadow: 'none', top: '4.25rem', height: 'calc(100vh - 4.25rem)', background: 'var(--docs-page-background)', padding: '2rem 0 2rem 1.125rem' }}>
          <button onClick={() => {}} style={{ border: 0, background: 'transparent', color: '#8994a3', fontSize: '.75rem', fontWeight: 700, textTransform: 'uppercase', cursor: 'pointer', padding: '0 1rem .5rem', fontFamily: 'inherit' }}>Recolher</button>
          <Menu items={menu} selected={sel} onSelect={(it) => setSel(it.title)} style={{ '--menu-item-padding': '.5rem 1rem' }} />
        </Sidebar>
        <LayoutColumn style={{ padding: '3.25rem 1.25rem 3.25rem 1rem', display: 'flex', gap: '.375rem', alignItems: 'flex-start' }}>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {route === 'componentes' ? (
              <>
                <Card style={{ borderRadius: '.25rem', boxShadow: 'var(--shadow-docs-page)', border: 0 }}>
                  <CardHeader style={{ background: '#fff', borderBottom: 0, padding: '1.5rem 1.5rem 0' }}><h1 style={{ fontSize: 'var(--text-heading-4-font-size)', lineHeight: 'var(--text-heading-4-line-height)', margin: 0 }}>{sel}</h1></CardHeader>
                  <CardBody style={{ padding: '0 1.5rem' }}><Tabset tabs={tabs} defaultActive="overview" /></CardBody>
                </Card>
                <Card style={{ borderRadius: '.25rem', boxShadow: 'var(--shadow-docs-page)', border: 0 }}>
                  <CardBody style={{ padding: '2rem 2.5rem' }}>
                    <H2>Overview</H2>
                    <P>Botões básicos. Aparências: <code>filled</code> (padrão), <code>outline</code>, <code>ghost</code>. Status: <code>basic</code>, <code>primary</code>, <code>success</code>, <code>info</code>, <code>warning</code>, <code>danger</code>. Tamanhos: <code>tiny</code> a <code>giant</code>.</P>
                    <Code>{`<button nbButton status="primary">Primary</button>\n<button nbButton appearance="outline" status="primary">Outline</button>\n<button nbButton appearance="ghost" status="primary">Ghost</button>`}</Code>
                    <div style={{ border: '1px solid var(--border-basic-color-3)', borderRadius: '.25rem', padding: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '.75rem', alignItems: 'center', background: '#fff' }}>
                      {['basic', 'primary', 'success', 'info', 'warning', 'danger'].map((s) => <Button key={s} status={s}>{s}</Button>)}
                      {['primary', 'success', 'danger'].map((s) => <Button key={s} appearance="outline" status={s}>{s}</Button>)}
                      <Button appearance="ghost" status="primary">ghost</Button>
                      <Button status="primary" disabled>disabled</Button>
                    </div>
                  </CardBody>
                </Card>
                <Card style={{ borderRadius: '.25rem', boxShadow: 'var(--shadow-docs-page)', border: 0 }}>
                  <CardBody style={{ padding: '2rem 2.5rem' }}>
                    <H2>Exemplo em contexto</H2>
                    <div style={{ border: '1px solid var(--border-basic-color-3)', borderRadius: '.25rem', padding: '1.5rem', background: 'var(--background-basic-color-3)' }}>
                      <Card><CardHeader>Novo pipeline</CardHeader><CardBody style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <Input placeholder="Nome" fullWidth /><Select options={['Diário', 'Semanal', 'Mensal']} placeholder="Frequência" fullWidth />
                        <Checkbox label="Notificar por e-mail" defaultChecked /><Toggle label="Ativo" defaultChecked />
                        <Alert status="info" style={{ gridColumn: '1 / -1' }}>O pipeline será executado no fuso America/Sao_Paulo.</Alert>
                        <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', gap: '.5rem' }}><Button appearance="ghost">Cancelar</Button><Button status="primary" icon="save-outline">Salvar</Button></div>
                      </CardBody></Card>
                    </div>
                  </CardBody>
                </Card>
              </>
            ) : route === 'cores' ? (
              <Card style={{ borderRadius: '.25rem', boxShadow: 'var(--shadow-docs-page)', border: 0 }}><CardBody style={{ padding: '2rem 2.5rem' }}>
                <H2>Cores</H2>
                <P>Nossas cores, quando utilizadas corretamente, melhoram a comunicação e reforçam nossa marca.</P>
                <P>Nós possuímos 5 cores semânticas principais (<code>primary</code>, <code>success</code>, <code>info</code>, <code>warning</code>, <code>danger</code>), e mais 6 níveis de transparência para cada cor semântica padrão (8%, 16%, 24%, 32%, 40%, 48 %) e cor <code>basic</code> (utilizadas em fundos e textos).</P>
                <P>Cada cor possui uma paleta de 9 tons, exceto o <code>basic</code>, que possui 11 tons. Essas cores são usadas principalmente por variantes de <code>status</code> dos componentes.</P>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 6, marginBottom: '1rem' }}>{[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((s) => <div key={s} style={{ height: 56, borderRadius: 4, background: `var(--color-primary-${s})`, color: s >= 500 ? '#fff' : '#333', fontSize: 11, padding: 6, display: 'flex', alignItems: 'flex-end' }}>{s}</div>)}</div>
                <Code>{`color-primary-500: #1700a2,\ncolor-primary-transparent-100: rgba(23, 0, 162, 0.08),`}</Code>
              </CardBody></Card>
            ) : route === 'recursos' ? (
              <Card style={{ borderRadius: '.25rem', boxShadow: 'var(--shadow-docs-page)', border: 0 }}><CardBody style={{ padding: '2rem 2.5rem' }}>
                <H2>Recursos</H2>
                <P>Aqui você pode baixar todos os recursos necessários do nosso design system.</P>
                <h3 style={{ fontSize: '1.375rem', margin: '1.5rem 0 .5rem' }}>Fontes</h3><P>Baixe as principais fontes usadas em nosso Branding e em nossos produtos <a href="#">nesse link</a>.</P>
                <h3 style={{ fontSize: '1.375rem', margin: '1.5rem 0 .5rem' }}>Logotipos</h3><P>Os logotipos são as representações mais imediatas da nossa empresa, cultura e marca.</P>
                <h3 style={{ fontSize: '1.375rem', margin: '1.5rem 0 .5rem' }}>UI Kit</h3><P>Acesse o Figma e você encontrará as versões do protótipo da nossa interface e o design system com os componentes a serem utilizados.</P>
              </CardBody></Card>
            ) : (
              <Card style={{ borderRadius: '.25rem', boxShadow: 'var(--shadow-docs-page)', border: 0 }}><CardBody style={{ padding: '2rem 2.5rem' }}>
                <H2>Sobre</H2>
                <P>Nesta página de showcase você encontra as orientações sobre o Design System Beast, da Dadosfera, criado em Janeiro de 2022.</P>
                <h3 style={{ fontSize: '1.375rem', margin: '1.5rem 0 .5rem' }}>Por que a Dadosfera tem um Design System próprio?</h3>
                <P>O Design System é um ecossistema de bibliotecas instaláveis, com componentes programados e padrões semânticos de design, que reúne padrões de comportamentos e unifica a linguagem do Produto. Apoiando-se no atributo da Plataforma: <strong>Beautiful &amp; Intuitive</strong>, pretendemos levar o reconhecimento e o valor da marca Dadosfera, criando e adaptando elementos de design para que nossos usuários tenhas experiências simples, intuitivas e bonitas.</P>
                <h3 style={{ fontSize: '1.375rem', margin: '1.5rem 0 .5rem' }}>Por que criamos esse Design System?</h3>
                <ul style={{ color: '#494949', lineHeight: 1.8, paddingLeft: '1.25rem' }}><li>Para termos uma identidade própria;</li><li>Uma identidade versátil;</li><li>Uma padronização de fluidez na identidade;</li><li>Uma comunicação objetiva, interna e externamente</li></ul>
              </CardBody></Card>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><Button appearance="ghost" icon="arrow-back-outline">Anterior</Button><Button appearance="ghost" iconEnd="arrow-forward-outline">Próximo</Button></div>
          </div>
          <div style={{ width: '19rem', flexShrink: 0, position: 'sticky', top: '5.5rem' }}>
            <div style={{ fontSize: '.75rem', fontWeight: 700, color: '#8994a3', textTransform: 'uppercase', marginBottom: '.75rem' }}>Nesta página</div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, borderLeft: '2px solid var(--border-basic-color-3)' }}>
              {['Overview', 'Exemplo em contexto', 'API', 'Theme'].map((t, i) => <li key={t} style={{ padding: '.375rem 1rem', fontSize: '.875rem', color: i === 0 ? 'var(--color-primary-default)' : '#494949', borderLeft: i === 0 ? '2px solid var(--color-primary-default)' : '2px solid transparent', marginLeft: -2 }}>{t}</li>)}
            </ul>
          </div>
        </LayoutColumn>
      </LayoutBody>
      <div style={{ borderTop: '1px solid var(--border-basic-color-3)', background: 'var(--docs-page-background)' }}><DocsFooter /></div>
    </Layout>
  );
}
Object.assign(window, { DocsPage });
