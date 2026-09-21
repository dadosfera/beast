// Platform shell: nb-layout (header fixed + sidebar + column) in the Beast default theme, populated with the Dadosfera module icons.
// Illustrative composition — the repo ships the components and theme, not the platform's screens.
const DS = window.BeastDadosferaDesignSystem_d7d0ae;
function Shell() {
  const { Layout, LayoutHeader, LayoutBody, LayoutColumn, LayoutFooter, Sidebar, Menu, Actions, User, Card, CardHeader, CardBody, CardFooter, Button, Input, Select, Tabset, TreeGrid, Badge, Tag, Pagination, ProgressBar, Search, Toast, ToastContainer, ContextMenu, Icon } = DS;
  const [sidebar, setSidebar] = React.useState('expanded');
  const [toasts, setToasts] = React.useState([]);
  const [tab, setTab] = React.useState('datasets');
  const push = (t) => setToasts((ts) => [...ts, { id: Date.now(), ...t }]);
  const menu = [
    { title: 'Início', icon: 'home-outline' },
    { group: true, title: 'Módulos' },
    { title: 'Coletar', icon: 'coletar' }, { title: 'Explorar', icon: 'explorar' }, { title: 'Catálogo', icon: 'catalogo', badge: { text: '12', status: 'primary' } }, { title: 'Analisar', icon: 'analisar' }, { title: 'Inteligência', icon: 'inteligencia', children: [{ title: 'Notebooks' }, { title: 'Modelos' }, { title: 'Pipelines AI' }] }, { title: 'Entregar', icon: 'entrega' },
    { group: true, title: 'Governança' },
    { title: 'Qualidade', icon: 'qualidade' }, { title: 'Controlar', icon: 'controlar' }, { title: 'Workspaces', icon: 'workspaces' },
  ];
  const rows = [
    { data: { name: 'vendas', type: 'table', owner: 'Ana Souza', rows: 1240000, quality: 96, status: 'Certificado' }, children: [{ data: { name: 'vendas_2024', type: 'parquet', owner: 'Ana Souza', rows: 400000, quality: 98, status: 'Certificado' } }, { data: { name: 'vendas_2023', type: 'csv', owner: 'Bruno Lima', rows: 840000, quality: 88, status: 'Rascunho' } }] },
    { data: { name: 'clientes', type: 'table', owner: 'Carla Dias', rows: 98000, quality: 74, status: 'Em revisão' } },
    { data: { name: 'produtos', type: 'json', owner: 'Diego Reis', rows: 12400, quality: 91, status: 'Certificado' } },
    { data: { name: 'eventos_web', type: 'table', owner: 'Ana Souza', rows: 52000000, quality: 63, status: 'Rascunho' } },
  ];
  const statusColor = { Certificado: 'success', Rascunho: 'basic', 'Em revisão': 'warning' };
  const columns = [
    { key: 'name', title: 'Nome', sortable: true, filter: true, render: (d) => <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem' }}><Icon icon={d.type} status="primary" size="1.125rem" /><strong style={{ fontWeight: 600 }}>{d.name}</strong></span> },
    { key: 'owner', title: 'Responsável', sortable: true, render: (d) => <User name={d.owner} size="small" /> },
    { key: 'rows', title: 'Linhas', sortable: true, render: (d) => d.rows.toLocaleString('pt-BR') },
    { key: 'quality', title: 'Qualidade', sortable: true, render: (d) => <ProgressBar value={d.quality} status={d.quality > 90 ? 'success' : d.quality > 70 ? 'warning' : 'danger'} size="tiny" style={{ width: 120 }} /> },
    { key: 'status', title: 'Status', render: (d) => <Tag text={d.status} status={statusColor[d.status]} size="small" appearance={d.status === 'Rascunho' ? 'filled' : 'outline'} /> },
    { key: 'act', title: '', render: (d) => <ContextMenu items={[{ title: 'Abrir', icon: 'external-link-outline' }, { title: 'Editar', icon: 'edit-outline' }, { title: 'Excluir', icon: 'trash-2-outline' }]} onSelect={(it) => push({ status: it.title === 'Excluir' ? 'danger' : 'basic', title: it.title, message: d.name })}><Button appearance="ghost" size="small" icon="more-vertical-outline" /></ContextMenu> },
  ];
  return (
    <Layout style={{ height: '100%' }}>
      <LayoutHeader fixed>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', width: '100%' }}>
          <Button appearance="ghost" icon="menu-2-outline" onClick={() => setSidebar(sidebar === 'expanded' ? 'compacted' : 'expanded')} />
          <img src="../../../design-system/assets/img/beast-logo-1.png" alt="Beast" style={{ height: 36 }} />
          <div style={{ flex: 1 }} />
          <Select options={['Workspace: Produção', 'Workspace: Staging']} defaultValue="Workspace: Produção" appearance="outline" style={{ minWidth: '14rem' }} />
          <Actions items={[{ content: <Search placeholder="Buscar datasets, pipelines…" /> }, { icon: 'bell-outline', badge: { text: '3', status: 'danger' }, onClick: () => push({ status: 'info', title: 'Notificações', message: '3 execuções concluídas.' }) }, { content: <ContextMenu items={[{ title: 'Perfil', icon: 'person-outline' }, { title: 'Configurações', icon: 'settings-2-outline' }, { title: 'Sair', icon: 'log-out-outline' }]}><User name="Ana Souza" title="Data Engineer" /></ContextMenu> }]} />
        </div>
      </LayoutHeader>
      <LayoutBody>
        <Sidebar state={sidebar} fixed style={{ top: 'var(--header-height)', height: 'calc(100vh - var(--header-height))' }}>
          <Menu items={menu} selected="Catálogo" compact={sidebar === 'compacted'} />
        </Sidebar>
        <LayoutColumn style={{ overflow: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.875rem' }}>
            <div><h4 style={{ margin: 0 }}>Catálogo de dados</h4><span className="caption">Workspace Produção · 1.482 ativos</span></div>
            <div style={{ display: 'flex', gap: '.5rem' }}><Button appearance="outline" icon="download-outline">Exportar</Button><Button status="primary" icon="plus-outline" onClick={() => push({ status: 'success', title: 'Dataset criado', message: 'novo_dataset adicionado ao catálogo.' })}>Novo dataset</Button></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.875rem', marginBottom: '1.875rem' }}>
            {[['Datasets', '1.482', 'dataset', 'primary'], ['Pipelines ativos', '86', 'pipelines', 'info'], ['Qualidade média', '91%', 'qualidade', 'success'], ['Alertas', '4', 'alert-triangle-outline', 'warning']].map(([t, v, ic, st]) => (
              <Card key={t}><CardBody style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><span style={{ width: '2.75rem', height: '2.75rem', borderRadius: 'var(--border-radius-large)', background: `var(--color-${st}-transparent-200)`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Icon icon={ic} status={st} size="1.5rem" /></span><div><div className="caption">{t}</div><div className="h5">{v}</div></div></CardBody></Card>
            ))}
          </div>
          <Card>
            <CardHeader style={{ padding: 0, background: 'var(--background-basic-color-1)' }}><Tabset tabs={[{ id: 'datasets', title: 'Datasets' }, { id: 'pipelines', title: 'Pipelines', badge: { text: '2', status: 'danger' } }, { id: 'apps', title: 'Data apps' }]} active={tab} onChange={setTab} style={{ marginBottom: -1 }} /></CardHeader>
            <CardBody style={{ padding: 0 }}>
              <div style={{ display: 'flex', gap: '.75rem', padding: 'var(--card-padding)', borderBottom: '1px solid var(--divider-color)' }}>
                <Input placeholder="Filtrar por nome" prefixIcon="search-outline" style={{ width: 280 }} />
                <Select placeholder="Tipo" options={['table', 'parquet', 'csv', 'json']} multiple />
                <Select placeholder="Status" options={['Certificado', 'Rascunho', 'Em revisão']} />
                <div style={{ flex: 1 }} />
                <Button appearance="ghost" icon="funnel-outline">Mais filtros</Button>
              </div>
              <TreeGrid columns={columns} rows={rows} />
            </CardBody>
            <CardFooter><Pagination totalCount={1482} pageSize={10} showPageSizeOptions /></CardFooter>
          </Card>
        </LayoutColumn>
      </LayoutBody>
      <ToastContainer toasts={toasts} position="top-right" onClose={(id) => setToasts((ts) => ts.filter((t) => t.id !== id))} />
    </Layout>
  );
}
Object.assign(window, { Shell });
