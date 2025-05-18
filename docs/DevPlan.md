# Plano de Implementação - PagansDev Sticky Notes

## Stack Utilizada

- [x] Electron
- [x] VueJS
- [ ] TipTap (a ser integrado)
- [ ] Markdown Editor Próprio

## Fase 1: Estrutura Inicial e Editor de Texto Rico

- [x] Configuração do Projeto (Electron + VueJS)
- [ ] Integração do TipTap ou Markdown renderer
- [x] Componentização inicial (layout base)
- [x] Layout de notas lado a lado, com divisória ajustável
- [x] Barra de ferramentas para formatação de texto (parcial, falta integração com TipTap)

## Fase 2: Gerenciamento de Notas

- [ ] Criação e Exclusão de Notas
- [ ] Alternância entre múltiplas notas
- [ ] Persistência Local
  - [ ] LocalStorage
  - [ ] IndexedDB
  - [ ] Arquivos Locais (Electron)
- [ ] Edição e Salvamento Automático

## Fase 3: Funcionalidades Avançadas

- [ ] Busca e Filtros
- [ ] Atalhos de Teclado
- [ ] Customização Visual

## Fase 4: Sincronização em Nuvem (Posterior)

- [ ] Integração com Serviços de Nuvem
- [ ] Autenticação de Usuário
- [ ] Resolução de Conflitos

## Fase 5: Refino e Testes

- [ ] Testes Automatizados
- [ ] Feedback de Usuário
- [ ] Documentação

---

### Resumo das Sugestões de Persistência Local

- LocalStorage: Fácil, mas limitado.
- IndexedDB: Robusto, recomendado para web.
- Arquivos Locais (Electron): Flexível, recomendado para desktop.

Sugestão: Para este projeto Electron, priorize persistência via arquivos locais ou IndexedDB, conforme a complexidade desejada.

---

## Prioridade de Componentes

1. **Editor de Texto Rico (TipTap)**
2. **Gerenciador de Notas (CRUD de notas)**
3. **Persistência Local (IndexedDB ou Arquivos Locais)**
4. **Barra de Ferramentas Integrada ao TipTap**
5. **Busca e Filtros**
6. **Atalhos de Teclado**
7. **Customização Visual**
8. **Sincronização em Nuvem**
