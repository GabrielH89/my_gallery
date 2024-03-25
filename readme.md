# My_gallery

## Projeto para salvar imagens na galeria
![GitHub repo size](https://img.shields.io/github/repo-size/GabrielH89/my_gallery)
![GitHub language count](https://img.shields.io/github/languages/count/GabrielH89/crud_users)

![project_image](https://github.com/GabrielH89/my_gallery/assets/67241633/076b0588-58ea-497d-b900-9bbb2cf2fc87)

## Tecnologias usadas no projeto: 
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

## Descrição
O projeto premite que o usuário crie uma conta e, após isso, faça o login no sistema. Tendo acesso à sua página principal, o usuário pode criar, atualizar, deletar as imagens. 

Obs: ainda há mais funcionalidade a serem implementadas.

## Requisitos
Tenha o npm e o node Js instalados na sua máquina

## Instalação e execução do projeto na máquina local
1. Execute o comando: git clone git@github.com:GabrielH89/my_gallery.git

#### No diretório backend
1. Estando no diretório backend, execute o comando $ npm install.

2. Crie um arquivo .env e insira, nele, as variáveis pdo arquivo .env.example, que está na raíz do diretório backend. Obs: é necessário criar um banco de dados no mysql, na sua máquina local.

3. Na raiz do diretório backend, crie o diretório /public e o diretório /uploads, dentro dele, para que possa armazenar as imagens na máquina local.

3. Execute o comando $ npm run dev 

#### No diretório frontend
1. Dentro do diretório frontend, execute o comando $ npm install.   

2.Lembre-se de manter a porta do frontend igual à do backend para garantir a conexão.

3. Após as dependências serem instaladas, através do comando anterior, o projeto está pronto para funcionar em sua própria máquina, com o comando $ npm run dev, que mostrará em qual porta está rodando a aplicação, geralmente a localhost:5173.