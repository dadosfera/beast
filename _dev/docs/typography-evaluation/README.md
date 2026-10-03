# Evidência do ensaio tipográfico

Capturas de 03/10/2026, produzidas na página
`packages/design-system/guidelines/typography-evaluation.html` com Quicksand e os
quatro pesos Menco reais carregados. O procedimento manual está em
[`docs/articles/design-system/typography.md`](../../../docs/articles/design-system/typography.md).

- `desktop.png`: viewport 1440 × 1100, comparação lado a lado.
- `mobile.png`: viewport 390 × 844, leitura em coluna.
- `mobile-spacing-200.png`: viewport 390 × 844, espaçamento ampliado e auxílio
  CSS de escala 200%. A tabela preserva rolagem horizontal dentro da sua região.
- `verification.json`: navegador, fontes efetivamente usadas, dimensões,
  verificações funcionais e limites do teste.

Foram verificados carregamento ausente/parcial/completo, rejeição de arquivo
inadequado, exportação JSON, ordem de foco dos controles, ausência de erros JS e
de requisições de upload. A revisão encontrou e corrigiu a legenda de 12 px
sobrescrita por uma regra de parágrafo e o transbordamento de palavras no teste
de ampliação. Não houve overflow horizontal da página nas três condições finais.

Este é um ensaio de componentes representativos. Não é pesquisa de preferência,
certificação WCAG ou validação de todas as telas consumidoras. O zoom nativo,
outros navegadores e tecnologias assistivas ainda precisam ser verificados nas
aplicações. Os arquivos de fonte não são distribuídos neste repositório.
