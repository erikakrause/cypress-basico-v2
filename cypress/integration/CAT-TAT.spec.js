/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
  beforeEach(function () {
    cy.visit('./src/index.html');
  });
  it('verifica o título da aplicação', function () {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
  });

  it('preencha os campos obrigatórios e envie o formulário', function () {
    const longText =
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.';
    cy.get('#firstName').type('Erika');
    cy.get('#lastName').type('Moreno');
    cy.get('#email').type('erika@teste.com');
    cy.get('#open-text-area').type(longText), { delay: 0 };
    cy.contains('button', 'Enviar').click();

    cy.get('.success').should('be.visible');
  });

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
    cy.get('#firstName').type('Erika');
    cy.get('#lastName').type('Moreno');
    cy.get('#email').type('erika@teste,com');
    cy.get('#open-text-area').type('Texto');
    cy.contains('button', 'Enviar').click();

    cy.get('.error').should('be.visible');
  });

  it('campo de telefone continua vázio quando não preenchido com valor não-numérico', function () {
    cy.get('#phone').type('abcdefghij').should('have.value', '');
  });

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
    cy.get('#firstName').type('Erika');
    cy.get('#lastName').type('Moreno');
    cy.get('#email').type('erika@teste.com');
    cy.get('#phone-checkbox').click('');
    cy.get('#open-text-area').type('Texto');
    cy.contains('button', 'Enviar').click();

    cy.get('.error').should('be.visible');
  });

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
    cy.get('#firstName')
      .type('Erika')
      .should('have.value', 'Erika')
      .clear()
      .should('have.value', '');
    cy.get('#lastName')
      .type('Moreno')
      .should('have.value', 'Moreno')
      .clear()
      .should('have.value', '');
    cy.get('#email')
      .type('erika@teste.com')
      .should('have.value', 'erika@teste.com')
      .clear()
      .should('have.value', '');
    cy.get('#phone')
      .type('1234567890')
      .should('have.value', '1234567890')
      .clear()
      .should('have.value', '');
  });

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
    cy.contains('button', 'Enviar').click();

    cy.get('.error').should('be.visible');
  });

  it.only('envia o formulário com sucesso usando um comando customaizado', function () {
    cy.fillMandatoryFieldsAndSubmit();

    cy.get('.success').should('be.visible');
  });

  it('seleciona um produto(Youtube) por seu texto', function () {
    cy.get('#product').select('Youtube').should('have.value', 'youtube');
  });

  it('seleciona um produto(Mentoria) por seu valor (value)', function () {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria');
  });

  it('seleciona um produto (Blog) por seu índice', function () {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atedimento "Feedback"', function () {
    cy.get('input[type="radio"][value="feedback"]').check()
  })

  it.only('marca cada tipo de atendimento', function () {
    cy.get('input[type="radio"]')
      .should('have.length', 3) 
      .each(function($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })
});
