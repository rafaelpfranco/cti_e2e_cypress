# Cenarios de Teste - Inventario CTI

As automacoes ficam em Cypress puro com TypeScript. Os arquivos `.feature` em `docs/features` documentam os mesmos fluxos em linguagem BDD, sem Cucumber.

## Atribuicoes - Cadastro

- Deve cadastrar uma nova atribuicao para colaborador com ativo vinculado.
- Deve cadastrar uma nova atribuicao para subarea sem colaborador definido.
- Deve validar campos obrigatorios ao tentar salvar sem preencher dados.
- Deve exibir ou habilitar o campo Pacote Office somente quando a checkbox "Utilizara Pacote Office?" estiver marcada.
- Deve cancelar o cadastro e descartar as informacoes preenchidas.

## Atribuicoes - Edicao

- Deve carregar os dados de uma atribuicao existente ao acessar edicao.
- Deve editar dados da atribuicao e salvar com sucesso.
- Deve remover um ativo com status "DISPONIVEL" e adicionar novo ativo.
- Deve remover um ativo com status "COM DEFEITO", informar defeito e adicionar novo ativo.
- Deve validar campos obrigatorios durante a edicao.
- Deve cancelar a edicao e descartar alteracoes.

## Geracao de Termos

- Deve abrir o modal de geracao de termos ao selecionar uma atribuicao.
- Deve permitir selecionar o termo de Responsabilidade.
- Deve permitir selecionar o termo de Emprestimo.
- Deve garantir que apenas um tipo de termo seja selecionado por vez.
- Deve fechar o modal pelo botao X.
- Deve gerar PDF do termo selecionado.

## Relatorio de Movimentacao de Ativos

- Deve acessar a tela de relatorio de movimentacao de ativos.
- Deve filtrar movimentacoes por area e periodo.
- Deve validar agrupamento por area.
- Deve validar informacoes exibidas na listagem: Tombo, No de Serie, Descricao, Lotacao Anterior, Lotacao Atual e Colaborador.
- Deve gerar PDF do relatorio.
- Deve exibir mensagem quando nao houver dados disponiveis.

## Relatorio de Atribuicoes por Area

- Deve acessar a tela de relatorio de atribuicoes por area.
- Deve filtrar registros por area e periodo.
- Deve validar agrupamento dos resultados.
- Deve gerar PDF do relatorio.
- Deve exibir mensagem quando nao houver dados disponiveis.
