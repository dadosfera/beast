# Governança da marca

O manual da Dadosfera e o Beast já existem. A evolução visual deve partir dessas
fontes, registrar decisões e chegar aos produtos pela branch de integração.
Este guia conecta as referências; não substitui os POPs corporativos.

## Fontes e responsabilidades

| Fonte | Responsabilidade |
| --- | --- |
| [Manual e arquivos no Drive](https://drive.google.com/drive/folders/18-ruZYDQr9Sz8JaivQPNmaIoDOOD6v-I) | Identidade da marca, logos e materiais aprovados. |
| [Central Index — Marketing](https://docs.google.com/spreadsheets/d/13cB5rwpqGtHPt9GFoihHIK8IBron-_1qBNWkcTQSwwA/edit) | Registro documental e indicação da versão aprovada pela área. |
| Beast na branch `integration/luis-martins` | Desenvolvimento, decisões e validação das mudanças antes da promoção. |
| Beast na branch `master` e releases publicadas | Fonte de produção e pacotes liberados; consulte a versão efetivamente adotada pelo consumidor. |
| Aplicação consumidora | Versão ou cópia dos tokens realmente utilizada, validação das telas e rollout da atualização. |

Se manual, índice e implementação divergirem, registre a divergência e sua decisão
no PR. Uma escolha antiga no código não comprova aprovação editorial atual; um
mockup novo também não altera o padrão do produto. Não recrie logos, paletas ou
templates quando já houver um material aplicável.

Para ilustrações, a lacuna de estilo pode receber uma extensão própria, com exemplos
e critérios de uso, mantendo a relação com o manual. A extensão só deve ser
identificada como aprovada depois da revisão correspondente.

## Situação das versões do manual

Levantamento em **03/10/2026**. Os rótulos abaixo não foram tratados como versões
sucessoras automaticamente.

| Evidência | O que está confirmado | O que falta resolver |
| --- | --- | --- |
| [PDF DOC-INT-MKT013](https://drive.google.com/file/d/1U54WBW3cpFwx1lpNkBMmXs9XSWuS1DLv/view) | Nome do arquivo: v1.1. Identificação no conteúdo: v.1 / abril de 2022. | Reconciliar nome, identificação interna e registro aprovado. |
| [Central Index — Marketing](https://docs.google.com/spreadsheets/d/13cB5rwpqGtHPt9GFoihHIK8IBron-_1qBNWkcTQSwwA/edit) | Registro do manual rotulado como versão 2. | O destino indicado não pôde ser acessado na verificação; isso não comprova exclusão nem vigência da versão. |
| [Pasta Manual da Marca](https://drive.google.com/drive/folders/1G-wQ-BSHP8jJfMvdO_SiDATXR95ni2hQ) | Há um atalho chamado “Manual de Marca V4.0”. | Resolver o destino e verificar conteúdo e aprovação. O nome do atalho não comprova uma v4 aprovada. |

Antes de declarar uma versão vigente, o responsável pela marca deve reconciliar o
registro da área, o arquivo correspondente e sua aprovação. Preserve os IDs e os
links existentes durante essa revisão. O [índice de recursos](https://github.com/dadosfera/beast/blob/integration/luis-martins/docs/articles/design-system/resources.md) mantém
os caminhos disponíveis e identifica as referências legadas.

## Integração e promoção

A regra operacional está em [CONTRIBUTING.md](https://github.com/dadosfera/beast/blob/integration/luis-martins/CONTRIBUTING.md).

1. Crie uma branch de trabalho a partir do commit remoto fixado de
   `integration/luis-martins` e abra o PR para essa mesma branch.
2. Registre a origem da mudança visual, a decisão, os consumidores afetados e a
   validação. Para tipografia, inclua carregamento da fonte, licenciamento,
   legibilidade, números, traduções, responsividade e comparação com a versão atual.
3. Valide na integração antes de preparar a promoção. Os apps destinados a testar
   essa evolução devem registrar qual commit ou pacote estão avaliando.
4. A promoção `integration/luis-martins` → `master` exige PR revisado, CI observado
   verde e merge humano por **Allan Sene, CTO**.
   Não há push direto, bypass de proteção ou merge administrativo.
5. Registre separadamente a publicação de pacotes e a atualização dos consumidores.

Um push em `master` dispara o deploy do site público de documentação. A publicação
dos pacotes requer `npm run release`/`publish` no fluxo de release; não ocorre
automaticamente apenas pelo merge. Apps que fixam releases antigas ou mantêm tokens
locais precisam de atualização própria. A designação interna de `main` como
produção não deve renomear a branch existente: neste repositório ela é `master`.

## Amostra de consumidores

Esta é uma amostra verificada nos arquivos abaixo em 03/10/2026, não um inventário
completo nem uma afirmação sobre o que está implantado em cada ambiente.

| Consumidor | Evidência no repositório | Efeito de um PR no Beast |
| --- | --- | --- |
| `dadosfera/frontend` | [package.json](https://github.com/dadosfera/frontend/blob/a510d33ec29ab3b4728ee5b6676d6b3c71606e7c/package.json) fixa `@beast/theme`, `@beast/eva-icons` e `@beast/date-fns` em arquivos da release `v9.1.0`. | Exige nova versão do pacote, atualização da dependência e validação no consumidor. |
| `app-floor-2-template` | [package.json](https://github.com/dadosfera/app-floor-2-template/blob/eb9a77762c214387bd9b74667edd116cfe998e26/frontend/package.json) não declara Beast; [layout.tsx](https://github.com/dadosfera/app-floor-2-template/blob/eb9a77762c214387bd9b74667edd116cfe998e26/frontend/app/layout.tsx) carrega Quicksand e [globals.css](https://github.com/dadosfera/app-floor-2-template/blob/eb9a77762c214387bd9b74667edd116cfe998e26/frontend/app/globals.css) mantém tokens locais. | Exige atualização explícita da cópia de tokens e da configuração da fonte. |
| `budget-ddf` | [package.json](https://github.com/dadosfera/budget-ddf/blob/7735aec266d9d1b93a4ea2e961f7380ba6cadcaf/frontend/package.json) não declara dependência de Beast. | Não recebe alterações por atualização de um pacote Beast nesse manifesto; confirmar os pontos de adoção no rollout. |

A orientação de validar a integração nos **apps DDF** é o destino pretendido do
trabalho. A auditoria não confirmou consumo direto de `integration/luis-martins`
pelos apps desta amostra, nem um repositório único chamado `apps-ddf`. Não trate
essa intenção como uma dependência já implantada. No PR de adoção de cada app,
registre release/SHA de origem, modo de consumo, responsável, telas verificadas e
versão de retorno.

## Proposta de organização do Drive

**Proposta para revisão da área, sem movimentação de arquivos.** Reutilize a pasta
de marca e as pastas existentes. O índice deve tornar visíveis a versão aprovada,
as propostas e os antecessores sem criar outra fonte de aprovação.

| Área de navegação proposta | Conteúdo e tratamento |
| --- | --- |
| `00 - Índice` | Entrada para o registro existente da área, links das versões e estado da revisão. |
| `01 - Vigente` | Atalhos para materiais cuja aprovação foi confirmada no índice; não selecionar pelo maior número no nome. |
| `02 - Em desenvolvimento` | Propostas de tipografia, ilustração e outras extensões, com links para os PRs e evidência de validação. |
| `03 - Fontes` | Atalhos para originais editáveis, arquivos de fonte e suas licenças, logos e outros assets existentes. |
| `04 - Aplicações` | Templates e exemplos aprovados de produto, apresentações e comunicação, ligados à versão de referência. |
| Histórico | Reutilizar a pasta existente `00 - Deprecado`, com links para a versão sucessora e motivo da substituição. |

Esta organização deve seguir os processos já existentes de
[gestão documental e versionamento (POP-INT-OPS001)](https://drive.google.com/file/d/1AiW1QmvlH5OMaglp3OEulml4HL02NH-g/view)
e [nomenclatura (POP-INT-OPS010)](https://docs.google.com/document/d/1f09JZtcwYzWekgH7eCidIqYTEVS-Q2eY/edit).
Eles permanecem nas fontes internas; esta página não os reproduz nem cria um POP.
Preserve a identificação documental e as permissões, mantenha o registro de
alterações e vincule antecessor, sucessor e PR quando existirem. A mudança de
estrutura e a declaração de uma versão vigente dependem da revisão prevista
nesses processos.
