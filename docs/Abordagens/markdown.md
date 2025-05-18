# Plano de Implementação: Editor de Notas com Preview em Tempo Real de Markdown

## 1. Estrutura Básica do Componente

- Criar um componente Vue para o editor de notas.
- O componente deve conter:
  - Um `<textarea>` para digitação do Markdown.
  - Um container para o preview do Markdown renderizado.
  - Um estado para alternar entre edição e visualização (preview).

## 2. Renderização em Tempo Real

- Usar uma biblioteca de renderização Markdown, como `marked` ou `markdown-it`.
- O conteúdo do `<textarea>` deve ser convertido para HTML e exibido no preview em tempo real.
- Sincronizar o valor do `<textarea>` com o preview usando `v-model` e um `computed` para o HTML renderizado.

## 3. Alternância entre Edição e Preview

- Inicialmente, mostrar o `<textarea>`.
- Assim que o usuário começar a digitar, esconder o `<textarea>` e mostrar o preview.
- O preview deve ser "não interativo" (`pointer-events: none;`) para evitar seleção/clicks.
- Opcional: adicionar um botão ou atalho para voltar à edição.

## 4. Sincronização do Cursor (Opcional/Avançado)

- Para uma experiência mais fluida, manter o `<textarea>` invisível mas ativo, posicionado sobre o preview.
- Capturar eventos de teclado e atualizar o preview em tempo real.
- Sincronizar a posição do cursor entre o texto bruto e o renderizado (desafio técnico, pode ser adiado para versões futuras).

## 5. Toolbar de Formatação Markdown

- Criar uma barra de ferramentas com botões para inserir sintaxe Markdown (negrito, itálico, títulos, listas, etc).
- Ao clicar em um botão, inserir a sintaxe correspondente no `<textarea>` na posição do cursor.
- Exemplos:
  - **Negrito:** Insere `**texto**`
  - **Itálico:** Insere `*texto*`
  - **Título:** Insere `# Título`

## 6. Salvando Arquivos `.md` Localmente

- Ao salvar, criar um arquivo `.md` com o conteúdo do `<textarea>`.
- Para web, usar a API de download de arquivos (Blob + URL.createObjectURL).
- Para desktop (Electron/Tauri), usar as APIs de sistema de arquivos.

## 7. Abrindo Arquivos `.md`

- Permitir ao usuário selecionar um arquivo `.md` local e carregar seu conteúdo no editor.
- Converter o conteúdo do arquivo para o `<textarea>` e atualizar o preview.

## 8. Estilização

- Aplicar estilos para que o preview fique visualmente agradável e parecido com uma nota.
- Usar classes do Tailwind ou CSS customizado para bordas, espaçamento, cores, etc.

## 9. Funcionalidades Extras (Futuro)

- Suporte a imagens (inserção e preview).
- Sincronização com nuvem.
- Histórico de versões.
- Pesquisa e organização de notas.

---

### Exemplo de Fluxo

1. Usuário abre o editor e digita Markdown.
2. O preview aparece em tempo real, substituindo o input.
3. O usuário pode salvar a nota como `.md`.
4. Pode abrir e editar arquivos `.md` existentes.

---

**Bibliotecas sugeridas:**

- [marked](https://github.com/markedjs/marked) ou [markdown-it](https://github.com/markdown-it/markdown-it) para renderização.
- [FileSaver.js](https://github.com/eligrey/FileSaver.js) (opcional) para salvar arquivos no navegador.
