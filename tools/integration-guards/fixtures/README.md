# Fonte de teste

`loader-test.woff` foi criada para esta suíte, com um espaço e um retângulo
associado ao caractere A. Seu código gerador é `generate.py`; aplica-se a licença
MIT do repositório. Não deriva de Menco nem de outra fonte comercial.

O teste fornece esses bytes sob nomes aceitos pelo seletor para exercitar a API
FontFace, os pesos obrigatórios e a exportação. Esta fixture não serve para
avaliar a aparência, a legibilidade ou a identidade da Menco. Ela nunca é
carregada pela interface do produto e não substitui os arquivos de marca.

Para regenerar, com fontTools instalado: `python3 generate.py`. O CI utiliza o
WOFF versionado; não precisa de Python ou fontTools.
