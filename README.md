##Kit de Desenvolvimento APIs Sicoob

#Introdução

Este é um kit de desenvolvimento baseado na documentação oficial do Sicoob, disponível em https://developers.sicoob.com.br/

O objetivo deste projeto é fornecer um cliente genérico para integração com todas as APIs do Sicoob, além de módulos independentes que demonstram como utilizar cada recurso específico. Por exemplo, o módulo Cobranca Bancaria V3 trata do uso de todas as APIs relacionadas à Cobrança Bancária na versão 3. Cada módulo também inclui validadores para o corpo da requisição, garantindo que informações divergentes não sejam enviadas e também possui um arquivo de exemplos de consumo.

#Instalação

Para instalar o kit de desenvolvimento, clone o repositório e instale as dependências:
git clone https://github.com/joaopsilvar/sicoob-sdk.git
cd sicoob-sdk
npm install

#Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

	•	client/: Este módulo abstrai a obtenção do código de acesso e a execução das requisições para a API do Sicoob. Ele é responsável por gerenciar a autenticação e a comunicação com os endpoints da API.
	•	client/certificate/: Diretório para salvar o certificado digital no formato PFX. Para as APIs do Sicoob, somente é aceito o certificado do tipo A1 (PFX).
	•	.env: Arquivo de configuração que contém dados importantes, como o diretório do certificado digital, a senha do certificado e o Client Id do aplicativo gerado no portal Developers. Estes dados são essenciais para a integração com as APIs do Sicoob.
	•	modulos/: Contém módulos independentes para cada recurso específico das APIs do Sicoob. Cada módulo possui a seguinte estrutura:
	  •	Cobranca Bancaria V3/:
	    •	api.js: Define funções que executam as chamadas aos endpoints da API.
	    •	exemplos.js: Demonstra como realizar chamadas às APIs usando as funções definiads em api.js.
	    •	schemas/: Diretório que contém os validadores do corpo das requisições, garantindo que as informações enviadas estejam corretas e em conformidade com os requisitos da API.

#Outros

Para mais informacoes consulte toda a documentacao oficial das APIs em https://developers.sicoob.com.br/
