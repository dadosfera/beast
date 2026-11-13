# Movimento

O movimento no Beast mostra a ordem de leitura e confirma uma ação. Ele é curto, não tem
bounce e pode ser desligado pelo sistema operacional sem que a interface perca conteúdo.

<hr>

## Estado — 12/11/2026

**Proposta para `integration/luis-martins`.** Nenhum componente existente muda de
comportamento: os tokens e as classes só atuam em quem os usa. A promoção para `master`
segue [CONTRIBUTING](../../../CONTRIBUTING.md) e a revisão do CTO.

| Item | Registro |
| --- | --- |
| Origem | Apresentação interna animada, de 12/11/2026. A folha de estilos feita para ela foi generalizada. |
| Valores de partida | Os que o Beast e o Nebular já usavam: `.15s` em mudanças de cor, `.3s` e `.5s` em transições, `.5s`–`.6s` com `cubic-bezier(.4,0,.2,1)` nos cards que viram. |
| Decisão | Nomear esses valores como tokens e oferecer um vocabulário pequeno de classes, em vez de cada tela repetir durações e curvas. |
| Manual da marca | Não foi consultado para este tema: o material não estava acessível no ambiente em que o PR foi preparado. Se o manual orientar o movimento, ele prevalece e a divergência deve ser registrada. |
| Validação feita | Testes de contrato e de navegador em `tools/integration-guards` (Chromium). |
| Validação pendente | Leitores de tela, demais navegadores, uso em uma aplicação consumidora e revisão da área de marca. |

## Princípios

- **Curto e sem bounce.** Entradas entre `.45s` e `.7s`; estados em `.15s`. Nenhuma curva ultrapassa o valor final.
- **Um movimento principal por tela.** Ele explica a ideia: camadas que se empilham, um fluxo que avança, barras que crescem.
- **Laços com parcimônia.** No máximo um ou dois por tela, no elemento que carrega a mensagem.
- **A ordem é a leitura.** O escalonamento segue a ordem em que a pessoa lê, com 90 ms entre vizinhos.
- **Opcional para quem pede menos movimento.** Com `prefers-reduced-motion`, animações e transições param; o conteúdo continua todo disponível.

## Tokens

