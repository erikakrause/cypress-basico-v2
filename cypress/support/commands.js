Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
  cy.get('#firstName').type('Erika');
  cy.get('#lastName').type('Moreno');
  cy.get('#email').type('erika@teste.com');
  cy.get('#open-text-area').type('Texto');
  cy.contains('button', 'Enviar').click()
}) 