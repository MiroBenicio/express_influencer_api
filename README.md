  <h1>Documentação da API</h1>
  <p>Este repositório contém uma API construída em Express na versão 4, integrada com um banco de dados SQLite. A API possui duas entidades principais: "usuários" e "influencers". É possível cadastrar e visualizar os usuários, além de realizar diversas operações relacionadas aos influencers.</p>
  <h2>Configuração</h2>
  <p>Antes de utilizar a API, certifique-se de ter o Node.js e o SQLite instalados em seu ambiente de desenvolvimento.</p>
  <ol>
    <li>Clone o repositório para o seu ambiente local:</li>
    <pre><code>git clone https://github.com/MiroBenicio/express_influencer_api.git</code></pre>
    <li>Navegue até o diretório do projeto:</li>
    <pre><code>cd nome-do-repositorio</code></pre>
    <li>Instale as dependências necessárias:</li>
    <pre><code>npm install</code></pre>
    <li>Execute o servidor:</li>
    <pre><code>npm start</code></pre>
  </ol>
  <h2>Endpoints</h2>
  <h3>Usuários</h3>
  <h4>GET /usuarios</h4>
  <p>Este endpoint retorna todos os usuários cadastrados no sistema.</p>
  <h4>POST /usuarios</h4>
  <p>Este endpoint permite cadastrar um novo usuário. Os dados do usuário devem ser fornecidos no corpo da requisição.</p>
  <h3>Influencers</h3>
  <h4>GET /influenciadores</h4>
  <p>Este endpoint retorna todos os influencers cadastrados no sistema. É necessário estar autenticado para acessá-lo.</p>
  <h4>POST /influenciadores</h4>
  <p>Este endpoint permite cadastrar um novo influencer. Os dados do influencer devem ser fornecidos no corpo da requisição. É necessário estar autenticado para acessá-lo.</p>
  <h4>PUT /influenciadores/:id</h4>
  <p>Este endpoint permite editar as informações de um influencer específico com base no ID fornecido. É necessário estar autenticado para acessá-lo.</p>
  <h4>DELETE /influenciadores/:id</h4>
  <p>Este endpoint permite excluir um influencer específico com base no ID fornecido. É necessário estar autenticado como administrador para acessá-lo.</p>
  <h2>Autenticação</h2>
  <p>A API utiliza um middleware de autenticação baseado em tokens JWT (JSON Web Token) para proteger o acesso aos endpoints dos influencers. O fluxo de autenticação é o seguinte:</p>
  <ol>
    <li>O usuário faz login no sistema e fornece suas credenciais.</li>
    <li>O middleware de autenticação verifica se o usuário está cadastrado e, se estiver, gera um token JWT válido.</li>
    <li>O token JWT é retornado ao usuário e deve ser incluído nos cabeçalhos de todas as requisições para os endpoints dos influencers.</li>
    <li>Um outro middleware verifica a validade do token em cada requisição dos endpoints dos influencers.</li>
    <li>Além disso, na rota de deletar e excluir influenciadores, é realizada uma verificação adicional para garantir que o usuário logado seja do tipo administrador.</li>
  </ol>
  <h2>Considerações Finais</h2>
  <p>Este projeto foi desenvolvido seguindo boas práticas e com foco na simplicidade e nas funcionalidades básicas.</p>
