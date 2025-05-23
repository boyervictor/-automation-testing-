describe('Módulo de Plazo Fijo – Casos Positivos', () => {
  
  beforeEach(() => {
    cy.visit('https://tubanco.com/login');
    cy.get('#usuario').type('cliente123');
    cy.get('#password').type('claveSegura!');
    cy.get('#login-button').click();
    cy.url().should('include', '/dashboard');
  });

  it('Crear un plazo fijo tradicional en pesos con renovación total', () => {
    cy.get('#menu-plazo-fijo').click();
    cy.get('#tipo-moneda').select('Pesos');
    cy.get('#monto').type('100000');
    cy.get('#plazo').select('30 días');
    cy.get('#tipo-renovacion').select('Total');
    cy.get('#confirmar').click();

    cy.get('.alert-success')
      .should('contain', 'Plazo fijo creado exitosamente');
  });

  it('Crear un plazo fijo en dólares sin renovación', () => {
    cy.get('#menu-plazo-fijo').click();
    cy.get('#tipo-moneda').select('Dólares');
    cy.get('#monto').type('1500');
    cy.get('#plazo').select('60 días');
    cy.get('#tipo-renovacion').select('Sin renovación');
    cy.get('#confirmar').click();

    cy.get('.alert-success')
      .should('contain', 'Plazo fijo creado exitosamente');
  });

  it('Visualizar listado de plazos fijos vigentes', () => {
    cy.get('#menu-plazo-fijo').click();
    cy.get('#ver-plazos-fijos').click();

    cy.get('table#plazos-fijos tbody tr').should('have.length.at.least', 1);
    cy.get('table#plazos-fijos').should('contain', 'Pesos')
                                 .and('contain', 'Dólares');
  });
});

