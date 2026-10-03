# Tipografia

A tipografia é a base para o tom, a voz e o conteúdo. Ela maximiza a legibilidade e comunica conceitos com clareza.

<hr>

## Font Family

Nosso design possui duas propriedades de família de fontes:

- **font-family-primary** - utilizado por todos os elementos de texto na página
- **font-family-secondary** - utilizado por elementos de cabeçalho (`<h1>`, `<h2>`, etc)

Atualmente, tanto `font-family-primary` quanto `font-family-secondary` usam **Quicksand**.
Essa é a implementação existente, não a família prescrita pelo manual corporativo, que é **Menco**.

## Decisão em avaliação — 03/10/2026

**Estado:** proposta para `integration/luis-martins`; sem alteração do padrão do produto.
A promoção para `master` segue [CONTRIBUTING](../../../CONTRIBUTING.md) e a revisão do CTO.

O [commit de 23/02/2022](https://github.com/dadosfera/beast/commit/2b999b7b685c24582d08130294d6f51a766928d6)
trocou Menco por Quicksand no tema, nesta documentação e no guia de instalação; trocou também
Adobe Typekit por Google Fonts. A mensagem `feat(font): update font family` não registra os critérios.
Não localizar a pesquisa no Git não demonstra que ela nunca existiu.

### Evidências e alternativas

| Alternativa | Fundamento | O que precisa ser demonstrado |
|---|---|---|
| Quicksand em toda a interface | Comportamento atualmente implementado; baixo risco de regressão. O projeto original descreve uma fonte display que também foi trabalhada para pequenos tamanhos. | Justificativa da exceção ao manual; leitura em tabelas, formulários e identificadores. Não presumir que uma fonte display seja automaticamente inadequada. |
| Menco em toda a interface | Continuidade com o manual e com a implementação anterior a fevereiro de 2022; suporte documentado a algarismos tabulares. | Legibilidade dos pesos Light/Medium nas densidades reais; quebras de linha; entrega e direitos de uso web. |
| Menco em títulos e Quicksand em controles | Alternativa intermediária para comparação, preservando métricas do corpo atual. | Coerência visual e benefício real da combinação; não está aprovada nem implementada como padrão. |

**Recomendação desta etapa:** avaliar Menco primeiro, por ser a fonte já escolhida pela marca,
e decidir por tarefa de leitura. Uma nova família externa exigiria fundamento adicional.
Não há experimento com usuários concluído nem fonte declarada vencedora neste PR.

Fontes primárias consultadas:

- [Manual de Marca Dadosfera, arquivo rotulado v1.1](https://drive.google.com/file/d/1U54WBW3cpFwx1lpNkBMmXs9XSWuS1DLv/view), páginas 17–20.
- [Menco — Adobe Fonts/Kvant](https://fonts.adobe.com/fonts/menco): cinco pesos, recursos numéricos e formas de licenciamento.
- [Quicksand — descrição do projeto](https://github.com/google/fonts/blob/main/ofl/quicksand/DESCRIPTION.en_us.html).
- [WCAG 2.2 — redimensionamento do texto](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html).
- [WCAG 2.2 — espaçamento do texto](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html).

### Perfil Menco opt-in

O arquivo `packages/design-system/typography-menco.css` usa os tokens existentes. Ele mantém os
tamanhos, as entrelinhas, as cores e os componentes da referência; troca família e pesos para cortes
reais da Menco. H1/H2 usam Black 900; H3–H6, rótulos e botões usam Bold 700; subtítulos e legendas
fortes usam Medium 500; parágrafos e legendas usam Light 300. Trata-se de uma adaptação de UI
para avaliação, não de nova regra corporativa aprovada.

```html
<link rel="stylesheet" href="packages/design-system/styles.css">
<link rel="stylesheet" href="packages/design-system/typography-menco.css">
<section data-beast-typography="menco">
  <h2 class="h2">Qualidade dos dados</h2>
  <p class="paragraph">Confira a atualização e valide as premissas.</p>
</section>
```

O consumidor fornece a fonte real; declarar `font-family` não baixa Menco. As fontes localizadas
na [pasta Tipografia](https://drive.google.com/drive/folders/1dduvoevMlQdq-fH0UFsBJIGLHFPTgHvk)
contêm arquivos WOFF2. Nenhum comprovante de licença aplicável ao bundling público foi localizado
nesta auditoria. Confirmar o mecanismo autorizado antes de distribuir binários; um projeto Adobe
Fonts e hospedagem própria têm condições distintas. Não reutilizar o antigo kit Adobe sem verificar
se ele ainda pertence à organização e atende aos domínios atuais.

A classe `beast-tabular-nums` solicita algarismos tabulares apenas nas células numéricas. Conferir
se a fonte efetivamente carregada oferece esse recurso. Códigos e identificadores continuam
usando `--font-family-mono` quando isso ajuda a distinguir caracteres.

### Ensaio reproduzível

1. Servir a raiz do repositório localmente: `python3 -m http.server 4173 --bind 127.0.0.1`.
2. Abrir `http://127.0.0.1:4173/packages/design-system/guidelines/typography-evaluation.html`.
3. Selecionar `menco_300_normal.woff2`, `menco_500_normal.woff2`, `menco_700_normal.woff2` e
   `menco_900_normal.woff2` do arquivo da marca. O navegador os lê localmente; não há upload.
4. Confirmar que ambas as colunas reportam fontes carregadas. Fallback não é amostra da candidata.
5. Comparar desktop e 390 px: tabelas, números, `I/l/1`, `O/0`, `rn/m`, acentos, rótulos e botões.
6. Ativar espaçamento ampliado e escala 200%; validar também zoom nativo em 200% e navegação por
   teclado. Não pode haver conteúdo ou função inacessível. Tabelas podem ter rolagem identificada.
7. Exportar as observações técnicas e anexar capturas à revisão. O relatório não mede preferência
   humana, não certifica acessibilidade e não representa desempenho de todas as telas do produto.

### Critérios para adoção

Antes de alterar `tokens/fonts.css`, `_default.scss` e consumidores:

- Entrega das fontes e permissões de uso confirmadas pelo responsável.
- Nenhuma perda de conteúdo ou função nas telas selecionadas com texto em 200% e espaçamento
  WCAG: entrelinha 1,5; após parágrafo 2em; letras 0,12em; palavras 0,16em. Esses são valores de
  teste de adaptação, não novos padrões obrigatórios de layout.
- Comparação exploratória, alternando a ordem das fontes, com pelo menos cinco usuários internos
  que trabalhem com tabelas e formulários. Mesmas tarefas: localizar valor, copiar identificador,
  reconhecer erro de preenchimento. Registrar erros, tempo e comentários, sem alegar significância
  estatística com essa amostra. Aprovação visual isolada não comprova ganho de leitura.
- Verificar carregamento normal, cache frio, fonte bloqueada e fallback; registrar bytes e alterações
  de layout nas telas consumidoras, sem atribuir ganho de performance ainda não medido.
- Aprovação de design/produto e revisão de Allan Sene (CTO) para a futura promoção.

### Entrega e reversão

Esta etapa acrescenta um perfil de avaliação e mantém Quicksand como referência comparável.
Apps que usam tokens copiados, releases TGZ ou outra distribuição precisam de atualização explícita;
um PR no Beast não muda esses consumidores automaticamente. Registrar versão/SHA do Beast em cada
adoção. A reversão do ensaio é remover `data-beast-typography="menco"` e o stylesheet opt-in.
Nenhuma publicação npm, deploy ou promoção para `master` faz parte desta mudança.


<hr>

## Cores das fontes

Existem 5 cores de texto disponíveis no Design System:

- **text-basic-color** - cor do texto principal, deve ser usada em cima de fundos básicos, geralmente cartões, barras laterais, cabeçalhos, disponíveis como classe CSS `.text-basic`
- **text-alternate-color** - cor alternativa usada em cima de fundos alternativos - cabeçalhos coloridos, barras laterais, disponíveis como classe CSS `.text-alternate`
- **text-control-color** - devemos usar como cor de texto para fundos de status (`sucesso`, `primário`, etc) - geralmente botões, seleções, disponíveis como classe CSS `.text-control`
- **text-disabled-color** - indica o estado desabilitado do texto, disponível como classe CSS `.text-disabled`
- **text-hint-color** - usado por textos secundários - legendas, espaços reservados, rótulos, disponíveis como classe CSS `.text-hint`

<hr>

## Estilos de texto

A tipografia consiste em 14 estilos de texto, onde os estilos de texto são uma combinação das propriedades `font-size`, `font-weight`, `line-height` e `font-family`:

- **6 heading** estilos, usados pelos elementos `<h1>`-`<h6>`, também disponíveis como classes CSS `.h1`, `.h2` ... `.h6`
- **2 subtitle** estilos, usado como texto para a maioria dos controles (entradas, menus, etc) com classes `.subtitle`, `.subtitle-2`
- **2 paragraph** estilos para texto regular e elemento `<p>`, com classes `.paragraph`, `.paragraph-2`
- **2 caption** estilos para texto menor, como dicas de ferramentas e legendas de entrada, com classes `.caption`, `.caption-2`
- **label** style, usado pelo elemento `<label>` como disponível como classe CSS `.label`
- **button** estilo de texto, usado pelo elemento `<button>`
<hr>

## Aplicar classes e propriedades de estilos de texto

Todos os estilos de texto podem ser aplicados simplesmente adicionando classes CSS a um elemento:

```html
<input type="email" name="email" /> <span class="caption-2 text-hint">Work email address</span>
```

Aqui nós adicionamos `caption-2` e `text-hint` fazendo com que o `span` seja uma legenda com uma cor de texto padrão.

Cores e fontes também estão disponíveis como propriedades de tema usando a função SCSS `nb-theme()`:

```scss
.my-text {
  font-family: nb-theme(font-family-primary);
  color: nb-theme(text-basic-color);
}
```
