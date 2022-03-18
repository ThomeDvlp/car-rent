# Cadastro de carro

**RF**

Deve ser possível cadastrar um carro novo .

**RN**

Não deve ser possível cadastrar um carro com placa já existente nos registros de carros já cadastrados.

Carros cadastrados devem ter status disponível por padrão.

* O Usuário responsável pelo cadastro deve  administrador.


# Listagem de carros
**RF** 

Deve ser possível listar todos os carros disponíveis por qualquer usuario.

Deve ser possível listar todos os carros disponíveis pelo nome da categora.

Deve ser possível listar todos os carros disponíveis pelo nome da marca.

Deve ser possível listar todos os carros disponíveis pelo nome do carro.


**RN**

Não é necessário  estar logado no sistem para fazer a pesquisa

# Cadastro de especifaicação no carro

**RF**

Deve ser possível cadastrar uma especificação para um carro.


**RN**

Não deve ser possível cadastrar uma especificação de um carro não cadastrado.

Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.

 # Cadastro de imagens do carro

 **RF**

Deve ser possívbel cadastrar uma imagem do carro.

**RNF***

Utilizar o multer para upload de arquivos

**RN**

Usuário deve coonseguir cadastrar mais de uma imagem para o mesmo carro.

O Usuário responsável pelo cadastro deve  administrador.

# Aluguel de carros

**RF**

DEve ser possível cadastrar um aluguel

**RN**

O aluguel deve ter duração mínima 24 horas.

Não deve ser possível cadastrar um novo aluguelk caso já exista um aberto para o mesmo usuário.

Não deve ser possível cadastrar um novo aluguelk caso já exista um aberto para o mesmo carro.