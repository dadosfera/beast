# Testes da integração — v1.0

Esta suíte protege contratos do design system, o ensaio tipográfico introduzido
no PR #13 e o sistema de motion (tokens, classes e família React). Ela complementa
os testes Angular existentes. Não garante que toda
mudança acidental em qualquer área do Beast seja detectada.

## Executar

Requer Node.js 22 e npm. A partir da raiz do repositório:

```sh
cd tools/integration-guards
npm ci --ignore-scripts
npx playwright install --with-deps chromium
npm test
```

Dependências e lockfile são isolados do produto. O servidor de teste escuta
apenas `127.0.0.1:4174` e é encerrado pelo Playwright. Para utilizar um Chromium
já instalado localmente, pode-se definir `BEAST_CHROMIUM_EXECUTABLE` com seu
caminho absoluto. O CI usa o navegador da versão fixada do Playwright.

## Contratos protegidos

| Risco | Verificação |
| --- | --- |
| Troca global de fonte, escala ou tratamento dos botões sem decisão | Família Quicksand, parágrafo 16/24 e peso 400, título 700, botão índigo e raio 4 px. |
| Angular e CSS divergirem | Mesmas famílias padrão nas duas implementações. |
| Perfil Menco afetar componentes fora da seleção | Comparação de estilos antes/depois; retirada do atributo restaura os estilos originais. |
| Herdar pesos que não existem nos cortes Menco carregados | H1/H2 900, demais títulos/rótulos/botões 700, subtítulos/legenda forte 500 e texto/legenda 300, mantendo tamanhos e entrelinhas. |
| Fallback ser apresentado como fonte carregada | Estado indisponível explícito; arquivos inválidos/corrompidos rejeitados. |
| Aprovar amostra incompleta ou acumular fontes a cada recarga | Quatro pesos necessários, substituição de FontFace e ausência de upload. |
| Relatório técnico incorreto | JSON exportado reflete pesos, fallback e controles ativos. |
| Perder leitura ou interação | Legenda 12 px, rótulos associados, ordem de foco, desktop, celular e espaçamento com escala CSS 200%; tabelas roláveis por teclado. |
| Catálogo quebrado | Cards existentes, caminhos únicos e metadados iguais aos do manifesto. |
| Distribuir fontes licenciadas por acidente no perfil | Stylesheet opt-in não contém download nem declaração de binários. |
| Bundle ou manifesto desatualizados | `sourceHashes` iguais ao SHA-256 das fontes; todo `.jsx` e todo export presentes; componentes iguais no manifesto. |
| Stylesheet global fora do manifesto | `globalCssPaths` igual aos `@import` de `styles.css`; tokens do manifesto iguais aos declarados. |
| Token de motion indefinido ou valor repetido em componente | Toda referência `var(--…)` resolve; a família React não contém cor nem duração literal. |
| Componente emitir classe inexistente | Variantes, laços, hover e cenas dos tipos públicos existem em `tokens/motion.css`. |
| Movimento ignorar `prefers-reduced-motion` ou ganhar bounce | Bloco de redução cobre `.motion` e todos os laços; nenhuma curva ultrapassa 0–1. |
| Sub-cena aparecer antes do passo ou atrasar depois dele | Cena oculta até `.at-N`; entrada começa na revelação; sem passos, cada cena começa um `scene-gap` depois. |
| Entrada bloquear hover, ou `.is-held` não suspender | Estilo próprio restaurado ao fim da entrada; estágio retido zera as entradas e a liberação as reinicia. |
| Deck pular cenas, voltar para a primeira cena ou ouvir teclas fora do foco | Avança cena a cena e depois slide a slide; voltar cai na última cena; teclas só com foco no deck; Espaço num botão focado aciona só o botão. |

A suíte funciona sem acesso às fontes de terceiros. Os testes do `Deck` carregam
o bundle versionado com React `18.3.1` servido de `node_modules` (a mesma versão
que os cards buscam no CDN), sem rede. A fixture geométrica é
original e serve apenas para validar a API FontFace. A leitura com Menco real,
zoom nativo, demais navegadores, tecnologias assistivas e telas consumidoras
continua no [protocolo de avaliação](../../docs/articles/design-system/typography.md).
Os testes não certificam conformidade WCAG nem aprovam uma nova fonte.

## Evidência inicial

Em 03/10/2026, os 3 testes de contrato e 11 de navegador passaram localmente.
Oito regressões temporárias foram detectadas: fonte global, perfil sem escopo,
legenda sobrescrita, peso ausente aceito, FontFace duplicada, palavra transbordando,
subtítulo herdando peso 600 e título alterado para peso 100. Os arquivos foram
restaurados após cada mutação. Os resultados estão em `verification.json`.

## Evidência do motion

Em 12/11/2026, sobre a base `a00d856`, os 8 testes de contrato e os 23 de
navegador (11 de tipografia, 12 de motion) passaram localmente com Chromium
do Playwright 1.63.0. Quinze regressões temporárias foram detectadas e os arquivos
restaurados após cada uma: bundle desatualizado, stylesheet sem import, token
indefinido, duração literal em componente, classe ausente do CSS, bloco de redução
removido, curva com bounce, cena visível antes do passo, entrada com `fill` para a
frente, `scene-gap` mantido no modo por cenas, `.is-held` sem efeito, animações sob
movimento reduzido, voltar caindo na primeira cena, avançar pulando sub-cenas e
teclado ouvido em `window`. Os resultados estão em `verification-motion.json`.

Não foram verificados: leitores de tela reais, outros navegadores, o artigo no
site de documentação, os cards com ícones Eva carregados do CDN e o uso em uma
aplicação consumidora. Os testes não certificam conformidade WCAG.

## Execução e bloqueio de merge

O workflow `.github/workflows/integration-guardrails.yml` cria o check estável
**`integration-guardrails`** em todos os PRs, em pushes para `integration/**` e
em `merge_group`. Não há filtro por caminho, etapa tolerando falhas ou segredo
de aplicação. Traces e capturas são publicados quando houver falha.

Um workflow, sozinho, não bloqueia merges. Um administrador deve selecionar esse
check na proteção ou ruleset de `integration/luis-martins`, preservando os checks
e as exigências de review já existentes. Recomenda-se exigir PR, branch atualizada,
`integration-guardrails` e `build-packages`, além de impedir force-push e exclusão.
Não substitua outras exigências para fazer um PR passar.

Na implementação de 03/10/2026, a conexão usada não tinha permissão para consultar
ou editar a proteção da branch (HTTP 403). Portanto, a obrigatoriedade do check
não foi configurada nem presumida. A produção continua no fluxo de promoção para
`master`, sob revisão e merge humano do CTO.

Mudanças intencionais nos contratos devem atualizar o teste correspondente e
registrar fundamento, evidências e revisão no PR. Não contorne uma falha com
`test.skip`, remoção de asserts ou alteração automática das expectativas.

## Referências

- [Configuração do Playwright](https://playwright.dev/docs/test-configuration)
- [Playwright no CI](https://playwright.dev/docs/ci-intro)
- [Branches protegidas no GitHub](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
