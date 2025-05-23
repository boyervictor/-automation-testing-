/**
 * Casos de Prueba – Módulo Solicitud de Tarjeta de Crédito
 * Este archivo contiene pruebas automatizadas para validar el flujo de solicitud de tarjeta.
 * Incluye casos positivos y negativos, todos en un mismo archivo.
 */

describe('Casos Positivos – Solicitud Tarjeta de Crédito', () => {

  beforeEach(() => {
    cy.visit('https://demo-banco.com/solicitar-tarjeta');
  });

  it('Permite enviar una solicitud con todos los datos válidos', () => {
    cy.get('#nombre').type('Laura Martínez');
    cy.get('#dni').type('32123456');
    cy.get('#ingresos').type('150000');
    cy.get('#tipo-tarjeta').select('Visa Gold');
    cy.get('#enviar').click();
    cy.get('.mensaje-exito').should('contain', 'Solicitud recibida');
  });

  it('Muestra las opciones de tarjeta según ingresos ingresados', () => {
    cy.get('#ingresos').type('200000');
    cy.get('#consultar-opciones').click();
    cy.get('.opciones-tarjeta').should('contain', 'Visa Gold');
    cy.get('.opciones-tarjeta').should('contain', 'Mastercard Platinum');
  });

  it('Calcula correctamente el límite estimado según ingresos', () => {
    cy.get('#ingresos').type('180000');
    cy.get('#consultar-limite').click();
    cy.get('#limite-estimado').should('not.be.empty');
  });

});

/**
 * -------------------------------------------------------------------------
 * Casos Negativos – Solicitud Tarjeta de Crédito
 * A partir de aquí se prueban errores comunes y validaciones del sistema.
 * -------------------------------------------------------------------------
 */

describe('Casos Negativos – Solicitud Tarjeta de Crédito', () => {

  beforeEach(() => {
    cy.visit('https://demo-banco.com/solicitar-tarjeta');
  });

  it('No permite enviar solicitud sin nombre', () => {
    cy.get('#dni').type('30123123');
    cy.get('#ingresos').type('100000');
    cy.get('#tipo-tarjeta').select('Visa Classic');
    cy.get('#enviar').click();
    cy.get('.error').should('contain', 'El nombre es obligatorio');
  });

  it('Rechaza solicitudes con ingresos menores al mínimo', () => {
    cy.get('#nombre').type('José Alvarez');
    cy.get('#dni').type('30222111');
    cy.get('#ingresos').type('10000'); // Muy bajo
    cy.get('#tipo-tarjeta').select('Visa Classic');
    cy.get('#enviar').click();
    cy.get('.error').should('contain', 'Los ingresos mínimos deben ser de $50.000');
  });

  it('No permite letras en el campo DNI', () => {
    cy.get('#nombre').type('Andrés Ramírez');
    cy.get('#dni').type('abcde');
    cy.get('#ingresos').type('120000');
    cy.get('#tipo-tarjeta').select('Mastercard');
    cy.get('#enviar').click();
    cy.get('.error').should('contain', 'Ingrese un DNI válido');
  });

  it('No muestra opciones si no se completan ingresos', () => {
    cy.get('#consultar-opciones').click();
    cy.get('.error').should('contain', 'Debe ingresar sus ingresos mensuales');
  });

  it('No permite enviar si falta selección de tipo de tarjeta', () => {
    cy.get('#nombre').type('Cecilia Gómez');
    cy.get('#dni').type('30334455');
    cy.get('#ingresos').type('160000');
    cy.get('#enviar').click();
    cy.get('.error').should('contain', 'Debe seleccionar un tipo de tarjeta');
  });

});
