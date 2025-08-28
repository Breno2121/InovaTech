# Manutenção de sistemas - SA
Conforme discutido em sala de aula, a situação de aprendizagem da unidade curricular de Manutenção de Sistemas será a construção de uma plataforma de chamados e atendimentos. Essa plataforma terá como finalidade o controle das manutenções de software já desenvolvidos em nossas outras unidades curriculares.

O objetivo é proporcionar aos estudantes a aplicação prática dos conceitos abordados na disciplina, tais como tipos de manutenção (corretiva, adaptativa, preventiva e preditiva), indicadores de desempenho, organização do trabalho, entre outros. Além disso, essa proposta integra os conhecimentos de desenvolvimento de software, permitindo que teoria e prática caminhem juntas em um projeto colaborativo e contextualizado.

## 📋 Entrega Esperada
Ao final da atividade, espera-se que os estudantes entreguem uma plataforma funcional de chamados, capaz de registrar, acompanhar e encerrar manutenções de software. O desafio consiste em estruturar um sistema completo — com autenticação, abertura e gerenciamento de chamados, indicadores de desempenho e painéis de acompanhamento — aplicando boas práticas de desenvolvimento e organização do trabalho em equipe. A entrega não se resume apenas ao código, mas também à capacidade de cada grupo em planejar, colaborar, cumprir prazos e refletir sobre os conceitos de manutenção de sistemas na prática.

## 📋 Requisitos Funcionais (Básicos)

- [ ] RF01 - Deve permitir fazer login utilizando email e senha;
- [ ] RF02 - Deve permitir ao acessar o sistema navegar entre as páginas;
- [ ] RF03 - Deve permitir visualizar indicadores e dashboards relacionado a atendimentos;
- [ ] RF04 - Deve permitir realizar o cadastro de clientes/empresas/produtos;
- [ ] RF05 - Deve permitir visualizar os clientes/empresas/produtos cadastrados;
- [ ] RF06 - Deve permitir editar os clientes/empresas/produtos cadastrados;
- [ ] RF07 - Deve permitir deletar os clientes/empresas/produtos cadastrados;
- [ ] RF08 - Deve permitir realizar a abertura de chamado;
- [ ] RF09 - Deve permitir visualizar os chamados abertos;
- [ ] RF10 - Deve permitir filtrar os chamados abertos (nó mínimo por número);
- [ ] RF11 - Deve permitir excluir um chamado aberto;
- [ ] RF12 - Deve permitir visualizar detalhes de um chamado aberto;
- [ ] RF13 - Deve permitir finalizar o chamado;
- [ ] RF14 - Deve permitir alterar o status do chamado (caso você decida que tem vários items);
- [ ] RF15 - Deve permitir visualizar comentários adicionados dentro de um atendimento;
- [ ] RF16 - Deve permitir adicionar novos comentários dentro de um atendimento;

## 📋 Requisitos Funcionais (OPCIONAIS)

- [ ] RF17 - Deve permitir adicionar tempo real utilizado dentro do chamado;
- [ ] RF18 - Deve permitir calcular o leadtime dos chamados;
- [ ] RF19 - Deve permitir visualizar informações de leadtime dos chamados;
- [ ] RF20 - Deve permitir adicionar novo usuário;
- [ ] RF21 - Deve permitir tipos diferentes de usuários acessem a plataforma;

## 📋 Regras de Negócio (Básicas)

- [ ] RN01 - Os chamados devem seguir exclusivamente o fluxo definido (Aberto -> em andamento -> fechado);
- [ ] RN02 - O chamado deve estar vinculado a um cliente/empresa/produto e a um usuário responsável;
- [ ] RN03 - Todo chamado deve ser classificado em um dos tipos de manutenção (Corretiva, Adaptativa, Preventiva ou Preditiva);
- [ ] RN04 - O Tipo de manutenção não pode ser alterado depois que o chamado for fechado;
- [ ] RN05 - Cada comentário dentro do chamado deve registrar o autor e a data;
- [ ] RN06 - Comentários não podem ser apagados;
- [ ] RN07 - Chamado fechado não pode ser reaberto;

## 📊 KPI

- Nome: Tempo Médio de Resolução
- Objetivo: Medir a eficiência da equipe de manutenção na resolução de chamados.
- Fórmula e Unidade: soma(DataResolução - DataAbertura) / QtdChamados;
- Unidade: dias
- Fonte e Periodicidade: Base de dados da plataforma de chamados / medição semanal
- Responsável: Squad de Desenvolvimento & Manutenção
- Meta: ≤ 5 dias de lead time médio
- Limiar: > 10 dias (aciona revisão de processos)
- Plano de Ação: Construir e evoluir a plataforma de chamados, com dashboard de métricas, para monitorar o tempo de resolução em tempo real e aplicar melhorias contínuas (ajuste de processos, priorização de tarefas, balanceamento da carga de trabalho).
