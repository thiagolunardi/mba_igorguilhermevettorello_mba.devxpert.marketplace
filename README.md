# ** mba.devxpert.marketplace - Aplicação de uma Mini Loja Virtual Simples com MVC, API RESTful e Angular**

## **1. Apresentação**

Bem-vindo ao repositório do projeto ** mba.devxpert.marketplace **. Este projeto é uma entrega do MBA DevXpert Full Stack .NET e é referente ao módulo **Desenvolvimento Full-Stack Avançado com ASP.NET Core**.
O objetivo principal é dar continuidade ao desenvolvimento da aplicação criada no Módulo 01, evoluindo de uma plataforma de gestão de produtos para um sistema completo de loja virtual. 
Nesta nova fase, os alunos deverão implementar uma aplicação de vitrine com foco no cliente final, utilizando uma SPA (Blazor ou Angular), enquanto mantêm o painel administrativo 
no modelo MVC e integram ambas as soluções via uma API REST centralizada.

### **Autor(es)**
- ** Rafael Fernando Gimenes **
- ** Cleber Movio**
- ** Lucas de França Floriano **
- ** Igor Guilherme Vettorello**
- ** Gustavo Palinka**
- ** Poliana Dias**
- ** Marcio**


## **2. Proposta do Projeto**

O projeto consiste em:

- **Aplicação MVC:** Interface web para interação mini Loja.
- **Angular:** Interface web para interação mini Loja.
- **API RESTful:** Exposição dos recursos do mini loja para integração com outras aplicações ou desenvolvimento de front-ends alternativos.
- **Autenticação e Autorização:** Implementação de controle de acesso, diferenciando administradores e usuários comuns.
- **Acesso a Dados:** Implementação de acesso ao banco de dados através de ORM Entity Framework

## **3. Tecnologias Utilizadas**

- **Linguagem de Programação:** C#
- **Frameworks:**
  - ASP.NET Core MVC
  - ASP.NET Core Web API
  - Entity Framework Core
  - Angular
- **Banco de Dados:** SQL Server ou Sqlite
- **Autenticação e Autorização:**
  - ASP.NET Core Identity
  - JWT (JSON Web Token) para autenticação na API
- **Front-end:**
  - Razor Pages/Views
  - HTML/CSS para estilização básica
- **Documentação da API:** Swagger

## **4. Estrutura do Projeto**

A estrutura do projeto é organizada da seguinte forma:


- src/
  - backend
    - Aplicacoes
	- images
	  - MBA.Marketplace.API/ - API RESTful
	  - MBA.Marketplace.MVC/ - Projeto MVC
	- Core
	  - MBA.Marketplace.Business
	  - MBA.Marketplace.Data/ - Modelos de Dados e Configuração do EF Core
  - frontend
    - LojaVirtual/ - Projeto Angular	
- README.md - Arquivo de Documentação do Projeto
- FEEDBACK.md - Arquivo para Consolidação dos Feedbacks
- .gitignore - Arquivo de Ignoração do Git

## **5. Funcionalidades Implementadas**

- **CRUD para Posts e Comentários:** Permite criar, editar, visualizar e excluir Categorias e produtos do vendedor logado.
- **Autenticação e Autorização:** Diferenciação entre usuários comuns e administradores.
- **API RESTful:** Exposição de endpoints para operações CRUD via API.
- **Documentação da API:** Documentação automática dos endpoints da API utilizando Swagger.
- **Possibilidade de inserir e remover itens favoritos.

## **6. Como Executar o Projeto**

### **Pré-requisitos**

- .NET SDK 8.0 ou superior
- SQL Server, Sqlite
- Visual Studio 2022 ou superior (ou qualquer IDE de sua preferência)
- Git

### **Passos para Execução**

1. **Clone o Repositório:**
   - `git clone https://github.com/igorguilhermevettorello/mba.devxpert.marketplace`
   - `cd mba.devxpert.marketplace`

2. **Configuração do Banco de Dados:**
   - No arquivo `appsettings.json`, configure a string de conexão do SQL Server.
   - Rode o projeto para que a configuração do Seed crie o banco e popule com os dados básicos

3. **Executar a Aplicação MVC:**
   - `cd src\backend\Aplicacoes\MBA.Marketplace.MVC`
   - `dotnet run`
   - Acesse a aplicação em: https://localhost:7067

4. **Executar a API:**
   - `cd src\backend\Aplicacoes\MBA.Marketplace.API`
   - `dotnet run`
   - Acesse a documentação da API em: https://localhost:7179/swagger

5. **Executar a Aplicação Angular:**
	- cd src\frontend\LojaVirtual
	- ng s
	- Acesse a aplicação em: http://localhost:4200/

## **7. Instruções de Configuração**

- **JWT para API:** As chaves de configuração do JWT estão no `appsettings.json`.
- **Migrações do Banco de Dados:** As migrações são gerenciadas pelo Entity Framework Core. Não é necessário aplicar devido a configuração do Seed de dados.

## **8. Documentação da API**

A documentação da API está disponível através do Swagger. Após iniciar a API, acesse a documentação em:

https://localhost:7179/swagger

## **9. Avaliação**

- Este projeto é parte de um curso acadêmico e não aceita contribuições externas. 
- Para feedbacks ou dúvidas utilize o recurso de Issues
- O arquivo `FEEDBACK.md` é um resumo das avaliações do instrutor e deverá ser modificado apenas por ele.
