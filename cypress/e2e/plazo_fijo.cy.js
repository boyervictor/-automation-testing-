/**
 * Casos de Prueba – Módulo Plazo Fijo
 * Este archivo contiene pruebas automatizadas del flujo funcional de la sección Plazo Fijo de un sistema bancario web.
 * Se incluyen tanto casos positivos (flujo correcto) como negativos (validación de errores y restricciones).
 */

describe('Casos Positivos – Plazo Fijo', () => {

  beforeEach(() => {
    cy.visit('https://demo-banco.com/plazo-fijo');
  });

  it('Permite crear un plazo fijo con datos válidos', () => {
    cy.get('#monto').type('10000');
    cy.get('#plazo').select('30 días');
    cy.get('#confirmar').click();
    cy.get('.mensaje-exito').should('contain', 'Plazo fijo creado correctamente');
  });

  it('Muestra la tasa de interés correspondiente al plazo seleccionado', () => {
    cy.get('#plazo').select('60 días');
    cy.get('#tasa').should('be.visible');
  });

  it('Calcula el interés estimado al ingresar monto y plazo', () => {
    cy.get('#monto').type('15000');
    cy.get('#plazo').select('90 días');
    cy.get('#calcular').click();
    cy.get('#interes-estimado').should('contain', '$');
  });

});


/**
 * -------------------------------------------------------------------------
 * Casos Negativos – Plazo Fijo
 * A partir de aquí se incluyen pruebas que validan el comportamiento del sistema
 * ante datos inválidos, errores del usuario o condiciones no deseadas.
 * -------------------------------------------------------------------------
 */

describe('Casos Negativos – Plazo Fijo', () => {

  beforeEach(() => {
    cy.visit('https://demo-banco.com/plazo-fijo');
  });

  it('No permite crear un plazo fijo sin monto ingresado', () => {
    cy.get('#plazo').select('30 días');
    cy.get('#confirmar').click();
    cy.get('.error').should('contain', 'Debe ingresar un monto válido');
  });

  it('Rechaza un monto menor al mínimo permitido', () => {
    cy.get('#monto').type('50'); // Supongamos que el mínimo es 1000
    cy.get('#plazo').select('60 días');
    cy.get('#confirmar').click();
    cy.get('.error').should('contain', 'El monto mínimo es $1000');
  });

  it('No permite continuar sin seleccionar un plazo', () => {
    cy.get('#monto').type('5000');
    cy.get('#confirmar').click();
    cy.get('.error').should('contain', 'Debe seleccionar un plazo');
  });

  it('Error si el usuario ingresa letras en el campo de monto', () => {
    cy.get('#monto').type('milpesos');
    cy.get('#confirmar').click();
    cy.get('.error').should('contain', 'Ingrese un número válido');
  });

  it('Rechaza cuando la tasa no se encuentra disponible para el plazo elegido', () => {
    cy.get('#monto').type('3000');
    cy.get('#plazo').select('120 días');
    cy.get('#tasa').should('not.exist');
    cy.get('#confirmar').click();
    cy.get('.error').should('contain', 'No hay tasa disponible para ese plazo');
  });

});


