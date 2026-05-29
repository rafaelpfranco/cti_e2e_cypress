# Evidências de Execução

Esta pasta reúne evidências selecionadas da execução dos testes automatizados.

## Evidências previstas

- Print da execução Cypress;
- Print do relatório Mochawesome;
- Print da pipeline GitHub Actions, quando aplicável;
- Vídeo automático da execução Cypress, quando necessário.

## Relatório visual

Após executar os testes com relatório, o HTML pode ser gerado em:

```txt
cypress/reports/html/index.html
```

## Vídeos de execução

Os vídeos automáticos do Cypress são gerados em:

```txt
cypress/videos/
```

Esses vídeos não são versionados por padrão para evitar aumento desnecessário do repositório.

Caso seja necessário enviar vídeo como evidência, anexar somente o vídeo correspondente à execução validada ou disponibilizar o arquivo separadamente.

## Link do vídeo da execução

Quando o vídeo da execução Cypress for disponibilizado externamente, adicionar o link abaixo:

```txt
Link: preencher posteriormente
```

## Observação

Os artefatos brutos do Cypress, como screenshots, vídeos, downloads e relatórios gerados automaticamente, não são versionados por padrão. Eles são gerados durante a execução e podem ser anexados como artifacts na pipeline ou compartilhados separadamente.
