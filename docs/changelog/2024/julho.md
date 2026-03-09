# Sprint JUL2

## Dia 25

- Troca de vídeo do usuário.

### Novas funcionalidades

- Troca de vídeo do usuário

### Modificações

- Configuração de bucket para o digital ocean spaces

### Correções

- Correção do bug na listagem de profissionais com o avatar
- Adição de tratamento de errors dos dados do profissional na listagem de profissionais

## Dia 23

- Implantação do sistema v2 em produção

### Adicionado

- Novo selecionador de área de especialidade
- Novo campo de apelido para área de especialidade

## Dia 22

### Adicionado

- Adição do plano grátis na página do profissional

### Correções

- Correção do filtro de Todos na página de profissionais
- Correção do bloqueio da agenda do médico caso já tenha consulta

### Modificado

- Remoção das opções de cartão e boleto momentaneamente

## Dia 19

### Adicionado

- [EXTRA] Criação de um novo campo para configura a taxa de operação da clínica
- [EXTRA] Configuração de novo campo de ativação ou desativação da clínica

## Dia 18

### Modificado

- Modificação do selecionador para habilitar a pesquisa
- Modificação do link para o direcionamento para plataforma
- Novo campo de valor transferido para clínica para um melhor controle
- Remoção da alteração de preços na homepage dependo do número de funcionários
- Modificação de todas as telas que tem valores para mostrar realmente o valor pago para o médico sem as taxas

### Segurança

- Dupla verificação antes de transferir para clínica

## Dia 12

### Modificado

- Alteração da taxa de API de pagamento para 10%

### Correções

- Corrigido o bug de visualização de status de uma consulta cancelada pelo ASAAS no painel administrativo
- Correção do redirect pós login do manager
- Correção da sinalização do Hoje e do amanhã na listagem de profissionais
- Correção do bug que não era possível criar appointments em cima de vagas canceladas
- Correção de Segurança no preço de uma consulta

## Dia 11

### Modificado

- Filtros da página de busca de médicos melhorados
- Ordenação de médicos por número de pacientes atendidos funcionando corretamente
- Melhorias no AVO

## Dia 10

### Adicionado

- Gerente da clínica pode acessar a agenda dos médicos

### Corrigido

- Problemas na barra de navegação mobile
- Adicionado campo de chave pix na clinica (cadastro e edição)
- Transferência do pagamento de uma consulta do viaconsultas para o pix da clinica
- Pagamento cancelado automaticamente caso o paciente nao pague em 15min
- Consulta marcada como concluida assim que chega no horario de término dela
- Envio de email para clinica e paciente quando uma nova consulta é agendada

### Modificado

- Consultas canceladas ou com pagamento pendente agora aparecem na tela de consultas do paciente
- Melhorias nas permissões do viaconsultas inteiro

## Dia 9

### Modificado

- Nova seção nas consultas do paciente mostrando quais são as próximas
- Usuários podem ser desabilitados e habilitados no AVO. Usuários desabilitados não podem acessar a plataforma e nem são
  listados na busca de médicos

### Corrigido

- Problemas na barra de navegação mobile

## Dia 8

### Corrigido

- Bug onde ao editar os dados de um medico, limpava as suas disponibilidades

# Sprint JUL1

## Dia 4

### Modificado

- Adição de configuração de preço de consulta na criação de profissional
- Modificação do selecionador do preço para opção fixas [Pedido Calderaro]

### Adicionado

- Edição de dados da clínica

## Dia 3

### Modificado

- Consultas canceladas nao aparecem mais nas disponibilidades do médico
- Nao é mais possível agendar um horário no passado ou com pouca antecedência
- Adicionei um link para buscar profissionais na navbar do paciente
- Melhorado o fluxo de pagamentos de uma consulta

### Adicionado

- Nova variação da tela de pagamento quando o pagamento foi pago
- Integração tela de rendimento mensal do médico

### Corrigido

- Avisos de erros tratados nos pagamentos
- Erro ao carregar a busca de profissionais
- Erro ao pagar uma consulta por não ter mais um qrcode

## Dia 2

### Adicionado

- Tela de "minhas consultas" integrada com as consultas do paciente
- Adição de campos do médico na tela de pesquisa

## Dia 1

- Correção do select da home de pacientes.
