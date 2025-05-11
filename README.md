# 🗒️ PagansDev Sticky Notes

PagansDev Sticky Notes é um aplicativo de notas rápidas, moderno, bonito e funcional, criado para quem busca organização pessoal e está cansado das limitações e frustrações das notas nativas do Windows.

## 🚀 Objetivo

O objetivo deste app é oferecer uma experiência de anotações simples, confiável e visualmente agradável, permitindo que você organize suas ideias, tarefas e lembretes de forma intuitiva — sem correr o risco de perder suas notas ou vê-las mudando de lugar sozinhas na tela.

## 💡 Por que criar este app?

Se você já usou o Sticky Notes do Windows, provavelmente já passou por situações como:

- Notas que desaparecem misteriosamente
- Janelas que mudam de posição sem motivo
- Falta de recursos de organização e personalização

PagansDev Sticky Notes nasceu da frustração com essas limitações e da vontade de criar uma solução realmente útil para o dia a dia.

## 🛠️ MVP - Etapas de Desenvolvimento

O desenvolvimento do MVP (Produto Mínimo Viável) está dividido nas seguintes etapas:

1. **Layout Flat e Minimalista**

   - Interface limpa, sem sombras ou poluição visual

2. **Notas em Colunas**

   - Organização das notas em colunas na mesma janela, com possibilidade de expansão futura para múltiplas janelas

3. **Rich Text**

   - Suporte a formatação de texto (negrito, itálico, sublinhado, listas, etc)
   - Inserção de imagens e anexos

4. **Persistência Local**

   - Suas notas permanecem salvas, mesmo após fechar o app utilizando persistencia de dados local (localstorage ou banco de dados futuramente)

5. **Experiência Desktop**
   - Comportamento consistente, sem sumiços ou mudanças inesperadas de posição

## 🎯 Finalidade de Uso

PagansDev Sticky Notes é ideal para:

- Organização pessoal e profissional
- Anotações rápidas durante reuniões ou estudos
- Listas de tarefas, ideias e lembretes
- Usuários que buscam uma alternativa confiável e estável ao Sticky Notes do Windows

## 🖥️ Tecnologias Utilizadas

- [Vue.js](https://vuejs.org/) (Renderer)
- [Electron](https://www.electronjs.org/) (Desktop)
- [TailwindCSS](https://tailwindcss.com/) (Estilo)
- [Pinia](https://pinia.vuejs.org/) (Gerenciamento de estado)

## 📦 Como rodar o projeto

```bash
# Instale as dependências
npm install

# Rode em modo desenvolvimento
npm run electron:dev

# Para build de produção
npm run electron:build
```

---

Sinta-se à vontade para contribuir, sugerir melhorias ou relatar problemas!
