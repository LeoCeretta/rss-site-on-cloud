<h1 style='align:center'>
    <img alt="" title="Banner do projeto Hugo Gloss" src="./public/assets/Banner - README.png" />
</h1>

## 📰 Hugo Gloss RSS

Hugo Gloss RSS é uma aplicação voltada para o rastreamento e exibição das mais recentes notícias e tendências de entretenimento diretamente do site Hugo Gloss, usando tecnologia RSS para fornecer atualizações em tempo real. Nossa solução foi pensada para quem deseja acessar facilmente as novidades sem precisar navegar diretamente no site, tornando a experiência rápida e eficiente.
______________

### 🎯 Objetivo do Projeto 
Nosso objetivo principal é integrar as notícias do site Hugo Gloss em uma plataforma de fácil acesso, onde os usuários possam visualizar os artigos mais recentes e fazer consultas através de uma página HTML. Toda essa integração é feita com Node.js, hospedada em AWS EC2 e os dados são armazenados em Amazon S3.

______________

### 🚀 Funcionalidades<br>
•	Coleta de RSS: A API extrai conteúdos em tempo real do feed RSS do Hugo Gloss.<br>
•	Armazenamento em S3: Os dados coletados são salvos em formato JSON dentro de um bucket Amazon S3.<br>
•	Interface de Consulta: Uma página HTML simples para consultar as notícias armazenadas.<br>
•	Deploy Automatizado: Utilizamos o Docker para facilitar a implementação do projeto na AWS EC2.<br>
______________


## 🛠 Tecnologias

As seguintes ferramentas e tecnologias foram utilizadas na construção deste projeto:

- *NodeJs*
- *Express*
- *Docker*
- *Amazon AWS S3*
- *Amazon AWS EC2*
- *Elastic IP*
- *Amazon VPC*

## 📏 Como Utilizar o Sistema (localmente)

1. *Clonar o Repositório:*

```bash
git clone https://github.com/amandazzoc/hugo-gloss-rss-site.git
cd hugo-gloss-rss-site
```

2. *Instalar as dependências:*

```bash
npm install
npm install express rss-parser aws-sdk cors dotenv
npm install @aws-sdk/client-s3 @aws-sdk/credential-providers
```

3. *Rodar a API em Node.js:*

```bash
node ./src/app.js
echo ".env" >> .gitignore
```

4. *Mudar script*<br>
   Mude a linha 19 do script.js para:
```bash
const response = await fetch('https://localhost:3000/rss');
```

5. *Rodar o Docker:*

```bash
docker-compose up
```

6. *Acessar no navegador*
   Acesse o localhost:3000 no navegador e veja todas as nossas notícias!
   
## 📂 Atividade do Projeto

O objetivo principal foi desenvolver uma API em JavaScript/NodeJS, utilizando Docker e rodando na AWS, para capturar informações relevantes do feed RSS do Hugo Gloss. Esses dados são armazenados em um arquivo JSON dentro de um bucket S3, e podem ser consultados por meio de uma página HTML.

## 🚨 Dificuldades Encontradas

### 1. *Dificuldade para extrair tags específicas do RSS*
   Durante a extração do conteúdo RSS do Hugo Gloss, tivemos problemas para obter algumas informações, como a descrição e as imagens das postagens. Esses dados não estavam acessíveis diretamente, pois as tags estavam aninhadas dentro de outras, e continham várias tags adicionais que dificultavam a leitura simples. Foi necessário criar funções específicas para processar o conteúdo e filtrar apenas o que era relevante, extraindo os textos corretos e as URLs das imagens.

   *Solução:* Desenvolvemos funções personalizadas para navegar pelas tags e limpar o conteúdo, garantindo que apenas a informação necessária fosse extraída, eliminando tags desnecessárias.

### 2. *Desafio com CORs (Cross-Origin Resource Sharing)*
   No início, enfrentamos dificuldades em conectar o frontend e o backend do projeto devido a problemas de CORs. CORs é uma política de segurança implementada pelos navegadores que impede que scripts executados em uma origem acessem recursos de outra origem sem a devida autorização. Sempre que tentávamos fazer requisições da interface para a API, o navegador bloqueava o acesso, resultando em erro.

   *Solução:* A inclusão de uma linha no backend resolveu o problema. Adicionamos app.use(cors()); utilizando o middleware *CORs* no Node.js, o que permitiu que as requisições do frontend para o backend fossem feitas com sucesso, respeitando a política de segurança de navegadores modernos.

