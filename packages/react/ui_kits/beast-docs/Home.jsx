// Home: hero on #4d69bd with bg.svg, concave divider, four icon cards, footer. From docs/app/home + hero + icon-card.
function Home({ go }) {
  const features = [
    { title: 'Introdução', description: 'Sessão de onboarding para entender tudo o que precisa saber para começar a utilizar o Beast', icon: 'intro', route: 'docs' },
    { title: 'Branding', description: 'Os principais padrões e fundamentos para começar a usar a nossa marca', icon: 'themes', route: 'cores' },
    { title: 'Componentes', description: 'Explore os componentes que compõem a interface da Dadosfera', icon: 'components', route: 'componentes' },
    { title: 'Recursos', description: 'Faça o download e acesse os principais links da nossa identidade visual', icon: 'guides', route: 'recursos' },
  ];
  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', overflowX: 'hidden' }}>
      <section style={{ background: 'var(--docs-hero-background) url(../../../design-system/assets/img/bg.svg) center/cover no-repeat', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 15px', display: 'flex', flexDirection: 'column' }}>
          <DocsHeader light go={go} route="home" />
          <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '2rem' }}>
            <div style={{ flex: '1 0 auto', maxWidth: '40rem', padding: '4rem 0', fontSize: '1rem', marginRight: '2rem' }}>
              <h1 style={{ color: '#fff', fontSize: '3.5em', lineHeight: '1.125em', fontWeight: 700, margin: 0, textShadow: '0 12px 34px rgba(0,60,183,.25)', fontFamily: 'inherit' }}>Bem vindo ao Beast</h1>
              <h2 style={{ color: '#fff', margin: '0 0 2rem', fontFamily: 'inherit', fontSize: '2rem', fontWeight: 700, lineHeight: 1.25 }}>O Design System da Dadosfera</h2>
              <p style={{ color: '#fff', fontSize: '1rem', lineHeight: '1.75em', paddingRight: '3em', margin: '0 0 3rem', fontFamily: 'inherit' }}>Design System é um ecossistema de bibliotecas instaláveis, com componentes programados e padrões semânticos de design, que reúne padrões de comportamentos e unifica a linguagem do Produto. Desenvolvido para criar experiências simples, intuitivas e bonitas, se apoia no atributo da Plataforma: <strong>Beautiful &amp; Intuitive</strong>.</p>
              <a href="#docs" onClick={(e) => { e.preventDefault(); go('docs'); }} style={{ display: 'inline-block', fontSize: '1em', fontWeight: 700, borderRadius: 3, background: '#fff', color: '#3381ff', padding: '.875em 2em', boxShadow: '0 12px 34px rgba(0,60,183,.25)', textDecoration: 'none', width: '100%', maxWidth: '11.2rem', textAlign: 'center', cursor: 'pointer' }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 18px 34px 0 rgba(0,60,183,.35)')} onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 12px 34px rgba(0,60,183,.25)')}>Documentação</a>
            </div>
            <div style={{ flex: '1 0 auto', display: 'flex', paddingTop: '5rem', marginLeft: '-1rem' }}>
              <div style={{ background: 'url(../../../design-system/assets/img/hero-components.svg) no-repeat center/cover', width: '46rem', paddingTop: '78%' }} />
            </div>
          </div>
        </div>
        <svg viewBox="0 0 1920 222" preserveAspectRatio="xMidYMin slice" style={{ display: 'block', width: '140%', marginLeft: '-20%', marginTop: '-15rem', marginBottom: -10, fill: 'var(--background-basic-color-2)' }}><path d="M1920,0c-248.44,93.45-587.33,151.09-960.52,151.09S248.44,93.45,0,0V222H1920Z" /></svg>
      </section>
      <section style={{ background: 'var(--background-basic-color-2)', paddingBottom: '4rem' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '0 15px' }}>
          {features.map((f) => <IconCard key={f.title} {...f} onClick={() => go(f.route)} />)}
        </div>
      </section>
      <div style={{ background: 'var(--background-basic-color-2)', paddingBottom: '2rem' }}><DocsFooter /></div>
    </div>
  );
}

function IconCard({ title, description, icon, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ position: 'relative', border: '1px solid var(--border-basic-color-3)', borderRadius: 7, background: '#fff', display: 'flex', flexDirection: 'column', padding: '3rem 1.5rem 3.625rem', margin: '1.25rem', width: 'calc(50% - 2.5rem)', maxWidth: '30rem', cursor: 'pointer', boxShadow: hover ? '0 8px 24px 0 rgba(0,31,97,.07)' : 'none', transition: 'box-shadow .25s ease' }}>
      <div style={{ textAlign: 'center' }}><img src={`../../../design-system/assets/img/${icon}.svg`} style={{ height: 72 }} alt="" /></div>
      <h2 style={{ color: hover ? 'rgba(13,28,46,1)' : 'rgba(13,28,46,.5)', fontSize: '1.5rem', fontWeight: 700, lineHeight: '1.8125rem', textAlign: 'center', margin: '1rem 0 .5rem', transition: 'color .25s ease', fontFamily: 'inherit' }}>{title}</h2>
      <p style={{ color: '#919fb1', fontSize: '.875rem', lineHeight: '1.25rem', textAlign: 'center', margin: 0, fontFamily: 'inherit' }}>{description}</p>
    </div>
  );
}
Object.assign(window, { Home, IconCard });
