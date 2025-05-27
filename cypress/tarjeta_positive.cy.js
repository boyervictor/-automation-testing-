MÓDULO: Solicitud de Tarjeta de Crédito
🟢 Casos Positivos (TC-001 a TC-010)
TC-001 – Solicitud de tarjeta con todos los datos requeridos

TC-002 – Selección del tipo de tarjeta según perfil crediticio

TC-003 – Consulta de requisitos y beneficios antes de solicitar

TC-004 – Subida de documentación probatoria correctamente

TC-005 – Generación de número de solicitud con seguimiento

TC-006 – Recepción de confirmación por correo electrónico

TC-007 – Validación de CBU para débito automático

TC-008 – Posibilidad de cancelar la solicitud dentro de 24 hs

TC-009 – Validación crediticia automática y preaprobación

TC-010 – Consulta de estado desde la app o web

🔴 Casos Negativos (TC-011 a TC-015)
TC-011 – Solicitud con DNI inválido

TC-012 – Ingreso de ingresos mensuales fuera de rango

TC-013 – Documentación ilegible al subir archivos

TC-014 – Selección de tarjeta no disponible en zona geográfica

TC-015 – Error en validación del CBU

🔐 Casos de Seguridad (TC-016 a TC-020)
TC-016 – Inyección SQL en campo “Ingresos declarados”

TC-017 – Validación CAPTCHA para evitar bots en solicitud

TC-018 – Protección contra reintentos masivos de solicitud

TC-019 – Bloqueo automático tras tres solicitudes rechazadas

TC-020 – Encriptación de datos sensibles al guardar (ej. CBU)