Definidos em [`packages/design-system/tokens/motion.css`](https://github.com/dadosfera/beast/blob/integration/luis-martins/packages/design-system/tokens/motion.css)
e carregados por `styles.css`.

| Token | Valor | Uso |
| --- | --- | --- |
| `--motion-duration-instant` | `.15s` | Hover, foco e outras mudanças de estado. |
| `--motion-duration-fast` | `.3s` | Aparição do conteúdo estático de uma cena. |
| `--motion-duration-pop` | `.45s` | Entrada com escala. |
| `--motion-duration-enter` | `.55s` | Entradas com deslocamento ou opacidade. |
| `--motion-duration-grow` | `.7s` | Barras e linhas que crescem. |
| `--motion-duration-draw` | `1.1s` | Traço de um caminho SVG. |
| `--motion-duration-march`, `-blink`, `-pulse`, `-float` | `1.6s`, `2s`, `2.4s`, `4.5s` | Período dos laços. |
| `--motion-ease-enter` | `cubic-bezier(.2,.7,.2,1)` | Entradas: desaceleram até parar. |
| `--motion-ease-standard` | `cubic-bezier(.4,0,.2,1)` | Movimento entre dois estados e traço. |
| `--motion-ease-state` | `ease` | Mudanças de estado. |
| `--motion-stagger` | `90ms` | Intervalo entre elementos vizinhos. |
| `--motion-scene-gap` | `540ms` | Intervalo entre sub-cenas quando tudo toca de uma vez. |
| `--motion-distance-y`, `--motion-distance-x` | `14px`, `18px` | Deslocamento das entradas. |
| `--motion-scale-from` | `.92` | Escala inicial do `pop`. |
| `--motion-float-distance`, `--motion-lift-distance` | `4px`, `3px` | Flutuação e elevação no hover. |
| `--motion-pulse-color`, `--motion-pulse-primary-color`, `--motion-pulse-spread` | tokens de cor existentes, `12px` | Anel do laço `pulse`. |
| `--motion-lift-shadow`, `--motion-tint-color` | tokens de cor existentes | Sombra e fundo do hover. |

## Classes

| Classe | Efeito |
| --- | --- |
| `.motion` + `.motion-rise`, `-fade`, `-left`, `-right`, `-pop`, `-grow-x`, `-grow-y`, `-draw` | Entrada. `-draw` exige `pathLength="1"` no caminho SVG. |
| `.motion-pop-float`, `.motion-pop-pulse`, `.motion-pop-pulse-primary` | Entrada seguida de laço no mesmo elemento. |
| `.motion-delay-1` … `.motion-delay-30` | Posição no escalonamento (N × `--motion-stagger`). |
| `.motion-loop-pulse`, `-pulse-primary`, `-float`, `-march`, `-blink` | Laço contínuo. |
| `.motion-hover-lift`, `.motion-hover-tint` | Resposta ao hover. |
| `.motion-stage` | Raiz que coordena o que está dentro dela. |
| `.motion-scene-1` … `.motion-scene-12` | Marca um elemento, ou um bloco inteiro, como sub-cena. |
| `.is-stepped` e `.at-1` … `.at-12` no estágio | Modo por cenas: a cena N aparece quando `.at-N` está presente. |
| `.is-held` no estágio | Suspende as entradas; ao sair, todas recomeçam. |

Ao terminar, a entrada devolve o elemento ao próprio estilo. Por isso `.motion-hover-lift`
continua funcionando em um elemento que entrou com `.motion-rise`.

## Dois modos de revelação

- **Tudo.** Sem `.is-stepped`, todas as cenas tocam quando o estágio entra; a cena N começa
  N × `--motion-scene-gap` depois.
- **Cenas.** Com `.is-stepped`, o estágio entra com a cena 1 e cada passo acrescenta um `.at-N`.
  A cena oculta mantém o espaço, fica com `visibility: hidden` e sai da ordem de tabulação.

O escalonamento dentro de uma cena conta a partir do início da própria cena nos dois modos.

## HTML

```html
<link rel="stylesheet" href="styles.css" />

<section class="motion-stage is-stepped at-1">
  <h2 class="motion motion-rise">Data First</h2>
  <div class="motion-scene-1">
    <p class="motion motion-rise">Fontes</p>
    <p class="motion motion-rise motion-delay-1">Integração</p>
  </div>
  <div class="motion-scene-2">
    <p class="motion motion-left">Saídas confiáveis</p>
  </div>
</section>
```

Para avançar, acrescente `at-2` ao estágio. Para repetir, acrescente `is-held`, espere um
quadro e remova.

## React

A família fica em `packages/react/components/motion` e usa as mesmas classes.

```jsx
<Deck defaultMode="scenes" style={{ width: 1280, height: 720 }}>
  <Slide breadcrumb="2. Metodologia › Data First" chip="Visão executiva" title="IA começa pela fundação" scenes={2}>
    <Scene index={1}>
      <Stagger>
        <Card>Fontes</Card>
        <Card>Integração</Card>
      </Stagger>
    </Scene>
    <Scene index={2}>
      <Reveal variant="left">Saídas confiáveis</Reveal>
    </Scene>
  </Slide>
</Deck>
```

| Componente | Papel |
| --- | --- |
| `Reveal` | Entrada, laço ou hover em qualquer elemento (`variant`, `order`, `scene`, `loop`, `hover`). |
| `Stagger` | Distribui a ordem entre os filhos sem criar um elemento a mais. |
| `MotionStage`, `Scene` | Estágio com os modos `all` e `scenes`; expõe `next`, `previous`, `replay` e `goTo`. |
| `Deck`, `Slide`, `DeckNav` | Apresentação: avança cena a cena e depois slide a slide; voltar cai na última cena do slide anterior. |

## Angular

A folha de estilos e as classes não dependem de framework e já podem ser usadas em templates
Angular que carreguem `styles.css`. **Ainda não existe diretiva nem componente Angular com os
mesmos nomes**; essa implementação é um trabalho seguinte e não deve ser presumida. O tema
Sass (`_default.scss`, `_mapping.scss`) não foi alterado.

## Acessibilidade

- `prefers-reduced-motion: reduce` desliga animações, laços e transições de hover. O modo por
  cenas continua funcionando, sem animação.
- No React, as teclas só atuam com o foco dentro do estágio ou do deck: seta para a direita,
  Page Down e Espaço avançam; seta para a esquerda e Page Up voltam; Home e End saltam. Não há
  ouvinte global de teclado. Espaço em um botão focado aciona apenas o botão.
- O `Deck` anuncia a posição em uma região `aria-live="polite"`: "Slide 2 de 10, cena 1 de 3".
- Os controles têm rótulos em português: "Cena anterior", "Próxima cena", "Slide anterior",
  "Próximo slide", "Repetir animações" e "Revelar por cenas".
- Movimento não substitui texto, contraste ou ordem do documento. Esta página não certifica
  conformidade WCAG.

## Adoção

Uma aplicação só recebe estes tokens quando atualiza o pacote ou a cópia local que utiliza;
veja [Governança da marca](https://github.com/dadosfera/beast/blob/integration/luis-martins/docs/articles/design-system/brand-governance.md).
No PR de adoção, registre a origem (release ou SHA), as telas verificadas e a versão de retorno.
