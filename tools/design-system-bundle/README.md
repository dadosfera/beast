# Gerador do bundle do design system — v1.0

O `CONTRIBUTING.md` exige que `packages/design-system/_ds_bundle.js` e
`_ds_manifest.json` sejam regenerados no mesmo PR de qualquer mudança em
`packages/react/components` ou em `tokens`. Esta ferramenta faz essa regeneração a
partir das fontes do repositório e verifica se os arquivos versionados estão em dia.

## Executar

Requer Node.js 22 e npm. A partir da raiz do repositório:

```sh
cd tools/design-system-bundle
npm ci --ignore-scripts
npm run build    # reescreve os dois arquivos
npm run check    # falha se os arquivos versionados diferem do que as fontes produzem
```

Dependências e lockfile são isolados do produto. A única dependência é
`@babel/standalone` na versão fixada `7.29.0`, a mesma que os cards carregam.

## O que é gerado

Os dois arquivos descrevem um projeto único e plano:

| No repositório                 | No projeto                                                |
| ------------------------------ | --------------------------------------------------------- |
| `packages/design-system/**`    | raiz (`tokens/`, `guidelines/`, `assets/`, `styles.css`…) |
| `packages/react/components/**` | `components/**`                                           |
| `packages/react/ui_kits/**`    | `ui_kits/**`                                              |

**`_ds_bundle.js`** reúne `assets/**/*.js`, `components/**/*.jsx` e `ui_kits/**/*.jsx`:

- cabeçalho `@ds-bundle` com formato, namespace, componentes exportados e
  `sourceHashes` (12 primeiros caracteres do SHA-256 de cada fonte);
- cada fonte compilada com JSX clássico (`React.createElement`), sem imports: os
  nomes importados de `react` viram `const { … } = React` e os importados de outro
  arquivo do projeto viram `__ds_scope.<Nome>`;
- ordem de emissão: sempre a primeira fonte, por caminho, cujas dependências já
  foram emitidas;
- cada export de `components/**` é publicado em `window.<namespace>`.

Fontes em `packages/react` alcançam o design system por `../…/design-system/`. No
projeto plano esse arquivo fica um nível mais perto, então o prefixo é reduzido
antes do hash e da compilação. É por isso que os hashes das três telas de
`ui_kits` correspondem ao bundle, e não ao arquivo como está no repositório.

**`_ds_manifest.json`** é derivado de:

- `components`: os mesmos do cabeçalho do bundle;
- `startingPoints`: comentários `@startingPoint` nos `.d.ts` e nos `index.html` de `ui_kits`;
- `cards`: comentário `@dsCard` na primeira linha de cada HTML, ordenados por grupo e caminho;
- `globalCssPaths`: os `@import` de `styles.css`, na ordem, seguidos de `styles.css`;
- `tokens`: propriedades customizadas dos blocos `:root` desses arquivos. O tipo
  vem da anotação `/* @kind … */` logo após a declaração, quando existe; sem
  anotação, vem do nome e do valor (sombra, raio, fonte, cor; o restante é espaçamento).

## O que não é derivado

`namespace`, `templates`, `themes`, `fonts`, `brandFonts` e `source` são copiados do
manifesto versionado. Eles dependem de verificações que esta ferramenta não faz
(por exemplo, a disponibilidade da fonte da marca). Ao mudar a família tipográfica,
revise `brandFonts` à mão.

A ferramenta aceita o que as fontes atuais usam: `import … from 'react'`, imports
nomeados de arquivos do projeto e exports declarados diretamente
(`export function`, `export const`). Qualquer outra forma interrompe a geração com
a posição no arquivo, em vez de produzir um bundle incompleto.

## Evidência

Em 12/11/2026, sobre o commit `a00d856` de `integration/luis-martins` e antes de
qualquer mudança nas fontes, `npm run check` reproduziu os dois arquivos
versionados byte a byte. A regra de tipos reproduz os 391 tokens existentes; ela
foi inferida desses tokens, não de uma especificação, e um token novo sem anotação
deve ter o tipo conferido no manifesto gerado.

O formato é o do manifesto e do bundle versionados (formato 4). Se o Claude
Design passar a gerar outro formato, `npm run check` acusará a diferença na
próxima sincronização; ajuste a ferramenta a partir dos arquivos novos em vez de
editar o bundle à mão.
