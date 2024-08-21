# Kit de Desenvolvimento APIs Sicoob

## Introdução

Este é um kit de desenvolvimento baseado na documentação oficial do Sicoob, disponível em https://developers.sicoob.com.br/

O objetivo deste projeto é fornecer um cliente genérico para integração com todas as APIs do Sicoob, além de módulos independentes que demonstram como utilizar cada recurso específico. Por exemplo, o módulo Cobranca Bancaria V3 trata do uso de todas as APIs relacionadas à Cobrança Bancária na versão 3. Cada módulo também inclui validadores para o corpo da requisição, garantindo que informações divergentes não sejam enviadas e também possui um arquivo de exemplos de consumo.

## Instalação

Para instalar o kit de desenvolvimento, clone o repositório e instale as dependências:

```sh
git clone https://github.com/joaopsilvar/sicoob-sdk.git
cd sicoob-sdk
npm install
```

## Estrutura do Projeto

- `client/`: Módulo responsável por fornecer um cliente para acesso às APIs. Este módulo gerencia todas as requisições e está configurado para realizar chamadas a todas as APIs do Sicoob, com base em um objeto de configuração.
  - `certificate/`: Diretório para armazenar o certificado digital no formato PFX.
- `.env`: Arquivo de configuração que contém dados importantes para a integração com as APIs do Sicoob.
- `modulos/`: Contém módulos independentes para cada recurso específico das APIs do Sicoob.
  - `Cobrança Bancária V3/`: Módulo para a versão 3 da Cobrança Bancária.
    - `api.js`: Define funções para chamar os endpoints da API.
    - `exemplos.js`: Fornece exemplos de chamadas às APIs usando as funções declaradas em api.js.
    - `schemas/`: Diretório com validadores do corpo das requisições.

## Outros

Para mais informacoes consulte toda a documentacao oficial das APIs em https://developers.sicoob.com.br/