### 3. *Dificuldade com o upload do arquivo JSON para o bucket S3*
   No processo de envio do arquivo JSON com os dados extraídos do RSS para o bucket S3, tivemos problemas ao configurar as permissões e as credenciais necessárias. Inicialmente, nossa aplicação não conseguia se conectar ao bucket S3, resultando em erros de autenticação.

   *Solução:* Ajustamos as configurações de permissões do bucket S3 e utilizamos a dependência @aws-sdk/credential-providers para configurar corretamente as credenciais. Isso garantiu que nossa aplicação pudesse se autenticar com o S3 e realizar o upload dos arquivos JSON sem problemas.

### 4. *Configuração correta da instância EC2*
Ao configurar a instância EC2, enfrentamos desafios com a liberação de acesso público, habilitação de IPv4 pública, e configuração da sub-rede pública para garantir o acesso. Além disso, foi necessário prestar atenção aos grupos de segurança e VPC, além de habilitar a lógica de entrada para a rede pública.

Solução: Fizemos ajustes cuidadosos na configuração da sub-rede e do grupo de segurança, garantindo que as portas e permissões fossem corretamente definidas para permitir o acesso público à instância.

### 5. *Acesso à instância*
O acesso à instância EC2 trouxe complexidades. Tivemos que decidir entre o acesso via AWS Console, que é rápido mas pouco intuitivo para instalar dependências, e o acesso via cliente SSO, que oferece uma interface gráfica melhor, mas exige atenção extra na criação de chaves e permissões.

Solução: Optamos por utilizar o cliente SSO para facilitar a navegação entre pastas e a instalação de dependências, apesar de sua complexidade inicial.

### 6. *Configuração da bucket S3*
Enquanto a configuração inicial do bucket S3 na AWS foi relativamente tranquila, a nível de código, a implementação foi complicada devido às credenciais da AWS, que expiram rapidamente. Tentamos utilizar o cliente SSO, mas esse processo foi ainda mais complexo.

Solução: Trabalhamos para otimizar o uso das credenciais AWS e melhorar o fluxo de autenticação, garantindo que o código pudesse acessar e utilizar o bucket S3 com maior consistência.

### 7. *Docker*
Enfrentamos dificuldades iniciais ao nos acostumarmos com a lógica e estrutura de criação de containers e imagens no Docker. Foi um desafio entender a distinção entre container e imagem e como declarar os parâmetros corretamente.

Solução: Com o tempo e prática, nos familiarizamos com a ferramenta, percebendo sua utilidade e eficiência na execução e gerenciamento do projeto.

### 8. *Dificuldade com o uso de token no .env*
Tentamos usar o token diretamente pelo arquivo .env, mas, ao contrário de outras credenciais que funcionaram, o token não era reconhecido. Como resultado, decidimos deixá-lo diretamente no código.

Solução: Mantivemos o token no código para garantir que a autenticação funcionasse corretamente, embora essa abordagem não fosse a mais ideal em termos de segurança.
______________
### Feito por:

| [<img loading="lazy" src="https://avatars.githubusercontent.com/u/100137341?v=4" width=115><br><sub>Amanda Oliveira</sub>](https://github.com/amandazzoc) |  [<img loading="lazy" src="https://avatars.githubusercontent.com/u/106444181?v=4" width=115><br><sub>Ana Paula Lima</sub>](https://github.com/anapaulalimax) |  [<img loading="lazy" src="https://avatars.githubusercontent.com/u/178930493?v=4" width=115><br><sub>Elton Albuquerquec</sub>](https://github.com/eltonalbuquerque) |  [<img loading="lazy" src="https://avatars.githubusercontent.com/u/74743013?v=4" width=115><br><sub>Leonardo Ceretta</sub>](https://github.com/LeoCeretta) |
| :---: | :---: | :---: | :---: |