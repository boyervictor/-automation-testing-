describe('Caja de Ahorro - Creación de Cuenta', () => {
  it('Debería permitir crear una cuenta de caja de ahorro válida', () => {
    cy.visit('/caja-ahorro/nueva');
    cy.get('#dni').type('12345678');
    cy.get('#nombre').type('Juan Pérez');
    cy.get('#tipoCuenta').select('Caja de Ahorro');
    cy.get('#moneda').select('ARS');
    cy.get('#btn-crear').click();
    cy.contains('Cuenta creada exitosamente').should('be.visible');
  });
});

it('No debe permitir crear cuenta sin DNI', () => {
  cy.visit('/cuenta/crear');
  cy.get('#nombre').type('Juan');
  cy.get('#dni').clear(); // DNI vacío
  cy.get('#submit').click();
  cy.contains('El DNI es obligatorio').should('be.visible');
});

it('Crea una cuenta de ahorro usando fixture', function () {
  cy.fixture('usuarioValido').then((usuario) => {
    cy.visit('/cuenta/crear');
    cy.get('#nombre').type(usuario.nombre);
    cy.get('#dni').type(usuario.dni);
    cy.get('#submit').click();
    cy.contains('Cuenta creada con éxito').should('be.visible');
  });
});
Agrego prueba Cypress para módulo Caja de Ahorro
