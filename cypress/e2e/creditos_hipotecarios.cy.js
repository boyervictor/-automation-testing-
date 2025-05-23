/**
 * Casos de Prueba – Módulo Créditos Hipotecarios
 * Este archivo contiene pruebas automatizadas del módulo de Créditos Hipotecarios del sistema bancario web.
 * Incluye casos positivos (funcionalidad esperada) y negativos (errores comunes o restricciones del sistema).
 */

describe('Casos Positivos – Créditos Hipotecarios', () => {

  beforeEach(() => {
    cy.visit('https://demo-banco.com/creditos-hipotecarios');
  });

  it('Permite simular un crédito con datos válidos', () => {
    cy.get('#monto').type('2500000');
    cy.get('#plazo').select('240 meses');
    cy.get('#ingresos').type('180000');
    cy.get('#simular').click();
    cy.get('.resultado').should('contain', 'Cuota estimada');
  });

  it('Permite enviar solicitud de crédito si los datos están completos', () => {
    cy.get('#nombre').type('Juan Pérez');
    cy.get('#dni').type('30123456');
    cy.get('#monto').type('3000000');
    cy.get('#plazo').select('180 meses');
    cy.get('#ingresos').type('200000');
    cy.get('#enviar').click();
    cy.get('.mensaje-exito').should('contain', 'Solicitud enviada');
  });

  it('Calcula correctamente la cuota en base a monto, plazo e ingresos', () => {
    cy.get('#monto').type('1500000');
    cy.get('#plazo').select('120 meses');
    cy.get('#ingresos').type('100000');
    cy.get('#simular').click();
    cy.get('#cuota-estimada').should('not.be.empty');
  });

});

/**
 * -------------------------------------------------------------------------
 * Casos Negativos – Créditos Hipotecarios
 * A partir de aquí se validan escenarios con datos erróneos o incompletos,
 * para verificar que el sistema responde adecuadamente ante errores del usuario.
 * -------------------------------------------------------------------------
 */

describe('Casos Negativos – Créditos Hipotecarios', () => {

  beforeEach(() => {
    cy.visit('https://demo-banco.com/creditos-hipotecarios');
  });

  it('No permite simular sin ingresar monto', () => {
    cy.get('#plazo').select('120 meses');
    cy.get('#ingresos').type('80000');
    cy.get('#simular').click();
    cy.get('.error').should('contain', 'Debe ingresar un monto');
  });

  it('No permite enviar la solicitud sin DNI', () => {
    cy.get('#nombre').type('María González');
    cy.get('#monto').type('1200000');
    cy.get('#plazo').select('180 meses');
    cy.get('#ingresos').type('130000');
    cy.get('#enviar').click();
    cy.get('.error').should('contain', 'DNI es obligatorio');
  });

  it('Rechaza ingresos inferiores al mínimo requerido', () => {
    cy.get('#monto').type('2000000');
    cy.get('#plazo').select('240 meses');
    cy.get('#ingresos').type('15000');
    cy.get('#simular').click();
    cy.get('.error').should('contain', 'Los ingresos mínimos deben ser superiores a $50.000');
  });

  it('No permite letras en el campo monto', () => {
    cy.get('#monto').type('unmillondepesos');
    cy.get('#plazo').select('120 meses');
    cy.get('#ingresos').type('80000');
    cy.get('#simular').click();
    cy.get('.error').should('contain', 'Ingrese un monto numérico');
  });

  it('No permite enviar solicitud si falta algún dato obligatorio', () => {
    cy.get('#nombre').type('Carlos');
    cy.get('#dni').type('30123456');
    // Falta monto y plazo
    cy.get('#enviar').click();
    cy.get('.error').should('contain', 'Complete todos los campos');
  });

});
